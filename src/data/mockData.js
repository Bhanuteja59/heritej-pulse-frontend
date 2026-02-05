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

// Rich Content Generators
const generateContent = (title, category) => {
    return [
        {
            type: 'paragraph',
            content: [
                { text: title, highlight: true },
                { text: ` is a significant aspect of Indian ${category.toLowerCase()}. It represents the rich tapestry of our cultural history, weaving together thousands of years of tradition, art, and spirituality.` }
            ]
        },
        {
            type: 'paragraph',
            content: [
                { text: "Detailed historical records suggest that this practice dates back to ancient times, evolving through various dynastic eras and preserving its core essence while adapting to modern sensibilities." }
            ]
        },
        {
            type: 'paragraph',
            content: [
                { text: "Today, it continues to inspire artists, historians, and travelers from around the world, serving as a vibrant testament to India's enduring " },
                { text: "legacy", highlight: true },
                { text: "." }
            ]
        }
    ];
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
        { id: "e1", title: "Indian Dharma", imageKeyword: "dharma", rating: "4.8", reviews: "2.6k reviews", categoryBadge: "Heritage Places", tags: ["Culture", "Philosophy"], location: "India", duration: "N/A" },
        { id: "e2", title: "Taj Mahal", imageKeyword: "tajmahal", rating: "4.9", reviews: "15k reviews", categoryBadge: "Heritage Places", tags: ["Monument", "Wonder"], location: "Agra, UP", duration: "2-3 hours" }
    ],
    culturalEvents: [
        { id: "ev1", title: "Telangana Cultural Events", imageKeyword: "telangana", rating: "4.5", reviews: "1.2k reviews", categoryBadge: "Event", tags: ["Dance", "Music"], location: "Hyderabad", duration: "Evening" }
    ],
    museums: [
        { id: "m1", title: "National Museum", imageKeyword: "museum", rating: "4.7", reviews: "5k reviews", categoryBadge: "Museum", tags: ["History", "Art"], location: "New Delhi", duration: "3-4 hours" }
    ]
};

export const FALLBACK_SAVED_DATA = [
    { id: "s1", title: "Indian Heritage and Cultural Dance", category: "India", imageKeyword: "indian dance", publisher: "PIF News", timeAgo: "14m ago", subtitle: "Rhythm of the Soul", keywords: ["#Dance", "#Culture", "#Rhythm"] },
    { id: "s2", title: "Ancient Temples of South India", category: "Tamil Nadu", imageKeyword: "temple", publisher: "Heritage Daily", timeAgo: "1h ago", subtitle: "Dravidian Masterpieces", keywords: ["#Temples", "#SouthIndia", "#Dravidian"] }
];

// --- ADAPTER LOGIC ---

// Helper to map raw items to UI-ready articles
const mapItemToArticle = (item) => ({
    ...item,
    image: item.image || getImageUrl(item.imageKeyword || 'culture', item.id),
    timestamp: item.timeAgo || 'Just now',
    publisher: item.publisher || 'Heritage Pulse',
    subtitle: item.subtitle || item.categoryBadge || 'Discover India',
    content: generateContent(item.title, item.category || 'Culture'), // Dynamic Rich Content
    category: item.category || 'General', // Ensure category exists
    keywords: item.keywords || generateKeywords(item.category || 'Culture'), // Ensure keywords exist
    isTrending: false,
    likes: generateRandomStats(item.id, 'likes'),
    comments: generateRandomStats(item.id, 'comments'),
});

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
const ALL_ITEMS = [
    ...FALLBACK_HOME_DATA.trending,
    ...FALLBACK_HOME_DATA.latest,
    ...FALLBACK_EXPLORE_DATA.topNews,
    ...FALLBACK_EXPLORE_DATA.culturalEvents,
    ...FALLBACK_EXPLORE_DATA.museums,
    ...FALLBACK_SAVED_DATA
].map(mapItemToArticle);

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
    getTrendingArticles: () => {
        return currentTrending.map(mapItemToArticle);
    },

    getLatestNews: () => {
        return currentLatest.map(mapItemToArticle);
    },

    getAllArticles: () => {
        return ALL_ITEMS;
    },

    getExploreSection: (key) => {
        // Helper to get specific explore sections
        if (FALLBACK_EXPLORE_DATA[key]) {
            return FALLBACK_EXPLORE_DATA[key].map(mapItemToArticle);
        }
        return [];
    },

    getArticleById: (id) => {
        return ALL_ITEMS.find(a => a.id === id) || ALL_ITEMS[0];
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

    getSavedArticles: () => {
        // Return objects for saved IDs. 
        // We try to find them in ALL_ITEMS, or fallback to the hardcoded SAVED_DATA items if missing.
        return savedArticleIds.map(id => {
            const found = ALL_ITEMS.find(a => a.id === id);
            if (found) return found;
            // If purely from fallback saved data
            const rawSaved = FALLBACK_SAVED_DATA.find(s => s.id === id);
            return rawSaved ? mapItemToArticle(rawSaved) : null;
        }).filter(Boolean);
    },

    getUserProfile: () => PROFILE_USER,

    refreshData: () => {
        // Shuffle the arrays to simulate new content
        currentTrending = shuffleArray([...FALLBACK_HOME_DATA.trending]);
        currentLatest = shuffleArray([...FALLBACK_HOME_DATA.latest]);
        return true;
    },
};
