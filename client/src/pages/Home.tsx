import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Car,
  CarFront,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Clock3,
  Droplets,
  Facebook,
  Flame,
  Gem,
  Instagram,
  Layers,
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
  Truck,
  X,
} from "lucide-react";

const images = {
  hero: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85",
  heroAlt: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=85",
  application: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1600&q=85",
  interior: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
  detail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85",
  interiorAlt: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
  before: "https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1600&q=85",
  after: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1600&q=85",
  inspection: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1600&q=85",
  wash: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=85",
};

// Formspree or custom form endpoint
const FORM_ENDPOINT = "";

const services = [
  {
    number: "01",
    icon: Sparkles,
    title: "Ceramic Coating",
    text: "Ultra-hydrophobic 9H nano-ceramic armor that creates a liquid-glass barrier against UV, scratches, and road debris.",
    image: images.application,
    anchor: "coating",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Paint Correction",
    text: "Multi-stage rotary and dual-action polish to eliminate 85–95% of swirl marks, micro-marring, and oxidation.",
    image: images.before,
    anchor: "correction",
  },
  {
    number: "03",
    icon: PanelTop,
    title: "Interior Detail",
    text: "Deep steam sanitization, aniline leather conditioning, UV dashboard sealing, and surgical crevice decontamination.",
    image: images.interior,
    anchor: "booking",
  },
  {
    number: "04",
    icon: CarFront,
    title: "Full Detail",
    text: "The signature complete transformation. Includes exterior decon wash, gloss enhancement, and showroom interior overhaul.",
    image: images.detail,
    anchor: "booking",
  },
];

type PackageTab = "ceramic" | "detail" | "correction";
type VehicleClass = "sedan" | "suv" | "truck";

