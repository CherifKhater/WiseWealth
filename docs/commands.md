# WiseWealth - Command Reference

Quick reference for all npm and make commands.

---

## 🎯 Quick Start Commands

```bash
# First time setup (complete installation)
npm run dev:setup    # or: make setup

# Daily start
npm run milvus:up    # or: make up

# Daily stop
npm run milvus:down  # or: make down

# Get help
npm run help:milvus  # or: make help
```

---

## 📦 NPM Commands

### Milvus Management

```bash
npm run milvus:up          # Start Milvus containers
npm run milvus:down        # Stop Milvus containers
npm run milvus:restart     # Restart Milvus
npm run milvus:status      # Check container status
npm run milvus:health      # Health check
npm run milvus:logs        # View live logs
npm run milvus:clean       # ⚠️  Delete all data
npm run milvus:backup      # Create backup
```

### Indexing

```bash
npm run index              # Index code + docs
npm run index:code         # Index codebase only
npm run index:docs         # Index docs only
npm run index:verify       # Verify collections
```

### Dependencies

```bash
npm run deps:install       # Install Python packages
npm run deps:check         # Check dependencies
```

### Development

```bash
npm run dev:setup          # Complete first-time setup
npm run dev:start          # Start development
npm run dev:stop           # Stop development
```

### Help

```bash
npm run help               # Show all commands
npm run help:milvus        # Milvus quick reference
```

---

## 🛠️ Make Commands

### Milvus Management

```bash
make up                    # Start Milvus
make down                  # Stop Milvus
make restart               # Restart Milvus
make status                # Check status
make health                # Health check
make logs                  # View logs (live)
make clean                 # ⚠️  Delete all data
make backup                # Create backup
```

### Indexing

```bash
make index                 # Index everything
make index-code            # Index code only
make index-docs            # Index docs only
make verify                # Verify collections
```

### Setup & Development

```bash
make deps                  # Install dependencies
make setup                 # First-time setup
make dev                   # Start dev environment
make help                  # Show all commands
```

---

## 🐳 Direct Docker Commands

For advanced users:

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker logs -f milvus-standalone

# Check status
docker-compose ps

# Restart specific service
docker-compose restart milvus

# Remove all data (⚠️  DESTRUCTIVE)
docker-compose down -v
```

---

## 🐍 Direct Python Commands

For advanced users:

```bash
# Install dependencies
pip3 install pymilvus sentence-transformers

# Run indexing scripts directly
python3 scripts/index-codebase.py
python3 scripts/index-docs.py

# Verify collections
python3 -c "from pymilvus import connections, utility; connections.connect('default', host='localhost', port='19530'); print(utility.list_collections()); connections.disconnect('default')"
```

---

## 💡 Recommended Workflow

### Daily Development

```bash
# Morning
make up                    # Start Milvus

# ... code all day ...

# After significant changes
make index                 # Re-index

# Evening
make down                  # Stop Milvus
```

### Weekly Maintenance

```bash
# Monday morning
make up                    # Start
make backup               # Weekly backup
make index                # Fresh index

# ... work all week ...

# Friday evening
make backup               # Another backup
make down                 # Stop for weekend
```

---

## 🎨 Aliases (Optional)

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Navigate to project
alias ww='cd ~/AIProjects/FinalProjects/WiseWealth'

# Milvus shortcuts
alias mup='ww && make up'
alias mdown='ww && make down'
alias mstatus='ww && make status'
alias mindex='ww && make index'
alias mlogs='ww && make logs'

# Combined workflow
alias wstart='ww && make up && make status'
alias wstop='ww && make down'
```

Then use:
```bash
wstart      # Start WiseWealth dev environment
mindex      # Re-index from anywhere
wstop       # Stop everything
```

---

## 🔍 Command Comparison

| Task | NPM | Make | Docker |
|------|-----|------|--------|
| Start | `npm run milvus:up` | `make up` | `docker-compose up -d` |
| Stop | `npm run milvus:down` | `make down` | `docker-compose down` |
| Status | `npm run milvus:status` | `make status` | `docker-compose ps` |
| Index | `npm run index` | `make index` | `python3 scripts/...` |
| Help | `npm run help` | `make help` | N/A |

**Recommendation**:
- Use **make** for quick terminal commands (shorter syntax)
- Use **npm** if you don't have make or prefer JavaScript ecosystem
- Use **docker** directly for advanced operations

---

## 🆘 Emergency Commands

### Milvus Won't Start

```bash
# Check Docker
docker ps

# Force restart
docker-compose down
docker-compose up -d

# Check logs
docker logs milvus-standalone
```

### Complete Reset

```bash
# ⚠️  WARNING: Deletes all data!
docker-compose down -v
rm -rf volumes/
docker-compose up -d
make index
```

### Disk Space Issues

```bash
# Check volume size
du -sh volumes/

# Create backup and clean old data
make backup
docker-compose down -v
docker-compose up -d
```

---

## 📊 Monitoring Commands

```bash
# Disk usage
du -sh volumes/

# Container resource usage
docker stats milvus-standalone

# Live logs
make logs

# Collection info
make verify
```

---

**Last Updated**: 2025-11-17
