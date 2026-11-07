import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      // Clean up common LaTeX wrapping like \[ ... \] or $$ ... $$ if passed
      let cleanMath = math.trim();
      if (cleanMath.startsWith('$$') && cleanMath.endsWith('$$')) {
        cleanMath = cleanMath.slice(2, -2).trim();
      } else if (cleanMath.startsWith('\\[') && cleanMath.endsWith('\\]')) {
        cleanMath = cleanMath.slice(2, -2).trim();
      } else if (cleanMath.startsWith('$') && cleanMath.endsWith('$') && cleanMath.length > 2) {
        cleanMath = cleanMath.slice(1, -1).trim();
      }

      return katex.renderToString(cleanMath, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return `<code class="text-rose-600 bg-rose-50 px-2 py-1 rounded text-sm">${math}</code>`;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-wrapper ${block ? 'block text-center my-2 overflow-x-auto py-2' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * TextWithMath: Parses a string containing inline $...$ or $$...$$ math and renders text + KaTeX
 */
export const TextWithMath: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts = useMemo(() => {
    if (!text) return [];

    // Match $$...$$ (display) or $...$ (inline)
    const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g;
    const tokens = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      const raw = match[0];
      if (raw.startsWith('$$')) {
        tokens.push({ type: 'blockMath', content: raw.slice(2, -2) });
      } else {
        tokens.push({ type: 'inlineMath', content: raw.slice(1, -1) });
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push({ type: 'text', content: text.substring(lastIndex) });
    }

    return tokens;
  }, [text]);

  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.type === 'blockMath') {
          return <MathRenderer key={i} math={p.content} block={true} />;
        }
        if (p.type === 'inlineMath') {
          return <MathRenderer key={i} math={p.content} block={false} />;
        }
        return <span key={i}>{p.content}</span>;
      })}
    </span>
  );
};
