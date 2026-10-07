export const FONTFAMILIES = [
  'doto',
  'openSans',
  'josefinSans',
  'georgia',
  'iwona',
  'montserrat',
  'playfairDisplay',
  'quicksand',
  'roboto',
  'kalam',
  'verdana',
  'inter',
  'workSans',
  'calibri',
  'dmSans',
  'neueHelvetica',
  'amazonEmber',
  'abitareSans',
  'poppins',
  'ptSans',
] as const;

export type FontFamilyName = (typeof FONTFAMILIES)[number];

export function getFontFamily(fontIndex?: number | null): FontFamilyName {
  const index = typeof fontIndex === 'number' && fontIndex >= 0 && fontIndex < FONTFAMILIES.length ? fontIndex : 0;
  return FONTFAMILIES[index];
}
