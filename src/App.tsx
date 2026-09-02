import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StatStrip from "./components/StatStrip";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import { AdminBar } from "./components/admin/AdminBar";
import { AdminLoginModal } from "./components/admin/AdminLoginModal";
import { SiteProvider } from "./context/SiteContext";
import { useReveal } from "./lib/useReveal";

function AppContent() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatStrip />
        <Services />
        <Work />
        <Process />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <AdminBar />
      <AdminLoginModal />
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
