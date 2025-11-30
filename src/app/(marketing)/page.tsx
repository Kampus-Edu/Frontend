"use client";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from "next/image";
import { BookOpen, ArrowRight, Sparkles, Users, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

const sectionVariant = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1], // springy but smooth
            when: "beforeChildren",
            staggerChildren: 0.15,
        },
    },
};

const itemVariant = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.2,
        },
    },
};

const card = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const statsContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const statItem = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const testimonials = [
    {
        quote: "The MAAC 3021 room saved my ahh this semester. Alumni shared study strategies that actually worked, and I connected with classmates I wouldn't have met otherwise.",
        name: "Sarah Chen",
        major: "Computer Science '24",
        avatar: "/avatar1.png"
    },
    {
        quote: "Honestly this app is better than RateMyProf + Discord combined. Upper years literally spoon-fed me success.",
        name: "Jason Patel",
        major: "Software Engineering '26",
        avatar: "/avatar2.png"
    },
    {
        quote: "I found my study group AND a mentor here. Uni feels way less scary when other people have your back.",
        name: "Emily Nguyen",
        major: "Biology '23",
        avatar: "/avatar3.png"
    }
];



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
                    className="absolute inset-0 opacity-[0.7]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(64, 64, 64) 1px, transparent 0)`,
                        backgroundSize: '48px 48px'
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/70 backdrop-blur-md border-b border-gray-300/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                    : ""
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 bg-gray-800 rounded-xl blur-md opacity-25 group-hover:opacity-40 transition-opacity"/>
                                <Image
                                    src="/kampus-logo.png"
                                    width={50}
                                    height={50}
                                    alt="Kampus logo"
                                    className="opacity-100 object-contain invert"
                                />
                                {/*</div>*/}
                            </div>
                            <span className="text-[35px] font-mono font-bold text-gray-900 tracking-tight">Kampus</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <button
                                    className="px-5 py-2 text-[20px] font-bold text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
                                    Log In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button
                                    className="px-5 py-2.5 text-[15px] font-medium text-white bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 rounded-lg transition-all shadow-lg shadow-gray-800/25 hover:shadow-xl hover:shadow-gray-800/35">
                                    Get started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-35 pb-24 px-6 lg:px-8 overflow-hidden">
                {/* Decorative doodles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating book icon */}
                    <svg className="absolute top-32 right-[15%] w-16 h-16 text-purple-400/70" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    {/* Curved arrow */}
                    <svg className="absolute top-48 left-[12%] w-30 h-24 text-purple-400/75" viewBox="0 0 100 100">
                        <path d="M 20 50 Q 50 20 80 50" fill="none" stroke="currentColor" strokeWidth="2.5"
                              strokeLinecap="round"/>
                        <path d="M 75 40 L 80 50 L 70 48" fill="currentColor"/>
                    </svg>
                    {/* Star doodle */}
                    <svg className="absolute top-[55%] right-[8%] w-14 h-14 text-blue-400/70" viewBox="0 0 24 24"
                         fill="currentColor">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                    </svg>
                    {/* Chat bubble */}
                    <svg className="absolute bottom-32 left-[18%] w-12 h-12 text-green-400/75" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {/* Underline scribble */}
                    <svg className="absolute top-[38%] left-[35%] w-32 h-8 text-yellow-600/70" viewBox="0 0 200 40">
                        <path d="M 10 20 Q 50 10 100 20 T 190 20" fill="none" stroke="currentColor" strokeWidth="3"
                              strokeLinecap="round"/>
                    </svg>
                </div>

                <motion.div
                    className="max-w-7xl mx-auto relative"
                    variants={sectionVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: "-120px"}}
                >
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        variants={sectionVariant}
                    >
                        {/* Status badge */}
                        <motion.div variants={itemVariant}>
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-300 to-blue-200 border border-gray-200/40 rounded-full mb-8 shadow-sm">
                                <div className="relative flex h-2 w-2">
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-200"></span>
                                </div>
                                <span
                                    className="text-sm font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    2,400+ students learning together
                </span>
                            </div>
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            variants={itemVariant}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
                        >
                            Built BY students
                            <br/>
                            <span className="relative inline-block">
                <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                    FOR students
                </span>
                <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 400 12"
                    preserveAspectRatio="none"
                >

                    <motion.path
                        d="M 0 8 Q 100 4 200 8 T 400 8"
                        fill="none"
                        stroke="green"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.9"
                        initial={{pathLength: 0}}
                        whileInView={{pathLength: 1}}
                        transition={{
                            duration: 2.0,
                            ease: "easeInOut"  // a smooth bezier ease
                        }}


                    />

                </motion.svg>

            </span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            variants={itemVariant}
                            className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
                        >
                            university didn't come with instructions... <br/>
                            so we made some.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariant}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                                <Link href="/signup">
                                    <button className="group px-7 py-3.5 bg-gray-800 hover:bg-black text-white rounded-xl font-sans
                        transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.02] flex items-center gap-2">
                                        <span>Get Started</span>
                                        <ArrowRight size={23}
                                                    className="group-hover:translate-x-0.5 transition-transform"
                                                    strokeWidth={2.5}/>
                                    </button>
                                </Link>
                                <Link href="/discover">
                                    <button
                                        className="px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium transition-all border border-gray-200 hover:border-gray-300 shadow-sm">
                                        Browse Courses
                                    </button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div variants={itemVariant}>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-large text-gray-600">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex -space-x-2">
                                        {[
                                            'from-blue-500 to-gray-700',
                                            'from-red-400 to-gray-600',
                                            'from-green-600 to-gray-800',
                                            'from-yellow-500 to-gray-700'
                                        ].map((grad, i) => (
                                            <div key={i}
                                                 className={`w-8 h-8 bg-gradient-to-br ${grad} rounded-full border-2 border-white shadow-sm`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-medium text-gray-700">500+ courses</span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <span className="font-large">150+ universities</span>
                                <span className="font-large">10,000+ students</span>
                                <span className="font-large">300+ alumni</span>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>

                {/* Hero fade-out gradient */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"/>
            </section>

            {/* Features Section */}
            <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-b from-blue-50/45 to-blue">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                            Find people who’ve suffered through your courses before you,
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            so you don’t have to raw-dog your degree alone.
                        </p>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {[
                            {
                                icon: Users,
                                title: 'Course Rooms',
                                desc: 'Talk to people who already survived your course. Get the real advice, the real reviews, and the real shortcuts. Who knows you might even find your school crush out here 👀',
                                gradient: 'from-green-600 to-yellow-800',
                                bgGradient: 'from-purple-100 to-black-200/50',
                                borderColor: 'border-pink-300/10'
                            },
                            {
                                icon: MessageSquare,
                                title: 'Real Insights',
                                desc: 'Skip the guesswork. Ask about workload, difficulty, and what actually matters for getting a good grade.',
                                gradient: 'from-green-500 to-yellow-700',
                                bgGradient: 'from-orange-100 to-black-200/50',
                                borderColor: 'border-orange-300/10'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Peer Support',
                                desc: 'Find your people. Get help from the girlies, the guys, and the academic weapon upperclassmen who’ve already tanked this course for XP.',
                                gradient: 'from-green-600 to-yellow-800',
                                bgGradient: 'from-blue-100 to-black-200/50',
                                borderColor: 'border-blue-300/10'
                            }
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={card}
                                    className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-8 border ${feature.borderColor} hover:shadow-xl hover:shadow-gray-200/30 transition-all duration-300 hover:-translate-y-1`}
                                >
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-800/25 group-hover:scale-110 transition-transform`}>
                                        <Icon className="text-white" size={22} strokeWidth={2}/>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>


            {/* Stats Section */}
            <section className="py-20 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={statsContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {[
                            {number: '2,400+', label: 'Active students', emoji: '👨‍🎓'},
                            {number: '150+', label: 'Course rooms', emoji: '📚'},
                            {number: '94%', label: 'Success rate', emoji: '⭐'},
                            {number: '500+', label: 'Alumni mentors', emoji: '🎓'}
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={statItem}
                                className="text-center group"
                            >
                                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">
                                    {stat.emoji}
                                </div>

                                <div className="text-4xl font-bold bg-gradient-to-br from-gray-700 to-gray-900
                                    bg-clip-text text-transparent mb-1">
                                    {stat.number}
                                </div>

                                <div className="text-sm text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>


            {/* Testimonial Section */}
            <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
                <h2 className="text-center text-4xl font-bold text-gray-900 mb-12 tracking-tight">
                    What students are saying
                </h2>

                <div className="max-w-4xl mx-auto overflow-x-auto snap-x snap-mandatory flex gap-6 scrollbar-none px-4">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="min-w-[85%] md:min-w-[45%] lg:min-w-[33%] snap-center bg-white rounded-2xl p-10 border border-gray-200/60 shadow-xl shadow-gray-200/50 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-0 -left-4 w-12 h-12 bg-gradient-to-br from-blue-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-800/25">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                </svg>
                            </div>

                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {t.quote}
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-gray-100 rounded-full shadow-md" />
                                <div>
                                    <p className="font-semibold text-gray-900">{t.name}</p>
                                    <p className="text-sm text-gray-600">{t.major}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Content */}
                <div className="max-w-3xl mx-auto text-center relative">
                    <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">
                        ready to join your community?
                    </h2>
                    <p className="text-lg font-bold text-gray-700 mb-8 leading-relaxed">
                        start connecting with students who've been where you are - and where you're going.
                    </p>
                    <Link href="/signup">
                        <button
                            className="px-8 py-4 bg-white text-gray-800 hover:bg-gray-100 rounded-xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                            let's go
                        </button>
                    </Link>
                    <p className="mt-4 text-sm text-gray-400">No credit card required • Free forever (jk, lol)</p>
                </div>
        </section>


            {/* Footer */}
            <footer className="py-12 px-6 lg:px-8 bg-gray border-t border-gray-200/60">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-md shadow-gray-800/25">
                            <Image
                                src="/kampus-logo.png"
                                width={60}
                                height={60}
                                alt="Kampus logo"
                                className="opacity-100 object-contain invert"
                            />
                        </div>
                        <span className="font-semibold text-gray-900">Kampus</span>
                    </Link>
                    <p className="text-sm text-gray-600">© 2025 Kampus. Built for students, by students.</p>
                </div>
            </footer>
        </div>
    );
}