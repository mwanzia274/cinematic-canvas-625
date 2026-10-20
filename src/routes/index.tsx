import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, Play, Menu, X, Camera, Film, Radio, Music, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import savannah from "@/assets/savannah.jpg";
import reception from "@/assets/pixel-IMG_6781.jpg.asset.json";
import logo from "@/assets/pixel-logo-lockup.png.asset.json";
import { portfolio } from "@/lib/pixel-portfolio";
import trailer from "@/assets/pixel-trailer-web.mp4.asset.json";
import trailerWebm from "@/assets/pixel-trailer.webm.asset.json";
import trailerPoster from "@/assets/pixel-trailer-poster.jpg.asset.json";
import { ShootInquiry } from "@/components/shoot-inquiry";
import { PixelOfferings } from "@/components/pixel-offerings";
import { BookingDialog } from "@/components/booking-dialog";
import { WhatsAppFloat, WhatsAppButton } from "@/components/whatsapp-button";
import brian from "@/assets/pixel-brian.jpg.asset.json";
import rodgers from "@/assets/pixel-rodgers.jpg.asset.json";
import { useStudioMotion } from "@/hooks/use-studio-motion";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Pixel Sounds Media — Weddings, Livestreaming & Music" },
    { name: "description", content: "Pixel Sounds Media, Nairobi. Wedding photography and videography, funeral, church and corporate livestreaming, and music shoots. Call 0796 076 364 or 0702 926 220." },
    { property: "og:title", content: "Pixel Sounds Media — Weddings, Livestreaming & Music" },
    { property: "og:description", content: "Explore wedding and funeral packages, livestreaming services and music shoots from Pixel Sounds Media in Nairobi." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const projects = portfolio;
const team = [
  { name: "Brian", role: "Lead Director", focus: "Leadership and strategic direction", photo: brian.url, duties: ["Set PSM's vision, goals, and creative standards.", "Lead planning and decision-making.", "Oversee daily operations and project development.", "Ensure every project meets PSM's quality standards."] },
  { name: "Rodgers", role: "Creative Director", focus: "Visual storytelling and artistic direction", photo: rodgers.url, duties: ["Develop concepts for videos, photography, and promotional content.", "Direct shoots and oversee storytelling, composition, and visual style.", "Maintain consistency in PSM's branding and creative identity.", "Review final edits before delivery to clients."] },
];

function Index() {
  useStudioMotion();
  const [filter, setFilter] = useState("All work");
  const [imageIndex, setImageIndex] = useState(0);
  const [inspiration, setInspiration] = useState("");
  const [project, setProject] = useState<number | null>(null);
  const [reel, setReel] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bookingPackage, setBookingPackage] = useState("wedding-gold");
  const book = (id: string) => { setBookingPackage(id); setEnquiry(true); };
  const selected = project === null ? null : projects[project];
  const selectedImage = selected?.images[imageIndex];

  return <>
    <header className="studio-container studio-header">
      <a href="#" className="wordmark" aria-label="Pixel Sounds Media home"><img src={logo.url} alt="Pixel Sounds Media" className="studio-logo-lockup" /></a>
      <nav className="desktop-nav flex items-center gap-9 text-[11px] font-medium" aria-label="Main navigation">
        <Button variant="link" asChild className="text-foreground text-[11px] p-0"><a href="#work">Our work</a></Button>
        <Button variant="link" asChild className="text-foreground text-[11px] p-0"><a href="#about">About us</a></Button>
        <Button variant="link" asChild className="text-foreground text-[11px] p-0"><a href="#packages">Packages</a></Button>
      </nav>
      <div className="flex items-center gap-2"><Button variant="studio" onClick={() => book("wedding-gold")} className="text-[11px] px-5 h-10">Book a shoot <ArrowUpRight /></Button><Button variant="ghost" size="icon" className="mobile-nav" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
    </header>
    {menu && <nav className="mobile-nav flex-col border-t border-border px-5 py-5 gap-4 text-sm" aria-label="Mobile navigation">{[["Our work", "work"], ["About us", "about"], ["Packages", "packages"]].map(([label, id]) => <Button key={id} variant="ghost" asChild><a href={`#${id}`} onClick={() => setMenu(false)}>{label}</a></Button>)}</nav>}
    <main>
      <section className="hero">
        <img src={reception.url} alt="Reception buffet with gold drapery and floral arrangements" width={1920} height={1280} className="hero-image" fetchPriority="high" />
        <div className="hero-content studio-container reveal">
          <p className="eyebrow flex items-center gap-3"><span className="w-6 h-px bg-hero-foreground/60" />Nairobi · Photography · Film · Livestreaming<span className="w-6 h-px bg-hero-foreground/60" /></p>
          <h1 className="hero-title">PIXEL<span className="hero-brand-detail">SOUNDS MEDIA</span></h1>
          <p className="hero-subtitle">Transforming every moment into a masterpiece…</p>
          <p className="hero-copy">Weddings, livestreams and music shoots.<br />Your moments, shared and remembered.</p>
          <div className="flex gap-3"><Button variant="studio" size="lg" asChild className="h-11 text-[11px] px-6"><a href="#work">Explore our work <ArrowUpRight /></a></Button><Button variant="glass" size="lg" className="h-11 text-[11px] px-6" asChild><a href="#film"><Play className="size-3" />Watch trailer</a></Button></div>
        </div>
        <div className="hero-bottom studio-container"><p className="eyebrow">A different way of seeing.</p><Button variant="glass" size="icon" className="border-0" asChild aria-label="Discover the studio"><a href="#about"><ArrowDown /></a></Button><p className="eyebrow"><span className="status-dot" />Let’s create something</p></div>
      </section>
      <section id="about" className="studio-container intro">
        <div><p className="eyebrow text-muted-foreground mb-4">About us · Pixel Sounds Media</p><h2>More than an image.<br />A feeling that stays with you.</h2><Button variant="link" asChild className="px-0 mt-5"><a href="#team">Meet Brian & Rodgers <ArrowDown /></a></Button></div>
        <div className="about-story"><p>We’re Pixel Sounds Media, based in Nairobi, Kenya. We capture wedding stories through photography and film, connect families and audiences through funeral, church and corporate livestreaming, and bring artists’ visions to life through music shoots.</p><p>Brian leads our studio’s vision, planning and creative standards. Rodgers shapes the visual storytelling, directs shoots and reviews the final edits. Together, their focus is on thoughtful images and films that preserve what matters to you.</p><Button variant="outline" asChild className="mt-5"><a href="#contact">Tell us your story <ArrowUpRight /></a></Button></div>
      </section>
      <section id="team" className="studio-container team-section"><p className="eyebrow text-muted-foreground mb-3">The people behind PSM</p><h2 className="section-heading">Meet the team<span className="text-primary">.</span></h2><div className="team-grid">{team.map(m => <article key={m.name} className="team-card"><img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" /><div><h3>{m.name}</h3><p className="team-role">{m.role}</p><p className="team-focus">{m.focus}</p><ul>{m.duties.map(d => <li key={d}>{d}</li>)}</ul></div></article>)}</div></section>
      <section id="work" className="studio-container work-section">
        <div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">Moments, people & details</p><h2 className="section-heading">Selected work<span className="text-primary">.</span></h2></div><div className="flex flex-wrap gap-2" aria-label="Filter projects">{["All work", "Livestreaming", "Events", "Details"].map(item => <Button key={item} variant="filter" data-active={filter === item} aria-pressed={filter === item} className="text-[10px] h-8 px-4" onClick={() => setFilter(item)}>{item}</Button>)}</div></div>
        <p className="text-xs text-muted-foreground mb-6">Photo collections · Event and client names are not published.</p>
        <div className="project-grid">{projects.map((item, index) => (filter === "All work" || filter === item.category) && <Button variant="project" key={item.id} className="project-card h-auto" onClick={() => { setProject(index); setImageIndex(0); }} aria-label={`View ${item.title}`}><div className="project-image-wrap"><img src={item.images[0].src} alt={item.images[0].caption} width={item.images[0].width} height={item.images[0].height} loading="lazy" /><span className="project-open"><ArrowUpRight /></span></div><div className="project-details"><div><h3>{item.title}</h3><p>{item.category} <span className="mx-2">/</span> {item.images.length} {item.images.length === 1 ? "image" : "images"}</p></div><span className="text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div></Button>)}</div>
      </section>
      <section id="film" className="studio-container film-section"><div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">Pixel Sounds Media · Film</p><h2 className="section-heading">Event trailer<span className="text-primary">.</span></h2></div><Button variant="link" onClick={() => setReel(true)}>Watch concept mood reel <Play /></Button></div><video controls playsInline preload="metadata" poster={trailerPoster.url} className="w-full aspect-video" aria-label="Pixel Sounds Media event trailer"><source src={trailerWebm.url} type="video/webm" /><source src={trailer.url} type="video/mp4" /></video><div className="flex flex-wrap items-center justify-between gap-4 mt-5"><p className="text-xs text-muted-foreground">Event videography · 1 min 46 sec</p><Button variant="studio" asChild><a href="#contact" onClick={() => setInspiration("the event trailer")}>Enquire about event coverage <ArrowUpRight /></a></Button></div></section>
      <section id="services" className="service-section"><div className="studio-container service-grid"><div><p className="eyebrow text-muted-foreground mb-4">What we do</p><h2 className="section-heading">Your story.<br />Our perspective.</h2><p className="text-xs leading-7 text-muted-foreground mt-5 max-w-64">Thoughtfully crafted visuals, from the first conversation to the final frame.</p></div><div>{[
        ["01", "Livestreaming", "Funerals, church services and corporate events. Respectful, professional coverage that connects your audience wherever they are.", Radio],
        ["02", "Wedding photography & videography", "Gold, Silver and Bronze packages combining wedding photography, cinematic films, photobooks and printed memories.", Camera],
        ["03", "Music shoots", "Photography and music video enquiries built around your sound and creative vision. Contact us for a personalised production quotation.", Music],
      ].map(([number, title, text, Icon]) => { const ServiceIcon = Icon as typeof Camera; return <div className="service-row" key={String(number)}><span className="text-[10px] text-muted-foreground mt-1">{String(number)}</span><div><h3>{String(title)}</h3><p>{String(text)}</p></div><ServiceIcon className="size-5" /></div>; })}</div></div></section>
      <PixelOfferings onBook={book} />
      <section id="contact" className="studio-container contact-section inquiry-section"><div className="inquiry-layout"><div className="inquiry-intro"><p className="eyebrow text-muted-foreground">Start a conversation</p><h2>Shoot enquiry<span className="text-primary">.</span></h2><p className="text-sm text-muted-foreground leading-7 mb-6">Weddings, livestreaming & music shoots.<br />Nairobi, Kenya.</p><div className="contact-links"><Button variant="link" asChild><a href="mailto:pixelsoundsmedia01@gmail.com"><Mail />pixelsoundsmedia01@gmail.com</a></Button><div><Button variant="link" asChild><a href="tel:+254796076364"><Phone />0796 076 364</a></Button><Button variant="link" asChild><a href="tel:+254702926220"><Phone />0702 926 220</a></Button></div></div><WhatsAppButton className="h-12 text-xs px-6" /></div><ShootInquiry inspiration={inspiration} /></div></section>
    </main>
    <footer className="studio-container studio-footer"><a href="#" className="wordmark text-foreground text-lg"><img src={logo.url} alt="Pixel Sounds Media" className="studio-logo-lockup studio-logo-lockup--footer" /></a><p>Photography with feeling. Films with soul.</p><p>© 2026 Pixel Sounds Media</p></footer>

    <WhatsAppFloat />
    <Dialog open={reel} onOpenChange={setReel}><DialogContent className="max-w-4xl"><DialogTitle>Pixel Sounds Media — mood reel</DialogTitle><DialogDescription>A visual collection of the studio’s creative direction.</DialogDescription><video controls autoPlay playsInline poster={savannah} className="w-full aspect-video"><source src="/media/mood-reel.webm" type="video/webm" /><source src="/media/mood-reel.mp4" type="video/mp4" /></video><p className="text-xs text-muted-foreground">Concept imagery · Photography montage</p></DialogContent></Dialog>
    <Dialog open={project !== null} onOpenChange={open => { if (!open) setProject(null); }}><DialogContent className="max-w-3xl max-h-[90svh] overflow-y-auto">{selected && selectedImage && <><DialogTitle className="font-display text-3xl">{selected.title}</DialogTitle><DialogDescription>{selected.category} / {selected.medium}</DialogDescription><img src={selectedImage.src} alt={selectedImage.caption} width={selectedImage.width} height={selectedImage.height} className="w-full max-h-[45svh] object-contain" /><div className="flex items-center justify-between gap-4"><Button variant="outline" size="icon" aria-label="Previous photo" disabled={selected.images.length < 2} onClick={() => setImageIndex((imageIndex + selected.images.length - 1) % selected.images.length)}><ChevronLeft /></Button><p className="text-xs text-muted-foreground text-center">{selectedImage.caption}<span className="block mt-2">{imageIndex + 1} / {selected.images.length}</span></p><Button variant="outline" size="icon" aria-label="Next photo" disabled={selected.images.length < 2} onClick={() => setImageIndex((imageIndex + 1) % selected.images.length)}><ChevronRight /></Button></div><p className="text-sm leading-7">{selected.summary}</p><dl className="project-facts"><div><dt>Collection</dt><dd>{selected.images.length} supplied {selected.images.length === 1 ? "image" : "images"}</dd></div><div><dt>Visual focus</dt><dd>{selected.focus}</dd></div></dl><Button variant="studio" asChild><a href="#contact" onClick={() => { setInspiration(selected.title); setProject(null); }}>Enquire about a similar shoot <ArrowUpRight /></a></Button></>}</DialogContent></Dialog>
    <BookingDialog open={enquiry} onOpenChange={setEnquiry} initialPackage={bookingPackage} />
  </>;
}