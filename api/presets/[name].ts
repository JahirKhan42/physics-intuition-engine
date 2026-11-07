import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SAMPLE_PRESETS, findPresetOrFuzzyMatch } from '../../src/data/samplePresets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const rawName = (req.query.name as string) || ((req as any).params?.name as string);

  if (!rawName) {
    res.status(400).json({ error: 'Preset name is required' });
    return;
  }

  const decodedName = decodeURIComponent(rawName);
  const matched = SAMPLE_PRESETS[decodedName] || findPresetOrFuzzyMatch(decodedName);

  if (matched) {
    res.status(200).json(matched);
  } else {
    res.status(404).json({ error: 'Preset not found' });
  }
}
