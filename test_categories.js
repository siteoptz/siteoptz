// Test category slug generation
function getCategorySlug(category) {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-'); // Replace multiple dashes with single dash
}

function getCategoryUrl(category) {
  return `/categories/${getCategorySlug(category)}`;
}

const categories = [
  'Finance AI',
  'Image Generation', 
  'AI Automation',
  'Paid Search & PPC',
  'Best Voice AI Tools',
  'Research & Education',
  'SEO & Optimization'
];

console.log('=== Category URL Mapping ===');
categories.forEach(cat => {
  console.log(`${cat} → ${getCategoryUrl(cat)}`);
});