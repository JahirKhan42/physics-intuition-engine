import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import generateHandler from './api/generate';
import presetsHandler from './api/presets/index';
import presetDetailHandler from './api/presets/[name]';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Forward API requests to the Vercel-compatible serverless handlers
app.all('/api/generate', (req: Request, res: Response) => {
  return generateHandler(req as any, res as any);
});

app.all('/api/presets', (req: Request, res: Response) => {
  return presetsHandler(req as any, res as any);
});

app.all('/api/presets/:name', (req: Request, res: Response) => {
  req.query = { ...req.query, name: req.params.name };
  return presetDetailHandler(req as any, res as any);
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
    console.log(`Physics Intuition Engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
