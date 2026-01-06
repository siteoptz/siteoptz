import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import SafetyBadge from '../../../components/kids/SafetyBadge';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface BotPersonality {
  id: string;
  name: string;
  emoji: string;
  description: string;
  greeting: string;
  traits: string[];
  responseStyle: string;
}

interface ChatbotConfig {
  id: string;
  name: string;
  personality: BotPersonality;
  knowledge: string[];
  rules: string[];
  isActive: boolean;
  createdAt: Date;
  totalChats: number;
}

export default function KidsAIChatbotBuilder() {
  const { data: session } = useSession();
  const userTier = session?.user ? 'parent-pro' : 'free';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [selectedPersonality, setSelectedPersonality] = useState<string>('');
  const [botName, setBotName] = useState<string>('');
  const [botKnowledge, setBotKnowledge] = useState<string[]>([]);
  const [newKnowledge, setNewKnowledge] = useState<string>('');
  const [customRules, setCustomRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState<string>('');
  const [currentChatbot, setCurrentChatbot] = useState<ChatbotConfig | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [savedChatbots, setSavedChatbots] = useState<ChatbotConfig[]>([]);
  const [activeTab, setActiveTab] = useState<'build' | 'test' | 'gallery'>('build');

  // Predefined personality templates
  const personalities: BotPersonality[] = [
    {
      id: 'friend',
      name: 'Friendly Helper',
      emoji: '😊',
      description: 'A kind, encouraging friend who loves to chat and help with homework',
      greeting: "Hi there! I'm so excited to meet you! What would you like to talk about today?",
      traits: ['Encouraging', 'Patient', 'Curious', 'Helpful'],
      responseStyle: 'Warm and supportive, always positive'
    },
    {
      id: 'teacher',
      name: 'Smart Teacher',
      emoji: '👨‍🏫',
      description: 'A wise teacher who explains things clearly and makes learning fun',
      greeting: "Hello, my eager student! I'm here to help you learn amazing new things. What subject interests you today?",
      traits: ['Knowledgeable', 'Clear', 'Educational', 'Inspiring'],
      responseStyle: 'Educational but fun, breaks down complex topics'
    },
    {
      id: 'comedian',
      name: 'Funny Friend',
      emoji: '😄',
      description: 'A silly, joke-loving companion who makes everything more fun',
      greeting: "Hey there, comedy lover! Ready for some laughs? I've got a million jokes to share!",
      traits: ['Humorous', 'Playful', 'Creative', 'Entertaining'],
      responseStyle: 'Witty and playful, includes age-appropriate jokes'
    },
    {
      id: 'adventurer',
      name: 'Adventure Guide',
      emoji: '🗺️',
      description: 'An explorer who loves stories about adventures and discoveries',
      greeting: "Greetings, fellow adventurer! Ready to explore amazing places and hear incredible stories?",
      traits: ['Adventurous', 'Brave', 'Storytelling', 'Imaginative'],
      responseStyle: 'Exciting and descriptive, tells great stories'
    },
    {
      id: 'scientist',
      name: 'Science Buddy',
      emoji: '🔬',
      description: 'A curious scientist who loves experiments and discovering how things work',
      greeting: "Hello, future scientist! Want to explore the fascinating world of science together?",
      traits: ['Curious', 'Logical', 'Experimental', 'Factual'],
      responseStyle: 'Scientific but accessible, explains phenomena clearly'
    },
    {
      id: 'artist',
      name: 'Creative Artist',
      emoji: '🎨',
      description: 'An artistic soul who inspires creativity and loves all forms of art',
      greeting: "Welcome, creative spirit! Let's explore the wonderful world of art and creativity together!",
      traits: ['Creative', 'Inspiring', 'Artistic', 'Expressive'],
      responseStyle: 'Inspiring and creative, encourages artistic expression'
    }
  ];

  // Predefined knowledge topics
  const knowledgeTopics = [
    'Math and Numbers', 'Science and Nature', 'History and Geography', 
    'Art and Creativity', 'Sports and Fitness', 'Animals and Pets',
    'Space and Astronomy', 'Music and Instruments', 'Cooking and Food',
    'Technology and Computers', 'Books and Stories', 'Games and Puzzles'
  ];

  // Safety rules that are always included
  const defaultSafetyRules = [
    'Always be kind and respectful',
    'Never share personal information',
    'Encourage learning and curiosity',
    'Use age-appropriate language',
    'Promote positive values'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createChatbot = () => {
    if (!selectedPersonality || !botName.trim()) {
      alert('Please choose a personality and give your chatbot a name!');
      return;
    }

    if (userTier === 'free' && savedChatbots.length >= 2) {
      const upgrade = confirm('You can only create 2 chatbots with the free plan. Upgrade to create unlimited chatbots?');
      if (upgrade) {
        window.open('/kids-ai/pricing', '_blank');
      }
      return;
    }

    const personality = personalities.find(p => p.id === selectedPersonality)!;
    const newChatbot: ChatbotConfig = {
      id: `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: botName,
      personality,
      knowledge: botKnowledge,
      rules: [...defaultSafetyRules, ...customRules],
      isActive: true,
      createdAt: new Date(),
      totalChats: 0
    };

    setSavedChatbots(prev => [newChatbot, ...prev]);
    setCurrentChatbot(newChatbot);
    setMessages([]);
    setActiveTab('test');

    // Send initial greeting
    const greetingMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: personality.greeting,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([greetingMessage]);

    // Reset form
    setBotName('');
    setSelectedPersonality('');
    setBotKnowledge([]);
    setCustomRules([]);
  };

  const addKnowledge = () => {
    if (newKnowledge.trim() && botKnowledge.length < 10) {
      setBotKnowledge(prev => [...prev, newKnowledge.trim()]);
      setNewKnowledge('');
    }
  };

  const removeKnowledge = (index: number) => {
    setBotKnowledge(prev => prev.filter((_, i) => i !== index));
  };

  const addRule = () => {
    if (newRule.trim() && customRules.length < 5) {
      setCustomRules(prev => [...prev, newRule.trim()]);
      setNewRule('');
    }
  };

  const removeRule = (index: number) => {
    setCustomRules(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentChatbot) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate bot response (mock AI)
    const botResponse = generateBotResponse(inputMessage, currentChatbot);
    const botMessage: ChatMessage = {
      id: `msg_${Date.now()}_bot`,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    // Update chat count
    setSavedChatbots(prev => prev.map(bot => 
      bot.id === currentChatbot.id 
        ? { ...bot, totalChats: bot.totalChats + 1 }
        : bot
    ));
  };

  const generateBotResponse = (userInput: string, chatbot: ChatbotConfig): string => {
    const { personality, knowledge } = chatbot;
    const input = userInput.toLowerCase();

    // Knowledge-based responses
    const relevantKnowledge = knowledge.find(topic => 
      input.includes(topic.toLowerCase()) || 
      topic.toLowerCase().includes(input.split(' ')[0])
    );

    // Personality-based response templates
    const responseTemplates = {
      friend: [
        "That's so interesting! I love talking about this with you.",
        "You're asking such great questions! Here's what I think...",
        "I'm excited to help you with this! Let me share something cool...",
      ],
      teacher: [
        "Excellent question! Let me explain this step by step...",
        "That's a wonderful topic to explore! Here's what's fascinating about it...",
        "Great thinking! This reminds me of an important concept...",
      ],
      comedian: [
        "Haha, you know what's funny about that? Let me tell you...",
        "Oh, I have the perfect joke about this! But first, let me help...",
        "You're cracking me up! Speaking of which, here's what I know...",
      ],
      adventurer: [
        "What an adventure this question takes us on! Let me tell you about...",
        "This reminds me of an amazing discovery I heard about...",
        "Hold onto your hat! This is going to be an exciting journey through...",
      ],
      scientist: [
        "Fascinating! From a scientific perspective, here's what we know...",
        "That's a great observation! Scientists have discovered that...",
        "Let's investigate this together! The evidence shows...",
      ],
      artist: [
        "What a creative question! This inspires me to think about...",
        "Art and creativity are everywhere in this topic! Let me share...",
        "Your curiosity is like a beautiful painting - it shows...",
      ]
    };

    const templates = responseTemplates[personality.id as keyof typeof responseTemplates] || responseTemplates.friend;
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Simple knowledge matching (in real app, this would use AI)
    if (relevantKnowledge) {
      return `${template} ${relevantKnowledge} is such a fascinating topic! I'd love to explore it with you. What specifically would you like to know?`;
    }

    // General responses based on input keywords
    if (input.includes('hello') || input.includes('hi')) {
      return `${personality.greeting.split('!')[0]}! Great to chat with you again!`;
    }
    
    if (input.includes('joke') || input.includes('funny')) {
      return "Here's a kid-friendly joke for you: Why don't scientists trust atoms? Because they make up everything! 😄 What else can I help you with?";
    }
    
    if (input.includes('help') || input.includes('how')) {
      return `${template} I'm here to help you learn and explore! Based on what I know about ${knowledge.join(', ')}, I think this connects to some really cool ideas. What would you like to discover?`;
    }

    // Default response
    return `${template} That's a really thoughtful thing to say! I love our conversations. Based on my knowledge of ${knowledge.slice(0, 2).join(' and ')}, I think there's so much we could explore together. What interests you most?`;
  };

  const loadChatbot = (chatbot: ChatbotConfig) => {
    setCurrentChatbot(chatbot);
    setMessages([{
      id: `msg_${Date.now()}`,
      text: chatbot.personality.greeting,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setActiveTab('test');
  };

  return (
    <>
      <SEOHead
        title="AI Chatbot Builder for Kids | Create Smart Bots | siteoptz.ai"
        description="Kids build their own AI chatbots with different personalities! Learn conversational AI, prompt engineering, and create interactive chat experiences safely."
        canonicalUrl="https://siteoptz.ai/kids-ai/projects/chatbot-builder"
        keywords={['kids chatbot builder', 'AI conversation for kids', 'chatbot programming children', 'safe AI chatbots', 'educational chatbot creation']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Chatbot Builder
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Build your own <strong>smart chatbots</strong> with different personalities! Learn how AI conversations work 
              by creating bots that can chat, teach, tell jokes, and more.
            </p>
            
            {/* Trust Signals */}
            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black border border-gray-800 rounded-lg p-1 flex">
              {[
                { id: 'build', name: 'Build Bot', icon: '🔧' },
                { id: 'test', name: 'Test Chat', icon: '💬' },
                { id: 'gallery', name: 'My Bots', icon: '🤖' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Build Tab */}
          {activeTab === 'build' && (
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Builder Panel */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>🔧</span>
                  Build Your Chatbot
                </h2>

                {/* Bot Name */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Give your chatbot a name:
                  </label>
                  <input
                    type="text"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="e.g., Helper Bot, Science Buddy, Story Friend..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    maxLength={30}
                  />
                </div>

                {/* Personality Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Choose a personality:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {personalities.map(personality => (
                      <button
                        key={personality.id}
                        onClick={() => setSelectedPersonality(personality.id)}
                        className={`
                          flex items-start gap-3 p-3 rounded-lg transition-all duration-200 text-left
                          ${selectedPersonality === personality.id
                            ? 'bg-blue-600 text-white border-2 border-blue-400'
                            : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
                          }
                        `}
                      >
                        <span className="text-2xl">{personality.emoji}</span>
                        <div>
                          <div className="font-medium text-sm">{personality.name}</div>
                          <div className="text-xs opacity-80">{personality.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Knowledge Topics */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    What should your bot know about? (Choose up to 10)
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {knowledgeTopics.map(topic => (
                      <button
                        key={topic}
                        onClick={() => {
                          if (botKnowledge.includes(topic)) {
                            setBotKnowledge(prev => prev.filter(k => k !== topic));
                          } else if (botKnowledge.length < 10) {
                            setBotKnowledge(prev => [...prev, topic]);
                          }
                        }}
                        className={`
                          text-xs p-2 rounded-lg transition-all duration-200
                          ${botKnowledge.includes(topic)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }
                        `}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Knowledge */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newKnowledge}
                      onChange={(e) => setNewKnowledge(e.target.value)}
                      placeholder="Add custom knowledge..."
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      maxLength={50}
                      onKeyDown={(e) => e.key === 'Enter' && addKnowledge()}
                    />
                    <button
                      onClick={addKnowledge}
                      disabled={!newKnowledge.trim() || botKnowledge.length >= 10}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>

                  {/* Selected Knowledge Tags */}
                  {botKnowledge.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {botKnowledge.map((knowledge, index) => (
                        <span
                          key={index}
                          className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs flex items-center gap-2"
                        >
                          {knowledge}
                          <button
                            onClick={() => removeKnowledge(index)}
                            className="text-green-300 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Rules for Premium Users */}
                {userTier !== 'free' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Custom conversation rules (up to 5):
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                        placeholder="e.g., Always ask follow-up questions..."
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        maxLength={100}
                        onKeyDown={(e) => e.key === 'Enter' && addRule()}
                      />
                      <button
                        onClick={addRule}
                        disabled={!newRule.trim() || customRules.length >= 5}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>

                    {/* Custom Rules Tags */}
                    {customRules.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {customRules.map((rule, index) => (
                          <span
                            key={index}
                            className="bg-purple-900 text-purple-300 px-2 py-1 rounded text-xs flex items-center gap-2"
                          >
                            {rule}
                            <button
                              onClick={() => removeRule(index)}
                              className="text-purple-300 hover:text-white"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Create Button */}
                <button
                  onClick={createChatbot}
                  disabled={!selectedPersonality || !botName.trim()}
                  className={`
                    w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                    ${(!selectedPersonality || !botName.trim())
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transform hover:scale-105'
                    }
                  `}
                >
                  🤖 Create My Chatbot!
                </button>

                {/* Usage Counter for Free Users */}
                {userTier === 'free' && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Chatbots Created:</span>
                      <span className="text-white font-bold">{savedChatbots.length}/2</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(savedChatbots.length / 2) * 100}%` }}
                      ></div>
                    </div>
                    {savedChatbots.length >= 2 && (
                      <p className="text-yellow-400 text-xs mt-2">
                        🔒 Upgrade to create unlimited chatbots!
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Preview Panel */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>👁️</span>
                  Bot Preview
                </h2>

                {selectedPersonality && botName ? (
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{personalities.find(p => p.id === selectedPersonality)?.emoji}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white">{botName}</h3>
                          <p className="text-gray-400 text-sm">{personalities.find(p => p.id === selectedPersonality)?.name}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {personalities.find(p => p.id === selectedPersonality)?.description}
                      </p>
                    </div>

                    <div className="bg-blue-900 rounded-lg p-3">
                      <p className="text-blue-200 text-sm font-medium">Sample Greeting:</p>
                      <p className="text-white text-sm mt-1">
                        &quot;{personalities.find(p => p.id === selectedPersonality)?.greeting}&quot;
                      </p>
                    </div>

                    {botKnowledge.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Knowledge Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {botKnowledge.slice(0, 5).map((knowledge, idx) => (
                            <span key={idx} className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs">
                              {knowledge}
                            </span>
                          ))}
                          {botKnowledge.length > 5 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{botKnowledge.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-gray-400 text-sm mb-2">Safety Features:</p>
                      <div className="space-y-1">
                        {defaultSafetyRules.slice(0, 3).map((rule, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="text-green-400">✓</span>
                            {rule}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Your Bot Preview</h3>
                    <p className="text-gray-300 mb-6">
                      Choose a personality and name to see your chatbot come to life!
                    </p>
                    
                    <div className="bg-gray-800 rounded-lg p-4 text-left">
                      <h4 className="text-sm font-bold text-blue-400 mb-2">🧠 What You&apos;ll Learn:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• How AI chatbots understand and respond</li>
                        <li>• Creating different AI personalities</li>
                        <li>• Conversation design and flow</li>
                        <li>• Teaching AI systems new knowledge</li>
                        <li>• Building safe AI interactions</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Test Tab */}
          {activeTab === 'test' && (
            <div className="max-w-4xl mx-auto mb-16">
              {currentChatbot ? (
                <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gray-800 p-4 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{currentChatbot.personality.emoji}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{currentChatbot.name}</h3>
                        <p className="text-gray-400 text-sm">{currentChatbot.personality.name} • {currentChatbot.totalChats} chats</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        disabled={isTyping}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-black border border-gray-800 rounded-xl">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Chat?</h3>
                  <p className="text-gray-300 mb-6">
                    Create a chatbot first or load an existing one to start chatting!
                  </p>
                  <button
                    onClick={() => setActiveTab('build')}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
                  >
                    🔧 Build Your First Bot
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">🤖 Your Chatbot Collection</h2>
              
              {savedChatbots.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedChatbots.map(chatbot => (
                    <div
                      key={chatbot.id}
                      className="bg-black border border-gray-800 rounded-xl p-6 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{chatbot.personality.emoji}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white">{chatbot.name}</h3>
                          <p className="text-gray-400 text-sm">{chatbot.personality.name}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{chatbot.personality.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Chats:</span>
                          <span className="text-white font-bold">{chatbot.totalChats}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Knowledge Areas:</span>
                          <span className="text-white font-bold">{chatbot.knowledge.length}</span>
                        </div>
                        
                        <button
                          onClick={() => loadChatbot(chatbot)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                        >
                          💬 Start Chatting
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Chatbots Yet</h3>
                  <p className="text-gray-300 mb-6">
                    Create your first chatbot to see it appear here!
                  </p>
                  <button
                    onClick={() => setActiveTab('build')}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
                  >
                    🔧 Build My First Bot
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🧠 How Chatbots Work</h2>
              <p className="text-xl opacity-90">
                Discover the amazing technology behind AI conversations!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">👂</div>
                <h3 className="text-lg font-bold mb-2">1. Listen & Understand</h3>
                <p className="text-sm opacity-80">
                  Your chatbot reads your message and understands what you&apos;re asking about.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-lg font-bold mb-2">2. Think & Process</h3>
                <p className="text-sm opacity-80">
                  Using its personality and knowledge, it thinks about the best way to respond.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-lg font-bold mb-2">3. Respond & Learn</h3>
                <p className="text-sm opacity-80">
                  Your bot shares a helpful, friendly response that matches its personality!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/kids-ai/safety"
                className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🛡️ Learn About Safe AI Conversations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}