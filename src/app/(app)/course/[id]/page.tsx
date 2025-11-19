// CoursePage.js (The Course Room) - Logic for Join Guardrail

'use client';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import CourseShell from "@/components/CourseShell"; // This component needs to handle the visual guardrail
import {allCourses} from "@/lib/data";

export default function CoursePage(){
    const params = useParams<{ id: string }>();
    const search = useSearchParams();

    // joined is explicitly set to '1' in the URL query when a user successfully joins.
    const joined = search.get('joined') === '1';

    const course = useMemo(
        () => allCourses.find(c => c.id === params.id),
        [params.id]
    );

    if (!course) return <div className="p-20 text-center text-xl text-slate-600">Course not found.</div>;

    // The CourseShell component will use the 'joined' prop to display:
    // 1. The full interactive Room Feed/Chat (if joined=true).
    // 2. A large "Join Room" CTA/Guardrail (if joined=false).
    return <CourseShell course={course} joined={joined} />;
}

// NOTE: The implementation of CourseShell is critical here. 
// Inside CourseShell, the render logic should look something like:
/*
function CourseShell({ course, joined }) {
    return (
        <div className="course-layout">
            // ... Course Info Header ...
            
            {joined ? (
                // Full interactive feed, Q&A, and Compose window
                <FullCourseRoomFeed course={course} />
            ) : (
                // Guardrail: Large "Join Room" button and explanation
                <div className="flex flex-col items-center justify-center p-20 text-center">
                    <MessageCircle size={64} className="text-emerald-500 mb-6"/>
                    <h2 className="text-3xl font-bold mb-3">Welcome to the {course.name} Room</h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Join this community to access the course feed, ask questions to alumni, and study with classmates.
                    </p>
                    <Button className="h-14 px-10 text-lg">
                        Join Room
                    </Button>
                </div>
            )}
        </div>
    );
}
*/