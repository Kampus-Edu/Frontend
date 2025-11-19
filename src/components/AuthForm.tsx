'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { universities } from '@/lib/data';

type Mode = 'login' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focused, setFocused] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-md">
                    {/* Back button */}
                    <Link href="/" className="inline-flex items-center text-black/50 hover:text-black mb-12 transition-colors duration-200 group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-light text-black mb-3 tracking-tight">
                            {mode === 'login' ? 'Welcome back' : 'Create account'}
                        </h1>
                        <p className="text-black/50 text-lg font-light">
                            {mode === 'login'
                                ? 'Enter your credentials to continue'
                                : 'Join thousands of students already learning together'}
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Email field */}
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-black/10 text-black placeholder-transparent focus:outline-none focus:border-black transition-colors duration-300 text-lg"
                                placeholder="Email"
                                id="email"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                    focused === 'email' || email
                                        ? '-top-6 text-sm text-black/50'
                                        : 'top-4 text-lg text-black/40'
                                }`}
                            >
                                Email address
                            </label>
                        </div>

                        {/* Password field */}
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocused('password')}
                                onBlur={() => setFocused(null)}
                                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-black/10 text-black placeholder-transparent focus:outline-none focus:border-black transition-colors duration-300 text-lg"
                                placeholder="Password"
                                id="password"
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                    focused === 'password' || password
                                        ? '-top-6 text-sm text-black/50'
                                        : 'top-4 text-lg text-black/40'
                                }`}
                            >
                                Password
                            </label>
                        </div>

                        {/* University field (signup only) */}
                        {mode === 'signup' && (
                            <div className="relative">
                                <select
                                    value={selectedUniversity}
                                    onChange={(e) => setSelectedUniversity(e.target.value)}
                                    onFocus={() => setFocused('university')}
                                    onBlur={() => setFocused(null)}
                                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-black/10 text-black focus:outline-none focus:border-black transition-colors duration-300 text-lg appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="text-black/40">Select university</option>
                                    {universities.map((uni, i) => (
                                        <option key={i} value={uni} className="text-black">{uni}</option>
                                    ))}
                                </select>
                                <label
                                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                        focused === 'university' || selectedUniversity
                                            ? '-top-6 text-sm text-black/50'
                                            : 'top-4 text-lg text-black/40'
                                    }`}
                                >
                                    Your university
                                </label>
                                <div className="absolute right-0 top-4 pointer-events-none">
                                    <svg className="w-5 h-5 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all duration-300 text-lg group flex items-center justify-center space-x-2 mt-8"
                        >
                            <span>{mode === 'login' ? 'Sign in' : 'Create account'}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </button>

                        {/* Forgot password (login only) */}
                        {mode === 'login' && (
                            <div className="text-center">
                                <a href="#" className="text-sm text-black/50 hover:text-black transition-colors duration-200">
                                    Forgot your password?
                                </a>
                            </div>
                        )}
                    </form>

                    {/* Switch mode */}
                    <div className="mt-12 pt-8 border-t border-black/5 text-center">
                        <p className="text-black/50">
                            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            <Link
                                href={mode === 'login' ? '/signup' : '/login'}
                                className="ml-2 text-black font-medium hover:underline underline-offset-4 transition-all duration-200"
                            >
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex flex-1 bg-black relative overflow-hidden items-center justify-center">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float-delayed" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg px-12">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-4xl font-light text-white mb-6 leading-tight">
                        Connect across semesters
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed font-light">
                        Join course communities that bridge past, present, and future.
                        Get advice from alumni, collaborate with peers, and mentor incoming students.
                    </p>

                    {/* Stats */}
                    <div className="mt-12 flex gap-8">
                        <div>
                            <div className="text-3xl font-light text-white mb-1">2.4k+</div>
                            <div className="text-white/50 text-sm">Active students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-light text-white mb-1">150+</div>
                            <div className="text-white/50 text-sm">Communities</div>
                        </div>
                        <div>
                            <div className="text-3xl font-light text-white mb-1">94%</div>
                            <div className="text-white/50 text-sm">Success rate</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-30px); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 8s ease-in-out infinite;
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}