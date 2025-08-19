/**
 * PDF Headers and Footers configuration
 */

module.exports = {
  header: {
    height: "0.5in",
    contents: '<div style="text-align: center; font-size: 12px; color: #666; padding: 10px;">Enterprise AI Tools Landscape 2025</div>'
  },
  footer: {
    height: "0.5in", 
    contents: {
      default: '<div style="text-align: center; font-size: 12px; color: #666; padding: 10px;">Page {{page}} of {{pages}} | © 2025 SiteOptz</div>',
      first: '<div style="text-align: center; font-size: 12px; color: #666; padding: 10px;">© 2025 SiteOptz - Strategic AI Intelligence Report</div>'
    }
  }
};