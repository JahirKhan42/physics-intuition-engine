import React, { useState, useEffect } from 'react';
import {
  Atom,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  FileText,
  AlertCircle,
  Share2,
  HelpCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { PhysicsEngineResponse, GenerateRequestPayload } from './types/physics';
import { SAMPLE_PRESETS, findPresetOrFuzzyMatch, synthesizeOfflinePhysicsResponse, adaptPresetToAudienceAndDifficulty } from './data/samplePresets';
import { InputDashboard } from './components/InputDashboard';
import { ScientificCard } from './components/ScientificCard';
import { AnalogyCard } from './components/AnalogyCard';
import { ScriptDemoCard } from './components/ScriptDemoCard';
import { DisclaimerFooter } from './components/DisclaimerFooter';
import { formatAsMarkdown, formatScriptOnly } from './utils/markdownExporter';

export default function App() {
  const [data, setData] = useState<PhysicsEngineResponse>(() =>
    adaptPresetToAudienceAndDifficulty(SAMPLE_PRESETS["Lenz's Law"], 'Class 12', 'Intermediate', 'English')
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [lastPayload, setLastPayload] = useState<GenerateRequestPayload>({
    topic: "Lenz's Law",
    targetAudience: 'Class 12',
    difficultyLevel: 'Intermediate',
    language: 'English',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleGenerate = async (payload: GenerateRequestPayload) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLastPayload(payload);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const result: PhysicsEngineResponse = await response.json();
      setData(result);
      if (result.generation_source === 'live_ai') {
        showToast(`Live AI Generated: ${result.concept_name}`);
      } else if (result.is_quota_exhausted) {
        showToast(`Loaded: ${result.concept_name} (Quota Fallback)`);
      } else {
        showToast(`Loaded: ${result.concept_name}`);
      }
    } catch (err: any) {
      console.warn('API error encountered, adapting benchmark reference or local synthesis:', err);
      const matched = findPresetOrFuzzyMatch(payload.topic);

      if (matched) {
        const adapted = adaptPresetToAudienceAndDifficulty(
          matched,
          payload.targetAudience,
          payload.difficultyLevel,
          payload.language
        );
        setData({
          ...adapted,
          generation_source: 'preloaded_preset',
          is_quota_exhausted: true,
          quota_notice:
            'Notice: Live Gemini API request limit reached (HTTP 429 Resource Exhausted). Showing curated educational benchmark reference adapted for your selected audience. To run fresh live AI, configure a billing-enabled key in Settings > Secrets.',
        });
        showToast(`Loaded benchmark reference: ${matched.concept_name}`);
      } else {
        const synthesized = synthesizeOfflinePhysicsResponse(
          payload.topic,
          payload.targetAudience,
          payload.difficultyLevel,
          payload.language
        );
        setData(synthesized);
        showToast(`Synthesized offline concept: ${synthesized.concept_name}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastPayload) {
      handleGenerate(lastPayload);
    }
  };

  const handleCopyMarkdown = async () => {
    if (!data) return;
    try {
      const md = formatAsMarkdown(data);
      await navigator.clipboard.writeText(md);
      setCopiedAll(true);
      showToast('Markdown lesson breakdown copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2200);
    } catch {
      showToast('Could not copy to clipboard.');
    }
  };

  const handleQuickLoad = (topicName: string) => {
    const preset = SAMPLE_PRESETS[topicName];
    if (preset) {
      const adapted = adaptPresetToAudienceAndDifficulty(
        preset,
        lastPayload.targetAudience,
        lastPayload.difficultyLevel,
        lastPayload.language
      );
      setData(adapted);
      setLastPayload({
        ...lastPayload,
        topic: preset.concept_name,
      });
      showToast(`Loaded benchmark concept: ${topicName}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12 flex-1">
        {/* Top Header / Brand */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Atom className="w-7 h-7 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Physics Intuition &amp; Analogy Engine
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                    v2.5 Pro
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                  Translating counterintuitive physics into conceptual intuition, mathematical formulations, 3 real-world analogies, and 60-second video scripts.
                </p>
              </div>
            </div>

            {/* Global Utility Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Export complete breakdown for lesson plans or Notion"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy All as Markdown</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRegenerate}
                disabled={isLoading}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-xl shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                title="Regenerate alternative perspectives & analogies"
              >
                <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : 'text-slate-600'}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Section 2: Input Interface Dashboard */}
        <section className="mb-8">
          <InputDashboard
            onGenerate={handleGenerate}
            isLoading={isLoading}
            activeTopic={data.concept_name}
          />
        </section>

        {/* Error / Non-Physics Notice Banner */}
        {errorMessage && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-900 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-rose-950">Notice:</span>
              <p>{errorMessage}</p>
              <div className="pt-2 text-xs text-rose-700">
                <span>Try choosing a physics benchmark topic instead: </span>
                {Object.keys(SAMPLE_PRESETS).map((presetKey) => (
                  <button
                    key={presetKey}
                    type="button"
                    onClick={() => handleQuickLoad(presetKey)}
                    className="underline font-semibold ml-1 mr-2 hover:text-rose-950 cursor-pointer"
                  >
                    {presetKey}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Non-Physics Redirect Notice if model flagged is_valid_physics_topic: false */}
        {data.is_valid_physics_topic === false && (
          <div className="mb-8 p-5 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3.5 text-amber-950 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <span className="font-bold text-base block">Non-Physics or Safety Restricted Query</span>
              <p className="text-slate-700 leading-relaxed">
                {data.topic_notice ||
                  "The requested prompt is outside the scope of physics education or involves hazardous procedures. Please submit a physical science concept (e.g., Electromagnetic Induction, Fluid Dynamics, Relativity, Thermodynamics)."}
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-xs">
                <span className="font-semibold text-slate-800 self-center">Explore these core topics:</span>
                {Object.keys(SAMPLE_PRESETS).map((pKey) => (
                  <button
                    key={pKey}
                    type="button"
                    onClick={() => handleQuickLoad(pKey)}
                    className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 rounded-lg font-medium hover:bg-amber-100 cursor-pointer"
                  >
                    {pKey}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Source Disclosure & API Quota Notification Banner */}
        {data.is_quota_exhausted && (
          <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl flex items-start gap-3.5 text-slate-800 text-xs sm:text-sm shadow-2xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-950 block text-sm">
                Transparent Notice: Offline Reference / Fallback Content Displayed
              </span>
              <p className="text-amber-900 leading-relaxed">
                {data.quota_notice ||
                  "The Gemini API daily request quota has been reached (HTTP 429). The output below is an adapted educational benchmark / offline synthesis draft and is NOT freshly generated by live AI."}
              </p>
              <p className="text-amber-950 text-xs font-semibold pt-1">
                To run fresh live AI models with higher limits, connect a billing-enabled API key in the AI Studio <strong>Settings &gt; Secrets</strong> panel.
              </p>
            </div>
          </div>
        )}

        {/* Section 3: The Three Output Presentation Cards */}
        {data && (
          <main className="space-y-8 animate-fadeIn">
            {/* Card 1: Scientific Intuition, Status & Mathematics */}
            <ScientificCard data={data} />

            {/* Card 2: 3 Relatable Analogies & Misconception Audit */}
            <AnalogyCard data={data} />

            {/* Card 3: 60-Second Video Script & Demonstration Lab */}
            <ScriptDemoCard data={data} />
          </main>
        )}
      </div>

      {/* Global Pedagogical Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  );
}
