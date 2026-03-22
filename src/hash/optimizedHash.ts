import { BaseStyleContext } from "../core/types";

/**
 * Props explicitly excluded from the style cache hash.
 *
 * - children: can be long strings or React elements, and style functions
 *   should never depend on children content.
 * - key/ref: React internals, not relevant to style computation.
 */
const HASH_EXCLUDED_PROPS = new Set(['children', 'key', 'ref']);

export function optimizedHash<P extends object>(
  ctx: BaseStyleContext<P>,
): string {
  let hash = `${ctx?.platform ?? 'default'}`;

  const props = ctx.props as Record<string, unknown>;

  for (const key in props) {
    if (HASH_EXCLUDED_PROPS.has(key)) continue;

    const val = props[key];
    if (
      val !== undefined &&
      val !== null &&
      (typeof val === 'string' ||
        typeof val === 'number' ||
        typeof val === 'boolean')
    ) {
      hash += `|${key}:${val}`;
    }
  }

  return hash;
}