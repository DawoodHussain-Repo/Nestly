import { SearchBar } from "./search-bar";

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 overflow-visible bg-gradient-to-b from-secondary/30 via-background to-background">
      {/* Subtle decorative elements — minimal, not distracting */}
      <div className="absolute top-20 right-[15%] w-64 h-64 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating trust signals */}
      <div className="absolute top-28 left-[8%] hidden xl:block">
        <div className="bg-card border border-border/60 rounded-xl p-4 shadow-md transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🏠</span>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground leading-tight">50,000+</p>
              <p className="text-[0.65rem] text-muted-foreground">Properties</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-28 right-[8%] hidden xl:block">
        <div className="bg-card border border-border/60 rounded-xl p-4 shadow-md transform rotate-[6deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⭐</span>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground leading-tight">4.9/5</p>
              <p className="text-[0.65rem] text-muted-foreground">Guest Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-8 relative z-10 overflow-visible">
        <div className="inline-flex items-center gap-2 py-2 px-4 bg-card border border-border/60 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase">
            Over 50,000 Stays Worldwide
          </span>
        </div>
        
        <h1 className="w-full max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.08] tracking-tight">
          Find a place that{" "}
          <br className="hidden sm:block" />
          feels like{" "}
          <span className="text-primary">home.</span>
        </h1>
        
        <p className="w-full max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Unique spaces across Pakistan and beyond — no booking fees, ever.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}
