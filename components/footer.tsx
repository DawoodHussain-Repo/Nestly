import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white bg-inverse-surface">
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
                <span className="font-serif text-lg font-bold text-inverse-on-surface">
                  Nestly
                </span>
              </div>
              <p className="body-sm text-inverse-on-surface/70">
                Discover unique places and unforgettable experiences worldwide.
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="label-md font-bold mb-4 text-inverse-on-surface">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Safety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="label-md font-bold mb-4 text-inverse-on-surface">
                Community
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Become a Host
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Community Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="label-md font-bold mb-4 text-inverse-on-surface">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-inverse-on-surface/20 mb-6" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="body-sm text-inverse-on-surface/70">
              &copy; {currentYear} Nestly, Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/"
                className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
              >
                Facebook
              </Link>
              <Link
                href="/"
                className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="/"
                className="body-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
