# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web scraping project that uses Firecrawl to scrape siteoptz.com. The project consists of a single JavaScript file that performs comprehensive website scraping including the main page, sitemap discovery, and scraping all pages found in the sitemap.

## Architecture

- **scrape_siteoptz.js**: Main scraping script that uses the Firecrawl API to:
  - Scrape the main page at siteoptz.com
  - Retrieve the website's sitemap
  - Scrape all pages discovered in the sitemap
  - Output comprehensive results as JSON

- **mcp-config.json**: MCP (Model Context Protocol) server configuration for Firecrawl integration

## Running the Project

```bash
# Install dependencies (Firecrawl will be installed via npx)
# No package.json exists, dependencies are managed via npx

# Run the scraping script
node scrape_siteoptz.js
```

## API Configuration

The project uses the Firecrawl API with an API key configured in both:
- `mcp-config.json` for MCP server integration
- `scrape_siteoptz.js` for direct API usage

## Output

The script outputs a comprehensive JSON summary containing:
- Main page content
- Sitemap data
- All scraped pages
- Timestamp of the scraping operation