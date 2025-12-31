# Kids AI Coding Platform: Quick Start Implementation Guide

This guide provides concrete code examples and steps to begin implementing the kids coding platform.

---

## 1. Initial Setup

### 1.1 Create New Routes Structure

```bash
mkdir -p pages/kids/learn pages/kids/playground pages/kids/projects pages/kids/parents
mkdir -p components/kids/AIDemos components/kids/Progress components/kids/Challenges
mkdir -p lib/kids data/tutorials data/challenges
```

### 1.2 Install Additional Dependencies

```bash
npm install @monaco-editor/react react-player react-markdown
npm install --save-dev @types/react-player
```

---

## 2. Database Schema (Prisma Example)

Create `prisma/schema-kids.prisma`:

```prisma
model KidProject {
  id          String   @id @default(cuid())
  userId      String
  title       String
  description String?
  code        String   @db.Text
  previewImage String?
  category    String
  difficulty  String   // 'beginner' | 'intermediate' | 'advanced'
  ageGroup    String
  isPublic    Boolean  @default(false)
  remixes     Int      @default(0)
  likes       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([isPublic, category])
}

model TutorialProgress {
  id            String   @id @default(cuid())
  userId        String
  tutorialId    String
  completedSteps String[] // Array of step IDs
  completedAt   DateTime?
  startedAt     DateTime @default(now())
  
  user          User     @relation(fields: [userId], references: [id])
  
  @@unique([userId, tutorialId])
  @@index([userId])
}

model Achievement {
  id        String   @id @default(cuid())
  userId    String
  badgeId   String
  earnedAt  DateTime @default(now())
  projectId String?
  
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
}

model ChallengeSubmission {
  id          String   @id @default(cuid())
  userId      String
  challengeId String
  code        String   @db.Text
  submittedAt DateTime @default(now())
  score       Int?
  feedback    String?  @db.Text
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([userId, challengeId])
}

model PlaygroundProject {
  id        String   @id @default(cuid())
  userId    String
  name      String
  code      String   @db.Text
  lastSaved DateTime @default(now())
  isPublic  Boolean  @default(false)
  
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
}
```

---

## 3. API Routes

### 3.1 Projects API (`pages/api/kids/projects/index.ts`)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  
  if (req.method === 'GET') {
    const { category, difficulty, ageGroup, publicOnly } = req.query;
    
    const where: any = {};
    if (publicOnly === 'true') {
      where.isPublic = true;
    } else if (session?.user) {
      // User can see their own + public
      where.OR = [
        { userId: session.user.id },
        { isPublic: true }
      ];
    } else {
      where.isPublic = true;
    }
    
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (ageGroup) where.ageGroup = ageGroup;
    
    const projects = await prisma.kidProject.findMany({
      where,
      include: {
        user: {
          select: { name: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    return res.json({ projects });
  }
  
  if (req.method === 'POST') {
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { title, description, code, category, difficulty, ageGroup, isPublic } = req.body;
    
    // Content safety check
    const isSafe = await checkContentSafety(title, description, code);
    if (!isSafe) {
      return res.status(400).json({ error: 'Content does not meet safety guidelines' });
    }
    
    const project = await prisma.kidProject.create({
      data: {
        userId: session.user.id,
        title,
        description,
        code,
        category,
        difficulty,
        ageGroup,
        isPublic: isPublic || false
      }
    });
    
    return res.json({ project });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

### 3.2 AI Proxy API (`pages/api/kids/ai/text/generate.ts`)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import OpenAI from 'openai';
import { checkRateLimit, logUsage } from '../../../lib/kids/rate-limiter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Rate limiting based on user age/plan
  const rateLimitOk = await checkRateLimit(session.user.id);
  if (!rateLimitOk) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  const { prompt, maxTokens = 200 } = req.body;
  
  // Content safety: Check prompt
  const promptSafe = await checkPromptSafety(prompt);
  if (!promptSafe) {
    return res.status(400).json({ error: 'Prompt does not meet safety guidelines' });
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for kids learning to code. Keep responses appropriate, educational, and engaging.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });
    
    const response = completion.choices[0]?.message?.content || '';
    
    // Check response safety
    const responseSafe = await checkResponseSafety(response);
    if (!responseSafe) {
      return res.status(400).json({ error: 'Response does not meet safety guidelines' });
    }
    
    // Log usage for analytics and parent dashboard
    await logUsage(session.user.id, 'text_generation', { prompt, tokens: completion.usage?.total_tokens });
    
    return res.json({ text: response });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ error: 'Failed to generate text' });
  }
}

async function checkPromptSafety(prompt: string): Promise<boolean> {
  // Implement content moderation (e.g., using OpenAI moderation API)
  // For now, simple keyword check
  const unsafeKeywords = ['violence', 'explicit', 'inappropriate'];
  const lowerPrompt = prompt.toLowerCase();
  return !unsafeKeywords.some(keyword => lowerPrompt.includes(keyword));
}

async function checkResponseSafety(response: string): Promise<boolean> {
  // Similar safety check for responses
  return checkPromptSafety(response);
}
```

---

## 4. Components

### 4.1 AI Playground (`components/kids/AIPlayground.tsx`)

```typescript
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@headlessui/react';
import { Save, Play, Share2 } from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false
});

