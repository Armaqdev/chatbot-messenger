// ========================================
// SERVICIO DE WHATSAPP BUSINESS API
// ========================================
// Este archivo maneja el envío de mensajes a través de WhatsApp Business API
// Funciones principales:
// 1. Configuración de headers de autenticación
// 2. Envío de mensajes de texto
// 3. Manejo de errores de la API de WhatsApp

import fetch from "node-fetch";

// ========================================
// CONFIGURACIÓN DE LA API DE WHATSAPP
// ========================================

// Construye la URL de la API de WhatsApp Graph para un número específico
const graphUrl = (phoneNumberId) =>
  `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

// ========================================
// CONFIGURACIÓN DE AUTENTICACIÓN
// ========================================
// Construye los headers necesarios para autenticarse con WhatsApp API
const buildHeaders = () => {
  const token = process.env.WHATSAPP_TOKEN; // Token de acceso desde .env (REQUERIDO)
  
  if (!token) {
    throw new Error("Missing WHATSAPP_TOKEN environment variable");
  }
  
  return {
    Authorization: `Bearer ${token}`, // Token de autorización Bearer
    "Content-Type": "application/json", // Tipo de contenido JSON
  };
};

// ========================================
// FUNCIÓN PRINCIPAL PARA ENVIAR MENSAJES
// ========================================
// Envía un mensaje de texto a través de WhatsApp Business API
// Parámetros:
// - to: número de teléfono del destinatario (formato: 521234567890)
// - message: texto del mensaje a enviar
// - phoneNumberId: ID del número de WhatsApp Business (opcional, usa el de .env por defecto)
export const sendWhatsAppText = async ({ to, message, phoneNumberId }) => {
  // ========================================
  // VALIDACIONES DE PARÁMETROS
  // ========================================
  
  // Usar phoneNumberId del parámetro o del .env
  const id = phoneNumberId ?? process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!id) {
    throw new Error("Missing WhatsApp phone number ID");
  }

  // Verificar que existe el número destinatario
  if (!to) {
    throw new Error("Missing recipient number for WhatsApp message");
  }

  // ========================================
  // CONSTRUCCIÓN DEL PAYLOAD
  // ========================================
  // Estructura del mensaje según la documentación de WhatsApp API
  const payload = {
    messaging_product: "whatsapp", // Producto de mensajería
    recipient_type: "individual",  // Tipo de destinatario (individual vs grupo)
    to,                           // Número del destinatario
    type: "text",                 // Tipo de mensaje (text, image, document, etc.)
    text: {
      preview_url: false,         // No mostrar preview de URLs automáticamente
      body: message,              // Contenido del mensaje
    },
  };

  // ========================================
  // ENVÍO DEL MENSAJE
  // ========================================
  try {
    const response = await fetch(graphUrl(id), {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    // ========================================
    // MANEJO DE ERRORES DE LA API
    // ========================================
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`WhatsApp API error (${response.status}): ${errorBody}`);
    }

    // Si llegamos aquí, el mensaje se envió exitosamente
    // La respuesta contiene información sobre el mensaje enviado
    
  } catch (error) {
    // Re-lanzar el error para que sea manejado por el código que llama a esta función
    throw error;
  }
};
