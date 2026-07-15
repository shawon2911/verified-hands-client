import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { Dropdown } from "@heroui/react";
import { motion } from "framer-motion";

// ✅ Session Type
interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
}

const Navbar = () => {
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Fetch session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        console.log("✅ Navbar Session:", data);
        setSession(data);
      } catch (error) {
        console.error("❌ Session fetch error:", error);
        setSession(null);
      }
    };
    fetchSession();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Find workers", path: "/workers" },
    { name: "Categories", path: "/categories" },
  ];

  // ✅ Role-based additional links with proper role extraction
  const user = session?.user;
  const userRole = (user as any)?.role || "employer";

  const roleLinks =
    userRole === "employer"
      ? [
          { name: "My requests", path: "/my-requests" },
          { name: "Dashboard", path: "/dashboard/manage" },
        ]
      : userRole === "worker"
      ? [
          { name: "My profile", path: "/my-profile" },
          { name: "Available Jobs", path: "/worker/jobs" },
        ]
      : [];

  const allLinks = [...navLinks, ...roleLinks];

  // ✅ Logout handler
  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-heading font-bold text-xl"
        >
          <img
            src="/logo.png"
            alt="VerifiedHands"
            className="h-12 w-auto"
          />
          <span className="text-2xl font-bold">
            <span>Verified</span>
            <span className="text-amber-500">Hands</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {allLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium ${
                isActive(link.path)
                  ? "text-navy"
                  : "text-navy-2 hover:text-navy"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-amber"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              {userRole === "employer" && (
                <Link
                  to="/post-job"
                  className="bg-amber hover:bg-[#E89A2E] hover:shadow-md py-2 px-3 font-medium rounded-xl text-black"
                >
                  Post a job
                </Link>
              )}
              {userRole === "worker" && (
                <Link
                  to="/profile/add"
                  className="bg-amber py-2 px-3 font-medium rounded-xl text-black"
                >
                  Add Profile
                </Link>
              )}

              <Dropdown>
                <Dropdown.Trigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-amber/50 transition">
                  <div className="w-9 h-9 rounded-full bg-navy text-amber flex items-center justify-center font-bold text-sm shadow-sm hover:opacity-90 transition cursor-pointer">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </Dropdown.Trigger>

                <Dropdown.Popover className="rounded-xl mt-2 overflow-hidden shadow-lg border border-gray-100 bg-white">
                  <Dropdown.Menu
                    className="p-1 min-w-[140px]"
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      className="outline-none"
                    >
                      <button
                        onClick={handleLogout}  // ✅ Fixed
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                      >
                        <svg
                          xmlns="http://w3.org"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        Logout
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-gray-400 rounded-xl font-medium py-2 px-3 hover:shadow-md"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-amber text-black py-2 px-3 rounded-xl font-medium hover:bg-[#E89A2E]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-paper border-t border-[#E5E1D8] px-4 py-4 flex flex-col gap-3">
          {allLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive(link.path) ? "text-amber" : "text-navy-2"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-[#E5E1D8] pt-3 flex flex-col gap-2">
            {session ? (
              <>
                <button
                  onClick={handleLogout}  // ✅ Fixed
                  className="text-sm text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;