import { z } from 'zod';
import { packageIds } from './pixel-packages';
export const bookingSchema = z.object({
  reference: z.string().uuid(),
  package_id: z.enum(packageIds),
  client_name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  email: z.string().trim().email('Please enter a valid email.').max(255),
  phone: z.string().trim().min(7, 'Please enter a phone number.').max(30).regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number.'),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' });
  }, 'Please choose today or a future date.'),
  preferred_time: z.enum(['Morning', 'Afternoon', 'Evening', 'Flexible']),
  location: z.string().trim().min(2, 'Please add your shoot location.').max(200),
  message: z.string().trim().max(2000),
});
export type BookingInput = z.infer<typeof bookingSchema>;