import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  { name: "Sadia Rahman", role: "Homeowner, Dhaka", text: "I hired an electrician through VerifiedHands and he showed up on time, fixed everything, and the price was fair. Will definitely use again." },
  { name: "Md. Shakil", role: "Small Business Owner", text: "I needed a driver for my delivery business. The verification gave me peace of mind and the driver has been reliable for 3 months now." },
  { name: "Tanvir Ahmed", role: "IT Professional", text: "Found a plumber within 10 minutes. The booking was smooth and the work quality was excellent. Highly recommend!" },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-paper-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs text-teal-dark tracking-wider">05 · TESTIMONIALS</span>
          <h2 className="text-3xl font-bold text-navy mt-2">Real stories from real people</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#E5E1D8] rounded-xl p-8 shadow-sm"
          >
            <p className="text-[#5b5646] text-sm italic">"{testimonials[activeIndex].text}"</p>
            <div className="mt-4">
              <div className="font-semibold text-navy">{testimonials[activeIndex].name}</div>
              <div className="text-xs text-[#7a7566]">{testimonials[activeIndex].role}</div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-teal w-8" : "bg-[#E5E1D8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;