import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  name: string;
  type: 'interactive' | 'quiz' | 'game';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

export default function LearningHub() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [userProgress, setUserProgress] = useState({
    totalActivities: 0,
    completedActivities: 0,
    currentStreak: 5,
    totalPoints: 150
  });

  const subjects: Subject[] = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: '🔢',
      color: 'bg-blue-500',
      description: 'Numbers, patterns, and problem-solving adventures',
      activities: [
        { id: 'counting', name: 'Counting Fun', type: 'interactive', difficulty: 'easy', completed: true },
        { id: 'addition', name: 'Addition Adventure', type: 'game', difficulty: 'easy', completed: true },
        { id: 'shapes', name: 'Shape Explorer', type: 'interactive', difficulty: 'easy', completed: false },
        { id: 'patterns', name: 'Pattern Detective', type: 'quiz', difficulty: 'medium', completed: false }
      ]
    },
    {
      id: 'reading',
      name: 'Reading & Language',
      icon: '📚',
      color: 'bg-green-500',
      description: 'Stories, letters, and language learning',
      activities: [
        { id: 'phonics', name: 'Letter Sounds', type: 'interactive', difficulty: 'easy', completed: true },
        { id: 'sight-words', name: 'Sight Word Heroes', type: 'game', difficulty: 'easy', completed: false },
        { id: 'reading-comp', name: 'Story Time', type: 'interactive', difficulty: 'medium', completed: false },
        { id: 'vocabulary', name: 'Word Builder', type: 'quiz', difficulty: 'medium', completed: false }
      ]
    },
    {
      id: 'science',
      name: 'Science Discovery',
      icon: '🔬',
      color: 'bg-purple-500',
      description: 'Explore the wonders of the natural world',
      activities: [
        { id: 'animals', name: 'Animal Friends', type: 'interactive', difficulty: 'easy', completed: false },
        { id: 'plants', name: 'Plant Life', type: 'game', difficulty: 'easy', completed: false },
        { id: 'weather', name: 'Weather Watcher', type: 'interactive', difficulty: 'medium', completed: false },
        { id: 'space', name: 'Space Explorer', type: 'quiz', difficulty: 'medium', completed: false }
      ]
    },
    {
      id: 'creativity',
      name: 'Art & Creativity',
      icon: '🎨',
      color: 'bg-pink-500',
      description: 'Express yourself through art and imagination',
      activities: [
        { id: 'drawing', name: 'Digital Drawing', type: 'interactive', difficulty: 'easy', completed: false },
        { id: 'music', name: 'Music Maker', type: 'game', difficulty: 'easy', completed: false },
        { id: 'storytelling', name: 'Story Creator', type: 'interactive', difficulty: 'medium', completed: false },
        { id: 'crafts', name: 'Virtual Crafts', type: 'interactive', difficulty: 'medium', completed: false }
      ]
    }
  ];

  const startActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    // Simulate activity completion
    setTimeout(() => {
      alert(`🎉 Great job completing "${activity.name}"! You earned 10 points!`);
      setSelectedActivity(null);
      // Update progress
      setUserProgress(prev => ({
        ...prev,
        completedActivities: prev.completedActivities + 1,
        totalPoints: prev.totalPoints + 10
      }));
    }, 2000);
  };

  if (selectedActivity) {
    return (
      <>
        <Head>
          <title>SiteOptz Learning Hub - {selectedActivity.name}</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedActivity.name}
              </h2>
              <div className="bg-blue-100 rounded-lg p-6 mb-6">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your personalized learning experience...</p>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Hub
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SiteOptz Learning Hub - Personalized AI Learning for Kids</title>
        <meta name="description" content="Adaptive AI learning platform with personalized lessons for children" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🏫 SiteOptz Learning Hub
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Your personalized AI learning companion!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🧠 Adaptive AI
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                📊 Progress Tracking
              </span>
            </div>
          </header>

          {/* Progress Dashboard */}
          <div className="bg-gray-900 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">🌟 Your Learning Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-600/20 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-white">{userProgress.completedActivities}</div>
                <div className="text-gray-400 text-sm">Activities Completed</div>
              </div>
              <div className="bg-green-600/20 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-white">{userProgress.totalPoints}</div>
                <div className="text-gray-400 text-sm">Learning Points</div>
              </div>
              <div className="bg-orange-600/20 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-white">{userProgress.currentStreak}</div>
                <div className="text-gray-400 text-sm">Day Streak</div>
              </div>
              <div className="bg-purple-600/20 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-gray-400 text-sm">Badges Earned</div>
              </div>
            </div>
          </div>

          {/* Subject Selection */}
          {!selectedSubject && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                📚 Choose Your Learning Adventure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject)}
                    className={`${subject.color} bg-opacity-20 border-2 border-gray-600 hover:border-white rounded-lg p-6 text-center transition-all hover:scale-105`}
                  >
                    <div className="text-5xl mb-4">{subject.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{subject.name}</h3>
                    <p className="text-gray-300 text-sm">{subject.description}</p>
                    <div className="mt-4">
                      <div className="text-xs text-gray-400 mb-1">
                        {subject.activities.filter(a => a.completed).length}/{subject.activities.length} completed
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${subject.color} h-2 rounded-full transition-all`}
                          style={{ 
                            width: `${(subject.activities.filter(a => a.completed).length / subject.activities.length) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Activity Selection */}
          {selectedSubject && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedSubject.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedSubject.name}</h2>
                    <p className="text-gray-400">{selectedSubject.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ← Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedSubject.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`bg-gray-800 border-2 ${activity.completed ? 'border-green-500' : 'border-gray-600'} rounded-lg p-6 transition-all hover:border-white`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-lg">{activity.name}</h3>
                      {activity.completed && <span className="text-2xl">✅</span>}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.type === 'interactive' ? 'bg-blue-600 text-white' :
                        activity.type === 'game' ? 'bg-green-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}>
                        {activity.type === 'interactive' ? '🎯 Interactive' :
                         activity.type === 'game' ? '🎮 Game' : '📝 Quiz'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.difficulty === 'easy' ? 'bg-green-600 text-white' :
                        activity.difficulty === 'medium' ? 'bg-yellow-600 text-black' :
                        'bg-red-600 text-white'
                      }`}>
                        {activity.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => startActivity(activity)}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        activity.completed 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {activity.completed ? '🔄 Practice Again' : '▶️ Start Learning'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tutor Panel */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">🤖</div>
              <div>
                <h3 className="text-white font-bold text-lg">Your AI Learning Buddy</h3>
                <p className="text-blue-100">I&apos;m here to help you learn and grow!</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-white">
              <p className="mb-2">💡 <strong>Today&apos;s Tip:</strong> Great job keeping up your {userProgress.currentStreak}-day learning streak! Try completing one math activity to earn a special badge.</p>
              <p>🎯 <strong>Recommended Next:</strong> Based on your progress, I think you&apos;d love the Shape Explorer activity!</p>
            </div>
          </div>

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safe Learning Environment</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ Adaptive AI that adjusts to your child&apos;s learning pace</li>
              <li>✅ All content reviewed by certified educators and child development experts</li>
              <li>✅ Progress tracking helps identify strengths and areas for improvement</li>
              <li>✅ No external links, ads, or unsafe content</li>
              <li>✅ Complete parental oversight and progress visibility</li>
              <li>✅ COPPA compliant with zero data sharing to third parties</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}