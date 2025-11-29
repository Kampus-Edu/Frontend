const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002';

export type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
};

export type AuthResponse = {
    accessToken: string;
    user: AuthUser;
};

export async function signupRequest(body: {
    email: string;
    password: string;
    school: string;
    username: string;
    currentYear: number;
    firstName?: string;
    lastName?: string;
}) {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...body,
            accountProvider: 'PASSWORD', // Prisma enum
        }),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to sign up');
    }

    return (await res.json()) as AuthResponse;
}

export async function loginRequest(body: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...body,
            accountProvider: 'PASSWORD', // required in LoginDTO
        }),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Invalid credentials');
    }

    return (await res.json()) as AuthResponse;
}

export function saveAuth({ accessToken, user }: AuthResponse) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kampus_token', accessToken);
    localStorage.setItem('kampus_user', JSON.stringify(user));
}

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('kampus_token');
}

export function getAuthUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('kampus_user');
    if (!raw) return null;

    try {
        return JSON.parse(raw) as AuthUser;
    } catch {
        return null;
    }
}

