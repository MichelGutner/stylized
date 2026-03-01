import { StyleContext } from "../react-native/src/engine/types";

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
  ctx: StyleContext<P>,
): string {
  const themeId = (ctx.theme as any)?.id ?? 'theme';
  let hash = `${ctx.platform}-${themeId}`;

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