#!/usr/bin/env python3
"""
Generate Platform-Specific Redirect Configuration
Creates redirect configurations for Vercel, Netlify, Nginx, and Apache
"""

import csv
import json
from urllib.parse import urlparse, parse_qs

def load_redirects(filename):
    """Load the redirect map"""
    redirects = []
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        redirects = list(reader)
    return redirects

def generate_vercel_config(redirects):
    """Generate Vercel configuration (vercel.json)"""
    vercel_redirects = []
    
    for r in redirects:
        if r['action'] == '301':
            source_path = r['path']
            dest_url = r['to_url'].replace('https://siteoptz.ai', '')
            
            # Handle query strings specially in Vercel
            if '?' in source_path:
                path_part, query_part = source_path.split('?', 1)
                # Parse query parameters
                params = parse_qs(query_part)
                
                # Create has conditions for each parameter
                has_conditions = []
                for key, values in params.items():
                    for value in values:
                        has_conditions.append({
                            "type": "query",
                            "key": key,
                            "value": value
                        })
                
                vercel_redirects.append({
                    "source": path_part,
                    "has": has_conditions,
                    "destination": dest_url,
                    "permanent": True
                })
            else:
                vercel_redirects.append({
                    "source": source_path,
                    "destination": dest_url,
                    "permanent": True
                })
    
    # Vercel has a limit of 1024 redirects
    if len(vercel_redirects) > 1024:
        print(f"Warning: Vercel supports max 1024 redirects, limiting to first 1024 (from {len(vercel_redirects)})")
        vercel_redirects = vercel_redirects[:1024]
    
    vercel_config = {
        "redirects": vercel_redirects
    }
    
    # Add 410 Gone handling via rewrites to a custom 410 page
    gone_paths = [r['path'] for r in redirects if r['action'] == '410']
    if gone_paths:
        vercel_config["rewrites"] = [
            {
                "source": path,
                "destination": "/410.html"
            } for path in gone_paths
        ]
    
    return vercel_config

def generate_netlify_config(redirects):
    """Generate Netlify configuration (_redirects file)"""
    netlify_rules = []
    
    for r in redirects:
        source = r['path']
        
        if r['action'] == '301':
            dest = r['to_url'].replace('https://siteoptz.ai', '')
            netlify_rules.append(f"{source}  {dest}  301!")
        elif r['action'] == '410':
            netlify_rules.append(f"{source}  /410.html  410!")
    
    return '\n'.join(netlify_rules)

def generate_nginx_config(redirects):
    """Generate Nginx configuration"""
    nginx_rules = []
    
    for r in redirects:
        source = r['path']
        
        if r['action'] == '301':
            dest = r['to_url']
            if '?' in source:
                # Handle query strings in Nginx
                path_part = source.split('?')[0]
                query_part = source.split('?')[1]
                nginx_rules.append(f'if ($request_uri ~* "^{path_part}\?{query_part}$") {{ return 301 {dest}; }}')
            else:
                nginx_rules.append(f'location = {source} {{ return 301 {dest}; }}')
        elif r['action'] == '410':
            nginx_rules.append(f'location = {source} {{ return 410; }}')
    
    return '\n'.join(nginx_rules)

def generate_apache_config(redirects):
    """Generate Apache .htaccess configuration"""
    apache_rules = ['RewriteEngine On']
    
    for r in redirects:
        source = r['path']
        
        if r['action'] == '301':
            dest = r['to_url'].replace('https://siteoptz.ai', '')
            if '?' in source:
                # Handle query strings in Apache
                path_part = source.split('?')[0]
                query_part = source.split('?')[1]
                apache_rules.append(f'RewriteCond %{{REQUEST_URI}} ^{path_part}$')
                apache_rules.append(f'RewriteCond %{{QUERY_STRING}} ^{query_part}$')
                apache_rules.append(f'RewriteRule .* {dest}? [R=301,L]')
            else:
                apache_rules.append(f'Redirect 301 {source} {dest}')
        elif r['action'] == '410':
            apache_rules.append(f'Redirect 410 {source}')
    
    return '\n'.join(apache_rules)

