import React, { useState } from 'react';
import {
    BookOpen,
    Users,
    Star,
    ChevronLeft,
    MessageSquare,
    Lightbulb,
    Award,
    Shield,
    UserPlus,
    Send,
    TrendingUp,
    CheckCircle,
    Pin
} from 'lucide-react';
import { Course } from '@/lib/types';

interface CourseShellProps {
    course: Course;
    joined?: boolean;
}

const mockPosts = [
    {
        id: 1,
        type: 'guide',
        title: 'How I survived MAAC 3021: A comprehensive strategy',
        author: 'Sarah Kim',
        role: 'alumni',
        category: 'Strategy',
        content:
            "After completing this course last semester, here are my top tips for managing the workload effectively...",
        replies: 8,
        upvotes: 89,
        timeAgo: '1d ago',
        pinned: true
    },
    {
        id: 2,
        type: 'question',
        title: 'What are the best resources for dynamic programming?',
        author: 'Alex Chen',
        role: 'student',
        category: 'Resources',
        content:
            "I'm struggling with DP concepts. Any YouTube channels or practice sites you'd recommend?",
        replies: 12,
        upvotes: 24,
        timeAgo: '2h ago',
        answered: true
    },
    {
        id: 3,
        type: 'question',
        title: 'Typical workload for midterm preparation?',
        author: 'Jordan Taylor',
        role: 'student',
        category: 'Exam Strategy',
        content:
            'How many hours should I dedicate to studying for the midterm? Any specific topics to focus on?',
        replies: 15,
        upvotes: 31,
        timeAgo: '3h ago',
        answered: false
    }
];

