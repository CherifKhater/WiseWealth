#!/bin/bash

# Milvus MCP Setup Script for WiseWealth
# This script helps you set up the Milvus vector database and MCP server

set -e  # Exit on error

echo "=================================================="
echo "  WiseWealth - Milvus MCP Setup"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "  $1"
}

# Check prerequisites
echo "Checking prerequisites..."
echo ""

# Check Docker
if command -v docker &> /dev/null; then
    print_success "Docker is installed"
    if docker info &> /dev/null; then
        print_success "Docker is running"
    else
        print_error "Docker is not running. Please start Docker Desktop."
        exit 1
    fi
else
    print_error "Docker is not installed. Please install Docker Desktop."
    print_info "Download from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    print_success "Python $PYTHON_VERSION is installed"
else
    print_error "Python 3 is not installed. Please install Python 3.10 or higher."
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    print_success "Git is installed"
else
    print_error "Git is not installed. Please install Git."
    exit 1
fi

echo ""
echo "=================================================="
echo "  Step 1: Start Milvus Database"
echo "=================================================="
echo ""

# Start Milvus with Docker Compose
if [ -f "docker-compose.yml" ]; then
    print_info "Starting Milvus containers..."
    docker-compose up -d

    print_info "Waiting for Milvus to be ready..."
    sleep 10

    # Check if Milvus is running
    if curl -f http://localhost:9091/healthz &> /dev/null; then
        print_success "Milvus is running"
    else
        print_warning "Milvus health check failed, but containers are running"
        print_info "Check logs with: docker logs milvus-standalone"
    fi
else
    print_error "docker-compose.yml not found!"
    exit 1
fi

echo ""
echo "=================================================="
echo "  Step 2: Clone Milvus MCP Server"
echo "=================================================="
echo ""

MCP_DIR="$HOME/mcp-servers"
MILVUS_MCP_DIR="$MCP_DIR/mcp-server-milvus"

if [ -d "$MILVUS_MCP_DIR" ]; then
    print_warning "MCP server already exists at $MILVUS_MCP_DIR"
    print_info "Pulling latest changes..."
    cd "$MILVUS_MCP_DIR"
    git pull
    cd - > /dev/null
else
    print_info "Creating directory $MCP_DIR..."
    mkdir -p "$MCP_DIR"

    print_info "Cloning Milvus MCP server..."
    cd "$MCP_DIR"
    git clone https://github.com/zilliztech/mcp-server-milvus.git
    cd - > /dev/null
    print_success "MCP server cloned"
fi

echo ""
echo "=================================================="
echo "  Step 3: Install Python Dependencies"
echo "=================================================="
echo ""

print_info "Installing Python packages..."
if pip3 install pymilvus sentence-transformers 2>&1 | grep -q "error\|ERROR"; then
    print_error "Failed to install Python packages"
    print_info "Try manually: pip3 install pymilvus sentence-transformers"
    exit 1
else
    print_success "Python dependencies installed"
fi

# Check if uv is installed
if command -v uv &> /dev/null; then
    print_success "uv is already installed"
else
    print_info "Installing uv (recommended for MCP server)..."
    if pip3 install uv 2>&1 | grep -q "error\|ERROR"; then
        print_warning "Failed to install uv automatically"
        print_info "Try manually: pip3 install uv"
    else
        print_success "uv installed"
    fi
fi

echo ""
echo "=================================================="
echo "  Step 4: Configure AI Assistants"
echo "=================================================="
echo ""

print_info "Configuration templates are available in config/ directory:"
print_info "  - config/claude-mcp-config.json"
print_info "  - config/cursor-mcp-config.json"
print_info "  - config/cline-mcp-config.json"
echo ""
print_warning "IMPORTANT: You need to manually configure each AI assistant"
print_info "See _MILVUS_MCP_GUIDE.md for detailed instructions"

echo ""
echo "=================================================="
echo "  Setup Complete!"
echo "=================================================="
echo ""

print_success "Milvus database is running"
print_success "MCP server is ready at $MILVUS_MCP_DIR"
print_success "Python dependencies installed"
echo ""

print_info "Next steps:"
print_info "1. Configure your AI assistants (see _MILVUS_MCP_GUIDE.md)"
print_info "2. Index your codebase:"
print_info "   python3 scripts/index-codebase.py"
print_info "   python3 scripts/index-docs.py"
print_info "3. Restart your AI assistants"
echo ""

print_info "Useful commands:"
print_info "  • Stop Milvus:  docker-compose down"
print_info "  • View logs:    docker logs -f milvus-standalone"
print_info "  • Re-index:     npm run index (when package.json is set up)"
echo ""
