import Image from "next/image";
import Link from "next/link";

interface AuthPageShellProps {
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  imageSrc: string;
  imageAlt: string;
  imageOnRight?: boolean;
  children: React.ReactNode;
}

export function AuthPageShell({
  title,
  subtitle,
  quote,
  quoteAuthor,
  quoteRole,
  imageSrc,
  imageAlt,
  imageOnRight = true,
  children,
}: AuthPageShellProps) {
  const formSection = (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-block mb-8">
          <span className="font-heading text-3xl text-primary">Nestly</span>
        </Link>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground text-base md:text-lg mb-8">{subtitle}</p>
        {children}
      </div>
    </div>
  );

  const imageSection = (
    <div className="hidden lg:block lg:w-1/2 relative min-h-screen">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/55" />
      <div className="absolute bottom-10 left-10 right-10 rounded-2xl bg-white/10 backdrop-blur-md p-6 text-white">
        <p className="text-base leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
        <p className="font-medium">{quoteAuthor}</p>
        <p className="text-sm text-white/75">{quoteRole}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {imageOnRight ? (
        <>
          {formSection}
          {imageSection}
        </>
      ) : (
        <>
          {imageSection}
          {formSection}
        </>
      )}
    </div>
  );
}
