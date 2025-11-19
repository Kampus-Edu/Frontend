// DiscoverPage.js - Redesigned for Professional Browsing

'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, BadgeCheck, Search, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { allCourses } from '@/lib/data'; // Assumed data structure for course list

// Mock data for the sidebar (Joined Rooms)
const joinedRoomsMock = [
    { id: 'maac1021', name: 'Calc I', active: 3 },
    { id: 'cs3011', name: 'Software Eng', active: 7 },
    { id: 'philo2001', name: 'Ethics', active: 1 },
];

export default function DiscoverPage(){
    const [courseFilter, setCourseFilter] = useState<'all'|string>('all');
    const [yearFilter, setYearFilter] = useState<'all'|string>('all');

    // ... filtering logic remains the same ...
    const filtered = useMemo(() =>
            allCourses
                .filter(c => courseFilter==='all' || c.department.toLowerCase()===courseFilter.toLowerCase())
                .filter(c => yearFilter==='all' || c.year===parseInt(yearFilter as string, 10))
                .sort((a,b)=>b.popularity-a.popularity),
        [courseFilter, yearFilter]
    );

    return (
        <div className="min-h-screen bg-slate-50/50 flex">

            {/* Sidebar - Sleek and Clean Navigation */}
            <div className="w-72 bg-white border-r border-slate-100 shadow-xl shadow-slate-200/10 flex flex-col pt-4">
                <div className="p-6 border-b border-slate-100/80 mb-6">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm"><BookOpen className="text-white" size={16}/></div>
                        <h1 className="text-lg font-bold text-slate-900">GroupLearn</h1>
                    </Link>
                </div>

                <div className="px-6 space-y-6 flex-1">
                    {/* Main Nav Links */}
                    <nav className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Navigation</h3>
                        <Link href="/discover" className="flex items-center p-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium transition-all duration-200">
                            <Search size={18} className="mr-3"/>
                            Discover Courses
                        </Link>
                        <Link href="/dashboard" className="flex items-center p-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">
                            <BadgeCheck size={18} className="mr-3"/>
                            My Dashboard
                        </Link>
                    </nav>

                    {/* Joined Rooms */}
                    <div className="pt-6 border-t border-slate-100">
                        <h3 className="text-xs font-semibold uppercase text-slate-500 tracking-wider mb-3">Joined Rooms</h3>
                        <nav className="space-y-2">
                            {joinedRoomsMock.map(room => (
                                <Link key={room.id} href={`/course/${room.id}`} className="flex items-center justify-between p-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200">
                                    <span className="truncate">{room.name}</span>
                                    <Badge tone="accent" className="ml-2 py-0.5 px-2 text-xs">{room.active} active</Badge>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">Discover Course Rooms</h2>
                            <p className="text-slate-600 font-light">Find and join course communities at your university, sorted by **Popularity**.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Filter Dropdowns - Taller and cleaner */}
                            <select value={courseFilter} onChange={(e)=>setCourseFilter(e.target.value)} className="h-11 px-4 bg-white border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/50 transition">
                                <option value="all">All Departments</option>
                                <option value="computer science">Computer Science</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="economics">Economics</option>
                                <option value="philosophy">Philosophy</option>
                            </select>
                            <select value={yearFilter} onChange={(e)=>setYearFilter(e.target.value)} className="h-11 px-4 bg-white border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/50 transition">
                                <option value="all">All Years</option>
                                <option value="1">Year 1</option>
                                <option value="2">Year 2</option>
                                <option value="3">Year 3</option>
                                <option value="4">Year 4</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filtered.map(course => (
                            <div key={course.id} className="group transition hover:scale-[1.01]">
                                <Link href={`/course/${course.id}`} className="block bg-white border border-slate-100 rounded-2xl p-6 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/70 transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-4 h-4 rounded-full ${course.color} shadow-sm`} />
                                        <div className="flex items-center space-x-2">
                                            <Badge tone="accent" className="text-xs font-semibold">{course.popularity}% POPULAR</Badge>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-xl mb-1">{course.name}</h3>
                                    <p className="text-slate-500 text-sm mb-4">{course.code} • {course.department}</p>
                                    <p className="text-slate-700 text-sm mb-5 font-light line-clamp-2">{course.description}</p>

                                    <div className="flex items-center justify-between text-sm text-slate-600 pt-4 border-t border-slate-50/50">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <Users size={16} className="text-emerald-500 mr-1"/> {course.currentStudents}
                                            </span>
                                            <span className="flex items-center">
                                                <GraduationCap size={16} className="text-blue-500 mr-1"/> {course.alumni}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1 font-semibold text-slate-800">
                                            <span>⭐</span><span>{course.difficulty}/5</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}