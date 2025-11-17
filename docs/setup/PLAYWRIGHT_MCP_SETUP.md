# Playwright MCP Server Setup Guide

<!-- Last Updated: 2025-11-17 -->

## Overview

The Playwright MCP (Model Context Protocol) server enables AI assistants to perform browser automation tasks using Playwright. It provides fast, lightweight browser control using accessibility trees rather than screenshots, ensuring deterministic and reliable automation.

---

## Features

✅ **Browser Automation**: Full control over Chromium, Firefox, WebKit, or Microsoft Edge
✅ **Accessibility-Based**: Uses accessibility trees instead of pixels for faster, more reliable automation
✅ **Headless Mode**: Run browsers in the background without UI
✅ **Persistent Profiles**: Save browser state across sessions
✅ **Multi-Browser Support**: Choose from multiple browser engines
✅ **Customizable Viewport**: Set custom browser window dimensions

---

## Prerequisites

- ✅ Node.js 18 or newer (installed: v25.2.0)
- ✅ npm (installed: 11.6.2)
- ✅ MCP-compatible client (Claude Code, Cursor, Cline, etc.)

---

## Installation

### 1. Install Playwright Package

The Playwright package and Chromium browser have been installed in the project:

```bash
npm install -D @playwright/test
npx playwright install chromium
```

### 2. Configuration Files Created

MCP configuration files have been updated in `config/mcp/`:

- **Claude Code**: `config/mcp/claude.json`
- **Cursor**: `config/mcp/cursor.json`
- **Cline**: `config/mcp/cline.json`

Each configuration includes:
```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest",
      "--browser",
      "chromium",
      "--headless"
    ]
  }
}
```

---

## Configuration Options

The Playwright MCP server supports various command-line arguments:

### Browser Selection
```json
"args": ["@playwright/mcp@latest", "--browser", "chromium"]
```

Options: `chromium`, `firefox`, `webkit`, `msedge`

### Headless Mode
```json
"args": ["@playwright/mcp@latest", "--headless"]
```

Run browser without visible UI (recommended for automation)

### Persistent Profile
```json
"args": [
  "@playwright/mcp@latest",
  "--user-data-dir",
  "/path/to/profile"
]
```

Save cookies, local storage, and other browser state

### Isolated Mode
```json
"args": ["@playwright/mcp@latest", "--isolated"]
```

Keep browser profile in memory only (default behavior)

### Custom Viewport
```json
"args": [
  "@playwright/mcp@latest",
  "--viewport-size",
  "1920x1080"
]
```

Set browser window dimensions

### Action Timeout
```json
"args": [
  "@playwright/mcp@latest",
  "--timeout-action",
  "30000"
]
```

Set timeout for actions in milliseconds (default: 30000)

### HTTP Transport (Advanced)
```json
"args": [
  "@playwright/mcp@latest",
  "--port",
  "3000"
]
```

Enable HTTP transport for remote setups

---

## Usage with AI Assistants

### Claude Code

1. The configuration is already set up in `config/mcp/claude.json`
2. Restart Claude Code to load the MCP server
3. Test with commands like:
   - "Navigate to https://example.com"
   - "Click the login button"
   - "Fill in the email field with test@example.com"
   - "Take a screenshot of the page"

### Cursor

1. The configuration is in `config/mcp/cursor.json`
2. Go to Cursor Settings → MCP
3. Verify the Playwright server is listed
4. Restart Cursor if needed

### Cline

1. The configuration is in `config/mcp/cline.json`
2. Restart VS Code/Cline
3. Playwright tools will be available in the assistant

---

## Available Tools

The Playwright MCP server provides these tools to AI assistants:

### Navigation
- `playwright_navigate`: Navigate to a URL
- `playwright_navigate_back`: Go back in browser history
- `playwright_navigate_forward`: Go forward in browser history

### Interaction
- `playwright_click`: Click on an element
- `playwright_fill`: Fill in a text field
- `playwright_select`: Select an option from a dropdown
- `playwright_hover`: Hover over an element
- `playwright_screenshot`: Take a screenshot

### Inspection
- `playwright_get_text`: Get text content from an element
- `playwright_get_attribute`: Get an attribute value
- `playwright_evaluate`: Execute JavaScript in the browser
- `playwright_wait_for_selector`: Wait for an element to appear

---

## Common Use Cases

### Web Scraping
```
"Navigate to https://news.ycombinator.com and extract the top 10 article titles"
```

### Form Automation
```
"Go to the contact form and fill it out with test data"
```

### Testing
```
"Navigate to the app, log in with test credentials, and verify the dashboard loads"
```

### Data Collection
```
"Visit multiple pages and collect pricing information into a table"
```

---

## Troubleshooting

### Issue: Browser fails to start

**Solution**: Ensure Playwright browsers are installed
```bash
npx playwright install chromium
```

### Issue: MCP server not found

**Solution**: Make sure npm is available and can access the internet
```bash
npx @playwright/mcp@latest --version
```

### Issue: Timeout errors

**Solution**: Increase timeout or use explicit waits
```json
"args": ["@playwright/mcp@latest", "--timeout-action", "60000"]
```

### Issue: Headless mode issues

**Solution**: Try running with headful mode for debugging
```json
"args": ["@playwright/mcp@latest"]
```
(Remove `--headless` flag)

---

## Advanced Configuration

### Multiple Browser Profiles

Create separate configurations for different browser types:

```json
{
  "mcpServers": {
    "playwright-chrome": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--browser", "chromium"]
    },
    "playwright-firefox": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--browser", "firefox"]
    }
  }
}
```

### Persistent Session

For scenarios requiring logged-in state:

```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest",
      "--user-data-dir",
      "/Users/cherifkhater/.playwright/profiles/wisewealth"
    ]
  }
}
```

---

## Security Considerations

⚠️ **Important Security Notes**:

1. **Headless Mode**: Always use `--headless` in production to prevent unauthorized browser access
2. **User Data**: Be careful with `--user-data-dir` as it can expose saved credentials
3. **Isolated Mode**: Use `--isolated` for sensitive operations to avoid state persistence
4. **Timeouts**: Set reasonable timeouts to prevent long-running operations
5. **URL Validation**: Validate URLs before navigation to prevent SSRF attacks

---

## Performance Tips

1. **Use Headless Mode**: Significantly faster than headful browsing
2. **Reuse Browser Context**: Avoid creating new browser instances repeatedly
3. **Optimize Selectors**: Use specific selectors to reduce lookup time
4. **Set Timeouts**: Don't wait indefinitely for elements
5. **Disable Images**: For scraping, disable image loading to speed up page loads

---

## Resources

- [Official Playwright MCP Repository](https://github.com/microsoft/playwright-mcp)
- [Playwright Documentation](https://playwright.dev/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## Version Information

- **Playwright MCP**: @latest (auto-updates)
- **Playwright**: 1.56.1
- **Node.js**: 25.2.0
- **npm**: 11.6.2

---

## Next Steps

1. ✅ Playwright MCP server installed
2. ✅ Configuration files created
3. 🔄 **Restart your AI assistant** to load the MCP server
4. 🧪 Test with a simple command: "Navigate to https://example.com and get the page title"

---

**Last Updated**: 2025-11-17
**Maintained By**: WiseWealth Team
