import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Volume2, Search, Sparkles } from "lucide-react";
import { spotlightCurriculum } from "lib/curriculum-data";
import { useLanguage } from "context/LanguageContext";

const unitColors: Record<string, string> = {
    blue: "moroccan-blue",
    orange: "orange-500",
    purple: "purple-500",
    red: "red-500",
    mocha: "amber-600",
    green: "emerald-500",
};

export default function VocabularyPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [speakingWord, setSpeakingWord] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const filteredUnits = useMemo(() => {
        let units = JSON.parse(JSON.stringify(spotlightCurriculum));
        if (selectedUnit !== null) units = units.filter((u: any) => u.id === selectedUnit);
        if (searchTerm.trim()) {
            units = units.map((u: any) => ({
                ...u,
                vocabulary: u.vocabulary.filter((v: any) =>
                    v.word.toLowerCase().includes(searchTerm.toLowerCase())
                ),
            })).filter((u: any) => u.vocabulary.length > 0);
        }
        return units;
    }, [searchTerm, selectedUnit]);

    const totalWords = spotlightCurriculum.reduce((acc, u) => acc + u.vocabulary.length, 0);

    const speakWord = (word: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word);
            u.lang = "en-US";
            u.rate = 0.8;
            setSpeakingWord(word);
            u.onend = () => setSpeakingWord(null);
            window.speechSynthesis.speak(u);
        }
    };

    return (
        <div className={`space-y-20 ${language === "ar" ? "rtl" : "ltr"}`} dir={language === "ar" ? "rtl" : "ltr"}>
            {/* Page Header */}
            <header className="space-y-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center space-x-3 px-5 py-2 rounded-full glass border-white/5"
                >
                    <BookOpen className="w-4 h-4 text-moroccan-blue" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{totalWords} {t("vocab_words")} {t("across")} {spotlightCurriculum.length} {t("units")}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-display font-medium text-white tracking-tight"
                >
                    {t("vocabulary")} <span className="italic text-moroccan-blue">{t("bank")}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-light leading-relaxed text-white/80"
                >
                    {t("vocabulary_desc")}
                </motion.p>
            </header>

            {/* Controls Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`sticky top-32 z-30 transition-all duration-500 flex flex-col md:flex-row gap-6 p-4 rounded-[3rem] ${scrolled ? "glass-dark shadow-3xl border border-white/5 mx-[-1rem] px-8" : "bg-transparent"}`}
            >
                <div className="relative flex-grow">
                    <Search className={`absolute ${language === "ar" ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 w-5 h-5 text-white/20`} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t("search_vocab")}
                        className={`w-full bg-white/5 border border-white/5 rounded-full ${language === "ar" ? "pr-16 pl-8" : "pl-16 pr-8"} py-5 focus:outline-none focus:border-moroccan-blue/30 transition-all font-light text-white placeholder:text-white/20 text-lg`}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <button
                        onClick={() => setSelectedUnit(null)}
                        className={`px-6 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-perceptual whitespace-nowrap ${selectedUnit === null ? "bg-white text-black shadow-lg" : "glass hover:bg-white/10 text-white/40"}`}
                    >
                        {t("all_units")}
                    </button>
                    {spotlightCurriculum.map(u => (
                        <button
                            key={u.id}
                            onClick={() => setSelectedUnit(u.id)}
                            className={`px-6 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-perceptual whitespace-nowrap ${selectedUnit === u.id ? "bg-moroccan-blue text-white shadow-lg shadow-moroccan-blue/20" : "glass hover:bg-white/10 text-white/40"}`}
                        >
                            {u.title}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Vocabulary Grid */}
            <div className="space-y-24">
                <AnimatePresence mode="popLayout">
                    {filteredUnits.length > 0 ? filteredUnits.map((unit: any, idx: number) => (
                        <motion.section
                            key={unit.id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                            className="space-y-10"
                        >
                            <div className={`flex items-center gap-6 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                                <div className={`w-14 h-14 rounded-2xl glass-dark border border-white/5 flex items-center justify-center`}>
                                    <div className={`w-3 h-3 rounded-full bg-${unitColors[unit.theme] || 'white'} shadow-lg shadow-${unitColors[unit.theme]}/20`} />
                                </div>
                                <div className={language === "ar" ? "text-right" : "text-left"}>
                                    <h2 className="text-3xl font-display font-medium text-white tracking-tight">{t("unit")} {unit.id}: {unit.title}</h2>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">{unit.vocabulary.length} {t("vocab_words")}</span>
                                </div>
                                <div className="flex-grow h-[1px] bg-white/5 md:block hidden" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {unit.vocabulary.map((item: any, i: number) => (
                                    <motion.div
                                        key={item.word}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group rounded-[3rem] glass-dark border border-white/5 hover:border-moroccan-blue/30 transition-perceptual cursor-pointer relative overflow-hidden flex flex-col"
                                        onClick={() => speakWord(item.word)}
                                    >
                                        {/* Image Container */}
                                        <div className="aspect-[4/3] w-full relative overflow-hidden bg-white/5 italic">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.word}
                                                    className="w-full h-full object-cover transition-perceptual group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-white/5 to-transparent">
                                                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center border-white/5 group-hover:border-moroccan-blue/20 transition-perceptual">
                                                        <Sparkles className="w-8 h-8 text-white/10 group-hover:text-moroccan-blue/40 transition-colors" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">{t("image_pending") || "Image Pending"}</span>
                                                </div>
                                            )}

                                            {/* Audio Trigger Icon Overlay */}
                                            <div className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-perceptual backdrop-blur-xl border border-white/10 ${speakingWord === item.word ? "bg-moroccan-blue text-white scale-110 shadow-2xl shadow-moroccan-blue/50" : "bg-black/40 text-white group-hover:bg-moroccan-blue group-hover:text-white"}`}>
                                                <Volume2 className={`w-6 h-6 ${speakingWord === item.word ? "animate-pulse" : ""}`} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-10 space-y-4">
                                            <h3 className={`text-3xl font-semibold tracking-tight transition-colors ${speakingWord === item.word ? "text-moroccan-blue" : "text-white group-hover:text-moroccan-blue"}`}>
                                                {item.word}
                                            </h3>
                                            <p className="text-base font-light text-white/40 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Premium Glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-moroccan-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 space-y-4">
                            <Sparkles className="w-12 h-12 text-white/5 mx-auto" />
                            <p className="text-white/20 text-xl font-light">{t("no_results")}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
