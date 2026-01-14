import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ArtStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#FF6B6B');
  const [tool, setTool] = useState<'brush' | 'eraser' | 'fill'>('brush');
  const [showColorPalette, setShowColorPalette] = useState(false);

  const safeColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
    '#F1948A', '#85C1E9', '#D2B4DE', '#F9E79F', '#A3E4D7',
    '#FFB6C1', '#87CEEB', '#DDA0DD', '#F0E68C', '#90EE90'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas background to white
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `my-artwork-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const addShape = (shape: 'circle' | 'square' | 'triangle' | 'star') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 50;

    ctx.fillStyle = brushColor;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 3;

    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX - size, centerY + size);
        ctx.lineTo(centerX + size, centerY + size);
        ctx.closePath();
        ctx.fill();
        break;
      case 'star':
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5;
          const radius = i % 2 === 0 ? size : size / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
    }
  };

  return (
    <>
      <Head>
        <title>SiteOptz Art Studio - Safe Digital Art Creation for Kids</title>
        <meta name="description" content="Create beautiful digital artwork with our safe, child-friendly art studio" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🎨 SiteOptz Art Studio
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Create amazing digital artwork in our safe studio!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🏠 White-Label
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                💾 Local Storage
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tools Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 space-y-6">
                <h3 className="text-white font-semibold mb-4">🛠️ Tools</h3>
                
                {/* Drawing Tools */}
                <div>
                  <h4 className="text-gray-300 text-sm mb-3">Drawing Tools</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTool('brush')}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        tool === 'brush'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      🖌️ Brush
                    </button>
                    <button
                      onClick={() => setTool('eraser')}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        tool === 'eraser'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      🧹 Eraser
                    </button>
                  </div>
                </div>

                {/* Brush Size */}
                <div>
                  <h4 className="text-gray-300 text-sm mb-3">Brush Size: {brushSize}px</h4>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-gray-300 text-sm mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {safeColors.slice(0, 12).map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setBrushColor(color)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          brushColor === color ? 'border-white scale-110' : 'border-gray-600 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setShowColorPalette(!showColorPalette)}
                    className="w-full bg-gray-800 text-gray-300 p-2 rounded-lg hover:bg-gray-700"
                  >
                    {showColorPalette ? 'Hide' : 'Show'} More Colors
                  </button>
                  {showColorPalette && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {safeColors.slice(12).map((color, index) => (
                        <button
                          key={index + 12}
                          onClick={() => setBrushColor(color)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all ${
                            brushColor === color ? 'border-white scale-110' : 'border-gray-600 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Shapes */}
                <div>
                  <h4 className="text-gray-300 text-sm mb-3">Shapes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addShape('circle')}
                      className="bg-gray-800 text-gray-300 p-3 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      ⭕ Circle
                    </button>
                    <button
                      onClick={() => addShape('square')}
                      className="bg-gray-800 text-gray-300 p-3 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      ⬜ Square
                    </button>
                    <button
                      onClick={() => addShape('triangle')}
                      className="bg-gray-800 text-gray-300 p-3 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      🔺 Triangle
                    </button>
                    <button
                      onClick={() => addShape('star')}
                      className="bg-gray-800 text-gray-300 p-3 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      ⭐ Star
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-gray-300 text-sm mb-3">Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={clearCanvas}
                      className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all"
                    >
                      🗑️ Clear Canvas
                    </button>
                    <button
                      onClick={downloadArt}
                      className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all"
                    >
                      💾 Save Artwork
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="border border-gray-300 rounded-lg cursor-crosshair w-full"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              
              {/* Canvas Info */}
              <div className="mt-4 bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <span className="text-gray-400">Current Tool:</span> {tool === 'brush' ? '🖌️ Brush' : '🧹 Eraser'}
                  </div>
                  <div>
                    <span className="text-gray-400">Size:</span> {brushSize}px
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Color:</span>
                    <div
                      className="w-6 h-6 rounded border border-gray-600"
                      style={{ backgroundColor: brushColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Privacy & Safety Features</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ All artwork is created and stored locally on your device</li>
              <li>✅ No images are uploaded to external servers</li>
              <li>✅ Child-safe color palette with appropriate colors only</li>
              <li>✅ Simple, age-appropriate tools and interface</li>
              <li>✅ No social sharing or external connectivity</li>
              <li>✅ Parents have complete control over saved artwork</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}