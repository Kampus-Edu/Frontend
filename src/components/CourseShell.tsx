'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MessageSquare, BarChart3, GraduationCap, FileText, Users, Send,
    Paperclip, Smile, BookOpen, Plus, Search, Settings, Bell, X,
    CheckCircle, Clock, TrendingUp, AlertCircle, Star, Download, MessageCircle,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { allCourses, previewMessages, fullMessages } from '@/lib/data';
import type { Course } from '@/lib/types';

type Props = {
    course: Course;
    joined: boolean;
};

type UserType = 'all' | 'current' | 'alumni' | 'prospective';
type Tab = 'discussion' | 'course-intel' | 'mentorship' | 'resources' | 'sessions';

export default function CourseShell({ course, joined }: Props) {
    // UI state
    const [activeTab, setActiveTab] = useState<Tab>('discussion');
    const [userType, setUserType] = useState<UserType>('all');
    const [composer, setComposer] = useState('');
    const [showChat, setShowChat] = useState(true);
    const [hasJoined, setHasJoined] = useState(joined);

    // Right-rail chat demo state
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<
        { id: number; user: string; userType: UserType | 'instructor'; message: string; timestamp: string }[]
    >([]);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Demo: online users list (static)
    const onlineUsers = [
        { id: 1, name: 'Sarah Chen', userType: 'current', status: 'online', avatar: '👩‍🎓' },
        { id: 2, name: 'Alex Kim', userType: 'current', status: 'online', avatar: '🧑‍🔬' },
        { id: 3, name: 'Dr. Mike Rodriguez', userType: 'alumni', status: 'online', avatar: '🎓' },
        { id: 4, name: 'Emma Wilson', userType: 'current', status: 'away', avatar: '👩‍💻' },
    ];

    // Demo chat init
    useEffect(() => {
        setChatMessages([
            { id: 1, user: 'Sarah Chen', userType: 'current', message: 'Anyone working on problem 3?', timestamp: '2:31 PM' },
            { id: 2, user: 'Alex Kim', userType: 'current', message: 'Triangle inequality is the key', timestamp: '2:32 PM' },
            { id: 3, user: 'Dr. Mike Rodriguez', userType: 'alumni', message: 'Remember: |a+b| ≤ |a| + |b|', timestamp: '2:33 PM' },
        ]);
    }, []);

    // chat autoscroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, showChat]);

    const handleSendChatMessage = () => {
        if (!chatMessage.trim()) return;
        const now = new Date();
        setChatMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                user: 'You',
                userType: 'current',
                message: chatMessage.trim(),
                timestamp: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            },
        ]);
        setChatMessage('');
    };

    // Messages for the Discussion tab
    const discussionMessages = useMemo(
        () =>
            (hasJoined ? fullMessages : previewMessages).filter(
                (m) => userType === 'all' || m.userType === userType
            ),
        [hasJoined, userType]
    );

    // helpers
    const getUserTypeColor = (type: string) => {
        switch (type) {
            case 'current':
                return 'bg-gray-100 text-gray-700 border border-gray-200/50';
            case 'alumni':
                return 'bg-gradient-to-r from-gray-600 to-gray-800 text-white border border-gray-700/50';
            case 'prospective':
                return 'bg-gray-200 text-gray-800 border border-gray-300/50';
            case 'instructor':
                return 'bg-gray-800 text-white border border-gray-900/50';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200/50';
        }
    };

    const getStatusColor = (status: 'online' | 'away' | 'offline') => {
        switch (status) {
            case 'online':
                return 'bg-green-500';
            case 'away':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="h-screen bg-white flex overflow-hidden">
            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(64, 64, 64) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Sidebar */}
            <div className="w-80 bg-gradient-to-b from-gray-50/30 via-white to-white border-r border-gray-200/60 flex flex-col relative">
                {/* Brand */}
                {/* Brand */}
                <div className="p-6 border-b border-gray-200/60 relative">
                    <Link
                        href="/discover"
                        className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ChevronLeft
                            size={18}
                            className="group-hover:-translate-x-0.5 transition-transform"
                        />
                        <span className="text-sm font-medium">Back to discover</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gray-800 rounded-xl blur-md opacity-25" />
                            <div className="relative w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-800/25">
                                <BookOpen className="text-white" size={17} strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Kampus</span>
                    </Link>
                </div>

                {/* Course Info */}
                <div className="p-6 border-b border-gray-200/60 relative">
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 ${course.color} rounded-full shadow-sm`} />
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {course.department}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{course.code}</h2>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{course.name}</p>

                    <div className="space-y-2.5 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Professor</span>
                            <span className="font-medium text-gray-900">{course.professor}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Difficulty</span>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        className={i < course.difficulty ? 'fill-gray-700 text-gray-700' : 'text-gray-300'}
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
                            <span className="font-semibold text-gray-900">{course.currentStudents}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <GraduationCap size={14} className="text-gray-700" />
                                </div>
                                <span className="text-gray-700">Alumni</span>
                            </div>
                            <span className="font-semibold text-gray-900">{course.alumni}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp size={14} className="text-gray-700" />
                                </div>
                                <span className="text-gray-700">Prospective</span>
                            </div>
                            <span className="font-semibold text-gray-900">{course.prospective}</span>
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

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 px-6 py-4 shadow-sm relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{course.name}</h1>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <Users size={14} />
                                    {course.currentStudents} current
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <GraduationCap size={14} />
                                    {course.alumni} alumni
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <TrendingUp size={14} />
                                    {course.prospective} prospective
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Star size={14} />
                                    {course.difficulty}/5 difficulty
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {hasJoined && (
                                <button
                                    onClick={() => setShowChat((s) => !s)}
                                    className={`p-3 rounded-xl transition-all duration-200 ${
                                        showChat
                                            ? 'bg-gray-200 text-gray-800'
                                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <MessageCircle size={20} />
                                </button>
                            )}
                            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                                <Search size={20} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                                <Bell size={20} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                                <Settings size={20} />
                            </button>
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
                    // Join CTA (keeping the simpler version's design)
                    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50/50 to-white relative">
                        <div className="max-w-2xl text-center relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-800/25 relative">
                                <Users className="text-white" size={36} strokeWidth={2} />
                                <div className="absolute inset-0 bg-gray-700 rounded-2xl blur-xl opacity-30 animate-pulse" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Join this course room</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
                                Connect with <span className="font-semibold text-gray-900">{course.currentStudents}</span> current
                                students and <span className="font-semibold text-gray-900">{course.alumni}</span> alumni. Get study
                                strategies, ask questions, and learn from those who've been through it.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                {[
                                    {
                                        icon: MessageSquare,
                                        title: 'Ask Questions',
                                        desc: 'Get help from peers and alumni',
                                    },
                                    {
                                        icon: BarChart3,
                                        title: 'Share Insights',
                                        desc: 'Contribute your strategies',
                                    },
                                    {
                                        icon: CheckCircle,
                                        title: 'Stay Ethical',
                                        desc: 'Strategies, not solutions',
                                    }
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className="p-5 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl border border-gray-200/40 text-left shadow-sm">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                                                <Icon className="text-gray-700" size={20} strokeWidth={2} />
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
                    <>
                        {/* Tabs */}
                        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 px-6 shadow-sm">
                            <nav className="flex space-x-8">
                                {([
                                    { id: 'discussion', label: 'Discussion', icon: MessageSquare },
                                    { id: 'course-intel', label: 'Course Intel', icon: BarChart3 },
                                    { id: 'mentorship', label: 'Alumni Mentors', icon: GraduationCap },
                                    { id: 'resources', label: 'Resources', icon: FileText },
                                    { id: 'sessions', label: 'Study Sessions', icon: Users },
                                ] as const).map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-3 py-4 px-2 border-b-[3px] font-semibold text-sm transition-all duration-300 ${
                                                activeTab === tab.id
                                                    ? 'border-gray-800 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        >
                                            <Icon size={18} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-hidden">
                            {activeTab === 'discussion' && (
                                <div className="flex flex-col h-full">
                                    {/* Filter */}
                                    <div className="p-6 bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-200/60">
                                        <div className="flex items-center space-x-3 text-sm">
                                            <span className="text-gray-600 font-medium">Viewing:</span>
                                            {(['all','current','alumni','prospective'] as UserType[]).map((ut) => (
                                                <button
                                                    key={ut}
                                                    onClick={() => setUserType(ut)}
                                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                                        userType === ut
                                                            ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-800/25'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                                                    }`}
                                                >
                                                    {ut === 'all' ? 'All Members' : ut[0].toUpperCase() + ut.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white">
                                        {discussionMessages.map((msg) => (
                                            <div key={msg.id} className="group hover:scale-[1.01] transition-all duration-300">
                                                <div className="bg-white rounded-2xl p-6 shadow-md shadow-gray-900/5 border border-gray-200/60 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300">
                                                    <div className="flex space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-xl shadow-md">
                                                                {msg.avatar}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-3">
                                                                <span className="font-bold text-gray-900">{msg.user}</span>
                                                                <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getUserTypeColor(msg.userType)}`}>
                                                                    {msg.year}
                                                                </span>
                                                                <span className="text-xs text-gray-400">{msg.timestamp}</span>
                                                            </div>
                                                            <p className="text-gray-800 mb-4 leading-relaxed">{msg.message}</p>
                                                            <div className="flex items-center space-x-2">
                                                                {msg.reactions.map((r, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-xl text-sm hover:bg-gray-100 hover:scale-105 transition-all duration-200 border border-gray-200/30"
                                                                    >
                                                                        <span className="text-base">{r.emoji}</span>
                                                                        <span className="font-medium text-gray-700">{r.count}</span>
                                                                    </button>
                                                                ))}
                                                                <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200 border border-gray-200/30">
                                                                    <Smile size={16} className="text-gray-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Composer */}
                                    <div className="p-6 bg-white/95 backdrop-blur-xl border-t border-gray-200/60">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    value={composer}
                                                    onChange={(e) => setComposer(e.target.value)}
                                                    placeholder="Share insights, ask questions, help peers..."
                                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200">
                                                        <Paperclip size={18} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200">
                                                        <Smile size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="px-6 py-4 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-xl font-medium transition-all shadow-lg shadow-gray-800/25 flex items-center gap-2">
                                                <Send size={18} />
                                                <span>Send</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'course-intel' && (
                                <div className="p-6 bg-gradient-to-b from-gray-50/30 to-white min-h-full overflow-y-auto">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                                            Course Intelligence
                                        </h2>
                                        <p className="text-gray-600 text-lg">Real insights from {course.alumni} students</p>
                                    </div>

                                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                                        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-3xl font-bold text-gray-900">
                                                        {course.difficulty}/5
                                                    </p>
                                                    <p className="text-sm text-gray-600 font-medium">Difficulty Rating</p>
                                                </div>
                                                <div className="p-3 bg-gray-100 rounded-2xl">
                                                    <AlertCircle className="text-gray-700" size={24} />
                                                </div>
                                            </div>
                                            <div className="mt-3 text-xs text-gray-500">Based on alumni reviews</div>
                                        </div>

                                        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-3xl font-bold text-gray-900">~{course.timeCommitment}h</p>
                                                    <p className="text-sm text-gray-600 font-medium">Hours/Week</p>
                                                </div>
                                                <div className="p-3 bg-gray-100 rounded-2xl">
                                                    <Clock className="text-gray-700" size={24} />
                                                </div>
                                            </div>
                                            <div className="mt-3 text-xs text-gray-500">Avg. time commitment</div>
                                        </div>

                                        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-3xl font-bold text-gray-900">{course.avgGrade}</p>
                                                    <p className="text-sm text-gray-600 font-medium">Average Grade</p>
                                                </div>
                                                <div className="p-3 bg-gray-100 rounded-2xl">
                                                    <TrendingUp className="text-gray-700" size={24} />
                                                </div>
                                            </div>
                                            <div className="mt-3 text-xs text-gray-500">Historical class average</div>
                                        </div>

                                        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-3xl font-bold text-gray-900">{course.popularity}%</p>
                                                    <p className="text-sm text-gray-600 font-medium">Popularity</p>
                                                </div>
                                                <div className="p-3 bg-gray-100 rounded-2xl">
                                                    <Star className="text-gray-700" size={24} />
                                                </div>
                                            </div>
                                            <div className="mt-3 text-xs text-gray-500">Student satisfaction</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'mentorship' && (
                                <div className="p-6 bg-gradient-to-b from-gray-50/30 to-white min-h-full">
                                    <div className="bg-white border border-gray-200/60 rounded-2xl p-8 shadow-md">
                                        <h3 className="font-bold text-gray-900 text-xl mb-2">Alumni Mentorship</h3>
                                        <p className="text-gray-600 mb-4">Connect with students who've mastered this course.</p>
                                        <button className="px-6 py-3 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-xl font-medium transition-all shadow-lg shadow-gray-800/25 flex items-center gap-2">
                                            <Users size={18} />
                                            Request Mentor
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'resources' && (
                                <div className="p-6 bg-gradient-to-b from-gray-50/30 to-white min-h-full">
                                    <div className="bg-white border border-gray-200/60 rounded-2xl p-8 shadow-md">
                                        <h3 className="font-bold text-gray-900 text-xl mb-2">Study Resources</h3>
                                        <p className="text-gray-600 mb-4">Upload and share guides, notes, and videos.</p>
                                        <div className="flex gap-3">
                                            <button className="px-6 py-3 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-xl font-medium transition-all shadow-lg shadow-gray-800/25 flex items-center gap-2">
                                                <Download size={16} />
                                                Browse
                                            </button>
                                            <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-medium transition-all flex items-center gap-2">
                                                <Star size={16} />
                                                Top Rated
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'sessions' && (
                                <div className="p-6 bg-gradient-to-b from-gray-50/30 to-white min-h-full">
                                    <div className="bg-white border border-gray-200/60 rounded-2xl p-8 shadow-md">
                                        <h3 className="font-bold text-gray-900 text-xl mb-2">Study Sessions</h3>
                                        <p className="text-gray-600 mb-4">Join or create focused study blocks.</p>
                                        <button className="px-6 py-3 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white rounded-xl font-medium transition-all shadow-lg shadow-gray-800/25 flex items-center gap-2">
                                            <Plus size={16} />
                                            Create Session
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Chat Sidebar - only show when joined */}
            {hasJoined && showChat && (
                <div className="w-96 bg-white border-l border-gray-200/60 shadow-xl flex flex-col relative">
                    <div className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-gray-50/30 to-white">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Live Chat</h3>
                            <button
                                onClick={() => setShowChat(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                                {onlineUsers.map((u) => (
                                    <div key={u.id} className="relative w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-2 border-white flex items-center justify-center text-sm shadow-sm">
                                        {u.avatar}
                                        <span className={`absolute -bottom-0 -right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${getStatusColor(u.status as any)}`} />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {onlineUsers.filter(u => u.status === 'online').length} online now
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
                        {chatMessages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] ${msg.user === 'You' ? 'order-2' : 'order-1'}`}>
                                    <div className="flex items-center space-x-2 mb-1">
                                        {msg.user !== 'You' && <span className="text-xs font-semibold text-gray-700">{msg.user}</span>}
                                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                    </div>
                                    <div
                                        className={`rounded-2xl px-4 py-3 ${
                                            msg.user === 'You'
                                                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-800 border border-gray-200/50'
                                        }`}
                                    >
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-gray-200/60">
                        <div className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 focus:bg-white transition-all text-gray-800 placeholder-gray-500 text-sm"
                            />
                            <button className="p-3 text-gray-400 hover:text-gray-600 transition-all">
                                <Paperclip size={20} />
                            </button>
                            <button
                                onClick={handleSendChatMessage}
                                className="p-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:from-gray-800 hover:to-gray-950 transition-all shadow-lg shadow-gray-800/25"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}