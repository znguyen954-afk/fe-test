"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/CMClogo.webp";
import { authService } from "@/services/auth.service.fe";

export default function LoginClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login({ email, password });
      authService.saveTokens(data, rememberMe);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 flex items-center justify-center lg:justify-end p-4 md:p-8 lg:p-24 font-sans">

      {/* Right Side - Login Card */}
      <div className="w-[90%] max-w-[448px] md:w-[448px] min-w-[320px] md:min-w-[448px] bg-white rounded-2xl shadow-2xl p-8 relative shrink-0 transform transition-all">

        {/* Logo Area */}
        <div className="text-center mb-8 mt-4">
          <div className="flex justify-center mb-2">
            <Image src={Logo} alt="CMC University Mini Logo" width={400} height={100} className="w-60 h-30" priority />
          </div>
        </div>

        {/* Microsoft Login Button */}
        <button type="button" className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md mb-6 font-medium text-gray-700">
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
            <div className="bg-[#F25022] w-2 h-2"></div>
            <div className="bg-[#7FBA00] w-2 h-2"></div>
            <div className="bg-[#00A4EF] w-2 h-2"></div>
            <div className="bg-[#FFB900] w-2 h-2"></div>
          </div>
          <span>Đăng nhập với Microsoft</span>
        </button>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-light">
              Hoặc đăng nhập với tài khoản CMCU
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800 text-sm"
                placeholder="Tên đăng nhập"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800 text-sm"
                placeholder="Mật khẩu"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <div
              role="checkbox"
              aria-checked={rememberMe}
              tabIndex={0}
              className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition-all ${
                rememberMe ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
              }`}
              onClick={() => setRememberMe(!rememberMe)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setRememberMe(!rememberMe);
                }
              }}
            >
              {rememberMe && (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              )}
            </div>
            <span
              role="button"
              tabIndex={0}
              className="text-sm text-gray-600 cursor-pointer select-none font-light"
              onClick={() => setRememberMe(!rememberMe)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setRememberMe(!rememberMe);
                }
              }}
            >
              Ghi nhớ đăng nhập
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A459C] hover:bg-[#153B87] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 transform active:scale-[0.98]"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}