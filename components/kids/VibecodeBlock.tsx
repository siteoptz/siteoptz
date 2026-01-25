// components/kids/VibecodeBlock.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { VibecodeBlock } from '../../lib/kids/vibecode-blocks';

interface VibecodeBlockProps {
  block: VibecodeBlock;
  onSelect?: (block: VibecodeBlock) => void;
}

export default function VibecodeBlockComponent({ block, onSelect }: VibecodeBlockProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'vibecode-block',
    item: { block },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={() => onSelect?.(block)}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg cursor-move
        transition-all hover:scale-105
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        bg-gradient-to-r ${getColorClass(block.color)}
      `}
      style={{ backgroundColor: block.color }}
    >
      <span className="text-2xl">{block.icon}</span>
      <span className="text-white font-semibold">{block.label}</span>
    </div>
  );
}

function getColorClass(color: string): string {
  // Map color hex to Tailwind classes
  const colorMap: { [key: string]: string } = {
    '#4C97FF': 'from-blue-500 to-blue-600',
    '#FFAB19': 'from-orange-500 to-orange-600',
    '#FFBF00': 'from-yellow-500 to-yellow-600',
  };
  return colorMap[color] || 'from-gray-500 to-gray-600';
}