import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getWorkerById } from "@/lib/api";

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
  createdAt: string;
}

const WorkerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setLoading(true);
        const data = await getWorkerById(id!);
        setWorker(data);
        setError("");
      } catch (err) {
        setError("Worker not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorker();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-9">
            <div>
              <div className="flex gap-5 items-center mb-7">
                <div className="w-[88px] h-[88px] bg-gray-200 rounded-2xl"></div>
                <div>
                  <div className="h-7 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-36"></div>
                </div>
              </div>
              <div className="h-20 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="h-80 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-navy">Worker not found</h2>
        <p className="text-[#5b5646] mt-2">The worker you're looking for doesn't exist.</p>
        <Link to="/workers" className="inline-block mt-6 bg-amber text-navy font-bold px-6 py-3 rounded-lg">
          ← Back to workers
        </Link>
      </div>
    );
  }

  const relatedWorkers = [
    { id: "1", name: "Karim Sheikh", trade: "Plumber", icon: "🔧" },
    { id: "2", name: "Mizanur Rahman", trade: "Electrician", icon: "⚡" },
    { id: "3", name: "Bashir Ahmed", trade: "Carpenter", icon: "🪚" },
  ];

  return (
    <div className="bg-paper min-h-screen">
      <section className="py-8">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-[#7a7566] mb-6">
            Find workers / {worker.trade} / {worker.name}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-9 items-start">
            {/* Main Content */}
            <div>
              {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-5 items-center mb-7"
              >
                <div className="w-[88px] h-[88px] rounded-2xl bg-gradient-to-b from-[#d8d2c2] to-[#c7c0aa] flex items-center justify-center text-4xl text-navy-2 relative flex-shrink-0">
                  {worker.imageUrl ? (
                    <img src={worker.imageUrl} alt={worker.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    "👤"
                  )}
                  {worker.verified && (
                    <span className="absolute -bottom-2 -right-2 bg-teal text-[#eafff9] font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md border border-teal-dark">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-navy">{worker.name}</h1>
                  <div className="text-[#5b5646] text-sm">
                    {worker.trade} · {worker.location}
                  </div>
                  <div className="flex gap-3.5 mt-2 text-xs font-mono text-navy-2">
                    <span>★ {worker.rating} ({worker.totalReviews} reviews)</span>
                    <span>{worker.totalReviews} jobs done</span>
                    <span>Since {new Date(worker.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-navy border-b border-[#E5E1D8] pb-2 mb-3">Overview</h3>
                <p className="text-sm text-[#4a4638]">{worker.fullDescription || worker.bio}</p>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-navy border-b border-[#E5E1D8] pb-2 mb-3">Skills & specifications</h3>
                <div>
                  {worker.skills.map((skill) => (
                    <span key={skill} className="inline-block bg-paper-dim border border-[#E5E1D8] px-3.5 py-1.5 rounded-full text-sm mr-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-navy border-b border-[#E5E1D8] pb-2 mb-3">Reviews ({worker.totalReviews})</h3>
                <div className="border-b border-[#E5E1D8] py-3.5">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold">Farhana N.</span>
                    <span className="text-amber-dark font-mono text-xs">★★★★★</span>
                  </div>
                  <p className="text-sm text-[#4a4638]">Fixed our wiring issue in under an hour. Arrived on time and explained everything clearly.</p>
                </div>
                <div className="border-b border-[#E5E1D8] py-3.5">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold">Tanvir A.</span>
                    <span className="text-amber-dark font-mono text-xs">★★★★★</span>
                  </div>
                  <p className="text-sm text-[#4a4638]">Very professional, fair pricing, would book again.</p>
                </div>
              </motion.div>

              {/* Related Workers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-bold text-navy border-b border-[#E5E1D8] pb-2 mb-3">Related workers nearby</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedWorkers.map((related) => (
                    <Link
                      key={related.id}
                      to={`/workers/${related.id}`}
                      className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                      <div className="h-[100px] bg-gradient-to-b from-[#d8d2c2] to-[#c7c0aa] flex items-center justify-center text-3xl text-navy-2 relative">
                        {related.icon}
                        <span className="absolute top-2 right-2 bg-teal text-[#eafff9] font-mono text-[8px] font-bold px-1.5 py-1 rounded border border-teal-dark">
                          ✓
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="font-semibold text-sm text-navy">{related.name}</div>
                        <div className="text-xs font-mono text-[#7a7566]">{related.trade}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border border-[#E5E1D8] rounded-xl p-5 sticky top-[88px]"
            >
              <div className="text-2xl font-mono font-bold text-navy">
                ৳{worker.rate}{" "}
                <span className="text-sm text-[#7a7566] font-normal">/ {worker.rateType}</span>
              </div>

              <div className="my-4">
                <div className="flex justify-between text-sm py-2 border-b border-dashed border-[#E5E1D8]">
                  <span>Service area</span>
                  <span>{worker.location}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-dashed border-[#E5E1D8]">
                  <span>Availability</span>
                  <span>{worker.availability.join(" · ")}</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span>Response time</span>
                  <span>~20 min</span>
                </div>
              </div>

              <button className="w-full bg-amber text-navy font-bold py-3 rounded-lg hover:bg-[#E89A2E] transition mb-2.5">
                Book this worker
              </button>
              <button className="w-full border border-navy text-navy font-semibold py-3 rounded-lg hover:bg-navy hover:text-white transition">
                Message
              </button>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerDetails;