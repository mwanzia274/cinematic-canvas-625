import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { packages, packageRecommendations, formatPrice } from '@/lib/pixel-packages';

export function PackageRecommendations({ onBook }: { onBook: (id: string) => void }) {
  return <div className="package-recommendations">
    <p className="eyebrow text-muted-foreground mb-3">Our recommendations</p>
    <h3 className="font-display text-3xl mb-6">What are you planning?</h3>
    <Tabs defaultValue="Wedding">
      <TabsList aria-label="Your occasion" className="occasion-tabs">
        {packageRecommendations.map(item => <TabsTrigger key={item.occasion} value={item.occasion}>{item.occasion}</TabsTrigger>)}
      </TabsList>
      {packageRecommendations.map(recommendation => {
        const item = packages.find(option => option.id === recommendation.id);
        if (!item) return null;
        return <TabsContent key={recommendation.occasion} value={recommendation.occasion} className="recommendation-content">
          <div><p className="eyebrow text-muted-foreground mb-3">Suggested starting point</p><h4 className="font-display text-3xl">{item.name}</h4><p className="text-lg font-semibold mt-3">{formatPrice(item.price)}</p><p className="text-sm leading-7 mt-4">{recommendation.reason}</p><p className="text-xs text-muted-foreground leading-6 mt-3">{recommendation.alternative}</p></div>
          <div className="grid gap-5 content-start"><ul className="grid gap-3">{item.features.slice(0, 3).map(feature => <li key={feature} className="flex gap-3 text-xs leading-6"><Check className="size-4 shrink-0 mt-1 text-foreground" />{feature}</li>)}</ul><Button variant="studio" className="justify-self-start" onClick={() => onBook(item.id)}>Enquire about {recommendation.occasion.toLowerCase()} <ArrowUpRight /></Button><p className="text-xs text-muted-foreground leading-6">{item.terms}</p></div>
        </TabsContent>;
      })}
    </Tabs>
  </div>;
}