interface ServicePackage {
  name: string;
  basePrice: number;
  detail: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const rawPackages: Record<PackageTab, ServicePackage[]> = {
  ceramic: [
    {
      name: "Essential Ceramic (3-Year)",
      basePrice: 450,
      detail: "starting at",
      description: "A focused ceramic shield for vehicles in good condition wanting intense gloss and easy washing.",
      features: [
        "Paint decontamination wash & clay bar",
        "Single-stage gloss prep polish",
        "3-Year 9H ceramic coating application",
        "Hydrophobic glass & rim face treatment",
      ],
    },
    {
      name: "Signature Ceramic (5-Year)",
      basePrice: 799,
      detail: "starting at",
      description: "Our elite ceramic pathway with multi-stage paint refinement and maximum hardness protection.",
      features: [
        "Full 2-stage precision paint correction",
        "Dual-layer 5-Year commercial-grade ceramic",
        "Wheel barrel & caliper coating",
        "Full interior ceramic leather/fabric shield",
        "Annual complimentary inspection check",
      ],
      featured: true,
    },
  ],
  detail: [
    {
      name: "Maintenance Detail",
      basePrice: 149,
      detail: "starting at",
      description: "Regular high-end upkeep for vehicles that are already maintained in active rotation.",
      features: [
        "pH-neutral snow foam hand wash",
        "Wheels & brake dust deep purge",
        "Interior vacuum, wipe-down & scent reset",
        "Streak-free crystal glass finish",
      ],
    },
    {
      name: "Full Interior Restoration",
      basePrice: 249,
      detail: "starting at",
      description: "A restorative deep-clean for your cabin — every surface, stitch, and vent rejuvenated.",
      features: [
        "Deep steam extraction on carpets & mats",
        "Leather cleanse, condition & UV seal",
        "Air vents & console fine detailing",
        "Ozone air purification cycle",
      ],
    },
    {
      name: "Immaculate Full Detail",
      basePrice: 349,
      detail: "starting at",
      description: "Complete inside-and-out transformation for owners who want their vehicle looking new.",
      features: [
        "Full interior restoration included",
        "Decontamination wash & iron deposit removal",
        "Machine gloss enhancement polish",
        "6-Month synthetic sealant protection",
      ],
      featured: true,
    },
  ],
  correction: [
    {
      name: "Stage 1 Paint Enhancement",
      basePrice: 349,
      detail: "starting at",
      description: "Single-step polish to dramatically increase gloss and remove minor spider-web swirls.",
      features: [
        "Extensive paint thickness gauging",
        "Clay bar & chemical decontam",
        "Single-stage machine polish (50-60% defect removal)",
        "Polymer gloss sealant coat",
      ],
    },
    {
      name: "Stage 2 Multi-Step Correction",
      basePrice: 499,
      detail: "starting at",
      description: "Intensive compounding and jewel polishing for deep mirror reflections and clarity.",
      features: [
        "Deep compounding for swirl/scratch removal",
        "Secondary micro-finishing jewel polish (85-95% defect removal)",
        "Panel-by-panel LED inspection",
        "12-Month ceramic sealant base",
      ],
      featured: true,
    },
  ],
};

const gallery = [
  { src: images.detail, label: "Mirror reflection finish", position: "center" },
  { src: images.application, label: "Ceramic application process", position: "center" },
  { src: images.interior, label: "Handcrafted interior detail", position: "center" },
  { src: images.heroAlt, label: "AMG showroom gloss", position: "center" },
  { src: images.interiorAlt, label: "Wheels & caliper restoration", position: "center" },
];

const testimonials = [
  {
    name: "Marcus Vance",
    car: "Porsche 911 GT3 RS",
    text: "The level of precision here is unmatched in Las Vegas. After their 2-step paint correction and ceramic coating, the black paint looks like liquid glass. Zero swirl marks under direct sunlight.",
    rating: 5,
    tag: "Paint Correction & Ceramic",
  },
  {
    name: "David Sterling",
    car: "Tesla Model S Plaid",
    text: "I was skeptical about ceramic coating until I brought my Plaid in. Water literally beads and slides off effortlessly, and washing it takes 15 minutes now. True automotive perfectionists.",
    rating: 5,
    tag: "Signature Ceramic",
  },
  {
    name: "Elena Rostova",
    car: "Mercedes-AMG G63",
    text: "Full interior restoration and exterior ceramic. Every stitch of the leather feels renewed, and the matte finish is totally protected. Absolutely immaculate experience from start to finish.",
    rating: 5,
    tag: "Full Detail & Ceramic",
  },
];

const faqs = [
  {
    q: "What is the difference between ceramic coating and regular car wax?",
    a: "Traditional waxes sit on top of the clear coat and wash away after 4–8 weeks. Ceramic coatings chemically bond with your paint at a molecular level, creating a permanent, glass-hard sacrificial shield that resists UV degradation, chemical etching, and lasts 3 to 5+ years.",
  },
  {
    q: "How does paint correction eliminate swirls and scratches?",
    a: "Swirls and scratches are microscopic valleys in the clear coat that scatter light. Paint correction uses specialized dual-action rotary polishers and decreasing abrasives to gently level the clear coat, restoring a microscopic flat surface that creates razor-sharp reflections.",
  },
  {
    q: "How long does a full detail or ceramic service take?",
    a: "A Maintenance or Full Detail typically takes 3 to 5 hours. Multi-stage Paint Correction and Ceramic Coating services require 1 to 2 full days to allow proper surface preparation, multi-step polishing, and the essential 24-hour climate-controlled curing window.",
  },
  {
    q: "Where is the studio located?",
    a: "Immaculate Auto Detailing is conveniently located at 213 Yellow Sky St, Las Vegas, NV 89145 in the Southern Highlands area.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PackageTab>("ceramic");
  const [vehicleSize, setVehicleSize] = useState<VehicleClass>("sedan");
  const [beforePosition, setBeforePosition] = useState(52);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState("");

  // Scroll detection for floating glass header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for smooth reveal animations
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
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

  // Lightbox keyboard controls
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

  const handleSelectPackageForBooking = (packageName: string) => {
    setSelectedServiceForBooking(packageName);
    scrollTo("booking");
  };

  // Price adjustment based on vehicle class
  const getCalculatedPrice = (basePrice: number) => {
    let multiplier = 0;
    if (vehicleSize === "suv") {
      multiplier = basePrice > 400 ? 100 : 50;
    } else if (vehicleSize === "truck") {
      multiplier = basePrice > 400 ? 180 : 90;
    }
    return `$${basePrice + multiplier}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setFormError("");
    if (!FORM_ENDPOINT) {
      setFormError("Online requests are not configured with Formspree yet. Please call +1 725 326 7492 directly to reserve your slot.");
      return;
    }
    setSending(true);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      if (!response.ok) throw new Error("Request failed");
      setFormSent(true);
    } catch {
      setFormError("Your request did not go through. Please try again or call +1 725 326 7492.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="site-shell">
      {/* Sticky Glassmorphic Header */}
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" onClick={() => scrollTo("top")} aria-label="Immaculate home">
            <span className="brand-mark" aria-hidden="true">
              <CircleDot size={20} strokeWidth={1.4} />
              <span />
            </span>
            <span className="brand-copy">
              <strong>IMMACULATE</strong>
              <em>AUTO DETAILING</em>
            </span>
          </a>

          <nav className={`desktop-nav ${mobileMenuOpen ? "mobile-open" : ""}`} aria-label="Primary navigation">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("correction")}>Before & After</button>
            <button onClick={() => scrollTo("pricing")}>Pricing</button>
            <button onClick={() => scrollTo("gallery")}>Studio</button>
            <button onClick={() => scrollTo("reviews")}>Reviews</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
          </nav>

          <div className="header-actions">
            <a className="header-phone" href="tel:+17253267492">
              <Phone size={15} /> <span>+1 725 326 7492</span>
            </a>
            <button className="button button-gold button-small" onClick={() => scrollTo("booking")}>
              Book Detail <ArrowUpRight size={16} />
            </button>
            <button className="menu-toggle" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-media" style={{ backgroundImage: `url(${images.hero})` }} />
          <div className="hero-overlay" />
          <div className="hero-grain" />

          <div className="hero-content container">
            <div className="status-pill reveal">
              <span className="status-pill-dot" />
              <span>Accepting Bookings This Week · Southern Highlands</span>
            </div>

            <h1 className="hero-title reveal reveal-delay-1">
              Your vehicle.<br />
              <span className="gold-gradient-text">Immaculate.</span>
            </h1>

            <p className="hero-description reveal reveal-delay-2">
              Showroom-grade multi-stage paint correction, 9H ceramic coatings, and surgical interior restoration for vehicles that command respect.
            </p>

            <div className="hero-actions reveal reveal-delay-3">
              <button className="button button-gold" onClick={() => scrollTo("booking")}>
                Reserve Your Detail <ArrowUpRight size={17} />
              </button>
              <button className="button button-outline" onClick={() => scrollTo("correction")}>
                See Before & After <ArrowDownRight size={17} />
              </button>
            </div>
          </div>

          <div className="hero-meta reveal reveal-delay-3">
            <span>01 <i /> 04</span>
            <span className="scroll-cue">
              <span className="scroll-line" /> Scroll to explore
            </span>
            <span className="hero-location">
              <MapPin size={15} /> 213 Yellow Sky St, Las Vegas
            </span>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="trust-bar">
          <div className="container trust-grid">
            <div className="trust-rating">
              <strong>5.0</strong>
              <div>
                <span className="rating-stars">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </span>
                <span style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280" }}>
                  Verified Google Reviews
                </span>
              </div>
            </div>

            <div className="trust-divider" />

            <div className="trust-copy">
              <span className="trust-kicker">Endorsed by collectors & exotic owners</span>
              <span className="trust-large">
                283+ <small>Satisfied Clients</small>
              </span>
            </div>

            <div className="trust-divider" />

            <div className="trust-note">
              <ShieldCheck size={24} />
              <span>
                Certified Ceramic Pro Applicator<br />
                <small>Southern Highlands Studio · Las Vegas</small>
              </span>
            </div>
          </div>
        </section>

        {/* Services Menu Section */}
        <section className="section section-dark services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading reveal">
              <div>
                <p className="eyebrow">01 / Master Services</p>
                <h2>
                  Precision in<br />
                  <em className="gold-gradient-text">every surface.</em>
                </h2>
              </div>
              <div className="heading-aside">
                <p>
                  From mirror-finish clear coat correction to surgical interior rejuvenation, every treatment is engineered to exceed factory delivery standards.
                </p>
                <button className="text-link" onClick={() => scrollTo("pricing")}>
                  Explore packages & pricing <ArrowUpRight size={17} />
                </button>
              </div>
            </div>

            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    className={`service-card reveal reveal-delay-${Math.min(index + 1, 3)}`}
                    key={service.number}
                    role="button"
                    tabIndex={0}
                    onClick={() => scrollTo(service.anchor)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        scrollTo(service.anchor);
                      }
                    }}
                  >
                    <div className="service-image-wrap">
                      <img src={service.image} alt={service.title} />
                      <div className="service-image-shade" />
                      <span className="service-number">{service.number}</span>
                      <span className="service-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <div className="service-card-body">
                      <Icon size={22} strokeWidth={1.4} />
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      <span className="service-cta">
                        View Details <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Before & After Comparison Slider */}
        <section className="section section-graphite comparison-section" id="correction">
          <div className="container comparison-layout">
            <div className="comparison-copy reveal">
              <p className="eyebrow">02 / Paint Correction Mastery</p>
              <h2>
                See the<br />
                <em className="gold-gradient-text">difference.</em>
              </h2>
              <p className="body-copy">
                Slide back and forth to inspect the transformation. Swirl marks, spider webs, and hazing are meticulously polished away, revealing profound depth, liquid gloss, and absolute clarity.
              </p>
              <div className="comparison-stat">
                <strong>95%</strong>
                <span>
                  Swirl & scratch defect removal<br />
                  Restoring factory mirror finish
                </span>
              </div>
              <button className="button button-gold" onClick={() => scrollTo("booking")}>
                Book Paint Correction <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="comparison-frame reveal reveal-delay-1">
              <div className="comparison-image before-image" style={{ backgroundImage: `url(${images.before})` }} />
              <div className="comparison-image after-image" style={{ width: `${beforePosition}%`, backgroundImage: `url(${images.after})` }}>
                <span className="compare-label">Ceramic Mirror Finish</span>
              </div>
              <span className="compare-label before-label">Swirled / Neglected Clear Coat</span>

              <div className="comparison-handle" style={{ left: `${beforePosition}%` }}>
                <span />
                <div className="comparison-handle-btn">
                  <div style={{ display: "flex", gap: "2px" }}>
                    <ChevronDown size={14} style={{ transform: "rotate(90deg)" }} />
                    <ChevronUp size={14} style={{ transform: "rotate(90deg)" }} />
                  </div>
                </div>
                <span />
              </div>

              <input
                className="comparison-slider"
                type="range"
                min="5"
                max="95"
                value={beforePosition}
                onChange={(event) => setBeforePosition(Number(event.target.value))}
                aria-label="Drag to compare before and after automotive finish"
              />
            </div>
          </div>
        </section>

        {/* Packages & Interactive Vehicle Size Estimator */}
        <section className="section section-dark packages-section" id="pricing">
          <div className="container">
            <div className="section-heading split-heading reveal">
              <div>
                <p className="eyebrow">03 / Transparent Investment</p>
                <h2>
                  Tailored<br />
                  <em className="gold-gradient-text">care packages.</em>
                </h2>
              </div>
              <div className="heading-aside">
                <p>
                  Select your vehicle category below to see instant estimated pricing. Every service includes paint thickness inspection and complimentary glass coating.
                </p>
              </div>
            </div>

            {/* Vehicle Size Selector Tabs */}
            <div className="vehicle-selector-wrapper reveal">
              <div className="vehicle-selector-label">
                <CarFront size={18} />
                <span>Select Your Vehicle Size:</span>
              </div>
              <div className="vehicle-size-pills">
                <button
                  type="button"
                  className={`vehicle-pill ${vehicleSize === "sedan" ? "active" : ""}`}
                  onClick={() => setVehicleSize("sedan")}
                >
                  <Car size={15} /> Coupe / Sedan
                </button>
                <button
                  type="button"
                  className={`vehicle-pill ${vehicleSize === "suv" ? "active" : ""}`}
                  onClick={() => setVehicleSize("suv")}
                >
                  <CarFront size={15} /> Mid-Size SUV / Crossover
                </button>
                <button
                  type="button"
                  className={`vehicle-pill ${vehicleSize === "truck" ? "active" : ""}`}
                  onClick={() => setVehicleSize("truck")}
                >
                  <Truck size={15} /> Truck / Full-Size SUV
                </button>
              </div>
            </div>

            {/* Service Category Tabs */}
            <div className="package-tabs reveal" role="tablist">
              {(
                [
                  ["ceramic", "Ceramic Coating 9H"],
                  ["detail", "Interior & Exterior Details"],
                  ["correction", "Paint Correction"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  className={activeTab === key ? "active" : ""}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Packages Grid */}
            <div className={`package-grid package-grid-${rawPackages[activeTab].length}`}>
              {rawPackages[activeTab].map((pack, index) => {
                const calculatedPrice = getCalculatedPrice(pack.basePrice);
                return (
                  <article
                    className={`package-card ${pack.featured ? "featured" : ""} reveal reveal-delay-${Math.min(index + 1, 3)}`}
                    key={pack.name}
                  >
                    {pack.featured && <span className="featured-label">Most Popular</span>}
                    <div className="package-top">
                      <span className="package-index">0{index + 1}</span>
                      <Gem size={22} strokeWidth={1.3} />
                    </div>
                    <h3>{pack.name}</h3>
                    <p>{pack.description}</p>
                    <div className="package-price">
                      <small>{pack.detail}</small>
                      <strong>{calculatedPrice}</strong>
                    </div>
                    <ul>
                      {pack.features.map((feature) => (
                        <li key={feature}>
                          <Check size={16} /> {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`button ${pack.featured ? "button-gold" : "button-outline"}`}
                      onClick={() => handleSelectPackageForBooking(`${pack.name} (${calculatedPrice})`)}
                    >
                      Request This Package <ArrowRight size={16} />
                    </button>
                  </article>
                );
              })}
            </div>
            <p className="pricing-note">
              *Prices reflected for {vehicleSize === "sedan" ? "Coupe / Sedan" : vehicleSize === "suv" ? "Mid-Size SUV" : "Truck / Large SUV"}. Exact quote confirmed after in-person clear coat inspection.
            </p>
          </div>
        </section>

        {/* Gallery / Studio Section */}
        <section className="section section-warm gallery-section" id="gallery">
          <div className="container">
            <div className="section-heading gallery-heading reveal">
              <div>
                <p className="eyebrow dark-eyebrow">04 / Inside The Studio</p>
                <h2>
                  Uncompromising<br />
                  <em>attention to detail.</em>
                </h2>
              </div>
              <p className="heading-aside warm-aside">
                A closer look at the finishes, surgical wheel cleaning, and rich reflections delivered in our Southern Highlands cleanroom.
              </p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button
                  className={`gallery-tile gallery-tile-${index + 1} reveal reveal-delay-${Math.min(index + 1, 3)}`}
                  key={item.label}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open ${item.label} image`}
                >
                  <img src={item.src} alt={item.label} style={{ objectPosition: item.position }} />
                  <span className="gallery-overlay" />
                  <span className="gallery-caption">
                    <small>0{index + 1}</small>
                    <strong>{item.label}</strong>
                    <ArrowUpRight size={17} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews & Client Testimonials Section */}
        <section className="section section-dark reviews-section" id="reviews">
          <div className="container">
            <div className="reviews-layout">
              <div className="reviews-score reveal">
                <p className="eyebrow">05 / Verified Reputation</p>
                <div className="score-number">
                  5.0<span>★</span>
                </div>
                <div className="score-stars">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
                <p>
                  Google Verified Rating<br />
                  <strong style={{ color: "#f6f5f1", fontSize: "16px" }}>283 Five-Star Reviews</strong>
                </p>
                <a
                  className="text-link gold"
                  href="https://www.google.com/search?q=Immaculate+Auto+Detailing+and+Ceramic+Coating+Southern+Highlands"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read all Google reviews <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="reviews-message reveal reveal-delay-1">
                <span className="quote-mark">“</span>
                <h2>
                  A finish worth<br />
                  <em className="gold-gradient-text">coming back for.</em>
                </h2>
                <p>
                  We treat every vehicle as our own. Hear from exotic, luxury, and daily-driver owners across Southern Highlands who entrust their vehicles to Immaculate.
                </p>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="testimonials-grid">
              {testimonials.map((t, idx) => (
                <div className={`testimonial-card reveal reveal-delay-${idx + 1}`} key={t.name}>
                  <div className="testimonial-stars">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.car}</small>
                    </div>
                    <span className="testimonial-tag">{t.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Immaculate */}
        <section className="section section-graphite why-section">
          <div className="container why-layout">
            <div className="why-image reveal">
              <img src={images.interiorAlt} alt="Luxury vehicle custom detailing" />
              <div className="image-stamp">
                <span>IM</span>
                <small>
                  Detailing<br />With Intent
                </small>
              </div>
            </div>

            <div className="why-copy reveal reveal-delay-1">
              <p className="eyebrow">06 / The Immaculate Standard</p>
              <h2>
                Less noise.<br />
                <em className="gold-gradient-text">Pure finish.</em>
              </h2>
              <p className="body-copy">
                True automotive craft is not about rushing cars through a conveyor belt. It is about patience, calibrated light bars, paint depth gauges, and single-micrometer precision.
              </p>

              <div className="principles">
                <div>
                  <span>01</span>
                  <div>
                    <strong>Climate-Controlled Cleanroom</strong>
                    <p>Ceramic coatings are cured in our dust-free, temperature-stabilized indoor studio.</p>
                  </div>
                </div>
                <div>
                  <span>02</span>
                  <div>
                    <strong>Paint Depth Gauging</strong>
                    <p>We measure clear coat thickness across all metal and carbon panels before touching a machine.</p>
                  </div>
                </div>
                <div>
                  <span>03</span>
                  <div>
                    <strong>Southern Highlands Studio</strong>
                    <p>Convenient, secure, insured facility at 213 Yellow Sky St, Las Vegas, NV 89145.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="section section-warm booking-section" id="booking">
          <div className="container booking-layout">
            <div className="booking-copy reveal">
              <p className="eyebrow dark-eyebrow">07 / Reserve Your Slot</p>
              <h2>
                Make your next<br />
                <em>look count.</em>
              </h2>
              <p>
                Tell us what you drive, which treatment you need, and your preferred appointment time. We will respond within 2 business hours.
              </p>

              <div className="booking-details">
                <a href="tel:+17253267492">
                  <Phone size={20} />
                  <div>
                    <small>Call The Studio</small>
                    <strong>+1 725 326 7492</strong>
                  </div>
                </a>
                <div>
                  <MapPin size={20} />
                  <div>
                    <small>Studio Location</small>
                    <span>213 Yellow Sky St, Las Vegas, NV 89145</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-card reveal reveal-delay-1">
              {formSent ? (
                <div className="form-success">
                  <span className="success-icon">
                    <Check size={26} />
                  </span>
                  <p className="eyebrow dark-eyebrow">Request Received</p>
                  <h3>
                    Your next detail<br />
                    <em>starts here.</em>
                  </h3>
                  <p>
                    Thank you. We have received your request and will contact you promptly to confirm your drop-off schedule.
                  </p>
                  <button className="button button-dark" onClick={() => setFormSent(false)}>
                    Submit Another Request <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-header">
                    <span>Request A Quote</span>
                    <small>Zero obligation · Fast reply</small>
                  </div>

                  <div className="form-grid">
                    <label>
                      <span>Full Name</span>
                      <input required name="name" autoComplete="name" placeholder="John Doe" />
                    </label>
                    <label>
                      <span>Phone Number</span>
                      <input required name="phone" type="tel" autoComplete="tel" placeholder="(725) 000-0000" />
                    </label>
                    <label>
                      <span>Email Address</span>
                      <input required name="email" type="email" autoComplete="email" placeholder="john@example.com" />
                    </label>
                    <label>
                      <span>Vehicle Year, Make, Model</span>
                      <input required name="vehicle" placeholder="e.g. 2024 Porsche 911" />
                    </label>
                    <label style={{ gridColumn: "span 2" }}>
                      <span>Requested Package</span>
                      <select
                        required
                        name="service"
                        value={selectedServiceForBooking}
                        onChange={(e) => setSelectedServiceForBooking(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a treatment package
                        </option>
                        <option value="Essential Ceramic (3-Year)">Essential Ceramic (3-Year Shield)</option>
                        <option value="Signature Ceramic (5-Year)">Signature Ceramic (5-Year Armor)</option>
                        <option value="Stage 1 Paint Enhancement">Stage 1 Paint Enhancement Polish</option>
                        <option value="Stage 2 Multi-Step Correction">Stage 2 Multi-Step Correction</option>
                        <option value="Maintenance Detail">Maintenance Detail</option>
                        <option value="Full Interior Restoration">Full Interior Restoration</option>
                        <option value="Immaculate Full Detail">Immaculate Complete Detail (Inside & Out)</option>
                      </select>
                    </label>
                    <label style={{ gridColumn: "span 2" }}>
                      <span>Preferred Date</span>
                      <input required name="date" type="date" />
                    </label>
                  </div>

                  <button className="button button-dark form-submit" type="submit" disabled={sending}>
                    {sending ? "Sending..." : <>Request Free Quote & Availability <ArrowRight size={17} /></>}
                  </button>

                  {formError && (
                    <p className="form-error" role="alert">
                      {formError}
                    </p>
                  )}

                  <p className="form-footnote">
                    <ShieldCheck size={15} /> Your privacy is safeguarded. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section section-dark faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-heading reveal">
              <p className="eyebrow">08 / Knowledge Base</p>
              <h2>
                Frequently<br />
                <em className="gold-gradient-text">answered.</em>
              </h2>
              <p>Still deciding which protection is right for your paint condition? Reach out directly.</p>
              <a className="text-link gold" href="tel:+17253267492">
                Call +1 725 326 7492 <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="faq-list reveal reveal-delay-1">
              {faqs.map((faq, index) => (
                <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={faq.q}>
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                    <span>
                      <small aria-hidden="true">0{index + 1}</small>
                      {faq.q}
                    </span>
                    {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section">
          <div className="final-cta-media" style={{ backgroundImage: `url(${images.hero})` }} />
          <div className="final-cta-overlay" />
          <div className="container final-cta-content reveal">
            <p className="eyebrow">Ready for showroom perfection.</p>
            <h2>
              Elevate your<br />
              <em className="gold-gradient-text">driving standard.</em>
            </h2>
            <button className="button button-gold" onClick={() => scrollTo("booking")}>
              Book Your Detail <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top" onClick={() => scrollTo("top")}>
              <span className="brand-mark" aria-hidden="true">
                <CircleDot size={20} strokeWidth={1.4} />
                <span />
              </span>
              <span className="brand-copy">
                <strong>IMMACULATE</strong>
                <em>AUTO DETAILING</em>
              </span>
            </a>
            <p>
              Southern Highlands' premier automotive studio specializing in multi-stage paint correction, 9H nano-ceramic coatings, and bespoke interior restoration.
            </p>
          </div>

          <div className="footer-column">
            <span className="footer-label">Navigation</span>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("correction")}>Before & After</button>
            <button onClick={() => scrollTo("pricing")}>Pricing Packages</button>
            <button onClick={() => scrollTo("gallery")}>Studio</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
          </div>

          <div className="footer-column">
            <span className="footer-label">Contact</span>
            <a href="tel:+17253267492">+1 725 326 7492</a>
            <a href="mailto:hello@immaculate.auto">hello@immaculate.auto</a>
            <span>
              213 Yellow Sky St<br />
              Las Vegas, NV 89145
            </span>
          </div>

          <div className="footer-column footer-social">
            <span className="footer-label">Follow The Studio</span>
            <div>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="mailto:hello@immaculate.auto" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Immaculate Auto Detailing LLC. All rights reserved.</span>
          <span>Southern Highlands · Las Vegas, Nevada</span>
          <span>Crafted for automotive perfectionists</span>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="mobile-action-bar">
        <a href="tel:+17253267492">
          <Phone size={17} /> Call Studio
        </a>
        <button onClick={() => scrollTo("booking")}>
          <CalendarDays size={17} /> Book Now
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={() => setLightboxIndex(null)}
        >
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close gallery">
            <X size={24} />
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].label} onClick={(event) => event.stopPropagation()} />
          <button
            className="lightbox-nav lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % gallery.length);
            }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="lightbox-caption">
            <span>0{lightboxIndex + 1}</span>
            {gallery[lightboxIndex].label}
          </div>
        </div>
      )}
    </div>
  );
}
