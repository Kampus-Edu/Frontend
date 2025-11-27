import * as React from "react";


type Tone = "accent" | "neutral" | "blue" | "dark" | "green" | "orange";


export function Badge({ tone = "accent", children }: { tone?: Tone; children: React.ReactNode }) {
    const tones: Record<Tone, string> = {
        accent: "bg-gray-100 text-gray-700 border border-gray-200",
        neutral: "bg-slate-100 text-slate-700 border border-slate-200",
        blue: "bg-blue-50 text-blue-700 border border-blue-200",
        dark: "bg-gray-800 text-white border border-gray-700",
        green: "bg-green-50 text-green-700 border border-green-200",
        orange: "bg-orange-50 text-orange-700 border border-orange-200",
    };
    return <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${tones[tone]}`}>{children}</span>;
}