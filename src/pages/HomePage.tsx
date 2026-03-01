import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Utensils, Globe, Heart, Shirt, Monitor, ChevronRight, BookOpen, Brain, Trophy, Zap, Star, Target, Sparkles, AudioLines, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { spotlightCurriculum } from "lib/curriculum-data";
import { useLanguage } from "context/LanguageContext";

const iconMap: Record<string, any> = {
    Jobs: Briefcase,
    Food: Utensils,
    "Online Activities": Monitor,
    Health: Heart,
    Clothing: Shirt,
    Geography: Globe,
};

const colorMap: Record<string, string> = {
    blue: "moroccan-blue",
    orange: "orange-500",
    purple: "purple-500",
    red: "rose-500",
    mocha: "amber-600",
    green: "emerald-500",
};

export default function HomePage() {
    const { t, language } = useLanguage();

    // Stats calculation
    const totalExercises = spotlightCurriculum.reduce((acc, u) => acc + u.exercises.length, 0);
    const totalQuestions = spotlightCurriculum.reduce((acc, u) => acc + u.exercises.reduce((a, e) => a + (e.questions?.length || 0), 0), 0);
    const totalVocab = spotlightCurriculum.reduce((acc, u) => acc + u.vocabulary.length, 0);

    const quickTips = [
        { icon: Brain, tip: language === "ar" ? "تدرب لمدة 15 دقيقة يوميًا للحصول على أفضل النتائج" : language === "fr" ? "Pratiquez 15 minutes par jour pour les meilleurs résultats" : "Practice 15 minutes daily for the best results", color: "text-purple-400" },
        { icon: AudioLines, tip: language === "ar" ? "استخدم مركز الذكاء الاصطناعي لممارسة التحدث بصوت عالٍ" : language === "fr" ? "Utilisez le AI Hub pour pratiquer la parole à haute voix" : "Use the AI Hub to practice speaking out loud", color: "text-blue-400" },
        { icon: Star, tip: language === "ar" ? "أكمل جميع التمارين في وحدة لإتقانها" : language === "fr" ? "Complétez tous les exercices d'une unité pour la maîtriser" : "Complete all exercises in a unit to master it", color: "text-amber-400" },
        { icon: Target, tip: language === "ar" ? "ركز على قواعد اللغة قبل القيام بالتمارين" : language === "fr" ? "Concentrez-vous sur les règles de grammaire avant de faire des exercices" : "Focus on grammar rules before doing exercises", color: "text-emerald-400" },
    ];

    const isRtl = language === "ar";

    return (
        <div className={`space-y-32 pb-32 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
            {/* Hero Welcome Section */}
            <header className="relative pt-16 md:pt-28 space-y-12 max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center space-x-3 px-6 py-2 rounded-full glass border-white/5 mx-auto"
                >
                    <Sparkles className="w-4 h-4 text-moroccan-blue animate-pulse" />
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
                        Spotlight 2 {t("curriculum")} • AI Powered 2026
                    </span>
                </motion.div>

                <div className="space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-[10rem] lg:text-[12rem] font-display font-medium leading-[0.85] tracking-tight text-white"
                    >
                        {t("master")}<br />
                        <span className="text-moroccan-blue italic">{t("english")}</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-3xl max-w-3xl mx-auto font-light leading-relaxed text-white/30"
                    >
                        {t("hero_desc")}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-6 pt-4"
                >
                    <Link to="/vocabulary" className="px-10 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-perceptual shadow-huge shadow-white/5 text-lg">
                        {t("start_journey")}
                    </Link>
                    <button onClick={() => document.getElementById('units')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 glass text-white rounded-full font-bold hover:bg-white/5 transition-perceptual text-lg border border-white/5">
                        {t("explore_units")}
                    </button>
                </motion.div>
            </header>

            {/* Stats Section with Glass Cards */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
                <StatCard icon={BookOpen} value={`${spotlightCurriculum.length}`} label={t("units")} color="text-moroccan-blue" delay={0} />
                <StatCard icon={Trophy} value={`${totalExercises}`} label={t("exercises")} color="text-orange-400" delay={0.1} />
                <StatCard icon={Brain} value={`${totalQuestions}`} label={t("questions")} color="text-purple-400" delay={0.2} />
                <StatCard icon={Zap} value={`${totalVocab}`} label={t("vocab_words")} color="text-emerald-400" delay={0.3} />
            </motion.section>

            {/* Interactive Units Grid */}
            <section id="units" className="space-y-16 max-w-7xl mx-auto scroll-mt-32">
                <div className={`flex flex-col md:flex-row items-end justify-between gap-8 ${isRtl ? "md:flex-row-reverse" : ""}`}>
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tight">{t("all_units")}</h2>
                        <p className="text-white/20 text-xl font-light">{t("path_excellence")}</p>
                    </div>
                    <div className="px-6 py-3 rounded-full glass-dark border border-white/5 flex items-center gap-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-moroccan-blue shadow-lg shadow-moroccan-blue/50 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">{spotlightCurriculum.length} {t("units")} Available</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {spotlightCurriculum.map((unit, idx) => (
                        <UnitCard key={unit.id} unit={unit} index={idx} t={t} language={language} isRtl={isRtl} />
                    ))}
                </div>
            </section>

            {/* Dual Featured Navigation */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <FeaturedNavCard
                    href="/vocabulary"
                    title={t("vocabulary")}
                    description={t("vocabulary_desc") || "Deep lexical immersion with HD visuals and native phonetics for every unit."}
                    icon={GraduationCap}
                    stats={`${totalVocab}+ words`}
                    color="bg-emerald-500"
                    language={language}
                    isRtl={isRtl}
                    t={t}
                />
                <FeaturedNavCard
                    href="/grammar"
                    title={t("grammar")}
                    description={t("grammar_desc") || "Master English syntax with visual breakdowns and adaptive training modules."}
                    icon={Brain}
                    stats="10 Topics"
                    color="bg-moroccan-blue"
                    language={language}
                    isRtl={isRtl}
                    t={t}
                />
            </section>

            {/* Prestige AI Call-to-Action */}
            <section className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group w-full rounded-[4.5rem] p-12 md:p-24 glass border-white/5 overflow-hidden shadow-edge shadow-black/60"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-moroccan-blue/5 rounded-full blur-[160px] pointer-events-none" />

                    <div className={`relative z-10 max-w-3xl space-y-12 ${isRtl ? "mr-auto text-right" : "text-left"}`}>
                        <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                            <div className="w-16 h-16 rounded-[2rem] glass border border-moroccan-blue/20 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-moroccan-blue" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-moroccan-blue">{t("neural_coach")}</span>
                        </div>

                        <h2 className="text-6xl md:text-9xl font-display font-medium leading-[0.9] text-white tracking-tighter">
                            {t("speak_native")}
                        </h2>

                        <p className="text-white/30 text-2xl leading-relaxed font-light max-w-2xl">
                            {t("ai_coach_desc")}
                        </p>

                        <Link
                            to="/ai-hub"
                            className="group inline-flex items-center gap-6 px-14 py-8 bg-white text-black rounded-full font-bold hover:scale-105 transition-perceptual shadow-hugh hover:shadow-moroccan-blue/40"
                        >
                            <span className="text-xl">{t("launch_ai")}</span>
                            <ChevronRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : ""}`} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Modern Tips Grid */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 md:p-24 rounded-[4.5rem] glass-dark border border-white/5 relative overflow-hidden max-w-7xl mx-auto"
            >
                <div className="relative z-10 space-y-16">
                    <div className={`flex items-center gap-6 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.8em] text-white/30">{t("study_tips")}</h2>
                        <div className="flex-grow h-[1px] bg-white/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {quickTips.map((tip, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] glass border border-white/5 hover:border-white/10 transition-perceptual relative overflow-hidden">
                                <div className={`w-14 h-14 rounded-2xl glass-dark border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform ${tip.color}`}>
                                    <tip.icon className="w-6 h-6" />
                                </div>
                                <p className="text-xl text-white/40 group-hover:text-white/90 leading-snug transition-colors font-light">
                                    {tip.tip}
                                </p>
                                <div className="absolute top-0 right-0 p-4 text-white/[0.02] font-display text-7xl font-bold select-none italic">0{i + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

function StatCard({ icon: Icon, value, label, color, delay }: { icon: any; value: string; label: string; color: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="p-10 rounded-[3.5rem] glass-dark hover:bg-white/[0.03] transition-perceptual text-center border border-white/5 group relative overflow-hidden"
        >
            <div className={`w-16 h-16 rounded-[1.5rem] glass flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform ${color} shadow-lg shadow-black/50`}>
                <Icon className="w-7 h-7" />
            </div>
            <div className="text-6xl md:text-7xl font-display font-medium text-white mb-3 tracking-tighter leading-none">{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">{label}</div>
        </motion.div>
    );
}

function UnitCard({ unit, index, t, language, isRtl }: { unit: any; index: number; t: any; language: string; isRtl: boolean }) {
    const Icon = iconMap[unit.title] || Globe;
    const themeColor = colorMap[unit.theme] || "moroccan-blue";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -12 }}
            className="group relative h-full"
        >
            <Link to={`/unit/${unit.id}`}>
                <div className={`p-12 rounded-[3.5rem] glass-dark border border-white/5 hover:border-moroccan-blue/30 transition-perceptual overflow-hidden h-full flex flex-col justify-between shadow-huge relative`}>
                    <div className="absolute top-0 right-0 p-12 text-white/[0.02] font-display text-[12rem] font-bold select-none italic pointer-events-none">{unit.id}</div>

                    <div className="relative z-10 flex flex-col items-start gap-10">
                        <div className={`w-20 h-20 rounded-[2rem] bg-${themeColor} flex items-center justify-center text-white group-hover:scale-110 transition-perceptual shadow-3xl shadow-black/80`}>
                            <Icon className="w-10 h-10" />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-display font-medium text-white group-hover:text-moroccan-blue transition-colors leading-tight">
                                {t("unit")} {unit.id}: {unit.title}
                            </h3>
                            <p className="text-xl text-white/30 leading-relaxed font-light line-clamp-3">
                                {unit.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="px-5 py-2 rounded-full glass border border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/40">
                                {unit.exercises.length} {t("exercises")}
                            </span>
                            <span className="px-5 py-2 rounded-full glass border border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/40">
                                {unit.vocabulary.length} {t("vocab_words")}
                            </span>
                        </div>
                    </div>

                    <div className={`flex items-center justify-between border-t border-white/5 pt-10 mt-12 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <div className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-moroccan-blue group-hover:translate-x-2 transition-transform ${isRtl ? "flex-row-reverse group-hover:-translate-x-2" : ""}`}>
                            <span>{t("enter_unit")}</span>
                            <ChevronRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function FeaturedNavCard({ href, title, description, icon: Icon, stats, color, language, isRtl, t }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group"
        >
            <Link to={href}>
                <div className={`p-14 rounded-[4rem] glass-dark border border-white/5 hover:border-white/10 transition-perceptual h-full space-y-12 relative overflow-hidden shadow-edge shadow-black/40`}>
                    <div className="absolute top-0 right-0 p-12 text-white/[0.01] font-display text-[10rem] font-bold select-none italic pointer-events-none">MOD</div>

                    <div className={`w-28 h-28 rounded-[2.5rem] ${color} flex items-center justify-center text-white group-hover:scale-110 transition-perceptual shadow-huge`}>
                        <Icon className="w-14 h-14" />
                    </div>
                    <div className="space-y-6 relative z-10">
                        <div className={`flex items-baseline gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                            <h3 className="text-5xl md:text-6xl font-display font-medium text-white tracking-tight">{title}</h3>
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">{stats}</span>
                        </div>
                        <p className="text-white/30 text-2xl leading-relaxed font-light max-w-lg">{description}</p>
                    </div>
                    <div className={`flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.5em] text-moroccan-blue group-hover:translate-x-3 transition-transform ${isRtl ? "flex-row-reverse group-hover:-translate-x-3" : ""}`}>
                        <span>{t("explore_hub")}</span>
                        <ChevronRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
