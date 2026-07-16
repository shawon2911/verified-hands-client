import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState("Electrician");
  const [_checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    budget: "",
    preferredDate: "",
    location: "Dhaka",
    address: "",
  });

  const trades = [
    { icon: "⚡", name: "Electrician" },
    { icon: "🔧", name: "Plumber" },
    { icon: "🚗", name: "Driver" },
    { icon: "🎨", name: "Painter" },
    { icon: "🪚", name: "Carpenter" },
    { icon: "🧹", name: "House help" },
  ];

  const locations = ["Dhaka", "Chattogram", "Khulna", "Rajshahi"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: session } = await authClient.getSession();
      
      if (!session) {
        setError("Please login first");
        setLoading(false);
        
        return;
      }

      const payload = {
        ...formData,
        trade: selectedTrade,
        budget: parseFloat(formData.budget),
        employerId: session.user.id,
        status: "open",
      };

      await api.post("/api/jobs", payload);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard/manage"), 1500);
    } catch (err) {
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const { data: session } = await authClient.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Session check failed:", error);
      navigate("/login");
      return;
    } finally {
      setCheckingAuth(false);
    }
  };

  checkAuth();
}, [navigate]);
  

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <div className="text-xs font-mono text-[#7a7566] mb-2.5">Dashboard / Post a job</div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy">Post a job request</h1>
          <p className="text-[#5b5646] text-sm mt-1.5">
            Describe what you need done — verified workers nearby will be notified.
          </p>
        </div>
      </div>

      <section className="py-14">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#E5E1D8] rounded-xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Job title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Fix kitchen wiring and install new socket"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                    required
                  />
                </div>

                {/* Trade Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-2">Trade needed</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
                    {trades.map((trade) => (
                      <button
                        key={trade.name}
                        type="button"
                        onClick={() => setSelectedTrade(trade.name)}
                        className={`border-2 rounded-lg py-3 text-center text-sm font-semibold transition ${
                          selectedTrade === trade.name
                            ? "border-amber bg-amber/10 text-navy"
                            : "border-[#E5E1D8] bg-white text-[#7a7566] hover:border-amber/50"
                        }`}
                      >
                        <div className="text-xl">{trade.icon}</div>
                        {trade.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Short description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="One line summary of the job"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>

                {/* Full Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Full description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    placeholder="Explain the work needed in detail — access instructions, materials, urgency, etc."
                    rows={4}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber resize-vertical min-h-[90px]"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Budget (৳)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. 800"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                  <p className="text-xs text-[#5b5646] mt-1.5">
                    Typical range for this trade: ৳500–৳1,200 per visit
                  </p>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Preferred date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Location (district)</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber bg-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Area / address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Road 4, Dhanmondi"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-4">{error}</p>
              )}

              {success && (
                <p className="text-teal text-sm mt-4">✅ Job posted successfully! Redirecting...</p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-amber text-navy font-bold px-7 py-3 rounded-lg hover:bg-[#E89A2E] transition disabled:opacity-50"
                >
                  {loading ? "Posting..." : "Post job"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/manage")}
                  className="border border-[#E5E1D8] text-navy font-semibold px-7 py-3 rounded-lg hover:bg-paper-dim transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PostJob;