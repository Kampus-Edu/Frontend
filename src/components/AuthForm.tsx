'use client';
import { useState } from 'react';
import { BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { universities } from '@/lib/data';


type Mode = 'login' | 'signup';
export default function AuthForm({ mode }: { mode: Mode }) {
    const [selectedUniversity, setSelectedUniversity] = useState('');
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-6">
            <div className="w/full max-w-md">
                <Link href="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition">
                    <ChevronLeft size={20} /><span>Back to Home</span>
                </Link>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"><BookOpen className="text-white" size={32}/></div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{mode === 'login' ? 'Welcome Back' : 'Join GroupLearn'}</h2>
                        <p className="text-slate-600">{mode === 'login' ? 'Sign in to your account' : 'Create your account to get started'}</p>
                    </div>


                    <div className="space-y-6">
                        <div>
                            <label className="block text-slate-600 text-sm font-medium mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition" placeholder="your.email@unb.ca"/>
                        </div>
                        <div>
                            <label className="block text-slate-600 text-sm font-medium mb-2">Password</label>
                            <input type="password" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition" placeholder="••••••••"/>
                        </div>
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-slate-600 text-sm font-medium mb-2">University</label>
                                <select value={selectedUniversity} onChange={(e)=>setSelectedUniversity(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition">
                                    <option value="">Select your university</option>
                                    {universities.map((u, i)=>(<option key={i} value={u}>{u}</option>))}
                                </select>
                            </div>
                        )}
                        <Link href="/discover"><Button className="w-full py-4">{mode === 'login' ? 'Sign In' : 'Create Account'}</Button></Link>
                    </div>


                    <div className="mt-6 text-center">
                        <p className="text-slate-600">
                            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <Link href={mode === 'login' ? '/signup' : '/login'} className="text-emerald-600 hover:text-emerald-700 font-medium">{mode === 'login' ? 'Sign up' : 'Sign in'}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}