#!/usr/bin/env python3
"""
Script to convert the Google Ads API Design Document to various formats
Requires: pip install markdown pypandoc reportlab python-docx
"""

import os
import subprocess
import sys
from pathlib import Path

def install_requirements():
    """Install required packages"""
    packages = [
        'markdown',
        'pypandoc',
        'reportlab',
        'python-docx'
    ]
    
    for package in packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])

def convert_to_pdf():
    """Convert markdown to PDF using pandoc"""
    try:
        # Check if pandoc is installed
        subprocess.run(['pandoc', '--version'], capture_output=True, check=True)
        
        # Convert to PDF
        cmd = [
            'pandoc',
            'GOOGLE_ADS_API_DESIGN_DOCUMENT.md',
            '-o',
            'Google_Ads_API_Design_Document.pdf',
            '--pdf-engine=xelatex',
            '--variable', 'geometry:margin=1in',
            '--variable', 'fontsize=11pt',
            '--variable', 'documentclass=article',
            '--toc',
            '--number-sections'
        ]
        
        subprocess.run(cmd, check=True)
        print("✅ PDF created: Google_Ads_API_Design_Document.pdf")
        
    except subprocess.CalledProcessError:
        print("❌ Pandoc not found. Please install pandoc: https://pandoc.org/installing.html")
    except FileNotFoundError:
        print("❌ Pandoc not found. Please install pandoc: https://pandoc.org/installing.html")

def convert_to_docx():
    """Convert markdown to DOCX using pandoc"""
    try:
        cmd = [
            'pandoc',
            'GOOGLE_ADS_API_DESIGN_DOCUMENT.md',
            '-o',
            'Google_Ads_API_Design_Document.docx',
            '--toc',
            '--number-sections'
        ]
        
        subprocess.run(cmd, check=True)
        print("✅ DOCX created: Google_Ads_API_Design_Document.docx")
        
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Pandoc not found. Please install pandoc: https://pandoc.org/installing.html")

def convert_to_rtf():
    """Convert markdown to RTF using pandoc"""
    try:
        cmd = [
            'pandoc',
            'GOOGLE_ADS_API_DESIGN_DOCUMENT.md',
            '-o',
            'Google_Ads_API_Design_Document.rtf',
            '--toc',
            '--number-sections'
        ]
        
        subprocess.run(cmd, check=True)
        print("✅ RTF created: Google_Ads_API_Design_Document.rtf")
        
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Pandoc not found. Please install pandoc: https://pandoc.org/installing.html")

def create_html_version():
    """Create an HTML version for easy viewing"""
    import markdown
    
    with open('GOOGLE_ADS_API_DESIGN_DOCUMENT.md', 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert to HTML
    html = markdown.markdown(
        md_content, 
        extensions=['toc', 'tables', 'codehilite', 'fenced_code']
    )
    
    # Create full HTML document
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Google Ads API Design Document</title>
        <style>
            body {{ font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }}
            h1 {{ color: #1a73e8; border-bottom: 2px solid #1a73e8; padding-bottom: 10px; }}
            h2 {{ color: #34a853; margin-top: 30px; }}
            h3 {{ color: #ea4335; }}
            code {{ background-color: #f8f9fa; padding: 2px 4px; border-radius: 3px; }}
            pre {{ background-color: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }}
            table {{ border-collapse: collapse; width: 100%; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            th {{ background-color: #f2f2f2; }}
            .toc {{ background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        {html}
    </body>
    </html>
    """
    
    with open('Google_Ads_API_Design_Document.html', 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print("✅ HTML created: Google_Ads_API_Design_Document.html")

def main():
    """Main function"""
    print("🚀 Converting Google Ads API Design Document...")
    print("=" * 50)
    
    # Check if source file exists
    if not os.path.exists('GOOGLE_ADS_API_DESIGN_DOCUMENT.md'):
        print("❌ Source file not found: GOOGLE_ADS_API_DESIGN_DOCUMENT.md")
        return
    
    # Install requirements
    try:
        install_requirements()
    except Exception as e:
        print(f"❌ Error installing requirements: {e}")
        return
    
    # Create HTML version (always works)
    create_html_version()
    
    # Try to convert to other formats
    convert_to_pdf()
    convert_to_docx()
    convert_to_rtf()
    
    print("=" * 50)
    print("✅ Document conversion complete!")
    print("\nGenerated files:")
    
    files = [
        'Google_Ads_API_Design_Document.html',
        'Google_Ads_API_Design_Document.pdf',
        'Google_Ads_API_Design_Document.docx',
        'Google_Ads_API_Design_Document.rtf'
    ]
    
    for file in files:
        if os.path.exists(file):
            size = os.path.getsize(file) / 1024  # KB
            print(f"  📄 {file} ({size:.1f} KB)")
    
    print("\n📝 Note: PDF, DOCX, and RTF conversion requires pandoc.")
    print("   If those files weren't created, install pandoc from: https://pandoc.org/installing.html")

if __name__ == "__main__":
    main()
