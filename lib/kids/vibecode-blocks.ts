// lib/kids/vibecode-blocks.ts
export interface VibecodeBlock {
  id: string;
  type: string;
  category: 'action' | 'control' | 'data' | 'logic' | 'event';
  shape: 'command' | 'reporter' | 'boolean' | 'hat';
  color: string;
  icon: string;
  label: string;
  inputs?: BlockInput[];
  outputs?: BlockOutput[];
  code: string; // Generated JavaScript
}

export interface BlockInput {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'block';
  default?: any;
}

export interface BlockOutput {
  type: 'string' | 'number' | 'boolean';
}

export interface BlockConnection {
  from: string;
  to: string;
  fromSocket: number;
  toSocket: number;
}

// Base block definitions
export const baseBlocks: VibecodeBlock[] = [
  {
    id: 'start',
    type: 'start',
    category: 'event',
    shape: 'hat',
    color: '#4C97FF',
    icon: '▶️',
    label: 'When Start',
    code: 'function start() {',
  },
  {
    id: 'repeat',
    type: 'repeat',
    category: 'control',
    shape: 'command',
    color: '#FFAB19',
    icon: '🔄',
    label: 'Repeat',
    inputs: [{ name: 'times', type: 'number', default: 3 }],
    code: 'for (let i = 0; i < {times}; i++) {',
  },
  {
    id: 'if',
    type: 'if',
    category: 'control',
    shape: 'command',
    color: '#FFBF00',
    icon: '❓',
    label: 'If',
    inputs: [{ name: 'condition', type: 'boolean' }],
    code: 'if ({condition}) {',
  },
];

// Block execution engine
export function executeBlocks(blocks: VibecodeBlock[], connections: BlockConnection[]): any {
  // Build execution order from connections
  const executionOrder = buildExecutionOrder(blocks, connections);
  
  // Generate JavaScript code
  const code = generateCode(blocks, executionOrder);
  
  // Execute in sandbox
  return executeInSandbox(code);
}

function buildExecutionOrder(blocks: VibecodeBlock[], connections: BlockConnection[]): VibecodeBlock[] {
  // Topological sort to determine execution order
  const order: VibecodeBlock[] = [];
  const visited = new Set<string>();
  
  function visit(blockId: string) {
    if (visited.has(blockId)) return;
    visited.add(blockId);
    
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      // Visit dependencies first
      connections
        .filter(c => c.to === blockId)
        .forEach(c => visit(c.from));
      
      order.push(block);
    }
  }
  
  // Start from hat blocks
  blocks.filter(b => b.shape === 'hat').forEach(b => visit(b.id));
  
  return order;
}

function generateCode(blocks: VibecodeBlock[], order: VibecodeBlock[]): string {
  let code = '(() => {\n';
  let indent = 1;
  
  order.forEach(block => {
    const indentStr = '  '.repeat(indent);
    code += indentStr + block.code + '\n';
    
    if (block.code.includes('{')) indent++;
    if (block.code.includes('}')) indent--;
  });
  
  code += '})();\n';
  return code;
}

function executeInSandbox(code: string): any {
  // Use Function constructor for sandboxed execution
  try {
    const func = new Function(code);
    return func();
  } catch (error) {
    console.error('Execution error:', error);
    return { error: error.message };
  }
}