// ========================================
// SERVIDOR PRINCIPAL DEL CHATBOT MESSENGER
// ========================================

import "dotenv/config"; 
import express from "express";
import { generateBotReply } from "./services/gemini.js"; 
import { sendMessengerText } from "./services/messenger.js"; 

// ========================================
// CONFIGURACIÓN DE VARIABLES
// ========================================
const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANTE: Token para verificación del webhook con Meta
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "chatbotarmaq";

// Configuración de asesores - Sistema de notificaciones
const notifyNumber = process.env.MESSENGER_NOTIFY_PSID?.trim(); // PSID del supervisor
const advisorPSIDs = (process.env.MESSENGER_ADVISOR_QUEUE ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

let advisorCursor = 0;

// ========================================
// FUNCIÓN PARA ROTACIÓN DE ASESORES
// ========================================
const nextAdvisorPSID = () => {
  if (advisorPSIDs.length === 0) return null;
  const advisor = advisorPSIDs[advisorCursor];
  advisorCursor = (advisorCursor + 1) % advisorPSIDs.length;
  return advisor;
};

// Middleware
app.use(express.json());

// ========================================
// RUTAS DEL SERVIDOR (ENDPOINTS)
// ========================================

// 1. Salud del servidor
app.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// 2. VERIFICACIÓN DEL WEBHOOK (GET)
// Esta es la puerta que Meta toca para verificar que existes
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Log para depurar en Railway si algo falla
  console.log(`Intento de verificación: Mode=${mode}, Token=${token}, MiToken=${VERIFY_TOKEN}`);

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ WEBHOOK VERIFICADO");
    res.status(200).send(challenge);
  } else {
    console.log("❌ FALLO DE VERIFICACIÓN: El token no coincide.");
    res.sendStatus(403);
  }
});

// 3. RECEPCIÓN DE MENSAJES DE MESSENGER (POST)
app.post("/webhook", async (req, res) => {
  const entries = req.body.entry ?? [];
  
  // Responder rápidamente a Facebook (requerido)
  res.sendStatus(200);
  
  for (const entry of entries) {
    const messaging = entry.messaging ?? [];
    
    for (const event of messaging) {
      // Verificar que es un mensaje (no postback, delivery, read, etc.)
      if (!event.message || event.message.is_echo) continue;
      
      const senderId = event.sender.id; // PSID del usuario
      const messageText = event.message.text ?? ""; // Texto del mensaje
      
      // Ignorar mensajes vacíos
      if (!messageText.trim()) continue;

      // --- LOGICA DEL BOT ---
      try {
        const reply = await generateBotReply(messageText);
        await sendMessengerText({ recipientId: senderId, message: reply });
      } catch (error) {
        console.error("Error procesando mensaje:", error);
        const fallback = "En este momento no puedo responder. Un asesor humano dará seguimiento en breve.";
        try {
          await sendMessengerText({ recipientId: senderId, message: fallback });
        } catch (e) {
          console.error("Error enviando mensaje de fallback:", e);
        }
      }

      // --- NOTIFICACIONES AL SUPERVISOR ---
      if (notifyNumber) {
        const notification = `Chatbot Messenger:\nCliente PSID: ${senderId}\nMensaje: ${messageText}`;
        try {
          await sendMessengerText({ recipientId: notifyNumber, message: notification });
        } catch (e) { 
          console.error("Error notificando supervisor", e); 
        }
      }

      // --- ASESOR ROTATIVO ---
      const assignedAdvisor = nextAdvisorPSID();
      if (assignedAdvisor) {
        const assignMsg = `Asignación Chatbot Messenger:\nCliente PSID: ${senderId}\nMensaje: ${messageText}`;
        try {
          await sendMessengerText({ recipientId: assignedAdvisor, message: assignMsg });
        } catch (e) { 
          console.error("Error notificando asesor", e); 
        }
      }
    }
  }
});

// ========================================
// INICIAR SERVIDOR
// ========================================
// Esto SIEMPRE debe ir al final del archivo

// ⚠️ CAMBIO IMPORTANTE AQUÍ: Agregamos '0.0.0.0'
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Facebook Messenger Gemini bot listening on port ${PORT}`);
});

