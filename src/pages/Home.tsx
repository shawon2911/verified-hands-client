import FeaturedWorkers from "@/components/HomePage/FeaturedWorkers";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import TradeCategories from "@/components/HomePage/TradeCategories";

const Home = () => {
  return (
    <section>
      <Hero />
      <TradeCategories />
      <FeaturedWorkers />
      <HowItWorks />
    </section>
  );
};

export default Home;