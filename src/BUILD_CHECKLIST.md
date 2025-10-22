# ✅ Checklist de Compilación - Pavotify

Usa esta lista para asegurarte de que todo está listo antes de compilar Pavotify.

## 📋 Pre-Compilación

### Dependencias del Sistema

- [ ] Node.js (v18+) instalado
  ```bash
  node --version
  ```

- [ ] Rust instalado
  ```bash
  rustc --version
  cargo --version
  ```

- [ ] Python instalado
  ```bash
  python --version
  # o
  python3 --version
  ```

- [ ] spotdl instalado
  ```bash
  spotdl --version
  ```

### Dependencias Específicas del OS

#### Windows
- [ ] Microsoft Visual C++ Build Tools instalado
- [ ] WebView2 (se instala automáticamente con Windows 10/11)

#### Linux (Ubuntu/Debian)
- [ ] Paquetes instalados:
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

#### macOS
- [ ] Xcode Command Line Tools instalado
  ```bash
  xcode-select --install
  ```

### Dependencias del Proyecto

- [ ] Dependencias de npm instaladas
  ```bash
  npm install
  # o
  pnpm install
  ```

- [ ] Tauri CLI instalado
  ```bash
  cargo install tauri-cli
  ```

---

## 🎨 Personalización

### Iconos

- [ ] Iconos creados en `src-tauri/icons/`
  - [ ] `32x32.png`
  - [ ] `128x128.png`
  - [ ] `128x128@2x.png`
  - [ ] `icon.icns` (macOS)
  - [ ] `icon.ico` (Windows)

- [ ] Generar iconos con:
  ```bash
  npm run tauri:icon path/to/icon.png
  ```

### Configuración

- [ ] `src-tauri/tauri.conf.json` revisado
  - [ ] `productName` configurado
  - [ ] `version` actualizada
  - [ ] `identifier` único (ej: com.tuempresa.pavotify)
  - [ ] Dimensiones de ventana configuradas
  - [ ] Descripción actualizada

- [ ] `src-tauri/Cargo.toml` revisado
  - [ ] `name` configurado
  - [ ] `version` coincide con tauri.conf.json
  - [ ] `authors` actualizado

### Branding

- [ ] Título de la app actualizado en `App.tsx`
- [ ] Colores personalizados (si aplica)
- [ ] Textos y mensajes personalizados

---

## 🧪 Testing

### Tests Funcionales

- [ ] La aplicación inicia correctamente
  ```bash
  npm run tauri:dev
  ```

- [ ] Selector de carpetas funciona
- [ ] La descarga funciona con una URL de prueba
- [ ] El historial se guarda y muestra correctamente
- [ ] Los botones tienen el efecto liquid glass
- [ ] Las notificaciones toast aparecen correctamente

### Tests en Diferentes Escenarios

- [ ] Funciona sin conexión a internet (solo para UI)
- [ ] Funciona con spotdl no instalado (muestra error apropiado)
- [ ] Funciona con URL inválida
- [ ] Funciona con carpeta sin permisos de escritura
- [ ] El historial persiste después de cerrar la app

### Tests de UI

- [ ] Responsive design funciona
- [ ] Animaciones son fluidas
- [ ] No hay elementos truncados
- [ ] Los colores contrastan bien
- [ ] Accesibilidad (textos legibles, botones grandes)

---

## 🔨 Compilación

### Preparación

- [ ] Cerrar todas las instancias de la app en desarrollo
- [ ] Limpiar builds anteriores (opcional)
  ```bash
  rm -rf src-tauri/target/release
  ```

### Build de Producción

- [ ] Ejecutar build
  ```bash
  npm run tauri:build
  # o
  pnpm tauri build
  ```

- [ ] Compilación exitosa (sin errores)
- [ ] Build completado en:
  - Windows: `src-tauri/target/release/pavotify.exe`
  - macOS: `src-tauri/target/release/bundle/dmg/`
  - Linux: `src-tauri/target/release/bundle/`

### Verificación Post-Build

- [ ] El ejecutable se genera correctamente
- [ ] El tamaño del archivo es razonable
- [ ] Los instaladores se crean (si aplica)

---

## 🧪 Testing del Build

### Windows

- [ ] Ejecutar `pavotify.exe`
- [ ] El instalador MSI funciona (si se generó)
- [ ] La app se instala correctamente
- [ ] El ícono aparece correctamente
- [ ] La app aparece en "Agregar o quitar programas"
- [ ] La desinstalación funciona

### macOS

