'use client';

import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import CourseShell from '@/components/CourseShell';
import { allCourses } from '@/lib/data';

export default function CoursePage() {
    // useParams returns string | string[] | undefined — cast for convenience
    const params = useParams() as { id?: string };
    const search = useSearchParams();
    const id = params?.id ?? ''; // defensive
    const joined = search?.get('joined') === '1';

    const course = useMemo(() => allCourses.find((c) => c.id === id), [id]);

    if (!course) {
        return <div className="p-20 text-center text-xl text-slate-600">Course not found.</div>;
    }

    return <CourseShell course={course} joined={joined} />;
}
