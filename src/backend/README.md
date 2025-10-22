# Backend SpotDL - Integración

Este backend permite descargar música de Spotify usando spotdl.

## Instalación

### 1. Instalar Python (si no está instalado)
Descargar desde: https://www.python.org/downloads/

### 2. Instalar dependencias

```bash
pip install spotdl flask flask-cors
```

### 3. Verificar instalación de spotdl

```bash
spotdl --version
```

## Uso

### Ejecutar el servidor

```bash
python spotdl_server.py
```

El servidor se iniciará en `http://localhost:5000`

### Endpoints disponibles

#### POST /api/download
Descarga música de Spotify

**Request:**
```json
{
  "url": "https://open.spotify.com/track/...",
  "path": "C:/Users/username/Music"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "Descarga completada exitosamente",
  "output": "..."
}
```

**Response (error):**
```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

#### GET /api/health
Verificar estado del servidor

**Response:**
```json
{
  "status": "ok",
  "service": "spotdl-server"
}
```

## Integración con Frontend

Para conectar el frontend con este backend, actualiza la función `mockSpotdlDownload` en `App.tsx`:

```typescript
const mockSpotdlDownload = async (url: string, path: string) => {
  const response = await fetch('http://localhost:5000/api/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, path })
  });
  
  if (!response.ok) {
    throw new Error('Error al descargar');
  }
  
  return await response.json();
};
```

## Configuración de spotdl

spotdl soporta:
- Tracks individuales de Spotify
- Playlists completas
- Álbumes completos
- URLs de YouTube (como alternativa)

### Opciones adicionales

Puedes modificar `spotdl_server.py` para agregar más opciones:

```python
command = [
    'spotdl',
    url,
    '--output', download_path,
    '--format', 'mp3',        # Formato: mp3, flac, ogg, opus, m4a
    '--bitrate', '320k',      # Calidad de audio
    '--threads', '4',         # Threads para descarga paralela
    '--lyrics',               # Incluir letras
    '--playlist-numbering',   # Numerar canciones de playlist
]
```

## Notas importantes

1. **Limitaciones del navegador**: Los navegadores modernos tienen restricciones de seguridad para acceder al sistema de archivos. La selección de carpetas funciona pero con limitaciones.

2. **CORS**: El servidor incluye CORS habilitado para permitir peticiones desde el frontend.

3. **Rutas de archivos**: En Windows, asegúrate de usar rutas absolutas como `C:/Users/username/Music`.

4. **Python Embedded**: Si quieres distribuir la aplicación con Python embebido:
   - Descargar Python Embedded desde python.org
   - Incluir las librerías necesarias
   - Crear un ejecutable con PyInstaller o similar

## Ejemplo de Python Embedded

Para empaquetar con PyInstaller:

```bash
pip install pyinstaller
pyinstaller --onefile --name spotdl-server spotdl_server.py
```

Esto creará un ejecutable único que puedes distribuir.

## Troubleshooting

### Error: "spotdl no encontrado"
```bash
pip install --upgrade spotdl
```

### Error de permisos
Ejecutar la terminal como administrador

### Error de CORS
Verificar que `flask-cors` esté instalado correctamente
