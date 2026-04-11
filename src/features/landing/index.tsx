import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
    Shield,
    RefreshCw,
    Layers,
    Zap,
    Database,
    Palette,
    LayoutGrid,
    Lock,
    Terminal,
    Sparkles,
    Users,
    Code2,
} from 'lucide-react';

import { cn } from '@/lib/utils';

/* ── GitHub icon (not in lucide-react v1.x) ────────────────────── */
function GitHubIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

/* ── Data ─────────────────────────────────────────────────────── */

const FEATURES = [
    {
        icon: Shield,
        title: 'Full Auth Flow',
        description: 'Login, logout, and token refresh with Axios interceptors and retry queuing.',
    },
    {
        icon: Lock,
        title: 'Route Protection',
        description: 'AuthGuard, role-based access control, and access-denied page handling.',
    },
    {
        icon: RefreshCw,
        title: 'Token Refresh',
        description: 'Seamless refresh with request queueing — no dropped API calls mid-flight.',
    },
    {
        icon: Database,
        title: 'TanStack Query',
        description: 'Server state, caching, and async data fetching built into the foundation.',
    },
    {
        icon: Layers,
        title: 'Feature Architecture',
        description: 'Scalable feature-based folder structure that grows gracefully with your app.',
    },
    {
        icon: Palette,
        title: '12 Themes',
        description: '6 colour families × light/dark each. Beautiful UI system powered by Shadcn.',
    },
    {
        icon: LayoutGrid,
        title: 'Data Table',
        description: 'TanStack Table with sorting, pagination, and column filtering — ready to plug in.',
    },
    {
        icon: Zap,
        title: 'DX Optimised',
        description: 'Husky, lint-staged, Prettier, Zod, and TypeScript fully configured out of the box.',
    },
    {
        icon: Users,
        title: 'RBAC Sidebar',
        description: 'Role-based sidebar nav that conditionally renders items based on user roles.',
    },
] as const;

const STACK = [
    'React 19',
    'Vite 6',
    'TypeScript',
    'React Router v7',
    'Zustand',
    'TanStack Query',
    'TanStack Table',
    'Axios',
    'TailwindCSS v4',
    'Shadcn UI',
    'Framer Motion',
    'Zod',
    'Recharts',
    'Sonner',
] as const;

const TREE: { text: string; cls: string; comment?: string }[] = [
    { text: 'src/', cls: 'text-primary font-semibold' },
    { text: '├─ features/', cls: 'text-white/75' },
    { text: '│  ├─ auth/', cls: 'text-white/45', comment: '# login · forgot-password' },
    { text: '│  └─ dashboards/', cls: 'text-white/45' },
    { text: '├─ components/', cls: 'text-white/75' },
    { text: '│  ├─ layout/', cls: 'text-white/45', comment: '# sidebar · header' },
    { text: '│  ├─ providers/', cls: 'text-white/45', comment: '# auth-guard · query' },
    { text: '│  └─ ui/', cls: 'text-white/45', comment: '# shadcn primitives' },
    { text: '├─ systems/', cls: 'text-white/75' },
    { text: '│  ├─ data-table/', cls: 'text-white/45' },
    { text: '│  ├─ form-input/', cls: 'text-white/45', comment: '# all field types' },
    { text: '│  └─ filters/', cls: 'text-white/45' },
    { text: '├─ lib/', cls: 'text-white/75' },
    { text: '│  └─ api/', cls: 'text-white/45', comment: '# axios · interceptors' },
    { text: '└─ stores/', cls: 'text-white/75' },
];

/* ── Animation variants ───────────────────────────────────────── */

const bezier = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.62, ease: bezier },
    }),
};

/* ── Component ────────────────────────────────────────────────── */

