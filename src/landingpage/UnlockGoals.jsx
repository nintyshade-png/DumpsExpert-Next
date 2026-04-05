"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Assets
import downloadable from "@/assets/unlockGoalsAssets/downloadable.jpg";
import affordable from "@/assets/unlockGoalsAssets/affordable.webp";
import moneyBack from "@/assets/unlockGoalsAssets/moneyBack.webp";
import support from "@/assets/unlockGoalsAssets/support.jpg";
import freeUpdate from "@/assets/unlockGoalsAssets/freeUpdate.webp";
import validDumps from "@/assets/unlockGoalsAssets/validDumps.webp";
import freesample from "@/assets/unlockGoalsAssets/freesample.webp";
import specialDiscount from "@/assets/unlockGoalsAssets/specialDiscount.webp";

const cardData = [
  {
    icon: downloadable,
    title: "Downloadable PDF with Questions & Answers",
    description:
      "The Prepmantras provides 100% original and verified updated IT Certification Prep for all exams.",
    badge: "PDF Download",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    number: "01",
  },
  {
    icon: affordable,
    title: "Affordable & Reasonable Price",
    description:
      "You will never have to pay much for these real exam questions. Our prices are very reasonable and affordable.",
    badge: "Budget Friendly",
    accent: "#059669",
    accentLight: "#ecfdf5",
    number: "02",
  },
  {
    icon: moneyBack,
    title: "100% Money Back Guarantee",
    description:
      "We provide exact IT exam questions & answers at no risk to you. If our resources do not live up to expectations, you can claim a refund.",
    badge: "Risk Free",
    accent: "#dc2626",
    accentLight: "#fff1f2",
    number: "03",
  },
  {
    icon: support,
    title: "24/7 Customer Support",
    description:
      "We offer live customer support to make your learning process smooth and effortless. Reach out for any assistance.",
    badge: "Always Available",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    number: "04",
  },
  {
    icon: freeUpdate,
    title: "Free Updates up to 90 Days",
    description:
      "We provide free 90 days of updates on all IT certification exam preparation materials.",
    badge: "90 Days Free",
    accent: "#ea580c",
    accentLight: "#fff7ed",
    number: "05",
  },
  {
    icon: validDumps,
    title: "100% Valid IT Exam Prep",
    description:
      "Prepmantras provides 100% valid IT exam questions and answers for certification success.",
    badge: "100% Valid",
    accent: "#0891b2",
    accentLight: "#ecfeff",
    number: "06",
  },
  {
    icon: freesample,
    title: "Free Sample",
    description:
      "You can try our Prepmantras for free before purchasing. Get a sample to check quality.",
    badge: "Try Free",
    accent: "#0d9488",
    accentLight: "#f0fdfa",
    number: "07",
  },
  {
    icon: specialDiscount,
    title: "Special Discount Offer",
    description:
      "Enjoy limited-time discounts on top-selling certification Prep. Don't miss out!",
    badge: "Limited Offer",
    accent: "#d97706",
    accentLight: "#fffbeb",
    number: "08",
  },
];

const stats = [
  { value: "100%", label: "Verified Content" },
  { value: "24/7", label: "Expert Support" },
  { value: "90d", label: "Free Updates" },
  { value: "50K+", label: "Professionals" },
];

const WhyChooseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
  const scrollRef = useRef(null);

  // Intersection observer for scroll-based active card tracking (desktop)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.55 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Mobile: staggered reveal
  useEffect(() => {
    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.mobileindex);
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-mobileindex]").forEach((el) =>
      mobileObserver.observe(el)
    );
    return () => mobileObserver.disconnect();
  }, []);

  const active = cardData[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .wcs-root { font-family: 'DM Sans', sans-serif; }
        .wcs-display { font-family: 'DM Serif Display', serif; }

        .wcs-scroll::-webkit-scrollbar { display: none; }
        .wcs-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .wcs-card-enter { opacity: 0; transform: translateY(32px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .wcs-card-enter.visible { opacity: 1; transform: translateY(0); }

        .wcs-number {
          font-family: 'DM Serif Display', serif;
          font-size: 7rem;
          line-height: 1;
          opacity: 0.06;
          position: absolute;
          right: 1.5rem;
          top: 1rem;
          pointer-events: none;
          color: #0f172a;
          transition: opacity 0.4s;
        }

        .wcs-tab:hover .wcs-number { opacity: 0.1; }

        .progress-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #cbd5e1;
          transition: all 0.4s cubic-bezier(.4,0,.2,1);
          cursor: pointer;
        }
        .progress-dot.active {
          width: 24px;
          border-radius: 3px;
        }

        .wcs-left-panel {
          background: #0c1523;
          position: relative;
          overflow: hidden;
        }
        .wcs-left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.12) 0%, transparent 50%);
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .wcs-img-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1);
        }
        .wcs-img-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(12,21,35,0.5) 0%, transparent 50%);
        }

        .stat-chip {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          transition: background 0.3s;
        }
        .stat-chip:hover { background: rgba(255,255,255,0.1); }

        .wcs-tab {
          position: relative;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: background 0.2s;
          overflow: hidden;
        }
        .wcs-tab:hover { background: #fafafa; }
        .wcs-tab.active-tab { background: #f8faff; }

        .tab-accent-line {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          transform: scaleY(0);
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .wcs-tab.active-tab .tab-accent-line { transform: scaleY(1); }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid currentColor;
          opacity: 0.85;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slideUp 0.45s ease forwards; }
      `}</style>

      <section className="wcs-root w-full bg-[#f8f9fb] py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Section Label */}
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">Why us</p>
            <h2 className="wcs-display text-4xl sm:text-5xl text-slate-900 leading-tight">
              Why Choose <em>Prepmantras?</em>
            </h2>
          </div>

          {/* ═══ DESKTOP LAYOUT ═══ */}
          <div className="hidden lg:flex rounded-3xl overflow-hidden shadow-2xl" style={{ height: "78vh", minHeight: 560 }}>

            {/* Left Dark Panel — sticky hero */}
            <div className="wcs-left-panel w-[42%] flex flex-col justify-between p-10 relative">
              <div className="grid-lines" />

              {/* Active card hero content */}
              <div className="relative z-10 flex-1 flex flex-col justify-center" key={activeIndex}>
                {/* Image */}
                <div className="wcs-img-frame mb-7 slide-up" style={{ height: 200 }}>
                  <Image
                    src={active.icon}
                    alt={active.title}
                    width={480}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badge */}
                <div className="slide-up mb-3" style={{ animationDelay: "0.05s" }}>
                  <span className="badge-pill" style={{ color: active.accent, borderColor: active.accent + "55" }}>
                    {active.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="wcs-display text-white text-2xl leading-snug mb-3 slide-up" style={{ animationDelay: "0.1s" }}>
                  {active.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed slide-up" style={{ animationDelay: "0.15s" }}>
                  {active.description}
                </p>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-8 slide-up" style={{ animationDelay: "0.2s" }}>
                  {cardData.map((_, i) => (
                    <div
                      key={i}
                      className={`progress-dot ${i === activeIndex ? "active" : ""}`}
                      style={i === activeIndex ? { background: active.accent } : {}}
                      onClick={() => {
                        cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              {/* <div className="relative z-10 grid grid-cols-2 gap-2 mt-6">
                {stats.map((s) => (
                  <div key={s.label} className="stat-chip px-4 py-3">
                    <div className="wcs-display text-white text-xl">{s.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right Scrollable Tabs */}
            <div
              ref={scrollRef}
              className="wcs-scroll flex-1 bg-white overflow-y-scroll"
              style={{ scrollSnapType: "y mandatory" }}
            >
              {cardData.map((card, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  data-index={i}
                  className={`wcs-tab ${activeIndex === i ? "active-tab" : ""}`}
                  style={{ scrollSnapAlign: "start", minHeight: "calc(78vh / 4)", display: "flex", alignItems: "center" }}
                  onClick={() => {
                    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    setActiveIndex(i);
                  }}
                >
                  {/* Accent left line */}
                  <div className="tab-accent-line" style={{ background: card.accent }} />

                  {/* Number watermark */}
                  <div className="wcs-number">{card.number}</div>

                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 mr-4 border border-slate-100">
                    <Image src={card.icon} alt={card.title} width={56} height={56} className="w-full h-full object-cover" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 pr-12">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: card.accent }}>
                        {card.number}
                      </span>
                      <span className="badge-pill text-[9px]" style={{ color: card.accent, borderColor: card.accent + "40" }}>
                        {card.badge}
                      </span>
                    </div>
                    <h4 className="text-slate-900 font-semibold text-sm leading-snug line-clamp-2">{card.title}</h4>
                    {activeIndex === i && (
                      <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-2 slide-up">{card.description}</p>
                    )}
                  </div>

                  {/* Active arrow */}
                  {activeIndex === i && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-1"
                      style={{ background: card.accentLight }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke={card.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ═══ MOBILE LAYOUT ═══ */}
          <div className="lg:hidden">

            {/* Mobile header stat strip */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-3 text-center border border-slate-100 shadow-sm">
                  <div className="wcs-display text-slate-900 text-lg">{s.value}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mobile cards — horizontal-accented list style */}
            <div className="space-y-3">
              {cardData.map((card, i) => (
                <div
                  key={i}
                  data-mobileindex={i}
                  className={`wcs-card-enter ${visibleCards.has(i) ? "visible" : ""} bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex`}
                  style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                >
                  {/* Left accent strip + number */}
                  <div className="w-1 flex-shrink-0 rounded-l-2xl" style={{ background: card.accent }} />

                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 m-3 rounded-xl overflow-hidden border border-slate-100">
                    <Image src={card.icon} alt={card.title} width={80} height={80} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-3 pr-4 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold" style={{ color: card.accent }}>{card.number}</span>
                      <span className="badge-pill text-[9px]" style={{ color: card.accent, borderColor: card.accent + "40" }}>
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-slate-900 font-semibold text-sm leading-snug line-clamp-2 mb-1">{card.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default WhyChooseSection;