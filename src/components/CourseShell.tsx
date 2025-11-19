'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Users, Star, Clock, TrendingUp, MessageSquare,
    BookOpen, Hash, Pin, Shield, ChevronRight, Info, Send,
    FileText, Lightbulb, AlertCircle, CheckCircle
} from 'lucide-react';

interface Course {
    id: string;
    name: string;
    code: string;
    professor: string;
    department: string;
    description: string;
    currentStudents: number;
    alumni: number;
    prospective: number;
    difficulty: number;
    popularity: number;
    tags: string[];
    color: string;
    year: number;
}

interface CourseShellProps {
    course: Course;
    joined?: boolean;
}

const mockPosts = [
    {
        id: 1,
        type: 'question',
        category: 'exam',
        title: "How should I prepare for the midterm?",
        author: "Anonymous",
        role: "student",
        content: "I heard the midterm is pretty challenging. What topics should I focus on?",
        replies: 12,
        upvotes: 34,
        timestamp: "2 hours ago",
        answered: true
    },
    {
        id: 2,
        type: 'guide',
        category: 'strategy',
        title: "My approach to succeeding in this course",
        author: "Sarah Chen",
        role: "alumni",
        content: "After taking this course last semester, here are my top tips for managing the workload...",
        replies: 8,
        upvotes: 89,
        timestamp: "1 day ago",
        pinned: true
    },
    {
        id: 3,
        type: 'question',
        category: 'resources',
        title: "Best supplementary materials?",
        author: "Jordan Kim",
        role: "student",
        content: "The textbook isn't clicking for me. Any YouTube channels or online resources you'd recommend?",
        replies: 15,
        upvotes: 23,
        timestamp: "3 days ago",
        answered: false
    }
];

