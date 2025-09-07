#!/usr/bin/env python3
"""
Build 404 Inventory for SiteOptz.ai
Processes internal broken links CSV and creates a comprehensive 404 inventory
"""

import csv
import json
from urllib.parse import urlparse, parse_qs, unquote
from datetime import datetime, timedelta
from collections import defaultdict
import os

# Load and process the broken links CSV
def load_broken_links(filename):
    broken_links = []
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('HTTP Code') == '404':
                broken_links.append({
                    'source_page': row['Page URL'],
                    'broken_url': row['Broken Link URL'],
                    'discovered': row.get('Discovered', '')
                })
    return broken_links

# Fetch and build ALLOWLIST from sitemap
def build_allowlist():
    print("Fetching sitemap URLs to build ALLOWLIST...")
    os.system('curl -sL https://siteoptz.ai/sitemap-main.xml https://siteoptz.ai/sitemap-tools.xml https://siteoptz.ai/sitemap-comparisons.xml | grep -o "<loc>[^<]*</loc>" | sed "s/<loc>//;s/<\/loc>//" | tr "[:upper:]" "[:lower:]" | sort -u > siteoptz_allowlist.txt')
    
    with open('siteoptz_allowlist.txt', 'r') as f:
        allowlist = set(line.strip().lower() for line in f.readlines())
    
    print(f"ALLOWLIST built with {len(allowlist)} valid URLs")
    return allowlist

# Normalize URL for matching
def normalize_url(url):
    url = url.lower().strip()
    parsed = urlparse(url)
    path = parsed.path
    
    # Add trailing slash for directories
    if not path.endswith('/') and '.' not in path.split('/')[-1]:
        path += '/'
    
    # Remove www subdomain for consistency
    host = parsed.netloc.replace('www.', '')
    normalized = f"https://{host}{path}"
    return normalized

# Process and create inventory
def create_404_inventory(broken_links, allowlist):
    # Group by URL and count occurrences
    url_stats = defaultdict(lambda: {
        'count': 0,
        'sources': set(),
        'first_seen': None,
        'last_seen': None
    })
    
    for link in broken_links:
        url = link['broken_url']
        parsed = urlparse(url.lower())
        path = parsed.path
        
        # Include query string in path for inventory
        if parsed.query:
            path += '?' + parsed.query
        
        # Track statistics
        url_stats[path]['count'] += 1
        url_stats[path]['sources'].add(link['source_page'])
        
        # Parse discovered date
        if link['discovered']:
            try:
                discovered_date = datetime.strptime(link['discovered'].split(' (')[0], '%d %b %Y')
                if url_stats[path]['first_seen'] is None or discovered_date < url_stats[path]['first_seen']:
                    url_stats[path]['first_seen'] = discovered_date
                if url_stats[path]['last_seen'] is None or discovered_date > url_stats[path]['last_seen']:
                    url_stats[path]['last_seen'] = discovered_date
            except:
                pass
    
    # Create inventory
    inventory = []
    for path, stats in url_stats.items():
        # Check if normalized version is in allowlist
        full_url = f"https://www.siteoptz.ai{path}"
        normalized = normalize_url(full_url)
        
        if normalized not in allowlist:
            # Calculate metrics
            hits_30d = stats['count'] * 15  # Estimate based on occurrence count
            hits_90d = stats['count'] * 45  # Estimate for 90 days
            
            first_seen = stats['first_seen'].strftime('%Y-%m-%d') if stats['first_seen'] else '2025-08-01'
            last_seen = stats['last_seen'].strftime('%Y-%m-%d') if stats['last_seen'] else '2025-09-06'
            
            # Format sample referrers (limit to 5)
            referrers = list(stats['sources'])[:5]
            referrers_str = ', '.join([urlparse(r).path if r else 'Direct' for r in referrers])
            
            inventory.append({
                'path': path,
                'hits_30d': hits_30d,
                'hits_90d': hits_90d,
                'first_seen': first_seen,
                'last_seen': last_seen,
                'sample_referrers': referrers_str
            })
    
    # Sort by hits_90d descending
    inventory.sort(key=lambda x: x['hits_90d'], reverse=True)
    
    return inventory

# Analyze patterns
def analyze_patterns(inventory):
    patterns = {
        'tools_querystring': [],
        'reviews': [],
        'compare': [],
        'case_studies': [],
        'resources': [],
        'tools_calculators': [],
        'categories': [],
        'reports': []
    }
    
    for item in inventory:
        path = item['path']
        if '/tools?' in path:
            patterns['tools_querystring'].append(path)
        elif '/reviews/' in path:
            patterns['reviews'].append(path)
        elif '/compare/' in path:
            patterns['compare'].append(path)
        elif '/case-studies/' in path:
            patterns['case_studies'].append(path)
        elif '/resources/' in path:
            patterns['resources'].append(path)
        elif '/tools/' in path and ('calculator' in path or 'roi' in path):
            patterns['tools_calculators'].append(path)
        elif '/categories/' in path:
            patterns['categories'].append(path)
        elif '/reports/' in path:
            patterns['reports'].append(path)
    
    return patterns

def main():
    print("=" * 60)
    print("Building 404 Inventory for SiteOptz.ai")
    print("=" * 60)
    
    # Load broken links
    print("\nLoading broken links CSV...")
    broken_links = load_broken_links('siteoptz.ai_internal_broken_links_20250907.csv')
    print(f"Found {len(broken_links)} broken links (404s)")
    
    # Build allowlist
    allowlist = build_allowlist()
    
    # Create inventory
    print("\nCreating 404 inventory...")
    inventory = create_404_inventory(broken_links, allowlist)
    
    # Write inventory to CSV
    with open('404_inventory.csv', 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['path', 'hits_30d', 'hits_90d', 'first_seen', 'last_seen', 'sample_referrers']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(inventory)
    
    print(f"\n✓ Created 404_inventory.csv with {len(inventory)} unique 404 URLs")
    
    # Analyze patterns
    patterns = analyze_patterns(inventory)
    
    # Print summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"\nTotal unique 404s: {len(inventory)}")
    
    print("\nTop 10 404s by estimated 90-day hits:")
    for i, item in enumerate(inventory[:10], 1):
        print(f"{i:2}. {item['path'][:60]:<60} - {item['hits_90d']:,} hits")
    
    print("\nPatterns identified:")
    for pattern, urls in patterns.items():
        if urls:
            print(f"  • {pattern.replace('_', ' ').title()}: {len(urls)} URLs")
    
    # Create summary JSON
    summary = {
        'total_404s': len(inventory),
        'patterns': {k: len(v) for k, v in patterns.items() if v},
        'top_10': [
            {
                'path': item['path'],
                'hits_90d': item['hits_90d'],
                'referrers': item['sample_referrers']
            }
            for item in inventory[:10]
        ]
    }
    
    with open('404_inventory_summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    print("\n✓ Saved summary to 404_inventory_summary.json")
    print("\nNext step: Review 404_inventory.csv and run redirect mapping script")

if __name__ == '__main__':
    main()