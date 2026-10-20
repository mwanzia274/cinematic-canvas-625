import { describe, expect, it } from 'vitest';
import { packages, packageRecommendations } from '@/lib/pixel-packages';

describe('Recommended package pricing', () => {
  it('keeps the supplied wedding quotation prices', () => {
    expect(packages.filter(item => item.group === 'wedding').map(item => item.price)).toEqual([85000, 68000, 45000]);
  });
  it('keeps the supplied funeral quotation prices', () => {
    expect(packages.filter(item => item.group === 'funeral').map(item => item.price)).toEqual([78000, 55000, 15000]);
  });
  it('does not invent church, corporate or music prices', () => {
    expect(packages.filter(item => item.group === 'other').map(item => item.price)).toEqual([null, null, null]);
  });
  it('only recommends packages supported by the shared booking catalog', () => {
    for (const recommendation of packageRecommendations) {
      expect(packages.some(item => item.id === recommendation.id)).toBe(true);
    }
  });
});