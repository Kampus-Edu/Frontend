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


    return <CourseShell course={course} joined={joined} />;
}