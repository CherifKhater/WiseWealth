# WiseWealth Makefile - Milvus & Development Commands
# Usage: make <command>

.PHONY: help up down restart status health logs clean backup index index-code index-docs verify deps setup

# Default target - show help
help:
	@echo ""
	@echo "📚 WiseWealth Development Commands"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""
	@echo "🐳 Milvus Management:"
	@echo "  make up          - Start Milvus containers"
	@echo "  make down        - Stop Milvus containers"
	@echo "  make restart     - Restart Milvus containers"
	@echo "  make status      - Show container status"
	@echo "  make health      - Check Milvus health"
	@echo "  make logs        - View Milvus logs (live)"
	@echo "  make clean       - Stop and remove all data (⚠️  DESTRUCTIVE)"
	@echo "  make backup      - Backup Milvus data"
	@echo ""
	@echo "📊 Indexing:"
	@echo "  make index       - Index both code and docs"
	@echo "  make index-code  - Index codebase only"
	@echo "  make index-docs  - Index documentation only"
	@echo "  make verify      - Verify indexed collections"
	@echo ""
	@echo "🛠️  Setup:"
	@echo "  make deps        - Install Python dependencies"
	@echo "  make setup       - Complete first-time setup"
	@echo ""
	@echo "💻 Development:"
	@echo "  make dev         - Start development environment"
	@echo ""
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""

# Milvus Management
up:
	@echo "🚀 Starting Milvus..."
	@docker-compose up -d
	@echo "✓ Milvus started at http://localhost:19530"
	@echo "✓ MinIO console: http://localhost:9001 (minioadmin/minioadmin)"

down:
	@echo "🛑 Stopping Milvus..."
	@docker-compose down
	@echo "✓ Milvus stopped"

restart: down up
	@echo "✓ Milvus restarted"

status:
	@echo "📊 Container Status:"
	@docker-compose ps

health:
	@echo "🏥 Checking Milvus health..."
	@curl -sf http://localhost:9091/healthz > /dev/null && echo "✓ Milvus is healthy" || echo "✗ Milvus is not responding"

logs:
	@echo "📋 Milvus logs (Ctrl+C to exit):"
	@docker logs -f milvus-standalone

clean:
	@echo "⚠️  WARNING: This will delete ALL Milvus data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v; \
		echo "✓ All data removed"; \
	else \
		echo "✗ Cancelled"; \
	fi

backup:
	@echo "💾 Creating backup..."
	@tar -czf milvus-backup-$$(date +%Y%m%d-%H%M%S).tar.gz volumes/
	@echo "✓ Backup created: milvus-backup-$$(date +%Y%m%d-%H%M%S).tar.gz"

# Indexing
index: index-code index-docs
	@echo "✓ All indexing complete!"

index-code:
	@echo "📂 Indexing codebase..."
	@python3 scripts/indexing/index-codebase.py

index-docs:
	@echo "📚 Indexing documentation..."
	@python3 scripts/indexing/index-docs.py

verify:
	@echo "🔍 Verifying collections..."
	@python3 -c "from pymilvus import connections, utility; \
		connections.connect('default', host='localhost', port='19530'); \
		collections = utility.list_collections(); \
		print('\n✓ Collections:'); \
		[print(f'  - {c}') for c in collections]; \
		connections.disconnect('default')"

# Dependencies & Setup
deps:
	@echo "📦 Installing Python dependencies..."
	@pip3 install pymilvus sentence-transformers
	@echo "✓ Dependencies installed"

setup: deps up
	@echo "⏳ Waiting for Milvus to be ready..."
	@sleep 5
	@$(MAKE) index
	@echo ""
	@echo "✓ Setup complete! Milvus is ready to use."
	@echo ""
	@echo "Next steps:"
	@echo "  1. Restart Claude Code to load MCP server"
	@echo "  2. Test with: 'Search the docs for tech stack'"

# Development
dev: up
	@echo "✓ Development environment ready"
	@$(MAKE) status
