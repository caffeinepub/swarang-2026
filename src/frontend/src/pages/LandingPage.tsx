import Navbar from "../components/swarang/Navbar";
import HeroSection from "../components/swarang/HeroSection";
import AboutSection from "../components/swarang/AboutSection";
import CategoriesSection from "../components/swarang/CategoriesSection";
import AuditionsSection from "../components/swarang/AuditionsSection";
import CountdownSection from "../components/swarang/CountdownSection";
import RegistrationSection from "../components/swarang/RegistrationSection";
import ContactSection from "../components/swarang/ContactSection";
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
        <ContactSection eventInfo={eventInfo} />
      </main>
      <SoundToggle />
    </div>
  );
}
