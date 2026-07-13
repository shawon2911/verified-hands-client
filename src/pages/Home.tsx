import FeaturedWorkers from "@/components/HomePage/FeaturedWorkers";
import Hero from "@/components/HomePage/Hero";
import TradeCategories from "@/components/HomePage/TradeCategories";

const Home = () => {
  return (
    <section>
      <Hero />
      <TradeCategories />
      <FeaturedWorkers />
    </section>
  );
};

export default Home;