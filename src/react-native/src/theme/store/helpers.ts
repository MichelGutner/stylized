export const deepMerge = <T>(base: T, partial: Partial<T>): T => {
  const result = { ...base };

  for (const key in partial) {
    if (
      partial[key] &&
      typeof partial[key] === 'object' &&
      !Array.isArray(partial[key])
    ) {
      result[key] = deepMerge(result[key], partial[key]);
    } else {
      result[key] = partial[key];
    }
  }
  return result;
};
