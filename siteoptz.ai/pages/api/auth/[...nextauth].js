// COMPLETELY DISABLE NextAuth and OAuth - Use email/password only
export default function handler(req, res) {
  // Block ALL NextAuth routes - no OAuth, no Google login
  console.log('BLOCKED NextAuth/OAuth route:', req.url);
  
  // Always redirect to the simple email/password login
  // This is what works on localhost:3000
  return res.redirect(302, '/#login');
}