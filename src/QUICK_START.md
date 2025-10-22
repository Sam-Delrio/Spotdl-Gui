# 🚀 Guía Rápida - Pavotify

Esta es una guía rápida para poner en marcha Pavotify en pocos minutos.

## ⚡ Instalación Rápida

### Opción 1: Desarrollo Web (Navegador)

**Más rápido para probar la UI**

1. **Instala dependencias:**
   ```bash
   npm install
   # o
   pnpm install
   ```

2. **Inicia en el navegador:**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

3. **Abre http://localhost:5173**

> ⚠️ En modo navegador, la descarga está simulada. Para funcionalidad completa, usa Tauri.

### Opción 2: Aplicación de Escritorio (Tauri)

**Para funcionalidad completa con spotdl**

#### Windows

1. **Ejecuta el script de instalación:**
   ```cmd
   setup.bat
   ```

2. **Inicia la aplicación:**
   ```cmd
   npm run tauri:dev
   ```
   o si instalaste pnpm:
   ```cmd
   pnpm tauri dev
   ```

#### macOS / Linux

1. **Da permisos al script:**
   ```bash
   chmod +x setup.sh
   ```

2. **Ejecuta el script de instalación:**
   ```bash
   ./setup.sh
   ```

3. **Inicia la aplicación:**
   ```bash
   npm run tauri:dev
   ```
   o si instalaste pnpm:
   ```bash
   pnpm tauri dev
   ```

## 📦 Compilar para Distribución

### Crear ejecutable

```bash
# Con pnpm
pnpm tauri build

# Con npm
npm run tauri:build
```

Los archivos compilados estarán en:
- Windows: `src-tauri/target/release/pavotify.exe`
- macOS: `src-tauri/target/release/bundle/dmg/`
- Linux: `src-tauri/target/release/bundle/deb/` o `.AppImage`

## 🎯 Primeros Pasos

### 1. Verificar que spotdl funciona

```bash
spotdl --version
```

Si aparece un error, instala spotdl:
```bash
pip install spotdl
```

### 2. Probar una descarga

1. Abre Pavotify
2. Copia una URL de Spotify (ejemplo: `https://open.spotify.com/track/...`)
3. Pégala en el campo de URL
4. Selecciona una carpeta de destino
5. Click en "Descargar Música"

### 3. Ver el historial

Click en "Historial de Descargas" para ver tus descargas anteriores.

## 🔧 Solución Rápida de Problemas

### "spotdl no está instalado"

```bash
pip install --upgrade spotdl
```

### Error de compilación en Windows

Instala las herramientas de compilación de C++:
https://visualstudio.microsoft.com/visual-cpp-build-tools/

### Error de compilación en Linux

Ubuntu/Debian:
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

Fedora:
```bash
sudo dnf install webkit2gtk4.1-devel openssl-devel curl wget file
```

Arch:
```bash
sudo pacman -S webkit2gtk base-devel curl wget file openssl
```

### La aplicación no inicia

1. Verifica que todas las dependencias estén instaladas
2. Ejecuta `npm install` o `pnpm install` de nuevo
3. Borra la carpeta `node_modules` e intenta de nuevo
4. Verifica los logs en la consola

## 📚 Más Información

Para información detallada, consulta:
- [PAVOTIFY_README.md](./PAVOTIFY_README.md) - Documentación completa
- [backend/README.md](./backend/README.md) - Documentación del backend
- [Tauri Docs](https://tauri.app/v1/guides/) - Documentación de Tauri

## 💡 Consejos

- **Modo desarrollo**: Usa `tauri dev` para desarrollo con hot-reload
- **Iconos personalizados**: Coloca tus iconos en `src-tauri/icons/`
- **Configuración**: Edita `src-tauri/tauri.conf.json` para personalizar la app
- **Calidad de audio**: Por defecto descarga en MP3 320kbps

## 🎨 Personalización Rápida

### Cambiar el título de la ventana

Edita `src-tauri/tauri.conf.json`:
```json
{
  "app": {
    "windows": [{
      "title": "Mi Descargador de Música"
    }]
  }
}
```

### Cambiar el nombre de la app en la UI

Edita `App.tsx`, línea con:
```tsx
<h1 className="text-white text-center mb-2">Pavotify</h1>
```

### Cambiar colores del tema

Edita `App.tsx`, busca las clases de Tailwind:
```tsx
// Fondo
bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950

// Botones
from-blue-600 to-cyan-500
```

## 🎬 Demo

Funcionalidades disponibles:
- ✅ Descarga de música de Spotify
- ✅ Selector nativo de carpetas
- ✅ Historial de descargas (persistente)
- ✅ Barra de progreso animada
- ✅ Notificaciones toast
- ✅ Diseño responsive
- ✅ Efectos liquid glass

## 🔄 Actualizar

Para actualizar las dependencias:

```bash
# Actualizar dependencias de npm
npm update

# Actualizar Rust y Tauri
rustup update
cargo install tauri-cli --force

# Actualizar spotdl
pip install --upgrade spotdl
```

---

¿Problemas? Abre un issue en GitHub o consulta la documentación completa.
