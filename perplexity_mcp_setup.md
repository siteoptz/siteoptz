# Perplexity MCP Setup Guide for Enhanced Keyword Research

## Overview
This guide will help you set up the Perplexity MCP server to enhance your keyword research with real-time data and AI-powered insights.

## Prerequisites
1. Perplexity API key (get one at https://www.perplexity.ai/)
2. Node.js installed
3. Claude Code CLI installed

## Step 1: Get Perplexity API Key
1. Visit https://www.perplexity.ai/
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key
5. Copy the API key for use in the next steps

## Step 2: Install Perplexity MCP
```bash
npm install -g perplexity-mcp
```

## Step 3: Configure MCP with API Key
```bash
# Set environment variable
export PERPLEXITY_API_KEY=your_api_key_here

# Add to MCP configuration
claude mcp add perplexity perplexity-mcp
```

## Step 4: Update MCP Configuration File
Edit your `mcp-config.json` file to include the API key:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-6e7e6312953b47069452e67509d9f857"
      }
    },
    "perplexity": {
      "command": "npx",
      "args": ["-y", "perplexity-mcp"],
      "env": {
        "PERPLEXITY_API_KEY": "your_perplexity_api_key_here"
      }
    }
  }
}
```

## Step 5: Test the Setup
```bash
# Check MCP server status
claude mcp list

# Test with a simple query
claude --mcp-config mcp-config.json --print "What are the latest trends in website optimization for 2025?"
```

## Step 6: Enhanced Keyword Research Commands

### Basic Keyword Research
```bash
claude --mcp-config mcp-config.json --print "Research keyword opportunities for website optimization services, focusing on AI-powered solutions and conversion rate optimization. Provide search volume estimates and competitive analysis."
```

### Competitive Analysis
```bash
claude --mcp-config mcp-config.json --print "Analyze the competitive landscape for website optimization services. Identify top competitors, their keyword strategies, and market positioning."
```

### Trend Analysis
```bash
claude --mcp-config mcp-config.json --print "What are the emerging trends in website optimization and digital marketing for 2025? Focus on AI, Core Web Vitals, and conversion optimization."
```

### Local SEO Research
```bash
claude --mcp-config mcp-config.json --print "Research local SEO opportunities for website optimization services in [your city/region]. Identify local competitors and keyword opportunities."
```

## Advanced Usage Examples

### Comprehensive Market Research
```bash
claude --mcp-config mcp-config.json --print "Conduct comprehensive market research for the website optimization industry. Include market size, growth trends, key players, customer segments, and emerging opportunities."
```

### Content Strategy Development
```bash
claude --mcp-config mcp-config.json --print "Develop a content strategy for SiteOptz based on current market trends. Include content types, keyword clusters, and content calendar recommendations."
```

### Technical SEO Research
```bash
claude --mcp-config mcp-config.json --print "Research the latest technical SEO factors and Core Web Vitals updates. How do these impact website optimization services?"
```

## Perplexity MCP Features

### Available Models
- **sonar-pro**: Best for general search and research
- **sonar-reasoning-pro**: Best for complex reasoning tasks
- **sonar-deep-research**: Best for comprehensive research

### Search Types
- **Web Search**: Real-time web search
- **Deep Research**: Comprehensive research with multiple sources
- **Academic Search**: Scholarly and academic sources
- **News Search**: Latest news and updates

## Troubleshooting

### Common Issues
1. **API Key Error**: Ensure your Perplexity API key is valid and properly set
2. **Connection Failed**: Check internet connection and API key permissions
3. **Rate Limiting**: Perplexity has rate limits; wait between requests

### Debug Commands
```bash
# Check MCP server health
claude mcp list

# Test API key
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.perplexity.ai/chat/completions

# View MCP logs
claude --debug --mcp-config mcp-config.json
```

## Best Practices

### For Keyword Research
1. **Start Broad**: Begin with general industry terms
2. **Narrow Down**: Focus on specific services and benefits
3. **Analyze Competition**: Research competitor keywords
4. **Track Trends**: Monitor seasonal and trending keywords
5. **Local Focus**: Include geographic modifiers

### For Content Strategy
1. **Cluster Keywords**: Group related keywords together
2. **Intent Matching**: Align content with search intent
3. **Update Regularly**: Refresh research monthly
4. **Monitor Performance**: Track keyword rankings and traffic

## Integration with Existing Tools

### Combine with SEO Tools
- Use Perplexity for trend research and content ideas
- Use Ahrefs/SEMrush for keyword metrics
- Use Google Keyword Planner for search volume data
- Use Google Search Console for performance tracking

### Workflow Integration
1. **Research Phase**: Use Perplexity for market insights
2. **Planning Phase**: Use keyword research tools for metrics
3. **Implementation Phase**: Create content based on research
4. **Monitoring Phase**: Track performance and adjust strategy

## Cost Considerations
- Perplexity API has usage-based pricing
- Monitor your API usage to control costs
- Consider batch processing for large research projects
- Use caching for repeated queries

## Security Notes
- Never commit API keys to version control
- Use environment variables for sensitive data
- Regularly rotate API keys
- Monitor API usage for unusual activity

---
*This setup guide will help you leverage Perplexity's AI-powered research capabilities to enhance your keyword research and content strategy for SiteOptz.*
