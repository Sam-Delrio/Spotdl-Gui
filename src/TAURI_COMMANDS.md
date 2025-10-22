# 🔧 Comandos de Tauri - Pavotify

Este documento describe todos los comandos disponibles en el backend de Tauri.

## 📋 Comandos Disponibles

### 1. `download_music`

Descarga música usando spotdl.

**Parámetros:**
- `url` (String): URL de Spotify (track, album, o playlist)
- `path` (String): Ruta de la carpeta donde guardar la descarga

**Retorna:**
```typescript
{
  success: boolean,
  message: string
}
```

**Ejemplo de uso en React:**
```typescript
import { invoke } from '@tauri-apps/core';

const downloadMusic = async (url: string, path: string) => {
  try {
    const response = await invoke('download_music', { url, path });
    console.log('Descarga exitosa:', response);
  } catch (error) {
    console.error('Error al descargar:', error);
  }
};
```

**Ejemplo de uso en Rust (main.rs):**
```rust
#[tauri::command]
async fn download_music(url: String, path: String) -> Result<DownloadResponse, String> {
    let output = Command::new("spotdl")
        .arg(&url)
        .arg("--output")
        .arg(&path)
        .arg("--format")
        .arg("mp3")
        .arg("--bitrate")
        .arg("320k")
        .output()
        .map_err(|e| format!("Error: {}", e))?;
    
    if output.status.success() {
        Ok(DownloadResponse {
            success: true,
            message: "Descarga completada".to_string(),
        })
    } else {
        Err("Error en la descarga".to_string())
    }
}
```

---

### 2. `check_spotdl`

Verifica si spotdl está instalado en el sistema.

**Parámetros:** Ninguno

**Retorna:**
```typescript
boolean
```

**Ejemplo de uso:**
```typescript
import { invoke } from '@tauri-apps/core';

const checkSpotDL = async () => {
  try {
    const isInstalled = await invoke('check_spotdl');
    if (isInstalled) {
      console.log('✓ spotdl está instalado');
    } else {
      console.log('✗ spotdl no está instalado');
    }
  } catch (error) {
    console.error('Error al verificar spotdl:', error);
  }
};
```

---

### 3. `get_system_info`

Obtiene información del sistema operativo.

**Parámetros:** Ninguno

**Retorna:**
```typescript
string // "OS: windows, Arch: x86_64"
```

**Ejemplo de uso:**
```typescript
import { invoke } from '@tauri-apps/core';

const getSystemInfo = async () => {
  try {
    const info = await invoke('get_system_info');
    console.log('Sistema:', info);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🔌 Plugins de Tauri Utilizados

### Dialog Plugin

Permite abrir diálogos nativos del sistema.

**Seleccionar carpeta:**
```typescript
import { open } from '@tauri-apps/plugin-dialog';

const selectFolder = async () => {
  const selected = await open({
    directory: true,
    multiple: false,
  });
  
  if (selected) {
    const path = typeof selected === 'string' ? selected : selected.path;
    console.log('Carpeta seleccionada:', path);
  }
};
```

**Guardar archivo:**
```typescript
import { save } from '@tauri-apps/plugin-dialog';

const saveFile = async () => {
  const filePath = await save({
    defaultPath: 'music.mp3',
    filters: [{
      name: 'Audio',
      extensions: ['mp3', 'wav', 'flac']
    }]
  });
  
  if (filePath) {
    console.log('Archivo guardado en:', filePath);
  }
};
```

---

### Shell Plugin

Permite ejecutar comandos del sistema.

**Ejecutar comando:**
```typescript
import { Command } from '@tauri-apps/plugin-shell';

