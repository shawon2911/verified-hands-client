import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getWorkers } from "@/lib/api";

interface Worker {
  _id: string;
  name: string;
  trade: string;
  bio: string;
  rate: number;
  rateType: string;
  location: string;
  experience: number;
  rating: number;
  totalReviews: number;
  imageUrl: string;
  verified: boolean;
}

const FeaturedWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers();
        // শুধু প্রথম ৪টা দেখাবো
        setWorkers(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-paper-dim">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="mb-10">
            <span className="font-mono text-xs text-teal-dark tracking-wider">02 · FEATURED</span>
            <h2 className="text-3xl font-bold text-navy mt-2">Verified workers near you</h2>
            <p className="text-[#5b5646] text-sm mt-2">Loading workers...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden animate-pulse">
                <div className="h-[150px] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (workers.length === 0) {
    return (
      <section className="py-20 bg-paper-dim">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="mb-10">
            <span className="font-mono text-xs text-teal-dark tracking-wider">02 · FEATURED</span>
            <h2 className="text-3xl font-bold text-navy mt-2">Verified workers near you</h2>
            <p className="text-[#5b5646] text-sm mt-2">No workers available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-paper-dim">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-teal-dark tracking-wider">02 · FEATURED</span>
          <h2 className="text-3xl font-bold text-navy mt-2">Verified workers near you</h2>
          <p className="text-[#5b5646] text-sm mt-2">
            Every profile below has passed ID and skill verification.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {workers.map((worker) => (
            <motion.div
              key={worker._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden"
            >
              <div className="h-[150px] bg-gradient-to-b from-[#d8d2c2] to-[#c7c0aa] flex items-center justify-center text-4xl text-navy-2 relative">
                {worker.imageUrl ? (
                  <img
                    src={worker.imageUrl}
                    alt={worker.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "👤"
                )}
                {worker.verified && (
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 bg-teal text-[#eafff9] font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md rotate-[4deg] border border-teal-dark"
                  >
                    ✓ Verified
                  </motion.span>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="font-semibold text-navy">{worker.name}</div>
                <div className="text-xs font-mono text-[#7a7566]">
                  {worker.trade} · {worker.experience} yrs exp.
                </div>
                <div className="text-xs text-[#5b5646]">{worker.location}</div>
                <div className="flex justify-between text-xs text-[#5b5646] border-t border-dashed border-[#E5E1D8] pt-2.5 mt-auto">
                  <span>★ {worker.rating} ({worker.totalReviews})</span>
                  <span className="font-mono font-semibold text-navy">
                    ৳{worker.rate}/{worker.rateType}
                  </span>
                </div>
                <Link
                  to={`/workers/${worker._id}`}
                  className="mt-1.5 text-center py-2.5 rounded-lg border border-navy text-sm font-semibold text-navy hover:bg-navy hover:text-white transition"
                >
                  View profile
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;