import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      await login(email);
      // sukses login → AuthProvider otomatis detect via onAuthStateChanged
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login gagal. Cek email / password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5f2] px-4 relative overflow-hidden font-sans">
      
      {/* Background soft glowing blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#5fd38d]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#6ea8ff]/10 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[420px] bg-white p-8 md:p-10 rounded-[32px] border border-black/5 shadow-2xl relative z-10"
      >
        
        {/* LOGO & BRAND */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#111] to-[#222] text-white flex items-center justify-center shadow-lg shadow-black/10 mb-4">
            <Sparkles size={20} className="text-[#5fd38d]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1.5 max-w-[280px]">
            Log in to manage your premium personal operating system.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors duration-300">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-11 pr-4 bg-[#f5f7f6] hover:bg-[#ecefed] focus:bg-white border border-transparent focus:border-black/10 rounded-2xl outline-none text-sm font-medium text-gray-800 transition-all duration-300 placeholder:text-gray-400 focus:shadow-inner"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between pl-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors duration-300">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-11 pr-12 bg-[#f5f7f6] hover:bg-[#ecefed] focus:bg-white border border-transparent focus:border-black/10 rounded-2xl outline-none text-sm font-medium text-gray-800 transition-all duration-300 placeholder:text-gray-400 focus:shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black transition-colors duration-300 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#111111] hover:bg-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/10 hover:shadow-black/20 transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50 transition-all duration-300 mt-6"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Logging in...</span>
              </span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>

        {/* LINK REGISTER */}
        <p className="text-sm text-gray-500 mt-8 text-center border-t border-black/5 pt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Register
          </Link>
        </p>

      </motion.div>
    </div>
  );
}
