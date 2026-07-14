import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-paper min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-navy text-white py-16 text-center"
      >
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <span className="font-mono text-xs text-amber tracking-wider">ABOUT VERIFIEDHANDS</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto mt-3.5"
          >
            Building trust into Bangladesh's informal job market.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-paper/70 max-w-md mx-auto mt-3.5 text-sm"
          >
            We verify every worker's identity and skill so employers can hire with confidence — and workers get steady, fairly-paid work.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission */}
      <section className="py-14">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-teal-dark tracking-wider">OUR MISSION</span>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mt-2 mb-4">Why we started VerifiedHands</h2>
            <p className="text-sm text-[#4a4638] max-w-2xl mb-9">
              Millions of skilled tradespeople in Bangladesh rely on word-of-mouth to find work, with no way to prove their skill or track record. Employers, meanwhile, have no way to verify who they're letting into their homes. VerifiedHands bridges that gap with ID verification, skill tests, and a public review system.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              { icon: "✅", title: "Verified, not just listed", desc: "Every worker passes NID and skill verification before going live." },
              { icon: "⭐", title: "Ratings that matter", desc: "Public reviews from real completed jobs, not paid placements." },
              { icon: "🤝", title: "Fair for both sides", desc: "Transparent pricing and no hidden platform fees for workers." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                className="bg-white border border-[#E5E1D8] rounded-xl p-6"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-base font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-[#5b5646]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-14 bg-paper-dim">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-teal-dark tracking-wider">OUR JOURNEY</span>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mt-2 mb-6">Milestones</h2>
          </motion.div>

          <div className="border-l-2 border-[#E5E1D8] pl-6">
            {[
              { year: "2024", desc: "VerifiedHands founded in Dhaka with 50 verified electricians." },
              { year: "2025", desc: "Expanded to 6 trades and 20 districts across Bangladesh." },
              { year: "2026", desc: "Crossed 4,200 verified workers and 18,600 completed jobs." },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative mb-6"
              >
                <div className="absolute w-2.5 h-2.5 bg-amber rounded-full -left-[29px] top-1.5"></div>
                <div className="font-mono text-xs font-bold text-teal-dark">{item.year}</div>
                <p className="text-sm text-[#4a4638]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;