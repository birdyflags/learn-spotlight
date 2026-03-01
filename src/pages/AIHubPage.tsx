import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Volume2, Loader2, StopCircle, BookOpen, Lightbulb, Globe, Stethoscope, Shirt, MapPin, Trash2, Sparkles, GraduationCap } from "lucide-react";
import { useLanguage } from "context/LanguageContext";

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
    isLoading?: boolean;
}

const suggestedPrompts = [
    { icon: BookOpen, text: "Help me with Unit 1: Jobs" },
    { icon: Lightbulb, text: "Explain some vs any grammar rule" },
    { icon: Globe, text: "Translate 'thank you' to French" },
    { icon: Stethoscope, text: "Quiz me on health vocabulary" },
    { icon: Shirt, text: "What are demonstrative pronouns?" },
    { icon: MapPin, text: "Tell me about Morocco's geography" },
];

declare global {
    interface Window {
        puter: any;
    }
}

export default function AIHubPage() {
    const { t, language } = useLanguage();

    const [messages, setMessages] = useState<Message[]>([
        { id: "welcome", text: language === "ar" ? "مرحبًا! أنا مدربك الخاص لمنهج Spotlight 2. اسألني عن أي وحدة أو قاعدة لغوية أو قل 'اختبرني' للتدريب! 📚" : "Hello! I'm your private Spotlight 2 tutor. Ask me about any unit, grammar rule, vocabulary, or say 'quiz me' to practice! 📚", sender: "ai", timestamp: new Date() }
    ]);
    const [isRecording, setIsRecording] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const scrollToBottom = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

    const speak = useCallback((text: string) => {
        if (!("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = language === "ar" ? "ar-XA" : "en-US";
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
    }, [language]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isProcessing) return;

        const userMsg: Message = { id: `u-${Date.now()}`, text: text.trim(), sender: "user", timestamp: new Date() };
        const loadingMsg: Message = { id: "loading", text: "", sender: "ai", timestamp: new Date(), isLoading: true };

        setMessages(prev => [...prev, userMsg, loadingMsg]);
        setInputText("");
        setIsProcessing(true);

        try {
            if (!window.puter) {
                throw new Error("Puter.js not loaded yet...");
            }

            const systemPrompt = `You are "Spotlight Coach", a world-class AI English Tutor specialized in the "Spotlight 2" Moroccan curriculum (8th Grade). 
            Units: Jobs, Health, Food, Tech, Fashion, Nature, Leisure, School, Travel.
            Current UI language: ${language === 'ar' ? 'Arabic' : 'English'}. 
            Keep answers encouraging, use emojis, and be concise. 
            Respond in ${language === 'ar' ? 'Arabic (mainly)' : 'English'}.`;

            // Use Puter.js chat with GPT-4o (the smartest free model on Puter)
            const response = await window.puter.ai.chat(
                `${systemPrompt}\n\nStudent says: ${text}`,
                { model: 'openai/gpt-4o' }
            );

            // Puter.js returns just the text if successful, or an object depending on version
            const responseText = typeof response === 'string' ? response : (response.message?.content || response.toString());

            setMessages(prev => [
                ...prev.filter(m => m.id !== "loading"),
                { id: `ai-${Date.now()}`, text: responseText, sender: "ai", timestamp: new Date() },
            ]);
            speak(responseText);
        } catch (error: any) {
            console.error("AI Error:", error);
            const errorMsg = language === "ar"
                ? "عذرًا، يبدو أن هناك مشكلة في الاتصال بالمدرب."
                : "Unable to connect to Puter Brain. Details: " + error.message;

            setMessages(prev => [
                ...prev.filter(m => m.id !== "loading"),
                { id: `err-${Date.now()}`, text: errorMsg, sender: "ai", timestamp: new Date() },
            ]);
        } finally {
            setIsProcessing(false);
        }
    }, [isProcessing, speak, language]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];
            mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
            mediaRecorder.current.onstop = async () => {
                const blob = new Blob(audioChunks.current, { type: "audio/wav" });
                setIsProcessing(true);
                setMessages(prev => [
                    ...prev,
                    { id: `vu-${Date.now()}`, text: "🎤 " + (language === "ar" ? "جاري معالجة الصوت..." : "Processing voice..."), sender: "user", timestamp: new Date() },
                    { id: "loading", text: "", sender: "ai", timestamp: new Date(), isLoading: true },
                ]);

                try {
                    if (!window.puter) {
                        throw new Error("Puter.js not loaded.");
                    }

                    // Use Puter.js speech-to-text
                    const transcription = await window.puter.ai.speech2txt(blob);
                    const transcribedText = typeof transcription === 'string' ? transcription : (transcription.text || transcription.toString());

                    // Clean up temp voice messages before calling final send
                    setMessages(prev => prev.filter(m => !m.id?.startsWith('vu-') && !m.text.includes("Processing") && m.id !== "loading"));

                    // Allow sendMessage to run by resetting processing flag
                    setIsProcessing(false);

                    // Now let the main send logic handle the AI call 
                    sendMessage("🎤 " + transcribedText);
                } catch (error: any) {
                    setIsProcessing(false);
                    console.error("STT Error:", error);
                    setMessages(prev => [
                        ...prev.filter(m => m.id !== "loading" && !m.text.includes("Processing")),
                        { id: `err-${Date.now()}`, text: (language === "ar" ? "فشل تحويل الصوت إلى نص." : "Voice-to-text failed: ") + error.message, sender: "ai", timestamp: new Date() },
                    ]);
                    setIsProcessing(false);
                }
            };
            mediaRecorder.current.start();
            setIsRecording(true);
        } catch { console.error("Mic access denied"); }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
            mediaRecorder.current.stream.getTracks().forEach(t => t.stop());
        }
    };

    const clearChat = () => {
        setMessages([{ id: "welcome", text: language === "ar" ? "تم مسح المحادثة! ماذا تريد أن تتعلم؟ 📚" : "Chat cleared! What would you like to learn? 📚", sender: "ai", timestamp: new Date() }]);
    };

    const isFirstTime = messages.length <= 1;

    return (
        <div className="flex flex-col h-[calc(100vh-220px)] relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-moroccan-blue/5 rounded-full blur-[160px] pointer-events-none" />

            <div className={`flex flex-col h-full glass rounded-[3rem] border border-white/5 shadow-3xl relative overflow-hidden ${language === "ar" ? "rtl" : "ltr"}`} dir={language === "ar" ? "rtl" : "ltr"}>
                {/* Header Container */}
                <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01] backdrop-blur-md sticky top-0 z-20">
                    <div className={`flex items-center gap-4 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                        <div className="relative group">
                            <div className="w-14 h-14 rounded-2xl glass-dark border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                                <GraduationCap className="text-moroccan-blue w-8 h-8" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-black shadow-lg" />
                        </div>
                        <div className={language === "ar" ? "text-right" : "text-left"}>
                            <h3 className="font-display font-medium text-xl text-white tracking-tight">{t("ai_coach")}</h3>
                            <div className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                                <Sparkles className="w-3 h-3 text-moroccan-blue" />
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">AI Tutor • {language === "ar" ? "الصف الثامن" : "8th Grade"}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={clearChat} className="p-3 rounded-full glass hover:bg-white/10 transition-perceptual text-white/20 hover:text-white/60">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </header>

                {/* Messages Scrolling Area */}
                <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 md:p-12 space-y-10 scroll-smooth custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} msg={msg} onSpeak={() => speak(msg.text)} language={language} t={t} />
                        ))}
                    </AnimatePresence>

                    {isFirstTime && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="space-y-6 max-w-2xl pt-4">
                            <div className={`flex items-center gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                                <div className="w-6 h-[1px] bg-white/10" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">{t("try_asking")}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {suggestedPrompts.map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(p.text)}
                                        className={`flex items-center space-x-4 p-5 rounded-2xl glass-dark border border-white/5 hover:border-moroccan-blue/30 hover:bg-white/5 transition-all text-left group ${language === "ar" ? "flex-row-reverse space-x-reverse text-right" : ""}`}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <p.icon className="w-5 h-5 text-white/20 group-hover:text-moroccan-blue transition-colors" />
                                        </div>
                                        <span className="text-sm md:text-base font-light text-white/40 group-hover:text-white transition-colors">{p.text}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Interactive Input Bar */}
                <footer className="p-6 md:p-8 bg-black/20 backdrop-blur-3xl border-t border-white/5 relative z-10">
                    <div className="max-w-4xl mx-auto flex items-center gap-4">
                        {/* Recording Trigger */}
                        <div className="relative">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onMouseDown={startRecording}
                                onMouseUp={stopRecording}
                                onTouchStart={startRecording}
                                onTouchEnd={stopRecording}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-perceptual shadow-3xl relative z-10 ${isRecording ? "bg-red-600 scale-110" : "bg-white text-black hover:bg-moroccan-blue hover:text-white"}`}
                            >
                                {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                            </motion.button>
                            <AnimatePresence>
                                {isRecording && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.8, 1] }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute inset-0 bg-red-600 rounded-full blur-xl -z-10"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input Capsule */}
                        <div className="flex-grow flex items-center glass-dark rounded-[3rem] p-1.5 focus-within:border-moroccan-blue/30 border border-white/5 transition-perceptual">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(inputText)}
                                placeholder={t("type_placeholder")}
                                disabled={isProcessing}
                                className={`flex-grow bg-transparent px-6 py-4 focus:outline-none text-white placeholder:text-white/20 text-base md:text-lg font-light ${language === "ar" ? "text-right" : ""}`}
                            />
                            <button
                                onClick={() => sendMessage(inputText)}
                                disabled={!inputText.trim() || isProcessing}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-moroccan-blue text-white flex items-center justify-center hover:scale-105 transition-all disabled:opacity-30 shadow-moroccan-blue/20 shadow-lg"
                            >
                                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className={`w-5 h-5 ${language === "ar" ? "rotate-180" : ""}`} />}
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

function ChatBubble({ msg, onSpeak, language, t }: { msg: Message; onSpeak: () => void; language: string; t: (key: string) => string }) {
    const isAI = msg.sender === "ai";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${isAI ? "justify-start" : "justify-end"}`}
        >
            <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${isAI ? "items-start" : "items-end"}`}>
                <div className={`relative px-6 py-5 rounded-[2.5rem] shadow-2xl transition-perceptual ${isAI
                    ? "glass-dark border-white/10 text-white/90 rounded-bl-sm"
                    : "bg-white text-black font-medium border-transparent rounded-br-sm shadow-white/10"
                    }`}>
                    {msg.isLoading ? (
                        <div className="flex gap-1.5 py-4 px-2">
                            <motion.div animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 rounded-full bg-moroccan-blue" />
                            <motion.div animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} className="w-2 h-2 rounded-full bg-moroccan-blue" />
                            <motion.div animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-moroccan-blue" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className={`text-base md:text-xl leading-relaxed whitespace-pre-line tracking-tight font-light ${language === "ar" ? "text-right" : "text-left"}`}>
                                {msg.text}
                            </p>
                            {isAI && (
                                <button onClick={onSpeak} className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-moroccan-blue hover:bg-moroccan-blue hover:text-white transition-all">
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{language === "ar" ? "استماع" : "Speak Response"}</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/10">
                        {isAI ? "AI Tutor" : "Student"} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
