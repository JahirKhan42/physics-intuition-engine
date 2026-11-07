import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Gauge,
  Languages,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { TargetAudience, DifficultyLevel, LanguageOption, GenerateRequestPayload } from '../types/physics';

interface InputDashboardProps {
  onGenerate: (payload: GenerateRequestPayload) => void;
  isLoading: boolean;
  activeTopic: string;
}

const QUICK_SUGGESTIONS = [
  "Lenz's Law",
  "Bernoulli's Principle",
  "Quantum Tunneling",
  "Total Internal Reflection",
  "Photoelectric Effect",
  "Time Dilation",
  "Archimedes' Principle"
];

export const InputDashboard: React.FC<InputDashboardProps> = ({
  onGenerate,
  isLoading,
  activeTopic
}) => {
  const [topic, setTopic] = useState(activeTopic || "Lenz's Law");
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('Class 12');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('Intermediate');
  const [language, setLanguage] = useState<LanguageOption>('English');
  const [customNotes, setCustomNotes] = useState('');
  const [showAdvancedNotes, setShowAdvancedNotes] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim() || isLoading) return;
    onGenerate({
      topic: topic.trim(),
      targetAudience,
      difficultyLevel,
      language,
      customNotes: customNotes.trim() ? customNotes.trim() : undefined,
    });
  };

  const handleSuggestionClick = (sug: string) => {
    setTopic(sug);
    onGenerate({
      topic: sug,
      targetAudience,
      difficultyLevel,
      language,
      customNotes: customNotes.trim() ? customNotes.trim() : undefined,
    });
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 md:p-7 transition-all">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Topic Input Bar */}
        <div>
          <label htmlFor="topic-input" className="block text-xs font-semibold text-slate-700 tracking-wider uppercase mb-2">
            Physics Concept / Law / Phenomenon
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Lenz's Law, Photoelectric Effect, Time Dilation..."
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-base font-medium"
            />
            {topic && (
              <button
                type="button"
                onClick={() => setTopic('')}
                className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md bg-slate-200/60"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick-Click Suggestion Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Topics:
            </span>
            {QUICK_SUGGESTIONS.map((sug) => {
              const isActive = topic.toLowerCase() === sug.toLowerCase();
              return (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleSuggestionClick(sug)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns Row: Target Audience, Difficulty Level, Language */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              Target Audience
            </label>
            <div className="relative">
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                disabled={isLoading}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer pr-9"
              >
                <option value="Class 9">Class 9 (Early Secondary)</option>
                <option value="Class 10">Class 10 (Secondary Board)</option>
                <option value="Class 11">Class 11 (Higher Secondary - Core)</option>
                <option value="Class 12">Class 12 (Board / Competitive JEE/NEET)</option>
                <option value="College">College / Undergraduate</option>
                <option value="General Audience">General Audience / Curious Public</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-600" />
              Difficulty Level
            </label>
            <div className="relative">
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value as DifficultyLevel)}
                disabled={isLoading}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer pr-9"
              >
                <option value="Beginner">Beginner (Qualitative &amp; Intuition)</option>
                <option value="Intermediate">Intermediate (Formulas &amp; Units)</option>
                <option value="Advanced">Advanced (Rigorous Derivation &amp; Bounds)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              Pedagogical Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageOption)}
                disabled={isLoading}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer pr-9"
              >
                <option value="English">English</option>
                <option value="Bengali">বাংলা (Bengali - দ্বৈত পরিভাষা)</option>
                <option value="Hindi">हिन्दी (Hindi - द्विभाषी शब्दावली)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Collapsible Creator Notes / Context */}
        <div className="border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setShowAdvancedNotes(!showAdvancedNotes)}
            className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Custom Creator Instructions (Pacing, preferred props, regional analogies)</span>
            {showAdvancedNotes ? (
              <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          {showAdvancedNotes && (
            <div className="mt-2.5 animate-fadeIn">
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g., Focus specifically on the negative sign and conservation of energy; recommend tabletop props like aluminium soda cans; target high school syllabus format..."
                rows={2}
                disabled={isLoading}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-center">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Strict anti-classical guardrails &amp; dual-glossary Indic support enabled</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 text-white font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Intuition &amp; Script...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Generate Explanation &amp; Script</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
