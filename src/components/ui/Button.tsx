import * as React from "react";


type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "subtle";
};


export function Button({ variant = "primary", className = "", children, ...props }: Props) {
    const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";
    const styles = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
        subtle: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    } as const;
    return (
        <button className={`${base} ${styles[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}