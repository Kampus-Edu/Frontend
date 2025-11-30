// lib/useRequireAuth.ts
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "./api";

export function useRequireAuth() {
    const router = useRouter();

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            router.push("/login");
        }
    }, [router]);
}
