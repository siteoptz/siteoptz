const fs = require('fs');

class ToolCategorizer {
  constructor() {
    this.dataPath = './public/data/aiToolsData.json';
    this.toolsData = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    this.stats = { 
      categorized: 0,
      created: { marketing: 0, chat: 0 },
      errors: 0
    };

    // Category mapping based on the user's requirements
    this.categoryMapping = {
      // Finance AI tools
      'Finance AI': 'Finance AI',
      'Finance': 'Finance AI',
      
      // Code Generation tools
      'Code Generation': 'Code Generation',
      
      // Video Generation tools
      'Video Generation': 'Video Generation',
      
      // Social Media tools
      'Social Media': 'Social Media',
      
      // E-Commerce tools
      'E-Commerce': 'E-commerce',
      'E-commerce': 'E-commerce',
      
      // Productivity tools
      'Productivity': 'Productivity',
      
      // Education & Research tools (standardizing naming)
      'Education & Research': 'Education & Research',
      'Research & Education': 'Education & Research',
      
      // Marketing tools (NEW CATEGORY)
      'Marketing': 'Marketing',
      'Paid Search': 'Marketing',
      'Paid Search & PPC': 'Marketing',
      
      // Chat tools (NEW CATEGORY under Development & Technology)
      'Chat': 'Chat',
      'AI Automation': 'Chat', // Many AI Automation tools are actually chat/conversation tools
      
      // Voice AI tools
      'Best Voice AI Tools': 'Voice AI',
      'Voice AI': 'Voice AI',
      
      // Content Creation
      'Content Creation': 'Content Creation',
      
      // Image Generation
      'Image Generation': 'Image Generation',
      
      // Data Analysis
      'Data Analysis': 'Data Analysis',
      
      // Customer Support
      'Customer Support': 'Customer Support',
      'AI Automation': 'Customer Support', // Some AI Automation are customer support
      
      // SEO & Optimization
      'SEO & Optimization': 'SEO & Optimization',
      
      // Sales
      'Sales': 'Sales',
      'Lead Generation': 'Sales',
      
      // Email Marketing
      'Email Marketing': 'Marketing',
      
      // Website Builder
      'Website Builder': 'Website Builder',
      'AI Website Builder': 'Website Builder',
      
      // Motion Capture
      'Motion Capture': 'Motion Capture',
      
      // Translation
      'Translation': 'Translation',
      
      // UX
      'UX': 'UX & Design',
      
      // Inspiration
      'Inspiration': 'UX & Design',
      
      // Speech-To-Text
      'Speech-To-Text': 'Voice AI',
      
      // Self-Improvement
      'Self-Improvement': 'Self-Improvement',
      
      // Music
      'Music': 'Music & Audio',
      
      // Gaming
      'Gaming': 'Gaming',
      
      // Aggregators
      'Aggregators': 'Aggregators',
      
      // AI Tools (generic)
      'AI Tools': 'AI Tools'
    };

    // Specific tool mappings based on the user's list
    this.specificToolMappings = {
      'Receiptor AI': 'Finance AI',
      'Telex': 'Code Generation',
      'Rafter': 'Code Generation',
      'Symvol': 'Video Generation',
      'Quiki.io': 'Social Media',
      'HumanLayer': 'Productivity',
      'SparkToro': 'Education & Research',
      'Cubic': 'Code Generation',
      'VibeFlow': 'Code Generation',
      'Zenor.ai': 'E-commerce',
      'Athenic AI': 'Productivity',
      'Syllaby': 'Social Media',
      'ReportCraft': 'Education & Research',
      'Archive': 'Social Media',
      'Stormy AI': 'Social Media',
      'SmythOS': 'Productivity',
      'Fast Q&A': 'Productivity',
      'Movable Type': 'Content Creation',
      'Enjo.ai': 'Productivity',
      'Memara': 'Productivity',
      'StatPecker': 'Productivity',
      'WisePPC': 'Marketing',
      'Plotaverse': 'Video Generation',
      'Macaron': 'Productivity',
      'Open Lovable': 'Code Generation',
      'Profound': 'Social Media',
      'Maskara AI': 'Education & Research',
      'IdeaBoard': 'Education & Research',
      'Tasker AI': 'Productivity',
      'WaveSpeed AI': 'Content Creation',
      'Simular Pro': 'Productivity',
      'Release0': 'Chat',
      'Copilot 3D': 'Content Creation',
      'VibeScan': 'Code Generation',
      'Ten': 'Chat',
      'ReadyScriptPro': 'Content Creation',
      'TicketMine.ai': 'Productivity',
      'KittenTTS': 'Content Creation',
      'Anything': 'Code Generation',
      'Rork': 'Code Generation',
      'Endex': 'Finance AI',
      'FlowMetr': 'Productivity',
      'Lindra AI': 'Productivity',
      'Content Maxima': 'Content Creation',
      'Tenali': 'Marketing',
      'CodeFlash AI': 'Code Generation',
      'Botric AI': 'Chat',
      'Recurse ML': 'Code Generation',
      'Amplifa': 'Marketing',
      'Aview': 'Content Creation',
      'Opal': 'Code Generation',
      'Coze Studio': 'Code Generation',
      'ContentStudio': 'Social Media',
      'Deptho': 'UX & Design',
      'Layerpath': 'Video Generation',
      'ResearchCollab.ai': 'Productivity',
      'FlyTest': 'Productivity',
      'PlexiGen AI': 'Video Generation',
      'Brandolia': 'Social Media',
      'Munch Studio': 'Social Media',
      'SchedPilot': 'Social Media',
      'Scop AI': 'Chat',
      'Memories AI': 'Video Generation',
      'Yoink': 'Productivity',
      'Redesignr.ai': 'Code Generation',
      'Mapify': 'Productivity',
      'LetzAI': 'Content Creation',
      'BrandLife': 'Marketing',
      'AutonomOps AI': 'Productivity',
      'DailyMe Journal': 'Self-Improvement',
      'Gstory.ai': 'Video Generation',
      'Engagico': 'Marketing',
      'PostingCat': 'Social Media',
      'CometAPI': 'Chat',
      'Omnisearch': 'Education & Research',
      'Intervo.ai': 'Chat',
      'Poppy AI': 'Productivity',
      'Dume.ai': 'Productivity',
      'Messync': 'Productivity',
      'Voiset': 'Productivity',
      'Mexty AI': 'Productivity',
      'InitRepo': 'Code Generation',
      'GAIO DataOS': 'Education & Research',
      'Kawara AI': 'Content Creation',
      'Blink': 'Code Generation',
      'GetDot.ai': 'Productivity',
      'Thunder Code': 'Code Generation',
      'Listening4': 'Social Media',
      'CCX.AI': 'Chat',
      'DevPlan': 'Productivity',
      'Questdash': 'Education & Research',
      'Graficai': 'Image Generation',
      'Mumble Note': 'Voice AI',
      'Gizmo Party': 'Content Creation',
      'Kiro': 'Code Generation',
      'PrompTessor': 'Content Creation',
      'Mirai': 'Productivity',
      'Ludus AI': 'Code Generation',
      'BeeSift': 'Productivity',
      'DeepDocs': 'Productivity',
      'InventAIQ': 'Education & Research',
      'PromptDC': 'Content Creation',
      'UnSoloMind': 'Productivity',
      'Forge Code': 'Code Generation',
      'Tryonora': 'Content Creation',
      'Perso.ai': 'Translation',
      'Style3D AI': 'Content Creation',
      'GetGenAI': 'Marketing',
      'Blok': 'Productivity',
      'Rendable 3D': 'Content Creation',
      'Ponder': 'Productivity',
      'Runcell.dev': 'Code Generation',
      'Mythic Text': 'Content Creation',
      'Comet by Perplexity': 'Productivity',
      'BrowserAct': 'Productivity',
      'Unrav.io': 'Productivity',
      'Lazy.so': 'Productivity',
      'MagicArena': 'Content Creation',
      'AI HomeDesign': 'UX & Design',
      'ExtractAny': 'Productivity',
      'AI inTime': 'Productivity',
      'Awaz.ai': 'Marketing',
      'Bit Flows': 'Productivity',
      'Keepmind': 'Productivity',
      'Constella': 'Productivity',
      'EchoStash': 'Content Creation',
      'Mintly': 'Marketing',
      'Gadget': 'Code Generation',
      'Chronicle': 'Productivity',
      'Distribution AI': 'Marketing',
      'Vidau.ai': 'Video Generation',
      'Rocket.new': 'Code Generation',
      'ActionFlows': 'Productivity',
      'Littlebird': 'Productivity',
      'Klarops': 'Productivity',
      'Shiplo': 'Productivity',
      'Broadn': 'Productivity',
      'Altavize': 'Productivity',
      'Groas': 'Marketing',
      'Ordemio': 'Chat',
      'Motorcut': 'Image Generation',
      'AutoLocalise': 'Translation',
      'AI Video Translator': 'Translation',
      'Magic Animator': 'Video Generation',
      'Pally': 'Productivity',
      'Notabl': 'Social Media',
      'Verbacall': 'Voice AI',
      'The Way of Code': 'Self-Improvement',
      'Viewstats': 'Social Media',
      'Sophiana': 'Social Media',
      'Decofy': 'UX & Design',
      'Pheromind': 'Code Generation',
      'Smart Calendars AI': 'Productivity',
      '11.ai': 'Content Creation',
      'Phoenix.new': 'Code Generation',
      'SuperU AI': 'Voice AI',
      'AgentDock': 'Productivity',
      'Macro': 'Productivity',
      'Xavier AI': 'Marketing',
      'Zola Analytics': 'Finance AI',
      'Dialbox': 'Productivity',
      'Drawer AI': 'Productivity',
      'FuturMotion': 'Video Generation',
      'TruPeer.ai': 'Video Generation',
      'Vozart AI': 'Music & Audio',
      'Talk Journal': 'Self-Improvement',
      'LLM Browser': 'Education & Research',
      'New.website': 'Productivity',
      'PostPlanify': 'Social Media',
      'Renude': 'Marketing',
      'PropStyle': 'Image Generation',
      'Promptve': 'Content Creation',
      'AgentPass.ai': 'Productivity',
      'Conforma': 'Video Generation',
      'IndiPen': 'Social Media',
      'Zepic': 'Marketing',
      'Myriade': 'Chat',
      'BuyerTwin': 'Marketing',
      'EasySite': 'Code Generation',
      'ModelsLab': 'Code Generation',
      'Votars': 'Productivity',
      'Bizora': 'Finance AI',
      'Cavya.ai': 'Translation',
      'Supermaker AI': 'Video Generation',
      'Aerogram': 'Productivity',
      'UnifyLabs': 'Video Generation',
      'Kuberns': 'Productivity',
      '0Cody': 'Code Generation',
      'Magic Potion': 'Content Creation',
      'CloudEagle.ai': 'Productivity',
      'VOAgents.ai': 'Voice AI',
      'Thiings': 'Content Creation',
      'SchedX': 'Marketing',
      'Hatch': 'Code Generation',
      'HandText.ai': 'Content Creation',
      'Weavy': 'Content Creation',
      'SocialAF': 'Social Media',
      'Kosmik': 'Productivity',
      'PageAI': 'Code Generation',
      'Coopa AI': 'Marketing',
      'Nimblr.ai': 'Productivity',
      'Vomyra': 'Voice AI',
      'Wuko AI': 'Education & Research',
      'PureCode.ai': 'Code Generation',
      'Skywork': 'Education & Research',
      'Rierino': 'Productivity',
      'Heynds': 'Voice AI',
      'Transmonkey': 'Translation',
      'Phonely AI': 'Voice AI',
      'AI4Data': 'Education & Research',
      'BondMCP': 'Education & Research',
      'Mindly': 'Productivity',
      'Google AI Edge': 'Code Generation',
      'Wondercraft': 'Content Creation',
      'Triviat': 'Chat',
      'GitAuto': 'Code Generation',
      'Open Paper': 'Education & Research',
      'Tapflow': 'Productivity',
      'Flux Playground': 'Content Creation',
      'Wellpin': 'Productivity',
      'Bismuth': 'Code Generation',
      'AICosts.ai': 'Finance AI',
      'NLevel.ai': 'Content Creation',
      'Rekla.ai': 'Marketing',
      'Macaly': 'Code Generation',
      'PreCallAI': 'Voice AI',
      'Kvitly': 'Marketing',
      'Caimera AI': 'Image Generation',
      'Sky': 'Productivity',
      'Monobot CX': 'Chat',
      'PubMed AI': 'Education & Research',
      'Prompt Shuttle': 'Content Creation',
      'Blaze AI': 'Marketing',
      'Plansom': 'Productivity',
      'Buildship.tools': 'Code Generation',
      'JustCall': 'Productivity',
      'Nimagna': 'Motion Capture',
      'Urbiverse': 'Productivity',
      'Reelio': 'Video Generation',
      'CodeRide': 'Code Generation',
      'Lovart': 'Content Creation',
      'TranslateVideos.io': 'Translation',
      'Illustrae': 'Content Creation',
      'AI Studios': 'Video Generation',
      'Retool': 'Code Generation',
      'URL to Any': 'Marketing',
      'Xyla AI': 'Social Media',
      'Find My Papers': 'Education & Research',
      'Miniflow': 'Productivity',
      'BrewPrompts': 'Content Creation',
      'The Librarian': 'Productivity',
      'Vercept': 'Productivity',
      'PlayMix AI': 'Gaming',
      'Panto AI': 'Code Generation',
      'Payroll Robot': 'Finance AI',
      'Papira': 'Content Creation',
      'GenSpark AI': 'Education & Research',
      '37x': 'Marketing',
      'Emergent.sh': 'Code Generation',
      'Inabit.ai': 'Productivity',
      'Foundor.ai': 'Productivity',
      'ExcelMatic': 'Productivity',
      'Victoria': 'Productivity',
      'Hera': 'Video Generation',
      'BetterStudio': 'Image Generation',
      'Metatable.ai': 'Code Generation',
      'Docci.ai': 'Productivity',
      'Vetis': 'Productivity',
      'Karax.ai': 'Productivity',
      'Databar.ai': 'Education & Research',
      'Higgsfield': 'Video Generation',
      'ChatSlide AI': 'Productivity',
      'Legion AI': 'Productivity',
      'WebCrawler API': 'Productivity',
      'Noteey': 'Productivity',
      'RetroTeam': 'Productivity',
      'Webflow\'s AI Site Builder': 'Productivity',
      'CrawlChat': 'Chat',
      'Kaiboard': 'Productivity',
      'MIDI Agent': 'Music & Audio',
      'OpenAI.fm': 'Content Creation',
      'WorkFlawless': 'Productivity',
      'AudioX': 'Music & Audio',
      'Cloudairy': 'Productivity',
      'NeuraVid': 'Video Generation',
      'Dante AI': 'Chat',
      'CRO Benchmark': 'Marketing',
      'JobQuest.ai': 'Productivity',
      'Typito': 'Video Generation',
      'Vectal': 'Productivity',
      'AI Color Match': 'Image Generation',
      'AI Renamer': 'Productivity',
      'BrandLift': 'Marketing',
      'Vaiz': 'Productivity',
      'Prose Fusion': 'Content Creation',
      'Me.bot': 'Self-Improvement',
      'Eraser IO': 'Productivity',
      'Mochii AI': 'Productivity',
      'Hostinger Horizons': 'Code Generation',
      'Currents AI': 'Education & Research',
      'TheySaid': 'Education & Research',
      'Enso': 'Productivity',
      'TableSprint': 'Code Generation',
      'VideoPlus.ai': 'Video Generation',
      'LyRuno': 'Voice AI',
      'Fellow.app': 'Productivity',
      'ReconXi': 'Productivity',
      'Excel Whisper': 'Productivity',
      'Auralis AI': 'Chat',
      'Worxmate': 'Productivity',
      'Letterly': 'Content Creation',
      'Manus AI': 'Productivity',
      'Dzine AI': 'Image Generation',
      'Curiso.ai': 'Productivity',
      'Tavus': 'Video Generation',
      'Highlight AI': 'Productivity',
      'ChatterKB': 'Chat',
      'TypeThinkAI': 'Productivity',
      'Fenn': 'Productivity',
      'Sesame': 'Chat',
      'Docsumo': 'Image Generation',
      'Pikr': 'Productivity',
      'Pig': 'Productivity',
      'Octave': 'Content Creation',
      'NaturalReader': 'Content Creation',
      'Dialoft AI': 'Marketing',
      'Kudra': 'Productivity',
      'Brandwiz': 'Marketing',
      'Screvi': 'Self-Improvement',
      'AISOAP': 'Productivity',
      'Reddibee': 'Social Media',
      'Postwhale': 'Content Creation',
      'Surf.new': 'Aggregators',
      'ScrapeGraphAI': 'Education & Research',
      'Testmyprompt': 'Content Creation',
      'GoCodeo': 'Code Generation',
      'Twin AI': 'Productivity',
      'Hoox': 'Video Generation',
      'ClickBoss AI': 'Productivity',
      'Synexa AI': 'Content Creation',
      'Diagnosis Pad': 'Education & Research',
      'VoicV': 'Voice AI',
      'Zuzia': 'Productivity',
      'Cradl AI': 'Productivity',
      'Thumbnails Labs': 'Social Media',
      'Feeedback': 'Productivity',
      'Potpie AI': 'Code Generation',
      'Kolena': 'Productivity',
      'Causaly': 'Education & Research',
      'Extruct AI': 'Education & Research',
      'TestZeus': 'Productivity',
      'Locus Extension': 'Productivity',
      'Needle AI': 'Productivity',
      'Cineocean AI': 'Content Creation',
      'Didocs.ai': 'Education & Research',
      'Proxed.AI': 'Productivity',
      'Co.dev': 'Code Generation',
      'Fiddler AI': 'Education & Research',
      'BuzzClip': 'Social Media',
      'ArchiGen': 'Content Creation',
      'Octopus.do': 'Productivity',
      'Signs': 'Self-Improvement',
      'TypeSmith': 'Marketing',
      'Presentations.ai': 'Productivity',
      'Kwizie': 'Productivity',
      'ImageTranslate.AI': 'Image Generation',
      'TopK': 'Education & Research',
      'Right Click Prompt': 'Productivity',
      'Touchbase': 'Self-Improvement',
      'Clueso': 'Productivity',
      'GenPPT': 'Productivity',
      'OneSky': 'Translation',
      'invideo': 'Video Generation',
      'ReTell.media': 'Marketing',
      'ReviewNicely': 'Productivity',
      'Platus': 'Productivity',
      'Grok 3': 'Chat',
      'Folder Pilot': 'Productivity',
      'Seede AI': 'Content Creation',
      'Bounti.ai': 'Marketing',
      'Chorus': 'Chat',
      'RPLY': 'Productivity',
      'Supametas.AI': 'Productivity',
      'Sitehunt': 'Productivity',
      'VIDUR': 'Education & Research',
      'HideMyData': 'Productivity',
      'Forvio': 'Marketing',
      'ChatGPT Exporter': 'Productivity',
      'CodeBeaver': 'Code Generation',
      'FinDaily': 'Finance AI',
      'Phedra AI': 'Content Creation',
      'WhisperTranscribe': 'Voice AI',
      'AgentVoice': 'Productivity',
      'Storyblocker': 'Productivity',
      'Pressdeck': 'Marketing',
      'A0.dev': 'Code Generation',
      'Replit iOS App': 'Productivity',
      'Serif.ai': 'Productivity',
      'Icon.me': 'Video Generation',
      'Draftly': 'Social Media',
      'CubeOne AI': 'Productivity',
      'Chat Thing': 'Chat',
      'Sonofa': 'Content Creation',
      'Tana': 'Productivity',
      'Venice AI': 'Productivity',
      'Wand AI': 'Productivity',
      'Bravo Studio': 'Productivity',
      'Modulify AI': 'Productivity',
      'Cliprun': 'Productivity',
      'Rootly': 'Productivity',
      'AptlyStar.AI': 'Chat',
      'PromptKit': 'Content Creation',
      'CTRL Sheet': 'Productivity',
      'Reap.video': 'Social Media',
      'Toolhouse': 'Productivity',
      'Baz': 'Code Generation',
      'Vogent': 'Voice AI',
      'Aftercare': 'Education & Research',
      'IdeaBuddy': 'Productivity',
      'Picjam': 'Image Generation',
      'Kodus': 'Code Generation',
      'THEO': 'Productivity',
      'YuE': 'Music & Audio',
      'Motion': 'Productivity',
      'CodeGate': 'Code Generation',
      'Unbaited': 'Social Media',
      'UnDatasIO': 'Image Generation',
      'CICube': 'Productivity',
      'Licode': 'Code Generation',
      'Ping AI Tasklist': 'Productivity',
      'Teammately': 'Productivity',
      'GetInvoice': 'Finance AI',
      'Kokoro TTS': 'Content Creation',
      'Figflow': 'Productivity',
      'Aphra': 'Productivity',
      'Saufter AI': 'Marketing',
      'Anchor Browser': 'Productivity',
      'Sourcetable': 'Productivity',
      'Pencil Sketch Generator': 'Content Creation',
      'Two Minute Reports': 'Marketing',
      'My AskAI': 'Chat',
      'Covric': 'Content Creation',
      'Qodex.ai': 'Productivity',
      'Open Interface': 'Productivity',
      'there': 'Productivity',
      'Retellio': 'Content Creation',
      'Photes.io': 'Image Generation',
      'UniScribe': 'Productivity',
      'SenseTask': 'Productivity',
      'Salesforge': 'Marketing',
      'Vinteo AI': 'Image Generation',
      'CopyCat': 'Productivity',
      'BookRead': 'Self-Improvement',
      'Bluebarry AI': 'Productivity',
      'Aimdoc': 'Marketing',
      'ProdPad': 'Productivity',
      'Hoop': 'Productivity',
      'Riffusion Fuzz': 'Music & Audio',
      'Freepik': 'Content Creation',
      'SciFocus': 'Education & Research',
      'Answerly': 'Chat',
      'AI Drive': 'Productivity',
      'TurboDoc': 'Finance AI',
      'Appointwise': 'Productivity',
      'Pika 2.1': 'Video Generation',
      'AutoReel': 'Video Generation',
      'WUI.AI': 'Social Media',
      'HeyBoss': 'Productivity',
      'TalkStack AI': 'Chat',
      'Strella': 'Education & Research',
      'Code2.AI': 'Code Generation',
      'Folk CRM': 'Productivity',
      'Witsy': 'Productivity',
      'Podpally': 'Content Creation',
      'Cotypist': 'Productivity',
      'Inbox AI': 'Productivity',
      'Olypsys': 'Image Generation',
      'Beeble AI': 'Video Generation'
    };
  }

