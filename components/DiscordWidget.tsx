import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Wifi, ArrowRight } from 'lucide-react';

interface DiscordWidgetProps {
  className?: string;
  compact?: boolean;
}

const DiscordWidget: React.FC<DiscordWidgetProps> = ({ 
  className = '', 
  compact = false 
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);

  // Simulate Discord API data (replace with actual Discord API integration)
  useEffect(() => {
    // Mock data - replace with actual Discord API calls
    setMemberCount(500);
    setOnlineCount(45);
    setIsOnline(true);
  }, []);

  if (compact) {
    return (
      <div className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Discord Community</h4>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-400">{onlineCount} online</span>
              </div>
            </div>
          </div>
        </div>
        
        <a
          href="https://discord.gg/WZqvUF39"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg font-medium text-sm text-center block hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Join Now
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">SiteOptz AI Community</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-400">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-white">{memberCount}</span>
          </div>
          <div className="text-sm text-gray-400">Total Members</div>
        </div>
        <div className="bg-black/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Wifi className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-2xl font-bold text-white">{onlineCount}</span>
          </div>
          <div className="text-sm text-gray-400">Online Now</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {[
            { user: "Sarah M.", action: "shared a new AI tool", time: "2m ago" },
            { user: "Mike R.", action: "asked about ChatGPT integration", time: "5m ago" },
            { user: "Alex K.", action: "posted a workflow showcase", time: "8m ago" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-300">
                  <span className="text-white font-medium">{activity.user}</span> {activity.action}
                </span>
              </div>
              <span className="text-gray-500 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Join Button */}
      <a
        href="https://discord.gg/siteoptz"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-center block hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Join Discord Community</span>
        <ArrowRight className="w-4 h-4" />
      </a>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Connect with 500+ AI professionals and get instant help
        </p>
      </div>
    </div>
  );
};

export default DiscordWidget;
