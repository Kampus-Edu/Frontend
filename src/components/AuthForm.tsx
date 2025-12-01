"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    ChevronLeft,
    Mail,
    Lock,
    GraduationCap,
    ArrowRight,
    ChevronDown,
    User,
} from "lucide-react";
import { universities } from "@/lib/data";
import { loginRequest, signupRequest, saveAuth } from "@/lib/api";

type Mode = "login" | "signup";

interface AuthFormProps {
    initialMode?: Mode;
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10; // adjust intensity
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        setParallax({ x, y });
    };
    const router = useRouter();
    const [mode, setMode] = useState<Mode>(initialMode);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [university, setUniversity] = useState("");
    const [currentYear, setCurrentYear] = useState("1");

    const [focused, setFocused] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (mode === "signup") {
                if (!university) {
                    throw new Error("Please select your university");
                }
                if (!username) {
                    throw new Error("Please choose a username");
                }

                const response = await signupRequest({
                    email,
                    password,
                    school: university,
                    username,
                    currentYear: Number(currentYear),
                    firstName: firstName || undefined,
                    lastName: lastName || undefined,
                });

                saveAuth(response);
            } else {
                const response = await loginRequest({
                    email,
                    password,
                });

                saveAuth(response);
            }

            // On success → go to discover
            router.push("/discover");
        } catch (err) {
            console.error(err);

            if(err instanceof Error){
                setError(err.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        }
    };;

    return (
        <div className="min-h-screen bg-blue-100 flex relative overflow-hidden">
            {/* Subtle dot background */}
            <div
                className="absolute inset-0 opacity-[0.30] pointer-events-auto"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(64, 64, 64) 1px, transparent 0)`,
                    backgroundSize: "48px 48px",
                }}
            />


            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-50 py-12 relative animate-leftFade">

                <div
                    className="absolute top-1 left-[-10%] w-[130%] opacity-80 pointer-events-none select-none"
                    style={{
                        transform: `translate(${parallax.x * 0.06}px, ${parallax.y * 0.03}px)`,
                        transition: "transform 0.15s ease-out",
                    }}
                >
                    <svg
                        width="100%"
                        height="200"
                        viewBox="0 0 1800 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Hand-drawn line */}
                        <path
                            id="scribblePath"
                            d="
        M 0 120
        C 200 70 350 150 500 110
        C 650 70 800 90 950 120
        C 1100 150 1250 100 1400 130
        C 1550 160 1700 140 1800 125
      "
                            stroke="#87CEEB"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="2600"
                            strokeDashoffset="2600"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="2600"
                                to="0"
                                dur="2.3s"
                                begin="0.2s"
                                fill="freeze"
                                calcMode="spline"
                                keySplines="0.42 0 0.22 1"
                            />
                        </path>

                        {/* Plane following path */}
                        <g>
                            <path
                                id="plane"
                                d="M 0 0 L -50 -12 L -20 -4 L -50 4 Z"
                                fill="#F0F4FF"
                                stroke="#111827"
                                strokeWidth="3"
                            >
                                <animateMotion
                                    dur="2.3s"
                                    begin="0.2s"
                                    fill="freeze"
                                    rotate="auto"
                                    calcMode="spline"
                                    keySplines="0.42 0 0.22 1"
                                >
                                    <mpath href="#scribblePath"/>
                                </animateMotion>
                            </path>
                        </g>
                    </svg>

                </div>
                <div className="w-full max-w-xl">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-12 transition-colors"
                    >
                        <ChevronLeft
                            size={30}
                            className="group-hover:-translate-x-0.5 transition-transform"
                        />
                        <span className="text-l font-medium font-sora">Back to home</span>
                    </Link>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 mb-8">
                        <div className="relative animate-logoPulse">
                            <div className="absolute inset-0 bg-gray-800 rounded-xl blur-md opacity-25"/>
                            <img
                                src="/kampus-logo.png"
                                alt="Kampus Logo"
                                className="w-15 h-15 rounded-xl"
                            />
                        </div>
                        <span className="text-3xl font-sora font-bold text-gray-900 tracking-tight">
              Kampus
            </span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-sora font-bold text-gray-900 mb-2 tracking-tight">
                            {mode === "login" ? "Welcome back" : "Create account"}
                        </h1>
                        <p className="text-gray-600 leading-relaxed">
                            {mode === "login"
                                ? "Sign in to continue to your courses"
                                : "Join thousands of students learning together"}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xl font-sora font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                                        focused === "email" ? "text-gray-700" : "text-gray-400"
                                    }`}
                                    size={18}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocused("email")}
                                    onBlur={() => setFocused("")}
                                    placeholder="you@university.edu"
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200/60 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/15 focus:border-gray-400 transition-all shadow--[inset_0_1px_2px_rgba(0,0,0,0.05)] hover:border-gray-300 focus:scale-[1.02]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xl font-sora font-bold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                                        focused === "password" ? "text-gray-700" : "text-gray-400"
                                    }`}
                                    size={18}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused("password")}
                                    onBlur={() => setFocused("")}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm focus:scale-[1.02]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Extra fields for SIGNUP only */}
                        {mode === "signup" && (
                            <>
                                {/* Username */}
                                <div>
                                    <label className="block text-l font-sora font-bold text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <User
                                            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                                                focused === "username" ? "text-gray-700" : "text-gray-400"
                                            }`}
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onFocus={() => setFocused("username")}
                                            onBlur={() => setFocused("")}
                                            placeholder="tungtungsahurrr67"
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm focus:scale-[1.02]"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Name row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-l font-sora font-bold text-gray-700 mb-2">
                                            First name (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onFocus={() => setFocused("firstName")}
                                            onBlur={() => setFocused("")}
                                            className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm focus:scale-[1.02]"
                                            placeholder="Chimpanzini"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-l font-sora font-bold text-gray-700 mb-2">
                                            Last name (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onFocus={() => setFocused("lastName")}
                                            onBlur={() => setFocused("")}
                                            className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm focus:scale-[1.02]"
                                            placeholder="Bananini"
                                        />
                                    </div>
                                </div>

                                {/* University */}
                                <div>
                                    <label className="block text-l font-sora font-bold text-gray-700 mb-2">
                                        University
                                    </label>
                                    <div className="relative">
                                        <GraduationCap
                                            className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors ${
                                                focused === "university"
                                                    ? "text-gray-700"
                                                    : "text-gray-400"
                                            }`}
                                            size={18}
                                        />
                                        <select
                                            value={university}
                                            onChange={(e) => setUniversity(e.target.value)}
                                            onFocus={() => setFocused("university")}
                                            onBlur={() => setFocused("")}
                                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all appearance-none cursor-pointer shadow-sm focus:scale-[1.02]"
                                            required
                                        >
                                            <option value="">Select your university</option>
                                            {universities.map((u, i) => (
                                                <option key={i} value={u}>
                                                    {u}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                            size={18}
                                        />
                                    </div>
                                </div>

                                {/* Current year */}
                                <div>
                                    <label className="block text-l font-sora font-bold text-gray-700 mb-2">
                                        Current year
                                    </label>
                                    <select
                                        value={currentYear}
                                        onChange={(e) => setCurrentYear(e.target.value)}
                                        className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm focus:scale-[1.02]"
                                        required
                                    >
                                        <option value="1">1st year</option>
                                        <option value="2">2nd year</option>
                                        <option value="3">3rd year</option>
                                        <option value="4">4th year</option>
                                        <option value="5">Grad / other</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full h-12 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-xl font-sora transition-all shadow-lg shadow-gray-800/25 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-xl hover:shadow-gray-800/35 mt-6 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
              <span>
                {loading
                    ? mode === "login"
                        ? "Signing in..."
                        : "Creating account..."
                    : mode === "login"
                        ? "Sign in"
                        : "Create account"}
              </span>
                            {!loading && (
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                    strokeWidth={2.5}
                                />
                            )}
                        </button>

                        {mode === "login" && (
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="text-sm text-gray-700 hover:text-gray-900 font-sora transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Toggle mode */}
                    <div className="mt-8 text-center">
            <span className="text-gray-600">
              {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
            </span>
                        <button
                            onClick={() =>
                                setMode(mode === "login" ? "signup" : "login")
                            }
                            className="text-gray-800 hover:text-gray-900 font-sora font-l transition-colors"
                        >
                            {mode === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"/>
                            <span>Secure & encrypted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"/>
                            <span>2,400+ students</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Visual */}
            <div
                className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative overflow-hidden items-center justify-center"
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${parallax.x}px, ${parallax.y}px)`,
                    transition: "transform 0.1s ease-out"
                }}>

                {/* Floating gradient orbs */}
                <div
                    className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float-slow"
                    style={{
                        transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`
                    }}
                />

                <div
                    className="absolute bottom-32 right-32 w-56 h-56 bg-white/5 rounded-full blur-3xl animate-float-fast"
                    style={{
                        transform: `translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`
                    }}
                />

                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Floating gradient orbs */}
                <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float"/>
                <div
                    className="absolute bottom-32 right-32 w-56 h-56 bg-white/5 rounded-full blur-3xl animate-float-delayed"/>

                {/* Content */}
                <div className="relative z-10 max-w-lg px-12">
                    <div className="mb-8">
                        <div
                            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold font-sora text-white mb-6 leading-tight tracking-tight">
                        Connect across
                        <br/>semesters
                    </h2>
                    <p className="text-white/80 text-lg leading-relaxed mb-8">
                        Join course communities that bridge past, present, and future.
                        Get advice from alumni, collaborate with peers, and mentor incoming students.
                    </p>

                    {/* Decorative underline */}
                    <svg className="w-40 h-3 text-white/20 mb-8" viewBox="0 0 200 12">
                        <path d="M 0 6 Q 50 2 100 6 T 200 6" fill="none" stroke="currentColor" strokeWidth="2.5"
                              strokeLinecap="round"/>
                    </svg>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <div className="text-3xl font-bold font-sora text-white mb-1">2.4k+</div>
                            <div className="text-white/70 text-sm">Active students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold font-sora text-white mb-1">150+</div>
                            <div className="text-white/70 text-sm">Communities</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold font-sora text-white mb-1">94%</div>
                            <div className="text-white/70 text-sm">Success rate</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-float-slow {
                    animation: float 8s ease-in-out infinite;
                }

                .animate-float-fast {
                    animation: float 5s ease-in-out infinite;
                }

                @keyframes leftFade {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-leftFade {
                    animation: leftFade 0.8s ease-out 0.1s forwards;
                    opacity: 0;
                }

                @keyframes logoPulse {
                    0% {
                        filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.2));
                    }
                    50% {
                        filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.35));
                    }
                    100% {
                        filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.2));
                    }
                }

                .animate-logoPulse {
                    animation: logoPulse 3s ease-in-out infinite;
                }

            `}</style>

        </div>
    );
}