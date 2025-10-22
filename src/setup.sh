#!/bin/bash

# Script de configuración para Pavotify
# Este script instala todas las dependencias necesarias

echo "🎵 Configurando Pavotify..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar Node.js
echo -e "${BLUE}Verificando Node.js...${NC}"
if command_exists node; then
    echo -e "${GREEN}✓ Node.js $(node --version) instalado${NC}"
else
    echo -e "${RED}✗ Node.js no encontrado${NC}"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar Rust
echo -e "${BLUE}Verificando Rust...${NC}"
if command_exists rustc; then
    echo -e "${GREEN}✓ Rust $(rustc --version) instalado${NC}"
else
    echo -e "${RED}✗ Rust no encontrado${NC}"
    echo "Instalando Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env
fi

# Verificar Python
echo -e "${BLUE}Verificando Python...${NC}"
if command_exists python3; then
    echo -e "${GREEN}✓ Python $(python3 --version) instalado${NC}"
elif command_exists python; then
    echo -e "${GREEN}✓ Python $(python --version) instalado${NC}"
else
    echo -e "${RED}✗ Python no encontrado${NC}"
    echo "Por favor instala Python desde https://www.python.org/"
    exit 1
fi

# Verificar pip
echo -e "${BLUE}Verificando pip...${NC}"
if command_exists pip3; then
    echo -e "${GREEN}✓ pip instalado${NC}"
elif command_exists pip; then
    echo -e "${GREEN}✓ pip instalado${NC}"
else
    echo -e "${RED}✗ pip no encontrado${NC}"
    echo "Instalando pip..."
    python3 -m ensurepip --upgrade
fi

# Instalar spotdl
echo -e "${BLUE}Verificando spotdl...${NC}"
if command_exists spotdl; then
    echo -e "${GREEN}✓ spotdl $(spotdl --version) instalado${NC}"
else
    echo -e "${BLUE}Instalando spotdl...${NC}"
    if command_exists pip3; then
        pip3 install spotdl
    else
        pip install spotdl
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ spotdl instalado correctamente${NC}"
    else
        echo -e "${RED}✗ Error al instalar spotdl${NC}"
        exit 1
    fi
fi

# Instalar pnpm (opcional)
echo -e "${BLUE}Verificando pnpm...${NC}"
if command_exists pnpm; then
    echo -e "${GREEN}✓ pnpm instalado${NC}"
else
    echo -e "${BLUE}¿Quieres instalar pnpm? (recomendado) [y/N]${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        npm install -g pnpm
        echo -e "${GREEN}✓ pnpm instalado${NC}"
    fi
fi

# Instalar dependencias del proyecto
echo -e "${BLUE}Instalando dependencias del proyecto...${NC}"
if command_exists pnpm; then
    pnpm install
else
    npm install
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencias instaladas${NC}"
else
    echo -e "${RED}✗ Error al instalar dependencias${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Configuración completada exitosamente!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Para iniciar en modo desarrollo:${NC}"
if command_exists pnpm; then
    echo "  pnpm tauri dev"
else
    echo "  npm run tauri dev"
fi
echo ""
echo -e "${BLUE}Para compilar para producción:${NC}"
if command_exists pnpm; then
    echo "  pnpm tauri build"
else
    echo "  npm run tauri build"
fi
echo ""
echo -e "${BLUE}Para más información, lee PAVOTIFY_README.md${NC}"
echo ""
