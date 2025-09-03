#!/usr/bin/env python3
"""
Script to batch process the remaining ReviewPage.tsx files to move the Final CTA sections.
This script moves the Final CTA section from the bottom of each file to right after the Quick Overview section.
"""

import os
import re
import glob
from pathlib import Path

def process_file(file_path):
    """Process a single ReviewPage.tsx file to move the Final CTA section"""
    print(f"Processing: {file_path}")
    
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to find the Final CTA Section
    cta_pattern = r'        {/\* Final CTA Section \*/}\s*\n(.*?)\n        </section>'
    
    # Find the Final CTA section
    cta_match = re.search(cta_pattern, content, re.DOTALL)
    if not cta_match:
        print(f"  No Final CTA section found in {file_path}")
        return False
    
    # Extract the full CTA section
    full_cta_pattern = r'        {/\* Final CTA Section \*/}.*?</section>'
    full_cta_match = re.search(full_cta_pattern, content, re.DOTALL)
    if not full_cta_match:
        print(f"  Could not extract full CTA section from {file_path}")
        return False
    
    cta_section = full_cta_match.group(0)
    
    # Remove the CTA section from its current location
    content_without_cta = re.sub(full_cta_pattern, '', content, flags=re.DOTALL)
    
    # Find the pattern to insert after: </section> followed by {/* Main Content Sections */}
    insert_pattern = r'(        </section>\s*\n\s*{/\* Main Content Sections \*/})'
    
    # Insert the CTA section after the Quick Overview section
    replacement = f'        </section>\n\n{cta_section}\n\n        {{/* Main Content Sections */}}'
    new_content = re.sub(insert_pattern, replacement, content_without_cta)
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✓ Successfully processed {file_path}")
    return True

def main():
    """Main function to process all remaining files"""
    base_dir = "/Users/siteoptz/siteoptz/seo-optimization/production-components"
    
    # Files already processed (update this list as needed)
    processed_files = {
        "AcquisioReviewPage.tsx",
        "AdalysisReviewPage.tsx", 
        "AdbeatReviewPage.tsx",
        "AdcreativeAiReviewPage.tsx",
        "ChatgptReviewPage.tsx",
        "AhrefsReviewPage.tsx"
    }
    
    # Get all ReviewPage.tsx files
    pattern = os.path.join(base_dir, "*ReviewPage.tsx")
    all_files = glob.glob(pattern)
    
    # Filter out already processed files
    remaining_files = [f for f in all_files if Path(f).name not in processed_files]
    
    print(f"Found {len(remaining_files)} files to process...")
    
    success_count = 0
    failed_files = []
    
    for file_path in remaining_files:
        try:
            if process_file(file_path):
                success_count += 1
            else:
                failed_files.append(file_path)
        except Exception as e:
            print(f"  ❌ Error processing {file_path}: {str(e)}")
            failed_files.append(file_path)
    
    print(f"\n=== SUMMARY ===")
    print(f"Total files processed: {len(remaining_files)}")
    print(f"Successful: {success_count}")
    print(f"Failed: {len(failed_files)}")
    
    if failed_files:
        print(f"\nFailed files:")
        for file_path in failed_files:
            print(f"  - {Path(file_path).name}")

if __name__ == "__main__":
    main()