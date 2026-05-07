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
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-6 top-6 bottom-6 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-10">
        {steps.map((step, index) => {
          const Icon = icons[index] ?? House;
          const isRight = index % 2 === 1;

          return (
            <div key={step.id} className="relative md:grid md:grid-cols-2 md:gap-10">
              <div className={`pl-16 md:pl-0 ${isRight ? "md:col-start-2" : ""}`}>
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-2">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-heading text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>

              <div className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
