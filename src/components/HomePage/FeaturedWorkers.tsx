import { motion } from "framer-motion";

const workers = [
  { id: 1, icon: "⚡", name: "Rafiqul Islam", role: "Electrician · 6 yrs exp.", rating: "★ 4.9 (128)", rate: "৳600/visit" },
  { id: 2, icon: "🔧", name: "Karim Sheikh", role: "Plumber · 4 yrs exp.", rating: "★ 4.8 (94)", rate: "৳500/visit" },
  { id: 3, icon: "🚗", name: "Anwar Hossain", role: "Driver · 9 yrs exp.", rating: "★ 4.9 (210)", rate: "৳18k/mo" },
  { id: 4, icon: "🧹", name: "Shirin Akter", role: "House help · 5 yrs exp.", rating: "★ 4.7 (76)", rate: "৳8k/mo" },
];

const FeaturedWorkers = () => {
  return (
    <section className="py-20 bg-paper-dim">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-teal-dark tracking-wider">02 · FEATURED</span>
          <h2 className="text-3xl font-bold text-navy mt-2">Verified workers near you</h2>
          <p className="text-[#5b5646] text-sm mt-2">Every profile below has passed ID and skill verification.</p>
        </motion.div>

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {workers.map((worker) => (
            <motion.div
              key={worker.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden"
            >
              <div className="h-[150px] bg-gradient-to-b from-[#d8d2c2] to-[#c7c0aa] flex items-center justify-center text-4xl text-navy-2 relative">
                {worker.icon}
                <motion.span
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-3 right-3 bg-teal text-[#eafff9] font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md rotate-[4deg] border border-teal-dark"
                >
                  ✓ Verified
                </motion.span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="font-semibold text-navy">{worker.name}</div>
                <div className="text-xs font-mono text-[#7a7566]">{worker.role}</div>
                <div className="flex justify-between text-xs text-[#5b5646] border-t border-dashed border-[#E5E1D8] pt-2.5 mt-auto">
                  <span>{worker.rating}</span>
                  <span className="font-mono font-semibold text-navy">{worker.rate}</span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1.5 text-center py-2.5 rounded-lg border border-navy text-sm font-semibold text-navy hover:bg-navy hover:text-white transition cursor-pointer"
                >
                  View profile
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;