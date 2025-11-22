"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles, Users, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Subtle grid background - fixed to viewport */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139, 92, 246) 1px, transparent 0)`,
                        backgroundSize: '48px 48px'
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-purple-100/50 shadow-sm shadow-purple-100/5' : ''
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-600 rounded-xl blur-md opacity-25 group-hover:opacity-40 transition-opacity" />
                                <div className="relative w-9 h-9 bg-gradient-to-br from-purple-600 via-purple-600 to-purple-700 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg shadow-purple-600/25">
                                    <BookOpen className="text-white" size={17} strokeWidth={2.5} />
                                </div>
                            </div>
                            <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Kampus</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <button className="px-5 py-2 text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
                                    Log in
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="px-5 py-2.5 text-[15px] font-medium text-white bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg transition-all shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35">
                                    Get started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
                {/* Decorative doodles - academic themed */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating book icon */}
                    <svg className="absolute top-32 right-[15%] w-16 h-16 text-purple-200/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {/* Curved arrow */}
                    <svg className="absolute top-48 left-[12%] w-24 h-24 text-blue-200/25" viewBox="0 0 100 100">
                        <path d="M 20 50 Q 50 20 80 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 75 40 L 80 50 L 70 48" fill="currentColor" />
                    </svg>
                    {/* Star doodle */}
                    <svg className="absolute top-[55%] right-[8%] w-14 h-14 text-purple-200/30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                    </svg>
                    {/* Chat bubble */}
                    <svg className="absolute bottom-32 left-[18%] w-12 h-12 text-blue-200/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {/* Underline scribble */}
                    <svg className="absolute top-[38%] left-[35%] w-32 h-8 text-purple-300/20" viewBox="0 0 200 40">
                        <path d="M 10 20 Q 50 10 100 20 T 190 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/40 rounded-full mb-8 shadow-sm">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </div>
                            <span className="text-sm font-medium bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                                2,400+ students learning together
                            </span>
                        </div>

                        {/* Main heading with gradient */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                            Connect with students
                            <br />
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                                    across semesters
                                </span>
                                {/* Hand-drawn underline */}
                                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 12" preserveAspectRatio="none">
                                    <path d="M 0 8 Q 100 4 200 8 T 400 8" fill="none" stroke="rgb(147, 51, 234)" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join academic communities that span generations. Get advice from alumni,
                            study with peers, and mentor future students.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                            <Link href="/signup">
                                <button className="group relative px-7 py-3.5 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/40 flex items-center gap-2">
                                    <span>Get started free</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                                </button>
                            </Link>
                            <Link href="/discover">
                                <button className="px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium transition-all border border-gray-200 hover:border-gray-300 shadow-sm">
                                    Browse courses
                                </button>
                            </Link>
                        </div>

                        {/* Social proof */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2.5">
                                <div className="flex -space-x-2">
                                    {[
                                        'from-purple-400 to-purple-600',
                                        'from-blue-400 to-blue-600',
                                        'from-indigo-400 to-indigo-600',
                                        'from-violet-400 to-violet-600'
                                    ].map((grad, i) => (
                                        <div key={i} className={`w-8 h-8 bg-gradient-to-br ${grad} rounded-full border-2 border-white shadow-sm`} />
                                    ))}
                                </div>
                                <span className="font-medium text-gray-700">500+ alumni mentors</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="font-medium">150+ communities</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                            Everything you need to succeed
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Academic support that spans across time
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Users,
                                title: 'Course Rooms',
                                desc: 'Connect with alumni who\'ve taken your courses. Get real strategies, honest reviews, and time management tips.',
                                gradient: 'from-purple-500 to-purple-600',
                                bgGradient: 'from-purple-50 to-purple-100/50',
                                borderColor: 'border-purple-200/40'
                            },
                            {
                                icon: MessageSquare,
                                title: 'Real Insights',
                                desc: 'No fluff, just honest intel. Ask about difficulty, workload, and what actually helps you succeed.',
                                gradient: 'from-blue-500 to-blue-600',
                                bgGradient: 'from-blue-50 to-blue-100/50',
                                borderColor: 'border-blue-200/40'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Peer Support',
                                desc: 'Study with current classmates and get guidance from upperclassmen who understand your journey.',
                                gradient: 'from-indigo-500 to-indigo-600',
                                bgGradient: 'from-indigo-50 to-indigo-100/50',
                                borderColor: 'border-indigo-200/40'
                            }
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={i}
                                    className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-8 border ${feature.borderColor} hover:shadow-xl hover:shadow-${feature.gradient.split(' ')[1]}/10 transition-all duration-300 hover:-translate-y-1`}
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-${feature.gradient.split(' ')[1]}/25 group-hover:scale-110 transition-transform`}>
                                        <Icon className="text-white" size={22} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '2,400+', label: 'Active students', emoji: '👨‍🎓' },
                            { number: '150+', label: 'Course rooms', emoji: '📚' },
                            { number: '94%', label: 'Success rate', emoji: '⭐' },
                            { number: '500+', label: 'Alumni mentors', emoji: '🎓' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">{stat.emoji}</div>
                                <div className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-white rounded-2xl p-10 border border-gray-200/60 shadow-xl shadow-gray-200/50">
                        {/* Quote mark */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/25">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                        </div>
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed pl-4">
                            The MAAC 3021 room saved my ahh this semester. Alumni shared study strategies that actually worked,
                            and I connected with classmates I wouldn't have met otherwise.
                        </p>
                        <div className="flex items-center gap-3 pl-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-md" />
                            <div>
                                <p className="font-semibold text-gray-900">Sarah Chen</p>
                                <p className="text-sm text-gray-600">Computer Science '24</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 overflow-hidden">
                {/* Subtle pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                <div className="max-w-3xl mx-auto text-center relative">
                    <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                        Ready to join your community?
                    </h2>
                    <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                        Start connecting with students who've been where you are—and where you're going.
                    </p>
                    <Link href="/signup">
                        <button className="px-8 py-4 bg-white text-purple-700 hover:bg-purple-50 rounded-xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                            Get started free
                        </button>
                    </Link>
                    <p className="mt-4 text-sm text-purple-200">No credit card required • Free forever</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 lg:px-8 bg-white border-t border-gray-200/60">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md shadow-purple-600/25">
                            <BookOpen className="text-white" size={14} strokeWidth={2.5} />
                        </div>
                        <span className="font-semibold text-gray-900">Kampus</span>
                    </Link>
                    <p className="text-sm text-gray-600">© 2025 Kampus. Built for students, by students.</p>
                </div>
            </footer>
        </div>
    );
}