- [ ] Abrir el DMG
- [ ] Arrastrar app a Aplicaciones
- [ ] La app se abre correctamente
- [ ] El ícono aparece en el Dock
- [ ] Los permisos se solicitan apropiadamente

### Linux

- [ ] Instalar DEB/RPM (si aplica)
  ```bash
  sudo dpkg -i pavotify_1.0.0_amd64.deb
  # o
  sudo rpm -i pavotify-1.0.0.rpm
  ```

- [ ] Ejecutar AppImage
  ```bash
  chmod +x pavotify_1.0.0_amd64.AppImage
  ./pavotify_1.0.0_amd64.AppImage
  ```

- [ ] La app aparece en el menú de aplicaciones

---

## 📦 Distribución

### Preparación de Archivos

- [ ] README.md actualizado
- [ ] CHANGELOG.md creado (opcional)
- [ ] LICENSE incluido
- [ ] Instrucciones de instalación claras

### Paquetes Finales

#### Windows
- [ ] `pavotify.exe` - Ejecutable portable
- [ ] `pavotify_1.0.0_x64_en-US.msi` - Instalador MSI

#### macOS
- [ ] `Pavotify_1.0.0_x64.dmg` - Imagen de disco
- [ ] `Pavotify.app` - Bundle de aplicación

#### Linux
- [ ] `pavotify_1.0.0_amd64.deb` - Paquete Debian
- [ ] `pavotify-1.0.0.x86_64.rpm` - Paquete RPM
- [ ] `pavotify_1.0.0_amd64.AppImage` - AppImage universal

### Documentación

- [ ] Instrucciones de instalación escritas
- [ ] Requisitos del sistema documentados
- [ ] Capturas de pantalla incluidas
- [ ] Video demo (opcional)

---

## 🚀 Release

### GitHub Release

- [ ] Crear tag de versión
  ```bash
  git tag -a v1.0.0 -m "Release v1.0.0"
  git push origin v1.0.0
  ```

- [ ] Crear release en GitHub
- [ ] Subir binarios a GitHub Releases
- [ ] Escribir notas de la versión

### Opcional

- [ ] Firmar ejecutables (Windows/macOS)
- [ ] Notarizar app (macOS)
- [ ] Crear actualizador automático
- [ ] Configurar analytics (opcional)

---

## 🔍 Post-Release

### Verificación

- [ ] Los binarios se descargan correctamente
- [ ] Las instrucciones de instalación son claras
- [ ] No hay errores reportados inmediatamente

### Monitoreo

- [ ] Revisar issues en GitHub
- [ ] Responder preguntas de usuarios
- [ ] Recopilar feedback

### Mejoras Futuras

- [ ] Lista de features para próxima versión
- [ ] Bugs conocidos documentados
- [ ] Roadmap actualizado

---

## 📊 Métricas de Calidad

### Performance

- [ ] La app inicia en menos de 3 segundos
- [ ] El uso de memoria es < 150MB en reposo
- [ ] Las animaciones corren a 60fps
- [ ] No hay memory leaks

### Seguridad

- [ ] No hay secrets hardcodeados
- [ ] Las entradas del usuario son validadas
- [ ] Los paths son sanitizados
- [ ] Los permisos son los mínimos necesarios

### Experiencia de Usuario

- [ ] La UI es intuitiva
- [ ] Los mensajes de error son claros
- [ ] El feedback visual es inmediato
- [ ] La app es responsive

---

## 🎯 Checklist Final

Antes de publicar:

- [ ] ✅ Todas las dependencias instaladas
- [ ] ✅ Iconos personalizados incluidos
- [ ] ✅ Configuración revisada
- [ ] ✅ Tests pasados
- [ ] ✅ Build exitoso
- [ ] ✅ Ejecutable probado
- [ ] ✅ Documentación completa
- [ ] ✅ Release creado

---

## 🆘 Si algo falla...

### Build Falla

1. Verifica que todas las dependencias estén instaladas
2. Limpia el build anterior: `rm -rf src-tauri/target`
3. Actualiza Rust: `rustup update`
4. Revisa los logs de error
5. Consulta [Tauri Troubleshooting](https://tauri.app/v1/guides/debugging/application)

### App No Inicia

1. Verifica los permisos de ejecución
2. Revisa los logs del sistema
3. Ejecuta desde terminal para ver errores
4. Verifica que spotdl esté en el PATH

### Contacto

- GitHub Issues: Abre un issue con logs detallados
- Documentación: Consulta PAVOTIFY_README.md
- Tauri Discord: https://discord.gg/tauri

---

**¡Buena suerte con tu build! 🚀**
