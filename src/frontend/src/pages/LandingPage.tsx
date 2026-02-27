import AboutSection from "../components/swarang/AboutSection";
import AuditionsSection from "../components/swarang/AuditionsSection";
import CategoriesSection from "../components/swarang/CategoriesSection";
import ContactSection from "../components/swarang/ContactSection";
import CountdownSection from "../components/swarang/CountdownSection";
import HeroSection from "../components/swarang/HeroSection";
import Navbar from "../components/swarang/Navbar";
import RegistrationSection from "../components/swarang/RegistrationSection";
import SoundToggle from "../components/swarang/SoundToggle";
import { useEventInfo } from "../hooks/useQueries";

export default function LandingPage() {
  const { data: eventInfo } = useEventInfo();

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection eventInfo={eventInfo} />
        <CategoriesSection />
        <AuditionsSection
          dates={eventInfo?.dates}
          location={eventInfo?.location}
        />
        <CountdownSection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <SoundToggle />
    </div>
  );
}
