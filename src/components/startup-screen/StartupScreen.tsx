"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const HELLOS = [
    { text: "hello", lang: "en", font: "font-playfair" },
    { text: "bonjour", lang: "fr", font: "font-playfair" },
    { text: "أهلاً", lang: "ar", font: "font-noto-arabic" },
    { text: "hola", lang: "es", font: "font-playfair" },
    { text: "ciao", lang: "it", font: "font-playfair" },
    { text: "hallo", lang: "de", font: "font-playfair" },
    { text: "سلام", lang: "ma", font: "font-noto-arabic" },
];

export default function StartupScreen({ onComplete }: { onComplete: () => void }) {
    const [date, setDate] = useState("");
    const [helloIndex, setHelloIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        setDate(formattedDate);

        // Cycle through greetings every 4.5 seconds
        const cycleTimer = setInterval(() => {
            setHelloIndex((prev) => (prev + 1) % HELLOS.length);
        }, 4500);

        return () => clearInterval(cycleTimer);
    }, []);

    const handleContinue = useCallback(() => {
        setIsExiting(true);
        setTimeout(onComplete, 1200);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-black text-white antialiased h-screen w-screen overflow-hidden font-sans flex flex-col items-center justify-between p-8"
                >
                    {/* Animated Mesh Gradient Background (Blue Theme) */}
                    <div className="fixed inset-0 z-0 opacity-40">
                        <motion.div
                            animate={{
                                background: [
                                    "radial-gradient(at 0% 0%, hsla(220,100%,10%,1) 0px, transparent 50%)",
                                    "radial-gradient(at 100% 100%, hsla(220,100%,15%,1) 0px, transparent 50%)",
                                    "radial-gradient(at 0% 100%, hsla(220,100%,10%,1) 0px, transparent 50%)",
                                    "radial-gradient(at 100% 0%, hsla(220,100%,15%,1) 0px, transparent 50%)",
                                    "radial-gradient(at 0% 0%, hsla(220,100%,10%,1) 0px, transparent 50%)",
                                ]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(at_50%_0%,hsla(210,100%,40%,0.3)_0%,transparent_60%)]" />
                    </div>

                    {/* Top Blue Lighting / Glow */}
                    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[140%] h-[70%] bg-[radial-gradient(circle_at_50%_0%,#1e40af_0%,transparent_75%)] blur-[100px] opacity-60" />
                        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90%] h-[50%] bg-blue-500/20 rounded-full blur-[140px]" />
                        <div className="absolute inset-0 backdrop-blur-[60px]" />
                    </div>

                    {/* Date Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="relative z-10 w-full h-24 flex items-center justify-center text-lg md:text-xl font-medium tracking-wide text-white/70"
                    >
                        {date}
                    </motion.div>

                    {/* Main Greeting Area */}
                    <main className="relative z-10 flex-grow w-full flex flex-col items-center justify-center text-center">
                        <div className="h-[200px] w-full flex items-center justify-center relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={helloIndex}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(10px)" }}
                                    transition={{
                                        duration: 2,
                                        ease: [0.22, 1, 0.36, 1],
                                        opacity: { duration: 1.5 }
                                    }}
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                >
                                    {/* The "Hand-Drawn" Italic Text */}
                                    <h1 className={`italic drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)] leading-none select-none tracking-tight text-white
                                        ${HELLOS[helloIndex].lang === "ar" || HELLOS[helloIndex].lang === "ma"
                                            ? "text-[90px] md:text-[140px] lg:text-[180px] font-noto-arabic"
                                            : "text-[120px] md:text-[200px] lg:text-[260px] font-playfair"}`}
                                    >
                                        <motion.span
                                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                                            transition={{ duration: 3, delay: 0.3, ease: "easeInOut" }}
                                            className="block"
                                        >
                                            {HELLOS[helloIndex].text}
                                        </motion.span>
                                    </h1>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>

                    {/* Footer / Continue Area */}
                    <footer className="relative z-10 w-full flex flex-col items-center pb-20">
                        <motion.button
                            onClick={handleContinue}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            className="group relative px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-500 ease-out backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 hover:scale-105 active:scale-95"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-xl font-medium tracking-wide">Click to continue</span>
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-500" />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </motion.button>
                    </footer>

                    {/* Cinematic Noise Overlay */}
                    <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-100 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
