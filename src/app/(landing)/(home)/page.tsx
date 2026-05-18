import Hero from "./HeroSection";
import WhoIsItFor from "./WhoIsFor/page";
import KeyBenefits from "./KeyBenefits/page";
import HowItWorksPage from "./HowItWorks/page";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIsItFor />
      <KeyBenefits />
      <HowItWorksPage />
    </>
  );
}
