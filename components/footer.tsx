import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const sections = [
    { title: "Support", links: ["Help Center", "Contact Us", "Safety"] },
    { title: "Community", links: ["Become a Host", "Community Center", "Blog"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ];
  const socials = ["Facebook", "Twitter", "Instagram"];

  return (
    <footer className="bg-foreground text-background/90">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Branding */}
          <div>
            <span className="font-heading text-lg font-bold text-background tracking-tight">
              nest<span className="text-primary">ly</span>
            </span>
            <p className="text-sm text-background/50 mt-3 leading-relaxed">
              Discover unique places and unforgettable experiences worldwide.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold mb-4 text-background/40 uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="/" className="text-sm text-background/60 hover:text-background transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; {currentYear} Nestly, Inc. All rights reserved.
          </p>
          <div className="flex gap-5">
            {socials.map((social) => (
              <Link key={social} href="/" className="text-xs text-background/40 hover:text-background/70 transition-colors">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
