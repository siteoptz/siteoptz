#!/usr/bin/env python3
"""
Create Redirect Map for SiteOptz.ai
Maps 404 URLs to appropriate redirect targets or 410 Gone status
"""

import csv
import json
from urllib.parse import urlparse, parse_qs, unquote

def load_inventory(filename):
    """Load the 404 inventory"""
    inventory = []
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        inventory = list(reader)
    return inventory

def load_allowlist(filename):
    """Load the allowlist of valid URLs"""
    with open(filename, 'r') as f:
        allowlist = set(line.strip().lower() for line in f.readlines())
    return allowlist

def determine_redirect(path, hits_90d, allowlist):
    """Determine the appropriate redirect action for a 404 URL"""
    
    # Convert hits to int for priority calculation
    hits = int(hits_90d)
    
    # Determine priority based on traffic
    if hits > 10000:
        priority = 'high'
    elif hits > 5000:
        priority = 'med'
    else:
        priority = 'low'
    
    # Analyze URL and determine redirect
    redirect = {
        'path': path,
        'action': '301',
        'to_url': '',
        'priority': priority,
        'rationale': ''
    }
    
    # Tools with category querystring
    if '/tools?' in path and 'category=' in path:
        parsed = urlparse('https://siteoptz.ai' + path)
        params = parse_qs(parsed.query)
        category = params.get('category', [''])[0].lower()
        
        # Map categories to canonical URLs
        category_map = {
            'finance ai': None,
            'lead generation': None,
            'ux': '/categories/ux',
            'image generation': '/categories/image-generation',
            'ai automation': '/categories/ai-automation',
            'paid search & ppc': '/categories/paid-search-ppc',
            'video generation': '/categories/video-generation',
            'e-commerce': None,
            'email marketing': '/categories/email-marketing',
            'productivity': '/categories/productivity',
            'seo & optimization': '/categories/seo-optimization',
            'code generation': '/categories/code-generation',
            'content creation': '/categories/content-creation',
            'best voice ai tools': '/categories/best-voice-ai-tools',
            'research & education': '/categories/research-education',
            'social media': '/categories/social-media',
            'website builder': '/categories/website-builder',
            'data analysis': '/categories/data-analysis',
            'ai education': None,
            'ai for business': None,
            'ai translator': None,
            'ai website builder': '/categories/website-builder',
            'health ai': None,
            'voice ai': '/categories/best-voice-ai-tools',
            'writing': '/categories/content-creation'
        }
        
        mapped_category = category_map.get(category)
        if mapped_category and f'https://siteoptz.ai{mapped_category}' in allowlist:
            redirect['to_url'] = f'https://siteoptz.ai{mapped_category}'
            redirect['rationale'] = f'Category param → canonical category page'
        else:
            redirect['to_url'] = 'https://siteoptz.ai/tools'
            redirect['rationale'] = f'Invalid category → main tools page'
    
    # E-commerce category (discontinued)
    elif path == '/categories/e-commerce':
        redirect['action'] = '410'
        redirect['to_url'] = ''
        redirect['rationale'] = 'Category discontinued - no equivalent'
    
    # Review pages
    elif '/reviews/' in path:
        review_map = {
            'speechki-text-to-speech-ai': 'speechmatics',
            'text-to-video-stunning-video-creation': None,  # 410
            'cohere': 'cohere-ai',
            'webbotify-ai-powered-chatbot-platform': 'manychat',
            'stable-diffusion-web': None,  # 410
            'universe-no-code-custom-website-builder': 'universe-nocode-custom-website-builder',
            'convertfiles-ai-free-image-file-converter': 'convertfilesai-free-image-file-converter',
            'tellers-ai-automatic-text-to-video-tool': 'tellersai-automatic-texttovideo-tool',
            'videotube': 'videotube-ai',
            'explee': 'explee-ai',
            'divedeck-ai-powered-deck-builder': 'divedeck-aipowered-deck-builder',
            'unreal-speech-cost-effective-text-to-speech-api': 'unreal-speech-costeffective-texttospeech-api',
            'kleap': 'kleap-ai'
        }
        
        review_name = path.replace('/reviews/', '')
        if review_name in review_map:
            mapped_review = review_map[review_name]
            if mapped_review:
                target_url = f'/reviews/{mapped_review}'
                if f'https://siteoptz.ai{target_url}' in allowlist:
                    redirect['to_url'] = f'https://siteoptz.ai{target_url}'
                    redirect['rationale'] = 'Old review URL → current review page'
                else:
                    redirect['action'] = '410'
                    redirect['to_url'] = ''
                    redirect['rationale'] = 'Review discontinued'
            else:
                redirect['action'] = '410'
                redirect['to_url'] = ''
                redirect['rationale'] = 'Review discontinued'
        else:
            redirect['to_url'] = 'https://siteoptz.ai/reviews'
            redirect['rationale'] = 'Unknown review → main reviews page'
    
    # Compare pages
    elif '/compare/' in path:
        # Most comparison pages don't exist individually
        redirect['to_url'] = 'https://siteoptz.ai/compare'
        redirect['rationale'] = 'Comparison page → main compare tool'
    
    # Case studies
    elif '/case-studies/' in path:
        redirect['to_url'] = 'https://siteoptz.ai/case-studies'
        redirect['rationale'] = 'Missing case study → case studies hub'
    
    # Resources
    elif '/resources/' in path:
        redirect['to_url'] = 'https://siteoptz.ai/resources'
        redirect['rationale'] = 'Missing resource → resources hub'
    
    # Reports
    elif '/reports/' in path:
        # Check if specific report exists
        if 'claude-gpt4-benchmark' in path:
            redirect['to_url'] = 'https://siteoptz.ai/analysis/claude3-vs-gpt4'
            redirect['rationale'] = 'Report moved → analysis page'
        else:
            redirect['to_url'] = 'https://siteoptz.ai/resources'
            redirect['rationale'] = 'Missing report → resources hub'
    
    # ROI calculators
    elif '/tools/' in path and ('calculator' in path or 'roi' in path):
        calc_map = {
            'ai-roi-calculator': 'ai-cost-calculator',
            'content-roi-calculator': 'content-roi-calculator',
            'chatbot-roi-calculator': 'chatbot-roi-calculator',
            'security-roi-calculator': 'security-roi-calculator',
            'data-science-roi': None,
            'conversion-roi-calculator': 'conversion-roi-calculator',
            'fintech-ai-roi': None,
            'healthcare-ai-roi': 'healthcare-ai-roi',
            'recruitment-roi-calculator': 'recruitment-roi-calculator',
            'manufacturing-roi-calculator': 'manufacturing-roi-calculator',
            'sales-ai-roi': 'sales-ai-roi',
            'enterprise-ai-calculator': 'enterprise-ai-calculator',
            'ai-cost-calculator': 'ai-cost-calculator',
            'marketing-roi-calculator': 'marketing-roi-calculator',
            'no-code-ai-roi': 'no-code-ai-roi'
        }
        
        tool_name = path.replace('/tools/', '')
        if tool_name in calc_map:
            mapped_calc = calc_map[tool_name]
            if mapped_calc:
                target_url = f'/tools/{mapped_calc}'
                if f'https://siteoptz.ai{target_url}' in allowlist:
                    redirect['to_url'] = f'https://siteoptz.ai{target_url}'
                    redirect['rationale'] = 'Calculator URL → current calculator'
                else:
                    redirect['to_url'] = 'https://siteoptz.ai/tools'
                    redirect['rationale'] = 'Missing calculator → tools page'
            else:
                redirect['to_url'] = 'https://siteoptz.ai/tools'
                redirect['rationale'] = 'Discontinued calculator → tools page'
        else:
            redirect['to_url'] = 'https://siteoptz.ai/tools'
            redirect['rationale'] = 'Unknown tool → tools page'
    
    # Default fallback
    else:
        redirect['to_url'] = 'https://siteoptz.ai/'
        redirect['rationale'] = 'Unknown page → homepage'
        redirect['priority'] = 'low'
    
    return redirect

