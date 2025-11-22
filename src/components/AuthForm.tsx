"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronLeft, Mail, Lock, GraduationCap, ArrowRight, ChevronDown } from 'lucide-react';

const universities = [
    'Harvard University',
    'Stanford University',
    'MIT',
    'University of Toronto',
    'McGill University',
    'UBC',
    'University of New Brunswick',
    'Oxford University'
];

export default function AuthPage() {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [university, setUniversity] = useState('');
    const [focused, setFocused] = useState('');

    return (
        <div className="min-h-screen bg-white flex relative overflow-hidden">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139, 92, 246) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}
            />

            {/* Decorative doodles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute top-24 left-16 w-20 h-20 text-purple-200/20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" />
                </svg>
                <svg className="absolute bottom-32 right-24 w-16 h-16 text-blue-200/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>

            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 relative">
                <div className="w-full max-w-md">
                    {/* Back button */}
                    <Link href="/" className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-12 transition-colors">
                        <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm font-medium">Back to home</span>
                    </Link>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-600 rounded-xl blur-md opacity-25" />
                            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/25">
                                <BookOpen className="text-white" size={19} strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className="text-xl font-semibold text-gray-900 tracking-tight">GroupLearn</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                            {mode === 'login' ? 'Welcome back' : 'Create account'}
                        </h1>
                        <p className="text-gray-600 leading-relaxed">
                            {mode === 'login'
                                ? 'Sign in to continue to your courses'
                                : 'Join thousands of students learning together'}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                                    focused === 'email' ? 'text-purple-500' : 'text-gray-400'
                                }`} size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused('')}
                                    placeholder="you@university.edu"
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                                    focused === 'password' ? 'text-purple-500' : 'text-gray-400'
                                }`} size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused('')}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* University (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                                <div className="relative">
                                    <GraduationCap className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors ${
                                        focused === 'university' ? 'text-purple-500' : 'text-gray-400'
                                    }`} size={18} />
                                    <select
                                        value={university}
                                        onChange={(e) => setUniversity(e.target.value)}
                                        onFocus={() => setFocused('university')}
                                        onBlur={() => setFocused('')}
                                        className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none cursor-pointer shadow-sm"
                                    >
                                        <option value="">Select your university</option>
                                        {universities.map((u, i) => (
                                            <option key={i} value={u}>{u}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <Link href="/discover">
                            <button className="group w-full h-12 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35 mt-6 flex items-center justify-center gap-2">
                                <span>{mode === 'login' ? 'Sign in' : 'Create account'}</span>
                                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                            </button>
                        </Link>

                        {mode === 'login' && (
                            <div className="text-center">
                                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Toggle mode */}
                    <div className="mt-8 text-center">
                        <span className="text-gray-600">
                            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        </span>
                        <button
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                        >
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span>Secure & encrypted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                            <span>2,400+ students</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden items-center justify-center">
                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Floating gradient orbs */}
                <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-32 right-32 w-56 h-56 bg-white/5 rounded-full blur-3xl animate-float-delayed" />

                {/* Content */}
                <div className="relative z-10 max-w-lg px-12">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Connect across
                        <br />semesters
                    </h2>
                    <p className="text-white/80 text-lg leading-relaxed mb-8">
                        Join course communities that bridge past, present, and future.
                        Get advice from alumni, collaborate with peers, and mentor incoming students.
                    </p>

                    {/* Decorative underline */}
                    <svg className="w-40 h-3 text-white/20 mb-8" viewBox="0 0 200 12">
                        <path d="M 0 6 Q 50 2 100 6 T 200 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">2.4k+</div>
                            <div className="text-white/70 text-sm">Active students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">150+</div>
                            <div className="text-white/70 text-sm">Communities</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">94%</div>
                            <div className="text-white/70 text-sm">Success rate</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 6s ease-in-out infinite;
                    animation-delay: 3s;
                }
            `}</style>
        </div>
    );
}