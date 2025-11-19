// ========================================
// SERVICIO DE GOOGLE GEMINI AI
// ========================================
import { GoogleGenAI } from "@google/genai";
import { buildPromptContents } from "./promptBuilder.js";

// ========================================
// CONFIGURACIÓN DE GEMINI
// ========================================

// CORRECCIÓN 1: Usar un modelo válido (1.5-flash es el estándar actual rápido)
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: process.env.GEMINI_API_VERSION || "v1beta",
});

const tools = [];

const generationConfig = {
  temperature: 0.35,
  topP: 0.8,
  maxOutputTokens: 600,
};

// ========================================
// FUNCIÓN PRINCIPAL
// ========================================
export const generateBotReply = async (customerMessage) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Falta la variable GEMINI_API_KEY en el archivo .env");
  }

  try {
    // Construir el prompt
    let contents = buildPromptContents(customerMessage);

    // SEGURIDAD: Si buildPromptContents devuelve solo un objeto, convertirlo a array
    // La API espera siempre un Array: [{ role: 'user', parts: [...] }]
    if (!Array.isArray(contents)) {
        contents = [contents];
    }

    // DEBUG: Ver qué estamos enviando exactamente (aparecerá en tu terminal)
    console.log("🤖 Enviando a Gemini:", JSON.stringify({ model: GEMINI_MODEL, contents }, null, 2));

    const request = {
      model: GEMINI_MODEL,
      contents: contents,
      generationConfig,
    };

    if (tools.length > 0) {
      request.tools = tools;
    }

    // ========================================
    // GENERAR RESPUESTA
    // ========================================
    const stream = await ai.models.generateContentStream(request);

    let reply = "";
    for await (const chunk of stream) {
      if (chunk.text) {
        reply += chunk.text;
      }
    }

    const cleaned = reply.trim();
    if (!cleaned) {
      throw new Error("Gemini devolvió una respuesta vacía.");
    }

    return cleaned;

  } catch (error) {
    // Mejora en el reporte de errores
    console.error("❌ Error detallado de Gemini:", JSON.stringify(error, null, 2));
    // Si el error es por el modelo, lo avisamos
    if (error.message && error.message.includes("400")) {
         console.error("⚠️ PISTA: Verifica que el modelo '" + GEMINI_MODEL + "' exista y que tu API Key tenga permisos.");
    }
    throw error;
  }
};