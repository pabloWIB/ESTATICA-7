# Registro de cambios

Reorganización completa del proyecto, 2026-07-31. Agrupado por fase.
El estado de partida está documentado en [`auditoria.md`](auditoria.md).

**No se ejecutó ningún comando de git.** Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventariados los 41 archivos de `IMG/`, abriendo cada uno para identificar
  contenido y procedencia.
- Medidos peso y dimensiones de cada imagen, y peso de las 9 fuentes.
- Detectados: `<title>Document</title>`, ausencia total de metadatos,
  `Resets.txt` huérfano, maquetación con `position: absolute` que rompe el
  flujo, `display: ;` inválido, `background-color: red` de depuración,
  Lorem ipsum en el footer, nav no navegable y formulario sin destino.
- Escrito `docs/auditoria.md` con el inventario completo en tablas.

**Hallazgo bloqueante:** las 41 piezas de `IMG/` son obra de terceros
identificables (`@reuel.dsgn`, `@songsandthespirits`, `@Jazheiman`, Gebeiteld,
Robbrecht en Daem, CMV), y cuatro archivos contenían datos personales y
bancarios reales. Se consultó antes de continuar.

## Fase 2 — Estructura

- Creada la jerarquía `assets/{css,js,img,fonts}` y `docs/`.
- 32 imágenes renombradas con nombres semánticos en minúscula y guiones
  (`4.jpg` → `expect-the-unexpected-poster.webp`, etc.).
- `Estilospagina1.css` (315 líneas, todo mezclado) dividido en `base.css`,
  `layout.css` y `components.css`.
- Creado `404.html` con la misma cabecera y pie que la portada.
- Todas las rutas actualizadas y verificadas: 66 referencias locales
  comprobadas contra el disco, 0 rotas.

## Fase 3 — Higiene

- **Eliminado `IMG/17.jpg`**, factura comercial real con IBAN
  `NL06 INGB 3432 6578 23`, dos números de IVA, teléfono, direcciones postales
  y correo de dos empresas.
- **Eliminados `IMG/14.jpg`, `IMG/16.jpg` y `IMG/37.jpg`**, que repetían el
  teléfono, la dirección y el IVA de la misma empresa.
- Eliminados por no usarse: `IMG/waves.svg`, `SVG/arrow_downward…svg`,
  `IMG/39.jpg` (logo de Instagram), `IMG/40.jpg` y `IMG/41.png` (pictogramas),
  `IMG/36.ico`, e `IMG/32.jpg` (duplicado invertido de `33.jpg`).
- Eliminado `Resets.txt`: CSS con extensión `.txt`, nunca cargado, duplicaba el
  reset de `Estilospagina1.css` y conservaba los marcadores `INSERT_NAME` y
  `NOMBREFUENTE.ttf` del template original.
- Eliminado `Estilospagina1.css`, sustituido por los tres archivos nuevos.
- Eliminado `Image-Gallery.png` (1024×1024, 173 KB): no lo referenciaba nada
  salvo el favicon. El obturador se extrajo de él para generar los iconos, así
  que la marca sobrevive en `assets/img/logo/`. El original sigue recuperable
  desde el historial de git.
- Eliminadas 5 fuentes nunca declaradas y `PassionsConflict-Regular.ttf`,
  declarada pero jamás aplicada a ningún selector.
- Creado `.gitignore` (node_modules, .env, .DS_Store, Thumbs.db, *.log, .vercel).
- Normalizado el formato: indentación de 2 espacios, comillas dobles en HTML,
  punto y coma en JS, saltos LF y una línea final en cada archivo.
- **No se encontraron credenciales, tokens ni API keys en el código.** El
  problema era de datos de terceros dentro de archivos de imagen.

## Fase 4 — Imágenes

- Las 32 piezas convertidas a WebP y redimensionadas a 800 px de lado máximo.
  Las 13 más pesadas se recodificaron a calidad 70 por su textura de trama.
- Peso de imágenes: **9,53 MB → 2,4 MB** (−75 %).
- `width` y `height` reales escritos en cada `<img>`, extraídos de la cabecera
  de cada archivo WebP mediante script para que no puedan desviarse.
