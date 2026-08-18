import HeroSection from "@/components/home/HeroSection";
import EditorialRevealSection from "@/components/home/EditorialRevealSection";
import CollectionShowcaseSection from "@/components/home/CollectionShowcaseSection";
import FeaturePillsSection from "@/components/home/FeaturePillsSection";
import CursorReactiveSection from "@/components/home/CursorReactiveSection";
import MouseTrailCTASection from "@/components/home/MouseTrailCTASection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* 6 Storytelling Sections */}
      <HeroSection />
      <EditorialRevealSection />
      <CollectionShowcaseSection />
      <FeaturePillsSection />
      <CursorReactiveSection />
      <MouseTrailCTASection />
    </div>
  );
}
