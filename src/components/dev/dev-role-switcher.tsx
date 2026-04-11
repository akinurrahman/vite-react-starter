import { useState } from 'react';

import { USER_ROLES, type UserRole } from '@/constants/ROLES';
import { DEFAULT_ROUTES_BY_ROLE } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth.store';

function makeMockUser(role: UserRole) {
    return {
        _id: `dev-${role.toLowerCase()}`,
        fullName: `Dev ${USER_ROLES.config[role].label}`,
        email: `${role.toLowerCase()}@dev.local`,
        role,
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
}

export function DevRoleSwitcher() {
    const [open, setOpen] = useState(false);

    const login = useAuthStore(s => s.login);
    const logout = useAuthStore(s => s.logout);
    const currentUser = useAuthStore(s => s.user);

    const roles = Object.keys(USER_ROLES.config) as UserRole[];

    function loginAs(role: UserRole) {
        login({
            user: makeMockUser(role),
            accessToken: `mock-access-token-${role}`,
            refreshToken: `mock-refresh-token-${role}`,
        });
        // Navigate after state settles
        setTimeout(() => {
            window.location.href = DEFAULT_ROUTES_BY_ROLE[role];
        }, 50);
    }

    return (
        <div className="fixed right-4 bottom-4 z-9999 font-mono text-xs">
            {open ? (
                <div
                    className="bg-card border-border w-52 rounded-xl border shadow-2xl"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
                >
                    {/* Header */}
                    <div className="border-border flex items-center justify-between border-b px-3 py-2">
                        <span className="text-muted-foreground font-semibold tracking-widest uppercase">
                            Dev · Roles
                        </span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Role list */}
                    <div className="flex flex-col gap-1 p-2">
                        {roles.map(role => {
                            const isActive = currentUser?.role === role;
                            return (
                                <button
                                    key={role}
                                    onClick={() => loginAs(role)}
                                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors"
                                    style={{
                                        background: isActive ? 'var(--primary)' : 'var(--secondary)',
                                        color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)',
                                    }}
                                >
                                    <span>{USER_ROLES.config[role].label}</span>
                                    {isActive && <span className="opacity-70">✓</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    {currentUser && (
                        <div className="border-border border-t p-2">
                            <button
                                onClick={() => {
                                    logout();
                                    window.location.href = '/login';
                                }}
                                className="text-destructive hover:bg-destructive/10 w-full rounded-lg px-2.5 py-1.5 text-left transition-colors"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="border-border bg-card text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full border shadow-lg transition-all hover:scale-110"
                    title={currentUser ? `Logged in as ${currentUser.role}` : 'Dev: Switch role'}
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
                >
                    {currentUser ? (
                        <span className="text-[10px] font-bold leading-none">
                            {currentUser.role.slice(0, 2)}
                        </span>
                    ) : (
                        <span>⚙</span>
                    )}
                </button>
            )}
        </div>
    );
}
