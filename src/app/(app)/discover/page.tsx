'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { allCourses } from '@/lib/data';

export default function DiscoverPage(){
    const [courseFilter, setCourseFilter] = useState<'all'|string>('all');
    const [yearFilter, setYearFilter] = useState<'all'|string>('all');
    const filtered = useMemo(() =>
            allCourses
                .filter(c => courseFilter==='all' || c.department.toLowerCase()===courseFilter.toLowerCase())
                .filter(c => yearFilter==='all' || c.year===parseInt(yearFilter as string, 10))
                .sort((a,b)=>b.popularity-a.popularity),
        [courseFilter, yearFilter]
    );



    return (
        <div className="h-screen bg-gradient-to-b from-white to-slate-50 flex">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-slate-200/80 shadow-sm flex flex-col">
                <div className="p-6 border-b border-slate-200/80">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm"><BookOpen className="text-white" size={20}/></div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">GroupLearn</h1>
                            <p className="text-sm text-slate-600">Discover</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Main */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b border-slate-200/80 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Discover Courses</h2>
                            <p className="text-slate-600">Find and join course communities at your university</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select value={courseFilter} onChange={(e)=>setCourseFilter(e.target.value)} className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/50">
                                <option value="all">All Departments</option>
                                <option value="computer science">Computer Science</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="economics">Economics</option>
                                <option value="philosophy">Philosophy</option>
                            </select>
                            <select value={yearFilter} onChange={(e)=>setYearFilter(e.target.value)} className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/50">
                                <option value="all">All Years</option>
                                <option value="1">Year 1</option>
                                <option value="2">Year 2</option>
                                <option value="3">Year 3</option>
                                <option value="4">Year 4</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(course => (
                            <div key={course.id} className="group hover:scale-[1.02] transition">
                                <Link href={`/course/${course.id}`} className="block bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-4 h-4 rounded-full ${course.color} shadow-sm`} />
                                        <div className="flex items-center space-x-2">
                                            <Badge tone="accent">{course.popularity}% popularity</Badge>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">{course.name}</h3>
                                    <p className="text-slate-600 text-sm mb-3">{course.code} • {course.professor}</p>
                                    <p className="text-slate-700 text-sm mb-4">{course.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.tags.map((t,i)=>(<Badge key={i} tone="neutral">{t}</Badge>))}
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-600">
                                        <div className="flex items-center space-x-3"><span>👩‍🎓 {course.currentStudents}</span><span>🎓 {course.alumni}</span><span>👀 {course.prospective}</span></div>
                                        <div className="flex items-center space-x-1"><span>⭐</span><span>{course.difficulty}/5</span></div>
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