@echo off
REM Script de configuración para Pavotify (Windows)
REM Este script instala todas las dependencias necesarias

echo.
echo 🎵 Configurando Pavotify...
echo.

REM Verificar Node.js
echo Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    node --version
    echo ✓ Node.js instalado
) else (
    echo ✗ Node.js no encontrado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar Rust
echo.
echo Verificando Rust...
where rustc >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    rustc --version
    echo ✓ Rust instalado
) else (
    echo ✗ Rust no encontrado
    echo Descargando instalador de Rust...
    echo Por favor visita: https://rustup.rs/
    start https://rustup.rs/
    echo Ejecuta este script nuevamente después de instalar Rust
    pause
    exit /b 1
)

REM Verificar Python
echo.
echo Verificando Python...
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python --version
    echo ✓ Python instalado
) else (
    echo ✗ Python no encontrado
    echo Por favor instala Python desde https://www.python.org/
    pause
    exit /b 1
)

REM Verificar pip
echo.
echo Verificando pip...
where pip >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ pip instalado
) else (
    echo Instalando pip...
    python -m ensurepip --upgrade
)

REM Instalar spotdl
echo.
echo Verificando spotdl...
where spotdl >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    spotdl --version
    echo ✓ spotdl instalado
) else (
    echo Instalando spotdl...
    pip install spotdl
    if %ERRORLEVEL% EQU 0 (
        echo ✓ spotdl instalado correctamente
    ) else (
        echo ✗ Error al instalar spotdl
        pause
        exit /b 1
    )
)

REM Verificar pnpm
echo.
echo Verificando pnpm...
where pnpm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ pnpm instalado
    set USE_PNPM=1
) else (
    echo pnpm no encontrado
    set /p INSTALL_PNPM="¿Quieres instalar pnpm? (recomendado) [S/N]: "
    if /i "%INSTALL_PNPM%"=="S" (
        npm install -g pnpm
        echo ✓ pnpm instalado
        set USE_PNPM=1
    ) else (
        set USE_PNPM=0
    )
)

REM Instalar dependencias del proyecto
echo.
echo Instalando dependencias del proyecto...
if %USE_PNPM%==1 (
    pnpm install
) else (
    npm install
)

if %ERRORLEVEL% EQU 0 (
    echo ✓ Dependencias instaladas
) else (
    echo ✗ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✓ Configuración completada exitosamente!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Para iniciar en modo desarrollo:
if %USE_PNPM%==1 (
    echo   pnpm tauri dev
) else (
    echo   npm run tauri dev
)
echo.
echo Para compilar para producción:
if %USE_PNPM%==1 (
    echo   pnpm tauri build
) else (
    echo   npm run tauri build
)
echo.
echo Para más información, lee PAVOTIFY_README.md
echo.
pause
