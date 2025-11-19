// ========================================
// SERVICIO DE FACEBOOK MESSENGER API
// ========================================
// Este archivo maneja el envío de mensajes a través de Facebook Messenger API
// Funciones principales:
// 1. Configuración de headers de autenticación
// 2. Envío de mensajes de texto
// 3. Manejo de errores de la API de Messenger

import fetch from "node-fetch";

// ========================================
// CONFIGURACIÓN DE LA API DE MESSENGER
// ========================================

// URL de la API de Facebook Graph para Messenger
const GRAPH_API_URL = "https://graph.facebook.com/v21.0/me/messages";

// ========================================
// CONFIGURACIÓN DE AUTENTICACIÓN
// ========================================
// Construye los headers necesarios para autenticarse con Messenger API
const buildHeaders = () => {
  const token = process.env.MESSENGER_PAGE_ACCESS_TOKEN; // Token de acceso de página desde .env (REQUERIDO)
  
  if (!token) {
    throw new Error("Missing MESSENGER_PAGE_ACCESS_TOKEN environment variable");
  }
  
  return {
    Authorization: `Bearer ${token}`, // Token de autorización Bearer
    "Content-Type": "application/json", // Tipo de contenido JSON
  };
};

// ========================================
// FUNCIÓN PRINCIPAL PARA ENVIAR MENSAJES
// ========================================
// Envía un mensaje de texto a través de Facebook Messenger API
// Parámetros:
// - recipientId: PSID (Page-Scoped ID) del destinatario
// - message: texto del mensaje a enviar
export const sendMessengerText = async ({ recipientId, message }) => {
  // ========================================
  // VALIDACIONES DE PARÁMETROS
  // ========================================
  
  // Verificar que existe el ID del destinatario
  if (!recipientId) {
    throw new Error("Missing recipient ID for Messenger message");
  }

  // Verificar que existe el mensaje
  if (!message) {
    throw new Error("Missing message text");
  }

  // ========================================
  // CONSTRUCCIÓN DEL PAYLOAD
  // ========================================
  // Estructura del mensaje según la documentación de Messenger API
  const payload = {
    recipient: {
      id: recipientId, // PSID del destinatario
    },
    message: {
      text: message, // Contenido del mensaje
    },
    messaging_type: "RESPONSE", // Tipo de mensaje (RESPONSE para respuestas a mensajes de usuarios)
  };

  // ========================================
  // ENVÍO DEL MENSAJE
  // ========================================
  try {
    const response = await fetch(GRAPH_API_URL, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    // ========================================
    // MANEJO DE ERRORES DE LA API
    // ========================================
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Messenger API error (${response.status}): ${errorBody}`);
    }

    // Si llegamos aquí, el mensaje se envió exitosamente
    const result = await response.json();
    return result;
    
  } catch (error) {
    // Re-lanzar el error para que sea manejado por el código que llama a esta función
    console.error("Error sending Messenger message:", error);
    throw error;
  }
};
