import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const trades = [
    { id: 1, name: "Electrician", icon: "⚡", count: 120, description: "Wiring, installation, repair" },
    { id: 2, name: "Plumber", icon: "🔧", count: 85, description: "Pipe repair, bathroom fitting" },
    { id: 3, name: "Driver", icon: "🚗", count: 200, description: "Car, bike, delivery" },
    { id: 4, name: "House help", icon: "🧹", count: 65, description: "Cleaning, cooking, childcare" },
    { id: 5, name: "Painter", icon: "🎨", count: 45, description: "Interior, exterior, waterproofing" },
    { id: 6, name: "Carpenter", icon: "🪚", count: 38, description: "Furniture, repair, installation" },
    { id: 7, name: "AC Technician", icon: "❄️", count: 30, description: "AC installation, repair, gas" },
    { id: 8, name: "Appliance Repairer", icon: "🔌", count: 25, description: "Fridge, washing machine, TV" },
  ];

  const filteredTrades = trades.filter(trade =>
    trade.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-paper min-h-screen">
      {/* Page Head */}
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy">Browse Categories</h1>
          <p className="text-[#5b5646] text-sm mt-1.5">
            Find verified workers by trade
          </p>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          {/* Search */}
          <div className="max-w-md mb-8">
            <div className="flex items-center border border-[#E5E1D8] rounded-lg px-4 bg-white h-11">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none outline-none text-sm bg-transparent"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTrades.map((trade, index) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
                className="bg-white border border-[#E5E1D8] rounded-xl p-6 text-center hover:border-amber transition"
              >
                <div className="text-4xl mb-3">{trade.icon}</div>
                <h3 className="font-bold text-navy text-lg">{trade.name}</h3>
                <p className="text-xs text-[#7a7566] mt-1">{trade.description}</p>
                <p className="text-xs font-mono text-teal mt-2">{trade.count} verified workers</p>
                <Link
                  to={`/workers?trade=${encodeURIComponent(trade.name)}`}
                  className="mt-4 inline-block bg-amber text-navy font-semibold px-5 py-2 rounded-lg hover:bg-[#E89A2E] transition text-sm w-full"
                >
                  Browse {trade.name}s
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredTrades.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5b5646]">No categories found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;