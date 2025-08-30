# Keyword Research Tools

This directory contains DataForSEO-powered keyword research tools for SiteOptz AI tools analysis.

## Files

- `dataforseo-batch.js` - Simple keyword analysis script
- `dataforseo-advanced.js` - Comprehensive keyword research with related keywords
- `run-keyword-research.js` - Simple runner script
- `env.example` - Environment variables template

## Setup

1. **Install dependencies** (if not already installed):
```bash
npm install axios
```

2. **Set up credentials**:
   - Copy `env.example` to `.env.local`
   - Add your DataForSEO credentials to `.env.local`
   - Or use the hardcoded credentials in the script (less secure)

3. **Run keyword research**:
```bash
# Simple version
node dataforseo-batch.js

# Advanced version with related keywords
node dataforseo-advanced.js

# Or use the runner
node run-keyword-research.js
```

## Features

### Basic Script (`dataforseo-batch.js`)
- Search volume analysis for predefined keywords
- Basic metrics (volume, CPC, competition)
- Simple console output

### Advanced Script (`dataforseo-advanced.js`)
- **Comprehensive Analysis**: Multiple keyword categories
- **Related Keywords**: Discovers related terms for high-volume keywords
- **Opportunity Scoring**: Identifies high-volume, low-competition keywords
- **Detailed Reporting**: Console and JSON file output
- **Cost Tracking**: Monitors API usage costs
- **Rate Limiting**: Respects API limits

## Keyword Categories

The advanced script analyzes these categories:

1. **AI Code Editors**: cursor vs chatgpt, AI code editor comparison, etc.
2. **AI Tools Comparison**: General AI tool comparisons
3. **SiteOptz Branded**: Keywords related to SiteOptz platform

## Output

Results are saved to `data/keyword-research-[timestamp].json` including:
- Search volumes and trends
- Cost-per-click data  
- Competition levels
- Related keyword suggestions
- Top opportunities analysis

## Usage Notes

- Each API call costs ~$0.01
- Advanced script may cost $2-5 for full analysis
- Results include 12 months of search trend data
- Location set to United States (location_code: 2840)

## Example Output

```
📊 KEYWORD RESEARCH REPORT
================================================================================

📂 AI CODE EDITORS
------------------------------------------------------------
Rank | Keyword                        | Volume |   CPC | Competition
------------------------------------------------------------
 1 | cursor vs chatgpt               |   1200 | $2.45 | low
 2 | best AI code editor 2025        |    890 | $3.12 | medium
 3 | cursor ide review               |    650 | $1.89 | low

🎯 TOP 10 OPPORTUNITIES (High Volume + Low Competition)
----------------------------------------------------------------------
 1 | cursor vs chatgpt               | Score:  1080 | AI Code Editors
 2 | AI coding assistant comparison  | Score:   756 | AI Code Editors

💰 RESEARCH SUMMARY
----------------------------------------
Total keywords analyzed: 24
Keywords with volume > 0: 18
Total monthly search volume: 12,450
Average CPC: $2.34
Total API cost: $0.24
```

## Security

- Never commit `.env.local` or credentials to git
- Use environment variables for production
- Monitor API usage and costs