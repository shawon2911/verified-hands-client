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

const Workers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrades, setSelectedTrades] = useState<string[]>([
    "Plumber",
    "Carpenter",
    "Painter",
    "AC Technician",
    "Appliance Repairer",
  ]);
  const [selectedLocation, setSelectedLocation] = useState("All districts");
  const [selectedRating, setSelectedRating] = useState("Any rating");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const trades = [
    "Plumber",
    "Carpenter",
    "Painter",
    "AC Technician",
    "Appliance Repairer",
  ];
  const locations = [
    "All districts",
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Mirpur",
    "Gulshan",
    "Uttara",
    "Dhanmondi",
  ];

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const data = await getWorkers();
      setWorkers(data);
      setFilteredWorkers(data);
    } catch (error) {
      console.error("Failed to fetch workers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and Sort
  useEffect(() => {
    let result = [...workers];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.bio.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Trade filter
    result = result.filter((w) => selectedTrades.includes(w.trade));

    // Location filter
    if (selectedLocation !== "All districts") {
      result = result.filter((w) => w.location.includes(selectedLocation));
    }

    // Rating filter
    if (selectedRating === "4+ stars") {
      result = result.filter((w) => w.rating >= 4);
    } else if (selectedRating === "4.5+ stars") {
      result = result.filter((w) => w.rating >= 4.5);
    }

    // Sort
    switch (sortBy) {
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.rate - b.rate);
        break;
      case "price-high":
        result.sort((a, b) => b.rate - a.rate);
        break;
      case "newest":
        result.sort((a, b) => a._id.localeCompare(b._id));
        break;
      default:
        break;
    }

    setFilteredWorkers(result);
    setCurrentPage(1);
  }, [
    workers,
    searchTerm,
    selectedTrades,
    selectedLocation,
    selectedRating,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWorkers = filteredWorkers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const toggleTrade = (trade: string) => {
    setSelectedTrades((prev) =>
      prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade],
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    console.log(
      "All trades in DB:",
      workers.map((w) => w.trade),
    );
  }, [workers]);

  return (
    <div className="bg-paper min-h-screen">
      {/* Page Head */}
      <div className="bg-paper-dim border-b border-[#E5E1D8] py-10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <h1 className="text-3xl font-bold text-navy">
            Find verified workers
          </h1>
          <p className="text-[#5b5646] text-sm mt-1.5">
            {filteredWorkers.length} verified workers available
          </p>
        </div>
      </div>

      <section className="py-14">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            {/* Filter Panel */}
            <aside className="bg-white border border-[#E5E1D8] rounded-xl p-5 sticky top-[88px] h-fit">
              {/* Trade Filter */}
              <div className="mb-5">
                <h4 className="text-xs uppercase tracking-wide text-navy-2 font-mono mb-2.5">
                  Trade
                </h4>
                {trades.map((trade) => (
                  <label
                    key={trade}
                    className="flex items-center gap-2 text-sm mb-2 text-navy"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTrades.includes(trade)}
                      onChange={() => toggleTrade(trade)}
                      className="accent-teal"
                    />
                    {trade}
                  </label>
                ))}
              </div>

              {/* Location Filter */}
              <div className="mb-5">
                <h4 className="text-xs uppercase tracking-wide text-navy-2 font-mono mb-2.5">
                  Location
                </h4>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-[#E5E1D8] rounded-lg px-3 py-2.5 text-sm bg-white"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <h4 className="text-xs uppercase tracking-wide text-navy-2 font-mono mb-2.5">
                  Price range
                </h4>
                <input type="range" className="w-full accent-amber" />
                <div className="flex justify-between text-xs text-[#7a7566] font-mono mt-1.5">
                  <span>৳0</span>
                  <span>৳2,000+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-5">
                <h4 className="text-xs uppercase tracking-wide text-navy-2 font-mono mb-2.5">
                  Minimum rating
                </h4>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full border border-[#E5E1D8] rounded-lg px-3 py-2.5 text-sm bg-white"
                >
                  <option>Any rating</option>
                  <option>4+ stars</option>
                  <option>4.5+ stars</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTrades([
                    "Plumber",
                    "Carpenter",
                    "Painter",
                    "AC Technician",
                    "Appliance Repairer",
                  ]);
                  setSelectedLocation("All districts");
                  setSelectedRating("Any rating");
                  setSortBy("rating-desc");
                }}
                className="w-full border border-navy text-navy font-semibold py-2.5 rounded-lg hover:bg-navy hover:text-white transition"
              >
                Reset filters
              </button>
            </aside>

            {/* Main Content */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-5">
                <div className="flex-1 flex items-center border border-[#E5E1D8] rounded-lg px-4 bg-white h-11 w-full sm:max-w-sm">
                  <input
                    type="text"
                    placeholder="Search by name or skill"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border-none outline-none text-sm bg-transparent"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-[#E5E1D8] rounded-lg px-3 py-2.5 text-sm bg-white w-full sm:w-auto"
                >
                  <option value="rating-desc">
                    Sort: Rating (high to low)
                  </option>
                  <option value="price-low">Sort: Price (low to high)</option>
                  <option value="price-high">Sort: Price (high to low)</option>
                  <option value="newest">Sort: Newest</option>
                </select>
              </div>

              {/* Cards Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-[#E5E1D8] rounded-xl overflow-hidden animate-pulse"
                    >
                      <div className="h-[150px] bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentWorkers.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#5b5646]">
                    No workers found matching your filters.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {currentWorkers.map((worker, index) => (
                      <motion.div
                        key={worker._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                          y: -6,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                        }}
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
                            <span className="absolute top-3 right-3 bg-teal text-[#eafff9] font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md rotate-[4deg] border border-teal-dark">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <div className="p-4 flex flex-col gap-1.5">
                          <div className="font-semibold text-navy">
                            {worker.name}
                          </div>
                          <div className="text-xs font-mono text-[#7a7566]">
                            {worker.trade} · {worker.experience} yrs exp.
                          </div>
                          <div className="flex justify-between text-xs text-[#5b5646] border-t border-dashed border-[#E5E1D8] pt-2.5 mt-2">
                            <span>
                              ★ {worker.rating} ({worker.totalReviews})
                            </span>
                            <span className="font-mono font-semibold text-navy">
                              ৳{worker.rate}/{worker.rateType}
                            </span>
                          </div>
                          <Link
                            to={`/workers/${worker._id}`}
                            className="mt-2 text-center py-2.5 rounded-lg border border-navy text-sm font-semibold text-navy hover:bg-navy hover:text-white transition"
                          >
                            View profile
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination - Always show if more than 1 page */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-9">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-9 h-9 border border-[#E5E1D8] rounded-lg flex items-center justify-center text-sm font-mono bg-white disabled:opacity-40"
                      >
                        ←
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-9 h-9 border rounded-lg flex items-center justify-center text-sm font-mono ${
                              page === currentPage
                                ? "bg-navy text-white border-navy"
                                : "border-[#E5E1D8] bg-white"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-9 h-9 border border-[#E5E1D8] rounded-lg flex items-center justify-center text-sm font-mono bg-white disabled:opacity-40"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workers;
