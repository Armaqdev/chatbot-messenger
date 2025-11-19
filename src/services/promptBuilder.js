// ========================================
// CONSTRUCTOR DE PROMPTS PARA GEMINI AI
// ========================================
// Este archivo construye el prompt completo que se envía a Gemini AI
// Combina la información del negocio con el mensaje del cliente
// Funciones principales:
// 1. Formatear catálogo de productos
// 2. Construir prompt completo con todas las secciones
// 3. Crear estructura de mensajes para Gemini

import { promptSections } from "../config/promptSections.js";

// ========================================
// FUNCIONES AUXILIARES DE FORMATO
// ========================================

// Convierte un array en lista numerada
const joinList = (items) => items.map((item, index) => `${index + 1}. ${item}`).join("\n");

// Formatea el catálogo de productos para el prompt
const formatCatalog = (catalog) =>
  catalog
    .map((item) => {
      const lines = [
        `• ${item.name} (${item.sku})`,
        `  Descripción: ${item.description}`,
        `  Precio unitario: ${item.unitPrice}`,
        // Solo agregar precio mayoreo si existe
        ...(item.bulkPrice ? [`  Precio mayoreo: ${item.bulkPrice}`] : []),
        `  Disponibilidad: ${item.availability}`,
      ];
      return lines.join("\n");
    })
    .join("\n\n");

// ========================================
// CONSTRUCTOR PRINCIPAL DEL PROMPT
// ========================================
// Esta función toma el mensaje del cliente y construye el prompt completo
export const buildPromptContents = (customerMessage) => {
  // Extraer todas las secciones de configuración
  const {
    businessProfile,
    catalog,
    pricingRules,
    operationalPolicies,
    responseStyle,
    compliance,
  } = promptSections;

  // ========================================
  // CONSTRUCCIÓN DE SECCIONES DEL PROMPT
  // ========================================
  
  // Combinar toda la información en secciones organizadas
  const sections = [
    // SECCIÓN 1: Información básica del negocio
    `Información del negocio: ${businessProfile.displayName}\nTagline: ${businessProfile.tagline}\nResumen: ${businessProfile.overview}\nZona de servicio: ${businessProfile.serviceArea}\nHorarios de atención: ${businessProfile.businessHours}\nCanales de contacto: ${businessProfile.contactChannels.join(", ")}\nModalidad de entrega: ${businessProfile.deliveryPolicy}\nOpción de recogida: ${businessProfile.pickupOptions}`,
    
    // SECCIÓN 2: Catálogo de productos/servicios
    `Catálogo principal:\n${formatCatalog(catalog)}`,
    
    // SECCIÓN 3: Reglas de precios y facturación
    `Reglas de precios:\n${joinList(pricingRules)}`,
    
    // SECCIÓN 4: Políticas de operación y servicio
    `Políticas operativas:\n${joinList(operationalPolicies)}`,
    
    // SECCIÓN 5: Cómo debe responder el chatbot
    `Estilo de respuesta deseado:\n- Tono: ${responseStyle.tone}\n- Formato: ${responseStyle.formatRules.join("\n- ")}\n- Fallback: ${responseStyle.fallback}`,
    
    // SECCIÓN 6: Restricciones y reglas de escalación
    `Cumplimiento:\n- No prometer: ${compliance.prohibitedPromises.join("; ")}\n- Escalar cuando: ${compliance.escalationCriteria.join("; ")}`,
    
    // SECCIÓN 7: Objetivo principal del chatbot
    `Meta del chatbot: brindar cotizaciones claras, resolver dudas frecuentes y agendar seguimientos con un asesor humano si es necesario.`,
  ].join("\n\n---\n\n");

  // ========================================
  // INSTRUCCIÓN PRINCIPAL PARA LA IA
  // ========================================
  const instruction = `Actúa como asistente virtual del negocio ${businessProfile.displayName}. Usa la información oficial que se detalla a continuación. Si la solicitud excede tu capacidad, indica el siguiente paso con un asesor humano. Gestiona en español neutro.`;

  // ========================================
  // ESTRUCTURA FINAL DEL MENSAJE PARA GEMINI
  // ========================================
  // Gemini espera un array de mensajes con roles y contenido
  return [
    {
      role: "user", // Mensaje del usuario
      parts: [
        {
          text: `${instruction}\n\n${sections}\n\nMensaje del cliente:\n${customerMessage}\n\nResponde solo con el mensaje que se enviará al cliente.`,
        },
      ],
    },
  ];
};
