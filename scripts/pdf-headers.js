/**
 * PDF Headers and Footers configuration
 */

module.exports = {
  header: {
    height: "1in",
    contents: '<div style="display: flex; align-items: center; justify-content: space-between; padding: 10px;"><img src="file://' + __dirname + '/SiteOptz Ai 2.png" style="height: 40px; width: auto;" /><div style="font-size: 12px; color: #666; text-align: center; flex-grow: 1;">Enterprise AI Tools Landscape 2025</div></div>'
  },
  footer: {
    height: "0.5in", 
    contents: {
      default: '<div style="text-align: center; font-size: 12px; color: #666; padding: 10px;">Page {{page}} of {{pages}} | © 2025 SiteOptz AI Advisory</div>',
      first: '<div style="text-align: center; font-size: 12px; color: #666; padding: 10px;">© 2025 SiteOptz AI Advisory - Strategic AI Intelligence Report</div>'
    }
  }
};