  categorizeToolsByName() {
    let processed = 0;
    for (const tool of this.toolsData) {
      // Check if this tool has a specific mapping
      if (this.specificToolMappings[tool.name]) {
        const newCategory = this.specificToolMappings[tool.name];
        if (tool.overview && tool.overview.category !== newCategory) {
          console.log(`📝 ${tool.name}: ${tool.overview.category || 'null'} → ${newCategory}`);
          tool.overview.category = newCategory;
          processed++;
        }
      }
    }
    
    console.log(`\n✅ Processed ${processed} tools with specific mappings`);
    return processed;
  }

  createNewCategories() {
    // Track new category creations
    let marketingCount = 0;
    let chatCount = 0;
    
    for (const tool of this.toolsData) {
      if (tool.overview && tool.overview.category === 'Marketing') {
        marketingCount++;
      }
      if (tool.overview && tool.overview.category === 'Chat') {
        chatCount++;
      }
    }
    
    this.stats.created.marketing = marketingCount;
    this.stats.created.chat = chatCount;
    
    console.log(`\n📊 New Categories Created:`);
    console.log(`   Marketing: ${marketingCount} tools`);
    console.log(`   Chat: ${chatCount} tools`);
    
    return { marketing: marketingCount, chat: chatCount };
  }

  validateCategorization() {
    console.log(`\n🔍 Validation Report:`);
    
    // Count tools by category
    const categoryCounts = {};
    let nullCategories = 0;
    
    for (const tool of this.toolsData) {
      const category = tool.overview?.category;
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      } else {
        nullCategories++;
        console.log(`⚠️  Tool with null category: ${tool.name}`);
      }
    }
    
