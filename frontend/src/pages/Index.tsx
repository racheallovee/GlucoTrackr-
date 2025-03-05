import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
    </div>
  );
};

export default Index;