- `loading="lazy"` y `decoding="async"` en las 29 piezas bajo el pliegue;
  las 3 primeras cargan de forma anticipada y la primera lleva
  `fetchpriority="high"`.
- `alt` descriptivo y real en cada pieza, escrito tras mirar la imagen. Los
  `alt` vacíos que había se sustituyeron. El logotipo de cabecera lleva
  `alt=""` por ser decorativo junto al texto "PARADOX".
- Generados desde el logotipo existente: `paradox-mark.png` (180×180),
  `favicon-32.png` y `og-cover.jpg` (1200×630).

## Fase 5 — HTML, SEO y accesibilidad

- Estructura semántica: `header`, `nav`, `main`, `section`, `article` implícito
  vía `figure`, `footer`. Un solo `<h1>` por página, jerarquía sin saltos.
- `<head>` completo: `title` único (53 caracteres), `description` única
  (153 caracteres), Open Graph completo, `twitter:card`, `canonical`, favicon,
  `apple-touch-icon` y `theme-color`.
- `og:image` apunta a `assets/img/og-cover.jpg`, que existe en disco.
- Accesibilidad: enlace de salto al contenido, `:focus-visible` visible en todo
  elemento interactivo, `aria-label` en los botones de sólo icono,
  `aria-expanded` y `aria-controls` en el toggle, `aria-pressed` en los filtros,
  región `role="status"` que anuncia el recuento al filtrar, `aria-modal` y
  trampa de foco en el lightbox, navegación completa por teclado.
- Contraste sobre `#0D0D0D`: texto principal `#F2F2F2` a 16,7:1, texto
  secundario `#A3A3A3` a 7,5:1, acento `#10D0CF` a 10,4:1. Todos sobre 4,5:1.
- Generados `robots.txt` y `sitemap.xml` con la URL real del sitio.
- Eliminado el Lorem ipsum del footer y el `<title>Document</title>`.

## Fase 6 — CSS y sistema de diseño

- Paleta derivada de la que ya usaba el sitio (`#0D0D0D`, `#F2F2F2`, `#BFBFBF`)
  más el cian `#10D0CF` muestreado del propio logotipo del repositorio.
- Tokens en `:root`: color, tipografía, espaciado, radios, sombra y transición.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96, sin valores sueltos.
- Escala tipográfica fluida con `clamp()`. Dos familias como máximo: Caveat
  para el wordmark y la cita, pila del sistema para el resto.
- Corregidos: `display: ;` inválido, el selector `.PrincipalInfo h1 ,p` cuya
  coma afectaba a todos los `<p>` de la página, y la regla de depuración
  `background-color: red` del footer.
- Sustituida la maquetación `position: absolute` con `top: 100%` por flujo
  normal y CSS Grid.
- Cero `!important`, cero estilos inline, ningún selector de más de 3 niveles.
- Orden dentro de cada archivo: variables → reset → base → layout →
  componentes → utilidades → media queries.

## Fase 7 — Responsive

- Mobile-first: todas las media queries son `min-width`.
- Breakpoints 480 / 768 / 1024 / 1440, sustituyendo los antiguos 990 / 913 /
  376 / 281 en `max-width`.
- Rejilla 1 → 2 → 3 columnas.
- Verificado sin scroll horizontal en 360, 480, 768, 1024 y 1440 px.
- Todas las áreas táctiles a 44 px mínimo. Se corrigieron el enlace de salto
  (40 px de alto) y los dos enlaces de crédito (25 px).
- Menú móvil verificado en las dos direcciones, con bloqueo de scroll de fondo,
  cierre al pulsar un enlace, cierre con `Escape` y devolución del foco.

## Fase 8 — UX / UI

- El propósito del sitio se lee en la primera pantalla, incluida la aclaración
  de que las piezas no son obra propia.
- Un CTA principal por pantalla, con destino real.
- Estados default, hover, focus, active y disabled en todo elemento
  interactivo; transiciones de 180 ms.
