import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [role, setRole] = useState<"employer" | "worker">("employer");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const { error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      role: role,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Registration failed. Please try again.");
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-navy text-paper px-12 py-16">
        <span className="font-mono text-xs text-amber tracking-wider mb-4">
          ● Join 4,200+ verified workers
        </span>
        <h2 className="text-3xl font-bold text-white max-w-md mb-4">
          Get steady work, or hire someone you can trust.
        </h2>
        <p className="text-paper/70 max-w-sm text-sm">
          Create an account as an employer to post jobs, or as a worker to get discovered.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-navy">Create your account</h1>
          <p className="text-[#5b5646] text-sm mb-6">Choose how you'll use VerifiedHands.</p>

          <div className="flex border border-[#E5E1D8] rounded-lg overflow-hidden mb-5">
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`flex-1 text-center py-2.5 text-sm font-semibold transition ${
                role === "employer" ? "bg-navy text-white" : "text-[#7a7566]"
              }`}
            >
              I'm hiring
            </button>
            <button
              type="button"
              onClick={() => setRole("worker")}
              className={`flex-1 text-center py-2.5 text-sm font-semibold transition ${
                role === "worker" ? "bg-navy text-white" : "text-[#7a7566]"
              }`}
            >
              I'm a worker
            </button>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-navy-2 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>

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
              <label className="block text-sm font-semibold text-navy-2 mb-1.5">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-navy-2 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full border border-[#E5E1D8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-navy-2 mb-1.5">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-[#5b5646] mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-dark font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;