def main():
    print("=" * 60)
    print("Generating Platform-Specific Redirect Configurations")
    print("=" * 60)
    
    # Load redirects
    print("\nLoading redirect map...")
    redirects = load_redirects('redirects_map.csv')
    print(f"Loaded {len(redirects)} redirect rules")
    
    # Count actions
    action_counts = {}
    for r in redirects:
        action = r['action']
        action_counts[action] = action_counts.get(action, 0) + 1
    
    print(f"  • 301 Redirects: {action_counts.get('301', 0)}")
    print(f"  • 410 Gone: {action_counts.get('410', 0)}")
    
    # Generate Vercel configuration
    print("\n1. Generating Vercel configuration...")
    vercel_config = generate_vercel_config(redirects)
    
    with open('vercel.json', 'w') as f:
        json.dump(vercel_config, f, indent=2)
    print(f"   ✓ Created vercel.json with {len(vercel_config['redirects'])} redirects")
    
    # Generate Netlify configuration
    print("\n2. Generating Netlify configuration...")
    netlify_config = generate_netlify_config(redirects)
    
    with open('_redirects', 'w') as f:
        f.write("# Netlify redirect rules for SiteOptz.ai\n")
        f.write("# Generated from 404 inventory analysis\n\n")
        f.write(netlify_config)
    print(f"   ✓ Created _redirects file")
    
    # Generate Nginx configuration
    print("\n3. Generating Nginx configuration...")
    nginx_config = generate_nginx_config(redirects)
    
    with open('nginx_redirects.conf', 'w') as f:
        f.write("# Nginx redirect configuration for SiteOptz.ai\n")
        f.write("# Add these rules to your server block\n\n")
        f.write(nginx_config)
    print(f"   ✓ Created nginx_redirects.conf")
    
    # Generate Apache configuration
    print("\n4. Generating Apache configuration...")
    apache_config = generate_apache_config(redirects)
    
    with open('.htaccess_redirects', 'w') as f:
        f.write("# Apache redirect rules for SiteOptz.ai\n")
        f.write("# Add these to your .htaccess file\n\n")
        f.write(apache_config)
    print(f"   ✓ Created .htaccess_redirects")
    
    # Create a sample 410.html page
    print("\n5. Creating 410 Gone page template...")
    gone_page = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>410 Gone - SiteOptz.ai</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
        }
        h1 { 
            color: #1a202c; 
            font-size: 3rem;
            margin: 0 0 0.5rem 0;
        }
        h2 { 
            color: #4a5568;
            font-weight: normal;
            margin: 0 0 1.5rem 0;
        }
        p { 
            color: #718096;
            line-height: 1.6;
            margin: 0 0 2rem 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 32px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>410</h1>
        <h2>Content Permanently Removed</h2>
        <p>The page you're looking for has been permanently removed from SiteOptz.ai. This content is no longer available and will not return.</p>
        <a href="/" class="btn">Return to Homepage</a>
    </div>
</body>
</html>"""
    
    with open('410.html', 'w') as f:
        f.write(gone_page)
    print("   ✓ Created 410.html template")
    
    print("\n" + "=" * 60)
    print("DEPLOYMENT INSTRUCTIONS")
    print("=" * 60)
    
    print("\nFor Vercel:")
    print("  1. Copy vercel.json to your project root")
    print("  2. Copy 410.html to your public folder")
    print("  3. Deploy with: vercel --prod")
    print("  4. Test on staging first: vercel")
    
    print("\nFor Netlify:")
    print("  1. Copy _redirects to your public folder")
    print("  2. Copy 410.html to your public folder")
    print("  3. Deploy via Git push or Netlify CLI")
    
    print("\nFor Nginx:")
    print("  1. Add contents of nginx_redirects.conf to your server block")
    print("  2. Test configuration: nginx -t")
    print("  3. Reload: nginx -s reload")
    
    print("\nFor Apache:")
    print("  1. Add contents of .htaccess_redirects to your .htaccess")
    print("  2. Ensure mod_rewrite is enabled")
    print("  3. Test with: apachectl configtest")
    
    print("\n✓ All configuration files generated successfully!")
    print("\nNext steps:")
    print("  1. Review the generated configurations")
    print("  2. Deploy to staging environment")
    print("  3. Run curl_tests.sh to validate redirects")
    print("  4. Deploy to production after QA")

if __name__ == '__main__':
    main()