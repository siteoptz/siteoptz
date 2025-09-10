#!/bin/bash

# Update all review pages to use dark theme backgrounds

FILES=(
  "pages/reviews/character-ai.tsx"
  "pages/reviews/gemini-2-5.tsx"
  "pages/reviews/gpt-4.tsx"
  "pages/reviews/hugging-face.tsx"
  "pages/reviews/midjourney-v6.tsx"
  "pages/reviews/otter-ai.tsx"
  "pages/reviews/planable.tsx"
  "pages/reviews/replicate.tsx"
)

for file in "${FILES[@]}"; do
  echo "Updating $file..."
  
  # Replace light backgrounds with dark theme
  sed -i '' 's/bg-gray-50/bg-gradient-to-br from-black via-gray-900 to-black/g' "$file"
  sed -i '' 's/bg-white rounded-lg shadow-sm/bg-black border border-gray-800 rounded-lg/g' "$file"
  sed -i '' 's/bg-white text-blue-600/bg-gradient-to-r from-blue-600 to-purple-600 text-white/g' "$file"
  sed -i '' 's/hover:bg-blue-50/hover:from-blue-700 hover:to-purple-700/g' "$file"
  sed -i '' 's/text-gray-900/text-white/g' "$file"
  sed -i '' 's/text-gray-800/text-gray-200/g' "$file"
  sed -i '' 's/text-gray-700/text-gray-300/g' "$file"
  sed -i '' 's/text-gray-600/text-gray-400/g' "$file"
  sed -i '' 's/border-gray-200/border-gray-800/g' "$file"
  sed -i '' 's/border-gray-300/border-gray-700/g' "$file"
done

echo "All review pages updated with dark theme!"