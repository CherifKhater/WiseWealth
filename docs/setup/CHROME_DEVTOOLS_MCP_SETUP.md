# Chrome DevTools MCP Server Setup Guide

<!-- Last Updated: 2025-11-17 -->

## Overview

Chrome DevTools MCP is an official Google Model-Context-Protocol server that gives AI coding assistants full access to Chrome DevTools capabilities. It enables advanced browser automation, performance analysis, debugging, and network inspection through the Chrome DevTools Protocol.

---

## Features

✅ **Advanced Debugging**: Access browser console, evaluate scripts, inspect DOM
✅ **Performance Analysis**: Record and analyze performance traces
✅ **Network Inspection**: Monitor and inspect network requests
✅ **Reliable Automation**: Puppeteer-based automation with automatic waiting
✅ **Device Emulation**: Test responsive designs with various device profiles
✅ **Screenshot & Snapshots**: Capture visual states and accessibility trees
✅ **Form Automation**: Fill forms, handle dialogs, upload files
✅ **Navigation Control**: Full page lifecycle management

---

## Prerequisites

- ✅ Node.js v20.19 or newer (installed: v25.2.0)
- ✅ Chrome stable version or newer
- ✅ npm package manager
- ✅ MCP-compatible client (Claude Code, Cursor, Cline, etc.)

---

## Installation

### Configuration Files Created

Chrome DevTools MCP has been configured in `config/mcp/`:

- **Claude Code**: `config/mcp/claude.json`
- **Cursor**: `config/mcp/cursor.json`
- **Cline**: `config/mcp/cline.json`

Each configuration includes:
```json
{
  "chrome-devtools": {
    "command": "npx",
    "args": [
      "-y",
      "chrome-devtools-mcp@latest",
      "--headless"
    ]
  }
}
```

---

## Available Tools (26 Total)

### 🖱️ Input Automation (8 tools)
- `chrome_click` - Click on elements
- `chrome_drag` - Drag and drop operations
- `chrome_fill` - Fill text into input fields
- `chrome_fillForm` - Fill entire forms at once
- `chrome_handleDialog` - Handle browser dialogs (alert, confirm, prompt)
- `chrome_hover` - Hover over elements
- `chrome_press` - Press keyboard keys
- `chrome_uploadFile` - Upload files to file inputs

### 🧭 Navigation (6 tools)
- `chrome_goto` - Navigate to URLs
- `chrome_goBack` - Navigate backward in history
- `chrome_goForward` - Navigate forward in history
- `chrome_reload` - Reload current page
- `chrome_waitForSelector` - Wait for elements to appear
- `chrome_waitForNavigation` - Wait for page navigation to complete

### 📱 Emulation (2 tools)
- `chrome_emulateDevice` - Emulate mobile devices (e.g., "iPhone 15")
- `chrome_setViewport` - Set custom viewport dimensions

### ⚡ Performance (3 tools)
- `chrome_startPerformanceTrace` - Begin recording performance trace
- `chrome_stopPerformanceTrace` - Stop and retrieve performance trace
- `chrome_analyzePerformance` - Get AI-powered performance insights

### 🌐 Network (2 tools)
- `chrome_getNetworkRequests` - Retrieve all network requests
- `chrome_inspectNetworkRequest` - Get detailed request information

### 🔍 Debugging (5 tools)
- `chrome_evaluate` - Execute JavaScript in browser context
- `chrome_getConsoleMessages` - Retrieve browser console logs
- `chrome_screenshot` - Capture page screenshots
- `chrome_snapshot` - Get accessibility tree snapshot
- `chrome_getPageInfo` - Get current page metadata

---

## Configuration Options

The Chrome DevTools MCP server supports various command-line arguments:

### Headless Mode
```json
"args": ["-y", "chrome-devtools-mcp@latest", "--headless"]
```

Run browser without visible UI (recommended for automation)

### Chrome Channel Selection
```json
"args": ["-y", "chrome-devtools-mcp@latest", "--channel", "beta"]
```

Options: `stable`, `canary`, `beta`, `dev`

### Custom Chrome Executable
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--executablePath",
  "/path/to/chrome"
]
```

### Isolated Mode (Temporary Profile)
```json
"args": ["-y", "chrome-devtools-mcp@latest", "--isolated"]
```

Creates temporary user data directory that's automatically cleaned up

### Custom Viewport
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--viewport",
  "1920x1080"
]
```

Set initial browser window size (max 3840x2160 in headless mode)

### Connect to Running Browser
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--browserUrl",
  "http://127.0.0.1:9222"
]
```

Connect to existing Chrome instance via remote debugging port

### WebSocket Connection
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--wsEndpoint",
  "ws://127.0.0.1:9222/devtools/browser/<id>"
]
```

Direct WebSocket connection for advanced scenarios

### Proxy Configuration
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--proxyServer",
  "http://myproxy:3128"
]
```

### Accept Insecure Certificates
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--acceptInsecureCerts"
]
```

⚠️ Use with caution - ignores certificate errors

