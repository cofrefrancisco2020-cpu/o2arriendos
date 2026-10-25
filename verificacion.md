# Verificación de la entrega

Fecha: 25 de octubre de 2026.

## Navegador

Revisión visual directa en Chrome, mediante el sitio local.
- Escritorio: 1536 px de ancho.
- Tablet: 768 × 1024.
- Celular: 390 × 844.
- Pantalla pequeña: 320 × 740.
- Sin desbordamiento horizontal en las cuatro medidas.
- Imágenes de historias encuadradas en proporción 900:506 sin franjas sociales; vista ampliada con el vehículo completo.
- Menú móvil abre, cierra y navega; volver al inicio funciona.
- Filtros muestran la categoría correspondiente y actualizan el estado accesible.
- Galería horizontal desplaza 420 px en escritorio; ampliación, siguiente y cierre funcionan.
- Preguntas frecuentes abren su respuesta.
- Consola revisada: sin errores ni advertencias de la aplicación.

## Cotizador

Pruebas efectuadas sin enviar ningún mensaje real:
- Dos Maxus T60 y una SsangYong: resumen con cantidades independientes y contacto oficial.
- Transporte de dos motos: origen Santiago, destino Puerto Montt, modelo y fechas en el mensaje.
- Tres motobombas: equipo, cantidad y lugar en el mensaje.
- Cotización rápida de flotas con cinco unidades: servicio y cantidad trasladados al formulario.
- Fechas de inicio y término en el mismo día: aceptadas.
- Fecha de término anterior al inicio: rechazada.
- Resumen abre en pantalla de 320 px, sin desbordamiento.
- El destino generado es https://wa.me/56992212300 con mensaje codificado correctamente.
- Cambio de servicio desactiva los campos ocultos.
- Solicitud únicamente se comparte cuando el visitante abre WhatsApp y decide enviarla.

No se confirmó recepción por la empresa porque no se enviaron solicitudes de prueba.

## Archivos y recursos

- Sintaxis de script.js verificada con Node.
- Referencias directas a recursos revisadas: todos existen y responden HTTP 200.
- index.html, privacidad.html, robots.txt y sitemap.xml responden HTTP 200.
- Anclas internas verificadas: destinos existentes.
- vercel.json y sitemap.xml analizados correctamente.
- Assets en una sola carpeta, sin subcarpetas.
- Fotos originales e intermedios no usados, fuera de la entrega.
- Tipografías locales con sus licencias.
- Entrega estática; sin instalación, compilación o credenciales.

## Límites de verificación

No se desplegó en Vercel, no se conectó el dominio y no se modificó la web antigua; el usuario solicitó los archivos para publicarlos después. La revisión responsive fue mediante cambio de viewport en Chrome, no en teléfonos físicos ni Safari.
