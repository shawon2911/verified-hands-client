import { motion } from "framer-motion";

const trades = [
  { icon: "⚡", name: "Electrician" },
  { icon: "🔧", name: "Plumber" },
  { icon: "🚗", name: "Driver" },
  { icon: "🧹", name: "House help" },
  { icon: "🎨", name: "Painter" },
  { icon: "🪚", name: "Carpenter" },
];

const TradeCategories = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-teal-dark tracking-wider">01 · CATEGORIES</span>
          <h2 className="text-3xl font-bold text-navy mt-2">Browse by trade</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
        >
          {trades.map((trade) => (
            <motion.div
              key={trade.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-[#E5E1D8] rounded-xl p-5 text-center bg-white"
            >
              <div className="text-3xl mb-2">{trade.icon}</div>
              <div className="text-sm font-semibold text-navy">{trade.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TradeCategories;