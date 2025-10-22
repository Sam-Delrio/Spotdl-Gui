// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::process::Command;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize)]
struct DownloadRequest {
    url: String,
    path: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct DownloadResponse {
    success: bool,
    message: String,
}

/// Comando para descargar música usando spotdl
#[tauri::command]
async fn download_music(url: String, path: String) -> Result<DownloadResponse, String> {
    println!("Descargando música desde: {}", url);
    println!("Guardando en: {}", path);

    // Verificar si spotdl está instalado
    let spotdl_check = Command::new("spotdl")
        .arg("--version")
        .output();

    if spotdl_check.is_err() {
        return Err("spotdl no está instalado. Por favor instala spotdl primero.".to_string());
    }

    // Ejecutar spotdl para descargar la música
    let output = Command::new("spotdl")
        .arg(&url)
        .arg("--output")
        .arg(&path)
        .arg("--format")
        .arg("mp3")
        .arg("--bitrate")
        .arg("320k")
        .output()
        .map_err(|e| format!("Error al ejecutar spotdl: {}", e))?;

    if output.status.success() {
        Ok(DownloadResponse {
            success: true,
            message: "Descarga completada exitosamente".to_string(),
        })
    } else {
        let error_msg = String::from_utf8_lossy(&output.stderr);
        Err(format!("Error en spotdl: {}", error_msg))
    }
}

/// Comando para verificar si spotdl está instalado
#[tauri::command]
async fn check_spotdl() -> Result<bool, String> {
    let output = Command::new("spotdl")
        .arg("--version")
        .output();

    match output {
        Ok(out) => Ok(out.status.success()),
        Err(_) => Ok(false),
    }
}

/// Comando para obtener información del sistema
#[tauri::command]
async fn get_system_info() -> Result<String, String> {
    let os = std::env::consts::OS;
    let arch = std::env::consts::ARCH;
    Ok(format!("OS: {}, Arch: {}", os, arch))
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            download_music,
            check_spotdl,
            get_system_info
        ])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
