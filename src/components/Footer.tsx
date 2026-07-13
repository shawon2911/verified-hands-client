import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy text-paper/70 pt-14 pb-7 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 border-b border-paper/10">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-heading font-bold text-xl text-white mb-3"
            >
              <div className="w-8.5 h-8.5 bg-amber rounded-lg flex items-center justify-center text-navy font-bold text-lg">
                VH
              </div>
              <span className="text-2xl font-bold">
                <span>Verified</span>
                <span className="text-amber-500">Hands</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs text-paper/60">
              Bangladesh's verified marketplace for local skilled workers.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-mono text-lg  font-bold tracking-wider mb-3.5">
              Platform
            </h4>
            <Link
              to="/workers"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Find workers
            </Link>
            <Link
              to="/categories"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Categories
            </Link>
            <Link
              to="/pricing"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Pricing
            </Link>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white  text-lg  font-bold  font-mono tracking-wider mb-3.5">
              Company
            </h4>
            <Link
              to="/about"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Blog
            </Link>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white  text-lg  font-bold  font-mono tracking-wider mb-3.5">
              Support
            </h4>
            <Link
              to="/help"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Help center
            </Link>
            <Link
              to="/terms"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="block text-sm mb-2.5 hover:text-white transition"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 text-sm">
          <span>© 2026 VerifiedHands. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 flex items-center gap-4">
  {/* Facebook */}
  <a 
    href="https://facebook.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-500 hover:text-[#1877F2] transition-colors duration-200"
    aria-label="Facebook"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
    </svg>
  </a>

  {/* LinkedIn (Fixed & Corrected) */}
  <a 
    href="https://linkedin.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-500 hover:text-[#0077B5] transition-colors duration-200"
    aria-label="LinkedIn"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.58 7-2.78 7 2.47v6.76z"/>
    </svg>
  </a>

  {/* YouTube */}
 <a 
    href="https://youtube.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-500 hover:text-red-800 transition-colors duration-200"
    aria-label="YouTube"
  >
    <svg xmlns="http://w3.org" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>
</span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
