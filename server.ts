import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { SAMPLE_PRESETS, findPresetOrFuzzyMatch, synthesizeOfflinePhysicsResponse, adaptPresetToAudienceAndDifficulty } from './src/data/samplePresets.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// JSON Schema definition for Physics Engine Response
const physicsResponseSchema = {
  type: Type.OBJECT,
  properties: {
    is_valid_physics_topic: {
      type: Type.BOOLEAN,
      description: 'True if the topic is a valid physics or physical science concept, false if non-physics or dangerous.',
    },
    topic_notice: {
      type: Type.STRING,
      description: 'Polite explanation or redirection if the request is not a valid physics topic or poses dangerous hazards.',
    },
    concept_name: { type: Type.STRING },
    target_audience: {
      type: Type.STRING,
      enum: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'College', 'General Audience'],
    },
    difficulty_level: {
      type: Type.STRING,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    language: {
      type: Type.STRING,
      enum: ['English', 'Bengali', 'Hindi'],
    },
    scientific_status: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          enum: [
            'Established Empirical Law / Finding',
            'Simplified / Phenomenological Model',
            'Theoretical Hypothesis',
            'Unresolved Scientific Question',
            'Multi-Faceted / Complex Framework',
          ],
        },
        scope_note: {
          type: Type.STRING,
          description: 'A 1-sentence note stating the scope or operational validity of this classification without oversimplifying.',
        },
      },
      required: ['category', 'scope_note'],
    },
    core_intuition: {
      type: Type.STRING,
      description: 'A single, memorable, plain-language hook explaining the physics without technical jargon.',
    },
    explanation: {
      type: Type.STRING,
      description: 'Layered scientific explanation tailored precisely to the selected Target Audience and Difficulty Level.',
    },
    mathematics: {
      type: Type.OBJECT,
      properties: {
        has_formula: { type: Type.BOOLEAN },
        latex_formula: {
          type: Type.STRING,
          description: 'LaTeX mathematical formula string (e.g., E = mc^2 or \\mathcal{E} = -d\\Phi/dt) or empty if Beginner without formula.',
        },
        variables: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              symbol: { type: Type.STRING },
              meaning: { type: Type.STRING },
              si_unit: { type: Type.STRING },
            },
            required: ['symbol', 'meaning', 'si_unit'],
          },
        },
        validity_conditions: {
          type: Type.STRING,
          description: 'Explicit statement of boundary conditions and validity assumptions (e.g. non-relativistic, ideal fluid).',
        },
      },
      required: ['has_formula', 'latex_formula', 'variables', 'validity_conditions'],
    },
    analogies: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          theme: {
            type: Type.STRING,
            enum: ['Everyday Life', 'Mechanical / Tactile', 'Pop Culture / Modern Tech'],
          },
          title: { type: Type.STRING },
          story: { type: Type.STRING },
          mapping: { type: Type.STRING },
          where_it_breaks_down: {
            type: Type.STRING,
            description: 'Explicit callout explaining what this analogy cannot represent to prevent flawed mental models.',
          },
        },
        required: ['theme', 'title', 'story', 'mapping', 'where_it_breaks_down'],
      },
    },
    misconception_or_boundary: {
      type: Type.OBJECT,
      properties: {
        has_documented_misconception: {
          type: Type.BOOLEAN,
          description: 'Set to true ONLY if there is a well-documented student error in physics education literature. Otherwise false.',
        },
        title: {
          type: Type.STRING,
          description: 'Misconception statement or "Key Scientific Assumption & Boundary Condition"',
        },
        explanation_or_context: { type: Type.STRING },
        scientific_reality: { type: Type.STRING },
      },
      required: ['has_documented_misconception', 'title', 'explanation_or_context', 'scientific_reality'],
    },
    video_script: {
      type: Type.OBJECT,
      properties: {
        target_duration: { type: Type.STRING },
        hook_act1: {
          type: Type.OBJECT,
          properties: {
            timecode: { type: Type.STRING },
            visual_direction: { type: Type.STRING },
            on_screen_text: { type: Type.STRING },
            voiceover_narration: { type: Type.STRING },
          },
          required: ['timecode', 'visual_direction', 'on_screen_text', 'voiceover_narration'],
        },
        explanation_act2: {
          type: Type.OBJECT,
          properties: {
            timecode: { type: Type.STRING },
            visual_direction: { type: Type.STRING },
            on_screen_text: { type: Type.STRING },
            voiceover_narration: { type: Type.STRING },
          },
          required: ['timecode', 'visual_direction', 'on_screen_text', 'voiceover_narration'],
        },
        payoff_act3: {
          type: Type.OBJECT,
          properties: {
            timecode: { type: Type.STRING },
            visual_direction: { type: Type.STRING },
            on_screen_text: { type: Type.STRING },
            voiceover_narration: { type: Type.STRING },
          },
          required: ['timecode', 'visual_direction', 'on_screen_text', 'voiceover_narration'],
        },
      },
      required: ['target_duration', 'hook_act1', 'explanation_act2', 'payoff_act3'],
    },
    demonstrations: {
      type: Type.OBJECT,
      properties: {
        diy_household: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            safety_notice: { type: Type.STRING },
          },
          required: ['title', 'materials', 'steps', 'safety_notice'],
        },
        school_lab: {
          type: Type.OBJECT,
          properties: {
            applicable: { type: Type.BOOLEAN },
            apparatus: { type: Type.ARRAY, items: { type: Type.STRING } },
            setup_summary: { type: Type.STRING },
            safety_notice: { type: Type.STRING },
          },
          required: ['applicable', 'apparatus', 'setup_summary', 'safety_notice'],
        },
        digital_simulation: {
          type: Type.OBJECT,
          properties: {
            concept_visualized: { type: Type.STRING },
            suggested_tool_or_animation_flow: { type: Type.STRING },
          },
          required: ['concept_visualized', 'suggested_tool_or_animation_flow'],
        },
      },
      required: ['diy_household', 'school_lab', 'digital_simulation'],
    },
  },
  required: [
    'is_valid_physics_topic',
    'concept_name',
    'target_audience',
    'difficulty_level',
    'language',
    'scientific_status',
    'core_intuition',
    'explanation',
    'mathematics',
    'analogies',
    'misconception_or_boundary',
    'video_script',
    'demonstrations',
  ],
};

