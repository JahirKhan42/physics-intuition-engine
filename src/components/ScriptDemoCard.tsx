import React, { useState } from 'react';
import {
  Video,
  FlaskConical,
  Clock,
  Copy,
  Check,
  Eye,
  Type,
  Mic,
  Home,
  GraduationCap,
  MonitorPlay,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { PhysicsEngineResponse } from '../types/physics';
import { formatScriptOnly } from '../utils/markdownExporter';
import { TextWithMath } from './MathRenderer';

interface ScriptDemoCardProps {
  data: PhysicsEngineResponse;
}

export const ScriptDemoCard: React.FC<ScriptDemoCardProps> = ({ data }) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState<'diy' | 'school' | 'digital'>('diy');

  const handleCopyScript = async () => {
    try {
      const text = formatScriptOnly(data);
      await navigator.clipboard.writeText(text);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2200);
    } catch {
      // fallback
    }
  };

  const script = data.video_script;
  const demos = data.demonstrations;
  const langClass = data.language === 'Bengali' ? 'font-bengali' : data.language === 'Hindi' ? 'font-hindi' : '';

  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all ${langClass}`}>
      {/* Top Banner */}
      <div className="bg-slate-50/70 border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <Video className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Card 3</span>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              60-Second Video Script &amp; Demonstration Lab
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyScript}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-xl shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
        >
          {copiedScript ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Script Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Script Only</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-9">
        {/* SECTION A: 60-Second Video Script */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              60-Second Viral Education Script (3-Act Structure)
            </h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
              Shorts / Reels / TikTok / Hook
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Act 1 */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
                    Act 1: The Hook
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-blue-100/80 text-blue-800 rounded-md">
                    {script.hook_act1.timecode}
                  </span>
                </div>

                <div className="space-y-3 text-xs md:text-sm">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Eye className="w-3 h-3 text-slate-500" /> Visual Direction
                    </span>
                    <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      {script.hook_act1.visual_direction}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Type className="w-3 h-3 text-slate-500" /> On-Screen Text
                    </span>
                    <p className="text-slate-800 font-semibold bg-amber-50/70 text-amber-900 p-2 rounded-lg border border-amber-200/60 text-xs">
                      {script.hook_act1.on_screen_text}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Mic className="w-3 h-3 text-blue-600" /> Voiceover Narration
                    </span>
                    <p className="text-slate-900 font-medium italic bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      &ldquo;{script.hook_act1.voiceover_narration}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Act 2 */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-bold uppercase text-purple-700 tracking-wider">
                    Act 2: Core Intuition
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-purple-100/80 text-purple-800 rounded-md">
                    {script.explanation_act2.timecode}
                  </span>
                </div>

                <div className="space-y-3 text-xs md:text-sm">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Eye className="w-3 h-3 text-slate-500" /> Visual Direction
                    </span>
                    <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      {script.explanation_act2.visual_direction}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Type className="w-3 h-3 text-slate-500" /> On-Screen Text
                    </span>
                    <p className="text-slate-800 font-semibold bg-purple-50/70 text-purple-900 p-2 rounded-lg border border-purple-200/60 text-xs">
                      {script.explanation_act2.on_screen_text}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Mic className="w-3 h-3 text-purple-600" /> Voiceover Narration
                    </span>
                    <p className="text-slate-900 font-medium italic bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      &ldquo;{script.explanation_act2.voiceover_narration}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Act 3 */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                    Act 3: Payoff &amp; Mind-Shift
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-emerald-100/80 text-emerald-800 rounded-md">
                    {script.payoff_act3.timecode}
                  </span>
                </div>

                <div className="space-y-3 text-xs md:text-sm">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Eye className="w-3 h-3 text-slate-500" /> Visual Direction
                    </span>
                    <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      {script.payoff_act3.visual_direction}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Type className="w-3 h-3 text-slate-500" /> On-Screen Text
                    </span>
                    <p className="text-slate-800 font-semibold bg-emerald-50/70 text-emerald-900 p-2 rounded-lg border border-emerald-200/60 text-xs">
                      {script.payoff_act3.on_screen_text}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <Mic className="w-3 h-3 text-emerald-600" /> Voiceover Narration
                    </span>
                    <p className="text-slate-900 font-medium italic bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      &ldquo;{script.payoff_act3.voiceover_narration}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: Demonstration Lab */}
        <div className="border-t border-slate-200 pt-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              Actionable Demonstration Lab
            </h3>

            {/* Demo Sub-Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveDemoTab('diy')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemoTab === 'diy'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-blue-600" />
                <span>DIY Household</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDemoTab('school')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemoTab === 'school'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                <span>School Lab</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDemoTab('digital')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemoTab === 'digital'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MonitorPlay className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digital Simulation</span>
              </button>
            </div>
          </div>

          {/* Active Demo Panel */}
          {activeDemoTab === 'diy' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  {demos.diy_household.title}
                </h4>
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-medium">
                  Zero/Low-Cost Desktop Setup
                </span>
              </div>

              {/* Materials */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Required Everyday Materials:
                </span>
                <div className="flex flex-wrap gap-2">
                  {demos.diy_household.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                    >
                      &bull; {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Step-by-Step Procedure:
                </span>
                <ol className="space-y-2 text-xs md:text-sm text-slate-700">
                  {demos.diy_household.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/60">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Safety Notice */}
              {demos.diy_household.safety_notice && (
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900">
                  <AlertOctagon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-950">Safety Notice: </span>
                    <span>{demos.diy_household.safety_notice}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeDemoTab === 'school' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 animate-fadeIn">
              {demos.school_lab && demos.school_lab.applicable ? (
                <>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      Class 9–12 Physics Laboratory Experiment
                    </h4>
                    <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full font-medium">
                      Standard Lab Apparatus
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      Lab Apparatus Checklist:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {demos.school_lab.apparatus.map((app, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                        >
                          &bull; {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      Setup &amp; Experimental Flow:
                    </span>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs md:text-sm text-slate-700 leading-relaxed">
                      {demos.school_lab.setup_summary}
                    </div>
                  </div>

                  {demos.school_lab.safety_notice && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900">
                      <AlertOctagon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-950">Lab Safety Precautions: </span>
                        <span>{demos.school_lab.safety_notice}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 text-sm text-slate-600">
                  <Sparkles className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="font-medium text-slate-800">Advanced / Theoretical Topic</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    This phenomenon typically requires quantum or cryogenic instrumentation outside standard high school apparatus; please see the DIY desktop proxy or digital simulation below.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeDemoTab === 'digital' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MonitorPlay className="w-4 h-4 text-emerald-600" />
                  Interactive &amp; Cinematic Digital Simulation
                </h4>
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                  PhET / Manim / WebGL Ready
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Concept To Visualize Dynamically:
                </span>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs md:text-sm text-slate-800 font-medium">
                  {demos.digital_simulation.concept_visualized}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Recommended Tool &amp; Animation Flow:
                </span>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs md:text-sm text-slate-700 leading-relaxed">
                  {demos.digital_simulation.suggested_tool_or_animation_flow}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
