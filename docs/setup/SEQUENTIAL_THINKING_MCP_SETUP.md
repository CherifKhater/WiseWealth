# Sequential Thinking MCP Server Setup Guide

<!-- Last Updated: 2025-11-17 -->

## Overview

The Sequential Thinking MCP Server is an official Model Context Protocol implementation from Anthropic that enables dynamic, structured problem-solving through step-by-step reasoning. It allows AI assistants to break down complex problems into manageable steps, revise their thinking, and explore alternative reasoning paths.

---

## Features

✅ **Step-by-Step Reasoning**: Break complex problems into sequential thoughts
✅ **Dynamic Thinking**: Adjust the number of steps as understanding develops
✅ **Revision Capability**: Reconsider and refine previous thoughts
✅ **Branching Paths**: Explore alternative reasoning approaches
✅ **Hypothesis Generation**: Create and verify solution hypotheses
✅ **Context Continuity**: Maintain coherent reasoning across multiple steps
✅ **Irrelevant Filtering**: Focus on pertinent information

---

## Prerequisites

- ✅ Node.js >= v18.0.0 (installed: v25.2.0)
- ✅ npm package manager
- ✅ MCP-compatible client (Claude Code, Cursor, Cline, etc.)

---

## Installation

### Configuration Files Created

Sequential Thinking MCP has been configured in `config/mcp/`:

- **Claude Code**: `config/mcp/claude.json`
- **Cursor**: `config/mcp/cursor.json`
- **Cline**: `config/mcp/cline.json`

Each configuration includes:
```json
{
  "sequential-thinking": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sequential-thinking"
    ]
  }
}
```

---

## How It Works

### The `sequential_thinking` Tool

The server provides a single powerful tool that enables structured reasoning:

**Tool Name**: `sequential_thinking`

**Input Parameters**:
- `thought` (string) - The current thinking step
- `nextThoughtNeeded` (boolean) - Whether more thought steps are required
- `thoughtNumber` (integer) - Current thought number in the sequence
- `totalThoughts` (integer) - Estimated total thoughts needed
- `isRevision` (boolean, optional) - Indicates reconsidering previous thinking
- `revisesThought` (integer, optional) - Which thought is being reconsidered
- `branchFromThought` (integer, optional) - Branching point reference
- `branchId` (string, optional) - Identifier for the branch
- `needsMoreThoughts` (boolean, optional) - Flag for additional thoughts needed

**Process Flow**:
1. **Initial Thought**: AI starts with thought #1
2. **Sequential Steps**: Progresses through numbered thoughts
3. **Dynamic Adjustment**: Can increase/decrease total thoughts as needed
4. **Revision**: Can go back and revise earlier thoughts
5. **Branching**: Can explore alternative approaches
6. **Completion**: Signals when no more thoughts needed

---

## Usage Examples

### Example 1: Complex Problem Solving

**Task**: Design a scalable authentication system

```
Thought 1: Analyze requirements
- Multi-tenant support
- OAuth integration
- Session management
- Security best practices

Thought 2: Evaluate architecture options
- Microservices vs monolithic
- Database choices
- Caching strategies

Thought 3: Security considerations
- Token management
- Password hashing
- Rate limiting
- CSRF protection

Thought 4 (Revision of 2): Reconsidering architecture
- Initially considered monolithic
- Microservices provides better scalability
- Revised to use separate auth service

Thought 5: Implementation plan
- Phase 1: Basic auth
- Phase 2: OAuth integration
- Phase 3: Multi-tenant support
```

### Example 2: Code Design

**Task**: Optimize database query performance

```
Thought 1: Identify bottleneck
- Slow user dashboard queries
- Multiple N+1 query problems
- Missing indexes

Thought 2: Analysis of current queries
- 15 separate queries per page load
- Inefficient JOIN operations
- No query result caching

Thought 3 (Branch A): Solution approach - Query optimization
- Add database indexes
- Implement query batching
- Use eager loading

Thought 4 (Branch B from 2): Alternative - Caching layer
- Implement Redis caching
- Cache frequently accessed data
- Set appropriate TTLs

Thought 5: Combine both approaches
- Use indexes for base queries
- Add caching for expensive operations
- Monitor and adjust
```

### Example 3: Debugging

**Task**: Fix production bug causing intermittent failures

```
Thought 1: Gather symptoms
- Error occurs 2-3 times per hour
- No clear pattern in logs
- Only affects specific API endpoint

Thought 2: Initial hypothesis
- Maybe race condition in concurrent requests
- Check thread safety

Thought 3 (Revision of 2): Hypothesis incorrect
- Code is properly locked
- Must be something else

Thought 4: New hypothesis - Database connection pool
- Pool size too small
- Requests timing out
- Check pool metrics

Thought 5: Confirmed root cause
- Pool size: 10 connections
- Peak usage: 15-20 concurrent requests
- Solution: Increase pool to 30
```

---

## Ideal Use Cases

Sequential Thinking excels for:

### 1. **Complex Problem Decomposition**
Break down intricate problems into manageable steps
```
"Design a real-time notification system for a mobile app"
```

### 2. **Planning & Design**
Structure detailed implementation plans
```
"Create a migration strategy from MongoDB to PostgreSQL"
```

### 3. **Analysis with Course Corrections**
Revise understanding as new information emerges
```
"Debug why the application is using excessive memory"
```

### 4. **Multi-Step Tasks**
Maintain context across sequential operations
```
"Refactor the authentication module to support SSO"
```

