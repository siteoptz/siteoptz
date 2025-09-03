#!/bin/bash

# Script to move Final CTA sections in ReviewPage.tsx files

echo "Starting CTA section movement process..."

# List of files to process (excluding already processed ones)
files=(
"AdcreativeAiReviewPage.tsx"
"AdespressoReviewPage.tsx"
"AdobeFireflyReviewPage.tsx"
"AdsdogReviewPage.tsx"
"AdzoomaReviewPage.tsx"
"AhrefsAiReviewPage.tsx"
"AhrefsReviewPage.tsx"
"AiropsReviewPage.tsx"
"AlliaiReviewPage.tsx"
"AlphaSenseReviewPage.tsx"
)

BASE_DIR="/Users/siteoptz/siteoptz/seo-optimization/production-components"

for file in "${files[@]}"; do
    echo "Processing: $file"
    
    # Check if file exists
    if [ ! -f "$BASE_DIR/$file" ]; then
        echo "File not found: $BASE_DIR/$file"
        continue
    fi
    
    # Create backup
    cp "$BASE_DIR/$file" "$BASE_DIR/${file}.backup"
    
    # Extract the Final CTA section
    sed -n '/\/\* Final CTA Section \*\//,/^        <\/section>$/p' "$BASE_DIR/$file" > /tmp/cta_section.txt
    
    # Remove the Final CTA section from the end
    sed '/\/\* Final CTA Section \*\//,/^        <\/section>$/d' "$BASE_DIR/$file" > /tmp/temp_file.txt
    
    # Insert the CTA section after the Quick Overview section ends
    # Look for the pattern: </section> followed by {/* Main Content Sections */}
    awk '
    /^        <\/section>$/ && getline line && line ~ /^$/ && getline line && line ~ /        {\/\* Main Content Sections \*\/}/ {
        print "        </section>"
        print ""
        print "        {/* Final CTA Section */}"
        while ((getline cta_line < "/tmp/cta_section.txt") > 0) {
            if (cta_line !~ /^        {\/\* Final CTA Section \*\/}$/) {
                print cta_line
            }
        }
        print ""
        print "        {/* Main Content Sections */}"
        next
    }
    { print }
    ' /tmp/temp_file.txt > "$BASE_DIR/$file"
    
    echo "Completed: $file"
done

echo "CTA section movement process completed!"