import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { bookingSchema } from './booking-schema';
import type { Database } from '@/integrations/supabase/types';

export const submitBooking = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) return { ok: false as const, message: 'Booking requests are temporarily unavailable. Please try again later.' };
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from('booking_requests').insert(data);
    // A retry with the same random reference is idempotent; no private rows are read.
    if (error && error.code !== '23505') return { ok: false as const, message: 'We couldn’t save your request. Please try again.' };
    return { ok: true as const, reference: data.reference };
  });