#!/usr/bin/env python3
import json
from collections import defaultdict

def get_category_with_rationale(tool):
    """Get the most appropriate category for a tool with detailed rationale"""
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
    all_text = f"{name} {description} {long_description} {features} {use_cases}"
    
    # Voice AI Tools
    voice_keywords = ['voice', 'speech', 'audio transcription', 'voice assistant', 'speech recognition', 'text to speech', 'speech to text', 'voice over', 'voice generation']
    if any(keyword in all_text for keyword in voice_keywords):
        return 'Voice AI', f"Contains voice/speech functionality: {[k for k in voice_keywords if k in all_text]}"
    
    # Code Generation Tools
    code_keywords = ['code generation', 'coding', 'programming', 'developer', 'github', 'code assistant', 'software development', 'api development', 'debugging', 'code review']
    if any(keyword in all_text for keyword in code_keywords):
        return 'Code Generation', f"Contains programming/development functionality: {[k for k in code_keywords if k in all_text]}"
    
    # Video Generation Tools
    video_keywords = ['video generation', 'video creation', 'video editing', 'video maker', 'video content', 'video production', 'animation', 'video ai']
    if any(keyword in all_text for keyword in video_keywords):
        return 'Video Generation', f"Contains video creation/editing functionality: {[k for k in video_keywords if k in all_text]}"
    
    # Image Generation Tools
    image_keywords = ['image generation', 'image creation', 'photo editing', 'graphic design', 'ai art', 'image ai', 'avatar', 'logo design', 'visual content']
    if any(keyword in all_text for keyword in image_keywords):
        return 'Image Generation', f"Contains image creation/editing functionality: {[k for k in image_keywords if k in all_text]}"
    
    # Music & Audio Tools
    music_keywords = ['music', 'audio', 'sound', 'podcast', 'audio editing', 'music generation', 'audio production', 'beats', 'soundtrack']
    if any(keyword in all_text for keyword in music_keywords):
        return 'Music & Audio', f"Contains music/audio functionality: {[k for k in music_keywords if k in all_text]}"
    
    # Email Marketing Tools
    email_keywords = ['email marketing', 'email campaign', 'newsletter', 'email automation', 'email outreach', 'email sequence', 'drip campaign']
    if any(keyword in all_text for keyword in email_keywords):
        return 'Email Marketing', f"Contains email marketing functionality: {[k for k in email_keywords if k in all_text]}"
    
    # Lead Generation Tools
    lead_keywords = ['lead generation', 'lead gen', 'prospect', 'customer acquisition', 'sales leads', 'lead finder', 'lead capture', 'lead qualification']
    if any(keyword in all_text for keyword in lead_keywords):
        return 'Lead Generation', f"Contains lead generation functionality: {[k for k in lead_keywords if k in all_text]}"
    
    # Sales Tools
    sales_keywords = ['sales', 'crm', 'customer relationship', 'sales automation', 'sales pipeline', 'sales assistant', 'deal tracking', 'sales funnel']
    if any(keyword in all_text for keyword in sales_keywords):
        return 'Sales', f"Contains sales/CRM functionality: {[k for k in sales_keywords if k in all_text]}"
    
    # SEO & Optimization Tools
    seo_keywords = ['seo', 'search engine optimization', 'keyword research', 'ranking', 'organic traffic', 'serp', 'backlinks', 'site optimization']
    if any(keyword in all_text for keyword in seo_keywords):
        return 'SEO & Optimization', f"Contains SEO/optimization functionality: {[k for k in seo_keywords if k in all_text]}"
    
    # Website Builder Tools
    website_keywords = ['website builder', 'web design', 'website creation', 'landing page', 'web development', 'site builder', 'website generator']
    if any(keyword in all_text for keyword in website_keywords):
        if 'ai' in all_text or 'artificial intelligence' in all_text:
            return 'AI Website Builder', f"AI-powered website building: {[k for k in website_keywords if k in all_text]}"
        return 'Website Builder', f"Website building functionality: {[k for k in website_keywords if k in all_text]}"
    
    # Social Media Tools
    social_keywords = ['social media', 'instagram', 'facebook', 'twitter', 'linkedin', 'social content', 'social posting', 'social management', 'tiktok', 'youtube']
    if any(keyword in all_text for keyword in social_keywords):
        return 'Social Media', f"Contains social media functionality: {[k for k in social_keywords if k in all_text]}"
    
    # Content Creation Tools
    content_keywords = ['content creation', 'blog writing', 'article writing', 'copywriting', 'content generation', 'writing assistant', 'text generation', 'content strategy', 'creative writing']
    if any(keyword in all_text for keyword in content_keywords):
        return 'Content Creation', f"Contains content creation functionality: {[k for k in content_keywords if k in all_text]}"
    
    # Marketing Tools (general)
    marketing_keywords = ['marketing', 'campaign', 'advertising', 'brand', 'promotion', 'marketing automation', 'digital marketing', 'growth marketing']
    if any(keyword in all_text for keyword in marketing_keywords):
        return 'Marketing', f"Contains general marketing functionality: {[k for k in marketing_keywords if k in all_text]}"
    
    # Data Analysis Tools
    data_keywords = ['data analysis', 'analytics', 'business intelligence', 'data visualization', 'reporting', 'dashboard', 'insights', 'metrics', 'kpi']
    if any(keyword in all_text for keyword in data_keywords):
        return 'Data Analysis', f"Contains data analysis functionality: {[k for k in data_keywords if k in all_text]}"
    
    # Chat Tools
    chat_keywords = ['chatbot', 'chat assistant', 'conversational ai', 'customer support chat', 'live chat', 'chat interface', 'virtual assistant']
    if any(keyword in all_text for keyword in chat_keywords):
        return 'Chat', f"Contains chat/conversational functionality: {[k for k in chat_keywords if k in all_text]}"
    
    # Translation Tools
    translation_keywords = ['translation', 'translate', 'multilingual', 'localization', 'language conversion', 'language support']
    if any(keyword in all_text for keyword in translation_keywords):
        return 'Translation', f"Contains translation functionality: {[k for k in translation_keywords if k in all_text]}"
    
    # Finance AI Tools
    finance_keywords = ['finance', 'financial', 'accounting', 'budget', 'investment', 'money', 'expense', 'invoice', 'financial planning']
    if any(keyword in all_text for keyword in finance_keywords):
        return 'Finance AI', f"Contains financial functionality: {[k for k in finance_keywords if k in all_text]}"
    
    # Education & Research Tools
    education_keywords = ['education', 'learning', 'research', 'study', 'academic', 'knowledge', 'training', 'course', 'tutorial', 'e-learning']
    if any(keyword in all_text for keyword in education_keywords):
        return 'Education & Research', f"Contains education/research functionality: {[k for k in education_keywords if k in all_text]}"
    
    # E-commerce Tools
    ecommerce_keywords = ['ecommerce', 'e-commerce', 'online store', 'shopify', 'online selling', 'retail', 'marketplace', 'product catalog']
    if any(keyword in all_text for keyword in ecommerce_keywords):
        return 'E-commerce', f"Contains e-commerce functionality: {[k for k in ecommerce_keywords if k in all_text]}"
    
    # Self-Improvement Tools
    self_improvement_keywords = ['self-improvement', 'personal development', 'habit', 'goal setting', 'mindfulness', 'wellness', 'meditation', 'personal growth']
    if any(keyword in all_text for keyword in self_improvement_keywords):
        return 'Self-Improvement', f"Contains self-improvement functionality: {[k for k in self_improvement_keywords if k in all_text]}"
    
    # Gaming Tools
    gaming_keywords = ['gaming', 'game', 'game development', 'game design', 'esports', 'game ai']
    if any(keyword in all_text for keyword in gaming_keywords):
        return 'Gaming', f"Contains gaming functionality: {[k for k in gaming_keywords if k in all_text]}"
    
    # True Productivity Tools
    productivity_keywords = ['meeting', 'calendar', 'scheduling', 'time management', 'task management', 'note taking', 'productivity', 'time tracking', 'project management', 'todo', 'reminder', 'planning', 'organize', 'workflow', 'efficiency']
    business_keywords = ['marketing', 'sales', 'lead', 'campaign', 'crm', 'customer', 'revenue', 'conversion']
    
    if any(keyword in all_text for keyword in productivity_keywords) and not any(keyword in all_text for keyword in business_keywords):
        return 'Productivity', f"True productivity tool: {[k for k in productivity_keywords if k in all_text]}"
    
    # AI Automation (for tools that automate processes)
    automation_keywords = ['automate', 'automation', 'workflow', 'agent', 'ai agent', 'intelligent', 'smart', 'business', 'enterprise', 'team', 'collaboration', 'workspace', 'platform']
    if any(keyword in all_text for keyword in automation_keywords):
        return 'AI Automation', f"Contains automation/workflow functionality: {[k for k in automation_keywords if k in all_text]}"
    
    return 'Productivity', 'No specific category match - keeping in Productivity'

