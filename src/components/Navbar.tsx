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