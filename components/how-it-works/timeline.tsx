import { CalendarCheck, House, Search } from "lucide-react";

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
}

const icons = [Search, CalendarCheck, House];

interface HowItWorksTimelineProps {
  steps: TimelineStep[];
}

export function HowItWorksTimeline({ steps }: HowItWorksTimelineProps) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Connecting line */}
      <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-primary/30 via-border to-primary/30 -translate-x-1/2" />

      <div className="space-y-6 md:space-y-0">
        {steps.map((step, index) => {
          const Icon = icons[index] ?? House;
          const isRight = index % 2 === 1;

          return (
            <div
              key={step.id}
              className="relative md:grid md:grid-cols-2 md:gap-16 md:py-8"
            >
              {/* Content card */}
              <div className={`pl-16 md:pl-0 ${isRight ? "md:col-start-2" : ""}`}>
                <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center node */}
              <div className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-background bg-foreground text-background shadow-md text-sm font-bold">
                  {index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