export default function CourseShell({ course, joined = false }: CourseShellProps) {
    const [isJoined, setIsJoined] = useState(joined);
    const [activeTab, setActiveTab] = useState<'feed' | 'guides' | 'qa' | 'members'>('feed');
    const [message, setMessage] = useState('');

    const handleJoin = () => {
        setIsJoined(true);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-black/5 sticky top-0 bg-white/95 backdrop-blur-xl z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/discover"
                                className="flex items-center text-black/50 hover:text-black transition-colors duration-200 group"
                            >
                                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                                <span className="text-sm font-medium">Back</span>
                            </Link>

                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${course.color}`} />
                                <div>
                                    <h1 className="text-xl font-medium text-black">{course.code}</h1>
                                    <p className="text-sm text-black/50">{course.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Stats */}
                            <div className="flex items-center space-x-6 text-sm text-black/50">
                                <span className="flex items-center space-x-1">
                                    <Users size={14} />
                                    <span>{course.currentStudents + course.alumni} members</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span>{course.currentStudents} online</span>
                                </span>
                            </div>

                            {!isJoined && (
                                <button
                                    onClick={handleJoin}
                                    className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-all duration-200"
                                >
                                    Join Room
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {!isJoined ? (
                            /* Pre-join Preview */
                            <div className="space-y-6">
                                {/* Course Info Card */}
                                <div className="bg-gradient-to-br from-black/[0.02] to-transparent rounded-2xl p-8 border border-black/5">
                                    <h2 className="text-2xl font-light text-black mb-4">{course.name}</h2>
                                    <p className="text-black/60 mb-6 leading-relaxed">{course.description}</p>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <p className="text-sm text-black/40 mb-1">Professor</p>
                                            <p className="text-black font-medium">{course.professor}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-black/40 mb-1">Department</p>
                                            <p className="text-black font-medium">{course.department}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-black/40 mb-1">Difficulty</p>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < course.difficulty ? 'fill-black text-black' : 'text-black/20'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-black/40 mb-1">Year Level</p>
                                            <p className="text-black font-medium">Year {course.year}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {course.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-white border border-black/10 rounded-full text-sm text-black/70">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleJoin}
                                        className="w-full py-4 bg-black text-white rounded-2xl font-medium hover:bg-black/90 transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Users size={18} />
                                        <span>Join Course Room</span>
                                    </button>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-black/5">
                                    <h3 className="text-lg font-medium text-black mb-4">What you'll find inside</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <MessageSquare className="text-emerald-600 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-black font-medium">Active Q&A</p>
                                                <p className="text-sm text-black/50">Get answers from students and alumni</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <FileText className="text-blue-600 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-black font-medium">Study Guides</p>
                                                <p className="text-sm text-black/50">Curated tips from successful students</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Shield className="text-violet-600 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-black font-medium">Academic Integrity</p>
                                                <p className="text-sm text-black/50">Strategy sharing only, no solutions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Community Guidelines */}
                                <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/30">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <AlertCircle className="text-amber-600" size={20} />
                                        <h3 className="text-black font-medium">Community Guidelines</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-black/60">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-amber-600 mt-0.5">•</span>
                                            <span>Share strategies and study tips, not graded solutions</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-amber-600 mt-0.5">•</span>
                                            <span>Be respectful and supportive to all members</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-amber-600 mt-0.5">•</span>
                                            <span>Use the anonymous option if needed, but responsibly</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            /* Joined View - Course Feed */
                            <div className="space-y-6">
                                {/* Tabs */}
                                <div className="flex items-center space-x-1 p-1 bg-black/[0.02] rounded-xl">
                                    {(['feed', 'guides', 'qa', 'members'] as const).map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                activeTab === tab
                                                    ? 'bg-white text-black shadow-sm'
                                                    : 'text-black/50 hover:text-black'
                                            }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {/* Posts Feed */}
                                <div className="space-y-4">
                                    {mockPosts.map(post => (
                                        <div
                                            key={post.id}
                                            className={`bg-white rounded-2xl p-6 border transition-all duration-200 hover:border-black/10 ${
                                                post.pinned ? 'border-emerald-200/50 bg-emerald-50/30' : 'border-black/5'
                                            }`}
                                        >
                                            {/* Post Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                                        post.role === 'alumni' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                                                    }`}>
                                                        {post.author === 'Anonymous' ? '?' : post.author.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <p className="font-medium text-black">{post.author}</p>
                                                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                                                                post.role === 'alumni'
                                                                    ? 'bg-emerald-100 text-emerald-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                                {post.role}
                                                            </span>
                                                            {post.pinned && <Pin className="text-emerald-600" size={14} />}
                                                        </div>
                                                        <p className="text-xs text-black/40">{post.timestamp}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 text-xs rounded-lg ${
                                                        post.category === 'exam' ? 'bg-red-100 text-red-700' :
                                                            post.category === 'strategy' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-violet-100 text-violet-700'
                                                    }`}>
                                                        {post.category}
                                                    </span>
                                                    {post.answered && <CheckCircle className="text-green-500" size={16} />}
                                                </div>
                                            </div>

                                            {/* Post Content */}
                                            <h4 className="text-lg font-medium text-black mb-2">{post.title}</h4>
                                            <p className="text-black/60 mb-4">{post.content}</p>

                                            {/* Post Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-black/5">
                                                <div className="flex items-center space-x-4">
                                                    <button className="flex items-center space-x-1 text-sm text-black/50 hover:text-black transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                        <span>{post.upvotes}</span>
                                                    </button>
                                                    <button className="flex items-center space-x-1 text-sm text-black/50 hover:text-black transition-colors">
                                                        <MessageSquare size={14} />
                                                        <span>{post.replies} replies</span>
                                                    </button>
                                                </div>
                                                <button className="text-sm text-black/50 hover:text-black transition-colors">
                                                    Share
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-black/5">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Ask a question or share a tip..."
                                            className="flex-1 px-4 py-3 bg-black/[0.02] rounded-xl text-black placeholder-black/40 focus:outline-none focus:bg-black/[0.03] transition-colors"
                                        />
                                        <button className="p-3 bg-black text-white rounded-xl hover:bg-black/90 transition-colors">
                                            <Send size={18} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-black/40 mt-2">
                                        Remember: Share strategies, not solutions
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Member Stats */}
                        <div className="bg-white rounded-2xl p-6 border border-black/5">
                            <h3 className="text-black font-medium mb-4">Community</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-black/50">Current Students</span>
                                    <span className="text-black font-medium">{course.currentStudents}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-black/50">Alumni</span>
                                    <span className="text-black font-medium">{course.alumni}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-black/50">Prospective</span>
                                    <span className="text-black font-medium">{course.prospective}</span>
                                </div>
                            </div>
                        </div>

                        {/* Course Insights */}
                        <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-100/50">
                            <div className="flex items-center space-x-2 mb-4">
                                <Lightbulb className="text-emerald-600" size={20} />
                                <h3 className="text-black font-medium">Course Insights</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-black/50 mb-1">Average time commitment</p>
                                    <p className="text-black font-medium">8-10 hours/week</p>
                                </div>
                                <div>
                                    <p className="text-black/50 mb-1">Most challenging topic</p>
                                    <p className="text-black font-medium">Recursion & Trees</p>
                                </div>
                                <div>
                                    <p className="text-black/50 mb-1">Best resource</p>
                                    <p className="text-black font-medium">MIT OCW lectures</p>
                                </div>
                            </div>
                        </div>

                        {isJoined && (
                            <div className="bg-white rounded-2xl p-6 border border-black/5">
                                <h3 className="text-black font-medium mb-4">Quick Links</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-3 py-2 text-sm text-black/60 hover:text-black hover:bg-black/[0.02] rounded-lg transition-colors duration-200 flex items-center justify-between group">
                                        <span>Course Syllabus</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-black/60 hover:text-black hover:bg-black/[0.02] rounded-lg transition-colors duration-200 flex items-center justify-between group">
                                        <span>Office Hours</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-black/60 hover:text-black hover:bg-black/[0.02] rounded-lg transition-colors duration-200 flex items-center justify-between group">
                                        <span>Study Groups</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}