### 5. **Hypothesis Testing**
Generate and verify different solution approaches
```
"Optimize API response time - explore multiple strategies"
```

### 6. **Architecture Decisions**
Evaluate trade-offs systematically
```
"Choose between microservices vs monolithic architecture for this use case"
```

---

## Configuration Options

### Basic Configuration (Default)
```json
{
  "sequential-thinking": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
  }
}
```

### Disable Thought Logging
```json
{
  "sequential-thinking": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
    "env": {
      "DISABLE_THOUGHT_LOGGING": "true"
    }
  }
}
```

**Use when**: You want to suppress verbose logging of thinking steps

### Docker Installation (Alternative)
```json
{
  "sequential-thinking": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "-i",
      "mcp/sequentialthinking"
    ]
  }
}
```

---

## Best Practices

### 1. **Start Broad, Then Narrow**
```
Thought 1: Overall problem analysis
Thought 2-3: Break into components
Thought 4+: Dive into specific details
```

### 2. **Use Revisions When Learning**
```
Thought 5 (Revises 2): After testing, I realize the initial approach won't work
```

### 3. **Branch for Alternatives**
```
Thought 6 (Branch A): Approach using method X
Thought 7 (Branch B from 5): Alternative using method Y
Thought 8: Compare and choose best approach
```

### 4. **Adjust Total Thoughts Dynamically**
```
Initially thought 5 steps would suffice
Complexity revealed → adjusted to 10 steps
```

### 5. **Maintain Clear Thought Labels**
```
Thought 3 - Database Schema: Define tables and relationships
Thought 4 - API Design: RESTful endpoints structure
Thought 5 - Security: Authentication and authorization
```

---

## Comparison with Standard Prompting

| Aspect | Standard Prompting | Sequential Thinking |
|--------|-------------------|-------------------|
| **Structure** | Unstructured response | Step-by-step reasoning |
| **Revision** | ❌ No built-in revision | ✅ Can revise thoughts |
| **Branching** | ❌ Linear only | ✅ Explore alternatives |
| **Context** | ⚠️ Can lose track | ✅ Maintains continuity |
| **Complexity** | ⚠️ Harder to follow | ✅ Clear progression |
| **Transparency** | ⚠️ Black box | ✅ Visible reasoning |

---

## Troubleshooting

### Issue: Sequential Thinking not available

**Solution 1**: Verify server is loaded
```bash
# Test installation
npx -y @modelcontextprotocol/server-sequential-thinking
```

**Solution 2**: Check MCP configuration
```bash
# Ensure config file is correct
cat config/mcp/claude.json
```

**Solution 3**: Restart AI assistant
```
Restart to load the new MCP server
```

### Issue: Too many thoughts generated

**Solution**: Set clearer boundaries in initial prompt
```
"Solve this problem in 5-7 sequential thoughts maximum"
```

### Issue: Thoughts not well-structured

**Solution**: Provide better context
```
"Use sequential thinking to analyze this problem.
Structure thoughts as: 1) Problem analysis, 2) Constraints,
3) Solutions, 4) Comparison, 5) Recommendation"
```

### Issue: Want to suppress logging

**Solution**: Add environment variable
```json
{
  "env": {
    "DISABLE_THOUGHT_LOGGING": "true"
  }
}
```

---

## Integration Tips

### With Claude Code
Sequential thinking is automatically used when the AI needs to solve complex problems. You can explicitly request it:
```
"Use sequential thinking to design a caching strategy for this API"
```

### With Cursor
Enable sequential thinking for complex refactoring:
```
"Refactor this module using sequential thinking to ensure nothing breaks"
```

### With Cline
Use for multi-step tasks:
```
"Implement this feature using sequential thinking to plan each step"
```

---

## Advanced Techniques

### Technique 1: Guided Thinking
```
"Use sequential thinking with these steps:
1. Analyze current state
2. Identify problems
3. Propose solutions
4. Evaluate trade-offs
5. Make recommendation"
```

### Technique 2: Iterative Refinement
```
"Use sequential thinking and revise thoughts as you gain more information
from testing each approach"
```

### Technique 3: Comparative Analysis
```
"Use branching in sequential thinking to explore both SQL and NoSQL options,
then compare in final thought"
```

### Technique 4: Problem Decomposition
```
"Break down this monolith into microservices using sequential thinking,
with each thought covering one service"
```

---

## Performance Considerations

- **Latency**: Each thought adds processing time
- **Cost**: More thoughts = more tokens
- **Optimization**: Use appropriate depth for task complexity

**Guidelines**:
- Simple tasks: 2-3 thoughts
- Medium tasks: 4-7 thoughts
- Complex tasks: 8-15 thoughts
- Very complex: 15+ thoughts with branches

---

## Resources

- [Official Repository](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)
- [NPM Package](https://www.npmjs.com/package/@modelcontextprotocol/server-sequential-thinking)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Anthropic Blog](https://www.anthropic.com/)

---

## Version Information

- **Sequential Thinking MCP**: @latest (auto-updates via npx)
- **Node.js**: 25.2.0
- **npm**: 11.6.2
- **Transport**: Stdio
- **License**: MIT

---

## Next Steps

1. ✅ Sequential Thinking MCP server configured
2. 🔄 **Restart your AI assistant** to load the server
3. 🧪 **Test with**: "Use sequential thinking to design a user authentication flow"
4. 📖 **Explore**: Try complex problem-solving tasks

---

**Last Updated**: 2025-11-17
**Maintained By**: WiseWealth Team
