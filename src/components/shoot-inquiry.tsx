import { useEffect, useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { packages, formatPrice } from '@/lib/pixel-packages';
import { bookingSchema } from '@/lib/booking-schema';
import { submitBooking } from '@/lib/bookings.functions';

export function ShootInquiry({ inspiration }: { inspiration: string }) {
  const sendRequest = useServerFn(submitBooking);
  const [fields, setFields] = useState({ package_id: '', client_name: '', email: '', phone: '', preferred_date: '', preferred_time: 'Flexible', location: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [saved, setSaved] = useState('');
  useEffect(() => { setReference(crypto.randomUUID()); }, []);
  useEffect(() => { if (inspiration) setFields(previous => ({ ...previous, message: `I'm interested in a shoot inspired by ${inspiration}.` })); }, [inspiration]);
  const update = (key: keyof typeof fields, value: string) => setFields(previous => ({ ...previous, [key]: value }));
  const selected = packages.find(item => item.id === fields.package_id);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    const parsed = bookingSchema.safeParse({ ...fields, reference });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Please check your details.'); return; }
    if (!consent) { setError('Please agree that Pixel Sounds Media may contact you about your enquiry.'); return; }
    setBusy(true);
    try {
      const result = await sendRequest({ data: parsed.data });
      if (result.ok) setSaved(result.reference); else setError(result.message);
    } catch { setError('Your enquiry could not be saved. Please try again or contact us on WhatsApp.'); }
    finally { setBusy(false); }
  }
  if (saved) return <div className="inquiry-result" role="status"><Check className="size-7 text-foreground" /><h3 className="font-display text-3xl">Your enquiry is saved.</h3><p>Thank you, {fields.client_name}. Your request for {selected?.name} has been saved with Pixel Sounds Media.</p><p className="text-muted-foreground">This is an enquiry, not a confirmed booking. No date is reserved, payment taken or email sent.</p><div><p className="eyebrow text-muted-foreground">Request reference</p><p className="font-mono text-xs break-all mt-2">{saved}</p></div><Button variant="outline" onClick={() => { setSaved(''); setReference(crypto.randomUUID()); setError(''); setConsent(false); }}>New enquiry <ArrowUpRight /></Button></div>;
  return <form onSubmit={submit} className="shoot-inquiry grid gap-5" aria-label="Shoot enquiry">
    <fieldset disabled={busy} className="grid gap-5">
      <div className="field"><label htmlFor="inquiry-package">Service / package</label><select id="inquiry-package" required value={fields.package_id} onChange={e => update('package_id', e.target.value)}><option value="" disabled>Select a service</option>{packages.map(item => <option key={item.id} value={item.id}>{item.name} · {formatPrice(item.price)}</option>)}</select></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="field"><label htmlFor="inquiry-name">Full name</label><input id="inquiry-name" required minLength={2} maxLength={100} autoComplete="name" value={fields.client_name} onChange={e => update('client_name', e.target.value)} /></div>
        <div className="field"><label htmlFor="inquiry-email">Email address</label><input id="inquiry-email" required type="email" maxLength={255} autoComplete="email" value={fields.email} onChange={e => update('email', e.target.value)} /></div>
        <div className="field"><label htmlFor="inquiry-phone">Phone / WhatsApp</label><input id="inquiry-phone" required type="tel" minLength={7} maxLength={30} autoComplete="tel" value={fields.phone} onChange={e => update('phone', e.target.value)} /></div>
        <div className="field"><label htmlFor="inquiry-date">Preferred date</label><input id="inquiry-date" required type="date" min={new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })} value={fields.preferred_date} onChange={e => update('preferred_date', e.target.value)} /></div>
        <div className="field"><label htmlFor="inquiry-time">Preferred time · Nairobi</label><select id="inquiry-time" value={fields.preferred_time} onChange={e => update('preferred_time', e.target.value)}>{['Morning', 'Afternoon', 'Evening', 'Flexible'].map(time => <option key={time}>{time}</option>)}</select></div>
        <div className="field"><label htmlFor="inquiry-location">Shoot / event location</label><input id="inquiry-location" required minLength={2} maxLength={200} placeholder="Venue, town or area" value={fields.location} onChange={e => update('location', e.target.value)} /></div>
      </div>
      <div className="field"><label htmlFor="inquiry-message">Your shoot brief <span className="text-muted-foreground">(optional)</span></label><textarea id="inquiry-message" rows={4} maxLength={2000} placeholder="Your occasion, creative ideas, coverage or livestream needs…" value={fields.message} onChange={e => update('message', e.target.value)} /></div>
      {selected && <p className="text-xs text-muted-foreground leading-6">{selected.terms}</p>}
      <label className="flex items-start gap-3 text-xs leading-6"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1.5" />I agree that Pixel Sounds Media may contact me about this enquiry. I understand my date is not reserved until confirmed.</label>
    </fieldset>
    {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
    <Button type="submit" variant="studio" disabled={busy} className="justify-self-start">{busy ? <><LoaderCircle className="animate-spin" />Saving enquiry…</> : <>Send shoot enquiry <ArrowUpRight /></>}</Button>
  </form>;
}