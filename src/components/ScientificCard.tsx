import React from 'react';
import {
  Award,
  Atom,
  Binary,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  Table as TableIcon,
  Info,
  CheckCircle2
} from 'lucide-react';
import { PhysicsEngineResponse, ScientificStatusCategory } from '../types/physics';
import { MathRenderer, TextWithMath } from './MathRenderer';

interface ScientificCardProps {
  data: PhysicsEngineResponse;
}

export const ScientificCard: React.FC<ScientificCardProps> = ({ data }) => {
  const getBadgeStyle = (category: ScientificStatusCategory | string) => {
    switch (category) {
      case 'Established Empirical Law / Finding':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
        };
      case 'Simplified / Phenomenological Model':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <Atom className="w-4 h-4 text-amber-600" />,
        };
      case 'Theoretical Hypothesis':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          icon: <Lightbulb className="w-4 h-4 text-indigo-600" />,
        };
      case 'Unresolved Scientific Question':
      case 'Unresolved Scientific Question / Active Research':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
        };
      default:
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <Award className="w-4 h-4 text-blue-600" />,
        };
    }
  };

  const badge = getBadgeStyle(data.scientific_status.category);
  const isIndic = data.language === 'Bengali' || data.language === 'Hindi';
  const langClass = data.language === 'Bengali' ? 'font-bengali' : data.language === 'Hindi' ? 'font-hindi' : '';

  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all ${langClass}`}>
      {/* Top Banner / Status Classification */}
      <div className="bg-slate-50/70 border-b border-slate-200/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <Atom className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Card 1</span>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              Scientific Intuition, Status &amp; Mathematics
            </h2>
          </div>
        </div>

        {/* Badges: Source Indicator + Scientific Status */}
        <div className="flex flex-wrap items-center gap-2">
          {data.generation_source === 'live_ai' ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live AI (Gemini 3.8 Flash)</span>
            </div>
          ) : data.generation_source === 'offline_fallback' ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-amber-50 text-amber-800 border-amber-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Demo / Offline Fallback (Quota Limit)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-slate-100 text-slate-700 border-slate-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Demo Reference (Curated Benchmark)</span>
            </div>
          )}

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${badge.bg}`}>
            {badge.icon}
            <span>{data.scientific_status.category}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-7">
        {/* Scope Note Box */}
        {data.scientific_status.scope_note && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-700">Epistemic Scope Note: </span>
              <span>{data.scientific_status.scope_note}</span>
            </div>
          </div>
        )}

        {/* Core Intuition Hook (Memorable, No Jargon) */}
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2">
            The Core Intuition
          </span>
          <div className="border-l-4 border-blue-600 bg-gradient-to-r from-blue-50/50 to-transparent pl-4 py-3 pr-4 rounded-r-xl">
            <p className="text-base md:text-lg font-semibold text-slate-900 italic leading-relaxed">
              &ldquo;{data.core_intuition}&rdquo;
            </p>
          </div>
        </div>

        {/* Layered Scientific Explanation */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
            <span>Pedagogical Explanation</span>
            <span className="text-xs font-normal normal-case text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Tailored for {data.target_audience} &bull; {data.difficulty_level}
            </span>
          </h3>
          <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-3 font-normal">
            <TextWithMath text={data.explanation} />
          </div>
        </div>

        {/* Mathematical Framework */}
        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Binary className="w-4 h-4 text-blue-600" />
              Mathematical Framework &amp; Equation Formulation
            </h3>
            {data.mathematics.has_formula && (
              <span className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                Mathematical Formulation (LaTeX)
              </span>
            )}
          </div>

          {data.mathematics.has_formula && data.mathematics.latex_formula ? (
            <div className="space-y-4">
              {/* Formula Display Block */}
              <div className="bg-slate-900 text-white p-5 rounded-xl flex flex-col items-center justify-center shadow-inner overflow-x-auto">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-2">
                  Governing Formulation (KaTeX)
                </span>
                <div className="text-lg md:text-xl text-white font-mono py-1">
                  <MathRenderer math={data.mathematics.latex_formula} block={true} />
                </div>
              </div>

              {/* Variables Breakdown Table */}
              {data.mathematics.variables && data.mathematics.variables.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-4 w-28">Symbol</th>
                        <th className="py-2.5 px-4">Physical Meaning</th>
                        <th className="py-2.5 px-4 w-36">SI Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
                      {data.mathematics.variables.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-4 font-mono font-medium text-blue-700 whitespace-nowrap">
                            <MathRenderer math={v.symbol} />
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-800">
                            {v.meaning}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-slate-600">
                            {v.si_unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Validity Conditions and Bounds */}
              {data.mathematics.validity_conditions && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-amber-950">Boundary Conditions &amp; Limits: </span>
                    <span>{data.mathematics.validity_conditions}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800 mb-1">Conceptual Relationship Focus</p>
              <p>
                As configured for beginner/general audience level, heavy formal calculus is omitted in favor of proportional physical relationships and direct qualitative intuition.
              </p>
              {data.mathematics.validity_conditions && (
                <p className="text-xs text-slate-500 mt-2">
                  <span className="font-semibold text-slate-700">Operational condition:</span> {data.mathematics.validity_conditions}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
