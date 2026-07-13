import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message ||  "Login failed. Please try again.");
      return;
    }

    navigate("/");
  };

  const handleDemoLogin = () => {
    setEmail("demo@employer.com");
    setPassword("demo123456");
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-navy text-paper px-12 py-16">
        <span className="font-mono text-xs text-amber tracking-wider mb-4">
          ● 4,200+ workers ID-verified
        </span>
        <h2 className="text-3xl font-bold text-white max-w-md mb-4">
          Hire skilled workers you can actually trust.
        </h2>
        <p className="text-paper/70 max-w-sm text-sm">
          Log in to book verified electricians, plumbers, drivers and more — or manage your job requests.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-navy">Welcome back</h1>
          <p className="text-[#5b5646] text-sm mb-6">Log in to your VerifiedHands account.</p>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-paper-dim border border-dashed border-teal-dark text-teal-dark font-semibold py-3 rounded-lg text-sm mb-5 hover:bg-[#e8e3d6] transition"
          >
            ⚡ Use demo employer login
          </button>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-navy-2 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-navy-2 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
              {error && (
                <p className="text-red-600 text-xs mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber text-navy font-bold py-3 rounded-lg hover:bg-[#E89A2E] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-center text-sm text-[#5b5646] mt-5">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-dark font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;