def main():
    print("=" * 60)
    print("Creating Redirect Map for SiteOptz.ai")
    print("=" * 60)
    
    # Load data
    print("\nLoading 404 inventory...")
    inventory = load_inventory('404_inventory.csv')
    print(f"Loaded {len(inventory)} 404 URLs")
    
    print("\nLoading allowlist...")
    allowlist = load_allowlist('siteoptz_allowlist.txt')
    print(f"Loaded {len(allowlist)} valid URLs")
    
    # Create redirects
    print("\nCreating redirect mappings...")
    redirects = []
    for item in inventory:
        redirect = determine_redirect(
            item['path'], 
            item['hits_90d'],
            allowlist
        )
        redirects.append(redirect)
    
    # Sort by priority and hits
    redirects.sort(key=lambda x: (
        0 if x['priority'] == 'high' else (1 if x['priority'] == 'med' else 2),
        -int(next((i['hits_90d'] for i in inventory if i['path'] == x['path']), 0))
    ))
    
    # Write redirects CSV
    with open('redirects_map.csv', 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['path', 'action', 'to_url', 'priority', 'rationale']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(redirects)
    
    print(f"\n✓ Created redirects_map.csv with {len(redirects)} mappings")
    
    # Summary statistics
    action_counts = {}
    priority_counts = {}
    for r in redirects:
        action = r['action']
        priority = r['priority']
        action_counts[action] = action_counts.get(action, 0) + 1
        priority_counts[priority] = priority_counts.get(priority, 0) + 1
    
    print("\n" + "=" * 60)
    print("REDIRECT MAP SUMMARY")
    print("=" * 60)
    
    print("\nActions:")
    for action, count in sorted(action_counts.items()):
        print(f"  • {action}: {count} URLs")
    
    print("\nPriorities:")
    for priority in ['high', 'med', 'low']:
        if priority in priority_counts:
            print(f"  • {priority}: {priority_counts[priority]} URLs")
    
    print("\nTop 10 redirects by traffic:")
    for i, item in enumerate(inventory[:10], 1):
        redirect = next((r for r in redirects if r['path'] == item['path']), None)
        if redirect:
            action = redirect['action']
            to_url = redirect['to_url'].replace('https://siteoptz.ai', '') if redirect['to_url'] else 'N/A'
            print(f"\n{i:2}. {item['path'][:50]}")
            print(f"    Hits: {int(item['hits_90d']):,}")
            print(f"    Action: {action}")
            if action == '301':
                print(f"    Target: {to_url}")
            else:
                print(f"    Status: Gone (410)")
    
    # Save summary
    summary = {
        'total_redirects': len(redirects),
        'actions': action_counts,
        'priorities': priority_counts,
        'timestamp': datetime.now().isoformat()
    }
    
    with open('redirects_summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    print("\n✓ Saved summary to redirects_summary.json")
    print("\nNext step: Generate platform-specific redirect configuration")

if __name__ == '__main__':
    from datetime import datetime
    main()