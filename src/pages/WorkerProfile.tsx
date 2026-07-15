import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { getWorkers } from "@/lib/api";

interface Worker {
  _id: string;
  name: string;
  trade: string;
  bio: string;
  fullDescription: string;
  rate: number;
  rateType: string;
  location: string;
  experience: number;
  skills: string[];
  availability: string[];
  rating: number;
  totalReviews: number;
  imageUrl: string;
  verified: boolean;
  userId: string;
}

const WorkerProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session) {
          navigate("/login");
          return;
        }

        const workers = await getWorkers();
        const userProfile = workers.find(
          (w: Worker) => w.userId === session.user.id
        );

        if (userProfile) {
          setProfile(userProfile);
        } else {
          setError("No profile found. Please create one.");
        }
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-paper min-h-screen">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-paper min-h-screen">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-navy">No Profile Found</h2>
          <p className="text-[#5b5646] mt-2">{error || "You haven't created a worker profile yet."}</p>
          <Link
            to="/profile/add"
            className="inline-block mt-6 bg-amber text-navy font-bold px-6 py-3 rounded-lg hover:bg-[#E89A2E] transition"
          >
            Create Profile →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy">My Profile</h1>
              <p className="text-[#5b5646] text-sm mt-1.5">
                Your worker profile as seen by employers
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/profile/add"
                className="bg-amber text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-[#E89A2E] transition text-sm"
              >
                Edit Profile
              </Link>
              <Link
                to="/dashboard/manage"
                className="border border-navy text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-navy hover:text-white transition text-sm"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-9 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-5 items-center mb-7">
                <div className="w-[88px] h-[88px] rounded-2xl bg-gradient-to-b from-[#d8d2c2] to-[#c7c0aa] flex items-center justify-center text-4xl text-navy-2 relative flex-shrink-0">
                  {profile.imageUrl ? (
                    <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    "👤"
                  )}
                  {profile.verified && (
                    <span className="absolute -bottom-2 -right-2 bg-teal text-[#eafff9] font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md border border-teal-dark">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-navy">{profile.name}</h1>
                  <div className="text-[#5b5646] text-sm">
                    {profile.trade} · {profile.location}
                  </div>
                  <div className="flex gap-3.5 mt-2 text-xs font-mono text-navy-2">
                    <span>★ {profile.rating} ({profile.totalReviews} reviews)</span>
                    <span>{profile.experience} yrs exp.</span>
                    <span className={profile.verified ? "text-teal font-semibold" : "text-amber font-semibold"}>
                      {profile.verified ? "✅ Verified" : "⏳ Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-navy border-b border-[#E5E1D8] pb-2 mb-3">Overview</h3>
                <p className="text-sm text-[#4a4638]">{profile.fullDescription || profile.bio}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-navy border-b border-[#E5E1D8] pb-2 mb-3">Skills & specifications</h3>
                <div>
                  {profile.skills.map((skill) => (
                    <span key={skill} className="inline-block bg-paper-dim border border-[#E5E1D8] px-3.5 py-1.5 rounded-full text-sm mr-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-paper-dim rounded-xl p-5 border border-[#E5E1D8]">
                <h3 className="text-sm font-bold text-navy mb-3">Profile Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[#5b5646]">Verification:</span>{" "}
                    <span className={profile.verified ? "text-teal font-semibold" : "text-amber font-semibold"}>
                      {profile.verified ? "✅ Verified" : "⏳ Pending Review"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5b5646]">Total Jobs:</span>{" "}
                    <span className="text-navy font-semibold">{profile.totalReviews}</span>
                  </div>
                  <div>
                    <span className="text-[#5b5646]">Rating:</span>{" "}
                    <span className="text-navy font-semibold">{profile.rating} ★</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-[#E5E1D8] rounded-xl p-5 sticky top-[88px]"
            >
              <div className="text-2xl font-mono font-bold text-navy">
                ৳{profile.rate}{" "}
                <span className="text-sm text-[#7a7566] font-normal">/ {profile.rateType}</span>
              </div>

              <div className="my-4">
                <div className="flex justify-between text-sm py-2 border-b border-dashed border-[#E5E1D8]">
                  <span>Service area</span>
                  <span>{profile.location}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-dashed border-[#E5E1D8]">
                  <span>Availability</span>
                  <span>{profile.availability.join(" · ")}</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span>Experience</span>
                  <span>{profile.experience} years</span>
                </div>
              </div>

              <Link
                to="/profile/add"
                className="w-full bg-amber text-navy font-bold py-3 rounded-lg hover:bg-[#E89A2E] transition block text-center"
              >
                Edit Profile
              </Link>
              
              <button
                onClick={() => navigate("/dashboard/manage")}
                className="w-full border border-navy text-navy font-semibold py-3 rounded-lg hover:bg-navy hover:text-white transition mt-2.5"
              >
                Go to Dashboard
              </button>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerProfilePage;