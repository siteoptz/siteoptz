import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface DiscordDiscussionButtonProps {
  toolName: string;
  toolCategory?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'inline';
}

const DiscordDiscussionButton: React.FC<DiscordDiscussionButtonProps> = ({
  toolName,
  toolCategory,
  className = '',
  variant = 'default'
}) => {
  const getDiscordChannel = (category?: string) => {
    if (!category) return 'general-chat';
    
    const channelMap: { [key: string]: string } = {
      'Content Creation': 'chatgpt-claude-discussion',
      'Image Generation': 'image-generation-tools',
      'Productivity': 'productivity-ai-tools',
      'Code Generation': 'coding-ai-tools',
      'Marketing': 'marketing-ai-tools',
      'SEO & Optimization': 'marketing-ai-tools',
      'Social Media': 'marketing-ai-tools',
      'Email Marketing': 'marketing-ai-tools',
      'Data Analysis': 'productivity-ai-tools',
      'Voice AI': 'chatgpt-claude-discussion',
      'Video Generation': 'image-generation-tools',
      'AI Automation': 'productivity-ai-tools',
      'E-commerce': 'marketing-ai-tools',
      'Finance AI': 'productivity-ai-tools',
      'Health AI': 'productivity-ai-tools',
      'Education': 'productivity-ai-tools',
      'Research': 'productivity-ai-tools'
    };
    
    return channelMap[category] || 'general-chat';
  };

  const channel = getDiscordChannel(toolCategory);
  const discordUrl = `https://discord.gg/WZqvUF39`;
  
  const handleClick = () => {
    // Track Discord discussion click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'discord_discussion_click', {
        event_category: 'community',
        event_label: toolName,
        tool_category: toolCategory,
        discord_channel: channel
      });
    }
  };

  if (variant === 'compact') {
    return (
      <a
        href={discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center space-x-2 px-3 py-2 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-600/30 hover:border-blue-600/50 transition-all duration-200 ${className}`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>Discuss on Discord</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors ${className}`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>Join Discord discussion</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return (
    <a
      href={discordUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <div className="text-left">
        <div className="text-sm font-medium">Discuss {toolName}</div>
        <div className="text-xs opacity-90">Join 500+ AI professionals</div>
      </div>
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

export default DiscordDiscussionButton;
