# 🔧 Modos de Desarrollo - Pavotify

Pavotify puede ejecutarse en dos modos diferentes dependiendo de tus necesidades.

## 🌐 Modo Navegador (Web)

### Cuándo usar
- ✅ Desarrollo rápido de UI
- ✅ Testing de componentes visuales
- ✅ No requiere Rust instalado
- ✅ Desarrollo de estilos y animaciones
- ✅ Más rápido para cambios en el frontend

### Limitaciones
- ❌ Descarga simulada (no descarga música real)
- ❌ Selector de carpetas limitado del navegador
- ❌ No hay integración con spotdl
- ❌ No hay acceso al sistema de archivos nativo

### Cómo ejecutar

```bash
# Instalar dependencias (solo primera vez)
npm install
# o
pnpm install

# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev
```

La aplicación se abrirá en http://localhost:5173

### Lo que funciona
- ✅ Toda la UI y efectos visuales
- ✅ Historial de descargas (guardado en localStorage)
- ✅ Validación de formularios
- ✅ Notificaciones toast
- ✅ Animaciones y efectos liquid glass
- ✅ Panel de historial desplegable

### Lo que NO funciona
- ❌ Descargas reales de música
- ❌ Selector nativo de carpetas
- ❌ Integración con spotdl

---

## 🖥️ Modo Tauri (Aplicación de Escritorio)

### Cuándo usar
- ✅ Testing de funcionalidad completa
- ✅ Descargas reales con spotdl
- ✅ Selector nativo de carpetas
- ✅ Preparación para compilación final
- ✅ Testing de comandos de backend

### Requisitos
- ✅ Node.js instalado
- ✅ Rust instalado
- ✅ spotdl instalado
- ✅ Dependencias del sistema (ver abajo)

### Cómo ejecutar

```bash
# Instalar dependencias (solo primera vez)
npm install
# o
pnpm install

# Ejecutar con Tauri
npm run tauri:dev
# o
pnpm tauri dev
```

### Lo que funciona
- ✅ Todo lo del modo navegador +
- ✅ Descargas reales de música con spotdl
- ✅ Selector nativo de carpetas del OS
- ✅ Guardado en ubicaciones reales del sistema
- ✅ Ventana nativa de la aplicación
- ✅ Mejor rendimiento

---

## 📋 Dependencias por Modo

### Modo Navegador
```bash
# Solo necesitas Node.js
node --version  # v18 o superior
npm --version   # o pnpm
```

### Modo Tauri

#### Todos los OS
```bash
node --version    # v18 o superior
rustc --version   # última versión estable
cargo --version   # incluido con Rust
python --version  # para spotdl
spotdl --version  # pip install spotdl
```

#### Windows Adicional
- Microsoft Visual C++ Build Tools
- WebView2 (incluido en Windows 10/11)

#### Linux (Ubuntu/Debian) Adicional
```bash
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

#### macOS Adicional
```bash
xcode-select --install
```

---

## 🔄 Flujo de Trabajo Recomendado

### 1. Desarrollo Inicial (UI/UX)
```bash
# Usa modo navegador para iteración rápida
npm run dev
```

### 2. Testing de Funcionalidad
```bash
# Cambia a Tauri cuando necesites probar funcionalidad real
npm run tauri:dev
```

### 3. Build Final
```bash
# Compila la aplicación de escritorio
npm run tauri:build
```

---

## 🐛 Troubleshooting

### "Tauri no está disponible" en el navegador
✅ **Normal**: Los comandos de Tauri solo funcionan en modo Tauri, no en el navegador.

### Error al ejecutar `tauri dev`
1. Verifica que Rust esté instalado: `rustc --version`
2. Verifica las dependencias del sistema
3. Ejecuta `setup.bat` (Windows) o `./setup.sh` (macOS/Linux)

### Descarga no funciona en navegador
✅ **Normal**: Las descargas reales solo funcionan en modo Tauri. En el navegador es una simulación.

### spotdl no encontrado
```bash
# Instala spotdl
pip install spotdl

# Verifica instalación
spotdl --version
```

---

## 💡 Tips de Desarrollo

### Hot Reload
Ambos modos soportan hot reload. Los cambios en el código se reflejan automáticamente.

### DevTools
- **Navegador**: F12 o Click derecho → Inspeccionar
- **Tauri**: Las DevTools se abren automáticamente en modo debug

### Logs
```typescript
// Los console.log funcionan en ambos modos
console.log('Debug info');
console.error('Error info');
```

En Tauri, también puedes ver logs de Rust en la terminal.

### Testing de UI
```bash
# Navegador es más rápido
npm run dev
```

### Testing de Backend
```bash
# Tauri es necesario
npm run tauri:dev
```

---

## 📊 Comparación Rápida

| Característica | Navegador | Tauri |
|----------------|-----------|-------|
| Velocidad de inicio | ⚡ Rápido | 🐢 Lento |
| Hot reload | ✅ Sí | ✅ Sí |
| Requisitos | Node.js | Node.js + Rust |
| Descargas reales | ❌ No | ✅ Sí |
| Selector de carpetas | 🔸 Limitado | ✅ Nativo |
| DevTools | ✅ Sí | ✅ Sí |
| Para producción | ❌ No | ✅ Sí |

---

## 🎯 Recomendación

1. **Empieza en modo navegador** para desarrollar UI
2. **Cambia a Tauri** cuando necesites probar funcionalidad
3. **Compila con Tauri** para distribución

```bash
# Desarrollo diario
npm run dev

# Testing completo
npm run tauri:dev

# Release
npm run tauri:build
```

---

## 📚 Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Tauri](https://tauri.app/)
- [spotdl Docs](https://github.com/spotDL/spotify-downloader)

---

¿Preguntas? Consulta [PAVOTIFY_README.md](./PAVOTIFY_README.md) o [QUICK_START.md](./QUICK_START.md)