### Disable Specific Tool Categories
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--no-category-performance",
  "--no-category-network",
  "--no-category-emulation"
]
```

---

## Usage with AI Assistants

### Claude Code

1. Configuration is already set up in `config/mcp/claude.json`
2. Restart Claude Code to load the MCP server
3. Test with commands like:
   - "Navigate to https://example.com and analyze its performance"
   - "Check the console logs on the current page"
   - "Take a screenshot of https://google.com"
   - "Fill out the login form on this website"

### Cursor

1. Configuration is in `config/mcp/cursor.json`
2. Go to Cursor Settings → MCP
3. Verify Chrome DevTools server is listed
4. Restart Cursor if needed

### Cline

1. Configuration is in `config/mcp/cline.json`
2. Restart VS Code/Cline
3. Chrome DevTools tools will be available

---

## Common Use Cases

### Performance Analysis
```
"Navigate to https://developers.chrome.com and analyze its performance.
Identify any bottlenecks or optimization opportunities."
```

### Automated Testing
```
"Go to the login page, fill in test credentials, submit the form,
and verify the dashboard loads successfully."
```

### Network Debugging
```
"Load the page and show me all failed network requests with their error details."
```

### Console Debugging
```
"Navigate to the app and check if there are any JavaScript errors in the console."
```

### Visual Regression
```
"Take screenshots of the homepage at desktop and mobile viewports for comparison."
```

### Form Automation
```
"Fill out the contact form with test data and submit it."
```

---

## Advanced Features

### Performance Tracing

Record detailed performance metrics:
```
1. Start performance trace
2. Perform actions (navigate, interact, etc.)
3. Stop performance trace
4. Analyze with AI-powered insights
```

### Device Emulation

Test responsive designs:
```
"Emulate iPhone 15 and take a screenshot of the homepage"
```

### Network Request Inspection

Debug API calls:
```
"Show me all XHR requests made when loading this page,
including their response status and payloads."
```

### Console Access

Debug JavaScript:
```
"Execute 'localStorage.getItem('user')' and show me the result"
```

---

## Data Storage

- **User Data Directory**: `~/.cache/chrome-devtools-mcp/` (default)
- **Isolated Mode**: Temporary directory, auto-cleaned on exit
- **Custom Profile**: Use `--user-data-dir` for persistent state

---

## Security Considerations

⚠️ **Important Security Notes**:

1. **Browser Content Exposure**: All page content is accessible to MCP clients
2. **Sensitive Information**: Avoid using with sensitive websites (banking, etc.)
3. **Remote Debugging**: Be cautious exposing debugging ports
4. **Headless Mode**: Always use `--headless` in production environments
5. **Isolated Sessions**: Use `--isolated` for sensitive operations
6. **Certificate Validation**: Only use `--acceptInsecureCerts` in controlled environments
7. **Proxy Settings**: Validate proxy configurations to prevent data leaks

---

## Troubleshooting

### Issue: Chrome fails to start

**Solution 1**: Ensure Chrome is installed and up to date
```bash
google-chrome --version  # or chrome --version on Mac
```

**Solution 2**: Use `--isolated` mode to avoid profile conflicts
```json
"args": ["-y", "chrome-devtools-mcp@latest", "--isolated"]
```

**Solution 3**: Specify explicit Chrome path
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--executablePath",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
]
```

### Issue: OS sandbox prevents Chrome startup

**Solution**: Connect to an already-running Chrome instance
```bash
# Start Chrome with remote debugging
google-chrome --remote-debugging-port=9222

# Configure MCP to connect to it
"args": ["-y", "chrome-devtools-mcp@latest", "--browserUrl", "http://127.0.0.1:9222"]
```

### Issue: Timeout errors

**Solution**: Network or navigation timeouts may need adjustment at the Chrome level
```json
"args": [
  "-y",
  "chrome-devtools-mcp@latest",
  "--chromeArg=--timeout=60000"
]
```

### Issue: Headless mode issues

**Solution**: Try running headful mode for debugging
```json
"args": ["-y", "chrome-devtools-mcp@latest"]
```
(Remove `--headless` flag)

### Issue: Debug logging needed

**Solution**: Enable verbose logging
```bash
DEBUG=* npx -y chrome-devtools-mcp@latest --logFile /tmp/chrome-devtools-mcp.log
```

---

## Performance Tips

1. **Use Headless Mode**: Significantly faster than headful browsing
2. **Isolated Sessions**: Clean slate for each session, no profile overhead
3. **Disable Unused Categories**: Remove tools you don't need to reduce overhead
4. **Reuse Browser Context**: Don't restart Chrome for every operation
5. **Connection Pooling**: Connect to running instance via `--browserUrl`

---

## Comparison: Chrome DevTools vs Playwright MCP

| Feature | Chrome DevTools MCP | Playwright MCP |
|---------|-------------------|----------------|
| **Performance Traces** | ✅ Advanced | ❌ No |
| **Console Access** | ✅ Full | ⚠️ Limited |
| **Network Inspection** | ✅ Detailed | ⚠️ Basic |
| **Multi-Browser** | ❌ Chrome only | ✅ Chrome, Firefox, WebKit |
| **Automation** | ✅ Puppeteer-based | ✅ Playwright-based |
| **DevTools Protocol** | ✅ Direct | ⚠️ Abstracted |
| **AI Performance Analysis** | ✅ Built-in | ❌ No |

**Recommendation**:
- Use **Chrome DevTools MCP** for debugging, performance analysis, and Chrome-specific work
- Use **Playwright MCP** for cross-browser testing and simple automation

---

## Resources

- [Official Repository](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Chrome DevTools Blog Post](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)

---

## Version Information

- **Chrome DevTools MCP**: @latest (auto-updates)
- **Node.js**: 25.2.0
- **npm**: 11.6.2
- **Chrome**: Stable channel (system-installed)

---

## Next Steps

1. ✅ Chrome DevTools MCP server installed
2. ✅ Configuration files created for all AI assistants
3. 🔄 **Restart your AI assistant** to load the MCP server
4. 🧪 Test with: "Navigate to https://developers.chrome.com and analyze its performance"

---

**Last Updated**: 2025-11-17
**Maintained By**: WiseWealth Team