const SYSTEM_INSTRUCTION = `
You are the Physics Intuition & Analogy Engine, a pedagogical physics intelligence system designed for science content creators, physics educators, and students (Classes 9–12, College, and Curious General Audiences).

Your role is to translate abstract, mathematically challenging, or counterintuitive physics concepts into:
1. Pure conceptual intuition & scientific status classification.
2. Mathematical equations (LaTeX) with full SI variable units and validity bounds.
3. Three distinct, relatable real-life analogies (Everyday Life, Mechanical/Tactile, Pop Culture/Modern Tech) with explicit breakdown callout warnings where the analogy fails.
4. A high-threshold misconception analysis (or critical boundary condition if no fallacy exists).
5. A high-retention 60-second video script (3-Act structure: Hook 0-10s, Core Intuition 10-45s, Payoff 45-60s).
6. Practical laboratory & DIY demonstration ideas (Household, School Lab, and Digital Simulation).

### STRICT PEDAGOGICAL GUARDRAILS:

1. TARGET AUDIENCE & DIFFICULTY CALIBRATION (MANDATORY):
   - You MUST adapt the depth, mathematical level, and vocabulary to the exact Target Audience and Difficulty Level specified in the request.
   - Beginner (or Class 9): ZERO differential calculus. Use qualitative intuition, everyday comparisons, and set mathematics.has_formula to false unless a basic proportional relationship (e.g. F = ma or E ∝ ν) is central.
   - Intermediate (Class 10–12): Standard board/curriculum algebraic formulas, variable breakdown tables with SI units, and core boundary conditions.
   - Advanced (College): Formal mathematical rigor, differential/integral operators, boundary limits, and physical asymptotics.

2. FLUID DYNAMICS & BERNOULLI'S PRINCIPLE SCIENTIFIC ACCURACY:
   - NEVER make sweeping universal claims such as "fast air always means low pressure everywhere" or "moving air is a vacuum."
   - Explain Bernoulli's principle strictly within its physical assumptions: conservation of mechanical energy along an isolated streamline in steady, incompressible, and non-viscous flow where no external work or heat is added.
   - Clarify that fluid parcels accelerate into constrictions because an upstream higher pressure pushes them forward (-dp = ρ v dv). Do NOT use misleading hallway-crowd analogies that imply particles stop colliding when moving forward.

3. THE ANTI-CLASSICAL GUARDRAIL FOR MODERN PHYSICS:
   - For non-classical concepts (Quantum Mechanics, Special & General Relativity, Particle Physics, Quantum Field Theory), strictly forbid analogies that imply classical determinism, localized trajectories, or classical hidden variables (e.g., colored balls, shoes in boxes, physical spinning spheres).
   - If a concept has no direct classical counterpart, explicitly state in the intuition/explanation that classical everyday intuition fails before presenting an operational comparison.

4. DUAL-GLOSSARY RULE FOR BENGALI & HINDI:
   - If language is Bengali (বাংলা) or Hindi (हिन्दी), you MUST use formal educational terminology paired with the universal English term in parentheses on first mention.
     - Bengali examples: কৌণিক ভরবেগ (Angular Momentum), তড়িৎচ্চালক বল (Electromotive Force), সান্দ্রতা (Viscosity).
     - Hindi examples: कोणीय संवेग (Angular Momentum), विद्युत वाहक बल (Electromotive Force), श्यानता (Viscosity).
   - Never use casual phonetic slang (NO Hinglish or Banglish). Maintain formal academic grammar and register.
   - Separate LaTeX blocks ($...$ or $$...$$) with whitespace from Indic Unicode characters to prevent font clipping and rendering glitches.

5. NO FABRICATED REFERENCES OR FALSE VERIFICATION:
   - Never claim content is "officially verified", "board certified", or cite fictitious academic papers or fake experimental data. Use phrases like "Accepted Scientific Principle" or "Mathematical Formulation".

6. THE HIGH-THRESHOLD MISCONCEPTION RULE:
   - Do NOT invent strawman misconceptions. Only set has_documented_misconception: true if there is a well-documented student error in physics education literature.
   - Otherwise, set has_documented_misconception: false, title it "Key Scientific Assumption & Boundary Condition", and provide a critical edge case where the law ceases to apply.

7. SAFETY AND NON-PHYSICS SCOPE RULES:
   - If the user provides a topic that is NOT related to physics or physical science, set is_valid_physics_topic: false, and politely decline in topic_notice.
   - Refuse dangerous procedures involving microwave transformers (MOTs), dangerous mains voltage, toxic chemicals, radioactive materials, or explosive substances.
`;

