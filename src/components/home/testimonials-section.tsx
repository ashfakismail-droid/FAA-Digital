import { testimonials } from "@/config/testimonials";
import { Section, SectionHeader } from "@/components/ui/section";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { Marquee } from "@/components/motion/marquee";

export function TestimonialsSection() {
  const midpoint = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, midpoint);
  const rowTwo = testimonials.slice(midpoint);

  return (
    <Section bleed className="overflow-hidden">
      <div className="container-x">
        <SectionHeader
          tag="Client stories"
          title="Don't take our word for it"
          description="Every testimonial below is from a real project with measurable outcomes — most link directly to the case study behind them."
        />
      </div>

      <div className="flex flex-col gap-5">
        <Marquee className="mask-fade-x" speed="slow">
          {rowOne.map((t) => (
            <div key={t.name} className="mx-2.5 w-[380px] max-w-[85vw] shrink-0">
              <TestimonialCard testimonial={t} className="h-full" />
            </div>
          ))}
        </Marquee>
        <Marquee className="mask-fade-x" reverse speed="slow">
          {rowTwo.map((t) => (
            <div key={t.name} className="mx-2.5 w-[380px] max-w-[85vw] shrink-0">
              <TestimonialCard testimonial={t} className="h-full" />
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
