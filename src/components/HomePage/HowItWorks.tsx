import { motion } from "framer-motion";

const steps = [
  { num: "STEP 01", title: "Search by trade & area", desc: "Filter verified workers by skill, location, price and rating in seconds." },
  { num: "STEP 02", title: "Check the verification badge", desc: "Every worker's NID, skill test and past reviews are visible on their profile." },
  { num: "STEP 03", title: "Book & rate the job", desc: "Confirm the visit, pay after the work is done, and leave a public review." },
];

const HowItWorks = () => {
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
          <span className="font-mono text-xs text-teal-dark tracking-wider">03 · PROCESS</span>
          <h2 className="text-3xl font-bold text-navy mt-2">How <span className=" font-bold">
            <span>Verified</span>
            <span className="text-amber-500">Hands</span>
          </span> works</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, x: index === 0 ? -50 : index === 1 ? 0 : 50 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-paper-dim rounded-xl p-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="font-mono text-sm font-bold text-amber-dark mb-3.5"
              >
                {step.num}
              </motion.div>
              <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-sm text-[#5b5646]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;