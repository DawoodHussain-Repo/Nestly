import { SearchBar } from "./search-bar";

export function HeroSection() {
  return (
    <section className="relative py-32 px-6 overflow-visible bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Floating Cards */}
      <div className="absolute top-32 left-[10%] hidden lg:block">
        <div className="bg-background border border-border rounded-2xl p-4 shadow-lg transform rotate-[-8deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">50,000+</p>
              <p className="text-xs text-muted-foreground">Properties</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-32 right-[10%] hidden lg:block">
        <div className="bg-background border border-border rounded-2xl p-4 shadow-lg transform rotate-[8deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">4.9/5</p>
              <p className="text-xs text-muted-foreground">Guest Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-10 relative z-10 overflow-visible">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-primary/20 rounded-full shadow-sm">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-foreground uppercase">
            Over 50,000 Stays Worldwide
          </span>
        </div>
        
        <h1 className="w-full max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
          Find a place that feels like{" "}
          <span className="relative inline-block">
            <span className="italic text-primary relative z-10">home.</span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/10 -z-10" />
          </span>
        </h1>
        
        <p className="w-full max-w-2xl text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
          Unique spaces across Pakistan and beyond — no booking fees, ever.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}
