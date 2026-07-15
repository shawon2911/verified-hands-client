import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { getEmployerJobs } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  shortDescription: string;
  trade: string;
  budget: number;
  location: string;
  address: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  preferredDate: string;
  createdAt: string;
}

const MyRequests = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [_user, setUser] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        setUser(session.user);

        const employerJobs = await getEmployerJobs(session.user.id);
        setJobs(employerJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const filteredJobs = filter === "all" 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  const statusColors = {
    open: "bg-green-100 text-green-700",
    "in-progress": "bg-amber-100 text-amber-700",
    completed: "bg-teal-100 text-teal-700",
    cancelled: "bg-red-100 text-red-700",
  };

  if (loading) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <div className="text-navy">Loading your requests...</div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy">My Requests</h1>
              <p className="text-[#5b5646] text-sm mt-1.5">
                All job requests you've posted ({jobs.length} total)
              </p>
            </div>
            <Link
              to="/post-job"
              className="bg-amber text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-[#E89A2E] transition text-sm"
            >
              + Post New Job
            </Link>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "open", "in-progress", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition capitalize ${
                  filter === status
                    ? "bg-navy text-white"
                    : "bg-white border border-[#E5E1D8] text-[#5b5646] hover:bg-paper-dim"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-12 text-center">
              <p className="text-[#5b5646]">No jobs found.</p>
              <Link to="/post-job" className="inline-block mt-4 text-teal font-semibold hover:underline">
                Post your first job →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-[#E5E1D8] rounded-xl p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-navy">{job.title}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[job.status]}`}>
                          {job.status}
                        </span>
                        <span className="text-xs font-mono text-[#7a7566] bg-paper-dim px-2.5 py-1 rounded">
                          {job.trade}
                        </span>
                      </div>
                      <p className="text-sm text-[#5b5646] mt-1">{job.shortDescription}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-[#7a7566]">
                        <span>📍 {job.location}</span>
                        <span>💰 ৳{job.budget}</span>
                        <span>📅 {new Date(job.preferredDate).toLocaleDateString()}</span>
                        <span>🕐 {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="border border-navy text-navy font-semibold px-4 py-1.5 rounded-lg hover:bg-navy hover:text-white transition text-sm"
                      >
                        View
                      </Link>
                      {job.status === "open" && (
                        <button
                          className="border border-red-400 text-red-500 font-semibold px-4 py-1.5 rounded-lg hover:bg-red-50 transition text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyRequests;