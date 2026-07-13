import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
    };
    fetchSession();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Find workers", path: "/workers" },
    { name: "Categories", path: "/categories" },
    { name: "How it works", path: "/how-it-works" },
    { name: "For workers", path: "/for-workers" },
  ];

  // Role-based additional links
  const roleLinks = session?.user?.role === "employer" 
    ? [{ name: "My requests", path: "/my-requests" }]
    : session?.user?.role === "worker"
    ? [{ name: "My profile", path: "/my-profile" }]
    : [];

  const allLinks = [...navLinks, ...roleLinks];

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-[#E5E1D8]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold text-xl">
          <div className="w-[34px] h-[34px] bg-navy rounded-lg flex items-center justify-center text-amber font-bold text-lg">
            V
          </div>
          VerifiedHands
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {allLinks.map((link) => (
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
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              {session.user?.role === "employer" && (
                <Link to="/post-job" className="btn-primary">
                  Post a job
                </Link>
              )}
              {session.user?.role === "worker" && (
                <Link to="/post-job" className="btn-primary">
                  Post a job
                </Link>
              )}
              <div className="w-9 h-9 rounded-full bg-navy text-amber flex items-center justify-center font-bold text-sm">
                {session.user?.name?.charAt(0) || "U"}
              </div>
              <button
                onClick={() => authClient.signOut()}
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
              <Link to="/post-job" className="btn-primary">
                Post a job
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
                  onClick={() => {
                    authClient.signOut();
                    setIsMenuOpen(false);
                  }}
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