// LandingPage.js - Redesigned for Sleekness and Drama

'use client';
import Link from 'next/link';
import { BookOpen, Users, BarChart3, GraduationCap, ArrowRight, Sparkles, TrendingUp, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Utility class to simulate a premium serif font for the dramatic headline
const SERIF_CLASS = "font-serif tracking-tight"; // Assume you'll map this to a serif font in your CSS config (e.g., 'serif: "Times New Roman", ...')

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Nav - Minimal, fixed, and crisp */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100/80">
                <div className="max-w-8xl mx-auto px-8 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
                                <BookOpen className="text-white" size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-semibold text-slate-900 tracking-tight">GroupLearn</span>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Link href="/login">
                                <button className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors duration-200 rounded-xl">
                                    Log in
                                </button>
                            </Link>
                            <Link href="/signup">
                                <Button className="h-10 px-6 text-sm shadow-lg hover:shadow-xl transition-all duration-300">Sign up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero - Dramatic Typography and Spacing */}
            <section className="pt-48 pb-32 px-8 lg:px-12">
                <div className="max-w-8xl mx-auto">
                    <div className="max-w-6xl mx-auto text-center">

                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-12 animate-fade-in backdrop-blur-sm">
                            <Sparkles size={16} className="text-emerald-600" fill="#059669" />
                            <span className="text-sm font-medium text-emerald-800 tracking-wide">
                                Academic Collaboration Redefined
                            </span>
                        </div>

                        {/* Heading - Serif for Luxury */}
                        <h1 className={`${SERIF_CLASS} text-7xl sm:text-8xl lg:text-9xl font-extrabold text-slate-900 mb-10 leading-[0.95] tracking-tight animate-fade-in-up`}>
                            The **Academic Edge**
                            <br />
                            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                Across Semesters
                            </span>
                        </h1>

                        {/* Subheading - Lighter and Airy */}
                        <p className="text-xl sm:text-2xl text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-100">
                            Connect with current classmates, gain strategic insights from **alumni mentors**, and elevate your course performance.
                        </p>

                        {/* CTA - Primary Focus */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 animate-fade-in-up animation-delay-200">
                            <Link href="/discover">
                                <Button className="h-16 px-12 text-lg font-semibold group shadow-xl shadow-emerald-500/15 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
                                    <span>Explore Courses</span>
                                    <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </Link>
                        </div>

                        {/* Social Proof - Simplified and Clean */}
                        <div className="flex items-center justify-center gap-10 text-base text-slate-500 animate-fade-in animation-delay-300">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {['from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-orange-400 to-orange-600'].map((gradient, i) => (
                                        <div key={i} className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full border-2 border-white shadow-md`} />
                                    ))}
                                </div>
                                <span className="font-semibold text-slate-800">500+ Alumni Mentors</span>
                            </div>
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                            <span className="font-semibold text-slate-800">150+ Communities Active</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features - Glass-like Cards & Spacious */}
            <section className="py-36 px-8 lg:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className={`${SERIF_CLASS} text-5xl font-extrabold text-slate-900 mb-6 tracking-tight`}>
                            Your Success Toolkit
                        </h2>
                        <p className="text-2xl text-slate-600 max-w-3xl mx-auto font-light">
                            Connect, learn, and grow with students from all cohorts.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
                        {/* Feature mapping remains the same, but card style changes */}
                        {[
                            // ... features array remains here ...
                            {
                                icon: Users,
                                title: 'Cross-Semester Communities',
                                desc: 'Connect with current students, alumni mentors, and prospective learners in course-specific spaces.',
                                color: 'emerald'
                            },
                            {
                                icon: BarChart3,
                                title: 'Course Intelligence',
                                desc: 'Get insights on difficulty, time commitment, and success strategies from students who\'ve been there.',
                                color: 'blue'
                            },
                            {
                                icon: GraduationCap,
                                title: 'Alumni Mentorship',
                                desc: 'Connect with successful graduates for guidance, career advice, and academic support.',
                                color: 'violet'
                            }
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={i}
                                    className="group bg-white/70 backdrop-blur-sm border border-slate-100 rounded-3xl p-12 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`text-${feature.color}-600`} size={28} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed font-light text-lg">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA - Final Dark Section - Crisper and more prominent */}
            <section className="py-36 px-8 lg:px-12 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`${SERIF_CLASS} text-5xl font-extrabold text-white mb-10 tracking-tight`}>
                        Ready for a competitive edge?
                    </h2>
                    <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light">
                        Join the collaborative academic platform built for student success.
                    </p>
                    <Link href="/signup">
                        <Button className="h-16 px-12 text-lg font-medium bg-white text-slate-900 hover:bg-slate-100 shadow-2xl shadow-emerald-500/10 transition-all duration-300">
                            Create Free Account
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer - Minimal and Clean */}
            <footer className="py-16 px-6 lg:px-8 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="text-white" size={18} />
                            </div>
                            <span className="font-semibold text-slate-900">GroupLearn</span>
                        </div>
                        <p className="text-sm text-slate-600">© 2025 GroupLearn. Built with ❤️ for students, by students.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}