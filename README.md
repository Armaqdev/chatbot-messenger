🤖 Facebook Messenger Chatbot con Google Gemini (Node.js)

Este proyecto implementa un chatbot inteligente para Facebook Messenger utilizando Google Gemini AI. Está diseñado para ser desplegado fácilmente en la nube (Railway, Render, etc.) y cuenta con un sistema de atención al cliente híbrido (IA + Asesores Humanos).

✨ Características Principales

🧠 IA Avanzada: Respuestas naturales generadas por Google Gemini.

☁️ Cloud Ready: Configurado para despliegue en producción (Railway/Render).

🔄 Asignación Rotativa: Distribuye leads entre una lista de asesores humanos.

🔔 Notificaciones: Alerta a un supervisor y al asesor asignado.

🛡️ Seguro: Verificación de Webhook y manejo de variables de entorno.

📝 Personalizable: Catálogo y reglas de negocio editables en un solo archivo.

🔧 Requisitos Previos

Node.js 18+ (para desarrollo local).

Página de Facebook con Messenger habilitado.

App de Facebook en Meta Developers.

Clave API de Google AI Studio (Gemini).

Cuenta en GitHub (para subir el código).

Cuenta en Railway (u otro proveedor de hosting Node.js).

🚀 Despliegue en Railway (Producción)

Esta es la forma recomendada de usar el bot 24/7 sin mantener tu computadora encendida.

1. Preparar Repositorio

Sube este código a tu cuenta de GitHub (asegúrate de no subir el archivo .env ni la carpeta node_modules).

2. Crear Proyecto en Railway

Entra a railway.app y selecciona "Deploy from GitHub repo".

Selecciona tu repositorio.

Railway detectará automáticamente que es una app Node.js.

3. Configurar Variables de Entorno

En el panel de Railway, ve a la pestaña Variables y agrega las siguientes (usa los valores reales):

Variable	Descripción	Ejemplo
GEMINI_API_KEY	Tu clave de Google AI Studio	AIzaSyD...
WEBHOOK_VERIFY_TOKEN	Contraseña que tú inventas para verificar con Meta	mi_token_secreto
MESSENGER_PAGE_ACCESS_TOKEN	Token de acceso de tu página de Facebook	EAA...
MESSENGER_NOTIFY_PSID	PSID del supervisor para notificaciones	1234567890
MESSENGER_ADVISOR_QUEUE	Lista de PSIDs de asesores separados por coma	1234567890,0987654321
GEMINI_MODEL	(Opcional) Modelo a usar	gemini-1.5-flash

⚠️ IMPORTANTE: No agregues la variable PORT manualmente en Railway. Deja que la plataforma asigne su propio puerto automáticamente.

4. Generar Dominio Público

En Railway, ve a Settings > Networking.

Haz clic en Generate Domain.

Copia tu URL (ej: https://chatbot-production.up.railway.app).

5. Conectar con Meta (Facebook Messenger)

Ve a Meta Developers > Tu App > Messenger > Configuración.

En Webhooks, agrega la URL de devolución (callback URL):

URL de devolución: Pega tu dominio de Railway agregando /webhook al final.

Ejemplo: https://chatbot-production.up.railway.app/webhook

Token de verificación: Escribe el mismo que pusiste en las variables (WEBHOOK_VERIFY_TOKEN).

Guarda y verifica.

Suscribe tu página al webhook:
Ve a Messenger > Configuración.
En "Suscripciones de webhook", selecciona tu página.
Suscríbete a los eventos: messages y messaging_postbacks.

💻 Desarrollo Local

Si quieres probar cambios en tu computadora antes de subir a la nube:

Instalar dependencias:

```bash
npm install
```

Configurar .env:
Crea un archivo .env en la raíz con las siguientes variables:

```
GEMINI_API_KEY=tu_clave_de_gemini
WEBHOOK_VERIFY_TOKEN=mi_token_secreto
MESSENGER_PAGE_ACCESS_TOKEN=tu_token_de_pagina
MESSENGER_NOTIFY_PSID=psid_del_supervisor
MESSENGER_ADVISOR_QUEUE=psid1,psid2,psid3
```

Iniciar servidor:

```bash
npm run dev
```

Exponer a internet (Tunneling):
Para que Meta vea tu localhost, usa ngrok:

```bash
ngrok http 3000
```

Usa la URL que te da ngrok en el panel de Meta.

📁 Estructura del Proyecto
```
├── 📄 .env                     # Variables (NO subir a GitHub)
├── 📄 package.json             # Dependencias
├── 📄 README.md                # Esta documentación
└── 📁 src/
    ├── 📄 server.js           # Servidor Express (Webhooks y Lógica)
    ├── 📁 config/
    │   └── 📄 promptSections.js # ⚙️ AQUÍ SE EDITA LA INFO DEL NEGOCIO
    └── 📁 services/
        ├── 📄 gemini.js       # Conexión con IA
        ├── 📄 promptBuilder.js # Construcción del contexto
        └── 📄 messenger.js    # Envío de mensajes API
```

🛠️ Personalización del Bot

Para cambiar precios, productos, horarios o el tono del bot, no necesitas tocar el código complicado.

Solo edita el archivo:
👉 src/config/promptSections.js

Ahí encontrarás secciones claras para:

businessProfile: Datos generales.

catalog: Tus productos.

pricingRules: Reglas de precios.

operationalPolicies: Garantías y envíos.

🔑 Cómo Obtener el PSID de un Usuario

El PSID (Page-Scoped ID) es el identificador único de cada usuario en tu página de Facebook. Para obtenerlo:

**Método 1: Desde los logs del servidor**
Cuando un usuario envíe un mensaje, aparecerá su PSID en los logs de tu aplicación.

**Método 2: Usando la API de Facebook**
Envía un mensaje desde tu cuenta al chatbot y busca el PSID en la consola.

**Método 3: Herramienta de prueba de Facebook**
Usa la herramienta de prueba de webhooks en Meta Developers para ver el PSID.

❓ Solución de Problemas Comunes

1. "Application failed to respond" en Railway

Asegúrate de que en server.js la línea de inicio sea: app.listen(PORT, '0.0.0.0', ...).

Verifica que no hayas definido una variable PORT fija en Railway (bórrala para que sea dinámica).

2. El webhook no se verifica

Verifica que el WEBHOOK_VERIFY_TOKEN en Railway sea exactamente el mismo que pusiste en Meta Developers.

Asegúrate de que la URL termine en /webhook.

Revisa los logs en Railway para ver si hay errores.

3. El bot no contesta aunque el Webhook está verificado

Ve a Meta Developers > Messenger > Configuración > Webhooks.

Asegúrate de haber suscrito tu página al webhook.

Verifica que los eventos messages y messaging_postbacks estén seleccionados.

4. Error de token inválido

Verifica que tu MESSENGER_PAGE_ACCESS_TOKEN sea válido y no haya expirado.

Genera un nuevo token de página si es necesario desde Meta Developers.

📞 Soporte

Desarrollado para automatización de ventas y atención al cliente en Facebook Messenger.
Si necesitas ayuda técnica, revisa los Logs en tu panel de Railway para ver el error exacto.
