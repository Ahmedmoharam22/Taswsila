import HeroSection from "../components/home/HeroSection";
import Footer from "../components/layout/Footer";
import HowItWorks from "../components/home/HowItWorks";
import StatsBar from "../components/home/StatsBar";
import ResultsSection from "../components/home/ResultsSection";

const Home = () => {

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. Hero Section */}
      <HeroSection />
      {/* 2. How It Works Section */}
      <HowItWorks />
      {/* 3. Stats Bar */}
      <StatsBar />
      {/* 4. Result Section */}
      <ResultsSection />
      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default Home;