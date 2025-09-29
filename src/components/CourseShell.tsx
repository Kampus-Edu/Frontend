'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MessageSquare, BarChart3, GraduationCap, FileText, Users, Send,
    Paperclip, Smile, BookOpen, Plus, Search, Settings, Bell, X,
    CheckCircle, Clock, TrendingUp, AlertCircle, Star, Download, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { allCourses, previewMessages, fullMessages } from '@/lib/data';

type Props = {
    course: {
        id: string;
        name: string;
        code: string;
        professor: string;
        currentStudents: number;
        alumni: number;
        prospective: number;
        difficulty: number;
        // add other fields you actually use here if needed (e.g. timeCommitment, avgGrade)
    };
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

    // Left sidebar list — reuse your global courses for demo
    const courses = allCourses;

    // Messages for the Discussion tab
    const discussionMessages = useMemo(
        () =>
            (joined ? fullMessages : previewMessages).filter(
                (m) => userType === 'all' || m.userType === userType
            ),
        [joined, userType]
    );

    // helpers
    const getUserTypeColor = (type: string) => {
        switch (type) {
            case 'current':
                return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border border-blue-200/50';
            case 'alumni':
                return 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-700 border border-purple-200/50';
            case 'prospective':
                return 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-200/50';
            case 'instructor':
                return 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border border-amber-200/50';
            default:
                return 'bg-gray-100/80 text-gray-700 border border-gray-200/50';
        }
    };

    const getStatusColor = (status: 'online' | 'away' | 'offline') => {
        switch (status) {
            case 'online':
                return 'bg-green-400';
            case 'away':
                return 'bg-yellow-400';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl flex flex-col">
                {/* Brand */}
                <div className="p-6 border-b border-white/20 bg-gradient-to-r from-white/90 to-gray-50/90">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <BookOpen className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">GroupLearn</h1>
                            <p className="text-gray-600 font-medium">Cross-semester communities</p>
                        </div>
                    </div>
                </div>

                {/* Your Courses */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Your Courses</h3>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200">
                                <Plus size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {courses.map((c) => (
                                <div
                                    key={c.id}
                                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${
                                        c.id === course.id
                                            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-900/10 border border-white/30 scale-[1.02]'
                                            : 'hover:bg-white/70 hover:backdrop-blur-xl hover:shadow-md hover:scale-[1.01]'
                                    }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-4 h-4 rounded-full ${c.color} mt-1 shadow`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-bold text-gray-900 truncate">{c.name}</p>
                                            </div>
                                            <p className="text-xs text-gray-600 font-medium">{c.code} • {c.professor}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className={`w-5 h-5 rounded-full ${courses.find(c => c.id === course.id)?.color ?? 'bg-slate-300'} shadow`} />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                                    <span>{course.name}</span>
                                    <span className="text-lg font-medium text-gray-500">({course.code})</span>
                                </h2>
                                <div className="flex items-center space-x-6 text-sm text-gray-600 font-medium mt-1">
                                    <span>👩‍🎓 {course.currentStudents} current</span>
                                    <span>🎓 {course.alumni} alumni</span>
                                    <span>👀 {course.prospective} prospective</span>
                                    <span>⭐ {course.difficulty}/5 difficulty</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowChat((s) => !s)}
                                className={`p-3 rounded-xl transition-all duration-200 ${showChat ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/80'}`}
                                aria-label="Toggle chat"
                            >
                                <MessageCircle size={22} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200" aria-label="Search">
                                <Search size={22} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200" aria-label="Notifications">
                                <Bell size={22} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200" aria-label="Settings">
                                <Settings size={22} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 shadow-sm">
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
                                            ? 'border-blue-500 text-blue-600 bg-blue-50/50'
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

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === 'discussion' && (
                        <div className="flex flex-col h-full">
                            {/* Filter */}
                            <div className="p-6 bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-xl border-b border-white/20">
                                <div className="flex items-center space-x-3 text-sm">
                                    <span className="text-gray-600 font-medium">Viewing:</span>
                                    {(['all','current','alumni','prospective'] as UserType[]).map((ut) => (
                                        <button
                                            key={ut}
                                            onClick={() => setUserType(ut)}
                                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                                userType === ut
                                                    ? (ut === 'all'
                                                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-800/25'
                                                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25')
                                                    : 'bg-white/70 backdrop-blur-sm text-gray-600 border border-gray-200/50 hover:bg-white/90 hover:shadow-md'
                                            }`}
                                        >
                                            {ut === 'all' ? 'All Members' : ut[0].toUpperCase() + ut.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {discussionMessages.map((msg) => (
                                    <div key={msg.id} className="group hover:scale-[1.01] transition-all duration-300">
                                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-white/20 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300">
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
                                                                className="flex items-center space-x-2 px-3 py-2 bg-gray-50/80 backdrop-blur-sm rounded-xl text-sm hover:bg-gray-100/80 hover:scale-105 transition-all duration-200 border border-gray-200/30"
                                                            >
                                                                <span className="text-base">{r.emoji}</span>
                                                                <span className="font-medium text-gray-700">{r.count}</span>
                                                            </button>
                                                        ))}
                                                        <button className="p-2 bg-gray-50/80 backdrop-blur-sm rounded-xl hover:bg-gray-100/80 hover:scale-105 transition-all duration-200 border border-gray-200/30">
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
                            <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-white/20">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={composer}
                                            onChange={(e) => setComposer(e.target.value)}
                                            placeholder="Share insights, ask questions, help peers..."
                                            className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 text-gray-800 placeholder-gray-500"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200" aria-label="Attach">
                                                <Paperclip size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200" aria-label="Emoji">
                                                <Smile size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <Button className="px-6 py-4">
                                        <Send size={18} className="mr-3" />
                                        <span>Send</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other tabs below are stubbed with styled cards. Fill with real data when ready. */}
                    {activeTab === 'course-intel' && (
                        <div className="p-6 bg-gradient-to-br from-slate-50/80 to-gray-50/80 min-h-full">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                                    Course Intelligence
                                </h2>
                                <p className="text-gray-600 text-lg">Real insights from {course.alumni} students</p>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                                                {course.difficulty}/5
                                            </p>
                                            <p className="text-sm text-gray-600 font-medium">Difficulty Rating</p>
                                        </div>
                                        <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl">
                                            <AlertCircle className="text-red-500" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-500">Based on alumni reviews</div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">~9h</p>
                                            <p className="text-sm text-gray-600 font-medium">Hours/Week</p>
                                        </div>
                                        <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl">
                                            <Clock className="text-orange-500" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-500">Avg. time commitment</div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">B+</p>
                                            <p className="text-sm text-gray-600 font-medium">Average Grade</p>
                                        </div>
                                        <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
                                            <TrendingUp className="text-green-500" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-500">Historical class average</div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">87%</p>
                                            <p className="text-sm text-gray-600 font-medium">Pass Rate</p>
                                        </div>
                                        <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl">
                                            <CheckCircle className="text-blue-500" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-500">C+ or higher</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'mentorship' && (
                        <div className="p-6 bg-gradient-to-br from-slate-50/80 to-gray-50/80 min-h-full">
                            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
                                <h3 className="font-bold text-gray-900 text-xl mb-2">Alumni Mentorship</h3>
                                <p className="text-gray-600 mb-4">Connect with students who’ve mastered this course.</p>
                                <Button className="inline-flex">
                                    <Users className="mr-2" size={18} />
                                    Request Mentor
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="p-6 bg-gradient-to-br from-slate-50/80 to-gray-50/80 min-h-full">
                            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
                                <h3 className="font-bold text-gray-900 text-xl mb-2">Study Resources</h3>
                                <p className="text-gray-600 mb-4">Upload and share guides, notes, and videos.</p>
                                <div className="flex gap-3">
                                    <Button><Download size={16} className="mr-2" /> Browse</Button>
                                    <Button variant="subtle"><Star size={16} className="mr-2" /> Top Rated</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sessions' && (
                        <div className="p-6 bg-gradient-to-br from-slate-50/80 to-gray-50/80 min-h-full">
                            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
                                <h3 className="font-bold text-gray-900 text-xl mb-2">Study Sessions</h3>
                                <p className="text-gray-600 mb-4">Join or create focused study blocks.</p>
                                <Button><Plus size={16} className="mr-2" /> Create Session</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Sidebar */}
            {showChat && (
                <div className="w-96 bg-white/90 backdrop-blur-xl border-l border-white/20 shadow-xl flex flex-col">
                    <div className="p-6 border-b border-white/20 bg-gradient-to-r from-white/90 to-gray-50/90">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Live Chat</h3>
                            <button
                                onClick={() => setShowChat(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
                                aria-label="Close chat"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                                {onlineUsers.map((u) => (
                                    <div key={u.id} className="relative w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-2 border-white flex items-center justify-center text-sm">
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

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                                : 'bg-gray-100/80 text-gray-800 border border-gray-200/50'
                                        }`}
                                    >
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-white/20">
                        <div className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-3 bg-gray-50/70 backdrop-blur-sm rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm"
                            />
                            <button className="p-3 text-gray-400 hover:text-gray-600 transition-all duration-200" aria-label="Attach file">
                                <Paperclip size={20} />
                            </button>
                            <button
                                onClick={handleSendChatMessage}
                                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                                aria-label="Send message"
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
