# Auditoría — Image-Gallery

Documento de trabajo interno. Estado del proyecto **antes** de la reorganización.
Fecha de auditoría: 2026-07-31.

---

## 1. Resumen ejecutivo

Página única estática (HTML + CSS, sin JS y sin build) con la marca **PARADOX**.
El repositorio contiene 41 archivos en `IMG/`, pero `index.html` sólo muestra 3.
La auditoría visual de los 41 archivos revela que **el contenido de `IMG/` no es
obra propia**: es un tablero de referencias descargado de Instagram / Pinterest,
con marcas de agua de sus autores originales visibles en la mayoría de piezas.
Ver §6 — es el hallazgo que condiciona todo lo demás.

---

## 2. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `Document` | `PARADOX` | Portada: nav, manifiesto sobre el tiempo, captura de email, 3 imágenes, footer | Incompleto |

- Es la única página del proyecto. No existe `404.html`.
- `<title>` es el valor por defecto del editor; sale así en la pestaña y en buscadores.
- No hay `<meta name="description">`, ni Open Graph, ni `<link rel="canonical">`.
- `lang="en"` pero el `placeholder` del formulario está en español (`"Ingresa tu email"`).

## 3. Archivos CSS y JS

| Archivo | ¿Se carga? | Contenido | Estado |
|---|---|---|---|
| `Estilospagina1.css` | Sí (`index.html:7`) | Reset + estilos de página, 315 líneas, todo mezclado | Único CSS activo |
| `Resets.txt` | **No** | CSS de reset guardado con extensión `.txt` | Huérfano — nunca aplica |
| — | — | El proyecto **no contiene ningún archivo `.js`** | Sin JS |

Duplicación: `Resets.txt` y las líneas 1–105 de `Estilospagina1.css` son
prácticamente el mismo reset copiado dos veces. `Resets.txt` además conserva el
marcador del template original: `font-family: "INSERT_NAME"` con
`src: url(FONTS/CARPETA/NOMBREFUENTE.ttf)`.

## 4. Dependencias externas

| Tipo | Detalle |
|---|---|
| CDNs | Ninguno |
| Fuentes remotas | Ninguna — las dos familias son self-hosted |
| Librerías JS | Ninguna |
| npm / build | No hay `package.json`, no hay paso de build |

Sin peticiones a terceros. Es el punto más sano del proyecto.

## 5. Fuentes

| Archivo | Peso | ¿Se usa? |
|---|---|---|
| `FONTS/Caveat/Caveat-Regular.ttf` | 250,9 KB | Sí — `@font-face` "Caveat" |
| `FONTS/Caveat/Caveat-Bold.ttf` | 251,2 KB | No declarada |
| `FONTS/Caveat/Caveat-Medium.ttf` | 251,7 KB | No declarada |
| `FONTS/Caveat/Caveat-SemiBold.ttf` | 251,8 KB | No declarada |
| `FONTS/Caveat/Caveat-VariableFont_wght.ttf` | 381,9 KB | No declarada |
| `FONTS/Passions_Conflict/PassionsConflict-Regular.ttf` | 140,1 KB | `@font-face` "Passions" declarada pero **nunca aplicada** a ningún selector |
| `FONTS/*/OFL.txt`, `README.txt` | 10,9 KB | Licencias — se conservan (obligatorio con OFL) |

1,53 MB en fuentes, de los cuales sólo 250 KB se usan realmente. Ambas familias
son SIL Open Font License, así que su uso y redistribución sí está permitido.

## 6. Imágenes — inventario y procedencia

Las 41 piezas de `IMG/` se agrupan en 9 conjuntos. La columna **Procedencia** es
resultado de inspeccionar cada archivo: casi todos llevan la firma de su autor
impresa en la propia imagen.

