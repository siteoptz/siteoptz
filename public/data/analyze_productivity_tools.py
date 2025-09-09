#!/usr/bin/env python3
import json
import re
from collections import defaultdict

# Define the 31 existing categories
EXISTING_CATEGORIES = [
    'Content Creation',
    'Code Generation',
    'Video Generation', 
    'Social Media',
    'Image Generation',
    'Paid Search & PPC',
    'Marketing',
    'Education & Research',
    'AI Automation',
    'SEO & Optimization',
    'Chat',
    'Best Voice AI Tools',
    'Research & Education',
    'Voice AI',
    'Finance AI',
    'Data Analysis',
    'Lead Generation',
    'Self-Improvement',
    'Email Marketing',
    'Website Builder',
    'Translation',
    'Music & Audio',
    'UX & Design',
    'Sales',
    'E-commerce',
    'AI Website Builder',
    'Motion Capture',
    'Gaming',
    'Aggregators',
    'AI Education',
    'Productivity'  # Keep for truly general productivity tools
]

def categorize_tool(tool):
    """Categorize a tool based on its features, description, and use cases"""
    name = tool.get('name', '').lower()
    description = tool.get('overview', {}).get('description', '').lower()
    long_description = tool.get('overview', {}).get('long_description', '').lower()
    features = ' '.join(tool.get('features', [])).lower()
    
    # Handle use_cases which can be objects
    use_cases_text = ''
    if tool.get('use_cases'):
        for use_case in tool.get('use_cases', []):
            if isinstance(use_case, dict):
                use_cases_text += f" {use_case.get('title', '')} {use_case.get('description', '')}"
            else:
                use_cases_text += f" {use_case}"
    use_cases = use_cases_text.lower()
    
    website = tool.get('overview', {}).get('website', '').lower()
    
    # Combine all text for analysis
    all_text = f"{name} {description} {long_description} {features} {use_cases}"
    
    # Define categorization rules based on keywords and functionality
    # Order matters - more specific categories first
    
    # Voice AI (check before general AI categories)
    if any(keyword in all_text for keyword in ['voice', 'speech', 'audio transcription', 'voice assistant', 'speech recognition', 'text to speech', 'speech to text', 'voice over', 'voice generation']):
        return 'Voice AI'
    
    # Code Generation
    if any(keyword in all_text for keyword in ['code generation', 'coding', 'programming', 'developer', 'github', 'code assistant', 'software development', 'api development', 'debugging', 'code review']):
        return 'Code Generation'
    
    # Video Generation
    if any(keyword in all_text for keyword in ['video generation', 'video creation', 'video editing', 'video maker', 'video content', 'video production', 'animation', 'video ai']):
        return 'Video Generation'
    
    # Image Generation
    if any(keyword in all_text for keyword in ['image generation', 'image creation', 'photo editing', 'graphic design', 'ai art', 'image ai', 'avatar', 'logo design', 'visual content']):
        return 'Image Generation'
    
    # Music & Audio (check before general content creation)
    if any(keyword in all_text for keyword in ['music', 'audio', 'sound', 'podcast', 'audio editing', 'music generation', 'audio production', 'beats', 'soundtrack']):
        return 'Music & Audio'
    
    # Email Marketing (more specific than general marketing)
    if any(keyword in all_text for keyword in ['email marketing', 'email campaign', 'newsletter', 'email automation', 'email outreach', 'email sequence', 'drip campaign']):
        return 'Email Marketing'
    
    # Lead Generation (specific marketing function)
    if any(keyword in all_text for keyword in ['lead generation', 'lead gen', 'prospect', 'customer acquisition', 'sales leads', 'lead finder', 'lead capture', 'lead qualification']):
        return 'Lead Generation'
    
    # Sales (check before general marketing)
    if any(keyword in all_text for keyword in ['sales', 'crm', 'customer relationship', 'sales automation', 'sales pipeline', 'sales assistant', 'deal tracking', 'sales funnel']):
        return 'Sales'
    
    # SEO & Optimization
    if any(keyword in all_text for keyword in ['seo', 'search engine optimization', 'keyword research', 'ranking', 'organic traffic', 'serp', 'backlinks', 'site optimization']):
        return 'SEO & Optimization'
    
    # Website Builder / AI Website Builder
    if any(keyword in all_text for keyword in ['website builder', 'web design', 'website creation', 'landing page', 'web development', 'site builder', 'website generator']):
        if 'ai' in all_text or 'artificial intelligence' in all_text:
            return 'AI Website Builder'
        return 'Website Builder'
    
    # Social Media
    if any(keyword in all_text for keyword in ['social media', 'instagram', 'facebook', 'twitter', 'linkedin', 'social content', 'social posting', 'social management', 'tiktok', 'youtube']):
        return 'Social Media'
    
    # Content Creation
    if any(keyword in all_text for keyword in ['content creation', 'blog writing', 'article writing', 'copywriting', 'content generation', 'writing assistant', 'text generation', 'content strategy', 'creative writing']):
        return 'Content Creation'
    
    # Marketing (general, after specific marketing categories)
    if any(keyword in all_text for keyword in ['marketing', 'campaign', 'advertising', 'brand', 'promotion', 'marketing automation', 'digital marketing', 'growth marketing']):
        return 'Marketing'
    
    # Data Analysis
    if any(keyword in all_text for keyword in ['data analysis', 'analytics', 'business intelligence', 'data visualization', 'reporting', 'dashboard', 'insights', 'metrics', 'kpi']):
        return 'Data Analysis'
    
    # Chat
    if any(keyword in all_text for keyword in ['chatbot', 'chat assistant', 'conversational ai', 'customer support chat', 'live chat', 'chat interface', 'virtual assistant']):
        return 'Chat'
    
    # Translation
    if any(keyword in all_text for keyword in ['translation', 'translate', 'multilingual', 'localization', 'language conversion', 'language support']):
        return 'Translation'
    
    # Finance AI
    if any(keyword in all_text for keyword in ['finance', 'financial', 'accounting', 'budget', 'investment', 'money', 'expense', 'invoice', 'financial planning']):
        return 'Finance AI'
    
    # Education & Research (combine both similar categories)
    if any(keyword in all_text for keyword in ['education', 'learning', 'research', 'study', 'academic', 'knowledge', 'training', 'course', 'tutorial', 'e-learning']):
        return 'Education & Research'
    
    # UX & Design (be more specific to avoid catching general tools)
    if any(keyword in all_text for keyword in ['ux design', 'ui design', 'user experience design', 'wireframe', 'prototype design', 'design system', 'interface design']) and any(keyword in all_text for keyword in ['designer', 'design tool', 'figma', 'sketch']):
        return 'UX & Design'
    
    # E-commerce
    if any(keyword in all_text for keyword in ['ecommerce', 'e-commerce', 'online store', 'shopify', 'online selling', 'retail', 'marketplace', 'product catalog']):
        return 'E-commerce'
    
    # AI Automation
    if any(keyword in all_text for keyword in ['automation', 'workflow', 'process automation', 'ai automation', 'automate', 'workflow automation', 'business process']):
        return 'AI Automation'
    
    # Self-Improvement
    if any(keyword in all_text for keyword in ['self-improvement', 'personal development', 'habit', 'goal setting', 'mindfulness', 'wellness', 'meditation', 'personal growth']):
        return 'Self-Improvement'
    
    # Gaming
    if any(keyword in all_text for keyword in ['gaming', 'game', 'game development', 'game design', 'esports', 'game ai']):
        return 'Gaming'
    
    # True Productivity tools (calendar, time management, task management without specific business functions)
    productivity_keywords = ['meeting', 'calendar', 'scheduling', 'time management', 'task management', 'note taking', 'productivity', 'time tracking', 'project management', 'todo', 'reminder', 'planning', 'organize', 'workflow', 'efficiency']
    business_keywords = ['marketing', 'sales', 'lead', 'campaign', 'crm', 'customer', 'revenue', 'conversion']
    
    if any(keyword in all_text for keyword in productivity_keywords) and not any(keyword in all_text for keyword in business_keywords):
        return 'Productivity'
    
    # Default: Move remaining ambiguous tools to more appropriate categories based on context
    # Check if it's more AI Automation focused
    if any(keyword in all_text for keyword in ['automate', 'automation', 'workflow', 'agent', 'ai agent', 'intelligent', 'smart']):
        return 'AI Automation'
    
    # Check if it's more about general business tools  
    if any(keyword in all_text for keyword in ['business', 'enterprise', 'team', 'collaboration', 'workspace', 'platform']):
        return 'AI Automation'  # Most business tools fall under automation
    
    # For truly unclear tools, keep in Productivity
    return 'Productivity'

