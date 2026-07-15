import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { getJobs, getWorkers } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  shortDescription: string;
  trade: string;
  budget: number;
  location: string;
  address: string;
  status: string;
  preferredDate: string;
  employerId: string;
  createdAt: string;
}

interface Worker {
  _id: string;
  name: string;
  userId: string;
}

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [workerProfile, setWorkerProfile] = useState<Worker | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        setUser(session.user);

        // Check if worker has profile
        const workers = await getWorkers();
        const profile = workers.find((w: Worker) => w.userId === session.user.id);
        setWorkerProfile(profile || null);

        // Get all open jobs
        const allJobs = await getJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const filteredJobs = jobs.filter(job => {
    // Filter by status
    if (filter !== "all" && job.status !== filter) return false;
    
    // Search by title or trade
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return job.title.toLowerCase().includes(term) || 
             job.trade.toLowerCase().includes(term) ||
             job.location.toLowerCase().includes(term);
    }
    
    return true;
  });

  const stats = {
    total: jobs.length,
    open: jobs.filter(j => j.status === "open").length,
    inProgress: jobs.filter(j => j.status === "in-progress").length,
    completed: jobs.filter(j => j.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <div className="text-navy">Loading available jobs...</div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      {/* Page Head */}
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy">Available Jobs</h1>
              <p className="text-[#5b5646] text-sm mt-1.5">
                {jobs.length} jobs available for {user?.name || "workers"}
              </p>
            </div>
            {!workerProfile && (
              <Link
                to="/profile/add"
                className="bg-amber text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-[#E89A2E] transition text-sm"
              >
                + Create Profile to Apply
              </Link>
            )}
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">Total Available</div>
              <div className="text-2xl font-heading font-bold text-navy">{stats.total}</div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">Open</div>
              <div className="text-2xl font-heading font-bold text-green-600">{stats.open}</div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">In Progress</div>
              <div className="text-2xl font-heading font-bold text-amber-600">{stats.inProgress}</div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">Completed</div>
              <div className="text-2xl font-heading font-bold text-teal-600">{stats.completed}</div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex-1 flex items-center border border-[#E5E1D8] rounded-lg px-4 bg-white h-11 w-full sm:max-w-sm">
              <input
                type="text"
                placeholder="Search by title, trade or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none outline-none text-sm bg-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "open", "in-progress", "completed"].map((status) => (
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
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-12 text-center">
              <p className="text-[#5b5646]">No jobs found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-[#E5E1D8] rounded-xl p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-navy text-sm">{job.title}</h3>
                      <p className="text-xs text-[#7a7566] mt-1">{job.trade}</p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-navy bg-paper-dim px-2.5 py-1 rounded">
                      ৳{job.budget}
                    </span>
                  </div>

                  <p className="text-xs text-[#5b5646] mt-2 line-clamp-2">
                    {job.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-[#7a7566]">
                    <span>📍 {job.location}</span>
                    <span>📅 {new Date(job.preferredDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E1D8]">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      job.status === "open" ? "bg-green-100 text-green-700" :
                      job.status === "in-progress" ? "bg-amber-100 text-amber-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    {workerProfile ? (
                      <Link
                        to={`/jobs/${job._id}`}
                        className="text-teal font-semibold text-sm hover:underline"
                      >
                        View Details →
                      </Link>
                    ) : (
                      <Link
                        to="/profile/add"
                        className="text-amber font-semibold text-sm hover:underline"
                      >
                        Create Profile
                      </Link>
                    )}
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

export default WorkerDashboard;