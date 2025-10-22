"""
Backend server para integración con spotdl
Requiere: pip install spotdl flask flask-cors

Para usar:
1. Instalar spotdl: pip install spotdl
2. Instalar Flask: pip install flask flask-cors
3. Ejecutar: python spotdl_server.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import json

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde el frontend

@app.route('/api/download', methods=['POST'])
def download_music():
    try:
        data = request.json
        url = data.get('url')
        download_path = data.get('path', './downloads')
        
        if not url:
            return jsonify({'error': 'URL es requerida'}), 400
        
        # Crear carpeta de descarga si no existe
        os.makedirs(download_path, exist_ok=True)
        
        # Ejecutar spotdl
        command = [
            'spotdl',
            url,
            '--output', download_path,
            '--format', 'mp3',
            '--bitrate', '320k'
        ]
        
        # Ejecutar el comando
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
        
        stdout, stderr = process.communicate()
        
        if process.returncode == 0:
            return jsonify({
                'success': True,
                'message': 'Descarga completada exitosamente',
                'output': stdout
            })
        else:
            return jsonify({
                'success': False,
                'error': stderr
            }), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Verificar que el servidor esté funcionando"""
    return jsonify({'status': 'ok', 'service': 'spotdl-server'})

if __name__ == '__main__':
    print("Servidor spotdl iniciado en http://localhost:5000")
    print("Endpoints disponibles:")
    print("  POST /api/download - Descargar música")
    print("  GET  /api/health   - Verificar estado del servidor")
    app.run(debug=True, port=5000, host='0.0.0.0')
