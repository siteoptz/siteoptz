import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Experiment {
  id: string;
  title: string;
  category: 'physics' | 'chemistry' | 'biology' | 'earth-science';
  difficulty: 'elementary' | 'middle' | 'advanced';
  description: string;
  materials: string[];
  steps: ExperimentStep[];
  hypothesis: string;
  conclusion: string;
  safetyNotes: string[];
}

interface ExperimentStep {
  id: number;
  instruction: string;
  observation: string;
  visual: string;
  completed: boolean;
}

export default function ScienceLab() {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userHypothesis, setUserHypothesis] = useState<string>('');
  const [userObservations, setUserObservations] = useState<string[]>([]);
  const [experimentPhase, setExperimentPhase] = useState<'setup' | 'hypothesis' | 'experiment' | 'conclusion'>('setup');
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);

  const experiments: Experiment[] = [
    {
      id: 'volcano-eruption',
      title: 'Volcano Eruption',
      category: 'chemistry',
      difficulty: 'elementary',
      description: 'Create a safe volcano eruption using baking soda and vinegar',
      materials: ['Baking soda', 'White vinegar', 'Food coloring', 'Dish soap', 'Small bottle', 'Funnel'],
      hypothesis: 'When acid (vinegar) mixes with base (baking soda), it creates a chemical reaction that produces gas',
      conclusion: 'The reaction between acid and base creates carbon dioxide gas, which causes the eruption effect',
      safetyNotes: ['Adult supervision required', 'Wear safety goggles', 'Do experiment outside or in sink', 'Wash hands after experiment'],
      steps: [
        {
          id: 1,
          instruction: 'Place the bottle in the center of your workspace',
          observation: 'The bottle is our volcano container',
          visual: '🍾',
          completed: false
        },
        {
          id: 2,
          instruction: 'Add 2 tablespoons of baking soda to the bottle',
          observation: 'White powder at the bottom of the bottle',
          visual: '🥄',
          completed: false
        },
        {
          id: 3,
          instruction: 'Add a few drops of food coloring',
          observation: 'The baking soda now has color',
          visual: '💧',
          completed: false
        },
        {
          id: 4,
          instruction: 'Add a drop of dish soap',
          observation: 'This will make our eruption foamy',
          visual: '🧴',
          completed: false
        },
        {
          id: 5,
          instruction: 'Quickly pour 1/4 cup of vinegar into the bottle',
          observation: 'Watch the chemical reaction create an eruption!',
          visual: '🌋',
          completed: false
        }
      ]
    },
    {
      id: 'rainbow-density',
      title: 'Rainbow Density Tower',
      category: 'physics',
      difficulty: 'elementary',
      description: 'Create a colorful tower using liquids of different densities',
      materials: ['Honey', 'Corn syrup', 'Dish soap', 'Water', 'Vegetable oil', 'Tall clear container', 'Food coloring'],
      hypothesis: 'Liquids with different densities will layer on top of each other without mixing',
      conclusion: 'Density determines how liquids stack - denser liquids sink below less dense liquids',
      safetyNotes: ['Adult help with pouring', 'Clean up spills immediately', 'Do not drink the liquids'],
      steps: [
        {
          id: 1,
          instruction: 'Pour honey slowly into the bottom of the container',
          observation: 'Honey forms the bottom layer',
          visual: '🍯',
          completed: false
        },
        {
          id: 2,
          instruction: 'Slowly pour corn syrup over a spoon to create the next layer',
          observation: 'Corn syrup floats on top of honey',
          visual: '🥄',
          completed: false
        },
        {
          id: 3,
          instruction: 'Add colored dish soap as the third layer',
          observation: 'Soap creates a distinct layer',
          visual: '🧴',
          completed: false
        },
        {
          id: 4,
          instruction: 'Pour colored water gently over a spoon',
          observation: 'Water forms a layer above the soap',
          visual: '💧',
          completed: false
        },
        {
          id: 5,
          instruction: 'Finally, add vegetable oil as the top layer',
          observation: 'Oil floats on top of all other liquids',
          visual: '🛢️',
          completed: false
        }
      ]
    },
    {
      id: 'plant-growth',
      title: 'Plant Growth Experiment',
      category: 'biology',
      difficulty: 'middle',
      description: 'Investigate how different conditions affect plant growth',
      materials: ['Bean seeds', 'Small pots', 'Soil', 'Water', 'Labels', 'Ruler', 'Journal'],
      hypothesis: 'Plants need light, water, and nutrients to grow properly',
      conclusion: 'Plants require optimal conditions of light, water, and nutrients for healthy growth',
      safetyNotes: ['Wash hands after handling soil', 'Use clean tools', 'Don\'t overwater plants'],
      steps: [
        {
          id: 1,
          instruction: 'Plant seeds in 4 different pots with soil',
          observation: 'All seeds are planted at the same depth',
          visual: '🌱',
          completed: false
        },
        {
          id: 2,
          instruction: 'Label pots: Normal, No Light, No Water, Extra Water',
          observation: 'Each pot will test a different variable',
          visual: '🏷️',
          completed: false
        },
        {
          id: 3,
          instruction: 'Place pots in their designated conditions',
          observation: 'Normal pot gets light and regular water',
          visual: '☀️',
          completed: false
        },
        {
          id: 4,
          instruction: 'Measure and record plant growth daily for 2 weeks',
          observation: 'Different conditions produce different growth rates',
          visual: '📏',
          completed: false
        },
        {
          id: 5,
          instruction: 'Compare final results and draw conclusions',
          observation: 'Normal conditions produce the healthiest plant',
          visual: '📊',
          completed: false
        }
      ]
    },
    {
      id: 'water-cycle',
      title: 'Water Cycle in a Bag',
      category: 'earth-science',
      difficulty: 'elementary',
      description: 'Observe the water cycle in action using a simple closed system',
      materials: ['Clear plastic bag', 'Water', 'Blue food coloring', 'Tape', 'Sunny window'],
      hypothesis: 'Water will evaporate, condense, and precipitate in a closed system',
      conclusion: 'The water cycle continuously moves water through evaporation, condensation, and precipitation',
      safetyNotes: ['Secure bag properly', 'Check for leaks', 'Place in safe location'],
      steps: [
        {
          id: 1,
          instruction: 'Add blue colored water to the plastic bag',
          observation: 'Water represents our ocean/lake',
          visual: '💧',
          completed: false
        },
        {
          id: 2,
          instruction: 'Seal the bag tightly, leaving some air inside',
          observation: 'This creates our closed atmosphere',
          visual: '🎈',
          completed: false
        },
        {
          id: 3,
          instruction: 'Tape the bag to a sunny window',
          observation: 'Sunlight provides energy for the water cycle',
          visual: '☀️',
          completed: false
        },
        {
          id: 4,
          instruction: 'Observe water droplets forming on the bag walls',
          observation: 'Evaporation and condensation in action!',
          visual: '💨',
          completed: false
        },
        {
          id: 5,
          instruction: 'Watch droplets fall back down (precipitation)',
          observation: 'Complete water cycle in miniature!',
          visual: '🌧️',
          completed: false
        }
      ]
    },
    {
      id: 'magnet-experiment',
      title: 'Magnetic Field Exploration',
      category: 'physics',
      difficulty: 'middle',
      description: 'Explore magnetic fields and test different materials',
      materials: ['Bar magnet', 'Iron filings', 'Paper', 'Various small objects', 'Compass'],
      hypothesis: 'Magnets create invisible fields that affect magnetic materials',
      conclusion: 'Magnetic fields extend around magnets and only affect ferromagnetic materials',
      safetyNotes: ['Handle magnets carefully', 'Keep away from electronics', 'Supervise iron filings'],
      steps: [
        {
          id: 1,
          instruction: 'Place paper over the bar magnet',
          observation: 'Paper allows us to see the magnetic field pattern',
          visual: '📄',
          completed: false
        },
        {
          id: 2,
          instruction: 'Sprinkle iron filings on the paper',
          observation: 'Filings reveal the invisible magnetic field lines',
          visual: '🧲',
          completed: false
        },
        {
          id: 3,
          instruction: 'Test various objects with the magnet',
          observation: 'Only certain materials are attracted',
          visual: '🔍',
          completed: false
        },
        {
          id: 4,
          instruction: 'Use compass to detect magnetic field direction',
          observation: 'Compass needle points toward magnetic north',
          visual: '🧭',
          completed: false
        },
        {
          id: 5,
          instruction: 'Record which materials are magnetic',
          observation: 'Iron, nickel, and steel are magnetic',
          visual: '📝',
          completed: false
        }
      ]
    }
  ];

  const categories = [
    { id: 'physics', name: 'Physics', icon: '⚗️', description: 'Forces, motion, and energy' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', description: 'Chemical reactions and mixtures' },
    { id: 'biology', name: 'Biology', icon: '🔬', description: 'Living things and life processes' },
    { id: 'earth-science', name: 'Earth Science', icon: '🌍', description: 'Weather, geology, and environment' }
  ];

  const startExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setCurrentStep(0);
    setUserHypothesis('');
    setUserObservations([]);
    setExperimentPhase('setup');
  };

  const nextStep = () => {
    if (!selectedExperiment) return;
    
    if (currentStep < selectedExperiment.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setExperimentPhase('conclusion');
    }
  };

  const completeStep = () => {
    if (!selectedExperiment) return;
    
    const updatedSteps = [...selectedExperiment.steps];
    updatedSteps[currentStep].completed = true;
    setSelectedExperiment({ ...selectedExperiment, steps: updatedSteps });
    
    // Add observation
    const observation = `Step ${currentStep + 1}: ${updatedSteps[currentStep].observation}`;
    setUserObservations(prev => [...prev, observation]);
  };

  const finishExperiment = () => {
    if (!selectedExperiment) return;
    
    setCompletedExperiments(prev => [...new Set([...prev, selectedExperiment.id])]);
    alert('🎉 Excellent scientific work! You\'ve completed the experiment and learned about the scientific method!');
    
    setSelectedExperiment(null);
    setExperimentPhase('setup');
  };

  return (
    <>
      <Head>
        <title>SiteOptz Science Lab - Safe Virtual Science Experiments</title>
        <meta name="description" content="Conduct safe virtual science experiments and learn the scientific method" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🔬 SiteOptz Science Lab
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Explore the wonders of science through safe virtual experiments!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                ⚗️ Virtual Lab
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🔬 Scientific Method
              </span>
            </div>

            {/* Progress */}
            <div className="bg-gray-900 rounded-lg p-4 inline-block">
              <div className="flex items-center gap-4 text-white">
                <span>🧪 Completed Experiments: {completedExperiments.length}/{experiments.length}</span>
                <span>⭐ Scientist Level: {Math.floor(completedExperiments.length / 2) + 1}</span>
              </div>
            </div>
          </header>

          {/* Categories */}
          {!selectedExperiment && (
            <div className="bg-gray-900 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🧬 Science Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 text-center hover:border-green-400 transition-all"
                  >
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                    <div className="text-gray-300 text-sm">
                      {experiments.filter(exp => exp.category === category.id).length} experiments
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiment Selection */}
          {!selectedExperiment && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                ⚗️ Choose Your Experiment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiments.map((experiment) => (
                  <button
                    key={experiment.id}
                    onClick={() => startExperiment(experiment)}
                    className="bg-gray-800 border-2 border-gray-600 hover:border-green-400 rounded-lg p-6 text-left transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-lg">{experiment.title}</h3>
                      {completedExperiments.includes(experiment.id) && (
                        <span className="text-green-400 text-2xl">✅</span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{experiment.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        experiment.difficulty === 'elementary' ? 'bg-green-600 text-white' :
                        experiment.difficulty === 'middle' ? 'bg-yellow-600 text-black' :
                        'bg-red-600 text-white'
                      }`}>
                        {experiment.difficulty}
                      </span>
                      <span className="text-gray-500 text-xs capitalize">{experiment.category.replace('-', ' ')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Experiment */}
          {selectedExperiment && (
            <div className="space-y-6">
              {/* Experiment Header */}
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedExperiment.title}</h2>
                    <p className="text-gray-400">{selectedExperiment.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedExperiment(null)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    ← Back to Lab
                  </button>
                </div>

                {/* Phase Indicator */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-4">
                    {['setup', 'hypothesis', 'experiment', 'conclusion'].map((phase, index) => (
                      <React.Fragment key={phase}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          experimentPhase === phase
                            ? 'bg-green-500 text-white'
                            : index < ['setup', 'hypothesis', 'experiment', 'conclusion'].indexOf(experimentPhase)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        {index < 3 && <div className={`w-12 h-1 ${
                          index < ['setup', 'hypothesis', 'experiment', 'conclusion'].indexOf(experimentPhase)
                            ? 'bg-blue-500'
                            : 'bg-gray-600'
                        }`} />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="text-center text-gray-400 mb-6">
                  Phase: {experimentPhase.charAt(0).toUpperCase() + experimentPhase.slice(1)}
                </div>
              </div>

              {/* Setup Phase */}
              {experimentPhase === 'setup' && (
                <div className="bg-gray-900 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">🧪 Experiment Setup</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">📋 Materials Needed:</h4>
                      <ul className="space-y-2">
                        {selectedExperiment.materials.map((material, index) => (
                          <li key={index} className="text-gray-300 flex items-center">
                            <span className="text-green-400 mr-2">✓</span>
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">⚠️ Safety Notes:</h4>
                      <ul className="space-y-2">
                        {selectedExperiment.safetyNotes.map((note, index) => (
                          <li key={index} className="text-yellow-300 flex items-center">
                            <span className="text-yellow-400 mr-2">⚠️</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => setExperimentPhase('hypothesis')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                    >
                      Ready to Begin! →
                    </button>
                  </div>
                </div>
              )}

              {/* Hypothesis Phase */}
              {experimentPhase === 'hypothesis' && (
                <div className="bg-gray-900 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">🤔 Make Your Hypothesis</h3>
                  
                  <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-6 mb-6">
                    <h4 className="text-blue-400 font-semibold mb-3">💡 What is a hypothesis?</h4>
                    <p className="text-white">
                      A hypothesis is your prediction about what will happen in the experiment and why. 
                      It&apos;s your scientific guess based on what you already know!
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">What do you think will happen?</h4>
                    <textarea
                      value={userHypothesis}
                      onChange={(e) => setUserHypothesis(e.target.value)}
                      placeholder="I think that... because..."
                      className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="bg-purple-600/10 border border-purple-600 rounded-lg p-6 mb-6">
                    <h4 className="text-purple-400 font-semibold mb-3">🧠 Scientific Hypothesis:</h4>
                    <p className="text-white">{selectedExperiment.hypothesis}</p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setExperimentPhase('experiment')}
                      disabled={!userHypothesis.trim()}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Experiment! →
                    </button>
                  </div>
                </div>
              )}

              {/* Experiment Phase */}
              {experimentPhase === 'experiment' && (
                <div className="bg-gray-900 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    ⚗️ Step {currentStep + 1} of {selectedExperiment.steps.length}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-6 mb-6">
                        <h4 className="text-blue-400 font-semibold mb-3">📋 Instructions:</h4>
                        <p className="text-white text-lg">{selectedExperiment.steps[currentStep].instruction}</p>
                      </div>
                      
                      <div className="bg-green-600/10 border border-green-600 rounded-lg p-6">
                        <h4 className="text-green-400 font-semibold mb-3">👀 What to Observe:</h4>
                        <p className="text-white">{selectedExperiment.steps[currentStep].observation}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="bg-gray-800 rounded-lg p-8 mb-6">
                        <div className="text-8xl mb-4">{selectedExperiment.steps[currentStep].visual}</div>
                        <p className="text-gray-400">Virtual Experiment View</p>
                      </div>
                      
                      {!selectedExperiment.steps[currentStep].completed ? (
                        <button
                          onClick={completeStep}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all mr-4"
                        >
                          ✅ Step Completed
                        </button>
                      ) : (
                        <button
                          onClick={nextStep}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
                        >
                          {currentStep === selectedExperiment.steps.length - 1 ? 'View Results →' : 'Next Step →'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Observations */}
                  {userObservations.length > 0 && (
                    <div className="mt-8 bg-yellow-600/10 border border-yellow-600 rounded-lg p-6">
                      <h4 className="text-yellow-400 font-semibold mb-3">📝 Your Observations:</h4>
                      <ul className="space-y-2">
                        {userObservations.map((observation, index) => (
                          <li key={index} className="text-yellow-200">{observation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Conclusion Phase */}
              {experimentPhase === 'conclusion' && (
                <div className="bg-gray-900 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">🎉 Experiment Complete!</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-6">
                      <h4 className="text-blue-400 font-semibold mb-3">🤔 Your Hypothesis:</h4>
                      <p className="text-white">{userHypothesis}</p>
                    </div>

                    <div className="bg-green-600/10 border border-green-600 rounded-lg p-6">
                      <h4 className="text-green-400 font-semibold mb-3">🔬 Scientific Conclusion:</h4>
                      <p className="text-white">{selectedExperiment.conclusion}</p>
                    </div>

                    <div className="bg-purple-600/10 border border-purple-600 rounded-lg p-6">
                      <h4 className="text-purple-400 font-semibold mb-3">📊 What We Learned:</h4>
                      <ul className="text-white space-y-2">
                        <li>• We followed the scientific method: hypothesis, experiment, observation, conclusion</li>
                        <li>• We made careful observations during each step</li>
                        <li>• We compared our hypothesis with the actual results</li>
                        <li>• Science helps us understand how the world works!</li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={finishExperiment}
                      className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all"
                    >
                      🏆 Complete Experiment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mad Scientist Character */}
          <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">👨‍🔬</div>
              <div>
                <h3 className="text-white font-bold text-xl">Dr. Science says:</h3>
                <p className="text-green-100">Great scientific thinking, young scientist!</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-white">
              <p className="mb-2">🔬 <strong>Science Tip:</strong> The best scientists ask lots of questions and make careful observations!</p>
              <p>⚗️ <strong>Lab Challenge:</strong> Complete all experiments to earn your Master Scientist badge!</p>
            </div>
          </div>

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safe Virtual Laboratory</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ All experiments are virtual simulations - completely safe for children</li>
              <li>✅ Real-world safety notes included for educational purposes</li>
              <li>✅ Teaches proper scientific method and observation skills</li>
              <li>✅ Age-appropriate content designed by science educators</li>
              <li>✅ Encourages scientific curiosity and critical thinking</li>
              <li>✅ No dangerous materials or chemicals involved</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}