def main():
    # Read the JSON file
    with open('/Users/siteoptz/siteoptz/public/data/aiToolsData.json', 'r') as f:
        data = json.load(f)

    # Find all tools with Productivity category
    productivity_tools = []
    for tool in data:
        if tool.get('overview', {}).get('category') == 'Productivity' or tool.get('category') == 'Productivity':
            productivity_tools.append(tool)

    print(f"Analyzing {len(productivity_tools)} tools currently categorized as 'Productivity'")
    print("=" * 80)

    # Categorize tools
    categorized = defaultdict(list)
    
    for tool in productivity_tools:
        new_category = categorize_tool(tool)
        categorized[new_category].append({
            'name': tool.get('name', 'Unknown'),
            'description': tool.get('overview', {}).get('description', 'No description')[:100] + '...',
            'website': tool.get('overview', {}).get('website', 'No website'),
            'original_tool': tool
        })

    # Display results grouped by category
    for category in sorted(categorized.keys()):
        tools = categorized[category]
        print(f"\n{category.upper()} ({len(tools)} tools)")
        print("-" * 50)
        
        for tool in tools:
            print(f"• {tool['name']}")
            print(f"  Description: {tool['description']}")
            print(f"  Website: {tool['website']}")
            print()

    # Summary
    print("\n" + "=" * 80)
    print("DISTRIBUTION SUMMARY")
    print("=" * 80)
    
    total_moved = 0
    for category in sorted(categorized.keys()):
        count = len(categorized[category])
        print(f"{category}: {count} tools")
        if category != 'Productivity':
            total_moved += count
    
    print(f"\nTotal tools moved from Productivity: {total_moved}")
    print(f"Tools remaining in Productivity: {len(categorized['Productivity'])}")
    print(f"Total tools analyzed: {sum(len(tools) for tools in categorized.values())}")

if __name__ == "__main__":
    main()