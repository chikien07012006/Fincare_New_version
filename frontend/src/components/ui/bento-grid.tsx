import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden",
      // glassmorphism container per spec
      "rounded-[18px] p-8 text-white [backdrop-filter:blur(12px)]",
      "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_12px_40px_rgba(0,0,0,0.45)]",
      "[background:linear-gradient(180deg,rgba(0,0,0,0.65),rgba(0,0,0,0.35))]",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    {/* gradient border ring */}
    <div className="pointer-events-none absolute inset-0 rounded-[18px] p-px [background:linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]" />
    {/* outer halo */}
    <div className="-z-10 absolute rounded-[18px] [inset:-40px] [background:radial-gradient(closest-side,rgba(255,255,255,0.035),rgba(255,255,255,0)_80%)] [filter:blur(25px)]" />
    <div className="p-0">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-200 transition-all duration-300 ease-in-out group-hover:scale-90" />
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-300">{description}</p>
      </div>

      <div className={cn("lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100")}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div className={cn("hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100")}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className="pointer-events-auto p-0"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
