import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, CheckCircle2, XCircle, Sparkles, GraduationCap, ArrowLeft, Lightbulb } from "lucide-react";
import { useLanguage } from "context/LanguageContext";

interface GrammarTopic {
    id: string;
    title: string;
    unit: number;
    category: string;
    explanation: string;
    structure: string;
    examples: { sentence: string; highlight: string }[];
    practice: { question: string; options: string[]; correct: number }[];
    tips: string[];
}

const grammarTopics: GrammarTopic[] = [
    {
        id: "wh-questions",
        title: "Wh- Questions",
        unit: 1,
        category: "Questions",
        explanation: "Wh- questions are used to ask for specific information. They start with question words: What, Where, When, Who, Why, Which, How.",
        structure: "Wh- word + do/does + subject + base verb + ?",
        examples: [
            { sentence: "What do you do?", highlight: "What" },
            { sentence: "Where does she work?", highlight: "Where" },
            { sentence: "When do they start school?", highlight: "When" },
            { sentence: "Who is your favorite teacher?", highlight: "Who" },
            { sentence: "Why do you like this job?", highlight: "Why" },
        ],
        practice: [
            { question: "___ do you do? I am an engineer.", options: ["Where", "What", "When", "Why"], correct: 1 },
            { question: "___ does he live? He lives in Casablanca.", options: ["What", "Who", "Where", "When"], correct: 2 },
            { question: "___ does school start? At 8 o'clock.", options: ["What", "Where", "When", "Why"], correct: 2 },
        ],
        tips: [
            "Use 'do' with I, you, we, they.",
            "Use 'does' with he, she, it.",
            "The main verb stays in its base form after do/does.",
        ],
    },
    {
        id: "want-to-be",
        title: "I want to be a...",
        unit: 1,
        category: "Expressions",
        explanation: "Use 'I want to be a...' to talk about your dream job or future profession. It expresses a desire for a future career.",
        structure: "Subject + want(s) + to be + a/an + profession",
        examples: [
            { sentence: "I want to be a mechanic.", highlight: "want to be" },
            { sentence: "She wants to be a nurse.", highlight: "wants to be" },
            { sentence: "They want to be engineers.", highlight: "want to be" },
        ],
        practice: [
            { question: "I ___ to be a graphic designer.", options: ["want", "wants", "wanting", "wanted"], correct: 0 },
            { question: "He ___ to be a journalist.", options: ["want", "wants", "wanting", "to want"], correct: 1 },
        ],
        tips: [
            "Use 'want' with I, you, we, they.",
            "Use 'wants' with he, she, it.",
            "Don't forget 'a' or 'an' before the job name!",
        ],
    },
    {
        id: "good-at",
        title: "Be good at + -ing",
        unit: 1,
        category: "Expressions",
        explanation: "Use 'be good at' to talk about skills and abilities. The verb that follows must end in -ing.",
        structure: "Subject + be + good at + verb-ing",
        examples: [
            { sentence: "I am good at drawing.", highlight: "good at drawing" },
            { sentence: "She is good at cooking.", highlight: "good at cooking" },
            { sentence: "Are you good at swimming?", highlight: "good at swimming" },
        ],
        practice: [
            { question: "She is good at ___ (sing).", options: ["sing", "singing", "to sing", "sings"], correct: 1 },
            { question: "Are you good at ___ (draw)?", options: ["drawing", "draw", "to draw", "draws"], correct: 0 },
        ],
        tips: [
            "Always use -ing after 'good at'.",
            "You can also say 'bad at' for things you can't do well.",
        ],
    },
    {
        id: "countable-uncountable",
        title: "Countable & Uncountable Nouns",
        unit: 2,
        category: "Nouns",
        explanation: "Countable nouns can be counted individually (one apple, two eggs). Uncountable nouns cannot be counted directly (milk, water, cheese) — they represent substances, liquids, or abstract concepts.",
        structure: "Countable: a/an + noun, number + noun(s) | Uncountable: some + noun (no plural)",
        examples: [
            { sentence: "I have two apples. (countable)", highlight: "two apples" },
            { sentence: "I need some milk. (uncountable)", highlight: "some milk" },
            { sentence: "There are three eggs in the fridge.", highlight: "three eggs" },
            { sentence: "Can I have some water?", highlight: "some water" },
        ],
        practice: [
            { question: "Is 'bread' countable or uncountable?", options: ["Countable", "Uncountable"], correct: 1 },
            { question: "Is 'banana' countable or uncountable?", options: ["Countable", "Uncountable"], correct: 0 },
            { question: "Is 'sugar' countable or uncountable?", options: ["Countable", "Uncountable"], correct: 1 },
            { question: "Is 'tomato' countable or uncountable?", options: ["Countable", "Uncountable"], correct: 0 },
        ],
        tips: [
            "Uncountable nouns never take 'a/an' or a number.",
            "Use quantity words: a cup of, a glass of, a slice of.",
            "Some nouns can be both! 'Two coffees' = two cups of coffee.",
        ],
    },
    {
        id: "some-any",
        title: "Some vs Any",
        unit: 2,
        category: "Determiners",
        explanation: "'Some' is used in positive sentences and offers. 'Any' is used in questions and negative sentences.",
        structure: "Positive: some + noun | Negative: not + any + noun | Question: any + noun?",
        examples: [
            { sentence: "I have some cheese.", highlight: "some" },
            { sentence: "Do you have any milk?", highlight: "any" },
            { sentence: "I don't have any money.", highlight: "any" },
            { sentence: "Would you like some tea? (offer)", highlight: "some" },
        ],
        practice: [
            { question: "There are ___ eggs in the kitchen.", options: ["any", "some", "a", "the"], correct: 1 },
            { question: "I don't have ___ water.", options: ["some", "any", "a", "the"], correct: 1 },
            { question: "Do you have ___ brothers?", options: ["some", "any", "a", "much"], correct: 1 },
        ],
        tips: [
            "Use 'some' when offering: 'Would you like some cake?'",
            "Use 'any' when you don't know: 'Is there any juice?'",
            "'Some' can also be used in requests: 'Can I have some water?'",
        ],
    },
    {
        id: "how-much-often",
        title: "How much / How often",
        unit: 3,
        category: "Questions",
        explanation: "'How much' asks about price or quantity of uncountable nouns. 'How often' asks about frequency.",
        structure: "How much + is/are + noun? | How often + do/does + subject + verb?",
        examples: [
            { sentence: "How much is this phone?", highlight: "How much" },
            { sentence: "How much are these earbuds?", highlight: "How much" },
            { sentence: "How often do you play video games?", highlight: "How often" },
            { sentence: "How often does she go to the gym?", highlight: "How often" },
        ],
        practice: [
            { question: "___ is this laptop? It's 5000 Dirhams.", options: ["How often", "How much", "How many", "How long"], correct: 1 },
            { question: "___ do you use your phone? Every day.", options: ["How much", "How often", "How many", "How"], correct: 1 },
        ],
        tips: [
            "Frequency words: always, usually, often, sometimes, rarely, never.",
            "'How much' for uncountable, 'How many' for countable.",
        ],
    },
    {
        id: "possessive-adjectives",
        title: "Possessive Adjectives",
        unit: 3,
        category: "Adjectives",
        explanation: "Possessive adjectives show ownership. They come before a noun.",
        structure: "Possessive adjective + noun",
        examples: [
            { sentence: "This is my phone.", highlight: "my" },
            { sentence: "Where is your laptop?", highlight: "your" },
            { sentence: "His bedroom is upstairs.", highlight: "His" },
            { sentence: "Their school is near the market.", highlight: "Their" },
        ],
        practice: [
            { question: "Is this ___ book? (you)", options: ["you", "your", "yours", "you're"], correct: 1 },
            { question: "___ name is Ahmed. (he)", options: ["He", "Him", "His", "Her"], correct: 2 },
        ],
        tips: [
            "I → my, You → your, He → his, She → her",
            "It → its, We → our, They → their",
            "Don't confuse 'its' (possessive) with 'it's' (it is)!",
        ],
    },
    {
        id: "should-shouldnt",
        title: "Should / Shouldn't (Advice)",
        unit: 4,
        category: "Modal Verbs",
        explanation: "'Should' is used to give advice or recommendations. 'Should' is used for advice or recommendations. 'Shouldn't' is used for negative advice — things you recommend against doing.",
        structure: "Subject + should/shouldn't + base verb",
        examples: [
            { sentence: "You should see a doctor.", highlight: "should" },
            { sentence: "She shouldn't eat too much sugar.", highlight: "shouldn't" },
            { sentence: "He should rest and drink water.", highlight: "should" },
            { sentence: "You shouldn't stay up late.", highlight: "shouldn't" },
        ],
        practice: [
            { question: "You have a fever. You ___ stay in bed.", options: ["should", "shouldn't", "can", "would"], correct: 0 },
            { question: "He has a toothache. He ___ eat candy.", options: ["should", "shouldn't", "must", "could"], correct: 1 },
            { question: "She is tired. She ___ get some sleep.", options: ["shouldn't", "won't", "should", "can't"], correct: 2 },
        ],
        tips: [
            "The verb after should/shouldn't is always in base form.",
            "Should is softer than 'must' — it's advice, not an order.",
            "You can also ask: 'Should I see a doctor?'",
        ],
    },
    {
        id: "demonstrative-pronouns",
        title: "Demonstrative Pronouns",
        unit: 5,
        category: "Pronouns",
        explanation: "Demonstrative pronouns point to specific things. 'This/these' for things near you. 'That/those' for things far from you.",
        structure: "This/That + singular noun | These/Those + plural noun",
        examples: [
            { sentence: "This shirt is nice.", highlight: "This" },
            { sentence: "That building is very tall.", highlight: "That" },
            { sentence: "These shoes are comfortable.", highlight: "These" },
            { sentence: "Those mountains are beautiful.", highlight: "Those" },
        ],
        practice: [
            { question: "___ pants I'm wearing are new. (near)", options: ["This", "That", "These", "Those"], correct: 2 },
            { question: "Look at ___ bird in the sky! (far)", options: ["this", "that", "these", "those"], correct: 1 },
            { question: "___ is my favorite book. (near, singular)", options: ["This", "That", "These", "Those"], correct: 0 },
        ],
        tips: [
            "Near + Singular = This | Near + Plural = These",
            "Far + Singular = That | Far + Plural = Those",
            "They can be used as adjectives (this book) or pronouns (this is mine).",
        ],
    },
    {
        id: "prepositions-location",
        title: "Prepositions of Location",
        unit: 6,
        category: "Prepositions",
        explanation: "Prepositions of location describe WHERE something is. They tell us the position of one thing in relation to another.",
        structure: "Subject + be + preposition + noun/place",
        examples: [
            { sentence: "The book is on the table.", highlight: "on" },
            { sentence: "The cat is under the chair.", highlight: "under" },
            { sentence: "The bank is between the school and the market.", highlight: "between" },
            { sentence: "Morocco is in North Africa.", highlight: "in" },
        ],
        practice: [
            { question: "The school is ___ the park and the mosque.", options: ["on", "in", "between", "under"], correct: 2 },
            { question: "The Sahara Desert is ___ Africa.", options: ["on", "in", "at", "between"], correct: 1 },
            { question: "The picture is ___ the wall.", options: ["in", "on", "at", "under"], correct: 1 },
        ],
        tips: [
            "IN: countries, cities, rooms (in Morocco, in the kitchen)",
            "ON: surfaces (on the table, on the wall)",
            "AT: specific points (at school, at the bus stop)",
            "BETWEEN: two things | NEXT TO: beside something",
        ],
    },
];

