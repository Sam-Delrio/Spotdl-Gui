# 🎵 Pavotify - Music Downloader

Pavotify es una aplicación de escritorio elegante para descargar música de Spotify con un hermoso diseño de vidrio líquido (liquid glass) estilo iOS.

![Pavotify](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## ✨ Características

- 🎨 **Diseño Liquid Glass** - Interfaz moderna con efectos de vidrio líquido estilo iOS 18
- 📥 **Descarga de Spotify** - Descarga canciones, álbumes y playlists completas
- 📁 **Selector de Carpetas** - Interfaz nativa para seleccionar destino de descarga
- 📊 **Historial** - Mantén un registro de todas tus descargas
- 🎯 **Alta Calidad** - Descargas en MP3 320kbps
- 🖥️ **Multiplataforma** - Funciona en Windows, macOS y Linux

## 📋 Requisitos Previos

### Para Desarrollo

1. **Node.js** (v18 o superior)
   - Descargar desde: https://nodejs.org/

2. **Rust** (última versión estable)
   - Descargar desde: https://rustup.rs/
   - En Windows, también necesitarás Microsoft Visual C++ Build Tools

3. **spotdl** (para descargar música)
   ```bash
   pip install spotdl
   ```

4. **pnpm** (recomendado) o npm
   ```bash
   npm install -g pnpm
   ```

### Para Usuarios Finales

Solo necesitas instalar **spotdl**:
```bash
pip install spotdl
```

## 🚀 Instalación para Desarrollo

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd pavotify
```

### 2. Instalar dependencias

```bash
pnpm install
# o
npm install
```

### 3. Verificar que Rust está instalado

```bash
rustc --version
cargo --version
```

### 4. Verificar que spotdl está instalado

```bash
spotdl --version
```

## 🛠️ Desarrollo

### Ejecutar en el navegador (desarrollo web)

```bash
pnpm dev
# o
npm run dev
```

Esto abrirá la aplicación en el navegador en http://localhost:5173. La funcionalidad de descarga estará simulada.

### Ejecutar con Tauri (aplicación de escritorio)

```bash
pnpm tauri dev
# o
npm run tauri dev
```

Esto abrirá la aplicación en modo desarrollo con hot-reload. Requiere que Rust y las dependencias de Tauri estén instaladas.

## 📦 Compilación

### Compilar para producción

```bash
pnpm tauri build
# o
npm run tauri build
```

Los ejecutables se generarán en:
- **Windows**: `src-tauri/target/release/pavotify.exe`
- **macOS**: `src-tauri/target/release/bundle/dmg/Pavotify_1.0.0_x64.dmg`
- **Linux**: `src-tauri/target/release/bundle/deb/pavotify_1.0.0_amd64.deb` o `.AppImage`

### Compilar solo el frontend (para web)

```bash
pnpm build
# o
npm run build
```

## 🎯 Uso

1. **Abrir Pavotify**
2. **Pegar URL de Spotify** - Puede ser una canción, álbum o playlist
3. **Seleccionar carpeta** - Elige donde guardar las descargas
4. **Click en Descargar** - ¡Y listo!

### URLs Soportadas

- Canciones individuales: `https://open.spotify.com/track/...`
- Álbumes completos: `https://open.spotify.com/album/...`
- Playlists: `https://open.spotify.com/playlist/...`

## 📁 Estructura del Proyecto

```
pavotify/
├── src-tauri/              # Código Rust de Tauri
│   ├── src/
│   │   └── main.rs        # Backend principal
│   ├── Cargo.toml         # Dependencias de Rust
│   └── tauri.conf.json    # Configuración de Tauri
├── App.tsx                # Componente principal de React
├── components/            # Componentes de UI
│   └── ui/               # Componentes shadcn/ui
├── styles/               # Estilos globales
│   └── globals.css       # CSS de Tailwind
├── backend/              # Backend Python opcional
│   ├── spotdl_server.py  # Servidor Flask (opcional)
│   └── README.md         # Docs del backend
└── types/                # Tipos de TypeScript
    └── tauri.d.ts        # Tipos de Tauri
```

## 🔧 Configuración Avanzada

### Cambiar calidad de audio

Editar `src-tauri/src/main.rs`:

```rust
.arg("--bitrate")
.arg("320k")  // Cambiar a: 128k, 192k, 256k, 320k
```

### Cambiar formato de audio

```rust
.arg("--format")
.arg("mp3")  // Cambiar a: flac, ogg, opus, m4a
```

### Personalizar ventana

Editar `src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [{
      "width": 500,
      "height": 800,
      "resizable": true
    }]
  }
}
```

## 🐛 Solución de Problemas

### Error: "spotdl no está instalado"

```bash
pip install --upgrade spotdl
```

### Error de compilación en Windows

Instalar Microsoft Visual C++ Build Tools:
https://visualstudio.microsoft.com/visual-cpp-build-tools/

### Error de compilación en Linux

Instalar dependencias:
```bash
# Ubuntu/Debian
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

# Fedora
sudo dnf install webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel

# Arch
sudo pacman -S webkit2gtk \
  base-devel \
  curl \
  wget \
  file \
  openssl \
  libappindicator-gtk3 \
  librsvg
```

### La descarga falla

1. Verificar que la URL de Spotify es válida
2. Verificar conexión a internet
3. Verificar que spotdl funciona desde terminal:
   ```bash
   spotdl "https://open.spotify.com/track/..."
   ```

## 📝 Scripts de Package.json

Agrega estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "tauri": "tauri",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build"
  }
}
```

## 🎨 Personalización

### Cambiar colores

Editar los gradientes en `App.tsx`:

```tsx
// Fondo principal
bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950

// Efectos de luz
from-blue-600 to-cyan-500
```

### Cambiar nombre de la app

1. `src-tauri/tauri.conf.json` - Cambiar `productName`
2. `src-tauri/Cargo.toml` - Cambiar `name`
3. `App.tsx` - Cambiar el título

## 🚢 Distribución

### Windows

El instalador `.msi` y ejecutable `.exe` se generan automáticamente en:
```
src-tauri/target/release/bundle/msi/
src-tauri/target/release/
```

### macOS

Se genera un `.dmg` para distribución:
```
src-tauri/target/release/bundle/dmg/
```

### Linux

Se generan varios formatos:
- `.deb` para Debian/Ubuntu
- `.AppImage` para distribución universal
- `.rpm` para Fedora/RHEL

## 🔐 Seguridad

- La aplicación NO almacena credenciales de Spotify
- Usa spotdl que descarga desde YouTube/otras fuentes legales
- El historial se guarda localmente en tu dispositivo
- No se envían datos a servidores externos

## 📜 Licencia

Este proyecto es de código abierto. Ver LICENSE para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork del proyecto
2. Crear una rama (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Abre un issue en GitHub
3. Consulta la documentación de [Tauri](https://tauri.app/) y [spotdl](https://github.com/spotDL/spotify-downloader)

## 🙏 Agradecimientos

- [Tauri](https://tauri.app/) - Framework para aplicaciones de escritorio
- [spotdl](https://github.com/spotDL/spotify-downloader) - Descargador de Spotify
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

Hecho con ❤️ usando Tauri, React y Rust
