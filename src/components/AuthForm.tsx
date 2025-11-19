'use client';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { universities } from '@/lib/data';

type Mode = 'login' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
    const [selectedUniversity, setSelectedUniversity] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-6">
            <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-10 md:p-12 shadow-2xl shadow-slate-200/60">

                {/* Header & Logo */}
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <Link href="/" className="mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105">
                            <BookOpen className="text-white" size={24} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        {mode === 'login' ? 'Welcome Back' : 'Join GroupLearn'}
                    </h1>
                    <p className="text-md text-slate-600 font-light">
                        {mode === 'login' ? 'Sign in to access your courses' : 'Create your account to get started'}
                    </p>
                </div>

                {/* Form Fields */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="you@university.edu" className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition duration-300" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="••••••••" className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition duration-300" />
                    </div>

                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="university">University</label>
                            <div className="relative">
                                <select
                                    id="university"
                                    value={selectedUniversity}
                                    onChange={(e) => setSelectedUniversity(e.target.value)}
                                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-slate-900 appearance-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition duration-300"
                                >
                                    <option value="" disabled>Select your university</option>
                                    {/* FIX: Correctly mapping over the data to create options */}
                                    {universities.map((uni, i) => (
                                        <option key={i} value={uni.value}>
                                            {uni.label}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom arrow pointer just for style */}
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                    )}

                    <Link href={mode === 'login' ? '/discover' : '/login'}>
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all duration-300 mt-2"
                        >
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                        </Button>
                    </Link>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center text-sm">
                    <p className="text-slate-600">
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <Link href={mode === 'login' ? '/signup' : '/login'} className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200">
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}