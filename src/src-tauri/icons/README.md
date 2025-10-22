# Iconos de Pavotify

Esta carpeta debe contener los iconos de la aplicación en los siguientes formatos:

## Iconos Requeridos

- `32x32.png` - Icono pequeño para Windows
- `128x128.png` - Icono mediano
- `128x128@2x.png` - Icono retina para macOS
- `icon.icns` - Icono para macOS
- `icon.ico` - Icono para Windows

## Generar Iconos

Puedes usar herramientas online o el comando de Tauri:

### Opción 1: Usar tauri icon (Recomendado)

```bash
# Instalar tauri-cli si no lo tienes
cargo install tauri-cli

# Generar iconos desde una imagen PNG de alta resolución (1024x1024)
cargo tauri icon path/to/your/icon.png
```

### Opción 2: Herramientas Online

1. **Para .ico (Windows):**
   - https://www.favicon-generator.org/
   - https://convertio.co/png-ico/

2. **Para .icns (macOS):**
   - https://cloudconvert.com/png-to-icns
   - https://anyconv.com/png-to-icns-converter/

## Especificaciones de Diseño

### Recomendaciones para el icono de Pavotify:

- **Tema:** Música + Pavo (pavo real/elegante)
- **Colores:** Azul cyan, gradientes oscuros
- **Estilo:** Moderno, minimalista, glassmorphism
- **Tamaño base:** 1024x1024px PNG con transparencia

### Sugerencias de diseño:

1. **Opción 1:** Nota musical con efecto de vidrio líquido
2. **Opción 2:** Letra "P" estilizada con gradiente azul-cyan
3. **Opción 3:** Vinilo/disco con pluma de pavo real

## Estructura de Archivos

```
icons/
├── 32x32.png           # 32x32 píxeles
├── 128x128.png         # 128x128 píxeles
├── 128x128@2x.png      # 256x256 píxeles
├── icon.icns           # macOS
├── icon.ico            # Windows (multi-tamaño)
└── README.md           # Este archivo
```

## Crear Iconos Manualmente

Si quieres crear los iconos manualmente:

### macOS (.icns)

```bash
# Crear iconset
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png

# Convertir a icns
iconutil -c icns icon.iconset
```

### Windows (.ico)

Usa ImageMagick:
```bash
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

## Iconos Temporales

Si no tienes iconos listos, Tauri generará iconos por defecto durante la compilación. Sin embargo, es altamente recomendable crear iconos personalizados para tu aplicación.
