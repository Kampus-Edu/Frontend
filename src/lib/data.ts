import type { Course, Message } from "./types";


export const universities = [
    "University of New Brunswick (UNB)",
    "Dalhousie University",
    "Saint Mary's University",
    "Acadia University",
    "Mount Allison University",
    "St. Francis Xavier University",
];


export const allCourses: Course[] = [
    { id: "maac-3021", name: "Real Analysis", code: "MAAC 3021", professor: "Dr. Sarah Johnson", semester: "Winter 2025", year: 3, department: "Mathematics", currentStudents: 24, alumni: 156, prospective: 43, difficulty: 4.2, timeCommitment: 9.5, avgGrade: "B+", color: "bg-blue-500", popularity: 89, tags: ["Math", "Proofs", "Analysis"], description: "A rigorous introduction to real analysis covering limits, continuity, differentiation, and integration." },
    { id: "cs-2333", name: "Data Structures", code: "CS 2333", professor: "Dr. Mike Chen", semester: "Winter 2025", year: 2, department: "Computer Science", currentStudents: 45, alumni: 289, prospective: 67, difficulty: 3.8, timeCommitment: 8.2, avgGrade: "B", color: "bg-emerald-500", popularity: 95, tags: ["Programming", "Algorithms", "Java"], description: "Implementation and analysis of fundamental data structures including trees, graphs, and hash tables." },
    { id: "phys-1001", name: "Physics Fundamentals", code: "PHYS 1001", professor: "Dr. Emily Watson", semester: "Winter 2025", year: 1, department: "Physics", currentStudents: 78, alumni: 423, prospective: 12, difficulty: 3.5, timeCommitment: 6.8, avgGrade: "B+", color: "bg-violet-500", popularity: 92, tags: ["Physics", "Lab", "Mechanics"], description: "Classical mechanics, thermodynamics, and wave phenomena with hands-on laboratory experience." },
    { id: "chem-2401", name: "Organic Chemistry", code: "CHEM 2401", professor: "Dr. Robert Brown", semester: "Winter 2025", year: 2, department: "Chemistry", currentStudents: 31, alumni: 198, prospective: 89, difficulty: 4.6, timeCommitment: 12.3, avgGrade: "C+", color: "bg-orange-500", popularity: 78, tags: ["Chemistry", "Reactions", "Memorization"], description: "Structure, properties, and reactions of organic compounds with emphasis on mechanisms." },
    { id: "econ-2103", name: "Microeconomics", code: "ECON 2103", professor: "Dr. Lisa Zhang", semester: "Winter 2025", year: 2, department: "Economics", currentStudents: 67, alumni: 234, prospective: 34, difficulty: 3.2, timeCommitment: 5.5, avgGrade: "B+", color: "bg-indigo-500", popularity: 85, tags: ["Economics", "Theory", "Markets"], description: "Individual and firm decision-making, market structures, and resource allocation." },
    { id: "phil-1104", name: "Critical Thinking", code: "PHIL 1104", professor: "Dr. Alex Harper", semester: "Winter 2025", year: 1, department: "Philosophy", currentStudents: 89, alumni: 567, prospective: 23, difficulty: 2.8, timeCommitment: 4.2, avgGrade: "A-", color: "bg-yellow-500", popularity: 90, tags: ["Philosophy", "Logic", "Writing"], description: "Logic, argumentation, and analytical reasoning skills for academic and everyday contexts." },
];


export const previewMessages: Message[] = [
    { id: 1, user: "Sarah Chen", userType: "current", avatar: "👩‍🎓", year: "Year 3", message: "Can someone explain epsilon-delta proofs? I'm completely lost on the homework.", timestamp: "2:34 PM", reactions: [{ emoji: "🤔", count: 3 }, { emoji: "👍", count: 2 }] },
    { id: 2, user: "Dr. Mike Rodriguez", userType: "alumni", avatar: "🎓", year: "Alumni '22 (A+)", message: "I struggled with those too! The key insight is that δ depends on ε. Think of it as: \"How close do I need x to be to make f(x) within ε of L?\" I can hop on a call if you need.", timestamp: "2:36 PM", reactions: [{ emoji: "🙌", count: 8 }, { emoji: "💡", count: 5 }] },
    { id: 3, user: "Alex Kim", userType: "current", avatar: "🧑‍🔬", year: "Year 3", message: "I just uploaded my epsilon-delta cheat sheet to resources. It has step-by-step examples!", timestamp: "2:38 PM", reactions: [{ emoji: "⭐", count: 12 }, { emoji: "🔥", count: 6 }] },
];


export const fullMessages: Message[] = [
    ...previewMessages,
    { id: 4, user: "Jordan Taylor", userType: "prospective", avatar: "👀", year: "Planning Fall 2025", message: "As someone considering this course, should I brush up on limits before taking it?", timestamp: "2:40 PM", reactions: [{ emoji: "🤔", count: 4 }] },
    { id: 5, user: "Prof. Lisa Wang", userType: "alumni", avatar: "👩‍🏫", year: "Alumni '19 (A+)", message: "@Jordan Taylor Absolutely! Make sure you're rock solid on limits. Also, start thinking in terms of 'for every ε > 0, there exists δ > 0...' early. It becomes second nature.", timestamp: "2:42 PM", reactions: [{ emoji: "💯", count: 15 }, { emoji: "👨‍🏫", count: 3 }] },
];