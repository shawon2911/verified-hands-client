import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-navy text-paper pt-16 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[56vh]">
          {/* Left - Fade In Up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 font-mono text-xs text-amber bg-amber/10 border border-amber/40 px-3 py-1.5 rounded-full mb-5"
            >
              ● 4,200+ workers ID-verified
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold leading-[1.1] mb-4"
            >
              Hire skilled workers you can actually trust.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-paper/70 text-base max-w-md mb-7"
            >
              VerifiedHands verifies every electrician, plumber, mistri and
              driver on the platform — so you know who's showing up at your
              door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/workers"
                className="bg-amber text-navy font-bold px-6 py-3 rounded-lg hover:bg-[#E89A2E] transition"
              >
                Find a worker
              </Link>
              <Link
                to="/register"
                className="border border-paper/40 text-paper font-bold px-6 py-3 rounded-lg hover:bg-paper/10 transition"
              >
                Join as a worker
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Search Ticket Slide In */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-paper rounded-xl p-5 text-navy shadow-2xl relative"
          >
            <div className="absolute w-5 h-5 bg-navy rounded-full top-1/2 -translate-y-1/2 -left-2.5"></div>
            <div className="absolute w-5 h-5 bg-navy rounded-full top-1/2 -translate-y-1/2 -right-2.5"></div>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
              <div className="flex-1 border border-[#E5E1D8] rounded-lg px-3.5 py-3 bg-paper-dim">
                <label className="block text-[11px] font-mono uppercase tracking-wide text-navy-2 mb-1">
                  Trade
                </label>
                <select className="w-full bg-transparent border-none outline-none text-sm font-body">
                  <option>Electrician</option>
                  <option>Plumber</option>
                  <option>Driver</option>
                  <option>House help</option>
                </select>
              </div>
              <div className="flex-1 border border-[#E5E1D8] rounded-lg px-3.5 py-3 bg-paper-dim">
                <label className="block text-[11px] font-mono uppercase tracking-wide text-navy-2 mb-1">
                  Location
                </label>
                <input
                  placeholder="Mirpur, Dhaka"
                  className="w-full bg-transparent border-none outline-none text-sm font-body"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-amber text-navy font-bold py-3 rounded-lg hover:bg-[#E89A2E] transition"
            >
              Search verified workers →
            </motion.button>
          </motion.div>
        </div>

        {/* Stats - Stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.5 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-4 border-t border-paper/15 mt-12"
        >
          {[
  { num: "4,200+", label: "verified workers" },
  { num: "18,600", label: "jobs completed" },
  { num: "42", label: "districts covered" },
  { num: "4.7 / 5", label: "avg. rating" },
].map((stat) => (
  <motion.div
    key={stat.label}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    
    className="py-5 px-4 text-center border-b border-paper/15 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
  >
              <div className="font-heading text-2xl font-bold text-amber">
                {stat.num}
              </div>
              <div className="text-xs font-mono text-paper/50 mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
