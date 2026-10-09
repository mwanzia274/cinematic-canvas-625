import { ArrowUpRight, Check, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { packages, formatPrice } from '@/lib/pixel-packages';

export function PixelOfferings({ onBook }: { onBook: (id: string) => void }) {
  return <>
    <section id="packages" className="studio-container packages-section">
      <div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">Find your perfect fit</p><h2 className="section-heading">Made for your moment.</h2></div><p className="text-xs text-muted-foreground max-w-72 leading-6">Sample packages & indicative prices in Kenyan shillings. Final scope and pricing are agreed before confirmation.</p></div>
      <div className="packages-grid">{packages.map(item => <article key={item.id} className="package-card"><p className="eyebrow text-muted-foreground">{item.category}</p><h3>{item.name}</h3><p className="text-xs text-muted-foreground leading-6">{item.description}</p><div className="package-price">{formatPrice(item.price)}{item.price !== null && <span className="text-xs font-normal text-muted-foreground ml-2">from</span>}</div><ul>{item.features.map(feature => <li key={feature}><Check className="size-3 text-foreground shrink-0" />{feature}</li>)}</ul><Button variant={item.id === 'wedding' ? 'studio' : 'outline'} className="w-full mt-auto h-10 text-xs" onClick={() => onBook(item.id)}>Request {item.id === 'custom' ? 'a custom quote' : 'this package'}<ArrowUpRight /></Button></article>)}</div>
    </section>
    <section id="testimonials" className="testimonials-section"><div className="studio-container"><div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">The kind of experience we aim for</p><h2 className="section-heading">Kind words.</h2></div><p className="text-xs text-muted-foreground">Illustrative testimonials · not actual client reviews</p></div><div className="testimonials-grid">{[
      { name: 'Wedding couple', initial: 'W', quote: 'Every little moment felt beautifully seen. The photos brought us right back to the joy of the day.', service: 'Wedding photography & film' },
      { name: 'Portrait client', initial: 'P', quote: 'A relaxed shoot, thoughtful direction, and portraits that felt like me. The whole experience was effortless.', service: 'Portrait session' },
      { name: 'Brand client', initial: 'B', quote: 'Our vision became a cohesive visual story. Exactly the fresh perspective our brand needed.', service: 'Brand & product imagery' },
    ].map(item => <figure className="testimonial" key={item.name}><Quote className="size-7 text-muted-foreground mb-5" /><blockquote>{item.quote}</blockquote><figcaption><span className="testimonial-avatar">{item.initial}</span><div><p className="text-xs font-semibold">{item.name} <span className="font-normal text-muted-foreground">· Sample</span></p><p className="text-[10px] text-muted-foreground mt-1">{item.service}</p></div></figcaption></figure>)}</div></div></section>
  </>;
}