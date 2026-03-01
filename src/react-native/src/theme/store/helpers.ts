/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepMerge = <T>(base: T, partial: Partial<T>): T => {
  if (partial === base) return base;

  if (!partial) return base;
  if (!base) return partial as T;
  if (typeof partial !== 'object' || partial === null) return partial as T;

  let mutated = false;
  const result: any = Array.isArray(base) ? [...base] : { ...base };

  for (const key in partial) {
    const p = (partial as any)[key];
    const b = (base as any)[key];

    if (p === b) continue;

    if (
      p &&
      b &&
      typeof p === 'object' &&
      typeof b === 'object' &&
      !Array.isArray(p) &&
      !Array.isArray(b)
    ) {
      const merged = deepMerge(b, p);

      if (merged !== b) {
        result[key] = merged;
        mutated = true;
      }
    } else {
      result[key] = p;
      mutated = true;
    }
  }
  return mutated ? (result as T) : base;
};
