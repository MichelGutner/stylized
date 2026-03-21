import { BaseStyleContext } from "../core/types";

export function optimizedHash<P extends object>(
  ctx: BaseStyleContext<P>,
): string {
  const platform = ctx?.platform ?? 'default';
  const props = ctx?.props ?? ({} as Record<string, any>);

  let hash = `${platform}`;

  const seen = new WeakSet();

  const serialize = (val: any, depth = 0): string => {
    if (val === null || val === undefined) return '';

    const type = typeof val;

    if (type === 'string' || type === 'number' || type === 'boolean') {
      return String(val);
    }

    if (type === 'function') {
      return 'fn';
    }

    if (Array.isArray(val)) {
      if (depth > 1) return 'arr';
      return `[${val.map(v => serialize(v, depth + 1)).join(',')}]`;
    }

    if (type === 'object') {
      if (seen.has(val)) return 'circular';
      seen.add(val);

      // 🔥 LIMITA PROFUNDIDADE (evita stack overflow)
      if (depth > 1) return 'obj';

      const keys = Object.keys(val).sort();

      return `{${keys
        .slice(0, 10) // 🔥 limita tamanho
        .map(k => `${k}:${serialize(val[k], depth + 1)}`)
        .join(',')}}`;
    }

    return '';
  };

  const keys = Object.keys(props).sort();

  for (const key of keys) {
    const val = props[key];

    if (val === undefined) continue;

    hash += `|${key}:${serialize(val)}`;
  }

  return hash;
}