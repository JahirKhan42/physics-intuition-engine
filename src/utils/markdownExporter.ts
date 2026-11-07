import { PhysicsEngineResponse } from '../types/physics';

export function formatAsMarkdown(data: PhysicsEngineResponse): string {
  const parts: string[] = [];

  parts.push(`# ${data.concept_name}`);
  parts.push(`**Target Audience:** ${data.target_audience} | **Level:** ${data.difficulty_level} | **Language:** ${data.language}`);
  parts.push(`**Generation Source:** ${data.generation_source === 'live_ai' ? 'Live AI (Gemini)' : data.generation_source === 'offline_fallback' ? 'Offline Synthesized Fallback' : 'Curated Educational Benchmark Reference'}`);
  parts.push(`**Scientific Status:** ${data.scientific_status.category}`);
  parts.push(`*${data.scientific_status.scope_note}*`);
  parts.push('');

  parts.push('## 1. Core Intuition & Explanation');
  parts.push(`> "${data.core_intuition}"`);
  parts.push('');
  parts.push(data.explanation);
  parts.push('');

  if (data.mathematics.has_formula && data.mathematics.latex_formula) {
    parts.push('### Mathematical Formulation');
    parts.push(`$$${data.mathematics.latex_formula}$$`);
    parts.push('');
    if (data.mathematics.variables.length > 0) {
      parts.push('| Symbol | Physical Meaning | SI Unit |');
      parts.push('| :--- | :--- | :--- |');
      data.mathematics.variables.forEach((v) => {
        parts.push(`| \`$${v.symbol}$\` | ${v.meaning} | ${v.si_unit} |`);
      });
      parts.push('');
    }
    if (data.mathematics.validity_conditions) {
      parts.push(`**Validity Conditions & Bounds:** ${data.mathematics.validity_conditions}`);
      parts.push('');
    }
  }

  parts.push('## 2. Real-Life Analogies');
  data.analogies.forEach((a, idx) => {
    parts.push(`### Analogy ${idx + 1}: ${a.title} (${a.theme})`);
    parts.push(`**The Scenario:** ${a.story}`);
    parts.push(`**The Physics Mapping:** ${a.mapping}`);
    parts.push(`⚠️ **Where This Analogy Fails:** ${a.where_it_breaks_down}`);
    parts.push('');
  });

  parts.push(`## 3. ${data.misconception_or_boundary.title}`);
  parts.push(`**Context / Common Thinking:** ${data.misconception_or_boundary.explanation_or_context}`);
  parts.push(`**Scientific Reality:** ${data.misconception_or_boundary.scientific_reality}`);
  parts.push('');

  parts.push('## 4. 60-Second Video Script');
  const s = data.video_script;
  parts.push(`### Act 1: The Hook (${s.hook_act1.timecode})`);
  parts.push(`- **Visual:** ${s.hook_act1.visual_direction}`);
  parts.push(`- **On-Screen Text:** ${s.hook_act1.on_screen_text}`);
  parts.push(`- **Voiceover:** "${s.hook_act1.voiceover_narration}"`);
  parts.push('');

  parts.push(`### Act 2: Core Intuition & Analogy (${s.explanation_act2.timecode})`);
  parts.push(`- **Visual:** ${s.explanation_act2.visual_direction}`);
  parts.push(`- **On-Screen Text:** ${s.explanation_act2.on_screen_text}`);
  parts.push(`- **Voiceover:** "${s.explanation_act2.voiceover_narration}"`);
  parts.push('');

  parts.push(`### Act 3: Takeaway & Payoff (${s.payoff_act3.timecode})`);
  parts.push(`- **Visual:** ${s.payoff_act3.visual_direction}`);
  parts.push(`- **On-Screen Text:** ${s.payoff_act3.on_screen_text}`);
  parts.push(`- **Voiceover:** "${s.payoff_act3.voiceover_narration}"`);
  parts.push('');

  parts.push('## 5. Demonstration Lab');
  parts.push(`### DIY Household Demo: ${data.demonstrations.diy_household.title}`);
  parts.push(`**Materials:** ${data.demonstrations.diy_household.materials.join(', ')}`);
  parts.push('**Steps:**');
  data.demonstrations.diy_household.steps.forEach((st, i) => parts.push(`${i + 1}. ${st}`));
  parts.push(`*Safety:* ${data.demonstrations.diy_household.safety_notice}`);
  parts.push('');

  if (data.demonstrations.school_lab?.applicable) {
    const lab = data.demonstrations.school_lab;
    parts.push('### School Laboratory Demonstration');
    parts.push(`**Apparatus:** ${lab.apparatus.join(', ')}`);
    parts.push(`**Setup & Procedure:** ${lab.setup_summary}`);
    parts.push(`*Safety Notice:* ${lab.safety_notice}`);
    parts.push('');
  }

  parts.push('### Digital Simulation Idea');
  parts.push(`**Concept Visualized:** ${data.demonstrations.digital_simulation.concept_visualized}`);
  parts.push(`**Suggested Flow / Software:** ${data.demonstrations.digital_simulation.suggested_tool_or_animation_flow}`);
  parts.push('');
  parts.push('---');
  parts.push('*Generated with Physics Intuition & Analogy Engine. Please verify against standard academic syllabi (NCERT, WBCHSE, etc.).*');

  return parts.join('\n');
}

export function formatScriptOnly(data: PhysicsEngineResponse): string {
  const s = data.video_script;
  return `=== 60-SECOND VIDEO SCRIPT: ${data.concept_name.toUpperCase()} ===
Duration: ~60 seconds | Audience: ${data.target_audience}

[ACT 1: THE HOOK | ${s.hook_act1.timecode}]
Visual: ${s.hook_act1.visual_direction}
Text on Screen: ${s.hook_act1.on_screen_text}
Voiceover: "${s.hook_act1.voiceover_narration}"

[ACT 2: CORE INTUITION & ANALOGY | ${s.explanation_act2.timecode}]
Visual: ${s.explanation_act2.visual_direction}
Text on Screen: ${s.explanation_act2.on_screen_text}
Voiceover: "${s.explanation_act2.voiceover_narration}"

[ACT 3: THE MIND-SHIFT & PAYOFF | ${s.payoff_act3.timecode}]
Visual: ${s.payoff_act3.visual_direction}
Text on Screen: ${s.payoff_act3.on_screen_text}
Voiceover: "${s.payoff_act3.voiceover_narration}"
`;
}