const runCommand = async () => {
  const command = Command.create('spotdl', ['--version']);
  const output = await command.execute();
  console.log('Output:', output);
};
```

---

## 🎯 Agregar Nuevos Comandos

### Paso 1: Definir el comando en Rust

Edita `src-tauri/src/main.rs`:

```rust
#[tauri::command]
async fn mi_nuevo_comando(param: String) -> Result<String, String> {
    // Tu lógica aquí
    Ok(format!("Resultado: {}", param))
}
```

### Paso 2: Registrar el comando

En la función `main()`:

```rust
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            download_music,
            check_spotdl,
            get_system_info,
            mi_nuevo_comando  // ← Agregar aquí
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Paso 3: Usar en React

```typescript
import { invoke } from '@tauri-apps/core';

const usarMiComando = async () => {
  const resultado = await invoke('mi_nuevo_comando', { 
    param: 'valor' 
  });
  console.log(resultado);
};
```

---

## 📊 Ejemplos Avanzados

### Descarga con progreso

```typescript
import { invoke } from '@tauri-apps/core';
import { listen } from '@tauri-apps/api/event';

// En Rust, emitir eventos de progreso
#[tauri::command]
async fn download_with_progress(url: String, path: String, app_handle: tauri::AppHandle) -> Result<(), String> {
    // Emitir progreso
    app_handle.emit_all("download-progress", 50).unwrap();
    
    // ... lógica de descarga ...
    
    Ok(())
}

// En React, escuchar eventos
const downloadWithProgress = async (url: string, path: string) => {
  // Escuchar progreso
  const unlisten = await listen('download-progress', (event) => {
    console.log('Progreso:', event.payload);
  });
  
  try {
    await invoke('download_with_progress', { url, path });
  } finally {
    unlisten();
  }
};
```

### Manejo de errores personalizado

```typescript
import { invoke } from '@tauri-apps/core';

const downloadWithErrorHandling = async (url: string, path: string) => {
  try {
    const result = await invoke('download_music', { url, path });
    return { success: true, data: result };
  } catch (error) {
    if (error === 'spotdl no está instalado') {
      // Mostrar instrucciones de instalación
      return { success: false, error: 'SPOTDL_NOT_INSTALLED' };
    } else if (error.includes('network')) {
      // Error de red
      return { success: false, error: 'NETWORK_ERROR' };
    } else {
      // Error genérico
      return { success: false, error: 'UNKNOWN_ERROR' };
    }
  }
};
```

---

## 🔒 Seguridad

### Buenas prácticas

1. **Validar entradas:** Siempre valida los parámetros en Rust
2. **Sanitizar paths:** Verifica que las rutas sean válidas
3. **Limitar permisos:** Solo permite lo necesario en tauri.conf.json
4. **No exponer secretos:** Nunca incluyas API keys en el código

### Ejemplo de validación

```rust
#[tauri::command]
async fn download_music(url: String, path: String) -> Result<DownloadResponse, String> {
    // Validar URL
    if !url.starts_with("https://open.spotify.com/") {
        return Err("URL inválida".to_string());
    }
    
    // Validar path
    if !std::path::Path::new(&path).exists() {
        return Err("Ruta no existe".to_string());
    }
    
    // Continuar con la descarga...
}
```

---

## 🐛 Debugging

### Habilitar DevTools

En modo desarrollo, las DevTools se abren automáticamente. Para habilitarlas manualmente:

```rust
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        // ...
}
```

### Logs en Rust

```rust
#[tauri::command]
async fn download_music(url: String, path: String) -> Result<DownloadResponse, String> {
    println!("Descargando: {}", url);  // Aparece en la consola
    eprintln!("Error: algo salió mal"); // Para errores
    
    // ...
}
```

### Logs en React

```typescript
console.log('Info');
console.error('Error');
console.warn('Advertencia');
```

---

## 📚 Referencias

- [Tauri Commands](https://tauri.app/v1/guides/features/command)
- [Tauri Events](https://tauri.app/v1/guides/features/events)
- [Tauri Plugins](https://tauri.app/v1/guides/features/plugin)
- [Rust Serde](https://serde.rs/)

---

¿Necesitas ayuda? Consulta la [documentación completa](./PAVOTIFY_README.md) o abre un issue en GitHub.
