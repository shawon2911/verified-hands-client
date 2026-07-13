import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "100%", label: "NID Verification" },
  { number: "Skill Test", label: "Passed" },
  { number: "4.7★", label: "Average Rating" },
  { number: "Trust Score", label: "Verified" },
];

const WhyVerifiedHands = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs text-teal-dark tracking-wider">04 · WHY VERIFIEDHANDS</span>
          <h2 className="text-3xl font-bold text-navy mt-2">Trust & safety, built in</h2>
          <p className="text-[#5b5646] text-sm mt-2 max-w-xl mx-auto">
            Every worker on our platform goes through a multi-step verification process before they can be hired.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
              className="text-center p-6 border border-[#E5E1D8] rounded-xl bg-paper"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
                className="font-heading text-2xl font-bold text-teal"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-[#5b5646] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVerifiedHands;