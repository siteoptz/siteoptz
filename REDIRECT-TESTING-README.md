# Redirect Testing Suite

This suite of scripts helps you test if your URLs are returning 301 redirects instead of 308 redirects.

## Files Created

- `test-301-redirects.js` - Comprehensive testing script
- `test-redirects-simple.js` - Simple testing script for quick tests
- `extract-vercel-urls.js` - Extracts URLs from vercel.json
- `test-all-redirects.js` - Master script that runs everything
- `test-urls.txt` - Sample URLs for testing

## Quick Start

### 1. Test Sample URLs (Quick Test)
```bash
node test-redirects-simple.js
```

### 2. Test All URLs from vercel.json (Complete Test)
```bash
node test-all-redirects.js complete
```

### 3. Test Custom URLs from File
```bash
node test-301-redirects.js test-urls.txt
```

## Detailed Usage

### Extract URLs from vercel.json
```bash
node extract-vercel-urls.js vercel.json vercel-redirect-urls.txt
```

### Test URLs from File
```bash
node test-301-redirects.js [input-file] [base-url]
```

Examples:
```bash
# Test URLs from file with default base URL (https://siteoptz.ai)
node test-301-redirects.js test-urls.txt

# Test URLs with custom base URL
node test-301-redirects.js test-urls.txt https://example.com

# Test URLs from vercel.json extraction
node test-301-redirects.js vercel-redirect-urls.txt
```

### Run Complete Test Suite
```bash
node test-all-redirects.js complete
```

## Input File Formats

The scripts support multiple input file formats:

### 1. Relative URLs (one per line)
```
/compare/10web-vs-acquisio
/compare/10web-vs-adalysis
/compare/old-page
```

### 2. Full URLs (one per line)
```
https://siteoptz.ai/compare/10web-vs-acquisio
https://siteoptz.ai/compare/10web-vs-adalysis
```

### 3. CSV Format
```
/compare/10web-vs-acquisio,/compare/10web/vs/acquisio,301
/compare/10web-vs-adalysis,/compare/10web/vs/adalysis,301
```

## Output

### Console Output
The scripts provide real-time feedback:
```
Testing: /compare/10web-vs-acquisio
✅ /compare/10web-vs-acquisio → 301 (PASS)
Testing: /compare/10web-vs-adalysis
❌ /compare/10web-vs-adalysis → 308 (FAIL - should be 301)
```

### Summary Report
```
============================================================
REDIRECT TEST RESULTS
============================================================
Total URLs tested: 100
✅ 301 Redirects: 95
❌ 308 Redirects: 3
⚠️  Errors: 2
📊 Pass Rate: 95%
```

### JSON Report
Detailed results are saved to `redirect-test-results.json`:
```json
{
  "summary": {
    "total": 100,
    "passed": 95,
    "failed": 3,
    "errors": 2,
    "passRate": 95
  },
  "details": [
    {
      "url": "/compare/10web-vs-acquisio",
      "statusCode": 301,
      "finalStatusCode": 200,
      "location": "/compare/10web/vs/acquisio",
      "finalUrl": "https://siteoptz.ai/compare/10web/vs/acquisio",
      "redirectChain": ["/compare/10web-vs-acquisio", "/compare/10web/vs/acquisio"],
      "is301": true,
      "is308": false,
      "status": "PASS"
    }
  ]
}
```

## Configuration Options

### Concurrency Control
The comprehensive script processes URLs in batches to avoid overwhelming the server:
```javascript
await tester.testUrlsFromFile(filePath, 5); // 5 concurrent requests
```

### Timeout Settings
Default timeout is 10 seconds per request. You can modify this in the script:
```javascript
timeout: 10000 // 10 seconds
```

### Base URL
Default base URL is `https://siteoptz.ai`. You can override it:
```bash
node test-301-redirects.js urls.txt https://your-domain.com
```

## Troubleshooting

### Common Issues

1. **Timeout Errors**
   - Increase timeout in the script
   - Reduce concurrency (batch size)
   - Check if the server is responding

2. **SSL Certificate Errors**
   - The script handles both HTTP and HTTPS
   - Make sure the URLs are correct

3. **Rate Limiting**
   - Reduce concurrency in the script
   - Add delays between requests if needed

### Debug Mode
For debugging, you can modify the scripts to add more verbose output:
```javascript
console.log('Request options:', options);
console.log('Response headers:', res.headers);
```

## Integration with CI/CD

You can integrate these scripts into your deployment pipeline:

```bash
# In your deployment script
node test-all-redirects.js complete
if [ $? -ne 0 ]; then
  echo "Redirect tests failed!"
  exit 1
fi
```

## Performance Tips

1. **Use the quick test** for development
2. **Use the complete test** for production validation
3. **Test in batches** for large numbers of URLs
4. **Cache results** to avoid repeated testing

## Expected Results

For a properly configured Vercel deployment with `"statusCode": 301` in vercel.json:
- ✅ All redirects should return 301 status codes
- ✅ Pass rate should be 100%
- ❌ No 308 status codes should be returned

