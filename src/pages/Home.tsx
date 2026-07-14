import CTA from "@/components/HomePage/CTA";
import FeaturedWorkers from "@/components/HomePage/FeaturedWorkers";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import Testimonials from "@/components/HomePage/Testimonials";
import TradeCategories from "@/components/HomePage/TradeCategories";
import WhyVerifiedHands from "@/components/HomePage/WhyVerifiedHands";

const Home = () => {
  return (
    <section>
      <Hero />
      <TradeCategories />
      <FeaturedWorkers />
      <section id="how-it-works"><HowItWorks /></section>
      <WhyVerifiedHands />
      <Testimonials />
      <CTA />
    </section>
  );
};

export default Home;