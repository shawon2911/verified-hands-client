import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const AddProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    trade: "Electrician",
    bio: "",
    fullDescription: "",
    rate: "",
    rateType: "visit",
    location: "Dhaka",
    availability: "",
    imageUrl: "",
    experience: "",
    skills: "",
  });

  const trades = ["Electrician", "Plumber", "Driver", "House help", "Painter", "Carpenter"];
  const locations = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Mirpur", "Gulshan", "Uttara", "Dhanmondi"];
  const rateTypes = ["visit", "hour", "month"];

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
        name: formData.name,
        trade: formData.trade,
        bio: formData.bio,
        fullDescription: formData.fullDescription,
        rate: parseFloat(formData.rate),
        rateType: formData.rateType,
        location: formData.location,
        experience: parseInt(formData.experience) || 0,
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
        availability: formData.availability ? [formData.availability] : [],
        imageUrl: formData.imageUrl,
        userId: session.user.id,
        rating: 0,
        totalReviews: 0,
        verified: false,
      };

      await api.post("/api/workers", payload);
      setSuccess(true);
      setTimeout(() => navigate("/my-profile"), 1500);
    } catch (err) {
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <div className="text-xs font-mono text-[#7a7566] mb-2.5">Dashboard / Add profile</div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy">Create your worker profile</h1>
          <p className="text-[#5b5646] text-sm mt-1.5">
            This information will be shown to employers searching for your trade.
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Full name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rafiqul Islam"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Trade / category</label>
                  <select
                    name="trade"
                    value={formData.trade}
                    onChange={handleChange}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber bg-white"
                  >
                    {trades.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Years of experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 6"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Short description</label>
                  <input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="One line summary, e.g. Residential electrician with 6 years experience"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Full description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    placeholder="Describe your skills, tools you bring, and typical jobs you handle"
                    rows={4}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber resize-vertical min-h-[90px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Rate (৳)</label>
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    placeholder="e.g. 600"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Rate period</label>
                  <select
                    name="rateType"
                    value={formData.rateType}
                    onChange={handleChange}
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber bg-white"
                  >
                    {rateTypes.map((rt) => (
                      <option key={rt} value={rt}>Per {rt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Service area</label>
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

                <div>
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Availability</label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="e.g. Sun-Fri, 8am-8pm"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Enter skills separated by commas, e.g. Wiring, AC Installation, Fault Finding"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                  <p className="text-xs text-[#7a7566] mt-1.5">Separate skills with commas</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy-2 mb-1.5">Profile image URL (optional)</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Paste an image URL here"
                    className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                  />
                  <p className="text-xs text-[#7a7566] mt-1.5">A clear photo increases booking rate by ~30%.</p>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-4">{error}</p>
              )}

              {success && (
                <p className="text-teal text-sm mt-4">✅ Profile created successfully! Redirecting...</p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-amber text-navy font-bold px-7 py-3 rounded-lg hover:bg-[#E89A2E] transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit profile"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/my-profile")}
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

export default AddProfile;