export default function LandingPage() {
    /* Inject distinctive Google Fonts */
    useEffect(() => {
        const id = 'landing-page-fonts';
        if (document.getElementById(id)) return;

        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href =
            'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
        document.head.appendChild(link);

        return () => {
            document.getElementById(id)?.remove();
        };
    }, []);

    return (
        <div
            className="min-h-screen bg-[#09090c] text-white overflow-x-hidden selection:bg-primary/30"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
            {/* ── Navbar ─────────────────────────────────────────── */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-[#09090c]/80 backdrop-blur-md">
                <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center shadow-[0_0_10px_color-mix(in_oklch,var(--color-primary)_50%,transparent)]">
                            <Terminal size={13} className="text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-sm tracking-tight">react-auth-starter</span>
                    </div>

                    <nav className="hidden sm:flex items-center gap-6">
                        <a
                            href="#features"
                            className="text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#stack"
                            className="text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                            Stack
                        </a>
                        <Link
                            to="/theme-switcher"
                            className="text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                            Themes
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/akinurrahman/vite-react-starter"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
                        >
                            <GitHubIcon size={15} />
                        </a>

                    </div>
                </div>
            </header>

            {/* ── Hero ────────────────────────────────────────────── */}
            <section className="relative pt-36 pb-28 px-6 overflow-hidden">
                {/* Grid overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.28]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '52px 52px',
                    }}
                />
                {/* Glow blobs */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-175 h-125 rounded-full bg-primary/12 blur-[130px]" />
                <div className="pointer-events-none absolute top-32 left-[8%] w-90 h-90 rounded-full bg-primary/8 blur-[80px]" />
                <div className="pointer-events-none absolute bottom-0 right-[5%] w-70 h-70 rounded-full bg-primary/6 blur-[70px]" />

                <div className="relative mx-auto max-w-6xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex mb-7"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-[11px] font-medium">
                            <Sparkles size={10} />
                            <span>Production-ready · Open source · v0.1.0</span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Left: copy */}
                        <div className="flex-1 min-w-0">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[1.07] tracking-[-0.025em] font-normal text-white mb-6"
                                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                            >
                                Skip the boring{' '}
                                <em className="not-italic text-transparent bg-clip-text bg-linear-to-br from-primary/60 via-primary to-primary">
                                    setup.
                                </em>
                                <br />
                                Start building.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[1.05rem] text-white/50 leading-relaxed max-w-lg mb-10"
                            >
                                A Vite + React 19 starter with full auth flow, RBAC, token refresh
                                queueing, TanStack Query, Shadcn UI, and everything else you'd spend
                                days configuring — already done.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-wrap gap-3"
                            >
                                <a
                                    href="https://github.com/akinurrahman/vite-react-starter"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-11 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-md bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                                >
                                    <GitHubIcon size={16} />
                                    Clone on GitHub
                                </a>
                                <Link
                                    to="/theme-switcher"
                                    className="h-11 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-md border border-white/10 bg-white/4 text-white/60 hover:text-white/90 hover:bg-white/8 hover:border-white/15 transition-all"
                                >
                                    <Palette size={15} />
                                    Browse themes
                                </Link>
                            </motion.div>

                            {/* Quick stat row */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/6"
                            >
                                {[
                                    { value: '14+', label: 'Libraries' },
                                    { value: '12', label: 'Themes' },
                                    { value: '∞', label: 'Pages ready to fill' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <p
                                            className="text-2xl font-semibold text-white tracking-tight"
                                            style={{ fontFamily: "'Instrument Serif', serif" }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-white/35 mt-0.5">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: terminal */}
                        <motion.div
                            initial={{ opacity: 0, x: 28, y: 8 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full lg:w-100 shrink-0"
                        >
                            <div className="rounded-xl border border-white/9 bg-[#0d0e11] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
                                {/* Window chrome */}
                                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/6 bg-[#111215]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                    <span
                                        className="ml-4 text-[10px] text-white/20"
                                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                    >
                                        ~/react-auth-starter
                                    </span>
                                </div>

                                {/* Prompt line */}
                                <div
                                    className="px-5 pt-4 pb-1 text-[11px] text-white/30"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <span className="text-[#28c840]">❯</span>{' '}
                                    <span className="text-white/50">tree src/</span>
                                </div>

                                {/* Tree */}
                                <div
                                    className="px-5 py-3 text-[11.5px] leading-[1.9]"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    {TREE.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.55 + i * 0.045,
                                                duration: 0.28,
                                                ease: 'easeOut',
                                            }}
                                            className="flex items-baseline gap-2 whitespace-pre"
                                        >
                                            <span className={cn('shrink-0', line.cls)}>{line.text}</span>
                                            {line.comment && (
                                                <span className="text-[#3d4451] text-[10px]">{line.comment}</span>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Bottom prompt */}
                                <div
                                    className="px-5 pb-4 pt-1 text-[11px] text-white/20"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <span className="text-[#28c840]">❯</span>{' '}
                                    <span className="animate-pulse">_</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Features ─────────────────────────────────────────── */}
            <section id="features" className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                        className="mb-14"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-px h-4 bg-primary" />
                            <p className="text-primary text-xs font-semibold uppercase tracking-[0.18em]">
                                What&apos;s included
                            </p>
                        </div>
                        <h2
                            className="text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] tracking-[-0.02em] font-normal text-white max-w-md"
                            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                            Everything except<br />
                            <em className="not-italic text-white/50">your</em> features.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {FEATURES.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: '-40px' }}
                                    variants={fadeUp}
                                    className={cn(
                                        'group relative rounded-xl border border-white/7 bg-white/2 p-5',
                                        'hover:border-primary/25 hover:bg-[#0e1420] transition-all duration-300',
                                        i === 0 && 'lg:col-span-2',
                                    )}
                                >
                                    {i === 0 && (
                                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                    <div className="relative flex items-start gap-4">
                                        <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/18 group-hover:border-primary/35 transition-all">
                                            <Icon size={15} className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white/90 mb-1.5">
                                                {feature.title}
                                            </h3>
                                            <p className="text-xs text-white/38 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Stack ─────────────────────────────────────────────── */}
            <section id="stack" className="py-20 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-2xl border border-white/7 bg-white/2 px-10 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <Code2 size={14} className="text-primary" />
                            <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-semibold">
                                Built with
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-wrap gap-2"
                        >
                            {STACK.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04, duration: 0.3 }}
                                    className="px-3 py-1.5 rounded-full border border-white/9 bg-white/3 text-[12px] text-white/50 font-medium hover:border-primary/30 hover:text-primary hover:bg-primary/7 transition-all cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────────── */}
            <section className="relative py-28 px-6 overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-primary/10 blur-[110px]" />
                </div>

                <div className="relative mx-auto max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/4 text-white/35 text-[11px] mb-8"
                    >
                        <Sparkles size={10} />
                        <span>Free & open source · MIT license</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.08] tracking-[-0.025em] font-normal text-white mb-6"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                        Clone it.
                        <br />
                        Make it{' '}
                        <em className="not-italic text-transparent bg-clip-text bg-linear-to-r from-primary/70 to-primary">
                            yours.
                        </em>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white/40 text-[1rem] mb-10 max-w-md mx-auto leading-relaxed"
                    >
                        No licensing hassle. No setup maze. Fork it, rename it, and start shipping
                        the product you actually care about.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        <a
                            href="https://github.com/akinurrahman/vite-react-starter"
                            target="_blank"
                            rel="noreferrer"
                            className="h-11 px-8 inline-flex items-center gap-2 text-sm font-medium rounded-md bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                        >
                            <GitHubIcon size={16} />
                            Clone on GitHub
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── Footer ─────────────────────────────────────────────── */}
            <footer className="border-t border-white/6 py-8 px-6">
                <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-primary/80 flex items-center justify-center">
                            <Terminal size={10} className="text-primary-foreground" />
                        </div>
                        <span className="text-sm font-medium text-white/35">react-auth-starter</span>
                    </div>

                    <p className="text-[11px] text-white/22">
                        Built by{' '}
                        <a
                            href="https://www.akinurrahman.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white/50 transition-colors"
                        >
                            Akinur Rahman
                        </a>{' '}
                        · MIT License
                    </p>

                    <div className="flex items-center gap-5 text-xs text-white/30">
                        <Link to="/theme-switcher" className="hover:text-white/60 transition-colors">
                            Themes
                        </Link>
                        <a
                            href="https://github.com/akinurrahman/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white/60 transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
