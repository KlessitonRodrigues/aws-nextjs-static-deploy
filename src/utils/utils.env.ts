import * as fs from 'fs';
import * as path from 'path';

type envVars = Record<string, string>;

type parseEnvLineParams = {
  line: string;
  vars: envVars;
};

const parseEnvLine = (params: parseEnvLineParams): void => {
  const { line, vars } = params;

  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith('#')) return;

  const separatorIndex = trimmed.indexOf('=');

  if (separatorIndex === -1) return;

  const key = trimmed.slice(0, separatorIndex).trim();
  const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

  if (key) vars[key] = value;
};

const loadEnv = (): envVars => {
  const envPath = path.resolve(__dirname, '../../.env');
  const vars: envVars = {};

  if (!fs.existsSync(envPath)) return vars;

  const content = fs.readFileSync(envPath, 'utf8');

  content.split(/\r?\n/).forEach(line => parseEnvLine({ line, vars }));

  return vars;
};

export { loadEnv };
export type { envVars };