interface AIPlaygroundProps {
  initialCode?: string;
  projectId?: string;
  onSave?: (code: string) => Promise<void>;
}

export default function AIPlayground({ initialCode = '', projectId, onSave }: AIPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const handleRun = async () => {
    setLoading(true);
    try {
      // Execute code in sandbox or via API
      const response = await fetch('/api/kids/playground/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      setOutput(data.output || data.error || 'No output');
    } catch (error) {
      setOutput('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    if (onSave) {
      await onSave(code);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-bold">AI Playground</h2>
        <div className="flex gap-2">
          <Button
            onClick={handleRun}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Play className="w-4 h-4" />
            {loading ? 'Running...' : 'Run'}
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save'}
          </Button>
          <Button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Editor and Output */}
      <div className="flex-1 flex">
        <div className="flex-1">
          <MonacoEditor
            height="100%"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-light"
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              wordWrap: 'on',
            }}
          />
        </div>
        <div className="w-1/2 border-l bg-gray-50 p-4">
          <h3 className="font-bold mb-2">Output</h3>
          <pre className="bg-white p-4 rounded border overflow-auto h-full">
            {output || 'Run your code to see output here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

### 4.2 Tutorial Player (`components/kids/TutorialPlayer.tsx`)

```typescript
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TutorialStep {
  id: string;
  title: string;
  type: 'intro' | 'lesson' | 'coding' | 'project';
  content: string;
  video?: string;
  codeTemplate?: string;
}

interface TutorialPlayerProps {
  tutorial: {
    id: string;
    title: string;
    steps: TutorialStep[];
  };
  onComplete?: (stepId: string) => void;
}

export default function TutorialPlayer({ tutorial, onComplete }: TutorialPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  
  const currentStep = tutorial.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === tutorial.steps.length - 1;
  
  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleCompleteStep = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep.id);
    setCompletedSteps(newCompleted);
    onComplete?.(currentStep.id);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
        <div className="flex gap-2">
          {tutorial.steps.map((step, index) => (
            <div
              key={step.id}
              className={`h-2 flex-1 rounded ${
                index === currentStepIndex
                  ? 'bg-blue-600'
                  : completedSteps.has(step.id)
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Step {currentStepIndex + 1}: {currentStep.title}
          </h2>
          {completedSteps.has(currentStep.id) && (
            <CheckCircle className="w-6 h-6 text-green-500" />
          )}
        </div>
        
        {/* Video */}
        {currentStep.video && (
          <div className="mb-6">
            <ReactPlayer url={currentStep.video} controls width="100%" />
          </div>
        )}
        
        {/* Content */}
        <div className="prose max-w-none mb-6">
          <ReactMarkdown>{currentStep.content}</ReactMarkdown>
        </div>
        
        {/* Code Template */}
        {currentStep.codeTemplate && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">Your Code:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{currentStep.codeTemplate}</code>
            </pre>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        <button
          onClick={handleCompleteStep}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {completedSteps.has(currentStep.id) ? 'Completed ✓' : 'Mark Complete'}
        </button>
        
        <button
          onClick={handleNext}
          disabled={isLastStep}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

### 4.3 Project Gallery (`components/kids/ProjectGallery.tsx`)

```typescript
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Share2, Code } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  previewImage?: string;
  category: string;
  difficulty: string;
  likes: number;
  remixes: number;
  user: {
    name: string;
    image?: string;
  };
}

export default function ProjectGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: '', difficulty: '' });
  
  useEffect(() => {
    fetchProjects();
  }, [filter]);
  
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filter as any);
      const response = await fetch(`/api/kids/projects?${params.toString()}&publicOnly=true`);
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLike = async (projectId: string) => {
    // Implement like functionality
    console.log('Like project:', projectId);
  };
  
  if (loading) {
    return <div className="text-center p-8">Loading projects...</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Project Gallery</h1>
        
        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="games">Games</option>
            <option value="art">Art</option>
            <option value="stories">Stories</option>
            <option value="tools">Tools</option>
          </select>
          
          <select
            value={filter.difficulty}
            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Preview Image */}
            {project.previewImage && (
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={project.previewImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="px-2 py-1 bg-blue-100 rounded">{project.category}</span>
                <span className="px-2 py-1 bg-green-100 rounded">{project.difficulty}</span>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(project.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="w-4 h-4" />
                    {project.likes}
                  </button>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Code className="w-4 h-4" />
                    {project.remixes}
                  </span>
                </div>
                
                <Link
                  href={`/kids/projects/${project.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No projects found. Be the first to create one!
        </div>
      )}
    </div>
  );
}
```

---

## 5. Landing Page (`pages/kids/index.tsx`)

```typescript
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Rocket, Code, Users, Shield, Sparkles } from 'lucide-react';
import SEOHead from '../../components/SEOHead';

export default function KidsLandingPage() {
  return (
    <>
      <SEOHead
        title="Learn to Build with AI | siteoptz.ai Kids"
        description="The first coding platform built for kids to learn AI. Build your first AI app in 10 minutes!"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Don't just use AI.<br />
            <span className="text-blue-600">Build with it.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kids are already using ChatGPT and AI image generators. 
            Now learn to build your own AI apps with our interactive platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/kids/learn"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Learning Free
            </Link>
            <Link
              href="/kids/parents"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              For Parents
            </Link>
          </div>
        </section>
        
        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Kids Love Learning Here</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="Build Real Projects"
              description="Create story generators, image creators, chatbots, and more. Not just tutorials—real apps you can use!"
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Learn at Your Pace"
              description="4 levels from Explorer to Innovator. Start wherever you're comfortable and level up when you're ready."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Share & Remix"
              description="Publish your projects, see what others built, and remix their code to learn even more."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Safe & Monitored"
              description="COPPA-compliant. Content moderation. Parent dashboards. Built for kids, trusted by parents."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Hands-On AI"
              description="Use real AI APIs (OpenAI, DALL-E) in a safe, guided environment. See AI in action."
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Fun Challenges"
              description="Weekly coding challenges, monthly competitions, and hackathons. Learn by doing."
            />
          </div>
        </section>
        
        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your First AI App?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of kids already building with AI
          </p>
          <Link
            href="/kids/learn"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
        </section>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

---

## 6. Utility Functions

### 6.1 Rate Limiter (`lib/kids/rate-limiter.ts`)

```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function checkRateLimit(userId: string): Promise<boolean> {
  const key = `ratelimit:${userId}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, 3600); // 1 hour window
  }
  
  // Limit based on user plan (default: 100 requests/hour)
  const limit = 100;
  return current <= limit;
}

