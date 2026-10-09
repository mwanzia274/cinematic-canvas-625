import { useEffect, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, ArrowLeft, Check, CalendarDays, LoaderCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { packages, formatPrice } from '@/lib/pixel-packages';
import { bookingSchema } from '@/lib/booking-schema';
import { submitBooking } from '@/lib/bookings.functions';

export function BookingDialog({ open, onOpenChange, initialPackage }: { open: boolean; onOpenChange: (open: boolean) => void; initialPackage: string }) {
  const sendBooking = useServerFn(submitBooking);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [fields, setFields] = useState({ package_id: 'portrait', client_name: '', email: '', phone: '', preferred_date: '', preferred_time: 'Flexible', location: 'Nairobi', message: '' });
  useEffect(() => { if (open) { setStep(0); setError(''); setReference(crypto.randomUUID()); setFields({ package_id: initialPackage, client_name: '', email: '', phone: '', preferred_date: '', preferred_time: 'Flexible', location: 'Nairobi', message: '' }); } }, [open, initialPackage]);
  const selected = packages.find(item => item.id === fields.package_id) ?? packages[0];
  const update = (key: keyof typeof fields, value: string) => setFields(previous => ({ ...previous, [key]: value }));
  async function next(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    if (step === 0) { setStep(1); return; }
    const result = bookingSchema.safeParse({ ...fields, reference });
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Please check your details.'); return; }
    if (step === 1) { setStep(2); return; }
    setBusy(true);
    try {
      const response = await sendBooking({ data: result.data });
      if (!response.ok) setError(response.message); else setStep(3);
    } catch { setError('We couldn’t save your request. Check your connection and try again.'); }
    finally { setBusy(false); }
  }
  function download() {
    const text = `PIXEL BOOKING REQUEST\nReference: ${reference}\nStatus: Requested (not confirmed)\nPackage: ${selected.name}\nIndicative price: ${formatPrice(selected.price)}\nDate: ${fields.preferred_date}\nTime: ${fields.preferred_time}\nLocation: ${fields.location}\nName: ${fields.client_name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nNotes: ${fields.message}`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const link = document.createElement('a'); link.href = url; link.download = 'pixel-booking-request.txt'; link.click(); URL.revokeObjectURL(url);
  }
  return <Dialog open={open} onOpenChange={value => { if (!busy) onOpenChange(value); }}><DialogContent className="booking-dialog max-w-2xl max-h-[90svh] overflow-y-auto"><DialogTitle className="font-display text-3xl">{step === 3 ? 'Your story starts here.' : 'Let’s plan your shoot.'}</DialogTitle><DialogDescription>{step === 3 ? 'Your booking request has been saved with Pixel.' : 'Choose a package, share the details, and send a booking request.'}</DialogDescription>
    {step < 3 ? <><ol className="booking-steps">{['Your package', 'The details', 'Review & send'].map((label, index) => <li key={label} data-active={step === index}><span>{step > index ? <Check className="size-3" /> : index + 1}</span>{label}</li>)}</ol><form onSubmit={next} className="grid gap-5">
      {step === 0 && <><div className="booking-package-grid">{packages.map(item => <Button key={item.id} variant="filter" data-active={item.id === fields.package_id} aria-pressed={item.id === fields.package_id} className="booking-package-option" onClick={() => update('package_id', item.id)}><span>{item.name}</span><span className="text-xs font-normal">{formatPrice(item.price)}</span></Button>)}</div><p className="text-xs text-muted-foreground leading-6">Sample pricing. Your final quote and date are subject to agreement; no payment is collected here.</p><ul className="text-xs grid gap-2">{selected.features.map(item => <li className="flex gap-2" key={item}><Check className="size-3" />{item}</li>)}</ul></>}
      {step === 1 && <><div className="grid sm:grid-cols-2 gap-4"><div className="field"><label htmlFor="booking-name">Full name</label><input id="booking-name" required minLength={2} maxLength={100} autoComplete="name" value={fields.client_name} onChange={e => update('client_name', e.target.value)} /></div><div className="field"><label htmlFor="booking-email">Email address</label><input id="booking-email" required type="email" maxLength={255} autoComplete="email" value={fields.email} onChange={e => update('email', e.target.value)} /></div><div className="field"><label htmlFor="booking-phone">Phone / WhatsApp</label><input id="booking-phone" required type="tel" minLength={7} maxLength={30} autoComplete="tel" placeholder="+254 …" value={fields.phone} onChange={e => update('phone', e.target.value)} /></div><div className="field"><label htmlFor="booking-date">Preferred date</label><input id="booking-date" required type="date" min={new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })} value={fields.preferred_date} onChange={e => update('preferred_date', e.target.value)} /></div><div className="field"><label htmlFor="booking-time">Preferred time · Nairobi</label><select id="booking-time" value={fields.preferred_time} onChange={e => update('preferred_time', e.target.value)}>{['Morning','Afternoon','Evening','Flexible'].map(item => <option key={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="booking-location">Shoot location</label><input id="booking-location" required minLength={2} maxLength={200} value={fields.location} onChange={e => update('location', e.target.value)} /></div></div><div className="field"><label htmlFor="booking-message">Tell us a little more <span className="text-muted-foreground">(optional)</span></label><textarea id="booking-message" rows={3} maxLength={2000} value={fields.message} onChange={e => update('message', e.target.value)} placeholder="Your occasion, ideas, or anything we should know…" /></div></>}
      {step === 2 && <><dl className="booking-summary">{[['Package', selected.name], ['Indicative price', formatPrice(selected.price)], ['Date & time', `${fields.preferred_date} · ${fields.preferred_time}`], ['Location', fields.location], ['Name', fields.client_name], ['Email', fields.email], ['Phone', fields.phone], ['Notes', fields.message || '—']].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><label className="flex items-start gap-3 text-xs leading-6"><input type="checkbox" required className="mt-1.5" />I agree that Pixel may contact me about this request. I understand my date is not reserved until the studio confirms it.</label></>}
      {error && <p role="alert" className="text-destructive text-xs">{error}</p>}<div className="flex justify-between gap-3 border-t border-border pt-5">{step > 0 ? <Button type="button" variant="ghost" disabled={busy} onClick={() => { setStep(step - 1); setError(''); }}><ArrowLeft />Back</Button> : <span />}<Button variant="studio" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="animate-spin" />Saving request…</> : <>{step === 2 ? 'Send booking request' : step === 1 ? 'Review request' : 'Continue'}<ArrowRight /></>}</Button></div>
    </form></> : <div className="py-3 grid gap-5"><span className="booking-success-icon"><CalendarDays /></span><p className="text-sm leading-7">Thanks, {fields.client_name}. Your request for <strong>{selected.name}</strong> on <strong>{fields.preferred_date}</strong> has been received.</p><p className="text-xs text-muted-foreground leading-6">Your date is not reserved yet. Pixel must confirm availability and the final quote. No payment has been taken and no email confirmation has been sent.</p><div className="text-xs border-y border-border py-4 break-all"><span className="text-muted-foreground">Request reference</span><p className="mt-2 font-mono">{reference}</p></div><div className="flex flex-wrap gap-3"><Button variant="outline" onClick={download}><Download />Download request</Button><Button variant="studio" onClick={() => onOpenChange(false)}>Done<Check /></Button></div></div>}
  </DialogContent></Dialog>;
}