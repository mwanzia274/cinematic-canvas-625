import { ArrowUpRight, Check, Quote, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import weddingQuote from '@/assets/pixel-wedding-quotation.pdf.asset.json';
import funeralQuote from '@/assets/pixel-funeral-quotation.pdf.asset.json';
import { packages, formatPrice, weddingTerms, funeralTerms } from '@/lib/pixel-packages';

export function PixelOfferings({ onBook }: { onBook: (id: string) => void }) {
  return <>
    <section id="packages" className="studio-container packages-section">
      <div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">Pixel Sounds Media quotations</p><h2 className="section-heading">Coverage for your occasion.</h2></div><p className="text-xs text-muted-foreground max-w-72 leading-6">Prices in Kenyan shillings. Select your package or request a personalised quote.</p></div>
      {[
        { id: 'wedding', title: 'Wedding photography & videography', terms: weddingTerms, document: weddingQuote.url },
        { id: 'funeral', title: 'Funeral livestreaming & photography', terms: funeralTerms, document: funeralQuote.url },
        { id: 'other', title: 'Church, corporate & music', terms: 'Personalised quotations for church services, corporate events and music shoots.', document: null },
      ].map(group => <div key={group.id} className="quotation-group"><div className="quotation-heading"><div><h3>{group.title}</h3><p>{group.terms}</p></div>{group.document && <Button variant="outline" asChild className="text-xs"><a href={group.document} target="_blank" rel="noopener noreferrer"><Download />View quotation PDF</a></Button>}</div><div className="packages-grid">{packages.filter(item => item.group === group.id).map(item => <article key={item.id} className="package-card"><p className="eyebrow text-muted-foreground">{item.category}</p><h3>{item.name}</h3><p className="text-xs text-muted-foreground leading-6">{item.description}</p><div className="package-price">{formatPrice(item.price)}</div><ul>{item.features.map(feature => <li key={feature}><Check className="size-3 text-foreground shrink-0" />{feature}</li>)}</ul><Button variant={item.id === 'wedding-gold' || item.id === 'funeral-premium' ? 'studio' : 'outline'} className="w-full mt-auto h-10 text-xs" onClick={() => onBook(item.id)}>{item.price === null ? 'Request a quote' : 'Request this package'}<ArrowUpRight /></Button></article>)}</div></div>)}
      <p className="text-xs text-muted-foreground leading-6 mt-6">For all enquiries, use 0796 076 364 or 0702 926 220. Some pages of the original PDFs show an older number.</p>
    </section>
    <section id="testimonials" className="testimonials-section"><div className="studio-container"><div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">The kind of experience we aim for</p><h2 className="section-heading">Kind words.</h2></div><p className="text-xs text-muted-foreground">Illustrative testimonials · not actual client reviews</p></div><div className="testimonials-grid">{[
      { name: 'Wedding couple', initial: 'W', quote: 'Every little moment felt beautifully seen. The photos brought us right back to the joy of the day.', service: 'Wedding photography & film' },
      { name: 'Portrait client', initial: 'P', quote: 'A relaxed shoot, thoughtful direction, and portraits that felt like me. The whole experience was effortless.', service: 'Portrait session' },
      { name: 'Brand client', initial: 'B', quote: 'Our vision became a cohesive visual story. Exactly the fresh perspective our brand needed.', service: 'Brand & product imagery' },
    ].map(item => <figure className="testimonial" key={item.name}><Quote className="size-7 text-muted-foreground mb-5" /><blockquote>{item.quote}</blockquote><figcaption><span className="testimonial-avatar">{item.initial}</span><div><p className="text-xs font-semibold">{item.name} <span className="font-normal text-muted-foreground">· Sample</span></p><p className="text-[10px] text-muted-foreground mt-1">{item.service}</p></div></figcaption></figure>)}</div></div></section>
  </>;
}