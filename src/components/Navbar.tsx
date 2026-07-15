import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authClient } from "@/lib/auth-client";

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

  // ✅ Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Role-based nav links
  const navLinks = [
    { name: "Find workers", path: "/workers", isLink: true },
    { name: "Categories", path: "categories", isLink: false },
    { name: "How it works", path: "how-it-works", isLink: false },
    { name: "For workers", path: "/for-workers", isLink: true },
  ];

  // ✅ Role-based additional links
  const user = session?.user;
  const userRole = (user as any)?.role || "employer";

  const roleLinks = userRole === "employer" 
    ? [{ name: "My requests", path: "/my-requests" }]
    : userRole === "worker"
    ? [{ name: "My profile", path: "/my-profile" }]
    : [];

  const allLinks = [...navLinks, ...roleLinks];

  // ✅ Logout function
  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-[#E5E1D8]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold text-xl">
          <div className="w-[34px] h-[34px] bg-navy rounded-lg flex items-center justify-center text-amber font-bold text-lg">
            V
          </div>
          <span className="text-xl font-bold">
            <span>Verified</span>
            <span className="text-amber-500">Hands</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {allLinks.map((link) => (
            link.isLink ? (
              <Link
                key={link.path}
                to={link.path}
                className={`transition ${
                  isActive(link.path)
                    ? "text-navy border-b-2 border-amber pb-[22px]"
                    : "text-navy-2 hover:text-navy"
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={link.path}
                onClick={() => scrollToSection(link.path)}
                className={`transition ${
                  isActive("/" + link.path)
                    ? "text-navy border-b-2 border-amber pb-[22px]"
                    : "text-navy-2 hover:text-navy"
                }`}
              >
                {link.name}
              </button>
            )
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              {userRole === "employer" && (
                <Link to="/post-job" className="btn-primary">
                  Post a job
                </Link>
              )}
              {userRole === "worker" && (
                <Link to="/profile/add" className="btn-primary">
                  Add Profile
                </Link>
              )}
              <div className="w-9 h-9 rounded-full bg-navy text-amber flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0) || "U"}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-navy-2 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Log in
              </Link>
              <Link to="/register" className="btn-primary">
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
            link.isLink ? (
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
            ) : (
              <button
                key={link.path}
                onClick={() => {
                  scrollToSection(link.path);
                  setIsMenuOpen(false);
                }}
                className={`text-sm font-medium ${
                  isActive("/" + link.path) ? "text-amber" : "text-navy-2"
                }`}
              >
                {link.name}
              </button>
            )
          ))}
          <div className="border-t border-[#E5E1D8] pt-3 flex flex-col gap-2">
            {session ? (
              <>
                {userRole === "employer" && (
                  <Link to="/post-job" onClick={() => setIsMenuOpen(false)}>
                    Post a job
                  </Link>
                )}
                {userRole === "worker" && (
                  <Link to="/profile/add" onClick={() => setIsMenuOpen(false)}>
                    Add Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
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