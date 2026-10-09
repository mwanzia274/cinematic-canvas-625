import { describe, it, expect } from 'vitest';
import { bookingSchema } from '@/lib/booking-schema';
const valid = { reference: '60b97c04-141b-4db1-ae23-11e686a0b123', package_id: 'portrait', client_name: 'Test Client', email: 'client@example.com', phone: '+254700000000', preferred_date: '2099-10-15', preferred_time: 'Morning', location: 'Nairobi', message: '' };
describe('Booking validation', () => {
  it('accepts a complete request', () => expect(bookingSchema.safeParse(valid).success).toBe(true));
  it('rejects past and impossible dates', () => { for (const date of ['2020-01-01', '2099-02-30']) expect(bookingSchema.safeParse({ ...valid, preferred_date: date }).success).toBe(false); });
  it('rejects invalid contact and package data', () => { for (const change of [{ email: 'bad' }, { phone: 'abcdefghi' }, { package_id: 'fake' }, { message: 'a'.repeat(2001) }]) expect(bookingSchema.safeParse({ ...valid, ...change }).success).toBe(false); });
});