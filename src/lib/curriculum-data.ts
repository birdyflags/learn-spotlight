export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface VocabularyItem {
    word: string;
    description: string;
    image: string;
}

export interface Unit {
    id: number;
    title: string;
    description: string;
    theme: string;
    functions: string[];
    vocabulary: VocabularyItem[];
    grammar: string[];
    audioResources: { title: string; url: string; duration: string }[];
    exercises: { title: string; status: "locked" | "available" | "completed"; questions?: Question[] }[];
    image?: string;
}

export const spotlightCurriculum: Unit[] = [
    {
        id: 1,
        title: "Jobs",
        description: "Explore the dynamic world of professions. From healthcare to technology, learn to describe what people do, the skills they possess, and how to discuss your future career aspirations in an evolving global economy.",
        theme: "blue",
        functions: ["Talking about skills", "Job interviews", "Expressing likes/dislikes", "Describing daily routines at work", "Asking about professions"],
        vocabulary: [
            { word: "Mechanic", description: "A person who repairs and maintains vehicles and machines.", image: "https://www.autotrainingcentre.com/wp-content/uploads/2024/07/auto-mechanic.jpg" },
            { word: "Nurse", description: "A healthcare professional who cares for patients in hospitals.", image: "https://eastwick.edu/wp-content/uploads/2018/01/NursingRewardingCareer.jpg" },
            { word: "Graphic Designer", description: "A creative professional who designs visual content.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477673109019562096/9k.png?ex=69a59dd3&is=69a44c53&hm=52820f7c738ebc0e434d5e81c6eaa96b222099e91500ac1bdfd991e7b1eea08c&" },
            { word: "Engineer", description: "A person who designs, builds, or maintains engines and structures.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477673331665666058/9k.png?ex=69a59e08&is=69a44c88&hm=803a88ab668a12ac5a1785bb9bbb37209c3bb0b2468445f104dd14edc2096fb0&" },
            { word: "Journalist", description: "A person who writes news stories for newspapers or media.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477674160129052732/young-confident-reporter-journalist-african-ethnicity-holding-microphone-while-standing-against-riverside-modern-architecture_274679-19120.png?ex=69a59ecd&is=69a44d4d&hm=3c5735d522ee2b41fb6065bb417c059ca7904562d34af30602a1e6e76e2eb14f&" },
            { word: "Office", description: "A room or building where people work at desks.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477674338575585290/types-of-office-jobs-2.png?ex=69a59ef8&is=69a44d78&hm=d9e38b4c0d181aae21ebf3fbdfd6f9fd7cff09b0d421ecd3fe3ab3d38e092845&" },
            { word: "Salon", description: "A shop where hairdressers cut and style hair.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477675823057080503/2Q.png?ex=69a5a05a&is=69a44eda&hm=af9a19444a2377113c65e699255111f2fd3920905ec2b292a561384d81f61df8&" },
            { word: "Pilot", description: "A professional trained to fly an aircraft.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477676092310421574/5-1-1024x580.png?ex=69a5a09a&is=69a44f1a&hm=d8037b282498076585553f03fb24ee31142a4569c621b5671be1d90838bcc3d1&" },
            { word: "Chef", description: "A professional cook in a restaurant or hotel.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477676212795998250/chef-preparing-food.png?ex=69a5a0b7&is=69a44f37&hm=eb9ceeed103235e5d17d75849ada7a26dae7ff97816b5f718f05a7456a0a216e&" },
            { word: "Teacher", description: "A person who instructs others, especially in a school.", image: "https://cdn.discordapp.com/attachments/1438951533021630599/1477676548185133137/role-and-importance-of-teacher-in-students-life-jpg.png?ex=69a5a106&is=69a44f86&hm=694842c670045510e29886f022c2f8dcf6e56fe06f6dd9ca0ffe63d57ffc52b2&" },
        ],
        grammar: ["Wh- and Yes/No questions", "I want to be a...", "Like/dislike + -ing", "Be good at + -ing", "Present Simple for jobs"],
        audioResources: [
            { title: "Unit 1: The Job Interview", url: "#", duration: "2:15" },
            { title: "Vocabulary Guide: My Future Job", url: "#", duration: "1:45" },
            { title: "Dialogue: At the Office", url: "#", duration: "3:20" },
        ],
        exercises: [
            {
                title: "Vocabulary: Match the Jobs",
                status: "available",
                questions: [
                    { question: "Who fixes cars?", options: ["Nurse", "Mechanic", "Teacher", "Chef"], correctAnswer: 1 },
                    { question: "Who designs websites?", options: ["Nurse", "Graphic Designer", "Pilot", "Chef"], correctAnswer: 1 },
                    { question: "Who treats sick people in a hospital?", options: ["Engineer", "Mechanic", "Nurse", "Journalist"], correctAnswer: 2 },
                    { question: "Who writes news articles?", options: ["Mechanic", "Pilot", "Teacher", "Journalist"], correctAnswer: 3 },
                    { question: "Who flies airplanes?", options: ["Pilot", "Chef", "Dentist", "Firefighter"], correctAnswer: 0 },
                    { question: "Who designs buildings?", options: ["Architect", "Developer", "Driver", "Artist"], correctAnswer: 0 },
                    { question: "Who maintains power lines and electrical systems?", options: ["Secretary", "Electrician", "Waiter", "Farmer"], correctAnswer: 1 },
                    { question: "Who serves food in a restaurant?", options: ["Cook", "Waiter", "Manager", "Valet"], correctAnswer: 1 },
                    { question: "Who works in a salon and cuts hair?", options: ["Tailor", "Hairdresser", "Painter", "Butcher"], correctAnswer: 1 },
                    { question: "Who teaches students in a classroom?", options: ["Principal", "Teacher", "Janitor", "Coach"], correctAnswer: 1 },
                ]
            },
            {
                title: "Grammar & Functions: Skills",
                status: "available",
                questions: [
                    { question: "I ___ be a doctor in the future.", options: ["want to", "want", "wanting", "wants to"], correctAnswer: 0 },
                    { question: "Are you good ___ painting?", options: ["in", "on", "at", "with"], correctAnswer: 2 },
                    { question: "She ___ like working in an office.", options: ["don't", "doesn't", "isn't", "not"], correctAnswer: 1 },
                    { question: "What ___ your father do?", options: ["do", "does", "is", "doing"], correctAnswer: 1 },
                    { question: "I am interested ___ becoming an engineer.", options: ["on", "at", "in", "to"], correctAnswer: 2 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 2,
        title: "Food",
        description: "A culinary journey through international and Moroccan cuisine. Master the language of recipes, restaurant etiquette, and healthy eating while learning to describe the rich flavors of Tagine, Couscous, and more.",
        theme: "orange",
        functions: ["Ordering in a restaurant", "Making offers and requests", "Talking about recipes", "Describing table manners", "Shopping for groceries"],
        vocabulary: [
            { word: "Milkshake", description: "A cold drink made by blending milk with ice cream or fruit.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477313892848767076/Whisk_396715cfe4eeb5f86ec404a6c0f2f8efdr.jpeg?ex=69a5a0c7&is=69a44f47&hm=9209527d62e022744bedc5657f315d06685a32191dd4fb956a4fdef267f29d59&" },
            { word: "Snacks", description: "Small amounts of food eaten between meals.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477676910317142131/2020_09_11_Eater_Mexican_Snack_001.png?ex=69a5a15d&is=69a44fdd&hm=340b77ba1c0138820a75643d88877e5b2eced0ea7ed2ff3c50a413e72efe80b8&" },
            { word: "Fast food", description: "Food that is prepared and served quickly in restaurants.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477677061685379258/McDonalds.png?ex=69a5a181&is=69a45001&hm=8424f556e5d67eaa0f45ccd9dd38acbaa196fbeb46255fff99489e3f5fd26dba&" },
            { word: "Eggs", description: "Oval reproductive bodies laid by birds, commonly used in cooking.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477677180862595092/Brown-eggs.png?ex=69a5a19d&is=69a4501d&hm=2bf5a98d034b22eee9dc5925cefafff57e18a7998a99a2e3a6bd731d14785cf8&" },
            { word: "Cheese", description: "A food made from pressed milk curds.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477677373913825452/sharp-cheddar-slices_1.png?ex=69a5a1cb&is=69a4504b&hm=d43978413b0fb02b5f083b7fdb2e55e302eb231da924114a540b710b6b309423&" },
            { word: "Tagine", description: "A traditional Moroccan slow-cooked stew named after the clay pot.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477677561885626545/DSC2683.png?ex=69a5a1f8&is=69a45078&hm=fd298c60a36111b7cae1b8ee87c228a749fd65d25e52da8fb0744779446d18dd&" },
            { word: "Couscous", description: "Small steamed granules of semolina, a staple Moroccan dish.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477677771068280914/16417759296490.png?ex=69a5a22a&is=69a450aa&hm=6c3c70053e9fe94d748417f159a5d332c3c1b657f3c2be468f0f291369433c51&" },
            { word: "Pastilla", description: "A traditional Moroccan savory-sweet meat pie.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477677926945128661/parrillagrillAmaiaCastells-6630215f2a3d4e01b19322229aee8064.png?ex=69a5a24f&is=69a450cf&hm=e11d551b52f67e400d333d0431ea9efb72b141070ff8ea74977e05d1fa597512&" },
            { word: "Harira", description: "A traditional Moroccan soup usually served during Ramadan.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477678275751973026/i74271-harira-choumicha.png?ex=69a5a2a2&is=69a45122&hm=d71ababaac108eef3faee547ca69971f7c1026d476ee58de0fe65856a0f504b4&" },
            { word: "Mint Tea", description: "Traditional Moroccan green tea with fresh mint leaves.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477678401329565806/70644-moroccan-mint-tea.png?ex=69a5a2c0&is=69a45140&hm=8f7dc84e5966f457243acc35acef831c9e3430c1d66e1f2bc3a19121d1382ddb&" },
        ],
        grammar: ["Countable & Uncountable nouns", "Quantity words (a box of, a cup of)", "Some/Any", "Would you like...?", "How much / How many"],
        audioResources: [
            { title: "Unit 2: At the Market", url: "#", duration: "3:10" },
            { title: "Dialogue: Ordering at a Restaurant", url: "#", duration: "2:45" },
        ],
        exercises: [
            {
                title: "Moroccan Cuisine Quiz",
                status: "available",
                questions: [
                    { question: "Which one is a famous Moroccan soup?", options: ["Borscht", "Harira", "Miso", "Gazpacho"], correctAnswer: 1 },
                    { question: "What is usually served in a conical clay pot?", options: ["Pizza", "Tagine", "Sushi", "Pasta"], correctAnswer: 1 },
                    { question: "Couscous is traditionally served on which day?", options: ["Monday", "Wednesday", "Friday", "Sunday"], correctAnswer: 2 },
                    { question: "What is the main ingredient of a milkshake?", options: ["Water", "Oil", "Milk", "Juice"], correctAnswer: 2 },
                    { question: "Which of these is a traditional Moroccan drink?", options: ["Coffee", "Mint Tea", "Soda", "Lemonade"], correctAnswer: 1 },
                    { question: "Which fruit is often found in Moroccan salads?", options: ["Apple", "Orange", "Banana", "Grape"], correctAnswer: 1 },
                    { question: "Pastilla is a traditional Moroccan ___.", options: ["Soup", "Pie", "Salad", "Drink"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 2: ordering & Countables",
                status: "available",
                questions: [
                    { question: "I'd like ___ orange juice, please.", options: ["a", "an", "some", "any"], correctAnswer: 2 },
                    { question: "How ___ eggs do we need for the cake?", options: ["much", "many", "lots", "few"], correctAnswer: 1 },
                    { question: "There isn't ___ cheese in the fridge.", options: ["some", "any", "many", "no"], correctAnswer: 1 },
                    { question: "Would you like ___ cup of tea?", options: ["a", "some", "any", "the"], correctAnswer: 0 },
                    { question: "How ___ sugar do you want in your coffee?", options: ["many", "much", "any", "some"], correctAnswer: 1 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 3,
        title: "Online Activities",
        description: "Navigate the digital landscape. Understand technology, social media trends, and streaming culture. Learn to discuss your online habits, movie preferences, and the devices that keep us connected.",
        theme: "purple",
        functions: ["Discussing movie preferences", "Talking about routines", "Asking about price", "Describing online activities", "Comparing devices"],
        vocabulary: [
            { word: "Smartphone", description: "A mobile phone with advanced computing capabilities.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477678556107636746/index2.png?ex=69a5a2e5&is=69a45165&hm=075b280d083bfc316012526c0a1e8d5ae3fd9bbd89b8b9a7ffbf0320ffaa08e5&" },
            { word: "Earbuds", description: "Small earphones that fit directly in the ear.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477678815130947664/00ZMoL9Nz3D5cedzPzmhwSZ-3.fit_lim.size_919x518.v1750258249.png?ex=69a5a323&is=69a451a3&hm=5764e070b47155887b4e338c275b2c23c7f44916a49c091f61128ff420cf2325&" },
            { word: "Download", description: "To copy data from the internet to your device.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477678960111390814/download-2062197_960_720.png?ex=69a5a346&is=69a451c6&hm=b7961ca52ad1f145245b00e9d6b5c342c337d3235005ce77967038856fc9144d&" },
            { word: "Upload", description: "To send data from your device to the internet.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477679063253516419/modern-download-upload-web-symbol-cloud-storage_1017-59711.png?ex=69a5a35e&is=69a451de&hm=20c8b439f15a61cb218d3c3ab837575485c61c9f82e7a90975bb41ea9a883b5a&" },
            { word: "Laptop", description: "A portable personal computer.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477679150360821874/05b3OfPth4pdhrqzOajnPbi-10-hero-image-gallery.fit_lim.size_919x518.v1762919075.png?ex=69a5a373&is=69a451f3&hm=b0bfb5cc871e06a5105b2fb1079b0ec181546ec2025939228796be638b2e03df&" },
            { word: "Wi-Fi", description: "A facility allowing computers and smartphones to connect to the internet wirelessly.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477679574656614501/Wi-Fi-router.png?ex=69a5a3d8&is=69a45258&hm=896b5fd99a2458d7f96eef2e131c055583ec158388be2195b1a1660c74c101f4&" },
        ],
        grammar: ["How much is/are...?", "How often...?", "Possessive Adjectives", "Adverbs of frequency", "Present Simple for routines"],
        audioResources: [
            { title: "Unit 3: Online Safety", url: "#", duration: "2:50" },
        ],
        exercises: [
            {
                title: "Digital Habits Test",
                status: "available",
                questions: [
                    { question: "What do you use to listen to music privately?", options: ["Laptop", "Earbuds", "Wi-Fi", "Monitor"], correctAnswer: 1 },
                    { question: "To move a file from your computer to the internet is to...", options: ["Download", "Upload", "Delete", "Refresh"], correctAnswer: 1 },
                    { question: "Which device is the most portable?", options: ["Desktop", "Laptop", "Smartphone", "Server"], correctAnswer: 2 },
                    { question: "You need ___ to connect to the internet wirelessly.", options: ["Battery", "Wi-Fi", "Keyboard", "Mouse"], correctAnswer: 1 },
                    { question: "A ___ can be carried in a bag and used anywhere.", options: ["Desktop", "Laptop", "Television", "Printer"], correctAnswer: 1 },
                    { question: "I ___ my new photos to Instagram yesterday.", options: ["downloaded", "uploaded", "deleted", "called"], correctAnswer: 1 },
                    { question: "I ___ a new game from the store.", options: ["downloaded", "uploaded", "sold", "lost"], correctAnswer: 0 }
                ]
            },
            {
                title: "Unit 3: Frequency & Possession",
                status: "available",
                questions: [
                    { question: "I ___ go online before breakfast.", options: ["Always", "Never", "Rarely", "Usually"], correctAnswer: 0 },
                    { question: "My phone is old. ___ battery is weak.", options: ["It's", "Its", "His", "Her"], correctAnswer: 1 },
                    { question: "How ___ do you check your emails?", options: ["always", "often", "many", "much"], correctAnswer: 1 },
                    { question: "This is ___ laptop. (I own it)", options: ["my", "mine", "me", "I"], correctAnswer: 0 },
                    { question: "Sarah ___ uses her phone in class.", options: ["don't", "never", "not", "isn't"], correctAnswer: 1 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 4,
        title: "Health",
        description: "prioritize your well-being. Learn to describe symptoms, give compassionate medical advice, and understand the connection between physical health and emotional balance in a fast-paced world.",
        theme: "red",
        functions: ["Giving medical advice", "Describing symptoms", "Expressing feelings", "Talking about healthy habits", "Visiting the doctor"],
        vocabulary: [
            { word: "Earache", description: "Pain inside the ear.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477679703031546099/domowe-sposoby-na-bol-ucha-m.png?ex=69a5a3f7&is=69a45277&hm=c43bf827215a61e0fcc41de4fbe0b3410cc3aa30f27464519bc7026ec64a5852&" },
            { word: "Fever", description: "An abnormally high body temperature.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477679877279977662/fever-a.png?ex=69a5a420&is=69a452a0&hm=6f42119edbecae083821f7a419c96bca70f718013c478ec5107af2f8ed692480&" },
            { word: "Headache", description: "Pain in the head.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477680085732692143/AdobeStock_244803452.png?ex=69a5a452&is=69a452d2&hm=353c3c106df872c951269203b92de01e2b85efc12c87426afab71588906f6a0e&" },
            { word: "Stomachache", description: "Pain in the stomach.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477680254171484413/Abdominal-Pain.png?ex=69a5a47a&is=69a452fa&hm=978d4136118f7931b50d06f6a6a826c88e6cd629bd885c02604126b31c387e6b&" },
            { word: "Toothache", description: "Pain in or around a tooth.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477680464809562264/dental-pain.BLOG_.png?ex=69a5a4ac&is=69a4532c&hm=ee7f3668ca9f50c5a72e2f291778872c8c55dab3915f9987dc851f5adc959778&" },
            { word: "Cold", description: "A common viral infection of the nose and throat.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477680619512401981/cold-and-flu-gettyimages-1189299509-square.png?ex=69a5a4d1&is=69a45351&hm=47bdd44e926925d51bac6c007fcf60d396fa83558b23d431083d2e397953d700&" },
        ],
        grammar: ["Should / Shouldn't for advice", "Imperatives for health"],
        audioResources: [],
        exercises: [
            {
                title: "Health & Advice Clinic",
                status: "available",
                questions: [
                    { question: "I have a high temperature. I have a ___.", options: ["Cold", "Fever", "Headache", "Cough"], correctAnswer: 1 },
                    { question: "My head hurts. I have a ___.", options: ["Stomachache", "Headache", "Earache", "Backache"], correctAnswer: 1 },
                    { question: "I have pain in my ear. It is an ___.", options: ["Eyeache", "Earache", "Backache", "Headache"], correctAnswer: 1 },
                    { question: "If your tooth hurts, you have a ___.", options: ["Headache", "Stomachache", "Toothache", "Cold"], correctAnswer: 2 },
                    { question: "If your stomach hurts after eating, you have a ___.", options: ["Stomachache", "Fever", "Cold", "Flu"], correctAnswer: 0 },
                    { question: "I am sneezing and have a runny nose. I have a ___.", options: ["Fever", "Cold", "Toothache", "Earache"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 4: health Advice",
                status: "available",
                questions: [
                    { question: "You ___ eat too much candy if you have a toothache.", options: ["Should", "Shouldn't", "Must", "Can"], correctAnswer: 1 },
                    { question: "___ plenty of water to stay healthy.", options: ["Drink", "Drinking", "Drank", "Drinks"], correctAnswer: 0 },
                    { question: "You have a fever. You ___ see a doctor.", options: ["should", "shouldn't", "don't", "doesn't"], correctAnswer: 0 },
                    { question: "Don't ___ cold water if you have a sore throat.", options: ["drink", "drinks", "drinking", "drank"], correctAnswer: 0 },
                    { question: "You ___ take some medicine for your headache.", options: ["should", "can't", "shouldn't", "will"], correctAnswer: 0 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 5,
        title: "Clothing",
        description: "Style, fashion, and personal identity. From traditional Moroccan attire like the Djellaba to modern street fashion, learn to describe outfits, accessories, and shopping preferences with confidence.",
        theme: "mocha",
        functions: ["Describing outfits", "Shopping for accessories", "Style preferences", "Comparing clothes", "Talking about fashion trends"],
        vocabulary: [
            { word: "Pants", description: "Clothing for the lower part of the body.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477680936056520776/C04-025B4PHT-BL2_7f19ec5d-f399-41d4-bfd8-55d725e7f0d3.png?ex=69a5a51d&is=69a4539d&hm=6ff23cea10814348ed14acb3cfed36799a32de6964b64b709af2ef24f3f54efa&" },
            { word: "Gloves", description: "Hand coverings for warmth or protection.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477681055321427978/66aa60ce9339e87dea1c765f_FASHION20CLOTHES.png?ex=69a5a539&is=69a453b9&hm=20d7365bab9085bb78569aaf7e71c08ae28844e305b7c7753f52ad13699da345&" },
            { word: "Sneakers", description: "Athletic or casual shoes with a rubber sole.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477681196929388585/NIKEAIRMAX95BIGBUBBLESE.png?ex=69a5a55b&is=69a453db&hm=22ad01fe46d388c50a8c6d17bef000235ea9a99a5643667c363319449bf72b5b&" },
            { word: "Sweater", description: "A warm knitted upper-body garment.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477681368124227747/412x412.png?ex=69a5a584&is=69a45404&hm=78d7bd04b230179274332b4ba60a4867daf8cbc364f4607166ef398163f780de&" },
            { word: "Djellaba", description: "A long, loose-fitting outer robe with full sleeves.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477682392956272681/250px-Moroccan_djellaba.png?ex=69a5a678&is=69a454f8&hm=0753e1b3990ec0b45f89cf98057fdc4889adb07c88f249eecb6188210f86d137&" },
            { word: "Babouche", description: "Traditional Moroccan leather slippers.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477682483343659148/origine-de-la-babouche.png?ex=69a5a68e&is=69a4550e&hm=2d9043a6d62cce3749563b39a17dc17f343e1bdbb35f656a759fbf4047fd03ff&" },
        ],
        grammar: ["Demonstrative Pronouns", "Comparatives"],
        audioResources: [],
        exercises: [
            {
                title: "Fashion & Style Quiz",
                status: "available",
                questions: [
                    { question: "What do you wear on your hands when it's cold?", options: ["Socks", "Gloves", "Hat", "Scarf"], correctAnswer: 1 },
                    { question: "Traditional Moroccan slippers are called ___.", options: ["Sneakers", "Babouche", "Sandals", "Heels"], correctAnswer: 1 },
                    { question: "A ___ is a long Moroccan robe with a hood.", options: ["Sweater", "Djellaba", "Coat", "Dress"], correctAnswer: 1 },
                    { question: "You wear ___ on your feet for sports.", options: ["Babouche", "Sneakers", "Gloves", "Scarf"], correctAnswer: 1 },
                    { question: "When it's snowy, I wear a warm ___.", options: ["T-shirt", "Sweater", "Shorts", "Skirt"], correctAnswer: 1 },
                    { question: "Men and women in Morocco wear the ___.", options: ["Gloves", "Djellaba", "Uniform", "Swimsuit"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 5: Demonstratives & Comparatives",
                status: "available",
                questions: [
                    { question: "These sneakers are ___ than those boots.", options: ["Comfortable", "More comfortable", "Comfortabler", "Most comfortable"], correctAnswer: 1 },
                    { question: "___ Djellaba over there is beautiful.", options: ["This", "That", "These", "Those"], correctAnswer: 1 },
                    { question: "___ pants I am wearing are new.", options: ["This", "That", "These", "Those"], correctAnswer: 2 },
                    { question: "My sweater is ___ than yours.", options: ["warm", "warmer", "warmest", "more warm"], correctAnswer: 1 },
                    { question: "This babouche is ___ than the other one.", options: ["gooder", "better", "best", "the best"], correctAnswer: 1 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 6,
        title: "Geography",
        description: "Discover our planet's wonders. Navigate continents, countries, and natural landmarks. Learn to discuss nationalities, describe geographic features, and appreciate the diversity of the world's regions.",
        theme: "green",
        functions: ["Asking about distance/height", "Discussing geographic features", "Describing countries and cultures"],
        vocabulary: [
            { word: "Lake", description: "A large body of water surrounded by land.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477682624993693787/picture-20210813-164720270.png?ex=69a5a6af&is=69a4552f&hm=25cd0e6306597299cf55b67830db3bc1ae316c49f75ca6c9b42a9ffd0175288d&" },
            { word: "Waterfall", description: "A cascade of water flowing over a cliff.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477682735224197192/tourists-at-victoria-falls.png?ex=69a5a6ca&is=69a4554a&hm=10b78dab4e4e54ffa0f05eeda2b6b9ff2e7d623786cb4cbb117932a9bd8da6e1&" },
            { word: "Mountain", description: "A large natural elevation of the earth's surface.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477682858477752412/siguniang-mountain-8568913_1280.png?ex=69a5a6e7&is=69a45567&hm=d5919e45f07c19b0f8d87f31a932da082f404a6b58036db063e225a9b4f37174&" },
            { word: "Desert", description: "A barren area of land with little rainfall.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477682977205911656/fbby1h_1.png?ex=69a5a703&is=69a45583&hm=43a9f77e7ec298ea7594c79007f79222986637b19c081ba1c0bf65d0ba5a39f2&" },
            { word: "River", description: "A large natural stream of water flowing in a channel.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683300440080538/river_377603497_1000.png?ex=69a5a750&is=69a455d0&hm=a27a256706d6a08d98e66a65748b0484614368dea1dc1dadaaa27c0f5a890d31&" },
            { word: "Island", description: "A piece of land surrounded by water.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683459404337188/island.png?ex=69a5a776&is=69a455f6&hm=5e5a49f4e124693dbf6338c3fa9aba305f078251baaa4f54378e4128f2abe268&" },
        ],
        grammar: ["Superlatives", "There is / There are"],
        audioResources: [],
        exercises: [
            {
                title: "World Explorer Challenge",
                status: "available",
                questions: [
                    { question: "What is a piece of land surrounded by water?", options: ["Lake", "Desert", "Island", "River"], correctAnswer: 2 },
                    { question: "The Sahara is a very big ___.", options: ["Forest", "Lake", "Desert", "Waterfall"], correctAnswer: 2 },
                    { question: "A ___ is a large stream of water that flows into the sea.", options: ["Lake", "River", "Mountain", "Island"], correctAnswer: 1 },
                    { question: "The Ouzoud ___ is a beautiful place in Morocco.", options: ["Mountain", "Waterfall", "Lake", "Island"], correctAnswer: 1 },
                    { question: "A ___ is a large body of water surrounded by land.", options: ["River", "Sea", "Lake", "Ocean"], correctAnswer: 2 },
                    { question: "Mount Toubkal is the highest ___ in Morocco.", options: ["Lake", "Mountain", "Desert", "City"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 6: Superlatives & Existence",
                status: "available",
                questions: [
                    { question: "Mount Everest is the ___ mountain in the world.", options: ["Higher", "High", "Highest", "Most high"], correctAnswer: 2 },
                    { question: "___ many beautiful cities in Morocco.", options: ["There is", "There are", "They are", "It is"], correctAnswer: 1 },
                    { question: "Is ___ a lake near your house?", options: ["it", "there", "they", "here"], correctAnswer: 1 },
                    { question: "The Pacific is the ___ ocean.", options: ["big", "bigger", "biggest", "most big"], correctAnswer: 2 },
                    { question: "Which is the ___ city in Morocco?", options: ["large", "larger", "largest", "more large"], correctAnswer: 2 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 7,
        title: "Entertainment",
        description: "Entertainment and leisure in the modern age. From cinema and concerts to video games and hobbies, learn to express your interests and plan exciting activities with friends.",
        theme: "red",
        functions: ["Suggesting activities", "Talking about hobbies", "Reviewing movies"],
        vocabulary: [
            { word: "Cinema", description: "A place where movies are shown on a large screen.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683575015997603/241757-les-17-films-les-plus-attendus-de-2017.png?ex=69a5a792&is=69a45612&hm=9b8cad6f022843d45122b34ed6c61dcb6bc7cf6195914e5c16fc87547da67642&" },
            { word: "Concert", description: "A live music performance.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683673204527144/The-Rooftop-at-Pier-17-concert.png?ex=69a5a7a9&is=69a45629&hm=f4a7bce79106764ccdadd4772b59050ac58c771f6d39e3e0734f2236d0019b44&" },
            { word: "Gaming", description: "The action or practice of playing video games.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683802221318276/How_to_Improve_Your_Gaming_PC_Performance-Hero.png?ex=69a5a7c8&is=69a45648&hm=2280fdf9c77edc7f5f33b7370ac9afead8cd20881c4e65e8c913676745cd629a&" },
            { word: "Photography", description: "The art or practice of taking photos.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683896991744000/PIC40215-URE_IARc_Class_Trip_Wild_Dunes_2966_1920px.png?ex=69a5a7df&is=69a4565f&hm=2c5825d712c7bb1a970f6c20b11c04a6ece92d7b284cf411a6d1e3f93364c58b&" },
            { word: "Painting", description: "The practice of applying paint to a surface.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477683990814134302/IMG_994570-1024x752.png?ex=69a5a7f5&is=69a45675&hm=c1bccb6319d90f5104595406a909447d1db7d61810aa1848e37ceae559145141&" },
            { word: "Hobby", description: "An activity done regularly in one's leisure time.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477684097034748075/the-everygirl-feature-hobbies-at-home.png?ex=69a5a80e&is=69a4568e&hm=a414911f819b71de6e99c1029a77929b19e69f60be8888f6b050de3198a00632&" },
        ],
        grammar: ["Let's + verb", "How about + -ing?"],
        audioResources: [],
        exercises: [
            {
                title: "Leisure & Fun Trivia",
                status: "available",
                questions: [
                    { question: "Where do you go to watch new movies?", options: ["Cinema", "Library", "Museum", "Park"], correctAnswer: 0 },
                    { question: "A person who loves taking photos likes ___.", options: ["Painting", "Gaming", "Photography", "Cooking"], correctAnswer: 2 },
                    { question: "Playing video games is called ___.", options: ["Sporting", "Gaming", "Reading", "Hiking"], correctAnswer: 1 },
                    { question: "A ___ is a live music performance.", options: ["Cinema", "Concert", "Painting", "Hobby"], correctAnswer: 1 },
                    { question: "My favorite ___ is collecting stamps.", options: ["Job", "Hobby", "Lesson", "Rule"], correctAnswer: 1 },
                    { question: "She uses brushes and oil colors for her ___.", options: ["Photography", "Painting", "Gaming", "Singing"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 7: Suggestions",
                status: "available",
                questions: [
                    { question: "___ go to the gaming center tomorrow.", options: ["Let's", "How about", "Why", "Shall"], correctAnswer: 0 },
                    { question: "How about ___ to the concert tonight?", options: ["Go", "Going", "To go", "Goes"], correctAnswer: 1 },
                    { question: "Let's ___ a movie this weekend.", options: ["watch", "watching", "to watch", "watches"], correctAnswer: 0 },
                    { question: "Why don't we ___ photography?", options: ["try", "trying", "to try", "tried"], correctAnswer: 0 },
                    { question: "How ___ playing a video game?", options: ["let's", "about", "why", "do"], correctAnswer: 1 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 8,
        title: "School Life",
        description: "Academic journeys and student experiences. Master the language of school subjects, schedules, rules, and extracurricular activities while preparing for a bright educational future.",
        theme: "blue",
        functions: ["Talking about school subjects", "Discussing rules", "Asking about schedules"],
        vocabulary: [
            { word: "Mathematics", description: "The study of numbers, shapes, and patterns.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477684279193632934/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.png?ex=69a5a83a&is=69a456ba&hm=8c71790aa7b4e085dfd5df8eb3c2fe34767cbd6f396954e20a4ff76a26fd45df&" },
            { word: "Physics", description: "The study of matter, energy, and force.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477684386953560196/68177b8a135bfa001db77a76.png?ex=69a5a853&is=69a456d3&hm=543069c5bc4938d75bcf7f3db42ec61a263f71394d4e9d374285a36c7ff1dd10&" },
            { word: "Chemistry", description: "The study of substances and their reactions.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477684740101505165/MIT-New-Catalysis-01-press-scaled.png?ex=69a5a8a8&is=69a45728&hm=e51b4bd8b9886d95e8ad792830093e4aef36623f759a845fabd3baf72f169776&" },
            { word: "History", description: "The study of past events.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477684816811130993/images.png?ex=69a5a8ba&is=69a4573a&hm=e6ac75bfa6b36046717089fc4a72e05d1c6a1c849dc4d3d92046636d9a0515cf&" },
            { word: "Library", description: "A place where books and media are kept.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477684918816608458/24manguel-articleLarge.png?ex=69a5a8d2&is=69a45752&hm=ccdfa7516fd3bf194286cdbabfa4841e8de6f2ffc16e4f69596b9bd8766a4db4&" },
            { word: "Uniform", description: "A set of clothes worn by all students of a school.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477685101373554808/3709AD82FE8BFA7FDADD1888D1118079.png?ex=69a5a8fe&is=69a4577e&hm=65ac116776e6867734826c480965aedeb7d9b0db5c541d9d69bae529ee844e76&" },
        ],
        grammar: ["Have to / Don't have to", "Must for rules"],
        audioResources: [],
        exercises: [
            {
                title: "Academy Rulebook Quiz",
                status: "available",
                questions: [
                    { question: "Which subject studies numbers and shapes?", options: ["History", "Physics", "Mathematics", "Art"], correctAnswer: 2 },
                    { question: "You can find many books to read in the ___.", options: ["Salon", "Library", "Gym", "Garage"], correctAnswer: 1 },
                    { question: "Students wear a ___ so everyone looks the same.", options: ["Sweater", "Uniform", "Djellaba", "Costume"], correctAnswer: 1 },
                    { question: "In ___ class, we learn about the past.", options: ["Chemistry", "History", "Physics", "Arabic"], correctAnswer: 1 },
                    { question: "___ is the study of matter and energy.", options: ["History", "Art", "Physics", "English"], correctAnswer: 2 },
                    { question: "We do experiments in the ___ class.", options: ["Geography", "Chemistry", "Philosophy", "Music"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 8: Obligations & Rules",
                status: "available",
                questions: [
                    { question: "You ___ be on time for class.", options: ["Must", "Shouldn't", "May", "Don't have to"], correctAnswer: 0 },
                    { question: "We ___ wear a uniform in our school.", options: ["Have to", "Shouldn't", "Haven't to", "Must to"], correctAnswer: 0 },
                    { question: "You ___ talk loudly in the library.", options: ["Must", "Should", "Mustn't", "Have to"], correctAnswer: 2 },
                    { question: "Do we ___ bring our own laptops?", options: ["must", "have to", "should", "want"], correctAnswer: 1 },
                    { question: "He ___ study hard for the final exams.", options: ["must", "has to", "should", "don't have to"], correctAnswer: 1 }
                ]
            }
        ],
        image: ""
    },
    {
        id: 9,
        title: "Travel",
        description: "Embark on global adventures. Navigate airports, hotels, and tourist attractions. Learn to book trips, ask for directions, and share your travel experiences from across the globe.",
        theme: "green",
        functions: ["Booking a hotel", "Asking for directions", "At the airport"],
        vocabulary: [
            { word: "Passport", description: "An official document for international travel.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477685224312672457/United-States-Passport-102725-43a9e24d946e4a8f90cef48b97ea1608.png?ex=69a5a91b&is=69a4579b&hm=ea417b395448209ae15a239337de1d1942665b38a19b8d9076ebfb2867c85891&" },
            { word: "Suitcase", description: "A case used for carrying clothes while traveling.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477685336774803627/ghk-032024-indexteting-luggage-225-srgb-660daf9f03d7d.png?ex=69a5a936&is=69a457b6&hm=3f786e2379a4ffba9e95ef0b7dce14c7ab5f2d192ac1df38bd3e07f1054a8f2f&" },
            { word: "Hotel", description: "An establishment providing lodging for travelers.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477685458614882356/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f.png?ex=69a5a953&is=69a457d3&hm=217d6e6693965ac1cf2abc717d00e7bcefc6ab4e5274dbdb2828195b2c232d8a&" },
            { word: "Airport", description: "A place where aircraft land and take off.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477685610054680616/plane-at-an-airport-terminal-airport-planning-hero.png?ex=69a5a977&is=69a457f7&hm=d50aa594dc4d84f0fd9299c470866859b60c7b599a1878e3ee9e9c068b30b241&" },
            { word: "Luggage", description: "Suitcases or other bags containing a traveler's belongings.", image: "https://cdn.discordapp.com/attachments/1476946254016544951/1477685967736275095/REI-Stuff-Bag-1-600x450.png?ex=69a5a9cc&is=69a4584c&hm=2e15f8f6f54fa666c999097a004d6fa849a9b7276ebfc2a213f228b27eb79bb2&" },
        ],
        grammar: ["First Conditional", "Going to for intentions"],
        audioResources: [],
        exercises: [
            {
                title: "Globe-Trotters Mission",
                status: "available",
                questions: [
                    { question: "You need a ___ to travel to another country.", options: ["Ticket", "Passport", "Book", "Map"], correctAnswer: 1 },
                    { question: "You put your clothes into a ___ for traveling.", options: ["Backpack", "Suitcase", "Cabinet", "Pocket"], correctAnswer: 1 },
                    { question: "A ___ is a place where you stay during your holiday.", options: ["Airport", "Hotel", "Station", "Museum"], correctAnswer: 1 },
                    { question: "The ___ is where planes take off and land.", options: ["Hotel", "Airport", "Market", "Beach"], correctAnswer: 1 },
                    { question: "All your bags and suitcases are called ___.", options: ["Stuff", "Luggage", "Gear", "Items"], correctAnswer: 1 }
                ]
            },
            {
                title: "Unit 9: Conditionals & Plans",
                status: "available",
                questions: [
                    { question: "If it rains tomorrow, we ___ at the hotel.", options: ["Stay", "Will stay", "Stays", "Are staying"], correctAnswer: 1 },
                    { question: "I am ___ visit Marrakesh next summer.", options: ["Go to", "Going to", "Will", "Went to"], correctAnswer: 1 },
                    { question: "If you ___ hard, you will pass the exam.", options: ["study", "will study", "studies", "studied"], correctAnswer: 0 },
                    { question: "We are ___ stay in a 5-star hotel.", options: ["will", "going to", "want", "plan"], correctAnswer: 1 },
                    { question: "If she has time, she ___ us a postcard.", options: ["sends", "will send", "send", "sending"], correctAnswer: 1 }
                ]
            }
        ],
        image: ""
    }
];
