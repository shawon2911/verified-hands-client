import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getWorkers } from "@/lib/api";
import WorkerCard from "../WorkerCard";

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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {workers.map((worker, index) => (
            <WorkerCard key={worker._id} worker={worker} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;