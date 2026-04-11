import { Link, useNavigate } from 'react-router-dom';

import { ArrowLeft, Home } from 'lucide-react';

import FloatingParticles from '@/components/visuals/floating-particles';
import { useAuthStore } from '@/stores/auth.store';
import { DEFAULT_ROUTES_BY_ROLE } from '@/constants/routes';
import type { UserRole } from '@/constants/ROLES';

export default function NotFoundPage() {
    const navigate = useNavigate();

     const user = useAuthStore(s => s.user);
        const defaultRoute = DEFAULT_ROUTES_BY_ROLE[user?.role as UserRole] ?? '/dashboard';

    return (
        <div className="from-background via-surface to-secondary relative min-h-screen overflow-hidden bg-linear-to-br">
            <FloatingParticles />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
                {/* 404 Text */}
                <div className="relative mb-8">
                    <h1 className="text-gradient-primary glow text-[12rem] leading-none font-black select-none md:text-[16rem]">
                        404
                    </h1>
                    <div
                        className="bg-gradient-primary absolute inset-0 -z-10 opacity-30 blur-3xl"
                        style={{ transform: 'scale(0.8)' }}
                    />
                </div>

                {/* Message card */}
                <div className="relative w-full max-w-2xl">
                    <div className="frosted glow-lg hover-lift rounded-3xl px-8 md:px-12">
                        <h2 className="text-foreground mb-4 text-center text-3xl font-bold md:text-4xl">
                            Oops! Page Not Found
                        </h2>

                        <p className="text-muted-foreground mb-8 text-center text-lg">
                            The page you&apos;re looking for seems to have wandered off into the digital void.
                            Let&apos;s get you back on track.
                        </p>

                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <button
                                className="group bg-gradient-primary hover-scale glow cursor-pointer rounded-xl px-8 py-4 font-semibold transition-all duration-300"
                            >
                                <Link to={defaultRoute} className="flex items-center justify-center gap-2">
                                    <Home className="h-5 w-5" />
                                    Go Home
                                </Link>
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="group border-secondary bg-primary/5 hover-scale cursor-pointer rounded-xl border-2 px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                    Go Back
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-mesh absolute -inset-4 -z-10 rounded-3xl opacity-20 blur-2xl" />
                </div>
            </div>
        </div>
    );
}
