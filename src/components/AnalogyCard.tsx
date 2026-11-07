import React, { useState } from 'react';
import {
  Sparkles,
  Coffee,
  Wrench,
  Gamepad2,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { PhysicsEngineResponse } from '../types/physics';
import { TextWithMath } from './MathRenderer';

interface AnalogyCardProps {
  data: PhysicsEngineResponse;
}

export const AnalogyCard: React.FC<AnalogyCardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'Everyday Life':
        return <Coffee className="w-4 h-4 text-emerald-600" />;
      case 'Mechanical / Tactile':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'Pop Culture / Modern Tech':
        return <Gamepad2 className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  const getThemeTag = (theme: string) => {
    switch (theme) {
      case 'Everyday Life':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Mechanical / Tactile':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pop Culture / Modern Tech':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const isIndic = data.language === 'Bengali' || data.language === 'Hindi';
  const langClass = data.language === 'Bengali' ? 'font-bengali' : data.language === 'Hindi' ? 'font-hindi' : '';

  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all ${langClass}`}>
      {/* Top Banner */}
      <div className="bg-slate-50/70 border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-purple-100 text-purple-700 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Card 2</span>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              3 Relatable Analogies &amp; Misconception Audit
            </h2>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full hidden sm:inline-block">
          Pedagogical Anchors
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Analogies Navigation Tabs */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.analogies.map((analogy, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                  activeTab === idx
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {getThemeIcon(analogy.theme)}
                <span>Analogy {idx + 1}: {analogy.theme}</span>
              </button>
            ))}
          </div>

          {/* Active Analogy Details */}
          {data.analogies[activeTab] && (
            <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getThemeTag(data.analogies[activeTab].theme)}`}>
                    {data.analogies[activeTab].theme}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    {data.analogies[activeTab].title}
                  </h3>
                </div>
              </div>

              {/* Story */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  The Relatable Scenario
                </h4>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed font-normal bg-white p-4 rounded-xl border border-slate-200/70">
                  <TextWithMath text={data.analogies[activeTab].story} />
                </div>
              </div>

              {/* Mapping */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  Direct Physics Concept Mapping
                </h4>
                <div className="text-sm text-slate-700 bg-blue-50/60 border border-blue-200/70 p-3.5 rounded-xl">
                  <TextWithMath text={data.analogies[activeTab].mapping} />
                </div>
              </div>

              {/* Crucial: Where It Breaks Down Warning Box */}
              <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm text-rose-900">
                  <span className="font-bold text-rose-950 block mb-1">
                    Where this analogy fails (Pedagogical Guardrail):
                  </span>
                  <p className="leading-relaxed">
                    <TextWithMath text={data.analogies[activeTab].where_it_breaks_down} />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Misconception vs. Boundary Card */}
        <div className="border-t border-slate-200 pt-7">
          {data.misconception_or_boundary.has_documented_misconception ? (
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border border-amber-300/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                  <ShieldAlert className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                    Documented Pedagogical Fallacy
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-amber-950">
                    Common Student Misconception vs. Scientific Reality
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Misconception & Why it persists */}
                <div className="bg-white/90 border border-amber-200/90 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Intuitive Fallacy / Why It Persists
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    {data.misconception_or_boundary.title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                    <TextWithMath text={data.misconception_or_boundary.explanation_or_context} />
                  </p>
                </div>

                {/* Scientific Reality */}
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Accepted Scientific Principle
                  </span>
                  <p className="text-xs md:text-sm text-emerald-950 font-medium leading-relaxed">
                    <TextWithMath text={data.misconception_or_boundary.scientific_reality} />
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    No Documented Fallacy Strawman
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    Key Scientific Assumption &amp; Boundary Condition
                  </h3>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">
                  {data.misconception_or_boundary.title}
                </h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  <TextWithMath text={data.misconception_or_boundary.explanation_or_context} />
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs md:text-sm text-blue-900 font-medium">
                  <span className="font-semibold text-slate-800">Operational Boundary: </span>
                  <TextWithMath text={data.misconception_or_boundary.scientific_reality} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
