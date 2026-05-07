import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const linkClass = "text-sm text-background/70 hover:text-background transition-colors";
  const sections = [
    { title: "Support", links: ["Help Center", "Contact Us", "Safety"] },
    { title: "Community", links: ["Become a Host", "Community Center", "Blog"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ];
  const socials = ["Facebook", "Twitter", "Instagram"];

  return (
    <footer className="bg-foreground text-background">
      <div className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Branding */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">
                    N
                  </span>
                </div>
                <span className="font-heading text-lg font-bold text-background">
                  Nestly
                </span>
              </div>
              <p className="text-sm text-background/70">
                Discover unique places and unforgettable experiences worldwide.
              </p>
            </div>

            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold mb-4 text-background">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="/" className={linkClass}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-background/20 mb-6" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/70">
              &copy; {currentYear} Nestly, Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              {socials.map((social) => (
                <Link key={social} href="/" className={linkClass}>
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