- Ancho de línea limitado a 68 caracteres mediante `--measure`.
- **Formulario de captura de email eliminado.** No estaba conectado a ningún
  servicio: `action=""` con `method="get"` recargaba la propia página. Se
  sustituyó por un enlace `mailto:` real, y la sección de contacto explica que
  no hay lista de correo detrás.
- Sin gradientes decorativos, sombras exageradas ni animaciones gratuitas.

## Fase 9 — JavaScript

- El proyecto no tenía JS. Se añadieron 5 archivos, 352 líneas.
- Un único punto de entrada `main.js`; el resto en `assets/js/modules/`.
- Sin variables globales sueltas: un solo espacio de nombres `window.Paradox`.
  Sin `var`; `const` y `let` en todo el código.
- Delegación de eventos en los filtros y en la apertura del lightbox: dos
  listeners en lugar de 39.
- Cada inicializador comprueba que su marcado existe antes de operar, de modo
  que el mismo conjunto de scripts sirve para `index.html` y `404.html`.
- El `<img>` del lightbox se crea desde JS para que el documento no contenga
  nunca un `<img>` sin `src`.
- Cero errores y cero avisos en consola, en `http://` y en `file://`.

## Fase 10 — Rendimiento

- Los tres CSS se cargan en el `<head>`; los 5 scripts con `defer`.
- Fuentes subsetadas a Latin y convertidas a WOFF2: **1,53 MB de TTF → 100 KB**
  (−94 %). `font-display: swap` y `preload` del peso usado en el wordmark.
- Sin `preconnect`: no hay ningún origen externo que precargar.
- **Primera carga: 626 KB en 15 peticiones**, por debajo del objetivo de 1 MB.
  Reparto: 516 KB de imágenes, 95 KB de fuentes, 6 KB de HTML, 5 KB de CSS,
  4 KB de JS.
- Ninguna librería cargada para usar una sola función.

## Fase 11 — QA

Verificado uno por uno:

- 66 referencias locales comprobadas contra el disco: 0 rotas.
- Ninguna imagen del disco queda sin referenciar; ninguna referencia sin archivo.
- 0 errores en consola en ambas páginas, por `http://` y por `file://`.
- Sin scroll horizontal en 360 / 480 / 768 / 1024 / 1440 px.
- Filtros: recuentos correctos (32 / 14 / 6 / 4 / 3 / 3 / 2) y `aria-pressed`
  coherente.
- Lightbox: abre, avanza, cicla dentro del subconjunto filtrado, cierra con
  `Escape`, bloquea y libera el scroll, devuelve el foco.
- Menú móvil: abre y cierra por toggle, por enlace y por `Escape`.
- Sin Lorem ipsum, sin TODO, sin texto de template.
- `404.html` existe y enlaza de vuelta al inicio.
- Sin credenciales en el código.

## Fase 12 — Documentación

- `README.md` reescrito. El anterior describía un sitio inexistente: afirmaba
  "39 photographs make up the body of the page" cuando la página mostraba 3, y
  presentaba las piezas como fotografía propia.
- `docs/auditoria.md` y `docs/cambios.md` añadidos.

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente y sirviendo con `npx serve`.
- Sin rutas absolutas de máquina local en ningún archivo.
- Todas las rutas internas relativas y en minúsculas.
- No se creó configuración de hosting: no se indicó destino.
- **No se ejecutó ningún deploy.**

---

## Pendiente

- Los créditos de 4 piezas (`geometric-owl`, `planted-terraces-facade`,
  `stone-house-entrance`, `singapore-towers-diptych`) están marcados como
  autor no identificado. No llevan firma ni metadatos.
- `npx serve` falla en esta máquina por una instalación global rota de `serve`
  (`Cannot find module …\serve\build\main.js`). Se sirvió con una caché de npx
  aislada. Se arregla con `npm i -g serve` o `npm rm -g serve`.
- El dominio `paradoxgallery.wib.digital` se ha mantenido como canónico porque
  ya figuraba en el README anterior; no se ha verificado en esta sesión.