| Grupo | Archivos | Dimensiones | Procedencia observada |
|---|---|---|---|
| Serie de carteles "x of 365" | `1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 31, 36` | 646×808 – 1262×379 | Firmados **`@reuel.dsgn`** / "REUEL 2022 · 196, 200, 208 of 365" |
| Arte digital abstracto | `19, 20` | 1080×1351 | Firmados **`by @songsandthespirits`** |
| Promo de tipografía HappyFatFont | `21, 22, 23, 24, 25, 26` | 750×748 | Firmados **`@Jazheiman`** / `www.heytype.xyz` |
| Identidad de marca "Gebeiteld" | `14, 15, 16, 17, 18, 37` | 750×750 – 1264×422 | Estudio **Gebeiteld / Julien van Driel** (NL). Contienen datos reales — ver §7 |
| Capturas web Robbrecht en Daem | `27, 28, 29` | 1080×1081 | Pantallazos del sitio de **Robbrecht en Daem architecten** |
| Captura web CMV | `38` | 1080×1081 | Pantallazo del sitio del estudio **CMV** |
| Fotografía de arquitectura | `30, 34, 35` | 750×422 – 1536×1024 | Sin firma. Marina Bay Sands y edificios identificables; origen desconocido |
| Line art geométrico (búho) | `32, 33` | 908×909 | Clip art, misma pieza en positivo y negativo |
| Iconos y marcas | `39` (logo Instagram), `40` (pictograma), `41.png` (lupa), `36.ico` | 136×132 – 600×600 | Marcas y pictogramas de terceros |

Otros gráficos fuera de `IMG/`:

| Archivo | Peso | Dimensiones | ¿Se usa? |
|---|---|---|---|
| `Image-Gallery.png` | 173,5 KB | 1024×1024 | Sí — como favicon (`index.html:8`). Logotipo propio del repo (obturador + "Image-Gallery") |
| `IMG/waves.svg` | 3,2 KB | 900×900 | **No** — huérfano |
| `SVG/arrow_downward…svg` | 0,1 KB | 48×48 | **No** — huérfano |

**Peso total de `IMG/`: 9,53 MB.** Sólo 3 archivos (389 KB) se cargan hoy.

### Imágenes usadas actualmente

| Ruta en HTML | Archivo | Peso | `alt` |
|---|---|---|---|
| `IMG/24.jpg` | HappyFatFont — foto + rótulo | 119,2 KB | vacío |
| `IMG/26.jpg` | HappyFatFont — niños en escalera | 177,6 KB | vacío |
| `IMG/23.jpg` | HappyFatFont — numerales | 92,1 KB | vacío |

Las tres pertenecen al mismo conjunto de terceros (`@Jazheiman`).

## 7. Datos personales y financieros de terceros

`IMG/17.jpg` es una **factura comercial real**, legible a tamaño completo:

| Dato expuesto | Valor |
|---|---|
| Emisor | Gebeiteld — Kloosterstraat 3, 5921 HA Blerick (NL) |
| Teléfono | +31 633 766 168 |
| IVA emisor | NL1243.576.869 |
| Cliente | Molden Studio — Begijnenvest 102, 2000 Antwerpen (BE) |
| Contacto cliente | Cedric Janssen · hello@molden.studio |
| IVA cliente | BE1243.576.869 |
| **Cuenta bancaria** | **NL06 INGB 3432 6578 23** |
| Importe / nº factura | € 17.000,00 · 20210001 · 25-03-2021 |

El mismo teléfono y dirección se repiten en `14.jpg`, `16.jpg` y `37.jpg`.

No hay credenciales, tokens ni API keys en el código fuente — pero sí hay un
IBAN y datos de contacto de terceros dentro de un archivo de imagen del repo.

## 8. Enlaces, rutas y referencias rotas

| Comprobación | Resultado |
|---|---|
| `href` a archivos inexistentes | Ninguno — **no hay ningún `<a>` en toda la página** |
| `src` de imagen inexistente | Ninguno — las 3 rutas resuelven |
| `<link>` / `<script>` inexistentes | Ninguno |
| Enlaces del nav | `INFO`, `MERCH`, `MENU` son `<div>`, no enlaces: no llevan a ninguna parte |
| `IMG/2.jpg` | No existe — hueco en la numeración (1, 3, 4, …, 40) |

## 9. Problemas de HTML

- `<title>Document</title>` — valor por defecto sin tocar.
- Sin `description`, Open Graph ni `canonical`.
- Favicon: PNG de 1024×1024 y 173 KB usado como icono de pestaña.
- El nav usa `<div>` en lugar de `<a>`/`<button>`: no es navegable con teclado.
- Formulario sin `<label>`, sólo `placeholder`; `action=""` y `method="get"`
  hacen que al enviar recargue la propia página. No hay servicio detrás.
- `<p>` fuera de `<section>` cierra mal el anidamiento: `</section>` en la
  línea 27 cierra antes que `</header>` en la 28, con la apertura invertida.
- El footer empieza con `>Lorem ipsum dolor sit amet…` — texto de relleno del
  template, con un `>` suelto delante.
