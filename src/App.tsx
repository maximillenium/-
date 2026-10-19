/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader, SiteFooter } from "@/components/site/Layout";
import { BookingProvider } from "@/components/site/BookingContext";
import { Toaster } from "@/components/ui/sonner";

import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { PricesPage } from "@/pages/PricesPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactsPage } from "@/pages/ContactsPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { ConsentPage } from "@/pages/ConsentPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-[var(--gold)]/20 selection:text-[var(--gold)]">
          <SiteHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/prices" element={<PricesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
              <Route path="/consent" element={<ConsentPage />} />
              <Route path="/consent/" element={<ConsentPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}
