module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},86518,e=>{"use strict";var t=e.i(26747),r=e.i(90406),d=e.i(44898),o=e.i(62950);async function i(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{email:r,firstName:d="",company:o="",teamSize:i="",useCase:n="",timeline:l="",tools:p="",source:c="unknown",timestamp:u}=e.body;if(!r)return t.status(400).json({error:"Email is required"});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return t.status(400).json({error:"Invalid email format"});let m={email:r.toLowerCase().trim(),firstName:d.trim(),company:o.trim(),teamSize:i,useCase:n,timeline:l,tools:p,source:c,timestamp:u||new Date().toISOString(),ip:e.headers["x-forwarded-for"]||e.connection.remoteAddress,userAgent:e.headers["user-agent"]};console.log("Email submission received:",{email:m.email,source:m.source,tools:m.tools}),await s(m),await a(m),t.status(200).json({success:!0,message:"Subscription successful"})}catch(e){console.error("Email submission error:",e),t.status(500).json({error:"Internal server error",message:"Failed to process submission"})}}async function s(e){let t=process.env.MAILCHIMP_API_KEY,r=process.env.MAILCHIMP_AUDIENCE_ID,d=process.env.MAILCHIMP_SERVER;if(!t||!r)return void console.warn("Mailchimp credentials not configured");try{let o=await fetch(`https://${d}.api.mailchimp.com/3.0/lists/${r}/members`,{method:"POST",headers:{Authorization:`Basic ${Buffer.from(`anystring:${t}`).toString("base64")}`,"Content-Type":"application/json"},body:JSON.stringify({email_address:e.email,status:"subscribed",merge_fields:{FNAME:e.firstName,COMPANY:e.company,TEAMSIZE:e.teamSize,USECASE:e.useCase,TIMELINE:e.timeline,TOOLS:e.tools},tags:["ai-tool-comparison",`source-${e.source}`,e.useCase?`usecase-${e.useCase}`:"",e.teamSize?`team-${e.teamSize}`:""].filter(Boolean)})});if(!o.ok){let e=await o.json();throw Error(`Mailchimp error: ${e.detail||o.statusText}`)}console.log("Successfully added to Mailchimp:",e.email)}catch(e){console.error("Mailchimp integration error:",e)}}async function a(e){try{if(process.env.SENDGRID_API_KEY){var t;let r=(()=>{let e=Error("Cannot find module '@sendgrid/mail'");throw e.code="MODULE_NOT_FOUND",e})();r.setApiKey(process.env.SENDGRID_API_KEY);let d={to:process.env.NOTIFICATION_EMAIL||"team@siteoptz.ai",from:process.env.FROM_EMAIL||"noreply@siteoptz.ai",subject:"New AI Tool Comparison Request",html:(t=e,`
    <h2>New AI Tool Comparison Request</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Email:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Name:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.firstName||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Company:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.company||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Team Size:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.teamSize||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Use Case:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.useCase||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timeline:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.timeline||"Not provided"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Tools:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.tools||"Not specified"}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Source:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${t.source}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timestamp:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${new Date(t.timestamp).toLocaleString()}</td>
      </tr>
    </table>
  `)};await r.send(d),console.log("Notification email sent")}}catch(e){console.error("Notification email error:",e)}}e.s(["default",()=>i],31417);var n=e.i(31417),l=e.i(7031),p=e.i(81927),c=e.i(46432);let u=(0,o.hoist)(n,"default"),m=(0,o.hoist)(n,"config"),g=new d.PagesAPIRouteModule({definition:{kind:r.RouteKind.PAGES_API,page:"/api/subscribe",pathname:"/api/subscribe",bundlePath:"",filename:""},userland:n,distDir:".next",relativeProjectDir:""});async function b(e,r,d){g.isDev&&(0,c.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let o="/api/subscribe";o=o.replace(/\/index$/,"")||"/";let i=await g.prepare(e,r,{srcPage:o});if(!i){r.statusCode=400,r.end("Bad Request"),null==d.waitUntil||d.waitUntil.call(d,Promise.resolve());return}let{query:s,params:a,prerenderManifest:n,routerServerContext:u}=i;try{let t=e.method||"GET",d=(0,l.getTracer)(),i=d.getActiveScopeSpan(),c=g.instrumentationOnRequestError.bind(g),m=async i=>g.render(e,r,{query:{...s,...a},params:a,allowedRevalidateHeaderKeys:[],multiZoneDraftMode:!1,trustHostHeader:!1,previewProps:n.preview,propagateError:!1,dev:g.isDev,page:"/api/subscribe",internalRevalidate:null==u?void 0:u.revalidate,onError:(...t)=>c(e,...t)}).finally(()=>{if(!i)return;i.setAttributes({"http.status_code":r.statusCode,"next.rsc":!1});let e=d.getRootSpanAttributes();if(!e)return;if(e.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${e.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=e.get("next.route");if(s){let e=`${t} ${s}`;i.setAttributes({"next.route":s,"http.route":s,"next.span_name":e}),i.updateName(e)}else i.updateName(`${t} ${o}`)});i?await m(i):await d.withPropagatedContext(e.headers,()=>d.trace(p.BaseServerSpan.handleRequest,{spanName:`${t} ${o}`,kind:l.SpanKind.SERVER,attributes:{"http.method":t,"http.target":e.url}},m))}catch(e){if(g.isDev)throw e;(0,t.sendError)(r,500,"Internal Server Error")}finally{null==d.waitUntil||d.waitUntil.call(d,Promise.resolve())}}e.s(["config",0,m,"default",0,u,"handler",()=>b],86518)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f8d1d0d._.js.map