- `type="Email"` y `type="Submit"` con mayúsculas iniciales.
- Un solo `<h1>` — correcto. Pero no hay `<h2>` ni jerarquía posterior.

## 10. Problemas de CSS

| Problema | Detalle |
|---|---|
| `display: ;` | `Estilospagina1.css:154` — declaración vacía, inválida |
| Selector sin acotar | `.PrincipalInfo h1 ,p` — la coma deja `p` como selector global, afecta a toda la página |
| `.PrincipalInfo div` | Alcanza cualquier `div` descendiente, incluidos los del formulario |
| Reset duplicado | Líneas 1–105 repiten `Resets.txt` |
| Regla de relleno | `.FooterDIV footer p { background-color: red; height: 200px }` — rojo de depuración, visible en producción |
| Breakpoints | `990px`, `913px`, `376px`, `281px` — valores arbitrarios, todos `max-width` (desktop-first) |
| Variables CSS | Ninguna. `#0D0D0D`, `#D9D9D9`, `#BFBFBF`, `#F2F2F2` repetidos a mano |
| Escala de espaciado | Inexistente: `5px`, `20px`, `90px`, `1px`, `10px` sin sistema |
| Maquetación | `.PrincipalInfo` y `.SecondInfo` son `position: absolute` con `top: 100%`; el layout no fluye, se apila a mano |
| `@font-face` | Declarados **después** de usarse en `html{}`, y sin `font-display` |
| Fuente "Passions" | Declarada y nunca aplicada |

### Consecuencia visible de la maquetación absoluta

Con `.PrincipalInfo` en `height: 100%` y `.SecondInfo` en `top: 100%`, el
contenido inferior queda fuera del flujo: el `<body>` no crece con él y el footer
se solapa. Es el fallo estructural de fondo, no un detalle estético.

## 11. Archivos basura

| Archivo | Veredicto |
|---|---|
| `.bak`, `copia de`, `final_v2` | No hay |
| `.DS_Store`, `Thumbs.db` | No hay |
| `node_modules/` | No hay |
| `.gitignore` | **No existe** |
| `Resets.txt` | CSS con extensión equivocada, nunca cargado — es basura funcional |

## 12. Nombres de archivo

| Nombre actual | Problema |
|---|---|
| `Estilospagina1.css` | Mayúscula, sin guiones, numeración de versión implícita |
| `Resets.txt` | Mayúscula + extensión incorrecta |
| `FONTS/`, `IMG/`, `SVG/` | Carpetas en mayúsculas |
| `IMG/1.jpg` … `IMG/41.png` | Numeración sin semántica |
| `SVG/arrow_downward_FILL0_wght400_GRAD0_opsz48.svg` | Nombre exportado de Material Symbols sin limpiar |

## 13. Contenido heredado del template

- `>Lorem ipsum dolor sit amet consectetur, adipisicing elit…` en el footer.
- `INSERT_NAME` / `NOMBREFUENTE.ttf` en `Resets.txt`.
- `<title>Document</title>`.
- `background-color: red` de depuración en el footer.

## 14. Discrepancias del README actual

El `README.md` presente en el repo describe un sitio que no existe:

| Afirma | Realidad |
|---|---|
| "Thirty-nine photographs make up the body of the page" | La página muestra 3 imágenes |
| "The photography carries that argument" | No son fotografías del autor; son carteles y capturas de terceros |
| "39 photographs presented as a single continuous body of work" | No hay galería implementada |
| Demo en `paradoxgallery.wib.digital` | Sin verificar en esta sesión |

---

## 15. Lo más grave, por orden

1. **Procedencia del contenido.** Las 41 piezas de `IMG/` son obra de terceros
   identificables y firmados (`@reuel.dsgn`, `@songsandthespirits`,
   `@Jazheiman`, Gebeiteld, Robbrecht en Daem, CMV). Publicarlas como galería
   propia es un problema de derechos, no de código.
2. **`IMG/17.jpg` contiene un IBAN y datos de contacto reales de dos empresas.**
   No debe publicarse en ningún caso.
3. **La maquetación absoluta rompe el flujo del documento**: el footer se solapa
   y la página no crece con su contenido.
4. **El `<head>` no tiene nada**: título por defecto, sin description, sin OG,
   sin canonical.
5. **El formulario no envía a ninguna parte** y el nav no navega: los tres
   elementos interactivos de la página son decorativos.
