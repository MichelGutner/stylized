import { BaseStyleContext } from "../core/types";

const STYLE_HASH_PROPS = [
  'variant',
  'size',
  'type',
  'active',
  'disabled',
  'focused',
  'selected',
] as const;

export function optimizedHash<P extends object>(
  ctx: BaseStyleContext<P>,
): string {
  let hash = `${ctx?.platform ?? 'default'}-theme`;

  const props = ctx.props;

  for (let i = 0; i < STYLE_HASH_PROPS.length; i++) {
    const key = STYLE_HASH_PROPS[i];
    const val = props[key];
    if (
      val !== undefined &&
      (typeof val === 'string' ||
        typeof val === 'number' ||
        typeof val === 'boolean')
    ) {
      hash += `|${key}:${val}`;
    }
  }

  return hash;
}