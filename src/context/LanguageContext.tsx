import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "en" | "fr" | "ar";

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
    en: {
        home: "Home",
        curriculum: "Curriculum",
        vocabulary: "Vocabulary",
        grammar: "Grammar",
        ai_hub: "AI Hub",
        ai_speaking: "AI Speaking",
        made_by: "Designed for 2025 by Chaanouni",
        platform_title: "Spotlight 2 Platform",
        enter_unit: "Enter Unit",
        all_units: "All Units",
        study_tips: "Study Tips",
        units: "Units",
        exercises: "Exercises",
        questions: "Questions",
        vocab_words: "Vocab Words",
        launch_ai: "Launch AI Hub",
        ai_voice_training: "AI Voice Training",
        ai_coach: "AI English Coach",
        online: "Online",
        type_placeholder: "Ask anything about Spotlight 2...",
        clear_chat: "Clear conversation",
        listen: "Listen",
        back_to_grammar: "Back to Grammar",
        explanation: "Explanation",
        tips_rules: "Tips & Rules",
        practice_rule: "Practice This Rule",
        search_vocab: "Search vocabulary...",
        unit: "Unit",
        dashboard: "Dashboard",
        try_asking: "Try Asking Our AI Assistant",
        continue_learning: "Continue Learning",
        master: "Master",
        english: "English",
        hero_desc: "Advanced 8th Grade Curriculum for Moroccan Students. Cinematic learning, smart logic, and AI speech practice.",
        vocabulary_desc: "Deep lexical immersion with HD visuals and native phonetics for every unit.",
        grammar_desc: "Master English syntax with visual breakdowns and adaptive training modules.",
        start_journey: "Start the Journey",
        explore_units: "Explore Units",
        path_excellence: "Your path to linguistic excellence",
        explore_hub: "Explore Hub",
        neural_coach: "Neural Speaking Coach",
        speak_native: "Speak Native.",
        ai_coach_desc: "Real-time speech analysis and immersive dialogue. Your 24/7 private tutor for Spotlight 2, seamlessly switching between English and Darija.",
        learn_more: "Learn More",
        search: "Search",
        all: "All",
        no_results: "No results found",
        back_to_curriculum: "Back to Curriculum",
        materials: "Materials",
        resources: "Resources",
        functions: "Functions",
        unit_locked: "Unit Locked",
        launch_mission: "Launch Mission",
        available: "Available",
        locked: "Locked",
        completed: "Completed",
    },
    fr: {
        home: "Accueil",
        curriculum: "Programme",
        vocabulary: "Vocabulaire",
        grammar: "Grammaire",
        ai_hub: "AI Hub",
        ai_speaking: "Parler AI",
        made_by: "Conçu pour 2025 par Chaanouni",
        platform_title: "Plateforme Spotlight 2",
        enter_unit: "Entrer dans l'unité",
        all_units: "Toutes les unités",
        study_tips: "Conseils d'étude",
        units: "Unités",
        exercises: "Exercices",
        questions: "Questions",
        vocab_words: "Mots",
        launch_ai: "Lancer le AI Hub",
        ai_voice_training: "Entraînement Voice AI",
        ai_coach: "Coach d'anglais AI",
        online: "En ligne",
        type_placeholder: "Demandez n'importe quoi sur Spotlight 2...",
        clear_chat: "Effacer la conversation",
        listen: "Écouter",
        back_to_grammar: "Retour à la grammaire",
        explanation: "Explication",
        tips_rules: "Conseils et règles",
        practice_rule: "Pratiquer cette règle",
        search_vocab: "Rechercher du vocabulaire...",
        unit: "Unité",
        dashboard: "Tableau de Bord",
        try_asking: "Essayez notre assistant IA",
        continue_learning: "Continuer l'apprentissage",
        master: "Maîtrisez",
        english: "l'Anglais",
        hero_desc: "Programme avancé de 8ème année pour les étudiants marocains. Apprentissage cinématique, logique intelligente et pratique vocale IA.",
        vocabulary_desc: "Immersion lexicale profonde avec des visuels HD et une phonétique native pour chaque unité.",
        grammar_desc: "Maîtrisez la syntaxe anglaise avec des analyses visuelles et des modules d'entraînement adaptatifs.",
        start_journey: "Commencer le voyage",
        explore_units: "Explorer les unités",
        path_excellence: "Votre chemin vers l'excellence linguistique",
        explore_hub: "Explorer le Hub",
        neural_coach: "Coach vocal neural",
        speak_native: "Parlez comme un natif.",
        ai_coach_desc: "Analyse vocale en temps réel et dialogue immersif. Votre tuteur privé 24/7 pour Spotlight 2, passant sans effort de l'anglais au darija.",
        learn_more: "En savoir plus",
        search: "Rechercher",
        all: "Tout",
        no_results: "Aucun résultat trouvé",
        back_to_curriculum: "Retour au programme",
        materials: "Matériaux",
        resources: "Ressources",
        functions: "Fonctions",
        unit_locked: "Unité verrouillée",
        launch_mission: "Lancer la mission",
        available: "Disponible",
        locked: "Verrouillé",
        completed: "Terminé",
    },
    ar: {
        home: "الرئيسية",
        curriculum: "المنهج",
        vocabulary: "المفردات",
        grammar: "القواعد",
        ai_hub: "مركز الذكاء الاصطناعي",
        ai_speaking: "تحدث بالذكاء الاصطناعي",
        made_by: "تم التصميم لعام 2025 بواسطة Chaanouni",
        platform_title: "منصة Spotlight 2",
        enter_unit: "دخول الوحدة",
        all_units: "جميع الوحدات",
        study_tips: "نصائح الدراسة",
        units: "وحدات",
        exercises: "تمارين",
        questions: "أسئلة",
        vocab_words: "كلمات",
        launch_ai: "تشغيل مركز الذكاء الاصطناعي",
        ai_voice_training: "التدريب الصوتي بالذكاء الاصطناعي",
        ai_coach: "مدرب الإنجليزية بالذكاء الاصطناعي",
        online: "متصل",
        type_placeholder: "اسأل أي شيء عن Spotlight 2...",
        clear_chat: "مسح المحادثة",
        listen: "استمع",
        back_to_grammar: "العودة إلى القواعد",
        explanation: "الشرح",
        tips_rules: "نصائح وقواعد",
        practice_rule: "ممارسة هذه القاعدة",
        search_vocab: "البحث في المفردات...",
        unit: "الوحدة",
        dashboard: "لوحة التحكم",
        try_asking: "جرب سؤال مساعدنا بالذكاء الاصطناعي",
        continue_learning: "متابعة التعلم",
        master: "أتقن",
        english: "الإنجليزية",
        hero_desc: "منهج الصف الثامن الإعدادي. تمارين تفاعلية، دروس قواعد، وممارسة تحدث بالذكاء الاصطناعي.",
        vocabulary_desc: "اكتشف الكلمات مع صور عالية الدقة ونطق أصلي لكل وحدة.",
        grammar_desc: "قواعد اللغة الإنجليزية مبسطة مع دروس تفاعلية واختبارات ذكية.",
        start_journey: "ابدأ الرحلة",
        explore_units: "تصفح الوحدات",
        path_excellence: "خارطة طريق إتقان اللغة الإنجليزية",
        explore_hub: "استكشف",
        neural_coach: "مدرب المحادثة الذكي",
        speak_native: "تحدث بطلاقة.",
        ai_coach_desc: "تدرب على النطق والمحادثة مع مدربنا الذكي المتاح على مدار الساعة. تعلم الدارجة المغربية أو الفرنسية للمساعدة فورية.",
        learn_more: "تعلم المزيد",
        search: "بحث",
        all: "الكل",
        no_results: "لم يتم العثور على نتائج",
        back_to_curriculum: "العودة للمنهج",
        materials: "المواد التعليمية",
        resources: "الموارد",
        functions: "الوظائف التواصلية",
        unit_locked: "الوحدة مقفلة",
        launch_mission: "بدء التمرين",
        available: "متاح",
        locked: "مغلق",
        completed: "مكتمل",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<LanguageCode>("en");

    // Load from local storage if exists
    useEffect(() => {
        const saved = localStorage.getItem("app_lang") as LanguageCode;
        if (saved && (saved === "en" || saved === "fr" || saved === "ar")) {
            setLanguage(saved);
        }
    }, []);

    // Apply language attributes to HTML whenever the language state changes
    useEffect(() => {
        if (language === "ar") {
            document.documentElement.dir = "rtl";
            document.documentElement.lang = "ar";
        } else {
            document.documentElement.dir = "ltr";
            document.documentElement.lang = language;
        }
    }, [language]);

    const handleSetLanguage = (lang: LanguageCode) => {
        setLanguage(lang);
        localStorage.setItem("app_lang", lang);
        // Add RTL support for Arabic
        if (lang === "ar") {
            document.documentElement.dir = "rtl";
            document.documentElement.lang = "ar";
        } else {
            document.documentElement.dir = "ltr";
            document.documentElement.lang = lang;
        }
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
