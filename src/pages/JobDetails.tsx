import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

interface Job {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  trade: string;
  budget: number;
  location: string;
  address: string;
  status: string;
  preferredDate: string;
  employerId: string;
  createdAt: string;
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [_user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        setUser(session.user);
        setUserRole((session.user as any)?.role || "employer");

        const response = await api.get(`/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Job not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  const statusColors = {
    open: "bg-green-100 text-green-700",
    "in-progress": "bg-amber-100 text-amber-700",
    completed: "bg-teal-100 text-teal-700",
    cancelled: "bg-red-100 text-red-700",
  };

  if (loading) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <div className="text-navy">Loading job details...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy">Job not found</h2>
          <Link to="/dashboard/manage" className="text-teal hover:underline mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <Link to={userRole === "employer" ? "/my-requests" : "/dashboard/manage"} className="text-sm text-teal hover:underline">
            ← Back
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-navy mt-2">{job.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[job.status as keyof typeof statusColors]}`}>
              {job.status}
            </span>
            <span className="text-xs font-mono text-[#7a7566] bg-paper-dim px-2.5 py-1 rounded">
              {job.trade}
            </span>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[920px] mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8"
          >
            {/* Main Content */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5E1D8] rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Description</h3>
                <p className="text-sm text-[#4a4638]">{job.fullDescription || job.shortDescription}</p>
              </div>

              <div className="bg-white border border-[#E5E1D8] rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Job Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[#5b5646]">Trade</p>
                    <p className="font-semibold text-navy">{job.trade}</p>
                  </div>
                  <div>
                    <p className="text-[#5b5646]">Budget</p>
                    <p className="font-semibold text-navy">৳{job.budget}</p>
                  </div>
                  <div>
                    <p className="text-[#5b5646]">Location</p>
                    <p className="font-semibold text-navy">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-[#5b5646]">Address</p>
                    <p className="font-semibold text-navy">{job.address}</p>
                  </div>
                  <div>
                    <p className="text-[#5b5646]">Preferred Date</p>
                    <p className="font-semibold text-navy">{new Date(job.preferredDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[#5b5646]">Posted</p>
                    <p className="font-semibold text-navy">{new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-[#E5E1D8] rounded-xl p-6 sticky top-[88px]">
                <h3 className="font-bold text-navy mb-4">Actions</h3>
                
                {userRole === "employer" && job.status === "open" && (
                  <>
                    <button className="w-full bg-amber text-navy font-bold py-2.5 rounded-lg hover:bg-[#E89A2E] transition text-sm">
                      Edit Job
                    </button>
                    <button className="w-full border border-red-400 text-red-500 font-semibold py-2.5 rounded-lg hover:bg-red-50 transition text-sm mt-2">
                      Cancel Job
                    </button>
                  </>
                )}

                {userRole === "worker" && job.status === "open" && (
                  <button className="w-full bg-teal text-white font-bold py-2.5 rounded-lg hover:bg-teal-dark transition text-sm">
                    Apply for this Job
                  </button>
                )}

                {job.status === "in-progress" && userRole === "worker" && (
                  <button className="w-full bg-teal text-white font-bold py-2.5 rounded-lg hover:bg-teal-dark transition text-sm">
                    Mark as Completed
                  </button>
                )}

                <Link
                  to={userRole === "employer" ? "/my-requests" : "/dashboard/manage"}
                  className="block text-center border border-[#E5E1D8] text-navy font-semibold py-2.5 rounded-lg hover:bg-paper-dim transition text-sm mt-2"
                >
                  Back to List
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;