export async function logUsage(userId: string, type: string, metadata: any) {
  // Log to database for parent dashboard and analytics
  // Implementation depends on your logging system
  console.log('Usage logged:', { userId, type, metadata });
}
```

### 6.2 Content Safety (`lib/kids/content-filter.ts`)

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function checkContentSafety(content: string): Promise<boolean> {
  try {
    const moderation = await openai.moderations.create({
      input: content,
    });
    
    const result = moderation.results[0];
    
    // Block if flagged for any category
    return !result.flagged;
  } catch (error) {
    console.error('Content moderation error:', error);
    // Fail safe: block if moderation fails
    return false;
  }
}
```

---

## 7. Sample Tutorial Data

Create `data/tutorials/story-generator.json`:

```json
{
  "id": "story-generator-1",
  "title": "Build Your First AI Story Generator",
  "description": "Learn to use AI to create amazing stories",
  "level": "builder",
  "ageGroup": "11-13",
  "estimatedTime": "45 minutes",
  "steps": [
    {
      "id": "step-1",
      "title": "What You'll Build",
      "type": "intro",
      "content": "In this tutorial, you'll create an app that generates stories using AI. Users can input a topic, and your app will create a creative story about it!",
      "video": "https://youtube.com/watch?v=..."
    },
    {
      "id": "step-2",
      "title": "Understanding AI APIs",
      "type": "lesson",
      "content": "APIs let your code talk to AI services. Think of it like ordering food: you send a request (what you want), and you get a response (your food).",
      "interactive": true
    },
    {
      "id": "step-3",
      "title": "Your First API Call",
      "type": "coding",
      "codeTemplate": "// Your code here\nconst response = await fetch('/api/kids/ai/text/generate', {\n  method: 'POST',\n  body: JSON.stringify({ prompt: 'Write a story about...' })\n});",
      "solution": "const response = await fetch('/api/kids/ai/text/generate', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ prompt: 'Write a short story about a robot who learns to paint' })\n});\nconst data = await response.json();\nconsole.log(data.text);"
    }
  ]
}
```

---

## Next Steps

1. Set up database migrations
2. Create authentication middleware for age verification
3. Build out remaining API endpoints
4. Create more tutorial content
5. Implement parent dashboard
6. Add testing
7. Set up monitoring and analytics

---

*For full documentation, see: `AI_KIDS_CODING_PLATFORM_RECOMMENDATIONS.md`*