export default function CourseShell({ course, joined }: CourseShellProps) {
    const [hasJoined, setHasJoined] = useState(!!joined);
    const [message, setMessage] = useState('');

    // A small fallback for UI previews if the course prop misses some fields
    const mockCourse = {
        code: course?.code ?? 'MAAC 3021',
        name: course?.name ?? 'Advanced Algorithms',
        department: course?.department ?? 'Computer Science',
        year: (course as any)?.year ?? 3,
        professor: course?.professor ?? 'Dr. Sarah Chen',
        description:
            course?.description ??
            'Deep dive into algorithm design and analysis. Covers dynamic programming, greedy algorithms, and NP-completeness.',
        currentStudents: (course as any)?.currentStudents ?? 45,
        alumni: (course as any)?.alumni ?? 180,
        prospective: (course as any)?.prospective ?? 89,
        difficulty: (course as any)?.difficulty ?? 4,
        popularity: (course as any)?.popularity ?? 94,
        color: 'bg-blue-500'
    };

    return (
        <div className="h-screen bg-white flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-gray-50/30 via-white to-white border-r border-gray-200/60 flex flex-col relative">
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(64, 64, 64) 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }}
                />
                <div className="p-6 border-b border-gray-200/60 relative">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group">
                        <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm font-medium">Back to discover</span>
                    </button>

                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gray-800 rounded-xl blur-md opacity-25" />
                            <div className="relative w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-800/25">
                                <BookOpen className="text-white" size={17} strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Kampus</span>
                    </div>
                </div>

                {/* Course Info */}
                <div className="p-6 border-b border-gray-200/60 relative">
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 ${mockCourse.color} rounded-full shadow-sm`} />
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {mockCourse.department}
            </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{mockCourse.code}</h2>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{mockCourse.name}</p>

                    <div className="space-y-2.5 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Professor</span>
                            <span className="font-medium text-gray-900">{mockCourse.professor}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Difficulty</span>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        className={i < mockCourse.difficulty ? 'fill-gray-700 text-gray-700' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Stats */}
                <div className="flex-1 overflow-y-auto p-6 relative">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Community</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Users size={14} className="text-gray-700" />
                                </div>
                                <span className="text-gray-700">Current Students</span>
                            </div>
                            <span className="font-semibold text-gray-900">{mockCourse.currentStudents}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Award size={14} className="text-gray-700" />
                                </div>
                                <span className="text-gray-700">Alumni</span>
                            </div>
                            <span className="font-semibold text-gray-900">{mockCourse.alumni}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp size={14} className="text-gray-700" />
                                </div>
                                <span className="text-gray-700">Prospective</span>
                            </div>
                            <span className="font-semibold text-gray-900">{mockCourse.prospective}</span>
                        </div>
                    </div>

                    {hasJoined && (
                        <div className="mt-6 p-4 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl border border-gray-300/40 shadow-sm">
                            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Quick Access</h4>
                            <div className="space-y-2">
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all">
                                    📄 Course Syllabus
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all">
                                    ⏰ Office Hours
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all">
                                    👥 Study Groups
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 px-6 py-4 shadow-sm relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{mockCourse.name}</h1>
                            <p className="text-gray-600 leading-relaxed">{mockCourse.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/40 rounded-lg text-sm shadow-sm">
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </div>
                                <span className="text-green-700 font-medium">{mockCourse.currentStudents} online</span>
                            </div>
                            {!hasJoined && (
                                <button
                                    onClick={() => setHasJoined(true)}
                                    className="px-6 py-2.5 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-lg font-medium transition-all shadow-lg shadow-gray-800/25"
                                >
                                    Join Room
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                {!hasJoined ? (
                    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50/50 to-white relative">
                        <div className="max-w-2xl text-center relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-800/25 relative">
                                <UserPlus className="text-white" size={36} strokeWidth={2} />
                                <div className="absolute inset-0 bg-gray-700 rounded-2xl blur-xl opacity-30 animate-pulse" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Join this course room</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
                                Connect with <span className="font-semibold text-gray-900">{mockCourse.currentStudents}</span> current
                                students and <span className="font-semibold text-gray-900">{mockCourse.alumni}</span> alumni. Get study
                                strategies, ask questions, and learn from those who've been through it.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                {[
                                    {
                                        icon: MessageSquare,
                                        title: 'Ask Questions',
                                        desc: 'Get help from peers and alumni',
                                        gradient: 'from-gray-100 to-gray-200/50',
                                        iconColor: 'text-gray-700'
                                    },
                                    {
                                        icon: Lightbulb,
                                        title: 'Share Insights',
                                        desc: 'Contribute your strategies',
                                        gradient: 'from-gray-100 to-gray-200/50',
                                        iconColor: 'text-gray-700'
                                    },
                                    {
                                        icon: Shield,
                                        title: 'Stay Ethical',
                                        desc: 'Strategies, not solutions',
                                        gradient: 'from-green-100 to-emerald-200/50',
                                        iconColor: 'text-green-700'
                                    }
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className={`p-5 bg-gradient-to-br ${item.gradient} rounded-xl border border-gray-200/40 text-left shadow-sm`}>
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                                                <Icon className={item.iconColor} size={20} strokeWidth={2} />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h4>
                                            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setHasJoined(true)}
                                className="px-8 py-4 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-xl font-semibold transition-all shadow-xl shadow-gray-800/25 hover:shadow-2xl hover:shadow-gray-800/35 hover:scale-105"
                            >
                                Join Course Room
                            </button>
                            <p className="text-xs text-gray-500 mt-4">Free to join • Academic integrity protected</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/30 to-white">
                        <div className="max-w-4xl mx-auto space-y-4">
                            {mockPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className={`bg-white rounded-xl p-6 border transition-all hover:shadow-lg ${
                                        post.pinned
                                            ? 'border-gray-300 bg-gradient-to-br from-gray-50/50 to-white shadow-md shadow-gray-200/20'
                                            : 'border-gray-200/60 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md ${
                                                    post.role === 'alumni' ? 'bg-gradient-to-br from-gray-600 to-gray-800' : 'bg-gradient-to-br from-gray-400 to-gray-600'
                                                }`}
                                            >
                                                {post.author.split(' ').map((n) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900">{post.author}</p>
                                                    <span className="px-2 py-0.5 text-xs rounded-full font-medium shadow-sm bg-gray-100 text-gray-700">
                            {post.role}
                          </span>
                                                    {post.pinned && <Pin size={14} className="text-gray-600" />}
                                                </div>
                                                <p className="text-xs text-gray-500">{post.timeAgo}</p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg font-medium shadow-sm">
                      {post.category}
                    </span>
                                    </div>

                                    <h4 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{post.title}</h4>
                                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                                                <TrendingUp size={14} />
                                                <span className="font-medium">{post.upvotes}</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                                                <MessageSquare size={14} />
                                                <span className="font-medium">{post.replies} replies</span>
                                            </button>
                                        </div>
                                        {post.answered && (
                                            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                                <CheckCircle size={14} />
                                                <span>Answered</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message input */}
                        <div className="max-w-4xl mx-auto mt-6 sticky bottom-6">
                            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-xl border border-gray-200/60 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ask a question or share a tip..."
                                        className="flex-1 px-4 py-3 bg-gray-50 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500/20 transition-all"
                                    />
                                    <button className="p-3 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-lg transition-all shadow-lg shadow-gray-800/25">
                                        <Send size={18} strokeWidth={2} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                                    <Shield size={12} />
                                    <span>Share strategies, not solutions</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
