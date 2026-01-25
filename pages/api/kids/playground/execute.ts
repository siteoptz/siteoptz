import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';

// Sandboxed code execution for kids
// This is a simplified version - in production, use a proper sandbox like Docker or a dedicated service

interface ExecutionRequest {
  code: string;
  challengeId?: string;
  testCases?: Array<{ input: any; expectedOutput: any }>;
}

// Blocked keywords and functions for safety
const BLOCKED_KEYWORDS = [
  'eval', 'exec', 'import os', 'import sys', 'import subprocess',
  'open(', 'file(', '__import__', 'compile', 'globals', 'locals',
  'delattr', 'setattr', 'getattr', '__builtins__', '__dict__',
  'exit', 'quit', 'input(', 'raw_input'
];

function isCodeSafe(code: string): { safe: boolean; reason?: string } {
  const lowerCode = code.toLowerCase();
  
  // Check for blocked keywords
  for (const keyword of BLOCKED_KEYWORDS) {
    if (lowerCode.includes(keyword.toLowerCase())) {
      return { safe: false, reason: `Blocked keyword: ${keyword}` };
    }
  }
  
  // Check code length (prevent extremely long code)
  if (code.length > 5000) {
    return { safe: false, reason: 'Code too long (max 5000 characters)' };
  }
  
  // Check for potentially dangerous patterns
  if (lowerCode.includes('while true') && !lowerCode.includes('break')) {
    return { safe: false, reason: 'Potential infinite loop detected' };
  }
  
  return { safe: true };
}

// Simple Python-like interpreter for educational purposes
function executePythonLikeCode(code: string, testCases?: Array<{ input: any; expectedOutput: any }>): {
  success: boolean;
  output: string;
  errors: string[];
  challengeCompleted?: boolean;
} {
  const errors: string[] = [];
  let output = '';
  let challengeCompleted = false;

  try {
    // Safety check
    const safetyCheck = isCodeSafe(code);
    if (!safetyCheck.safe) {
      return {
        success: false,
        output: '',
        errors: [safetyCheck.reason || 'Code safety check failed']
      };
    }

    // Convert Python-like syntax to JavaScript for execution
    // This is a simplified converter - in production, use a proper transpiler
    let jsCode = code
      // Convert Python print to console.log
      .replace(/print\s*\(/g, 'console.log(')
      // Convert Python range to JavaScript array
      .replace(/range\s*\((\d+)\)/g, 'Array($1).fill(0).map((_, i) => i)')
      // Convert Python for loops
      .replace(/for\s+(\w+)\s+in\s+range\s*\((\d+)\)\s*:/g, 'for (let $1 = 0; $1 < $2; $1++) {')
      // Convert Python if statements
      .replace(/if\s+(.+?)\s*:/g, 'if ($1) {')
      // Convert Python def to JavaScript function
      .replace(/def\s+(\w+)\s*\(([^)]*)\)\s*:/g, 'function $1($2) {')
      // Convert Python indentation to braces (simplified)
      .replace(/\n    /g, '\n  ')
      // Convert Python list syntax
      .replace(/\["([^"]+)",\s*"([^"]+)"\]/g, '["$1", "$2"]')
      // Convert Python string operations
      .replace(/\.lower\(\)/g, '.toLowerCase()')
      .replace(/\.upper\(\)/g, '.toUpperCase()');

    // Wrap in try-catch for error handling
    jsCode = `
      (function() {
        try {
          ${jsCode}
          return { success: true, output: "Code executed successfully" };
        } catch (error) {
          return { success: false, error: error.message };
        }
      })();
    `;

    // Execute in a controlled environment
    // Note: In production, use a proper sandbox like vm2, isolated-vm, or Docker
    const result = eval(jsCode);
    
    if (result.success) {
      output = result.output || 'Code executed successfully!';
      
      // Run test cases if provided
      if (testCases && testCases.length > 0) {
        let allTestsPassed = true;
        for (const testCase of testCases) {
          // Simplified test case checking
          // In production, use a proper test runner
          try {
            // This is a placeholder - implement proper test execution
            const testResult = eval(`(${JSON.stringify(testCase.input)})`);
            if (JSON.stringify(testResult) !== JSON.stringify(testCase.expectedOutput)) {
              allTestsPassed = false;
              errors.push(`Test failed: expected ${JSON.stringify(testCase.expectedOutput)}, got ${JSON.stringify(testResult)}`);
            }
          } catch (testError: any) {
            allTestsPassed = false;
            errors.push(`Test error: ${testError.message}`);
          }
        }
        challengeCompleted = allTestsPassed;
      }
    } else {
      errors.push(result.error || 'Execution error');
    }

  } catch (error: any) {
    errors.push(error.message || 'Unknown execution error');
  }

  return {
    success: errors.length === 0,
    output,
    errors,
    challengeCompleted
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.email || 'anonymous';

    const { code, challengeId, testCases }: ExecutionRequest = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Execute code
    const result = executePythonLikeCode(code, testCases);

    // Log execution (for analytics and parent dashboard)
    console.log(`[Kids AI] Code executed for user: ${userId}, challenge: ${challengeId || 'none'}, success: ${result.success}`);

    return res.status(200).json({
      success: result.success,
      output: result.output,
      errors: result.errors,
      challengeCompleted: result.challengeCompleted,
      executedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Code execution error:', error);
    return res.status(500).json({
      error: 'Code execution failed',
      details: error.message || 'Unknown error'
    });
  }
}