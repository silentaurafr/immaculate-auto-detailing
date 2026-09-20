import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Clock3,
  Droplets,
  Facebook,
  Gem,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Minus,
  PanelTop,
  Phone,
  Plus,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const images = {
  hero: "https://files.manuscdn.com/search-media/310519663968322167/HxZj19SWSg5kwxeZ8NbsZH/Syqy8Q9ZKJZccKwrqcgcfH.webp",
  heroAlt: "https://files.manuscdn.com/search-media/310519663968322167/HxZj19SWSg5kwxeZ8NbsZH/iaWJYyyDoPUdqNCpnA7NN4.jpg",
  application: "https://files.manuscdn.com/search-media/310519663968322167/HxZj19SWSg5kwxeZ8NbsZH/zmR4mnCKyts7gfpJDrNaQd.jpg",
  interior: "https://files.manuscdn.com/search-media/310519663968322167/HxZj19SWSg5kwxeZ8NbsZH/oEt3yLDb2q6t5kmJFzBnHe.jpg",
  detail: "https://files.manuscdn.com/search-media/310519663968322167/HxZj19SWSg5kwxeZ8NbsZH/oeUH8X4xTTDBMDELM8wiCi.jpg",
  interiorAlt: "https://files.manuscdn.com/search-media/310519663968322167/HxZj19SWSg5kwxeZ8NbsZH/4Wzbk9oURq6M9nCdfg8HNE.jpg",
};

const services = [
  {
    number: "01",
    icon: Sparkles,
    title: "Ceramic Coating",
    text: "A high-gloss protective finish designed to keep your vehicle looking composed between details.",
    image: images.application,
    anchor: "coating",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Paint Correction",
    text: "A measured approach to refining the paint surface and bringing clarity back to the finish.",
    image: images.heroAlt,
    anchor: "correction",
  },
  {
    number: "03",
    icon: PanelTop,
    title: "Interior Detail",
    text: "A considered reset for the cabin — surfaces, materials, and the details you feel every drive.",
    image: images.interior,
    anchor: "detail",
  },
  {
    number: "04",
    icon: CarFront,
    title: "Full Detail",
    text: "A complete inside-and-out service for owners who want the full Immaculate treatment.",
    image: images.detail,
    anchor: "detail",
  },
];

type PackageTab = "ceramic" | "detail" | "correction";

const packages: Record<PackageTab, Array<{ name: string; price: string; detail: string; description: string; features: string[]; featured?: boolean }>> = {
  ceramic: [
    { name: "Essential Ceramic", price: "$450", detail: "starting at", description: "A focused ceramic finish for a vehicle that is already in good condition.", features: ["Paint preparation", "Ceramic coating application", "Glass-like finish"] },
    { name: "Premium Ceramic", price: "$799", detail: "starting at", description: "Our most complete ceramic pathway for a deeper, more considered finish.", features: ["Paint preparation", "Paint enhancement", "Premium ceramic coating", "Finishing inspection"], featured: true },
  ],
  detail: [
    { name: "Maintenance Detail", price: "$149", detail: "starting at", description: "A composed reset for vehicles that are already kept in rotation.", features: ["Exterior refresh", "Interior touch-up", "Finish check"] },
    { name: "Full Interior Detail", price: "$249", detail: "starting at", description: "A deeper cabin-focused service for the spaces you spend time in.", features: ["Interior surfaces", "Material care", "Detail-focused finish"] },
    { name: "Full Detail", price: "$349", detail: "starting at", description: "A complete interior and exterior service for a total refresh.", features: ["Interior detail", "Exterior detail", "Finishing pass"] },
  ],
  correction: [
    { name: "Paint Correction", price: "$499", detail: "starting at", description: "A refined paint correction service built around clarity and gloss.", features: ["Surface assessment", "Paint correction", "Gloss refinement"], featured: true },
  ],
};

const gallery = [
  { src: images.heroAlt, label: "Refined paintwork", position: "top" },
  { src: images.application, label: "Ceramic application", position: "center" },
  { src: images.interior, label: "Interior restoration", position: "center" },
  { src: images.detail, label: "Gloss, in full", position: "center" },
  { src: images.interiorAlt, label: "Material detail", position: "center" },
];