def main():
    with open('/Users/siteoptz/siteoptz/public/data/aiToolsData.json', 'r') as f:
        data = json.load(f)

    # Find all tools with Productivity category
    productivity_tools = []
    for tool in data:
        if tool.get('overview', {}).get('category') == 'Productivity' or tool.get('category') == 'Productivity':
            productivity_tools.append(tool)

    print(f"=== ANALYSIS OF {len(productivity_tools)} PRODUCTIVITY TOOLS ===\n")

    # Categorize tools
    categorized = defaultdict(list)
    
    for tool in productivity_tools:
        new_category, rationale = get_category_with_rationale(tool)
        categorized[new_category].append({
            'name': tool.get('name', 'Unknown'),
            'description': tool.get('overview', {}).get('description', 'No description')[:80] + '...',
            'rationale': rationale,
            'website': tool.get('overview', {}).get('website', 'No website')
        })

    # Display results grouped by category
    for category in sorted(categorized.keys()):
        tools = categorized[category]
        print(f"\n{category.upper()}: {len(tools)} TOOLS")
        print("=" * 60)
        
        for tool in tools:
            print(f"• {tool['name']}")
            print(f"  {tool['description']}")
            print(f"  Rationale: {tool['rationale']}")
            print()

    # Summary
    print("\n" + "=" * 80)
    print("FINAL DISTRIBUTION SUMMARY")
    print("=" * 80)
    
    total_moved = 0
    for category in sorted(categorized.keys()):
        count = len(categorized[category])
        print(f"{category}: {count} tools")
        if category != 'Productivity':
            total_moved += count
    
    print(f"\nTools moved from Productivity: {total_moved}")
    print(f"Tools remaining in Productivity: {len(categorized['Productivity'])}")
    print(f"Total tools analyzed: {sum(len(tools) for tools in categorized.values())}")

if __name__ == "__main__":
    main()