import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, ArrowRight, Play, Menu, X, Camera, Film, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import savannah from "@/assets/savannah.jpg";
import wedding from "@/assets/wedding.jpg";
import portrait from "@/assets/portrait.jpg";
import coast from "@/assets/coast.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Frame Studio — Photography & Videography" },
    { name: "description", content: "Photography with feeling. Films with soul. Discover Frame Studio’s wedding, portrait, and travel visual stories." },
    { property: "og:title", content: "Frame Studio — Photography & Videography" },
    { property: "og:description", content: "Explore beautiful wedding, portrait, and travel stories, captured in photographs and film." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const projects = [
  { title: "A love, like no other", category: "Weddings", medium: "Photography", image: wedding, description: "The quiet glances. The joyful embraces. A celebration of connection, told through intimate, timeless images." },
  { title: "In her own light", category: "Portraits", medium: "Photography", image: portrait, description: "An editorial portrait story about individuality, confidence, and the beauty of being unapologetically yourself." },
  { title: "Where the ocean takes you", category: "Travel", medium: "Film & photography", image: coast, description: "A visual journey along the coast. Salt in the air, unhurried days, and a different perspective on the familiar." },
];

function Index() {
  const [filter, setFilter] = useState("All work");
  const [project, setProject] = useState<number | null>(null);
  const [reel, setReel] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [menu, setMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  const selected = project === null ? null : projects[project];

  function saveBrief(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `PROJECT ENQUIRY\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nDate: ${data.get("date") || "Flexible"}\n\n${data.get("message")}`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url; link.download = "project-enquiry.txt"; link.click();
    URL.revokeObjectURL(url); setSaved(true);
  }

  return <>
    <header className="studio-container studio-header">
      <a href="#" className="wordmark" aria-label="Frame Studio home"><span className="wordmark-symbol" />FRAME<span className="text-[9px] font-medium self-end mb-1">STUDIO</span></a>
      <nav className="desktop-nav flex items-center gap-9 text-[11px] font-medium" aria-label="Main navigation">
        <Button variant="link" asChild className="text-foreground text-[11px] p-0"><a href="#work">Our work</a></Button>
        <Button variant="link" asChild className="text-foreground text-[11px] p-0"><a href="#about">The studio</a></Button>
        <Button variant="link" asChild className="text-foreground text-[11px] p-0"><a href="#services">Services</a></Button>
      </nav>
      <div className="flex items-center gap-2"><Button variant="studio" onClick={() => { setSaved(false); setEnquiry(true); }} className="text-[11px] px-5 h-10">Let’s talk <ArrowUpRight /></Button><Button variant="ghost" size="icon" className="mobile-nav" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
    </header>
    {menu && <nav className="mobile-nav flex-col border-t border-border px-5 py-5 gap-4 text-sm" aria-label="Mobile navigation">{[["Our work", "work"], ["The studio", "about"], ["Services", "services"]].map(([label, id]) => <Button key={id} variant="ghost" asChild><a href={`#${id}`} onClick={() => setMenu(false)}>{label}</a></Button>)}</nav>}
    <main>
      <section className="hero">
        <img src={savannah} alt="Golden sunset over an acacia tree and open savannah" width={1920} height={1024} className="hero-image" fetchPriority="high" />
        <div className="hero-content studio-container reveal">
          <p className="eyebrow flex items-center gap-3"><span className="w-6 h-px bg-hero-foreground/60" />Photography & videography<span className="w-6 h-px bg-hero-foreground/60" /></p>
          <h1 className="hero-title">FRAME STUDIO</h1>
          <p className="hero-subtitle">Life, beautifully captured.</p>
          <p className="hero-copy">For the moments that matter. The stories worth telling.<br />We turn fleeting seconds into something timeless.</p>
          <div className="flex gap-3"><Button variant="studio" size="lg" asChild className="h-11 text-[11px] px-6"><a href="#work">Explore our work <ArrowUpRight /></a></Button><Button variant="glass" size="lg" className="h-11 text-[11px] px-6" onClick={() => setReel(true)}><Play className="size-3" />Watch mood reel</Button></div>
        </div>
        <div className="hero-bottom studio-container"><p className="eyebrow">A different way of seeing.</p><Button variant="glass" size="icon" className="border-0" asChild aria-label="Discover the studio"><a href="#about"><ArrowDown /></a></Button><p className="eyebrow"><span className="status-dot" />Let’s create something</p></div>
      </section>
      <section id="about" className="studio-container intro">
        <h2>More than an image.<br />A feeling that stays with you.</h2>
        <p>We’re a photography and filmmaking studio drawn to real people, honest emotion, and extraordinary light. From your biggest day to your brand’s next chapter, we tell your story with intention.</p>
      </section>
      <section id="work" className="studio-container work-section">
        <div className="work-top"><div><p className="eyebrow text-muted-foreground mb-3">A few stories we’ve told</p><h2 className="section-heading">Selected work<span className="text-primary">.</span></h2></div><div className="flex flex-wrap gap-2" aria-label="Filter projects">{["All work", "Weddings", "Portraits", "Travel"].map(item => <Button key={item} variant="filter" data-active={filter === item} aria-pressed={filter === item} className="text-[10px] h-8 px-4" onClick={() => setFilter(item)}>{item}</Button>)}</div></div>
        <div className="project-grid">{projects.map((item, index) => (filter === "All work" || filter === item.category) && <Button variant="project" key={item.title} className="project-card" onClick={() => setProject(index)} aria-label={`View ${item.title}`}><div className="project-image-wrap"><img src={item.image} alt={item.title} width={1024} height={1280} loading="lazy" /><span className="project-open"><ArrowUpRight /></span></div><div className="project-details"><div><h3>{item.title}</h3><p>{item.category} <span className="mx-2">/</span> {item.medium}</p></div><span className="text-[10px] text-muted-foreground">0{index + 1}</span></div></Button>)}</div>
      </section>
      <section id="services" className="service-section"><div className="studio-container service-grid"><div><p className="eyebrow text-muted-foreground mb-4">What we do</p><h2 className="section-heading">Your story.<br />Our perspective.</h2><p className="text-xs leading-7 text-muted-foreground mt-5 max-w-64">Thoughtfully crafted visuals, from the first conversation to the final frame.</p></div><div>{[
        ["01", "Photography", "Weddings, portraits, events, and brand imagery. Natural moments, a considered eye, and images you’ll keep coming back to.", Camera],
        ["02", "Videography", "Wedding films, brand stories, and documentary journeys. Cinematic storytelling that makes you feel something.", Film],
        ["03", "Creative direction", "An idea brought into focus. Concept development, visual planning, and a cohesive creative vision for your project.", ArrowUpRight],
      ].map(([number, title, text, Icon]) => { const ServiceIcon = Icon as typeof Camera; return <div className="service-row" key={String(number)}><span className="text-[10px] text-muted-foreground mt-1">{String(number)}</span><div><h3>{String(title)}</h3><p>{String(text)}</p></div><ServiceIcon className="size-5" /></div>; })}</div></div></section>
      <section id="contact" className="contact-section studio-container"><p className="eyebrow text-muted-foreground">Every great story starts with a conversation</p><h2>Let’s make something<br /><span className="italic">worth remembering.</span></h2><Button variant="studio" size="lg" className="h-12 text-xs" onClick={() => { setSaved(false); setEnquiry(true); }}>Tell us your story <ArrowUpRight /></Button></section>
    </main>
    <footer className="studio-container studio-footer"><a href="#" className="wordmark text-foreground text-lg"><span className="wordmark-symbol" />FRAME<span className="text-[8px] font-medium">STUDIO</span></a><p>Photography with feeling. Films with soul.</p><p>© 2026 Frame Studio</p></footer>

    <Dialog open={reel} onOpenChange={setReel}><DialogContent className="max-w-4xl"><DialogTitle>Frame Studio — mood reel</DialogTitle><DialogDescription>A visual collection of the studio’s creative direction.</DialogDescription><video controls autoPlay playsInline poster={savannah} className="w-full aspect-video" src="/media/mood-reel.mp4" /><p className="text-xs text-muted-foreground">Concept imagery · Photography montage</p></DialogContent></Dialog>
    <Dialog open={project !== null} onOpenChange={open => { if (!open) setProject(null); }}><DialogContent className="max-w-3xl max-h-[90svh] overflow-y-auto">{selected && <><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.category} / {selected.medium}</DialogDescription><img src={selected.image} alt={selected.title} width={1024} height={1280} className="w-full max-h-[57svh] object-contain" /><div className="flex items-center gap-5"><Button variant="outline" size="icon" aria-label="Previous project" onClick={() => setProject(((project ?? 0) + projects.length - 1) % projects.length)}><ChevronLeft /></Button><p className="text-xs leading-6 flex-1 text-muted-foreground">{selected.description}</p><Button variant="outline" size="icon" aria-label="Next project" onClick={() => setProject(((project ?? 0) + 1) % projects.length)}><ChevronRight /></Button></div></>}</DialogContent></Dialog>
    <Dialog open={enquiry} onOpenChange={setEnquiry}><DialogContent className="max-h-[90svh] overflow-y-auto"><DialogTitle className="font-display text-3xl">Tell us your story.</DialogTitle><DialogDescription>Put your ideas into a project brief.</DialogDescription><form onSubmit={saveBrief} className="grid gap-4"><div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required autoComplete="name" placeholder="Full name" /></div><div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></div><div className="grid grid-cols-2 gap-3"><div className="field"><label htmlFor="service">What do you have in mind?</label><select id="service" name="service"><option>Photography</option><option>Videography</option><option>Photography & film</option><option>Creative direction</option></select></div><div className="field"><label htmlFor="date">Preferred date</label><input id="date" name="date" type="date" /></div></div><div className="field"><label htmlFor="message">A little about your project</label><textarea id="message" name="message" required rows={3} placeholder="The occasion, location, and what you’re imagining…" /></div><Button variant="studio" type="submit" className="h-11"><Download />Save project brief</Button><p role="status" className="text-xs text-muted-foreground leading-5">{saved ? "Your brief has been downloaded. It has not been sent to the studio." : "Enquiries are not being sent yet. You can save your brief to share once studio contact details are added."}</p></form></DialogContent></Dialog>
  </>;
}