// API endpoint for generating physics explanations
app.post('/api/generate', async (req: Request, res: Response) => {
  const {
    topic,
    targetAudience = 'Class 12',
    difficultyLevel = 'Intermediate',
    language = 'English',
    customNotes = '',
  } = req.body;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    res.status(400).json({ error: 'Physics topic is required.' });
    return;
  }

  const trimmedTopic = topic.trim();
  const matchedPreset = findPresetOrFuzzyMatch(trimmedTopic);

  // If no API key is configured, adapt the preset or synthesize offline
  if (!apiKey) {
    if (matchedPreset) {
      const adapted = adaptPresetToAudienceAndDifficulty(
        matchedPreset,
        targetAudience,
        difficultyLevel,
        language
      );
      adapted.generation_source = 'preloaded_preset';
      adapted.is_quota_exhausted = false;
      res.json(adapted);
      return;
    }
    const synthesized = synthesizeOfflinePhysicsResponse(
      trimmedTopic,
      targetAudience,
      difficultyLevel,
      language
    );
    synthesized.generation_source = 'offline_fallback';
    synthesized.is_quota_exhausted = false;
    res.json(synthesized);
    return;
  }

  const promptText = `
Analyze and break down the following physics topic:
- Topic: "${trimmedTopic}"
- Target Audience: ${targetAudience} (MANDATORY: Align tone, math level, and examples strictly to this audience)
- Difficulty Level: ${difficultyLevel} (MANDATORY: Beginner = qualitative/no calculus; Intermediate = standard formulas/units; Advanced = formal derivations/limits)
- Language: ${language}
${customNotes ? `- Custom Creator Instructions/Preferences: ${customNotes}` : ''}

Generate the complete structured JSON response adhering strictly to the system instructions and schema.
`;

  // List of models to try in order
  const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let isQuotaExceeded = false;

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: promptText,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: physicsResponseSchema,
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsedData = JSON.parse(responseText);
        // Explicitly set source metadata so the frontend can transparently label it
        parsedData.generation_source = 'live_ai';
        parsedData.is_quota_exhausted = false;
        parsedData.target_audience = targetAudience;
        parsedData.difficulty_level = difficultyLevel;
        parsedData.language = language;
        res.json(parsedData);
        return;
      }
    } catch (err: any) {
      const errMsg = String(err?.message || '');
      if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('Quota exceeded')) {
        isQuotaExceeded = true;
        // Break immediately on daily quota exhaustion to avoid laggy failed retries
        break;
      }
      console.warn(`Model ${modelName} failed:`, errMsg.slice(0, 150));
    }
  }

  // If live AI call failed (e.g. 429 quota exhaustion or network timeout)
  console.warn('Live Gemini call unavailable. Serving transparent fallback for:', trimmedTopic);

  // Check if we have an existing curated preset or fuzzy match
  if (matchedPreset) {
    const adapted = adaptPresetToAudienceAndDifficulty(
      matchedPreset,
      targetAudience,
      difficultyLevel,
      language
    );
    adapted.generation_source = 'preloaded_preset';
    adapted.is_quota_exhausted = isQuotaExceeded;
    adapted.quota_notice = isQuotaExceeded
      ? 'Notice: Gemini API daily quota limit reached (HTTP 429 Resource Exhausted). Showing curated educational benchmark reference adapted for your selected audience. To run fresh live AI, configure a billing-enabled key in Settings > Secrets.'
      : undefined;

    res.json(adapted);
    return;
  }

  // Synthesize pedagogical response for the user's custom topic
  const fallbackSynthesis = synthesizeOfflinePhysicsResponse(
    trimmedTopic,
    targetAudience,
    difficultyLevel,
    language
  );
  fallbackSynthesis.generation_source = 'offline_fallback';
  fallbackSynthesis.is_quota_exhausted = isQuotaExceeded;
  fallbackSynthesis.quota_notice = isQuotaExceeded
    ? 'Notice: Gemini API daily quota limit reached (HTTP 429 Resource Exhausted). Showing an offline pedagogical synthesis draft adapted for your selected audience. To run fresh live AI, configure a billing-enabled key in Settings > Secrets.'
    : undefined;

  res.json(fallbackSynthesis);
});

// Endpoint to fetch available preset concepts
app.get('/api/presets', (_req: Request, res: Response) => {
  res.json({
    presets: Object.keys(SAMPLE_PRESETS),
  });
});

// Endpoint to fetch a specific preset concept directly
app.get('/api/presets/:name', (req: Request, res: Response) => {
  const name = decodeURIComponent(req.params.name);
  const preset = SAMPLE_PRESETS[name];
  if (preset) {
    res.json(preset);
  } else {
    res.status(404).json({ error: 'Preset not found' });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Physics Intuition Engine server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
