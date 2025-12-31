import React, { useState } from 'react';
import { Send, Sparkles, Code, Wand2, Bot, ImageIcon } from 'lucide-react';

interface AIPlaygroundProps {
  level?: 'explorer' | 'builder' | 'creator' | 'innovator';
}

export default function AIPlayground({ level = 'explorer' }: AIPlaygroundProps) {
  const [activeTab, setActiveTab] = useState('story');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tools = [
    {
      id: 'story',
      name: 'Story Generator',
      icon: <Bot className="w-5 h-5" />,
      description: 'Create amazing stories with AI',
      placeholder: 'Write about a brave robot who...',
      available: true,
    },
    {
      id: 'image',
      name: 'Image Creator',
      icon: <ImageIcon className="w-5 h-5" />,
      description: 'Generate cool images',
      placeholder: 'A friendly dragon in a magical forest',
      available: level !== 'explorer',
    },
    {
      id: 'code',
      name: 'Code Helper',
      icon: <Code className="w-5 h-5" />,
      description: 'Get help with coding',
      placeholder: 'How do I make a button in HTML?',
      available: level === 'creator' || level === 'innovator',
    },
    {
      id: 'chat',
      name: 'AI Buddy',
      icon: <Wand2 className="w-5 h-5" />,
      description: 'Chat with your AI friend',
      placeholder: 'Tell me a joke about computers!',
      available: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput('');

    // Simulate AI response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000));

    const responses = {
      story: `Once upon a time, ${input.toLowerCase()}. The brave hero discovered that with great power comes great responsibility. They used their coding skills to help everyone in the kingdom learn about AI and technology. The end!`,
      image: `🎨 Creating an amazing image of "${input}"... \n\n(In the real app, this would generate an actual image!)`,
      code: `Great question! Here's a simple way to ${input.toLowerCase()}:\n\n<button>Click me!</button>\n\nThis creates a basic button. You can add colors and actions to make it more fun!`,
      chat: `That's awesome! Here's what I think: ${input} sounds really cool! Did you know that AI can help you build all sorts of amazing things? What would you like to create next?`,
    };

    setOutput(responses[activeTab as keyof typeof responses] || "That's interesting! Tell me more!");
    setIsLoading(false);
  };

  const currentTool = tools.find(tool => tool.id === activeTab);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI Playground</h2>
        </div>
        <p className="opacity-90">
          Experiment with AI tools in a safe, fun environment! 
          {level === 'explorer' && ' (Some tools unlock as you level up!)'}
        </p>
      </div>

      <div className="p-6">
        {/* Tool Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => tool.available && setActiveTab(tool.id)}
              disabled={!tool.available}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition
                ${tool.available 
                  ? `cursor-pointer ${activeTab === tool.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                    }`
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {tool.icon}
              {tool.name}
              {!tool.available && '🔒'}
            </button>
          ))}
        </div>

        {/* Current Tool Info */}
        {currentTool && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              {currentTool.icon}
              <h3 className="font-bold text-gray-900">{currentTool.name}</h3>
            </div>
            <p className="text-gray-600">{currentTool.description}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="ai-input" className="block text-sm font-bold text-gray-700 mb-2">
              Your Prompt:
            </label>
            <textarea
              id="ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentTool?.placeholder || 'What would you like to create?'}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !currentTool?.available}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Try It!
              </>
            )}
          </button>
        </form>

        {/* Output */}
        {(output || isLoading) && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">AI Response:</h3>
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">AI is thinking...</p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-gray-700 bg-white p-4 rounded border">
                {output}
              </div>
            )}
          </div>
        )}

        {/* Level Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Currently at: <span className="font-semibold capitalize">{level}</span> Level
            {level === 'explorer' && ' • Complete tutorials to unlock more tools!'}
          </p>
        </div>
      </div>
    </div>
  );
}