const faqs = [
  { q: "Which service is right for my vehicle?", a: "Start with the service that matches your goal: a maintenance or full detail for a reset, paint correction for finish refinement, or ceramic coating for a more protective finish. Use the form below and we can help you narrow it down." },
  { q: "How do I request a quote?", a: "Complete the booking form with your vehicle, requested service, and preferred date. You can also call the studio directly at +1 725-326-7492." },
  { q: "Do you offer ceramic coating?", a: "Yes. The site currently shows Essential Ceramic starting at $450 and Premium Ceramic starting at $799. Final pricing is confirmed after the vehicle and desired finish are reviewed." },
  { q: "Where are you located?", a: "Immaculate Auto Detailing And Ceramic Coating – Southern Highlands is located at 213 Yellow Sky St, Las Vegas, NV 89145." },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PackageTab>("ceramic");
  const [beforePosition, setBeforePosition] = useState(54);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" onClick={() => scrollTo("top")} aria-label="Immaculate home">
            <span className="brand-mark" aria-hidden="true"><CircleDot size={19} strokeWidth={1.3} /><span /></span>
            <span className="brand-copy"><strong>IMMACULATE</strong><em>AUTO DETAILING</em></span>
          </a>
          <nav className={`desktop-nav ${mobileMenuOpen ? "mobile-open" : ""}`} aria-label="Primary navigation">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("coating")}>Ceramic Coating</button>
            <button onClick={() => scrollTo("gallery")}>Gallery</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
          </nav>
          <div className="header-actions">
            <a className="header-phone" href="tel:+17253267492"><Phone size={15} /> <span>+1 725 326 7492</span></a>
            <button className="button button-gold button-small" onClick={() => scrollTo("booking")}>Book your detail <ArrowUpRight size={16} /></button>
            <button className="menu-toggle" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-media" style={{ backgroundImage: `url(${images.hero})` }} />
          <div className="hero-overlay" />
          <div className="hero-grain" />
          <div className="hero-content container">
            <p className="eyebrow hero-eyebrow reveal">Southern Highlands · Las Vegas</p>
            <h1 className="hero-title reveal reveal-delay-1">Your vehicle.<br /><span>Immaculate.</span></h1>
            <p className="hero-description reveal reveal-delay-2">Premium detailing, paint correction, and ceramic coating for vehicles that deserve a second look.</p>
            <div className="hero-actions reveal reveal-delay-3">
              <button className="button button-gold" onClick={() => scrollTo("booking")}>Book your detail <ArrowUpRight size={17} /></button>
              <button className="text-link light" onClick={() => scrollTo("services")}>Explore services <ArrowDownRight size={17} /></button>
            </div>
          </div>
          <div className="hero-meta container reveal reveal-delay-3">
            <span>01 <i /> 04</span>
            <span className="scroll-cue"><span className="scroll-line" /> Scroll to explore</span>
            <span className="hero-location"><MapPin size={14} /> 213 Yellow Sky St, Las Vegas</span>
          </div>
        </section>

        <section className="trust-bar">
          <div className="container trust-grid">
            <div className="trust-rating"><span className="rating-stars"><Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /></span><strong>5.0</strong><span>Google rating</span></div>
            <div className="trust-divider" />
            <div className="trust-copy"><span className="trust-kicker">Trusted by detail-minded owners</span><span className="trust-large">283 <small>Google reviews</small></span></div>
            <div className="trust-divider" />
            <div className="trust-note"><ShieldCheck size={20} /><span>Premium vehicle care<br /><small>Southern Highlands, Las Vegas</small></span></div>
          </div>
        </section>

        <section className="section section-dark services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading reveal">
              <div><p className="eyebrow">01 / The service menu</p><h2>Precision in<br /><em>every surface.</em></h2></div>
              <div className="heading-aside"><p>From the finish you see to the materials you touch, every service is built around the same idea: your car should leave feeling considered.</p><button className="text-link" onClick={() => scrollTo("booking")}>Find your service <ArrowUpRight size={17} /></button></div>
            </div>
            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return <article className={`service-card reveal reveal-delay-${Math.min(index + 1, 3)}`} key={service.number} onClick={() => scrollTo(service.anchor)}>
                  <div className="service-image-wrap"><img src={service.image} alt={`${service.title} service`} /><div className="service-image-shade" /><span className="service-number">{service.number}</span><span className="service-arrow"><ArrowUpRight size={18} /></span></div>
                  <div className="service-card-body"><Icon size={20} strokeWidth={1.4} /><h3>{service.title}</h3><p>{service.text}</p><span className="service-cta">View service <ArrowUpRight size={15} /></span></div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="section section-graphite comparison-section" id="correction">
          <div className="container comparison-layout">
            <div className="comparison-copy reveal"><p className="eyebrow">02 / Finish refinement</p><h2>See the<br /><em>difference.</em></h2><p className="body-copy">Paint correction is the quiet art of removing visual noise — refining the surface until the color, clarity, and reflection do the talking.</p><div className="comparison-stat"><strong>01</strong><span>One surface.<br />Two impressions.</span></div><button className="button button-outline" onClick={() => scrollTo("booking")}>Ask about correction <ArrowUpRight size={16} /></button></div>
            <div className="comparison-frame reveal reveal-delay-1">
              <div className="comparison-image before-image" style={{ backgroundImage: `url(${images.heroAlt})` }} />
              <div className="comparison-image after-image" style={{ width: `${beforePosition}%`, backgroundImage: `url(${images.hero})` }}><span className="compare-label">After</span></div>
              <span className="compare-label before-label">Before</span>
              <div className="comparison-handle" style={{ left: `${beforePosition}%` }}><span /><ChevronDown size={16} /><ChevronUp size={16} /><span /></div>
              <input className="comparison-slider" type="range" min="5" max="95" value={beforePosition} onChange={(event) => setBeforePosition(Number(event.target.value))} aria-label="Compare before and after finish" />
            </div>
          </div>
        </section>

        <section className="section section-dark packages-section" id="coating">
          <div className="container">
            <div className="section-heading split-heading reveal"><div><p className="eyebrow">03 / The finish menu</p><h2>Choose your<br /><em>level of care.</em></h2></div><div className="heading-aside"><p>Every vehicle is different. These starting points make it easy to begin the conversation, then we tailor the service to your vehicle.</p></div></div>
            <div className="package-tabs reveal"><button className={activeTab === "ceramic" ? "active" : ""} onClick={() => setActiveTab("ceramic")}>Ceramic coating</button><button className={activeTab === "detail" ? "active" : ""} onClick={() => setActiveTab("detail")}>Interior & exterior</button><button className={activeTab === "correction" ? "active" : ""} onClick={() => setActiveTab("correction")}>Paint correction</button></div>
            <div className={`package-grid package-grid-${packages[activeTab].length}`}>
              {packages[activeTab].map((pack, index) => <article className={`package-card ${pack.featured ? "featured" : ""} reveal reveal-delay-${Math.min(index + 1, 3)}`} key={pack.name}>
                {pack.featured && <span className="featured-label">Most considered</span>}
                <div className="package-top"><span className="package-index">0{index + 1}</span><Gem size={21} strokeWidth={1.2} /></div>
                <h3>{pack.name}</h3><p>{pack.description}</p><div className="package-price"><small>{pack.detail}</small><strong>{pack.price}</strong></div>
                <ul>{pack.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}</ul><button className={`text-link ${pack.featured ? "gold" : ""}`} onClick={() => scrollTo("booking")}>Request this service <ArrowUpRight size={16} /></button>
              </article>)}
            </div>
            <p className="pricing-note">Pricing shown is editable starting-point pricing. Final pricing is confirmed for the vehicle and requested finish.</p>
          </div>
        </section>

        <section className="section section-warm gallery-section" id="gallery">
          <div className="container">
            <div className="section-heading gallery-heading reveal"><div><p className="eyebrow dark-eyebrow">04 / In the studio</p><h2>Nothing ordinary<br /><em>in the details.</em></h2></div><p className="heading-aside warm-aside">A closer look at the surfaces, materials, and reflections that shape the Immaculate standard.</p></div>
            <div className="gallery-grid">
              {gallery.map((item, index) => <button className={`gallery-tile gallery-tile-${index + 1} reveal reveal-delay-${Math.min(index + 1, 3)}`} key={item.label} onClick={() => setLightboxIndex(index)} aria-label={`Open ${item.label} image`}><img src={item.src} alt={item.label} style={{ objectPosition: item.position }} /><span className="gallery-overlay" /><span className="gallery-caption"><small>0{index + 1}</small><strong>{item.label}</strong><ArrowUpRight size={16} /></span></button>)}
            </div>
          </div>
        </section>

        <section className="section section-dark reviews-section">
          <div className="container reviews-layout">
            <div className="reviews-score reveal"><p className="eyebrow">05 / The local word</p><div className="score-number">5.0<span>★</span></div><div className="score-stars"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div><p>Google rating<br /><strong>283 reviews</strong></p><a className="text-link gold" href="https://www.google.com/search?q=Immaculate+Auto+Detailing+and+Ceramic+Coating+Southern+Highlands" target="_blank" rel="noreferrer">Read on Google <ArrowUpRight size={16} /></a></div>
            <div className="reviews-message reveal reveal-delay-1"><span className="quote-mark">“</span><h2>A finish worth<br /><em>coming back to.</em></h2><p>Our review excerpts are intentionally not reproduced here until approved source copy is supplied. For now, the signal is clear: a perfect 5.0 from 283 Google reviews.</p><div className="review-proof"><div className="proof-line" /><span>Verified rating shown as provided</span></div></div>
          </div>
        </section>

        <section className="section section-graphite why-section">
          <div className="container why-layout">
            <div className="why-image reveal"><img src={images.interiorAlt} alt="Luxury vehicle interior detail" /><div className="image-stamp"><span>IM</span><small>Detail<br />with intent</small></div></div>
            <div className="why-copy reveal reveal-delay-1"><p className="eyebrow">06 / Why Immaculate</p><h2>Less noise.<br /><em>More finish.</em></h2><p className="body-copy">Luxury is not about adding more. It is about noticing more — the line of a reflection, the feel of a clean surface, the calm of a cabin reset.</p><div className="principles"><div><span>01</span><strong>Scope, made clear</strong><p>Choose from focused services or start a conversation for a more tailored path.</p></div><div><span>02</span><strong>Detail-led, inside out</strong><p>Paint, glass, trim, leather — the experience is designed around the whole vehicle.</p></div><div><span>03</span><strong>Southern Highlands</strong><p>Find Immaculate at 213 Yellow Sky St, Las Vegas, NV 89145.</p></div></div></div>
          </div>
        </section>

        <section className="section section-warm booking-section" id="booking">
          <div className="container booking-layout">
            <div className="booking-copy reveal"><p className="eyebrow dark-eyebrow">07 / Start here</p><h2>Make the next<br /><em>look count.</em></h2><p>Tell us what you drive, what you want to refine, and when you would like to bring it in.</p><div className="booking-details"><a href="tel:+17253267492"><Phone size={18} /><span><small>Call the studio</small>+1 725 326 7492</span></a><div><MapPin size={18} /><span><small>Find us at</small>213 Yellow Sky St<br />Las Vegas, NV 89145</span></div></div></div>
            <div className="booking-card reveal reveal-delay-1">{formSent ? <div className="form-success"><span className="success-icon"><Check size={25} /></span><p className="eyebrow dark-eyebrow">Request received</p><h3>Your next detail<br /><em>starts here.</em></h3><p>Thanks for sharing the essentials. The form is ready to connect to your preferred booking workflow.</p><button className="button button-dark" onClick={() => setFormSent(false)}>Submit another request <ArrowUpRight size={16} /></button></div> : <form onSubmit={handleSubmit}><div className="form-header"><span>Book your detail</span><small>All fields are editable</small></div><div className="form-grid"><label><span>Name</span><input required name="name" placeholder="Your name" /></label><label><span>Phone</span><input required name="phone" type="tel" placeholder="(725) 000-0000" /></label><label><span>Email</span><input required name="email" type="email" placeholder="you@email.com" /></label><label><span>Vehicle</span><input required name="vehicle" placeholder="Year, make, model" /></label><label><span>Requested service</span><select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Maintenance Detail — starting at $149</option><option>Full Interior Detail — starting at $249</option><option>Full Detail — starting at $349</option><option>Paint Correction — starting at $499</option><option>Ceramic Coating — starting at $450</option><option>Premium Ceramic Package — starting at $799</option></select></label><label><span>Preferred date</span><input required name="date" type="date" /></label></div><button className="button button-dark form-submit" type="submit">Request a quote <ArrowUpRight size={17} /></button><p className="form-footnote"><ShieldCheck size={14} /> We only use your details to respond to this request.</p></form>}</div>
          </div>
        </section>

        <section className="section section-dark faq-section" id="faq">
          <div className="container faq-layout"><div className="faq-heading reveal"><p className="eyebrow">08 / Good to know</p><h2>Questions,<br /><em>answered.</em></h2><p>Still deciding? Call the studio and we will help you choose the right starting point.</p><a className="text-link gold" href="tel:+17253267492">Talk to Immaculate <ArrowUpRight size={16} /></a></div><div className="faq-list reveal reveal-delay-1">{faqs.map((faq, index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={faq.q}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span><small>0{index + 1}</small>{faq.q}</span>{openFaq === index ? <Minus size={17} /> : <Plus size={17} />}</button><div className="faq-answer"><p>{faq.a}</p></div></div>)}</div></div>
        </section>

        <section className="final-cta-section">
          <div className="final-cta-media" style={{ backgroundImage: `url(${images.hero})` }} /><div className="final-cta-overlay" /><div className="container final-cta-content reveal"><p className="eyebrow">Ready when your vehicle is.</p><h2>Keep it<br /><em>immaculate.</em></h2><button className="button button-gold" onClick={() => scrollTo("booking")}>Book your detail <ArrowUpRight size={17} /></button></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><a className="brand" href="#top" onClick={() => scrollTo("top")}><span className="brand-mark" aria-hidden="true"><CircleDot size={19} strokeWidth={1.3} /><span /></span><span className="brand-copy"><strong>IMMACULATE</strong><em>AUTO DETAILING</em></span></a><p>Premium detailing, paint correction, and ceramic coating in Southern Highlands, Las Vegas.</p></div><div className="footer-column"><span className="footer-label">Explore</span><button onClick={() => scrollTo("services")}>Services</button><button onClick={() => scrollTo("gallery")}>Gallery</button><button onClick={() => scrollTo("faq")}>FAQ</button></div><div className="footer-column"><span className="footer-label">Contact</span><a href="tel:+17253267492">+1 725 326 7492</a><a href="mailto:hello@immaculate.auto">hello@immaculate.auto</a><span>213 Yellow Sky St<br />Las Vegas, NV 89145</span></div><div className="footer-column footer-social"><span className="footer-label">Follow the finish</span><div><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a><a href="mailto:hello@immaculate.auto" aria-label="Email"><Mail size={18} /></a></div></div></div><div className="container footer-bottom"><span>© 2026 Immaculate Auto Detailing</span><span>Southern Highlands · Las Vegas</span><span>Crafted for the detail-minded</span></div></footer>

      <div className="mobile-action-bar"><a href="tel:+17253267492"><Phone size={17} /> Call</a><button onClick={() => scrollTo("booking")}><CalendarDays size={17} /> Book now</button></div>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setLightboxIndex(null)}><button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close gallery"><X size={21} /></button><button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }} aria-label="Previous image">‹</button><img src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].label} onClick={(event) => event.stopPropagation()} /><button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }} aria-label="Next image">›</button><div className="lightbox-caption"><span>0{lightboxIndex + 1}</span>{gallery[lightboxIndex].label}</div></div>}
    </div>
  );
}
