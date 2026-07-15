import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-navy text-paper/70 pt-14 pb-7 mt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 border-b border-paper/10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2"
          >
            <Link
  to="/"
  className="flex items-center gap-2 font-heading font-bold text-xl"
>
  <img 
    src="/favicon4.png" 
    alt="VerifiedHands" 
    className="h-12 w-auto"  // height 8 = 32px
  />
  <span className="text-2xl text-white font-bold">
    <span>Verified</span>
    <span className="text-amber-500">Hands</span>
  </span>
</Link>
            <p className="text-sm max-w-xs text-paper/60">
              Bangladesh's verified marketplace for local skilled workers.
            </p>
          </motion.div>

          {/* Platform Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white text-base font-bold font-mono tracking-wider mb-3.5">Platform</h4>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/workers"
              className="block text-sm mb-2.5 transition"
            >
              Find workers
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/categories"
              className="block text-sm mb-2.5 transition"
            >
              Categories
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/pricing"
              className="block text-sm mb-2.5 transition"
            >
              Pricing
            </motion.a>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white text-base font-bold font-mono tracking-wider mb-3.5">Company</h4>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/about"
              className="block text-sm mb-2.5 transition"
            >
              About
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/contact"
              className="block text-sm mb-2.5 transition"
            >
              Contact
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/blog"
              className="block text-sm mb-2.5 transition"
            >
              Blog
            </motion.a>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-white text-base font-bold font-mono tracking-wider mb-3.5">Support</h4>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/help"
              className="block text-sm mb-2.5 transition"
            >
              Help center
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/terms"
              className="block text-sm mb-2.5 transition"
            >
              Terms
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="/privacy"
              className="block text-sm mb-2.5 transition"
            >
              Privacy
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center pt-5 text-sm"
        >
          <span>© 2026 VerifiedHands. All rights reserved.</span>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 mt-2 sm:mt-0"
          >
            <motion.span
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              className="cursor-pointer transition"
            >
              Facebook
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              className="cursor-pointer transition"
            >
              LinkedIn
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              className="cursor-pointer transition"
            >
              YouTube
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;