'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, TrendingUp, Users, Clock, Star, ChevronRight, BookOpen, Hash, X } from 'lucide-react';
import { allCourses } from '@/lib/data';

// Mock joined courses for demonstration
const joinedCourses = [
    { id: 'cs2383', name: 'Data Structures', code: 'CS2383', lastActive: '2 hours ago', unread: 3 },
    { id: 'maac3021', name: 'Culture Matters', code: 'MAAC3021', lastActive: '1 day ago', unread: 0 },
    { id: 'math2003', name: 'Calculus III', code: 'MATH2003', lastActive: '3 days ago', unread: 0 }
];

export default function DiscoverPage() {
    const [departmentFilter, setDepartmentFilter] = useState<string>('all');
    const [yearFilter, setYearFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'popularity' | 'difficulty' | 'students'>('popularity');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let courses = allCourses;

        // Search filter
        if (searchQuery) {
            courses = courses.filter(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.professor.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Department filter
        if (departmentFilter !== 'all') {
            courses = courses.filter(c => c.department.toLowerCase() === departmentFilter.toLowerCase());
        }

        // Year filter
        if (yearFilter !== 'all') {
            courses = courses.filter(c => c.year === parseInt(yearFilter, 10));
        }

        // Sort
        return courses.sort((a, b) => {
            switch (sortBy) {
                case 'popularity':
                    return b.popularity - a.popularity;
                case 'difficulty':
                    return a.difficulty - b.difficulty;
                case 'students':
                    return b.currentStudents - a.currentStudents;
                default:
                    return 0;
            }
        });
    }, [searchQuery, departmentFilter, yearFilter, sortBy]);

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar - Joined Rooms */}
            <div className="w-80 border-r border-black/5 flex flex-col h-screen sticky top-0">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-black/5">
                    <Link href="/" className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                            <BookOpen className="text-white" size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-xl font-medium text-black">GroupLearn</span>
                    </Link>

                    {/* User info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full" />
                            <div>
                                <p className="text-sm font-medium text-black">Wale A.</p>
                                <p className="text-xs text-black/50">UNB Student</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Joined Rooms */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <h3 className="text-xs font-medium text-black/40 uppercase tracking-wider mb-3">Your Rooms</h3>
                        <div className="space-y-1">
                            {joinedCourses.map(course => (
                                <Link
                                    key={course.id}
                                    href={`/course/${course.id}?joined=true`}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-black/[0.02] transition-colors duration-200 group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60" />
                                        <div>
                                            <p className="text-sm font-medium text-black group-hover:text-black/80">
                                                {course.code}
                                            </p>
                                            <p className="text-xs text-black/40">{course.lastActive}</p>
                                        </div>
                                    </div>
                                    {course.unread > 0 && (
                                        <span className="px-2 py-0.5 bg-black text-white text-xs rounded-full">
                                            {course.unread}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-black/5">
                        <Link
                            href="/discover"
                            className="flex items-center justify-center space-x-2 py-3 text-sm text-black/50 hover:text-black transition-colors duration-200"
                        >
                            <Search size={16} />
                            <span>Discover more courses</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-black/5 z-40">
                    <div className="p-6">
                        {/* Title and filters toggle */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-light text-black tracking-tight">Discover Courses</h1>
                                <p className="text-black/50 mt-1">Find your next learning community</p>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-2 border border-black/10 rounded-full hover:border-black/20 transition-colors duration-200"
                            >
                                <Filter size={16} />
                                <span className="text-sm font-medium">Filters</span>
                                {(departmentFilter !== 'all' || yearFilter !== 'all') && (
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                )}
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses, professors, or topics..."
                                className="w-full pl-12 pr-4 py-3 bg-black/[0.02] border border-black/5 rounded-2xl text-black placeholder-black/40 focus:outline-none focus:border-black/10 transition-all duration-200"
                            />
                        </div>

                        {/* Filter panel */}
                        {showFilters && (
                            <div className="mt-4 p-4 bg-black/[0.02] rounded-2xl border border-black/5">
                                <div className="flex flex-wrap gap-4">
                                    {/* Department filter */}
                                    <select
                                        value={departmentFilter}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                        className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-black/20 transition-colors duration-200"
                                    >
                                        <option value="all">All Departments</option>
                                        <option value="computer science">Computer Science</option>
                                        <option value="mathematics">Mathematics</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="economics">Economics</option>
                                        <option value="philosophy">Philosophy</option>
                                    </select>

                                    {/* Year filter */}
                                    <select
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                        className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-black/20 transition-colors duration-200"
                                    >
                                        <option value="all">All Years</option>
                                        <option value="1">First Year</option>
                                        <option value="2">Second Year</option>
                                        <option value="3">Third Year</option>
                                        <option value="4">Fourth Year</option>
                                    </select>

                                    {/* Sort by */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-black/20 transition-colors duration-200"
                                    >
                                        <option value="popularity">Most Popular</option>
                                        <option value="students">Most Active</option>
                                        <option value="difficulty">Easiest First</option>
                                    </select>

                                    {/* Clear filters */}
                                    {(departmentFilter !== 'all' || yearFilter !== 'all' || searchQuery) && (
                                        <button
                                            onClick={() => {
                                                setDepartmentFilter('all');
                                                setYearFilter('all');
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center space-x-1 px-4 py-2 text-sm text-black/50 hover:text-black transition-colors duration-200"
                                        >
                                            <X size={14} />
                                            <span>Clear all</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Results count */}
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm text-black/50">
                                {filtered.length} courses found
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-black/50">
                                <span className="flex items-center space-x-1">
                                    <TrendingUp size={14} />
                                    <span>Trending</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <Clock size={14} />
                                    <span>Recently active</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map(course => (
                            <Link
                                key={course.id}
                                href={`/course/${course.id}`}
                                className="group block"
                            >
                                <div className="h-full bg-white border border-black/5 rounded-2xl p-6 hover:border-black/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${course.color}`} />
                                            <span className="text-xs font-medium text-black/40 uppercase tracking-wider">
                                                {course.department}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-xs text-black/40">
                                            <Star size={12} className="fill-current" />
                                            <span>{course.difficulty}/5</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-medium text-black mb-1 group-hover:text-black/80 transition-colors">
                                        {course.name}
                                    </h3>
                                    <p className="text-sm text-black/50 mb-3">{course.code} • {course.professor}</p>
                                    <p className="text-sm text-black/60 mb-4 line-clamp-2">{course.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-black/[0.03] text-xs text-black/60 rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                                        <div className="flex items-center space-x-3 text-xs text-black/50">
                                            <span className="flex items-center space-x-1">
                                                <Users size={12} />
                                                <span>{course.currentStudents + course.alumni}</span>
                                            </span>
                                            <span className="flex items-center space-x-1">
                                                <TrendingUp size={12} />
                                                <span>{course.popularity}%</span>
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-black/20 group-hover:text-black/40 group-hover:translate-x-1 transition-all duration-200" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mb-4">
                                <Search className="text-black/20" size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-black/80 mb-2">No courses found</h3>
                            <p className="text-sm text-black/40 text-center max-w-sm">
                                Try adjusting your filters or search query to find more courses
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}