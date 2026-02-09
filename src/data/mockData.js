// Consolidated Mock Data & Service
// Replaces src/services/mockData.js

// Image Helper
export const getImageUrl = (keyword, id, width = 400, height = 300) => {
    return `https://picsum.photos/seed/${id + keyword}/${width}/${height}`;
};

// Profile Data
export const PROFILE_USER = {
    name: "Priya Sharma",
    role: "Heritage Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    stats: {
        saved: 23,
        read: 12
    }
};

const PROFILE_TRANSLATIONS = {
    te: { name: "ప్రియా శర్మ", role: "వారసత్వ ఆసక్తిగల వ్యక్తి" },
    ta: { name: "பிரியா சர்மா", role: "பாரம்பரிய ஆர்வலர்" },
    kn: { name: "ಪ್ರಿಯಾ ಶರ್ಮಾ", role: "ಪರಂಪರೆ ಆಸಕ್ತ" },
};


// Chat Data
export const INITIAL_CHAT_MESSAGES = [
    { id: '1', role: 'model', text: 'Namaste! I am your Heritage Guide. Ask me anything about Indian traditions, festivals, or history.' }
];



// Explore Categories
export const EXPLORE_CATEGORIES = [
    { name: 'All', color: 'bg-gray-900 text-white', icon: '🌍' },
    { name: 'Heritage', color: 'bg-orange-100 text-orange-800', icon: '🏛️' },
    { name: 'Dance', color: 'bg-pink-100 text-pink-800', icon: '💃' },
    { name: 'History', color: 'bg-blue-100 text-blue-800', icon: '📜' },
    { name: 'Events', color: 'bg-red-100 text-red-800', icon: '🎭' },
    { name: 'Culture', color: 'bg-green-100 text-green-800', icon: '🕉️' },
    { name: 'Food', color: 'bg-yellow-100 text-yellow-800', icon: '🥘' },
];

// Rich Content Generators (localized)
const generateContent = (title, category, language = "en") => {
    const templates = {
        en: [
            [
                { text: title, highlight: true },
                { text: ` is a significant aspect of Indian ${String(category).toLowerCase()}. It represents the rich tapestry of our cultural history, weaving together thousands of years of tradition, art, and spirituality.` }
            ],
            [
                { text: "Detailed historical records suggest that this practice dates back to ancient times, evolving through various dynastic eras and preserving its core essence while adapting to modern sensibilities." }
            ],
            [
                { text: "Today, it continues to inspire artists, historians, and travelers from around the world, serving as a vibrant testament to India's enduring " },
                { text: "legacy", highlight: true },
                { text: "." }
            ]
        ],
        te: [
            [
                { text: title, highlight: true },
                { text: ` భారతీయ ${String(category).toLowerCase()}లో ఒక ముఖ్యమైన అంశం. ఇది మన సంస్కృతిక చరిత్రకు నూలుపోగు లాంటి సంపదను ప్రతిబింబిస్తుంది.` }
            ],
            [
                { text: "వివరమైన చారిత్రక రికార్డులు ఈ ప్రక్రియ పురాతన కాలానికి చెందినదని సూచిస్తాయి; కాలానుగుణంగా ఇది రూపాంతరం చెందింది." }
            ],
            [
                { text: "ఈరోజు కూడా ఇది కళాకారులు, చరిత్రకారులు మరియు ప్రయాణికులను ప్రేరేపిస్తూ భారతదేశపు చిరస్థాయి " },
                { text: "విరాసత", highlight: true },
                { text: "కు సాక్ష్యంగా నిలుస్తోంది." }
            ]
        ],
        ta: [
            [
                { text: title, highlight: true },
                { text: ` இந்திய ${String(category).toLowerCase()} கலாச்சாரத்தின் ஒரு முக்கிய கூறாகும். இது ஆயிரக்கணக்கான ஆண்டுகளின் பாரம்பரியத்தை பிரதிபலிக்கிறது.` }
            ],
            [
                { text: "விரிவான வரலாற்றுச் சான்றுகள், இது பழங்காலத்தில் தொடங்கியதையும் காலப்போக்கில் பரிணமித்ததையும் காட்டுகிறது." }
            ],
            [
                { text: "இன்றும் இது உலகம் முழுவதும் கலைஞர்கள், வரலாற்றாளர்கள் மற்றும் பயணிகளை ஊக்குவித்து இந்தியாவின் நீடித்த " },
                { text: "பாரம்பரியத்தை", highlight: true },
                { text: " பிரதிபலிக்கிறது." }
            ]
        ],
        kn: [
            [
                { text: title, highlight: true },
                { text: ` ಭಾರತದ ${String(category).toLowerCase()} ಸಂಸ್ಕೃತಿಯ ಪ್ರಮುಖ ಅಂಗವಾಗಿದೆ. ಇದು ಸಾವಿರಾರು ವರ್ಷಗಳ ಪರಂಪರೆ, ಕಲೆ ಮತ್ತು ಆತ್ಮೀಯತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.` }
            ],
            [
                { text: "ವಿವರವಾದ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಇದು ಪ್ರಾಚೀನ ಕಾಲದಿಂದ ಆರಂಭಗೊಂಡು ಕಾಲಾಂತರದಲ್ಲಿ ರೂಪಾಂತರಗೊಂಡಿತೆಂದು ಸೂಚಿಸುತ್ತವೆ." }
            ],
            [
                { text: "ಇಂದಿಗೂ ಇದು ಕಲಾವಿದರು, ಇತಿಹಾಸಕಾರರು ಮತ್ತು ಪ್ರವಾಸಿಗರನ್ನು ಪ್ರೇರೇಪಿಸಿ ಭಾರತದ ಶಾಶ್ವತ " },
                { text: "ಪರಂಪರೆಯ", highlight: true },
                { text: " ಸಾಕ್ಷಿಯಾಗಿದೆ." }
            ]
        ]
    };

    const chosen = templates[language] || templates.en;
    return chosen.map((content) => ({ type: "paragraph", content }));
};

