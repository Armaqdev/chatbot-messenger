// ========================================
// CONFIGURACIÓN DEL CHATBOT - PROMPT SECTIONS
// ========================================
// Este archivo contiene toda la información del negocio que usa la IA para responder:
// 1. Perfil del negocio (nombre, ubicación, horarios)
// 2. Catálogo de productos con precios
// 3. Políticas de precios y operación
// 4. Estilo de respuesta del chatbot
// 5. Reglas de cumplimiento y escalación

export const promptSections = {
  // ========================================
  // PERFIL DEL NEGOCIO
  // ========================================
  businessProfile: {
    // Nombre completo del negocio con ubicación
    displayName: "ARMAQ Maquinaria Ligera | Playa del Carmen, Q.R.",
    
    // Descripción corta de lo que hace tu empresa
    tagline: "Venta de maquinaria ligera para construcción y obras en Playa del Carmen y toda la Riviera Maya",
    
    // Descripción más detallada del negocio
    overview:
      "Con más de 15 años de experiencia en el sector, ARMAQ se ha consolidado como una empresa líder especializada en la venta y mantenimiento de maquinaria ligera para la construcción. Trabajamos con marcas líderes en la industria como CIPSA, HYPERMAQ, MPOWER, MAKITA, HONDA y KOHLER, garantizando productos de la más alta calidad. Ofrecemos soluciones completas en equipos para compactación, concreto, corte, demolición, generación de energía, andamiaje y accesorios para cimbra.",
    
    // Zona geográfica donde das servicio
    serviceArea: "Playa del Carmen, Cancún, Tulum y toda la Riviera Maya, Quintana Roo, tambien contamos con envio a toda la republica",
    
    // Horarios de atención
    businessHours: "Lunes a viernes de 8:00 a 18:00. Sábados y Domingos cerrado.",
    
    // Canales por los que los clientes pueden contactarte
    contactChannels: [
      "Facebook Messenger",
      "WhatsApp: 984 801 8317",
      "Teléfono: 984 801 8317",
      "Email: ventas3.kingmaq@gmail.com",
      "Visita en sucursal",
    ],
    
    // Información sobre recogida en sucursal
    pickupOptions: "Recogida disponible en nuestra sucursal de Playa del Carmen: 50 Avenida Norte, MZ 390 LT 8, Colonia Luis Donaldo Colosio, C.P. 77728, Playa del Carmen, Quintana Roo. https://maps.app.goo.gl/e3KMr56jzEyKCgfh7",
    
    // Política de entregas
    deliveryPolicy:
      "Realizamos entregas en toda la Riviera Maya. Envíos propios y por mensajería. Los tiempos de entrega varían según el producto y la ubicación. Consulta disponibilidad y costos de envío con nuestros asesores.",
  },

  // ========================================
  // CATÁLOGO DE PRODUCTOS/SERVICIOS
  // ========================================
  catalog: [
    // EQUIPOS PARA CONCRETO
    {
      sku: "CONC-001",
      name: "Revolvedora para Concreto CIPSA",
      unitPrice: "Consultar precio",
      description: "Revolvedoras de alta calidad marca CIPSA para mezclado de concreto. Diferentes capacidades disponibles. Motor potente y sistema de volteo eficiente.",
      availability: "Disponible",
    },
    {
      sku: "CONC-002",
      name: "Revolvedora para Concreto HYPERMAQ",
      unitPrice: "Consultar precio",
      description: "Revolvedoras marca HYPERMAQ, reconocidas por su durabilidad y eficiencia en el mezclado de concreto.",
      availability: "Disponible",
    },
    {
      sku: "CONC-003",
      name: "Vibrador Eléctrico para Concreto CIPSA/UMACON",
      unitPrice: "Consultar precio",
      description: "Vibrador eléctrico con motor compacto de doble aislamiento, potencia de 3.0 HP, 4.5 amperes, 12,000 vibraciones por minuto. Incluye manguera giratoria de 4 metros con acoplamiento rápido tipo mariposa.",
      availability: "Disponible",
    },
    {
      sku: "CONC-004",
      name: "Reglas Vibratorias para Concreto",
      unitPrice: "Consultar precio",
      description: "Reglas vibratorias profesionales para nivelado de superficies de concreto. Diferentes longitudes disponibles.",
      availability: "Disponible",
    },
    {
      sku: "CONC-005",
      name: "Allanadoras para Concreto",
      unitPrice: "Consultar precio",
      description: "Allanadoras sencillas y dobles para acabado de superficies de concreto. Motores Honda, Kohler y MPOWER disponibles.",
      availability: "Disponible",
    },
    {
      sku: "CONC-006",
      name: "Bachas para Concreto HYPERMAQ",
      unitPrice: "Consultar precio",
      description: "Bachas de alta resistencia para transporte de concreto en obra.",
      availability: "Disponible",
    },

    // EQUIPOS PARA COMPACTACIÓN
    {
      sku: "COMP-001",
      name: "Apisonadora / Bailarina",
      unitPrice: "Consultar precio",
      description: "Compactadores tipo apisonadora o bailarina ideales para compactación de suelos en espacios reducidos y zanjas.",
      availability: "Disponible",
    },
    {
      sku: "COMP-002",
      name: "Placa Vibratoria Unidireccional",
      unitPrice: "Consultar precio",
      description: "Placas vibratorias compactas para compactación de superficies. Motores Honda y Kohler.",
      availability: "Disponible",
    },
    {
      sku: "COMP-003",
      name: "Rodillo Compactador Sencillo",
      unitPrice: "Consultar precio",
      description: "Rodillo compactador vibratorio sencillo para compactación de asfalto y suelos.",
      availability: "Disponible",
    },
    {
      sku: "COMP-004",
      name: "Rodillo Compactador Doble (Hombre a Pie)",
      unitPrice: "Consultar precio",
      description: "Rodillo compactador de tambor doble operado por hombre a pie, ideal para trabajos de pavimentación.",
      availability: "Disponible",
    },
    {
      sku: "COMP-005",
      name: "Rodillo Compactador Doble (Hombre a Bordo)",
      unitPrice: "Consultar precio",
      description: "Rodillo compactador tipo hombre a bordo para trabajos de mayor escala.",
      availability: "Disponible",
    },
    {
      sku: "COMP-006",
      name: "Rodillo Compactador Pata de Cabra",
      unitPrice: "Consultar precio",
      description: "Rodillo especializado con patas de cabra para compactación profunda de suelos cohesivos.",
      availability: "Disponible",
    },

    // EQUIPOS PARA CORTE
    {
      sku: "CORT-001",
      name: "Cortadora de Piso HYPERMAQ CCT8H",
      unitPrice: "Consultar precio",
      description: "Cortadora profesional para piso de concreto y asfalto marca HYPERMAQ, modelo CCT8H.",
      availability: "Disponible",
    },
    {
      sku: "CORT-002",
      name: "Cortadora de Mampostería",
      unitPrice: "Consultar precio",
      description: "Cortadora especializada para trabajos en mampostería, block y ladrillo.",
      availability: "Disponible",
    },
    {
      sku: "CORT-003",
      name: "Cortadora para Varilla",
      unitPrice: "Consultar precio",
      description: "Cortadora de varilla eficiente para cortes precisos en acero de refuerzo.",
      availability: "Disponible",
    },
    {
      sku: "CORT-004",
      name: "Dobladora de Varilla",
      unitPrice: "Consultar precio",
      description: "Dobladoras de varilla manuales y eléctricas para diferentes diámetros de acero.",
      availability: "Disponible",
    },
    {
      sku: "CORT-005",
      name: "Cortadora-Dobladora Combinada",
      unitPrice: "Consultar precio",
      description: "Equipo 2 en 1 para corte y doblado de varilla, optimiza espacio y tiempo.",
      availability: "Disponible",
    },
    {
      sku: "CORT-006",
      name: "Dobladora de Estribos",
      unitPrice: "Consultar precio",
      description: "Dobladora especializada para fabricación de estribos y armados de acero.",
      availability: "Disponible",
    },

    // EQUIPOS PARA DEMOLICIÓN
    {
      sku: "DEMO-001",
      name: "Rompedora Eléctrica 15 kg",
      unitPrice: "Consultar precio",
      description: "Martillo demoledor eléctrico de 15 kg, ideal para trabajos ligeros de demolición.",
      availability: "Disponible",
    },
    {
      sku: "DEMO-002",
      name: "Rompedora Eléctrica 30 kg",
      unitPrice: "Consultar precio",
      description: "Martillo demoledor eléctrico de 30 kg para trabajos medianos de demolición.",
      availability: "Disponible",
    },
    {
      sku: "DEMO-003",
      name: "Rompedora Neumática 60 Libras",
      unitPrice: "Consultar precio",
      description: "Martillo neumático de 60 libras para demolición de concreto y pavimento.",
      availability: "Disponible",
    },
    {
      sku: "DEMO-004",
      name: "Rompedora Neumática 90 Libras",
      unitPrice: "Consultar precio",
      description: "Martillo neumático pesado de 90 libras para trabajos de demolición exigentes.",
      availability: "Disponible",
    },
    {
      sku: "DEMO-005",
      name: "Perforadora Neumática",
      unitPrice: "Consultar precio",
      description: "Perforadora neumática para barrenado en concreto y roca.",
      availability: "Disponible",
    },
    {
      sku: "DEMO-006",
      name: "Martillo Rotativo",
      unitPrice: "Consultar precio",
      description: "Martillo rotativo profesional para perforación y demolición.",
      availability: "Disponible",
    },

    // EQUIPOS DE GENERACIÓN Y ENERGÍA
    {
      sku: "ENER-001",
      name: "Generador Eléctrico a Gasolina",
      unitPrice: "Consultar precio",
      description: "Generadores de energía a gasolina en varias capacidades. Marcas Honda, Kohler y MPOWER.",
      availability: "Disponible",
    },
    {
      sku: "ENER-002",
      name: "Generador Eléctrico a Diesel",
      unitPrice: "Consultar precio",
      description: "Generadores de energía a diesel para trabajos pesados y de larga duración.",
      availability: "Disponible",
    },
    {
      sku: "ENER-003",
      name: "Torre de Iluminación",
      unitPrice: "Consultar precio",
      description: "Torres de iluminación móviles para trabajos nocturnos y áreas sin electricidad.",
      availability: "Disponible",
    },

    // EQUIPOS DE ELEVACIÓN Y ACARREO
    {
      sku: "ELEV-001",
      name: "Malacate HYPERMAQ 1 Ton",
      unitPrice: "Consultar precio",
      description: "Malacate eléctrico marca HYPERMAQ con capacidad de 1 tonelada.",
      availability: "Disponible",
    },
    {
      sku: "ELEV-002",
      name: "Polipasto Eléctrico 300 kg",
      unitPrice: "Consultar precio",
      description: "Polipasto eléctrico para elevación de materiales hasta 300 kg.",
      availability: "Disponible",
    },
    {
      sku: "ELEV-003",
      name: "Polipasto Eléctrico 500 kg",
      unitPrice: "Consultar precio",
      description: "Polipasto eléctrico de mayor capacidad para elevación de hasta 500 kg.",
      availability: "Disponible",
    },
    {
      sku: "ELEV-004",
      name: "Vogue de Acarreo",
      unitPrice: "Consultar precio",
      description: "Carretillas y vogues para acarreo de materiales en obra.",
      availability: "Disponible",
    },

    // EQUIPOS VARIOS
    {
      sku: "VAR-001",
      name: "Motobomba para Agua 2 Pulgadas",
      unitPrice: "Consultar precio",
      description: "Motobomba de 2 pulgadas para achique y trasiego de agua.",
      availability: "Disponible",
    },
    {
      sku: "VAR-002",
      name: "Motobomba para Agua 3 Pulgadas",
      unitPrice: "Consultar precio",
      description: "Motobomba de 3 pulgadas para mayor caudal de agua.",
      availability: "Disponible",
    },
    {
      sku: "VAR-003",
      name: "Motobomba para Agua 4 Pulgadas",
      unitPrice: "Consultar precio",
      description: "Motobomba de 4 pulgadas para grandes volúmenes de agua.",
      availability: "Disponible",
    },
    {
      sku: "VAR-004",
      name: "Motobomba para Agua 6 Pulgadas",
      unitPrice: "Consultar precio",
      description: "Motobomba industrial de 6 pulgadas para máximo caudal.",
      availability: "Disponible",
    },
    {
      sku: "VAR-005",
      name: "Motosierra",
      unitPrice: "Consultar precio",
      description: "Motosierras profesionales para corte de madera y trabajos forestales.",
      availability: "Disponible",
    },

    // ANDAMIOS Y CIMBRA
    {
      sku: "AND-001",
      name: "Andamio Sistema Europeo",
      unitPrice: "Consultar precio",
      description: "Andamios metálicos sistema europeo de alta resistencia y seguridad. Diferentes alturas disponibles.",
      availability: "Disponible",
    },
    {
      sku: "AND-002",
      name: "Silletas Serie EA",
      unitPrice: "Consultar precio",
      description: "Silletas para losa, serie EA de alta calidad.",
      availability: "Disponible",
    },
    {
      sku: "AND-003",
      name: "Silletas Serie SU",
      unitPrice: "Consultar precio",
      description: "Silletas para losa, serie SU.",
      availability: "Disponible",
    },
    {
      sku: "AND-004",
      name: "Silletas Serie LM",
      unitPrice: "Consultar precio",
      description: "Silletas para losa, serie LM.",
      availability: "Disponible",
    },
    {
      sku: "AND-005",
      name: "Puntales Metálicos",
      unitPrice: "Consultar precio",
      description: "Puntales metálicos telescópicos para cimbra, diferentes longitudes.",
      availability: "Disponible",
    },
    {
      sku: "AND-006",
      name: "Accesorios para Cimbra",
      unitPrice: "Consultar precio",
      description: "Amplio catálogo de accesorios: alineadores, discos, juntas, fundas, capuchones, conos, cajas y más.",
      availability: "Disponible",
    },
  ],

  // ========================================
  // PROMOCIONES ACTUALES
  // ========================================
  promotions: [
    {
      name: "Asesoría Gratuita",
      description: "Asesoría técnica gratuita antes, durante y después de tu compra. Nuestros especialistas te ayudan a elegir el equipo correcto para tu proyecto.",
      validity: "Permanente",
    },
    {
      name: "Descuento por Volumen",
      description: "Descuentos especiales en compras de múltiples equipos o rentas de largo plazo. Consulta condiciones con tu asesor.",
      validity: "Todo el año",
    },
    {
      name: "Programa de Distribuidores",
      description: "¿Te interesa ser distribuidor? Contamos con programa especial de distribución con precios y condiciones preferenciales.",
      validity: "Solicita información",
    },
  ],

  // ========================================
  // REGLAS DE PRECIOS
  // ========================================
  pricingRules: [
    "Los precios varían según el modelo y especificaciones del equipo.",
    "Todos los precios incluyen IVA del 16%.",
    "Precios sujetos a cambio sin previo aviso.",
    "Para cotizaciones formales, contacta a nuestros asesores.",
    "Descuentos por volumen disponibles en compras múltiples.",
    "Tarifas especiales para rentas de largo plazo.",
    "Aceptamos efectivo, transferencia electrónica y tarjetas de crédito/débito.",
    "Planes de financiamiento disponibles (consultar condiciones).",
  ],

  // ========================================
  // POLÍTICAS OPERATIVAS
  // ========================================
  operationalPolicies: [
    "VENTA: Todos los equipos nuevos incluyen garantía del fabricante.",
    "Garantías de 6 meses a 2 años según el equipo y marca.",
    "Refacciones y servicio técnico disponibles para todos los equipos vendidos.",
    
    "ENTREGA: Tiempos de entrega inmediata o de 3 a 5 días hábiles según disponibilidad y ubicación.",
    "Entregas en toda la Riviera Maya con cargo según distancia.",
    "Recogida en sucursal sin costo adicional.",
    
    "MANTENIMIENTO: Servicio de mantenimiento preventivo y correctivo disponible.",
    "Técnicos especializados en todas las marcas que manejamos.",
    "Refacciones originales en stock.",
    
    "CONTACTO DE ASESOR:",
    "• Leonar Meneses",
    "• WhatsApp/Teléfono: 984 801 8317",
    "• Email: ventas3.kingmaq@gmail.com",
  ],

  // ========================================
  // ESTILO DE RESPUESTA DEL CHATBOT
  // ========================================
  responseStyle: {
    tone: "Amable, directo y profesional. Respuestas cortas y concisas. Usar español de México.",
    
    formatRules: [
      "Respuestas breves de 2-3 oraciones máximo, ir directo al punto.",
      "Usar viñetas solo cuando sea estrictamente necesario.",
      "Mencionar disponibilidad sin mucho detalle.",
      "No repetir información innecesariamente.",
      "Ser específico pero sin dar explicaciones largas.",
      "Invitar a contactar al asesor para más detalles.",
    ],
    
    fallback:
      "Para más información, contacta a nuestro asesor Leonar Meneses al WhatsApp 984 801 8317 o email ventas3.kingmaq@gmail.com o visite nuestra sucursal https://maps.app.goo.gl/e3KMr56jzEyKCgfh7",
  },

  // ========================================
  // REGLAS DE CUMPLIMIENTO
  // ========================================
  compliance: {
    prohibitedPromises: [
      "No garantizar precios específicos sin confirmación de un asesor.",
      "No prometer descuentos no autorizados.",
      "No asegurar tiempos de entrega exactos sin verificar con logística.",
      "No confirmar disponibilidad de inventario sin consultar stock actual.",
      "No ofrecer condiciones de financiamiento sin aprobación.",
      "No comprometer garantías extendidas sin autorización.",
    ],
    
    escalationCriteria: [
      "Cliente solicita cotización formal para proyecto grande.",
      "Preguntas sobre crédito o financiamiento específico.",
      "Solicitud de descuentos especiales o negociación de precios.",
      "Necesidad de asesoría técnica especializada sobre equipos específicos.",
      "Cliente reporta problemas con equipos rentados o comprados.",
      "Quejas o reclamos sobre productos o servicios.",
      "Cliente molesto o insatisfecho que requiere atención prioritaria.",
      "Solicitudes de garantía o servicio post-venta.",
      "Interés en programa de distribuidores.",
      "Proyectos que requieren múltiples equipos o soluciones complejas.",
      "Consultas sobre disponibilidad de equipos no listados en catálogo.",
    ],
    
    escalationMessage:
      "Te conecto con nuestro asesor Leonar Meneses:\n\n• WhatsApp: 984 801 8317\n• Email: ventas3.kingmaq@gmail.com\n\nHorario: Lunes a viernes 8:00-18:00, Sábados 8:00-14:00.",
  },

};

