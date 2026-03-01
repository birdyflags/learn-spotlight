import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import StartupScreen from "components/startup-screen/StartupScreen";
import ThreeBackground from "components/three/ThreeBackground";
import { Globe, GraduationCap, ChevronDown, Menu, Home, Library, Brain, Sparkles, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, LanguageCode } from "context/LanguageContext";

const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { language, setLanguage, t } = useLanguage();
    const [showStartup, setShowStartup] = useState(true);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation();

    const navLinks = [
        { href: "/", label: t("home"), icon: Home },
        { href: "/vocabulary", label: t("vocabulary"), icon: Library },
        { href: "/grammar", label: t("grammar"), icon: Brain },
        { href: "/ai-hub", label: t("ai_hub"), icon: Sparkles, accent: true },
    ];

    const selectedLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [pathname]);

    if (showStartup) {
        return <StartupScreen onComplete={() => setShowStartup(false)} />;
    }

    return (
        <div
            className={`min-h-screen bg-black relative selection:bg-moroccan-blue/30 overflow-x-hidden text-white ${language === "ar" ? "rtl" : "ltr"}`}
            dir={language === "ar" ? "rtl" : "ltr"}>
            {/* Global Cinematic Lighting */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[radial-gradient(circle_at_50%_0%,#1e40af_0%,transparent_70%)] blur-[80px] opacity-70" />
                <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 backdrop-blur-[120px]" />
            </div>

            {/* Grainy Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] contrast-150 brightness-100 z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <ThreeBackground />

            {/* Navigation Header */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${scrolled ? "mt-2" : "mt-0"}`}>
                <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-full border border-white/5 ${scrolled ? "glass-dark shadow-2xl py-2 px-6" : "bg-transparent py-4 px-2"}`}>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 rounded-xl bg-moroccan-blue flex items-center justify-center shadow-lg shadow-moroccan-blue/20 group-hover:scale-110 transition-transform">
                                <GraduationCap className="text-white w-6 h-6" />
                            </div>
                            <span className="font-display font-medium text-xl tracking-tighter hidden sm:block">Spotlight <span className="text-moroccan-blue">2</span></span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all relative group flex items-center space-x-2 ${isActive ? "text-white" : "text-white/40 hover:text-white/70"
                                            }`}
                                    >
                                        {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-moroccan-blue" : "opacity-40"}`} />}
                                        <span className="relative z-10">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-bg"
                                                className="absolute inset-0 bg-white/5 rounded-full border border-white/5"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            {/* Language Switcher */}
                            <div className="relative" ref={langRef}>
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all border-white/5"
                                >
                                    <Globe className="w-4 h-4 text-moroccan-blue" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                                        {selectedLang.label}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 opacity-40 ${langOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-48 rounded-3xl glass-dark border border-white/10 shadow-3xl overflow-hidden p-2 z-[60]"
                                        >
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        setLanguage(lang.code);
                                                        setLangOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${language === lang.code ? "bg-moroccan-blue text-white" : "hover:bg-white/5 text-white/60"
                                                        }`}
                                                >
                                                    <span className="flex items-center space-x-3">
                                                        <span className="text-lg">{lang.flag}</span>
                                                        <span className="text-sm font-medium">{lang.label}</span>
                                                    </span>
                                                    {language === lang.code && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 md:hidden rounded-full glass border-white/5 text-white/60"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-3xl px-6 pt-32"
                    >
                        <div className="space-y-4">
                            {navLinks.map((item, idx) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            to={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center space-x-4 p-5 rounded-[2rem] border transition-all ${isActive ? "bg-moroccan-blue/10 border-moroccan-blue/20 text-white" : "bg-white/[0.02] border-white/5 text-white/40"
                                                }`}
                                        >
                                            <Icon className={`w-6 h-6 ${isActive ? "text-moroccan-blue" : "text-white/20"}`} />
                                            <span className="text-xl font-display font-medium">{item.label}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                {children}
            </main>

            {/* Premium Footer */}
            <footer className="w-full pt-32 pb-20 border-t border-white/5 flex flex-col items-center space-y-8 bg-gradient-to-t from-moroccan-blue/[0.02] to-transparent">
                <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 rounded-2xl glass border-white/5 flex items-center justify-center group hover:scale-110 transition-transform">
                        <GraduationCap className="w-6 h-6 text-moroccan-blue" />
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center px-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                        {t("platform_title")} • {language === "ar" ? "الصف الثامن" : "8th Grade"}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/5 italic">
                        {t("made_by")} • Moroccan English Curriculum 2026
                    </p>
                </div>
            </footer>
        </div>
    );
}
