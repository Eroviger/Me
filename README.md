# Planner Chromakopia (v1)

Sistema de hojas estructuradas minimal para organización semanal, diaria, entrenamiento, estudio, creatividad y reflexión — con estética inspirada en una paleta tipo “Chromakopia”.

## Características
- HTML estático + CSS + JS (sin dependencias externas excepto Google Fonts).
- Guardado automático en `localStorage` (los datos NO salen de tu equipo).
- Modo oscuro/claro (toggle).
- Botones: Exportar / Importar / Reset / Imprimir (PDF).
- Diseño optimizado para impresión en hoja tamaño Carta (Letter).
- Secciones modulares (cada `.page` genera un salto de página al imprimir).
- Campos editables `contenteditable` + inputs / textareas.
- Paleta y variables configurables en `styles.css`.

## Estructura
```
/
├─ index.html
├─ styles.css
├─ script.js
└─ README.md
```

## Uso Rápido
1. Clona o copia el repositorio.
2. Abre `index.html` en tu navegador (o sirve con VS Code Live Server).
3. Rellena campos → se guardan automáticamente.
4. Ctrl + S también dispara un guardado visual (aunque no es necesario).
5. Imprimir / PDF: botón “Imprimir / PDF” → ajustar márgenes “Predeterminado” (el CSS ya fija `@page size: Letter`).
6. Exportar JSON: guarda un respaldo manual.
7. Importar JSON: restaura (sobrescribe) datos.

## Despliegue en GitHub Pages
1. Crea un repositorio (ej: `planner-chromakopia`).
2. Sube estos archivos.
3. Activa GitHub Pages (branch `main`, carpeta `/root`).
4. Accede: `https://TU_USUARIO.github.io/planner-chromakopia/`.

## Personalización Rápida
Edita en `:root` (styles.css):
```
--accent
--accent-pink
--accent-cool
--accent-warm
--bg / --panel / --border
```
Cambia fuentes: en `<head>` de `index.html`.

## Seguridad / Privacidad
- Todo el contenido se guarda en `localStorage` bajo la clave `chromakopia_planner_v1`.
- Si borras datos del navegador / usas modo incógnito, se perderán (usa “Exportar” para respaldo).
- IMPORTANTE: contenido sensible no se cifra.

## Añadir Nuevas Páginas
Duplica un bloque:
```html
<section class="page tab" data-tab="mi-nueva">
  <h2>Título</h2>
  ...
</section>
```
Añade botón en `<nav class="tabs">`:
```html
<button data-tab="mi-nueva">Nueva</button>
```

## Accesibilidad / Consejos
- Evita sobrecargar con demasiado texto en un solo campo.
- Usa la sección “Parking Lot” para soltar ideas sin romper enfoque semanal.
- “Mapa Mental” acepta sólo 1–3 palabras por nodo para mantener claridad visual.

## Ideas Futuras (puedes implementarlas)
- Botón “Duplicar día” (clonar plan diario).
- Exportar a Markdown.
- Modo “Focus” (oculta navegación, sólo una página).
- Sincronización cifrada usando un backend ligero (opcional).

## Licencia
Puedes usar/modificar libremente para uso personal. Agrega crédito si lo compartes públicamente.

## Preguntas Frecuentes
**¿Pierdo datos al actualizar el repositorio?**  
No, mientras no limpies localStorage del navegador y la clave no cambie.

**¿Puedo imprimir sólo algunas secciones?**  
Sí: antes de imprimir, en el diálogo del navegador selecciona páginas específicas (cada `.page` es una hoja).

**¿Puedo cambiar a A4?**  
Edita en `styles.css`:
```
@page { size: A4 portrait; }
```

---

Hecho con foco en simplicidad + estética.  
¡Disfruta y adáptalo a tu flujo!
