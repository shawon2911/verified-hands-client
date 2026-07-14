import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "General inquiry", message: "" });
  };

  const contactInfo = [
    { icon: "✉️", title: "Email", detail: "support@verifiedhands.com" },
    { icon: "📞", title: "Phone", detail: "+880 1XXX-XXXXXX (9am–9pm, Sun–Fri)" },
    { icon: "📍", title: "Office", detail: "Gulshan Avenue, Dhaka 1212, Bangladesh" },
    { icon: "💬", title: "Social", detail: "Facebook · LinkedIn · YouTube" },
  ];

  return (
    <div className="bg-paper min-h-screen">
      {/* Page Head */}
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <h1 className="text-3xl font-bold text-navy">Get in touch</h1>
          <p className="text-[#5b5646] text-sm mt-1.5">
            Questions about hiring, joining as a worker, or a specific job? We're here to help.
          </p>
        </div>
      </div>

      <section className="py-14">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-[#E5E1D8] rounded-xl p-8"
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber bg-white"
                  >
                    <option>General inquiry</option>
                    <option>Report an issue</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={4}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber resize-vertical min-h-[90px]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-amber text-navy font-bold px-7 py-3 rounded-lg hover:bg-[#E89A2E] transition"
                >
                  Send message
                </button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-teal text-sm mt-4"
                  >
                    ✅ Message sent successfully!
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5"
            >
              {contactInfo.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex gap-3.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-paper-dim flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-navy">{item.title}</h4>
                    <p className="text-sm text-[#5b5646]">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;