# WiseWealth Makefile - Milvus & Development Commands
# Usage: make <command>

.PHONY: help milvus-up milvus-down milvus-restart milvus-status milvus-health milvus-logs milvus-clean milvus-backup milvus-index milvus-index-code milvus-index-docs milvus-verify deps setup

# Default target - show help
help:
	@echo ""
	@echo "📚 WiseWealth Development Commands"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""
	@echo "🐳 Milvus Management:"
	@echo "  make milvus-up      - Start Milvus containers"
	@echo "  make milvus-down    - Stop Milvus containers"
	@echo "  make milvus-restart - Restart Milvus containers"
	@echo "  make milvus-status  - Show container status"
	@echo "  make milvus-health  - Check Milvus health"
	@echo "  make milvus-logs    - View Milvus logs (live)"
	@echo "  make milvus-clean   - Stop and remove all data (⚠️  DESTRUCTIVE)"
	@echo "  make milvus-backup  - Backup Milvus data"
	@echo ""
	@echo "📊 Milvus Indexing:"
	@echo "  make milvus-index       - Index both code and docs"
	@echo "  make milvus-index-code  - Index codebase only"
	@echo "  make milvus-index-docs  - Index documentation only"
	@echo "  make milvus-verify      - Verify indexed collections"
	@echo ""
	@echo "🛠️  Setup:"
	@echo "  make deps           - Install Python dependencies"
	@echo "  make setup          - Complete first-time setup"
	@echo ""
	@echo "💻 Development:"
	@echo "  make dev            - Start development environment"
	@echo ""
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""

# Milvus Management
milvus-up:
	@echo "🚀 Starting Milvus..."
	@docker-compose up -d
	@echo "✓ Milvus started at http://localhost:19530"
	@echo "✓ MinIO console: http://localhost:9001 (minioadmin/minioadmin)"

milvus-down:
	@echo "🛑 Stopping Milvus..."
	@docker-compose down
	@echo "✓ Milvus stopped"

milvus-restart: milvus-down milvus-up
	@echo "✓ Milvus restarted"

milvus-status:
	@echo "📊 Container Status:"
	@docker-compose ps

milvus-health:
	@echo "🏥 Checking Milvus health..."
	@curl -sf http://localhost:9091/healthz > /dev/null && echo "✓ Milvus is healthy" || echo "✗ Milvus is not responding"

milvus-logs:
	@echo "📋 Milvus logs (Ctrl+C to exit):"
	@docker logs -f milvus-standalone

milvus-clean:
	@echo "⚠️  WARNING: This will delete ALL Milvus data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v; \
		echo "✓ All data removed"; \
	else \
		echo "✗ Cancelled"; \
	fi

milvus-backup:
	@echo "💾 Creating backup..."
	@tar -czf milvus-backup-$$(date +%Y%m%d-%H%M%S).tar.gz volumes/
	@echo "✓ Backup created: milvus-backup-$$(date +%Y%m%d-%H%M%S).tar.gz"

# Milvus Indexing
milvus-index: milvus-index-code milvus-index-docs
	@echo "✓ All indexing complete!"

milvus-index-code:
	@echo "📂 Indexing codebase..."
	@python3 scripts/indexing/index-codebase.py

milvus-index-docs:
	@echo "📚 Indexing documentation..."
	@python3 scripts/indexing/index-docs.py

milvus-verify:
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

setup: deps milvus-up
	@echo "⏳ Waiting for Milvus to be ready..."
	@sleep 5
	@$(MAKE) milvus-index
	@echo ""
	@echo "✓ Setup complete! Milvus is ready to use."
	@echo ""
	@echo "Next steps:"
	@echo "  1. Restart Claude Code to load MCP server"
	@echo "  2. Test with: 'Search the docs for tech stack'"

# Development
dev: milvus-up
	@echo "✓ Development environment ready"
	@$(MAKE) milvus-status

gemini-mcp-setup:
	@echo "🛠️  Setting up Gemini MCP..."
	@gemini mcp add milvus --command "/Users/cherifkhater/Library/Python/3.9/bin/uv" --args "--directory,/Users/cherifkhater/mcp-servers/mcp-server-milvus,run,src/mcp_server_milvus/server.py,--milvus-uri,http://localhost:19530"
	@gemini mcp add playwright --command "npx" --args "@playwright/mcp@latest,--browser,chromium,--headless"
	@gemini mcp add chrome-devtools --command "npx" --args "-y,chrome-devtools-mcp@latest,--headless"
	@gemini mcp add context7 --command "npx" --args "-y,@upstash/context7-mcp"
	@gemini mcp add sequential-thinking --command "npx" --args "-y,@modelcontextprotocol/server-sequential-thinking"
	@echo "✓ Gemini MCP setup complete!"
