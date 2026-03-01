import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Edit3, PlayCircle, Download, CheckCircle2, Lock, Sparkles, GraduationCap, ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { spotlightCurriculum, VocabularyItem } from "lib/curriculum-data";
import { useLanguage } from "context/LanguageContext";

export default function UnitDetailPage() {
    const { id: paramId } = useParams();
    const id = parseInt(paramId || "1");
    const { t, language } = useLanguage();
    const isRtl = language === "ar";
    const [activeTab, setActiveTab] = useState<"book" | "workbook" | "media">("book");
    const [selectedExercise, setSelectedExercise] = useState<any>(null);

    const unit = spotlightCurriculum.find(u => u.id === id);

    if (!unit) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 glass rounded-[4rem] border-white/5 mx-auto max-w-4xl p-20">
            <GraduationCap className="w-20 h-20 text-white/10" />
            <h2 className="text-3xl font-display font-medium text-white/40">{language === "ar" ? "الوحدة غير موجودة" : "Unit not found"}</h2>
            <Link to="/" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-perceptual">
                {language === "ar" ? "العودة للرئيسية" : "Back Home"}
            </Link>
        </div>
    );

    return (
        <div className={`space-y-24 pb-32 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
            {/* Unit Header: Prestige Level */}
            <header className="relative py-12 md:py-24 space-y-12 overflow-hidden">
                <Link to="/" className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-white/5 text-white/40 hover:text-moroccan-blue transition-perceptual font-bold uppercase tracking-[0.4em] text-[10px]">
                    {isRtl ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                    <span>{t("dashboard")}</span>
                </Link>

                <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
                    <div className="space-y-8 max-w-4xl">
                        <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                            <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-moroccan-blue" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 whitespace-nowrap">Spotlight II • {t("unit")} {id}</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-display font-medium text-white tracking-tighter leading-[0.9] uppercase italic">
                            {unit.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/30 max-w-2xl leading-relaxed font-light">
                            {unit.description}
                        </p>
                    </div>

                    <div className="hidden lg:block">
                        <div className="text-[16rem] font-display font-black text-white/[0.02] italic select-none leading-none mr-[-2rem]">
                            {id.toString().padStart(2, '0')}
                        </div>
                    </div>
                </div>

                {/* Decorative mesh */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-moroccan-blue/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            </header>

            {/* Cinematic Tab Bar */}
            <div className={`flex items-center gap-12 border-b border-white/5 ${isRtl ? "flex-row-reverse" : ""}`}>
                <TabButton
                    active={activeTab === "book"}
                    onClick={() => setActiveTab("book")}
                    icon={FileText}
                    label={language === "ar" ? "المواد التعليمية" : "Materials"}
                />
                <TabButton
                    active={activeTab === "workbook"}
                    onClick={() => setActiveTab("workbook")}
                    icon={Edit3}
                    label={t("exercises")}
                />
                <TabButton
                    active={activeTab === "media"}
                    onClick={() => setActiveTab("media")}
                    icon={PlayCircle}
                    label={language === "ar" ? "الموارد" : "Resources"}
                />
            </div>

            {/* Interactive Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[600px]"
            >
                {activeTab === "book" && (
                    <div className="space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ResourceSection title={isRtl ? "الوظائف التواصلية" : "Functions"} items={unit.functions} index={1} isRtl={isRtl} />
                            <ResourceSection title={t("grammar")} items={unit.grammar} index={2} isRtl={isRtl} />
                        </div>
                        <VocabularyBankGallery vocabulary={unit.vocabulary} isRtl={isRtl} t={t} />
                    </div>
                )}
                {activeTab === "workbook" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {unit.exercises.map((ex, i) => (
                            <ExerciseCard key={i} ex={ex} index={i} onStart={() => setSelectedExercise(ex)} isRtl={isRtl} />
                        ))}
                    </div>
                )}
                {activeTab === "media" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {unit.audioResources.map((res, i) => (
                            <MediaCard key={i} res={res} index={i} isRtl={isRtl} />
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Modern Exercise Modal */}
            <AnimatePresence>
                {selectedExercise && (
                    <ExerciseModal
                        exercise={selectedExercise}
                        onClose={() => setSelectedExercise(null)}
                        isRtl={isRtl}
                        t={t}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function ExerciseModal({ exercise, onClose, isRtl, t }: { exercise: any; onClose: () => void; isRtl: boolean; t: any }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const questions = exercise.questions || [];

    const handleAnswer = (index: number) => {
        if (index === questions[currentStep].correctAnswer) {
            setScore(prev => prev + 1);
        }

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-[40px]"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 40 }}
                className="max-w-2xl w-full glass-dark border border-white/10 rounded-[4.5rem] p-12 md:p-16 relative overflow-hidden shadow-edge shadow-black/80"
            >
                <div className="relative z-10 w-full h-full flex flex-col items-center">
                    {!showResult ? (
                        <>
                            <div className={`w-full flex justify-between items-center mb-16 ${isRtl ? "flex-row-reverse" : ""}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-moroccan-blue" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Step {currentStep + 1} • {questions.length}</span>
                                </div>
                                <button onClick={onClose} className="text-white/20 hover:text-white transition-perceptual uppercase text-[10px] font-bold tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                    {isRtl ? "إغلاق" : "Exit Mission"}
                                </button>
                            </div>

                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-full space-y-12"
                            >
                                <h3 className={`text-4xl md:text-5xl font-display font-medium text-white leading-tight ${isRtl ? "text-right" : "text-left"}`}>
                                    {questions[currentStep]?.question}
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {questions[currentStep]?.options.map((opt: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(i)}
                                            className={`w-full p-8 rounded-[2.5rem] glass-dark border border-white/5 hover:bg-moroccan-blue/20 hover:border-moroccan-blue transition-perceptual group relative overflow-hidden flex items-center gap-6 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                                        >
                                            <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-moroccan-blue transition-perceptual text-xs font-bold text-white/40 group-hover:text-white">
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className="text-xl font-light text-white/80 group-hover:text-white transition-colors">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <div className="text-center py-12 space-y-12 w-full">
                            <div className="w-32 h-32 rounded-[3rem] glass border border-emerald-500/30 flex items-center justify-center mx-auto shadow-huge shadow-emerald-500/10">
                                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tight uppercase italic">{isRtl ? "تمت المهمة!" : "Success!"}</h3>
                                <p className="text-white/30 text-2xl font-light">
                                    {isRtl ? `لقد حصلت على ${score} من أصل ${questions.length}` : `Objective complete. You recognized ${score}/${questions.length} concepts.`}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-8 bg-white text-black rounded-full font-bold uppercase tracking-[0.4em] text-xs hover:scale-105 transition-perceptual shadow-huge shadow-white/10"
                            >
                                {isRtl ? t("continue_learning") || "متابعة التعلم" : "Deploy Knowledge"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Background aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-moroccan-blue/10 rounded-full blur-[100px] pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-3 px-2 py-8 text-xs font-bold uppercase tracking-[0.4em] transition-perceptual ${active ? 'text-moroccan-blue' : 'text-white/20 hover:text-white/50'}`}
        >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {active && (
                <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-moroccan-blue rounded-full shadow-[0_0_15px_rgba(45,108,223,0.5)]"
                />
            )}
        </button>
    );
}

function ResourceSection({ title, items, index, isRtl }: { title: string, items: (string | VocabularyItem)[], index: number, isRtl: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-dark border border-white/5 rounded-[3.5rem] p-12 space-y-10 relative overflow-hidden group shadow-edge shadow-black/40"
        >
            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-moroccan-blue animate-pulse" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-moroccan-blue">{title}</h4>
            </div>

            <ul className="space-y-6">
                {items.map((item, i) => {
                    const label = typeof item === 'string' ? item : item.word;
                    return (
                        <li key={i} className={`flex items-center gap-6 group cursor-default ${isRtl ? "flex-row-reverse text-right" : ""}`}>
                            <div className="w-10 h-10 rounded-2xl glass border border-white/5 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-moroccan-blue/30 transition-perceptual font-display italic font-bold text-xs select-none">
                                {(i + 1).toString().padStart(2, '0')}
                            </div>
                            <span className="text-xl font-light text-white/50 group-hover:text-white/90 transition-colors leading-snug">{label}</span>
                        </li>
                    );
                })}
            </ul>

            <div className="absolute bottom-0 right-0 p-12 text-white/[0.01] font-display text-8xl font-bold select-none italic pointer-events-none">0{index}</div>
        </motion.div>
    );
}

function ExerciseCard({ ex, index, onStart, isRtl }: { ex: any; index: number; onStart: () => void; isRtl: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-dark border border-white/5 rounded-[3.5rem] p-10 h-full flex flex-col justify-between group hover:border-moroccan-blue/30 transition-perceptual shadow-huge relative overflow-hidden"
        >
            <div className="space-y-8 relative z-10">
                <div className={`flex justify-between items-center ${isRtl ? "flex-row-reverse" : ""}`}>
                    <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center">
                        {ex.status === "completed" ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Edit3 className="w-7 h-7 text-white/20 group-hover:text-moroccan-blue transition-colors" />}
                    </div>
                </div>
                <div className="space-y-3">
                    <span className={`text-[8px] font-bold uppercase tracking-[0.4em] px-3 py-1.5 rounded-full glass border border-white/5 ${ex.status === "available" ? 'text-moroccan-blue' : 'text-white/20'}`}>
                        {ex.status}
                    </span>
                    <h4 className="text-3xl font-display font-medium text-white/90 leading-tight group-hover:text-white transition-colors">{ex.title}</h4>
                </div>
            </div>

            <button
                disabled={ex.status === "locked"}
                onClick={onStart}
                className={`mt-12 flex items-center gap-3 w-full p-6 rounded-2xl border border-white/5 text-[10px] font-bold uppercase tracking-[0.5em] transition-perceptual disabled:opacity-30 ${isRtl ? "flex-row-reverse text-right" : "text-left"} ${ex.status === "available" ? 'bg-white/5 text-white/40 group-hover:bg-moroccan-blue group-hover:text-white' : 'text-white/10 cursor-not-allowed'}`}
            >
                {ex.status === "locked" ? <Lock className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                <span>{ex.status === "locked" ? (isRtl ? "الوحدة مقفلة" : "Unit Locked") : (isRtl ? "بدء التمرين" : "Launch Mission")}</span>
            </button>

            <div className="absolute top-0 right-0 p-8 text-white/[0.01] font-display text-8xl font-bold select-none italic pointer-events-none">{index + 1}</div>
        </motion.div>
    );
}

function MediaCard({ res, index, isRtl }: { res: any; index: number; isRtl: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-dark border border-white/5 rounded-[3rem] p-10 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-perceptual shadow-edge shadow-black/40 ${isRtl ? "flex-row-reverse" : ""}`}
        >
            <div className={`flex items-center gap-8 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
                <div className="w-20 h-20 rounded-[2rem] glass-dark border border-white/10 flex items-center justify-center text-white/10 group-hover:bg-moroccan-blue group-hover:text-white group-hover:shadow-huge group-hover:shadow-moroccan-blue/20 transition-perceptual">
                    <PlayCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-3xl font-display font-medium text-white/90 group-hover:text-white transition-colors">{res.title}</h4>
                    <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <span>Audio Module</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span>{res.duration}</span>
                    </div>
                </div>
            </div>
            <div className="w-14 h-14 rounded-2xl glass border border-white/5 flex items-center justify-center text-white/10 group-hover:text-white group-hover:border-white/20 transition-perceptual">
                <Download className="w-6 h-6" />
            </div>
        </motion.div>
    );
}

function VocabularyBankGallery({ vocabulary, isRtl, t }: { vocabulary: VocabularyItem[], isRtl: boolean, t: any }) {
    const [speakingWord, setSpeakingWord] = useState<string | null>(null);

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
        <div className="space-y-8 mt-16">
            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-moroccan-blue animate-pulse" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-moroccan-blue">{t("vocabulary")} Bank</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {vocabulary.map((item, i) => (
                    <motion.div
                        key={item.word}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group rounded-[3rem] glass-dark border border-white/5 hover:border-moroccan-blue/30 transition-perceptual cursor-pointer relative overflow-hidden flex flex-col shadow-edge shadow-black/40"
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
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">Image Pending</span>
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
        </div>
    );
}
