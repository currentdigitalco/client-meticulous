import { Phone, Mail, CreditCard } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-soil border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src="/images/logo-full.png" alt="Meticulous LLC" className="h-20 w-auto" />
            <p className="mt-3 text-sm text-stone-light/50 max-w-xs leading-relaxed">
              Meticulous isn&apos;t just our name — it&apos;s our standard.
              Vermont property care since 2009.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light">
              Contact
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href="tel:802-342-8293"
                className="flex items-center gap-2 text-sm text-stone-light/70 transition-colors hover:text-cream"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                802-342-8293
              </a>
              <a
                href="mailto:info@meticulous802.com"
                className="flex items-center gap-2 text-sm text-stone-light/70 transition-colors hover:text-cream"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                info@meticulous802.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-copper-light">
              Quick Links
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Services", href: "#services" },
                { label: "Our Work", href: "#gallery" },
                { label: "Process", href: "#process" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-stone-light/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.yardbook.com/get_customer_invoice/92745-meticulous-mowing-and-property-management-llc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-stone-light/70 transition-colors hover:text-cream"
              >
                <CreditCard className="h-3.5 w-3.5" strokeWidth={2} />
                Pay Invoice
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-xs text-stone-light/40">
            &copy; {currentYear} Meticulous Mowing & Property Management, LLC.
            All rights reserved.
          </p>
          <p className="text-xs text-stone-light/30">
            Meticulous since 2009.
          </p>
        </div>
      </div>
    </footer>
  );
}
