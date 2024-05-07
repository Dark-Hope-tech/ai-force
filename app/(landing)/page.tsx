import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  );
}

export default LandingPage;