    // Sort categories by count
    const sortedCategories = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15);
    
    console.log(`\n📈 Top Categories:`);
    sortedCategories.forEach(([category, count]) => {
      console.log(`   ${category}: ${count} tools`);
    });
    
    if (nullCategories > 0) {
      console.log(`\n⚠️  ${nullCategories} tools have null categories`);
    }
    
    return { categoryCounts, nullCategories };
  }

  async run() {
    console.log('🚀 Starting comprehensive tool categorization...\n');
    
    try {
      // 1. Apply specific tool mappings
      const processed = this.categorizeToolsByName();
      
      // 2. Create and count new categories  
      this.createNewCategories();
      
      // 3. Validate the categorization
      this.validateCategorization();
      
      // 4. Save updated data
      fs.writeFileSync(this.dataPath, JSON.stringify(this.toolsData, null, 2));
      
      console.log(`\n📊 === CATEGORIZATION SUMMARY ===`);
      console.log(`📝 Tools recategorized: ${processed}`);
      console.log(`🆕 Marketing category: ${this.stats.created.marketing} tools`);
      console.log(`💬 Chat category: ${this.stats.created.chat} tools`);
      console.log(`📈 Total tools processed: ${this.toolsData.length}`);
      console.log(`❌ Errors: ${this.stats.errors}`);
      console.log(`💾 Updated aiToolsData.json`);
      
    } catch (error) {
      console.error(`❌ Categorization failed: ${error.message}`);
      this.stats.errors++;
    }
  }
}

// Run the categorizer
const categorizer = new ToolCategorizer();
categorizer.run().then(() => {
  console.log('\n🎉 Tool categorization completed!');
}).catch(error => {
  console.error('❌ Categorization failed:', error);
});