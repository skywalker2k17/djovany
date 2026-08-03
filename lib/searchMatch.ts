/**
 * Token-based "smart" search: matches when every word of the query is found
 * somewhere in the haystack, regardless of order (e.g. "facebook digital
 * marketing" matches a card whose text contains "Marketing Digital" and
 * "Facebook Ads" even though the words appear in a different order/place).
 */
export function smartMatch(query: string, haystack: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  const text = haystack.toLowerCase();
  return tokens.every((tok) => text.includes(tok));
}
