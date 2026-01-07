import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { UploadSection } from "@/components/UploadSection";
import { FullRecap } from "@/components/FullRecap";
import { PrivacySection } from "@/components/PrivacySection";
import { Footer } from "@/components/Footer";
import type { RecapData } from "@/lib/chatParser";

type ViewMode = "home" | "recap";

const Index = () => {
  const [recap, setRecap] = useState<RecapData | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRecapGenerated = (recapData: RecapData) => {
    setRecap(recapData);
    setViewMode("recap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewRecap = () => {
    setRecap(null);
    setViewMode("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Full Recap View */}
      {viewMode === "recap" && recap && (
        <>
          <FullRecap recap={recap} onNewRecap={handleNewRecap} />
          <PrivacySection />
          <Footer />
        </>
      )}

      {/* Home View */}
      {viewMode === "home" && (
        <>
          <HeroSection onUploadClick={handleUploadClick} />
          <HowItWorks />
          <div ref={uploadRef}>
            <UploadSection onRecapGenerated={handleRecapGenerated} />
          </div>
          <PrivacySection />
          <Footer />
        </>
      )}
    </main>
  );
};

export default Index;
