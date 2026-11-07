import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, Atom } from 'lucide-react';

export const DisclaimerFooter: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200/80 bg-white/70 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Required Permanent Educational Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800 mr-1.5">Educational Notice:</span>
            This is an AI-generated pedagogical draft. Formulas, boundary conditions, and regional terminology should be verified against standard textbooks and curricula (e.g., NCERT, WBBSE/WBCHSE, or university references) before publishing or classroom instruction.
          </div>
        </div>

        {/* System & Architecture Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-slate-600">Physics Intuition &amp; Analogy Engine</span>
            <span>&bull;</span>
            <span>Anti-Classical Modern Physics Guardrails Active</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Classes 9–12 &amp; Undergrad</span>
            </span>
            <span>&bull;</span>
            <span>Multilingual Dual-Glossary (English, বাংলা, हिन्दी)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
