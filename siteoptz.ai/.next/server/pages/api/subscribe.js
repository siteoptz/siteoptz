"use strict";(()=>{var e={};e.id=761,e.ids=[761],e.modules={2139:e=>{e.exports=require("@sendgrid/mail")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},4718:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,d){return d in t?t[d]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,d)):"function"==typeof t&&"default"===d?t:void 0}}})},6784:(e,t,d)=>{d.r(t),d.d(t,{config:()=>c,default:()=>p,routeModule:()=>m});var o={};d.r(o),d.d(o,{default:()=>a});var r=d(9762),i=d(6059),s=d(4718);async function a(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{email:d,firstName:o="",company:r="",teamSize:i="",useCase:s="",timeline:a="",tools:p="",source:c="unknown",timestamp:m}=e.body;if(!d)return t.status(400).json({error:"Email is required"});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d))return t.status(400).json({error:"Invalid email format"});let u={email:d.toLowerCase().trim(),firstName:o.trim(),company:r.trim(),teamSize:i,useCase:s,timeline:a,tools:p,source:c,timestamp:m||new Date().toISOString(),ip:e.headers["x-forwarded-for"]||e.connection.remoteAddress,userAgent:e.headers["user-agent"]};console.log("Email submission received:",{email:u.email,source:u.source,tools:u.tools}),await n(u),await l(u),t.status(200).json({success:!0,message:"Subscription successful"})}catch(e){console.error("Email submission error:",e),t.status(500).json({error:"Internal server error",message:"Failed to process submission"})}}async function n(e){let t=process.env.MAILCHIMP_API_KEY,d=process.env.MAILCHIMP_AUDIENCE_ID,o=process.env.MAILCHIMP_SERVER;if(!t||!d){console.warn("Mailchimp credentials not configured");return}try{let r=await fetch(`https://${o}.api.mailchimp.com/3.0/lists/${d}/members`,{method:"POST",headers:{Authorization:`Basic ${Buffer.from(`anystring:${t}`).toString("base64")}`,"Content-Type":"application/json"},body:JSON.stringify({email_address:e.email,status:"subscribed",merge_fields:{FNAME:e.firstName,COMPANY:e.company,TEAMSIZE:e.teamSize,USECASE:e.useCase,TIMELINE:e.timeline,TOOLS:e.tools},tags:["ai-tool-comparison",`source-${e.source}`,e.useCase?`usecase-${e.useCase}`:"",e.teamSize?`team-${e.teamSize}`:""].filter(Boolean)})});if(!r.ok){let e=await r.json();throw Error(`Mailchimp error: ${e.detail||r.statusText}`)}console.log("Successfully added to Mailchimp:",e.email)}catch(e){console.error("Mailchimp integration error:",e)}}async function l(e){try{if(process.env.SENDGRID_API_KEY){let t=d(2139);t.setApiKey(process.env.SENDGRID_API_KEY);let o={to:process.env.NOTIFICATION_EMAIL||"team@siteoptz.ai",from:process.env.FROM_EMAIL||"noreply@siteoptz.ai",subject:"New AI Tool Comparison Request",html:`
    <h2>New AI Tool Comparison Request</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Email:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Name:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.firstName||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Company:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.company||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Team Size:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.teamSize||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Use Case:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.useCase||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timeline:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.timeline||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Tools:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.tools||"Not specified"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Source:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${e.source}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timestamp:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${new Date(e.timestamp).toLocaleString()}</td>
      </tr>
    </table>
  `};await t.send(o),console.log("Notification email sent")}}catch(e){console.error("Notification email error:",e)}}let p=(0,s.l)(o,"default"),c=(0,s.l)(o,"config"),m=new r.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/subscribe",pathname:"/api/subscribe",bundlePath:"",filename:""},userland:o})},6059:(e,t)=>{var d;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return d}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(d||(d={}))},9762:(e,t,d)=>{e.exports=d(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var d=t(t.s=6784);module.exports=d})();