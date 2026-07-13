import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="bg-teal rounded-2xl p-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[#eafff9]"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white max-w-md">
              Are you a skilled tradesperson?
            </h2>
            <p className="text-sm text-[#eafff9]/80 mt-2">
              Join 4,200+ workers getting steady, trusted work through VerifiedHands.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/register"
              className="bg-white text-teal-dark font-bold px-7 py-3.5 rounded-lg hover:bg-paper transition whitespace-nowrap inline-block"
            >
              Register as a worker →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;