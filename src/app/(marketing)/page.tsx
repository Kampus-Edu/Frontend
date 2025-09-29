'use client';
import Link from 'next/link';
import { BookOpen, Users, BarChart3, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
            {/* Nav */}
            <nav className="p-6 bg-white border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
                            <BookOpen className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">GroupLearn</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="px-6 py-2 text-slate-600 hover:text-slate-900 transition">Login</Link>
                        <Link href="/signup"><Button>Sign Up</Button></Link>
                    </div>
                </div>
            </nav>


            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        Connect with Students<br />
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Across Semesters</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Join academic communities that span generations. Get advice from alumni, study with current classmates, and help future students succeed.
                    </p>
                    <div className="flex items-center justify-center space-x-6">
                        <Link href="/signup"><Button className="px-8 py-4 text-lg"> <span>Get Started Free</span><ArrowRight size={20} className="ml-3"/></Button></Link>
                        <Link href="/discover"><Button variant="subtle" className="px-8 py-4 text-lg">Explore Courses</Button></Link>
                    </div>
                </div>


                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[{icon:Users, title:'Cross-Semester Communities', desc:'Connect with current students, alumni mentors, and prospective learners in course-specific rooms.'}, {icon:BarChart3,title:'Course Intelligence', desc:'Get insights on difficulty, time commitment, and success strategies from students who\'ve been there.'}, {icon:GraduationCap, title:'Alumni Mentorship', desc:'Connect with successful graduates for guidance, career advice, and academic support.'}].map((f, i) => {
                        const Icon = f.icon; return (
                            <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6"><Icon className="text-white" size={24}/></div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
                                <p className="text-slate-600">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>


                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    {[['2,400+','Active Students'],['150+','Course Communities'],['94%','Grade Improvement'],['500+','Alumni Mentors']].map(([n,l]) => (
                        <div key={l}><div className="text-4xl font-bold text-slate-900 mb-2">{n}</div><div className="text-slate-600">{l}</div></div>
                    ))}
                </div>
            </div>
        </div>
    );
}