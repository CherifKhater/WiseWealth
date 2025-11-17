# Context7 MCP Server Setup Guide

<!-- Last Updated: 2025-11-17 -->

## Overview

Context7 is an MCP server that provides up-to-date, version-specific documentation and code examples for libraries and frameworks directly into your AI assistant's context. It solves the problem of LLMs providing outdated or generic code by dynamically fetching current documentation from the source.

---

## Features

✅ **Up-to-Date Documentation**: Fetches current docs directly from source
✅ **Version-Specific**: Get documentation for specific library versions
✅ **Code Examples**: Real, working code examples from official docs
✅ **Public & Private Repos**: Support for both (private requires API key)
✅ **Free & Open-Source**: No cost for public repositories
✅ **Simple Integration**: Works with "use context7" command in prompts

---

## Prerequisites

- ✅ Node.js >= v18.0.0 (installed: v25.2.0)
- ✅ npm package manager
- ✅ MCP-compatible client (Claude Code, Cursor, Cline, etc.)
- ⚠️ Optional: Context7 API key for higher rate limits and private repos

---

## Installation

### Configuration Files Created

Context7 MCP has been configured in `config/mcp/`:

- **Claude Code**: `config/mcp/claude.json`
- **Cursor**: `config/mcp/cursor.json`
- **Cline**: `config/mcp/cline.json`

Each configuration uses the free tier (no API key required):
```json
{
  "context7": {
    "command": "npx",
    "args": [
      "-y",
      "@upstash/context7-mcp"
    ]
  }
}
```

---

## Getting an API Key (Optional)

For higher rate limits and access to private repositories:

1. Visit [context7.com/dashboard](https://context7.com/dashboard)
2. Sign up or log in
3. Generate an API key
4. Add it to your configuration:

```json
{
  "context7": {
    "command": "npx",
    "args": [
      "-y",
      "@upstash/context7-mcp",
      "--api-key",
      "YOUR_API_KEY_HERE"
    ]
  }
}
```

Or set as environment variable:
```bash
export CONTEXT7_API_KEY="your_api_key_here"
```

---

## Usage

### Basic Usage

Simply add `use context7` to your prompts when you need up-to-date documentation:

```
use context7: Show me how to create a Next.js 14 app router layout
```

```
use context7: What's the latest way to handle forms in React 18?
```

```
use context7: How do I use Prisma migrations with PostgreSQL?
```

### Version-Specific Queries

Request specific versions when needed:

```
use context7: Show me Tailwind CSS v3.4 configuration options
```

```
use context7: How to use React Query v5 for data fetching?
```

### Framework Examples

```
use context7: Next.js middleware authentication example
```

```
use context7: TypeScript 5.3 decorators syntax
```

```
use context7: Playwright test fixtures and hooks
```

---

## How It Works

1. **Context Injection**: When you use `use context7` in your prompt
2. **Documentation Fetch**: Context7 retrieves current docs from official sources
3. **Version Detection**: Identifies the correct version (if specified)
4. **Code Examples**: Includes working examples from official documentation
5. **LLM Context**: Injects this information into the AI's response

---

## Supported Sources

Context7 pulls documentation from:

- **Official Documentation Sites**
- **GitHub Repositories** (public and private with API key)
- **npm Package Documentation**
- **Framework & Library Docs**
- **API References**

Popular supported tools:
- Next.js, React, Vue, Angular, Svelte
- TypeScript, JavaScript
- Tailwind CSS, Material-UI
- Prisma, Drizzle, TypeORM
- Express, Fastify, NestJS
- Playwright, Vitest, Jest
- And thousands more...

---

## Configuration Options

### Local Server (Stdio Transport)
```json
{
  "context7": {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp"]
  }
}
```

**Pros**: No external dependencies, works offline (cached docs)
**Cons**: Slower first-time fetch

### Remote Server (HTTP Transport)
```json
{
  "context7": {
    "url": "https://mcp.context7.com/mcp",
    "headers": {
      "CONTEXT7_API_KEY": "your_api_key"
    }
  }
}
```

**Pros**: Faster, always up-to-date, no local installation
**Cons**: Requires internet connection, needs API key for best performance

### HTTP Server Mode (Local)
```json
{
  "context7": {
    "command": "npx",
    "args": [
      "-y",
      "@upstash/context7-mcp",
      "--transport",
      "http",
      "--port",
      "3000"
    ]
  }
}
```

**Pros**: Local control with HTTP benefits
**Cons**: Requires port management

---

## Rate Limits

### Without API Key (Free Tier)
- **Public Repositories**: Limited requests per hour
- **Private Repositories**: Not available
- **Sufficient for**: Individual developers, occasional use

### With API Key
- **Public Repositories**: Higher rate limits
- **Private Repositories**: Full access
- **Best for**: Team usage, frequent queries, private codebases

---

## Usage Examples

### Example 1: Next.js App Router
```
use context7: Show me how to implement server actions in Next.js 14
```

**Result**: Gets latest Next.js 14 documentation on server actions with working examples

### Example 2: Database Queries
```
use context7: How do I perform a transaction with Prisma?
```

**Result**: Current Prisma transaction syntax with error handling

### Example 3: Testing
```
use context7: What's the syntax for Playwright page fixtures?
```

**Result**: Up-to-date Playwright test fixtures documentation

### Example 4: Styling
```
use context7: Show me Tailwind CSS arbitrary values syntax
```

**Result**: Latest Tailwind CSS feature documentation

---

## Comparison with Other Approaches

| Approach | Up-to-Date | Version-Specific | Offline | Speed |
|----------|------------|------------------|---------|-------|
| **Context7 MCP** | ✅ Yes | ✅ Yes | ⚠️ Cached | Fast |
| **LLM Built-in Knowledge** | ❌ No | ❌ No | ✅ Yes | Fastest |
| **Manual Web Search** | ✅ Yes | ⚠️ Manual | ❌ No | Slow |
| **Copy-Paste Docs** | ✅ Yes | ✅ Yes | ❌ No | Slowest |

---

## Troubleshooting

### Issue: "Context7 not responding"

**Solution 1**: Check Node.js version
```bash
node --version  # Should be >= v18.0.0
```

**Solution 2**: Clear npm cache and reinstall
```bash
npm cache clean --force
npx -y @upstash/context7-mcp --help
```

### Issue: "Rate limit exceeded"

**Solution**: Get a free API key from context7.com/dashboard

```json
{
  "context7": {
    "command": "npx",
    "args": [
      "-y",
      "@upstash/context7-mcp",
      "--api-key",
      "your_key_here"
    ]
  }
}
```

### Issue: "Cannot find documentation for X"

**Possible Causes**:
- Library too new or obscure
- Private repository (needs API key)
- Typo in library name

**Solution**: Try different query phrasing
```
# Instead of:
use context7: some-obscure-lib

# Try:
use context7: Show me the official documentation for some-obscure-lib
```

### Issue: "Outdated information returned"

**Solution**: Clear Context7 cache
```bash
# Context7 caches documentation, force refresh by:
# 1. Restarting your AI assistant
# 2. Or specifying version explicitly
use context7: React 18.3 hooks documentation
```

---

## Best Practices

### 1. Be Specific
```
❌ Bad: use context7: React hooks
✅ Good: use context7: React 18 useEffect cleanup function
```

### 2. Specify Versions When Important
```
use context7: TypeScript 5.3 satisfies operator
```

### 3. Request Code Examples
```
use context7: Show me a working example of Next.js middleware
```

### 4. Combine with Other Tools
```
use context7: How to test Playwright with fixtures

Then run the tests using Playwright MCP
```

### 5. Use for Learning New APIs
```
use context7: What are the main features of Drizzle ORM?
```

---

## Security Considerations

⚠️ **Important Notes**:

1. **API Keys**: Store keys in environment variables, never commit to git
2. **Private Repos**: Only use API keys on trusted systems
3. **Rate Limits**: Respect free tier limits to avoid service disruption
4. **Documentation Access**: Context7 accesses public documentation; no code execution

---

## Advanced Usage

### Custom Documentation Sources

For private documentation, use API key and specify repo:

```
use context7: Fetch docs from github.com/mycompany/private-lib
```

### Caching Behavior

Context7 caches documentation for performance:
- Cache duration: Configurable
- Cache location: Local system
- Refresh: Automatic when version changes

### HTTP Server Mode

Run Context7 as a shared service:

```bash
npx @upstash/context7-mcp --transport http --port 3000
```

Then configure clients to connect to `http://localhost:3000`

---

## Integration Tips

### With Claude Code
```
# In your prompt:
use context7: Latest Prisma schema syntax

# Then implement the code
```

### With Cursor
```
# Cmd+K:
use context7: Tailwind CSS responsive design utilities

# Code will use latest docs
```

### With Cline
```
# Chat:
use context7: Next.js dynamic routes in app directory

# Cline will use current documentation
```

---

## Resources

- [Official Repository](https://github.com/upstash/context7)
- [Context7 Dashboard](https://context7.com/dashboard)
- [Upstash Documentation](https://upstash.com/docs)
- [MCP Protocol](https://modelcontextprotocol.io/)

---

## Version Information

- **Context7 MCP**: @latest (auto-updates via npx)
- **Node.js**: 25.2.0
- **npm**: 11.6.2
- **Transport**: Stdio (default)

---

## Next Steps

1. ✅ Context7 MCP server configured
2. 🔄 **Restart your AI assistant** to load the server
3. 🧪 **Test with**: `use context7: Show me Next.js 14 server actions example`
4. 🔑 **Optional**: Get API key from [context7.com/dashboard](https://context7.com/dashboard) for higher limits

---

**Last Updated**: 2025-11-17
**Maintained By**: WiseWealth Team
