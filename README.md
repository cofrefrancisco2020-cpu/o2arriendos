# O2 Arriendos — versión 1

Sitio terminado de presentación y captación de cotizaciones. Fecha: 25 de octubre de 2026.

## Abrir y presentar

Abrir index.html en Chrome, Edge o Firefox. También funciona servido desde un alojamiento estático. La vista local durante la entrega es http://127.0.0.1:4173/ mientras siga activo el servidor de esta sesión.

La carpeta completa es autosuficiente: no requiere instalar paquetes, compilar, claves, base de datos ni suscripciones. Las imágenes y las tipografías son locales.

## Subir a GitHub y Vercel

1. Crear el repositorio y subir **el contenido de version 1** a su raíz: index.html, styles.css, script.js, privacidad.html, vercel.json, robots.txt, sitemap.xml, documentación y assets.
2. En Vercel, importar ese repositorio. Elegir Other como framework, sin comando de compilación ni instalación, con directorio raíz del repositorio. Es un sitio estático.
3. Publicar. El cotizador funciona inmediatamente porque prepara la solicitud en el navegador y deriva a WhatsApp.
4. Conectar el dominio oficial cuando la empresa apruebe la sustitución del sitio actual. Confirmar con el titular la configuración del dominio y redirecciones www/raíz.
5. Las etiquetas canonical, Open Graph y sitemap están preparadas para https://o2arriendos.cl/. Si se usa otro dominio definitivo, sustituirlo en index.html, privacidad.html, robots.txt y sitemap.xml.
6. Registrar o verificar la propiedad en Search Console y enviar el sitemap una vez conectado el dominio oficial. La indexación depende de Google.

Este trabajo entrega archivos para que el usuario los publique posteriormente. No se publicó en cuentas externas ni se reemplazó la web vigente.

## Qué incluye

- Portada con fotografía real, animación de entrada y acento inspirado en las cintas reflectantes.
- Cuatro soluciones principales y secciones para motos y producciones audiovisuales.
- Catálogo filtrable con Maxus T60, SsangYong y camión de apoyo.
- Selección de varios tipos de vehículo y cantidades independientes.
- Cotizador para vehículos/flotas, equipos, carga, motos y producción audiovisual.
- Validación de campos, cantidades y fechas, considerando el día de Chile.
- Resumen de solicitud antes de abrir WhatsApp y opción de copiar.
- Galería deslizable, fotos ampliables, preguntas desplegables, menú móvil, llamada y correo.
- Navegación por teclado, indicadores de foco y respeto de movimiento reducido.
- Metadatos, datos estructurados reales, sitemap, robots y favicon oficial.

## Contactos

WhatsApp y teléfono: +56 9 9221 2300.
Correo: contacto@o2arriendos.cl.
Instagram: https://www.instagram.com/o2arriendos/.

El antiguo enlace de Facebook lleva a la configuración personal de Facebook, no a una página empresarial. No se incluyó un destino incorrecto. Se puede agregar cuando la empresa entregue su URL pública correcta.

## Cotizador

No inventa precios ni confirma stock o reservas. Al completar los campos prepara un resumen, y el visitante decide abrir WhatsApp y enviar. No se envía nada automáticamente. No hay almacenamiento de datos del formulario, seguimiento publicitario ni cookies de analítica.

Las cantidades del catálogo son unidades solicitadas, no unidades disponibles. La empresa confirma tarifa, configuración, condiciones y disponibilidad.

Para cambiar el número, buscar 56992212300 en index.html y script.js; mantener los datos coherentes en privacidad.html y datos estructurados. Los nombres y categorías del cotizador están al inicio de script.js.

## Imágenes

Todos los archivos usados están directamente dentro de assets, sin subcarpetas.
Las fotografías del catálogo y galería son de la empresa o las enviadas por el usuario. Se convirtieron a WebP. El encuadre CSS de las historias oculta sus franjas superiores e inferiores sin regenerar ni sustituir las camionetas.

Se ensayó una mejora de exposición con ImageGen. La entrega usa la foto original para priorizar el requisito de conservar absolutamente los vehículos. El ensayo no forma parte del sitio final. No se usan fotos inventadas de clientes, testimonios, equipos ni de otras flotas.

No se incorporó el afiche de motocicletas como fotografía de disponibilidad, porque es una composición promocional. La sección usa la plataforma real de la empresa y texto editable.

## Archivos

- index.html: contenido, contactos y metadatos.
- styles.css: diseño, encuadres, animación y adaptación móvil.
- script.js: cotizador, filtros, menú, galería y validaciones.
- privacidad.html: explicación factual del tratamiento de la solicitud.
- assets/: recursos finales.
- brief-marca.md: fuentes, decisiones y límites.
- verificacion.md: revisión efectuada.
- vercel.json, robots.txt y sitemap.xml: configuración de publicación.

## Pendientes del negocio

No hay una dirección comercial completa ni horarios confirmados en las fuentes revisadas; se coordina la entrega por ciudad. Por ello no se inventó una oficina ni un mapa. No hay precios públicos verificados. La política describe la implementación entregada; la empresa debe mantenerla coherente si después agrega almacenamiento, analítica, pagos o servicios externos.

Fuentes: ver brief-marca.md.
