import FeaturedWorkers from "@/components/HomePage/FeaturedWorkers";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import TradeCategories from "@/components/HomePage/TradeCategories";
import WhyVerifiedHands from "@/components/HomePage/WhyVerifiedHands";

const Home = () => {
  return (
    <section>
      <Hero />
      <TradeCategories />
      <FeaturedWorkers />
      <HowItWorks />
      <WhyVerifiedHands />
    </section>
  );
};

export default Home;