'use client';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import CourseShell from "@/components/CourseShell";
import {allCourses} from "@/lib/data";

export default function CoursePage(){
    const params = useParams<{ id: string }>();
    const search = useSearchParams();
    const joined = search.get('joined') === '1';

    const course = useMemo(
        () => allCourses.find(c => c.id === params.id),
        [params.id]
    );

    if (!course) return <div className="p-10">Course not found.</div>;

    return <CourseShell course={course} joined={joined} />;
}