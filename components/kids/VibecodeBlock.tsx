// components/kids/VibecodeBlock.tsx
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { VibecodeBlock } from '../../lib/kids/vibecode-blocks';

interface VibecodeBlockProps {
  block: VibecodeBlock;
  onSelect?: (block: VibecodeBlock) => void;
}

export default function VibecodeBlockComponent({ block, onSelect }: VibecodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'vibecode-block',
    item: { block },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [block]);

  drag(ref);

  const handleClick = () => onSelect?.(block);
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${block.label} block - drag to canvas or press Enter to select`}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg cursor-move
        transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        bg-gradient-to-r ${getColorClass(block.color)}
      `}
      style={{ backgroundColor: block.color }}
    >
      <span className="text-2xl" aria-hidden="true">{block.icon}</span>
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