export default function GrammarPage() {
    const { t, language } = useLanguage();
    const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
    const [practiceMode, setPracticeMode] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);

    const categories = Array.from(new Set(grammarTopics.map(t => t.category)));

    const startPractice = (topic: GrammarTopic) => {
        setSelectedTopic(topic);
        setPracticeMode(true);
        setCurrentQ(0);
        setScore(0);
        setAnswered(null);
        setShowResults(false);
    };

    const handleAnswer = (idx: number) => {
        if (answered !== null || !selectedTopic) return;
        setAnswered(idx);
        if (idx === selectedTopic.practice[currentQ].correct) setScore(s => s + 1);
        setTimeout(() => {
            if (currentQ < selectedTopic.practice.length - 1) {
                setCurrentQ(q => q + 1);
                setAnswered(null);
            } else { setShowResults(true); }
        }, 1200);
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
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{grammarTopics.length} {t("tips_rules")}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-display font-medium text-white tracking-tight"
                >
                    {t("grammar")} <span className="italic text-moroccan-blue">{t("hub")}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-light leading-relaxed text-white/80"
                >
                    {t("grammar_desc")}
                </motion.p>
            </header>

            <div className="flex-grow">
                {!selectedTopic && (
                    <div className="space-y-24">
                        {categories.map((cat, catIdx) => (
                            <motion.section
                                key={cat}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIdx * 0.1 }}
                                className="space-y-10"
                            >
                                <div className="flex items-center gap-6">
                                    <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">{cat}</h2>
                                    <div className="flex-grow h-[1px] bg-white/5" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {grammarTopics.filter(t => t.category === cat).map((topic, idx) => (
                                        <motion.div
                                            key={topic.id}
                                            whileHover={{ y: -8, scale: 1.01 }}
                                            className="group cursor-pointer p-10 rounded-[3rem] glass-dark border border-white/5 hover:border-moroccan-blue/30 transition-perceptual relative overflow-hidden"
                                            onClick={() => setSelectedTopic(topic)}
                                        >
                                            <div className="flex items-start justify-between relative z-10">
                                                <div className="space-y-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-moroccan-blue/60 group-hover:text-moroccan-blue transition-colors">{t("unit")} {topic.unit}</span>
                                                    <h3 className="text-3xl font-display font-medium text-white group-hover:text-white transition-colors">{topic.title}</h3>
                                                    <p className="text-base text-white/30 leading-relaxed line-clamp-2 max-w-[90%] font-light">{topic.explanation}</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/10 group-hover:bg-moroccan-blue group-hover:text-white transition-perceptual">
                                                    <ChevronRight className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                )}

                {selectedTopic && !practiceMode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-16 max-w-5xl"
                    >
                        <button
                            onClick={() => setSelectedTopic(null)}
                            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-moroccan-blue/60 hover:text-moroccan-blue transition-perceptual"
                        >
                            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${language === "ar" ? "rotate-180 group-hover:translate-x-1" : ""}`} />
                            {t("back_to_curriculum")}
                        </button>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-moroccan-blue">{t("unit")} {selectedTopic.unit} • {selectedTopic.category}</span>
                                <div className="h-[1px] w-20 bg-moroccan-blue/20" />
                            </div>
                            <h2 className="text-6xl md:text-8xl font-display font-medium text-white tracking-tight leading-none">{selectedTopic.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Summary & Explanation */}
                            <div className="lg:col-span-12 space-y-10">
                                <div className="p-10 rounded-[3rem] glass border-white/5 space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-white/5 font-display text-9xl font-bold select-none italic pointer-events-none">01</div>
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-5 h-5 text-moroccan-blue" />
                                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">{t("explanation")}</h3>
                                    </div>
                                    <p className="text-xl md:text-3xl text-white/80 leading-snug font-light max-w-3xl">{selectedTopic.explanation}</p>

                                    <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-moroccan-blue/50">Structural Pattern</span>
                                        <div className="glass-dark px-10 py-8 rounded-3xl border border-white/5 text-2xl md:text-3xl font-mono text-moroccan-blue tracking-tight shadow-3xl">
                                            {selectedTopic.structure}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Examples & Tips */}
                            <div className="lg:col-span-7 space-y-10">
                                <div className="p-10 rounded-[3rem] glass-dark border border-white/5 space-y-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-white/5 font-display text-9xl font-bold select-none italic pointer-events-none">02</div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="w-5 h-5 text-moroccan-blue" />
                                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">In Practice</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedTopic.examples.map((ex, i) => (
                                            <motion.div key={i} whileHover={{ x: 5 }} className="p-6 rounded-2xl glass border border-white/5 flex items-center gap-6 group">
                                                <div className="w-10 h-10 rounded-xl bg-moroccan-blue/5 flex items-center justify-center text-moroccan-blue font-bold text-sm tracking-tighter group-hover:bg-moroccan-blue group-hover:text-white transition-perceptual">
                                                    {String(i + 1).padStart(2, '0')}
                                                </div>
                                                <p className="text-xl text-white/80 font-light">{ex.sentence}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-10">
                                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-moroccan-blue/10 to-transparent border border-moroccan-blue/20 space-y-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-moroccan-blue/5 font-display text-9xl font-bold select-none italic pointer-events-none">03</div>
                                    <div className="flex items-center gap-3">
                                        <Lightbulb className="w-5 h-5 text-moroccan-blue" />
                                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Key Tips</h3>
                                    </div>
                                    <ul className="space-y-6">
                                        {selectedTopic.tips.map((tip, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="w-2 h-2 rounded-full bg-moroccan-blue mt-2.5 flex-shrink-0" />
                                                <p className="text-lg text-white/70 leading-relaxed font-light">{tip}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Master Call to Action */}
                        <motion.button
                            whileHover={{ scale: 1.01, y: -4 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => startPractice(selectedTopic)}
                            className="w-full relative group"
                        >
                            <div className="absolute inset-0 bg-moroccan-blue rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative p-12 rounded-[3.5rem] bg-moroccan-blue text-white overflow-hidden flex flex-col items-center gap-4 transition-perceptual shadow-3xl">
                                <GraduationCap className="w-12 h-12 mb-2" />
                                <h4 className="text-2xl md:text-3xl font-display font-medium tracking-tight">Ready to Master this Rule?</h4>
                                <p className="text-white/60 text-sm font-bold uppercase tracking-[0.5em]">Start the Interactive Quiz</p>
                                <ChevronRight className="absolute right-10 top-1/2 -translate-y-1/2 w-12 h-12 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-perceptual" />
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Premium Practice Quiz Overlay */}
            <AnimatePresence>
                {practiceMode && selectedTopic && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="max-w-3xl w-full glass-dark border border-white/10 rounded-[4rem] p-12 md:p-16 relative overflow-hidden shadow-edge shadow-black/80"
                        >
                            {!showResults ? (
                                <div className="relative z-10 space-y-12">
                                    <header className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-moroccan-blue">Interactive Lesson</span>
                                            <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest">{selectedTopic.title}</h4>
                                        </div>
                                        <button
                                            onClick={() => { setPracticeMode(false); setSelectedTopic(null); }}
                                            className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/20 hover:text-white transition-colors"
                                        >
                                            <XCircle className="w-6 h-6" />
                                        </button>
                                    </header>

                                    <div className="space-y-8">
                                        <div className="flex justify-between items-end mb-2">
                                            <p className="text-sm font-bold tracking-widest text-white/20 uppercase">Stage {currentQ + 1} of {selectedTopic.practice.length}</p>
                                            <div className="text-moroccan-blue font-display text-4xl">{((currentQ + 1) / selectedTopic.practice.length * 100).toFixed(0)}%</div>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-white/5 relative overflow-hidden">
                                            <motion.div
                                                className="absolute top-0 left-0 h-full bg-moroccan-blue shadow-lg shadow-moroccan-blue/40"
                                                animate={{ width: `${((currentQ + 1) / selectedTopic.practice.length) * 100}%` }}
                                                transition={{ duration: 0.8, ease: "circOut" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-tight tracking-tight">
                                            {selectedTopic.practice[currentQ].question}
                                        </h3>

                                        <div className="grid grid-cols-1 gap-5">
                                            {selectedTopic.practice[currentQ].options.map((opt, i) => {
                                                const isCorrect = i === selectedTopic.practice[currentQ].correct;
                                                const isSelected = answered === i;

                                                return (
                                                    <motion.button
                                                        key={i}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleAnswer(i)}
                                                        disabled={answered !== null}
                                                        className={`w-full p-8 rounded-3xl border text-left transition-perceptual flex items-center gap-6 relative overflow-hidden group ${answered === null
                                                            ? "glass-dark border-white/5 hover:border-moroccan-blue/40 hover:bg-white/5"
                                                            : isCorrect
                                                                ? "bg-green-500/10 border-green-500/30 text-green-400"
                                                                : isSelected
                                                                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                                                                    : "opacity-20 grayscale border-white/5"
                                                            }`}
                                                    >
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-perceptual ${answered === null
                                                            ? "glass text-white/20 group-hover:text-moroccan-blue"
                                                            : isCorrect ? "bg-green-500 text-black" : isSelected ? "bg-red-500 text-white" : "bg-white/5 text-white/10"
                                                            }`}>
                                                            {answered !== null && isCorrect ? <CheckCircle2 className="w-6 h-6" /> :
                                                                answered !== null && isSelected ? <XCircle className="w-6 h-6" /> :
                                                                    String.fromCharCode(65 + i)}
                                                        </div>
                                                        <span className="text-xl md:text-2xl font-light">{opt}</span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10 space-y-10 relative z-10 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center shadow-3xl ${score >= selectedTopic.practice.length / 2 ? "bg-moroccan-blue" : "bg-white/5 border border-white/10"}`}
                                    >
                                        <GraduationCap className={`w-20 h-20 ${score >= selectedTopic.practice.length / 2 ? "text-white" : "text-white/20"}`} />
                                    </motion.div>
                                    <div className="space-y-4">
                                        <h3 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tighter">
                                            {score === selectedTopic.practice.length ? "Mastery Achieved" : score >= selectedTopic.practice.length / 2 ? "Well Passed" : "Room to Grow"}
                                        </h3>
                                        <p className="text-white/30 text-xl font-light">
                                            You mastered <span className="text-white font-medium">{score} of {selectedTopic.practice.length}</span> patterns.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-sm pt-4">
                                        <button
                                            onClick={() => startPractice(selectedTopic)}
                                            className="flex-grow p-6 glass text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-perceptual"
                                        >
                                            Refine Skills
                                        </button>
                                        <button
                                            onClick={() => { setPracticeMode(false); setSelectedTopic(null); }}
                                            className="flex-grow p-6 bg-moroccan-blue text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-3xl shadow-moroccan-blue/20 hover:scale-105 transition-transform"
                                        >
                                            Return to Hub
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-moroccan-blue/10 rounded-full blur-[120px] pointer-events-none" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
