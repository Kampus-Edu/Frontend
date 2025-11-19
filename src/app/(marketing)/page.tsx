'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Sparkles, Users, MessageSquare, ChevronRight, Star } from 'lucide-react';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation - Ultra minimal */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5' : ''
            }`}>
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center space-x-3.5 group">
                            <div className="relative">
                                <div className="w-11 h-11 bg-black rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <BookOpen className="text-white" size={20} strokeWidth={1.5} />
                                </div>
                                <div className="absolute -inset-1 bg-black/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <span className="text-[22px] font-medium text-black tracking-[-0.02em]">GroupLearn</span>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <Link href="/login">
                                <button className="px-7 py-2.5 text-[15px] text-black/70 hover:text-black transition-all duration-200 font-medium">
                                    Log in
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="px-7 py-2.5 bg-black text-white rounded-full text-[15px] font-medium hover:bg-black/90 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-black/10">
                                    Get started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Editorial style */}
            <section className="pt-40 pb-24 px-8 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-float-delayed" />
                </div>

                <div className="max-w-[1400px] mx-auto relative">
                    <div className="max-w-5xl">
                        {/* Status pill */}
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full mb-8 animate-fade-in">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[13px] font-medium text-black/70 tracking-wide uppercase">
                                2,400+ students online now
                            </span>
                        </div>

                        {/* Main heading - Editorial typography */}
                        <h1 className="text-[clamp(48px,7vw,96px)] font-light leading-[0.95] tracking-[-0.04em] text-black mb-8 animate-fade-in-up">
                            Where students
                            <br />
                            <span className="font-normal italic">actually</span> connect
                        </h1>

                        {/* Subheading */}
                        <p className="text-[22px] text-black/60 mb-12 max-w-2xl leading-[1.4] font-light animate-fade-in-up animation-delay-100">
                            Join course communities that span generations. Get real advice from
                            those who've been there, study with peers, and guide future cohorts.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-16 animate-fade-in-up animation-delay-200">
                            <Link href="/signup">
                                <button className="group px-8 py-4 bg-black text-white rounded-full text-[16px] font-medium hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3">
                                    <span>Start free</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </Link>
                            <Link href="/discover">
                                <button className="px-8 py-4 text-black/70 hover:text-black text-[16px] font-medium transition-all duration-200 flex items-center space-x-2 group">
                                    <span>Browse courses</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                </button>
                            </Link>
                        </div>

                        {/* Social proof - Minimal */}
                        <div className="flex items-center gap-8 text-[14px] text-black/50 animate-fade-in animation-delay-300">
                            <div className="flex -space-x-3">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-black/80 to-black/60 rounded-full border-2 border-white" />
                                ))}
                            </div>
                            <span>Join 500+ alumni mentors</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">150+ active communities</span>
                        </div>
                    </div>

                    {/* Floating UI Preview - Abstract representation */}
                    <div className="absolute -right-20 top-0 w-[600px] h-[400px] hidden xl:block animate-float-slow">
                        <div className="relative w-full h-full">
                            {/* Abstract course cards */}
                            <div className="absolute top-10 right-20 w-72 h-40 bg-white rounded-3xl shadow-2xl border border-black/5 p-6 transform rotate-3 hover:rotate-1 transition-transform duration-500">
                                <div className="w-20 h-3 bg-black/10 rounded-full mb-3" />
                                <div className="w-full h-2 bg-black/5 rounded-full mb-2" />
                                <div className="w-3/4 h-2 bg-black/5 rounded-full" />
                            </div>
                            <div className="absolute top-32 right-10 w-72 h-40 bg-black rounded-3xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="w-20 h-3 bg-white/20 rounded-full mb-3" />
                                <div className="w-full h-2 bg-white/10 rounded-full mb-2" />
                                <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features - Bento grid style */}
            <section className="py-32 px-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Large feature */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-3xl p-12 border border-emerald-100/50 group hover:shadow-2xl hover:shadow-emerald-100/20 transition-all duration-500">
                            <Users className="text-emerald-600 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-3xl font-light text-black mb-4 tracking-tight">
                                Cross-semester learning
                            </h3>
                            <p className="text-lg text-black/60 leading-relaxed">
                                Connect with students from past, present, and future. Get insider knowledge,
                                study strategies, and career guidance from those who've walked your path.
                            </p>
                        </div>

                        {/* Small feature */}
                        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl p-12 border border-blue-100/50 group hover:shadow-2xl hover:shadow-blue-100/20 transition-all duration-500">
                            <MessageSquare className="text-blue-600 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-2xl font-light text-black mb-3">
                                Real insights
                            </h3>
                            <p className="text-black/60 leading-relaxed">
                                No fluff, just honest course intel from verified students.
                            </p>
                        </div>

                        {/* Bottom features */}
                        <div className="bg-black text-white rounded-3xl p-12 group hover:shadow-2xl hover:shadow-black/20 transition-all duration-500">
                            <Star className="text-yellow-400 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-2xl font-light mb-3">
                                Alumni mentorship
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Direct access to successful graduates ready to help.
                            </p>
                        </div>

                        <div className="lg:col-span-2 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-3xl p-12 border border-violet-100/50 group hover:shadow-2xl hover:shadow-violet-100/20 transition-all duration-500">
                            <Sparkles className="text-violet-600 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-2xl font-light text-black mb-3">
                                Smart course discovery
                            </h3>
                            <p className="text-black/60 leading-relaxed">
                                Find courses that match your goals with AI-powered recommendations and real student reviews.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Rotating cards */}
            <section className="py-32 px-8 bg-black/[0.02]">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-center text-4xl font-light text-black mb-16 tracking-tight">
                        Loved by students everywhere
                    </h2>

                    <div className="relative h-[200px]">
                        {[
                            { text: "Finally found seniors who helped me avoid the impossible course combo everyone warns about too late.", author: "Maya Chen", role: "CS '25" },
                            { text: "The alumni network here got me my internship. Real advice from people who actually work in the field.", author: "James Park", role: "Engineering '24" },
                            { text: "Wish I had this my first year. Would've saved me from so many scheduling disasters.", author: "Sam Rodriguez", role: "Math '26" }
                        ].map((testimonial, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-all duration-700 ${
                                    i === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                            >
                                <div className="bg-white rounded-3xl p-10 border border-black/5 shadow-sm">
                                    <p className="text-xl text-black/80 mb-6 leading-relaxed font-light">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-black/80 to-black/60 rounded-full" />
                                        <div>
                                            <p className="font-medium text-black">{testimonial.author}</p>
                                            <p className="text-sm text-black/50">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[0,1,2].map(i => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i === activeTestimonial ? 'w-8 bg-black' : 'bg-black/20'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-8">
                <div className="max-w-[900px] mx-auto text-center">
                    <h2 className="text-5xl font-light text-black mb-6 tracking-tight">
                        Ready to join?
                    </h2>
                    <p className="text-xl text-black/60 mb-10 font-light">
                        Start connecting with your academic community today.
                    </p>
                    <Link href="/signup">
                        <button className="px-10 py-4 bg-black text-white rounded-full text-[17px] font-medium hover:bg-black/90 transition-all duration-300 shadow-xl hover:shadow-2xl">
                            Get started free
                        </button>
                    </Link>
                    <p className="mt-4 text-sm text-black/40">No credit card required</p>
                </div>
            </section>

            {/* Footer - Minimal */}
            <footer className="py-12 px-8 border-t border-black/5">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
                            <BookOpen className="text-white" size={16} strokeWidth={1.5} />
                        </div>
                        <span className="font-medium text-black tracking-tight">GroupLearn</span>
                    </div>
                    <p className="text-sm text-black/40">© 2025 GroupLearn. Built for students, by students.</p>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(1deg); }
                }
                .animate-fade-in { 
                    animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
                }
                .animate-fade-in-up { 
                    animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
                }
                .animation-delay-100 { 
                    animation-delay: 0.1s; 
                    opacity: 0; 
                    animation-fill-mode: forwards; 
                }
                .animation-delay-200 { 
                    animation-delay: 0.2s; 
                    opacity: 0; 
                    animation-fill-mode: forwards; 
                }
                .animation-delay-300 { 
                    animation-delay: 0.3s; 
                    opacity: 0; 
                    animation-fill-mode: forwards; 
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 6s ease-in-out infinite;
                    animation-delay: 3s;
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}