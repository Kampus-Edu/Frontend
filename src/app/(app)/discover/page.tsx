'use client';

import {useState, useMemo, useEffect} from 'react';
import { BookOpen, Users, TrendingUp, Hash, Search, Filter, X, Star, ChevronDown } from 'lucide-react';
import {AuthUser, getAuthUser} from "@/lib/api";
import { useRequireAuth } from "@/lib/useRequireAuth";




const allCourses = [
    {
        id: 'maac3021',
        code: 'MAAC 3021',
        name: 'Advanced Algorithms',
        department: 'Computer Science',
        year: 3,
        professor: 'Dr. Sarah Chen',
        description: 'Deep dive into algorithm design and analysis. Covers dynamic programming, greedy algorithms, and NP-completeness.',
        currentStudents: 45,
        alumni: 180,
        prospective: 89,
        popularity: 94,
        difficulty: 4,
        color: 'bg-blue-500',
        tags: ['Theory', 'Problem Solving', 'Challenging']
    },
    {
        id: 'cs2110',
        code: 'CS 2110',
        name: 'Data Structures',
        department: 'Computer Science',
        year: 2,
        professor: 'Prof. Michael Torres',
        description: 'Fundamental data structures including trees, graphs, and hash tables. Essential for technical interviews.',
        currentStudents: 78,
        alumni: 320,
        prospective: 156,
        popularity: 98,
        difficulty: 3,
        color: 'bg-emerald-500',
        tags: ['Core', 'Practical', 'Interview Prep']
    },
    {
        id: 'math2421',
        code: 'MATH 2421',
        name: 'Linear Algebra',
        department: 'Mathematics',
        year: 2,
        professor: 'Dr. James Wilson',
        description: 'Vector spaces, matrices, eigenvalues, and linear transformations with applications to machine learning.',
        currentStudents: 62,
        alumni: 245,
        prospective: 103,
        popularity: 91,
        difficulty: 4,
        color: 'bg-gray-600',
        tags: ['Theory', 'ML Foundation']
    }
];

const joinedCourses = [
    { id: 'cs2383', name: 'Data Structures', code: 'CS2383', lastActive: '2 hours ago', unread: 3 },
    { id: 'maac3021', name: 'Culture Matters', code: 'MAAC3021', lastActive: '1 day ago', unread: 0 }
];


export default function DiscoverPage() {
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [yearFilter, setYearFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popularity');
    const [showFilters, setShowFilters] = useState(false);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    useRequireAuth();

    useEffect(() => {
        setAuthUser(getAuthUser());
    }, []);

    const filtered = useMemo(() => {
        let courses = allCourses;

        if (searchQuery) {
            courses = courses.filter(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.professor.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (departmentFilter !== 'all') {
            courses = courses.filter(c => c.department.toLowerCase() === departmentFilter.toLowerCase());
        }

        if (yearFilter !== 'all') {
            courses = courses.filter(c => c.year === parseInt(yearFilter, 10));
        }

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

    if(!authUser) return null;

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <div className="w-80 bg-gradient-to-b from-gray-50/30 via-white to-white border-r border-gray-200/60 flex flex-col h-screen sticky top-0">
                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(64, 64, 64) 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }}
                />

                {/* Logo & User */}
                <div className="p-6 border-b border-gray-200/60 relative">
                    <div className="flex items-center gap-2.5 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gray-800 rounded-xl blur-md opacity-25" />
                            <div className="relative w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-800/25">
                                <BookOpen className="text-white" size={17} strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Kampus</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-md" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {authUser
                                        ? `${authUser.firstName ?? ""} ${authUser.lastName ?? ""}`.trim() ||
                                        authUser.username
                                        : "Student"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {authUser?.email ?? "UNB Student"}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Joined Rooms */}
                <div className="flex-1 overflow-y-auto p-4 relative">
                    <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Rooms</h3>
                        <span className="text-xs font-medium text-gray-400">{joinedCourses.length}</span>
                    </div>

                    <div className="space-y-1">
                        {joinedCourses.map(course => (
                            <button
                                key={course.id}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full" />
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                                            {course.code}
                                        </p>
                                        <p className="text-xs text-gray-500">{course.lastActive}</p>
                                    </div>
                                </div>
                                {course.unread > 0 && (
                                    <span className="px-2 py-0.5 bg-gray-800 text-white text-xs font-semibold rounded-full shadow-sm">
                                        {course.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Activity Stats */}
                    <div className="mt-6 p-4 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl border border-gray-300/40 shadow-sm">
                        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Your Activity</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Questions</span>
                                <span className="font-semibold text-gray-800">12</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Answers</span>
                                <span className="font-semibold text-gray-800">28</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Helpful votes</span>
                                <span className="font-semibold text-gray-800">156</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200/60 relative">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <Search size={16} />
                        <span>Discover more courses</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 z-40 shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Discover Courses</h1>
                                <p className="text-gray-600 mt-1">Find your next learning community</p>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                    showFilters
                                        ? 'bg-gray-800 text-white shadow-lg shadow-gray-800/25'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                }`}
                            >
                                <Filter size={16} />
                                <span>Filters</span>
                                {(departmentFilter !== 'all' || yearFilter !== 'all') && !showFilters && (
                                    <span className="w-2 h-2 bg-gray-600 rounded-full" />
                                )}
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses, professors, or topics..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 focus:bg-white transition-all"
                            />
                        </div>

                        {/* Filter Panel */}
                        {showFilters && (
                            <div className="mt-4 p-4 bg-gradient-to-br from-gray-100 to-gray-50/30 rounded-xl border border-gray-200/40">
                                <div className="flex flex-wrap gap-3">
                                    <select
                                        value={departmentFilter}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm"
                                    >
                                        <option value="all">All Departments</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Physics">Physics</option>
                                    </select>

                                    <select
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm"
                                    >
                                        <option value="all">All Years</option>
                                        <option value="1">First Year</option>
                                        <option value="2">Second Year</option>
                                        <option value="3">Third Year</option>
                                        <option value="4">Fourth Year</option>
                                    </select>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm"
                                    >
                                        <option value="popularity">Most Popular</option>
                                        <option value="students">Most Active</option>
                                        <option value="difficulty">Easiest First</option>
                                    </select>

                                    {(departmentFilter !== 'all' || yearFilter !== 'all' || searchQuery) && (
                                        <button
                                            onClick={() => {
                                                setDepartmentFilter('all');
                                                setYearFilter('all');
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
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
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-900">{filtered.length}</span> courses found
                            </p>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200/40 rounded-lg">
                                <TrendingUp size={14} className="text-gray-700" />
                                <span className="text-sm text-gray-700 font-medium">Trending</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/30 to-white">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map(course => (
                            <button
                                key={course.id}
                                className="group text-left bg-white border border-gray-200/60 rounded-xl p-6 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${course.color} shadow-sm`} />
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {course.department}
                                        </span>
                                    </div>
                                    <div className="px-2.5 py-1 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300/40 rounded-md shadow-sm">
                                        <span className="text-xs font-semibold text-gray-700">{course.popularity}%</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                                    {course.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {course.code} • {course.professor}
                                </p>
                                <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                                    {course.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {course.tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200/60 text-sm">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Users size={14} />
                                            <span className="font-medium">{course.currentStudents + course.alumni}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <TrendingUp size={14} />
                                            <span className="font-medium">{course.popularity}%</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Star size={14} className="fill-current" />
                                        <span className="font-medium">{course.difficulty}/5</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                <Search className="text-gray-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                            <p className="text-sm text-gray-600 text-center max-w-sm">
                                Try adjusting your filters or search query
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}