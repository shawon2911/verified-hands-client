import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { getEmployerJobs, getWorkers } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  shortDescription: string;
  trade: string;
  budget: number;
  location: string;
  status: "open" | "booked" | "closed";
  createdAt: string;
  employerId: string;
}

interface Worker {
  _id: string;
  name: string;
  userId: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [_user, setUser] = useState<any>(null);
  const [_userRole, setUserRole] = useState("employer");
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("all");
  const [_workerProfile, setWorkerProfile] = useState<Worker | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session) {
          navigate("/login");
          return;
        }

        setUser(session.user);
        const role = (session.user as any)?.role || "employer";
        setUserRole(role);

        if (role === "employer") {
          const employerJobs = await getEmployerJobs(session.user.id);
          setJobs(employerJobs);
        } else if (role === "worker") {
          const workers = await getWorkers();
          const profile = workers.find(
            (w: Worker) => w.userId === session.user.id,
          );
          setWorkerProfile(profile || null);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.status === filter);

  const stats = {
    total: jobs.length,
    open: jobs.filter((j) => j.status === "open").length,
    booked: jobs.filter((j) => j.status === "booked").length,
    closed: jobs.filter((j) => j.status === "closed").length,
  };

  const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-700";
    case "booked":
      return "bg-amber-100 text-amber-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-teal-100 text-teal-700";
    case "closed":
      return "bg-gray-100 text-gray-600";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <div className="text-navy">Loading dashboard...</div>
      </div>
    );
  }

  // Graph Data - শেষ ৭ দিনের job count
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toLocaleDateString("en-US", { weekday: "short" }));
  }
  return days;
};

const getWeeklyJobCount = () => {
  const days = getLast7Days();
  return days.map((day, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const count = jobs.filter(job => {
      const jobDate = new Date(job.createdAt);
      return jobDate.toDateString() === date.toDateString();
    }).length;
    return { day, count, height: Math.max(count * 20, 10) };
  });
};

const weeklyData = getWeeklyJobCount();
const maxHeight = Math.max(...weeklyData.map(d => d.height), 40);

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy">
            Manage your job requests
          </h1>
          <p className="text-[#5b5646] text-sm mt-1.5">
            Track, edit, and review all jobs you've posted.
          </p>
        </div>
      </div>

      <section className="py-14">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">
                Total jobs posted
              </div>
              <div className="text-2xl font-heading font-bold text-navy">
                {stats.total}
              </div>
              <div className="text-xs text-teal-dark mt-1">+3 this month</div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">
                Open requests
              </div>
              <div className="text-2xl font-heading font-bold text-navy">
                {stats.open}
              </div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">
                Completed
              </div>
              <div className="text-2xl font-heading font-bold text-navy">
                {stats.closed}
              </div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-5">
              <div className="text-xs font-mono text-[#7a7566] mb-2">
                Avg. worker rating given
              </div>
              <div className="text-2xl font-heading font-bold text-navy">
                4.8
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white border border-[#E5E1D8] rounded-xl p-5 mb-8">
            <span className="font-mono text-xs text-teal-dark tracking-wider">
              JOB POSTS THIS WEEK
            </span>
            <div className="flex items-end gap-2 h-[120px] mt-4">
              {weeklyData.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-amber rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${(item.height / maxHeight) * 100}%`,
                      minHeight: item.count > 0 ? "8px" : "0px",
                    }}
                  />
                  <span className="text-[11px] text-[#7a7566] font-mono mt-1.5">
                    {item.day}
                  </span>
                  {item.count > 0 && (
                    <span className="text-[10px] text-navy font-semibold">
                      {item.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-[#E5E1D8] mb-5">
            {[
              { key: "all", label: `All jobs (${stats.total})` },
              { key: "open", label: `Open (${stats.open})` },
              { key: "booked", label: `Booked (${stats.booked})` },
              { key: "closed", label: `Closed (${stats.closed})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
                  filter === tab.key
                    ? "text-navy border-amber"
                    : "text-[#7a7566] border-transparent hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Jobs Table */}
          <div className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-dim border-b border-[#E5E1D8]">
                  <th className="text-left text-xs uppercase tracking-wide text-[#7a7566] font-mono font-medium px-4 py-3">
                    Job
                  </th>
                  <th className="text-left text-xs uppercase tracking-wide text-[#7a7566] font-mono font-medium px-4 py-3">
                    Budget
                  </th>
                  <th className="text-left text-xs uppercase tracking-wide text-[#7a7566] font-mono font-medium px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs uppercase tracking-wide text-[#7a7566] font-mono font-medium px-4 py-3">
                    Posted
                  </th>
                  <th className="text-left text-xs uppercase tracking-wide text-[#7a7566] font-mono font-medium px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-[#5b5646] py-8">
                      No jobs found.
                      <Link
                        to="/post-job"
                        className="block text-teal font-semibold hover:underline mt-2"
                      >
                        Post your first job →
                      </Link>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr
                      key={job._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-[#E5E1D8] last:border-0 hover:bg-paper-dim/50 transition"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-navy">
                          {job.title}
                        </div>
                        <div className="text-xs text-[#7a7566]">
                          {job.trade} · {job.location}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-navy">
                        ৳{job.budget}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-mono font-semibold px-3 py-1 rounded-full  ${getStatusColor(job.status)}`}
                        >
                          {getStatusLabel(job.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#5b5646]">
                        {new Date(job.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="text-navy-2 font-semibold text-sm mr-3.5 hover:underline"
                        >
                          View
                        </Link>
                        <button className="text-red-600 font-semibold text-sm hover:underline">
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
