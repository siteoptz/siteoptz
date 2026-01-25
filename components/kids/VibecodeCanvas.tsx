// components/kids/VibecodeCanvas.tsx
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { VibecodeBlock, BlockConnection } from '../../lib/kids/vibecode-blocks';

interface VibecodeCanvasProps<T extends VibecodeBlock = VibecodeBlock> {
  blocks: T[];
  connections: BlockConnection[];
  onBlocksChange: (blocks: T[]) => void;
  onConnectionsChange: (connections: BlockConnection[]) => void;
  onExecute: () => void;
}

export default function VibecodeCanvas<T extends VibecodeBlock = VibecodeBlock>({
  blocks,
  connections,
  onBlocksChange,
  onConnectionsChange,
  onExecute,
}: VibecodeCanvasProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'vibecode-block',
    drop: (item: { block: T }) => {
      const newBlock = { ...item.block, id: `${item.block.id}-${Date.now()}` } as T;
      onBlocksChange([...blocks, newBlock]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [blocks, onBlocksChange]);

  drop(ref);

  return (
    <div
      ref={ref}
      className={`
        min-h-[400px] w-full border-2 border-dashed rounded-lg p-4
        ${isOver ? 'border-blue-500 bg-blue-50/10' : 'border-gray-600 bg-gray-900/50'}
      `}
    >
      {blocks.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Drag blocks here to build your program!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg"
            >
              <span className="text-xl">{block.icon}</span>
              <span className="text-white">{block.label}</span>
              <button
                onClick={() => onBlocksChange(blocks.filter(b => b.id !== block.id))}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={onExecute}
            className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
          >
            ▶️ Run Program
          </button>
        </div>
      )}
    </div>
  );
}