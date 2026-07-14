import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

interface WorkerCardProps {
  worker: Worker;
  index?: number;
}

const WorkerCard = ({ worker, index = 0 }: WorkerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden"
    >
      <div className="h-[150px] bg-gradient-to-b from-[#d8d2c2] to-[#c7c0aa] flex items-center justify-center text-4xl text-navy-2 relative">
        {worker.imageUrl ? (
          <img src={worker.imageUrl} alt={worker.name} className="w-full h-full object-cover" />
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
      <div className="p-4 flex flex-col gap-1.5">
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
  );
};

export default WorkerCard;