const generateKeywords = (category) => {
    const base = ['#India', `#${category}`, '#Culture'];
    if (category === 'History') return [...base, '#Ancient', '#Archaeology'];
    if (category === 'Dance') return [...base, '#Classical', '#ArtForm'];
    if (category === 'Festivals') return [...base, '#Celebration', '#Tradition'];
    return [...base, '#Heritage', '#Travel'];
};

// Fallback Data
export const FALLBACK_HOME_DATA = {
    trending: [
        { id: "t1", title: "The Majestic Mysore Dasara", category: "Festivals", imageKeyword: "mysore palace", subtitle: "A Royal Celebration", keywords: ["#Mysore", "#Dasara", "#Royal"] },
        { id: "t2", title: "Chola Temples: Granite Wonders", category: "History", imageKeyword: "temple", subtitle: "Living Chola Temples", keywords: ["#Chola", "#Architecture", "#History"] },
        { id: "t3", title: "Reviving Ancient Weaves", category: "Art", imageKeyword: "loom", subtitle: "Handloom Heritage", keywords: ["#Handloom", "#Craft", "#Weaves"] },
        { id: "t4", title: "Classical Dances of India", category: "Dance", imageKeyword: "kathakali", subtitle: "Poetry in Motion", keywords: ["#ClassicalDance", "#Kathakali", "#Art"] },
        { id: "t5", title: "Spices of the Malabar Coast", category: "Food", imageKeyword: "spices", subtitle: "The Flavor of History", keywords: ["#Kerala", "#Spices", "#Cuisine"] },
        { id: "t6", title: "Yoga: An Eternal Legacy", category: "Heritage", imageKeyword: "yoga", subtitle: "Ancient Wellness", keywords: ["#Yoga", "#Wellness", "#Spirituality"] },

    ],
    latest: [
        { id: "l1", title: "New Excavations at Keezhadi", category: "History", imageKeyword: "excavation", publisher: "ASI News", timeAgo: "2h ago", subtitle: "Unearthing the Past", keywords: ["#Keezhadi", "#TamilNadu", "#Excavation"] },
        { id: "l2", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l3", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l4", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l5", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l6", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l7", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l8", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l9", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
        { id: "l10", title: "Kumbh Mela Preparations Begin", category: "Culture", imageKeyword: "ganges", publisher: "Heritage Daily", timeAgo: "4h ago", subtitle: "Largest Human Gathering", keywords: ["#KumbhMela", "#Spiritual", "#Ganges"] },
    ]
};

export const FALLBACK_EXPLORE_DATA = {
    topNews: [
        { id: "e1", title: "Indian Dharma", imageKeyword: "dharma", rating: "4.8", reviews: "2.6k reviews", category: "Heritage", categoryBadge: "Heritage Places", tags: ["Culture", "Philosophy"], location: "India", duration: "N/A" },
        { id: "e2", title: "Taj Mahal", imageKeyword: "tajmahal", rating: "4.9", reviews: "15k reviews", category: "History", categoryBadge: "Heritage Places", tags: ["Monument", "Wonder"], location: "Agra, UP", duration: "2-3 hours" }
    ],
    culturalEvents: [
        { id: "ev1", title: "Telangana Cultural Events", imageKeyword: "telangana", rating: "4.5", reviews: "1.2k reviews", category: "Events", categoryBadge: "Event", tags: ["Dance", "Music"], location: "Hyderabad", duration: "Evening" }
    ],
    museums: [
        { id: "m1", title: "National Museum", imageKeyword: "museum", rating: "4.7", reviews: "5k reviews", category: "Culture", categoryBadge: "Museum", tags: ["History", "Art"], location: "New Delhi", duration: "3-4 hours" }
    ]
};

const ITEM_TRANSLATIONS = {
    te: {
        t1: { title: "మైసూరు దసరా వైభవం", category: "పండుగలు", subtitle: "రాజసిక వేడుక", keywords: ["#మైసూరు", "#దసరా", "#రాజసం"] },
        t2: { title: "చోళ దేవాలయాలు: గ్రానైట్ అద్భుతాలు", category: "చరిత్ర", subtitle: "జీవించే చోళ దేవాలయాలు", keywords: ["#చోళ", "#వాస్తుశిల్పం", "#చరిత్ర"] },
        t3: { title: "పురాతన నెయ్యడాల పునరుజ్జీవనం", category: "కళ", subtitle: "హ్యాండ్‌లూమ్ వారసత్వం", keywords: ["#హ్యాండ్‌లూమ్", "#శిల్పం", "#నెయ్యడం"] },
        t4: { title: "భారత శాస్త్రీయ నృత్యాలు", category: "నృత్యం", subtitle: "చలనంలో కావ్యం", keywords: ["#శాస్త్రీయనృత్యం", "#కథకళి", "#కళ"] },
        t5: { title: "మలబార్ తీరపు మసాలాలు", category: "ఆహారం", subtitle: "చరిత్ర రుచి", keywords: ["#కేరళ", "#మసాలాలు", "#వంట"] },
        t6: { title: "యోగం: శాశ్వత వారసత్వం", category: "వారసత్వం", subtitle: "పురాతన వెల్‌నెస్", keywords: ["#యోగం", "#వెల్‌నెస్", "#ఆధ్యాత్మికత"] },
        l1: { title: "కీళాది లో కొత్త తవ్వకాలు", category: "చరిత్ర", subtitle: "గతాన్ని వెలికితీస్తూ", publisher: "ASI వార్తలు", timeAgo: "2గం క్రితం" },
        l2: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l3: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l4: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l5: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l6: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l7: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l8: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l9: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        l10: { title: "కుంభమేళా ఏర్పాట్లు ప్రారంభం", category: "సంస్కృతి", subtitle: "అత్యంత పెద్ద సమూహం", publisher: "Heritage Daily", timeAgo: "4గం క్రితం" },
        e1: { title: "భారతీయ ధర్మం", category: "వారసత్వం", categoryBadge: "వారసత్వ స్థలాలు", tags: ["సంస్కృతి", "తత్వశాస్త్రం"], location: "భారతదేశం", duration: "లభ్యం కాదు" },
        e2: { title: "తాజ్ మహల్", category: "చరిత్ర", categoryBadge: "వారసత్వ స్థలాలు", tags: ["స్మారకం", "అద్భుతం"], location: "ఆగ్రా, యూపీ", duration: "2-3 గంటలు" },
        ev1: { title: "తెలంగాణ సాంస్కృతిక ఈవెంట్స్", category: "ఈవెంట్స్", categoryBadge: "ఈవెంట్", tags: ["నృత్యం", "సంగీతం"], location: "హైదరాబాద్", duration: "సాయంత్రం" },
        m1: { title: "జాతీయ మ్యూజియం", category: "సంస్కృతి", categoryBadge: "మ్యూజియం", tags: ["చరిత్ర", "కళ"], location: "న్యూ ఢిల్లీ", duration: "3-4 గంటలు" },
        s1: { title: "భారత వారసత్వం మరియు సాంస్కృతిక నృత్యం", category: "భారతదేశం", subtitle: "ఆత్మ యొక్క తాళం", publisher: "PIF News" },
        s2: { title: "దక్షిణ భారత పురాతన దేవాలయాలు", category: "తమిళనాడు", subtitle: "ద్రావిడ శిల్పకళ", publisher: "Heritage Daily" },
    },
    ta: {
        t1: { title: "மைசூர் தஸரா மகிமை", category: "திருவிழாக்கள்", subtitle: "அரசர்கால கொண்டாட்டம்", keywords: ["#மைசூர்", "#தஸரா", "#அரசர்"] },
        t2: { title: "சோழக் கோவில்கள்: கற்சிற்ப அதிசயம்", category: "வரலாறு", subtitle: "உயிருடன் இருக்கும் சோழ கோவில்கள்", keywords: ["#சோழ", "#வெட்டுக்கலை", "#வரலாறு"] },
        t3: { title: "பழமையான நெசவின் மீளுருவாக்கம்", category: "கலை", subtitle: "கைத்தறி பாரம்பரியம்", keywords: ["#கைத்தறி", "#கலை", "#நெசவு"] },
        t4: { title: "இந்திய பாரம்பரிய நடனங்கள்", category: "நடனம்", subtitle: "இசைமயமான இயக்கம்", keywords: ["#நடனம்", "#கதகளி", "#கலை"] },
        t5: { title: "மலபார் கரையின் மசாலா", category: "உணவு", subtitle: "வரலாற்றின் ருசி", keywords: ["#கேரளா", "#மசாலா", "#உணவு"] },
        t6: { title: "யோகா: நித்திய பாரம்பரியம்", category: "பாரம்பரியம்", subtitle: "பழமையான நலன்", keywords: ["#யோகா", "#நலன்", "#ஆன்மிகம்"] },
        l1: { title: "கீழாடியில் புதிய அகழ்வுகள்", category: "வரலாறு", subtitle: "கடந்ததை வெளிப்படுத்துதல்", publisher: "ASI செய்திகள்", timeAgo: "2 மணி முன்பு" },
        l2: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l3: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l4: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l5: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l6: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l7: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l8: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l9: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        l10: { title: "கும்பமேளா ஏற்பாடுகள் தொடங்கின", category: "பண்பாடு", subtitle: "பெரிய மனித கூடுகை", publisher: "Heritage Daily", timeAgo: "4 மணி முன்பு" },
        e1: { title: "இந்திய தர்மம்", category: "பாரம்பரியம்", categoryBadge: "பாரம்பரிய இடங்கள்", tags: ["பண்பாடு", "தத்துவம்"], location: "இந்தியா", duration: "தகவல் இல்லை" },
        e2: { title: "தாஜ்மஹால்", category: "வரலாறு", categoryBadge: "பாரம்பரிய இடங்கள்", tags: ["நினைவிடம்", "அற்புதம்"], location: "ஆக்ரா, உ.பி.", duration: "2-3 மணி" },
        ev1: { title: "தெலங்கானா கலாச்சார நிகழ்வுகள்", category: "நிகழ்வுகள்", categoryBadge: "நிகழ்வு", tags: ["நடனம்", "இசை"], location: "ஹைதராபாத்", duration: "மாலை" },
        m1: { title: "தேசிய அருங்காட்சியகம்", category: "பண்பாடு", categoryBadge: "அருங்காட்சியகம்", tags: ["வரலாறு", "கலை"], location: "நியூ டெல்லி", duration: "3-4 மணி" },
        s1: { title: "இந்திய பாரம்பரியம் மற்றும் கலாச்சார நடனம்", category: "இந்தியா", subtitle: "ஆவியின் தாளம்", publisher: "PIF News" },
        s2: { title: "தென் இந்தியாவின் பழங்கால கோவில்கள்", category: "தமிழ்நாடு", subtitle: "திராவிடக் சிற்பங்கள்", publisher: "Heritage Daily" },
    },
    kn: {
        t1: { title: "ಮೈಸೂರ ದಸರಾ ವೈಭವ", category: "ಹಬ್ಬಗಳು", subtitle: "ರಾಜಸಿಕ ಆಚರಣೆ", keywords: ["#ಮೈಸೂರು", "#ದಸರಾ", "#ರಾಜಸ"] },
        t2: { title: "ಚೋಳ ದೇವಾಲಯಗಳು: ಗ್ರಾನೈಟ್ ಅದ್ಭುತಗಳು", category: "ಇತಿಹಾಸ", subtitle: "ಬದುಕಿರುವ ಚೋಳ ದೇವಾಲಯಗಳು", keywords: ["#ಚೋಳ", "#ವಾಸ್ತು", "#ಇತಿಹಾಸ"] },
        t3: { title: "ಪ್ರಾಚೀನ ನೇಕಾರದ ಪುನರುಜ್ಜೀವನ", category: "ಕಲೆ", subtitle: "ಕೈಮಗ್ಗ ಪರಂಪರೆ", keywords: ["#ಕೈಮಗ್ಗ", "#ಕಲೆ", "#ನೇಕಾರಿಕೆ"] },
        t4: { title: "ಭಾರತದ ಶಾಸ್ತ್ರೀಯ ನೃತ್ಯಗಳು", category: "ನೃತ್ಯ", subtitle: "ಚಲನೆಯಲ್ಲಿ ಕಾವ್ಯ", keywords: ["#ನೃತ್ಯ", "#ಕಥಕಳಿ", "#ಕಲೆ"] },
        t5: { title: "ಮಲಬಾರ್ ಕರಾವಳಿಯ ಮಸಾಲೆಗಳು", category: "ಆಹಾರ", subtitle: "ಇತಿಹಾಸದ ರುಚಿ", keywords: ["#ಕೇರಳ", "#ಮಸಾಲೆ", "#ಆಹಾರ"] },
        t6: { title: "ಯೋಗ: ಶಾಶ್ವತ ಪರಂಪರೆ", category: "ಪರಂಪರೆ", subtitle: "ಪುರಾತನ ವೆಲ್‌ನೆಸ್", keywords: ["#ಯೋಗ", "#ವೆಲ್‌ನೆಸ್", "#ಆಧ್ಯಾತ್ಮ"] },
        l1: { title: "ಕீழಾಡಿಯಲ್ಲಿ ಹೊಸ ತೋಡಿಕೆಗಳು", category: "ಇತಿಹಾಸ", subtitle: "ಭೂತಕಾಲ ಅನಾವರಣ", publisher: "ASI ಸುದ್ದಿಗಳು", timeAgo: "2 ಗಂಟೆ ಹಿಂದೆ" },
        l2: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l3: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l4: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l5: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l6: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l7: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l8: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l9: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        l10: { title: "ಕುಂಭಮೇಳಾ ತಯಾರಿಗಳು ಆರಂಭ", category: "ಸಂಸ್ಕೃತಿ", subtitle: "ಅತಿದೊಡ್ಡ ಮಾನವ ಸಮಾಗಮ", publisher: "Heritage Daily", timeAgo: "4 ಗಂಟೆ ಹಿಂದೆ" },
        e1: { title: "ಭಾರತೀಯ ಧರ್ಮ", category: "ಪರಂಪರೆ", categoryBadge: "ಪರಂಪರೆಯ ಸ್ಥಳಗಳು", tags: ["ಸಂಸ್ಕೃತಿ", "ದರ್ಶನ"], location: "ಭಾರತ", duration: "ಲಭ್ಯವಿಲ್ಲ" },
        e2: { title: "ತಾಜ್ ಮಹಲ್", category: "ಇತಿಹಾಸ", categoryBadge: "ಪರಂಪರೆಯ ಸ್ಥಳಗಳು", tags: ["ಸ್ಮಾರಕ", "ಅದ್ಭುತ"], location: "ಆಗ್ರಾ, ಯುಪಿ", duration: "2-3 ಗಂಟೆ" },
        ev1: { title: "ತೆಲಂಗಾಣ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು", category: "ಕಾರ್ಯಕ್ರಮಗಳು", categoryBadge: "ಕಾರ್ಯಕ್ರಮ", tags: ["ನೃತ್ಯ", "ಸಂಗೀತ"], location: "ಹೈದರಾಬಾದ್", duration: "ಸಂಜೆ" },
        m1: { title: "ರಾಷ್ಟ್ರೀಯ ಮ್ಯೂಸಿಯಂ", category: "ಸಂಸ್ಕೃತಿ", categoryBadge: "ಮ್ಯೂಸಿಯಂ", tags: ["ಇತಿಹಾಸ", "ಕಲೆ"], location: "ನ್ಯೂ ದೆಹಲಿ", duration: "3-4 ಗಂಟೆ" },
        s1: { title: "ಭಾರತೀಯ ಪರಂಪರೆ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ನೃತ್ಯ", category: "ಭಾರತ", subtitle: "ಆತ್ಮದ ಲಯ", publisher: "PIF News" },
        s2: { title: "ದಕ್ಷಿಣ ಭಾರತದ ಪುರಾತನ ದೇವಾಲಯಗಳು", category: "ತಮಿಳುನಾಡು", subtitle: "ದ್ರಾವಿಡ ಶಿಲ್ಪ", publisher: "Heritage Daily" },
    },
};

export const FALLBACK_SAVED_DATA = [
    { id: "s1", title: "Indian Heritage and Cultural Dance", category: "India", imageKeyword: "indian dance", publisher: "PIF News", timeAgo: "14m ago", subtitle: "Rhythm of the Soul", keywords: ["#Dance", "#Culture", "#Rhythm"] },
    { id: "s2", title: "Ancient Temples of South India", category: "Tamil Nadu", imageKeyword: "temple", publisher: "Heritage Daily", timeAgo: "1h ago", subtitle: "Dravidian Masterpieces", keywords: ["#Temples", "#SouthIndia", "#Dravidian"] }
];

// --- ADAPTER LOGIC ---

const getItemTranslation = (item, language) => {
    const map = ITEM_TRANSLATIONS[language];
    if (!map) return {};
    return map[item.id] || {};
};

const applyTranslation = (item, language) => {
    const translated = getItemTranslation(item, language);
    return {
        ...item,
        ...translated,
        tags: translated.tags || item.tags,
        keywords: translated.keywords || item.keywords,
    };
};

// Helper to map raw items to UI-ready articles
const mapItemToArticle = (item, language = "en") => {
    const localized = applyTranslation(item, language);
    return {
        ...localized,
        image: localized.image || getImageUrl(localized.imageKeyword || 'culture', localized.id),
        timestamp: localized.timeAgo || (language === "en" ? 'Just now' : localized.timeAgo) || 'Just now',
        publisher: localized.publisher || 'Heritage Pulse',
        subtitle: localized.subtitle || localized.categoryBadge || 'Discover India',
        content: generateContent(localized.title, localized.category || 'Culture', language), // Dynamic Rich Content
        category: localized.category || 'General', // Ensure category exists
        keywords: localized.keywords || generateKeywords(localized.category || 'Culture'), // Ensure keywords exist
        isTrending: false,
        likes: generateRandomStats(localized.id, 'likes'),
        comments: generateRandomStats(localized.id, 'comments'),
    };
};

// Helper for consistent random stats
const generateRandomStats = (id, type) => {
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (type === 'likes') {
        const val = (seed * 123) % 5000;
        return val > 1000 ? (val / 1000).toFixed(1) + 'k' : val.toString();
    }
    const val = (seed * 45) % 300;
    return val.toString();
};

// Aggregate all logical articles for ID lookups
const RAW_ITEMS = [
    ...FALLBACK_HOME_DATA.trending,
    ...FALLBACK_HOME_DATA.latest,
    ...FALLBACK_EXPLORE_DATA.topNews,
    ...FALLBACK_EXPLORE_DATA.culturalEvents,
    ...FALLBACK_EXPLORE_DATA.museums,
    ...FALLBACK_SAVED_DATA
];

let savedArticleIds = FALLBACK_SAVED_DATA.map(i => i.id);

// Mutable state for data
let currentTrending = [...FALLBACK_HOME_DATA.trending];
let currentLatest = [...FALLBACK_HOME_DATA.latest];

// Simple shuffle function
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const MockDataService = {
    getTrendingArticles: (language = "en") => {
        return currentTrending.map((item) => mapItemToArticle(item, language));
    },

    getLatestNews: (language = "en") => {
        return currentLatest.map((item) => mapItemToArticle(item, language));
    },

    getAllArticles: (language = "en") => {
        return RAW_ITEMS.map((item) => mapItemToArticle(item, language));
    },

    getExploreSection: (key, language = "en") => {
        // Helper to get specific explore sections
        if (FALLBACK_EXPLORE_DATA[key]) {
            return FALLBACK_EXPLORE_DATA[key].map((item) => mapItemToArticle(item, language));
        }
        return [];
    },

    getArticleById: (id, language = "en") => {
        const all = RAW_ITEMS.map((item) => mapItemToArticle(item, language));
        return all.find(a => a.id === id) || all[0];
    },

    toggleBookmark: (id) => {
        if (savedArticleIds.includes(id)) {
            savedArticleIds = savedArticleIds.filter(savedId => savedId !== id);
            return false; // NOT saved
        } else {
            savedArticleIds.push(id);
            return true; // SAVED
        }
    },

    isBookmarked: (id) => {
        return savedArticleIds.includes(id);
    },

    getSavedArticles: (language = "en") => {
        // Return objects for saved IDs. 
        // We try to find them in ALL_ITEMS, or fallback to the hardcoded SAVED_DATA items if missing.
        const all = RAW_ITEMS.map((item) => mapItemToArticle(item, language));
        return savedArticleIds.map(id => {
            const found = all.find(a => a.id === id);
            if (found) return found;
            // If purely from fallback saved data
            const rawSaved = FALLBACK_SAVED_DATA.find(s => s.id === id);
            return rawSaved ? mapItemToArticle(rawSaved, language) : null;
        }).filter(Boolean);
    },

    getUserProfile: (language = "en") => {
        const translated = PROFILE_TRANSLATIONS[language];
        return translated ? { ...PROFILE_USER, ...translated } : PROFILE_USER;
    },

    refreshData: () => {
        // Shuffle the arrays to simulate new content
        currentTrending = shuffleArray([...FALLBACK_HOME_DATA.trending]);
        currentLatest = shuffleArray([...FALLBACK_HOME_DATA.latest]);
        return true;
    },
};
