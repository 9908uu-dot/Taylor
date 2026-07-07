document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Theme Toggle (Dark / Light)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    const savedTheme = localStorage.getItem('italian-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('italian-theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('italian-theme', 'dark');
        }
    });

    // ==========================================
    // 2. Dictionary Database (Cambridge Style)
    // ==========================================
    const italianDictionaryData = [
        {
            word: 'libro',
            phonetic: 'LEE-broh',
            pos: 's.m.', // sostantivo maschile
            article: 'il',
            plural: 'libri',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '書 / 書籍', example: 'Leggo un libro interessante.', exampleTranslation: '我正在看一本很有趣的書。' },
                en: { meaning: 'book', example: 'Leggo un libro interessante.', exampleTranslation: 'I am reading an interesting book.' },
                es: { meaning: 'libro', example: 'Leggo un libro interessante.', exampleTranslation: 'Leo un libro interesante.' },
                ja: { meaning: '本 / 書籍', example: 'Leggo un libro interessante.', exampleTranslation: '私は面白い本を読んでいます。' },
                ko: { meaning: '책', example: 'Leggo un libro interessante.', exampleTranslation: '나는 흥미로운 책을 읽고 있습니다.' }
            }
        },
        {
            word: 'casa',
            phonetic: 'KAH-zah',
            pos: 's.f.', // sostantivo femminile
            article: 'la',
            plural: 'case',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '房子 / 家', example: 'La mia casa è grande.', exampleTranslation: '我的房子很大。' },
                en: { meaning: 'house / home', example: 'La mia casa è grande.', exampleTranslation: 'My house is big.' },
                es: { meaning: 'casa / hogar', example: 'La mia casa è grande.', exampleTranslation: 'Mi casa es grande.' },
                ja: { meaning: '家 / 自宅', example: 'La mia casa è grande.', exampleTranslation: '私の家は広いです。' },
                ko: { meaning: '집', example: 'La mia casa è grande.', exampleTranslation: '우리 집은 큽니다.' }
            }
        },
        {
            word: 'caffè',
            phonetic: 'kahf-FEH',
            pos: 's.m.',
            article: 'il',
            plural: 'caffè',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '咖啡', example: 'Prendiamo un caffè insieme?', exampleTranslation: '我們要不要一起喝杯咖啡？' },
                en: { meaning: 'coffee', example: 'Prendiamo un caffè insieme?', exampleTranslation: 'Shall we grab a coffee together?' },
                es: { meaning: 'café', example: 'Prendiamo un caffè insieme?', exampleTranslation: '¿Tomamos un café juntos?' },
                ja: { meaning: 'コーヒー', example: 'Prendiamo un caffè insieme?', exampleTranslation: '一緒にコーヒーを飲みませんか？' },
                ko: { meaning: '커피', example: 'Prendiamo un caffè insieme?', exampleTranslation: '우리 같이 커피 한잔할까요?' }
            }
        },
        {
            word: 'pizza',
            phonetic: 'PEET-tsah',
            pos: 's.f.',
            article: 'la',
            plural: 'pizze',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '比薩', example: 'Questa pizza Margherita è deliziosa.', exampleTranslation: '這款瑪格麗特比薩非常美味。' },
                en: { meaning: 'pizza', example: 'Questa pizza Margherita è deliziosa.', exampleTranslation: 'This Margherita pizza is delicious.' },
                es: { meaning: 'pizza', example: 'Questa pizza Margherita è deliziosa.', exampleTranslation: 'Esta pizza Margherita es deliciosa.' },
                ja: { meaning: 'ピザ', example: 'Questa pizza Margherita è deliziosa.', exampleTranslation: 'このマルゲリータピザは美味しいです。' },
                ko: { meaning: '피자', example: 'Questa pizza Margherita è deliziosa.', exampleTranslation: '이 마르게리타 피자는 정말 맛있어요.' }
            }
        },
        {
            word: 'pasta',
            phonetic: 'PAHS-tah',
            pos: 's.f.',
            article: 'la',
            plural: 'paste',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '義大利麵 / 麵食', example: 'Stasera mangiamo la pasta.', exampleTranslation: '我們今晚吃義大利麵。' },
                en: { meaning: 'pasta', example: 'Stasera mangiamo la pasta.', exampleTranslation: 'Tonight we are eating pasta.' },
                es: { meaning: 'pasta', example: 'Stasera mangiamo la pasta.', exampleTranslation: 'Esta noche comemos pasta.' },
                ja: { meaning: 'パスタ', example: 'Stasera mangiamo la pasta.', exampleTranslation: '今夜はパスタを食べます。' },
                ko: { meaning: '파스타', example: 'Stasera mangiamo la pasta.', exampleTranslation: '오늘 밤에 우리는 파스타를 먹을 거예요.' }
            }
        },
        {
            word: 'acqua',
            phonetic: 'AHK-wah',
            pos: 's.f.',
            article: 'l\'',
            plural: 'acque',
            image: 'https://images.unsplash.com/photo-1548839134-6fd0ec258549?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '水', example: 'Vorrei un bicchiere d\'acqua naturale.', exampleTranslation: '我想要一杯常溫水。' },
                en: { meaning: 'water', example: 'Vorrei un bicchiere d\'acqua naturale.', exampleTranslation: 'I would like a glass of still water.' },
                es: { meaning: 'agua', example: 'Vorrei un bicchiere d\'acqua naturale.', exampleTranslation: 'Me gustaría un vaso de agua sin gas.' },
                ja: { meaning: '水', example: 'Vorrei un bicchiere d\'acqua naturale.', exampleTranslation: 'ミネラルウォーターをコップ1杯お願いします。' },
                ko: { meaning: '물', example: 'Vorrei un bicchiere d\'acqua naturale.', exampleTranslation: '생수 한 잔 주세요.' }
            }
        },
        {
            word: 'tiramisù',
            phonetic: 'tee-rah-mee-SOO',
            pos: 's.m.',
            article: 'il',
            plural: 'tiramisù',
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '提拉米蘇', example: 'Questo tiramisù è delizioso!', exampleTranslation: '這個提拉米蘇太美味了！' },
                en: { meaning: 'tiramisu', example: 'Questo tiramisù è delizioso!', exampleTranslation: 'This tiramisu is delicious!' },
                es: { meaning: 'tiramisú', example: 'Questo tiramisù è delizioso!', exampleTranslation: '¡Este tiramisú es delicioso!' },
                ja: { meaning: 'ティラミス', example: 'Questo tiramisù è delizioso!', exampleTranslation: 'このティラミスは最高に美味しいです！' },
                ko: { meaning: '티라미수', example: 'Questo tiramisù è delizioso!', exampleTranslation: '이 티라미수는 너무 맛있어요!' }
            }
        },
        {
            word: 'amico',
            phonetic: 'ah-MEE-koh',
            pos: 's.m.',
            article: 'l\'',
            plural: 'amici',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '朋友 (男)', example: 'Lui è il mio migliore amico.', exampleTranslation: '他是我的好朋友。' },
                en: { meaning: 'friend (male)', example: 'Lui è il mio migliore amico.', exampleTranslation: 'He is my best friend.' },
                es: { meaning: 'amigo', example: 'Lui è il mio migliore amico.', exampleTranslation: 'Él es mi mejor amigo.' },
                ja: { meaning: '友達 (男性)', example: 'Lui è il mio migliore amico.', exampleTranslation: '彼は私の親友です。' },
                ko: { meaning: '친구 (남자)', example: 'Lui è il mio migliore amico.', exampleTranslation: '그는 내 가장 친한 친구입니다.' }
            }
        },
        {
            word: 'treno',
            phonetic: 'TREH-noh',
            pos: 's.m.',
            article: 'il',
            plural: 'treni',
            image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '火車 / 鐵路列車', example: 'Il treno parte alle dieci.', exampleTranslation: '火車將在十點出發。' },
                en: { meaning: 'train', example: 'Il treno parte alle dieci.', exampleTranslation: 'The train leaves at ten.' },
                es: { meaning: 'tren', example: 'Il treno parte alle dieci.', exampleTranslation: 'El tren sale a las diez.' },
                ja: { meaning: '電車 / 列車', example: 'Il treno parte alle dieci.', exampleTranslation: '列車は10時に出発します。' },
                ko: { meaning: '기차 / 열차', example: 'Il treno parte alle dieci.', exampleTranslation: '열차는 10시에 출발합니다.' }
            }
        },
        {
            word: 'vino',
            phonetic: 'VEE-noh',
            pos: 's.m.',
            article: 'il',
            plural: 'vini',
            image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '葡萄酒 / 紅酒', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: '我想來一杯紅葡萄酒。' },
                en: { meaning: 'wine', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: 'I would like a glass of red wine.' },
                es: { meaning: 'vino', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: 'Me gustaría una copa de vino tinto.' },
                ja: { meaning: 'ワイン', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: '赤ワインをグラスで一杯お願いします。' },
                ko: { meaning: '와인 / 포도주', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: '레드 와인 한 잔 주세요.' }
            }
        },
        {
            word: 'pane',
            phonetic: 'PAH-neh',
            pos: 's.m.',
            article: 'il',
            plural: 'pani',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '麵包', example: 'Compriamo del pane fresco.', exampleTranslation: '我們買些新鮮麵包。' },
                en: { meaning: 'bread', example: 'Compriamo del pane fresco.', exampleTranslation: 'Let\'s buy some fresh bread.' },
                es: { meaning: 'pan', example: 'Compriamo del pane fresco.', exampleTranslation: 'Compremos pan fresco.' },
                ja: { meaning: 'パン', example: 'Compriamo del pane fresco.', exampleTranslation: '新鮮なパンを買いましょう。' },
                ko: { meaning: '빵', example: 'Compriamo del pane fresco.', exampleTranslation: '신선한 빵을 좀 삽시다.' }
            }
        },
        {
            word: 'formaggio',
            phonetic: 'fohr-MAHD-joh',
            pos: 's.m.',
            article: 'il',
            plural: 'formaggi',
            image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '起司 / 乾酪', example: 'Mi piace molto il formaggio.', exampleTranslation: '我非常喜歡起司。' },
                en: { meaning: 'cheese', example: 'Mi piace molto il formaggio.', exampleTranslation: 'I really like cheese.' },
                es: { meaning: 'queso', example: 'Mi piace molto il formaggio.', exampleTranslation: 'Me gusta mucho el queso.' },
                ja: { meaning: 'チーズ', example: 'Mi piace molto il formaggio.', exampleTranslation: '私はチーズが大好きです。' },
                ko: { meaning: '치즈', example: 'Mi piace molto il formaggio.', exampleTranslation: '나는 치즈를 정말 좋아해요.' }
            }
        },
        {
            word: 'mela',
            phonetic: 'MEH-lah',
            pos: 's.f.',
            article: 'la',
            plural: 'mele',
            image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '蘋果', example: 'Mangio una mela ogni giorno.', exampleTranslation: '我每天吃一個蘋果。' },
                en: { meaning: 'apple', example: 'Mangio una mela ogni giorno.', exampleTranslation: 'I eat an apple every day.' },
                es: { meaning: 'manzana', example: 'Mangio una mela ogni giorno.', exampleTranslation: 'Como una manzana todos los días.' },
                ja: { meaning: 'リンゴ', example: 'Mangio una mela ogni giorno.', exampleTranslation: '私は毎日リンゴを一個食べます。' },
                ko: { meaning: '사과', example: 'Mangio una mela ogni giorno.', exampleTranslation: '나는 매일 사과를 한 개씩 먹습니다.' }
            }
        },
        {
            word: 'sole',
            phonetic: 'SOH-leh',
            pos: 's.m.',
            article: 'il',
            plural: 'soli',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '太陽 / 陽光', example: 'Il sole splende oggi.', exampleTranslation: '今天陽光普照。' },
                en: { meaning: 'sun', example: 'Il sole splende oggi.', exampleTranslation: 'The sun is shining today.' },
                es: { meaning: 'sol', example: 'Il sole splende oggi.', exampleTranslation: 'El sol brilla hoy.' },
                ja: { meaning: '太陽 / 陽光', example: 'Il sole splende oggi.', exampleTranslation: '今日は太陽が輝いています。' },
                ko: { meaning: '태양 / 해', example: 'Il sole splende oggi.', exampleTranslation: '오늘 태양이 빛나고 있습니다.' }
            }
        },
        {
            word: 'gatto',
            phonetic: 'GAHT-toh',
            pos: 's.m.',
            article: 'il',
            plural: 'gatti',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '貓', example: 'Il gatto dorme sulla sedia.', exampleTranslation: '貓咪在椅子上睡覺。' },
                en: { meaning: 'cat', example: 'Il gatto dorme sulla sedia.', exampleTranslation: 'The cat sleeps on the chair.' },
                es: { meaning: 'gato', example: 'Il gatto dorme sulla sedia.', exampleTranslation: 'El gato duerme en la silla.' },
                ja: { meaning: '猫', example: 'Il gatto dorme sulla sedia.', exampleTranslation: '猫が椅子の上で眠っています。' },
                ko: { meaning: '고양이', example: 'Il gatto dorme sulla sedia.', exampleTranslation: '고양이가 의자 위에서 자고 있습니다.' }
            }
        },
        {
            word: 'cane',
            phonetic: 'KAH-neh',
            pos: 's.m.',
            article: 'il',
            plural: 'cani',
            image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '狗', example: 'Il cane corre nel parco.', exampleTranslation: '狗在公園裡跑步。' },
                en: { meaning: 'dog', example: 'Il cane corre nel parco.', exampleTranslation: 'The dog runs in the park.' },
                es: { meaning: 'perro', example: 'Il cane corre nel parco.', exampleTranslation: 'El perro corre en el parque.' },
                ja: { meaning: '犬', example: 'Il cane corre nel parco.', exampleTranslation: '犬が公園を走っています。' },
                ko: { meaning: '개 / 강아지', example: 'Il cane corre nel parco.', exampleTranslation: '개가 공원에서 달리고 있습니다.' }
            }
        },
        {
            word: 'mangiare',
            phonetic: 'mahn-JAH-reh',
            pos: 'v.', // verbo
            conjugation: 'regular -are',
            translations: {
                zh: { meaning: '吃 (動詞)', example: 'Mi piace mangiare al ristorante.', exampleTranslation: '我喜歡在餐廳吃東西。' },
                en: { meaning: 'to eat', example: 'Mi piace mangiare al ristorante.', exampleTranslation: 'I like to eat at the restaurant.' },
                es: { meaning: 'comer', example: 'Mi piace mangiare al ristorante.', exampleTranslation: 'Me gusta comer en el restaurante.' },
                ja: { meaning: '食べる', example: 'Mi piace mangiare al ristorante.', exampleTranslation: '私はレストランで食べるのが好きです。' },
                ko: { meaning: '먹다', example: 'Mi piace mangiare al ristorante.', exampleTranslation: '나는 레스토랑에서 먹는 것을 좋아합니다.' }
            }
        },
        {
            word: 'parlare',
            phonetic: 'pahr-LAH-reh',
            pos: 'v.',
            conjugation: 'regular -are',
            translations: {
                zh: { meaning: '說話 / 討論', example: 'Parlo l\'italiano con Luca.', exampleTranslation: '我和盧卡說義大利文。' },
                en: { meaning: 'to speak / to talk', example: 'Parlo l\'italiano con Luca.', exampleTranslation: 'I speak Italian with Luca.' },
                es: { meaning: 'hablar', example: 'Parlo l\'italiano con Luca.', exampleTranslation: 'Hablo italiano con Luca.' },
                ja: { meaning: '話す / しゃべる', example: 'Parlo l\'italiano con Luca.', exampleTranslation: '私はルカとイタリア語を話します。' },
                ko: { meaning: '말하다', example: 'Parlo l\'italiano con Luca.', exampleTranslation: '나는 루카와 이탈리아어로 말합니다.' }
            }
        },
        {
            word: 'andare',
            phonetic: 'ahn-DAH-reh',
            pos: 'v.',
            conjugation: 'irregular',
            translations: {
                zh: { meaning: '去 / 行走', example: 'Vado in Italia questo fine settimana.', exampleTranslation: '這個週末我要去義大利。' },
                en: { meaning: 'to go', example: 'Vado in Italia questo fine settimana.', exampleTranslation: 'I am going to Italy this weekend.' },
                es: { meaning: 'ir', example: 'Vado in Italia questo fine settimana.', exampleTranslation: 'Voy a Italia este fin de semana.' },
                ja: { meaning: '行く', example: 'Vado in Italia questo fine settimana.', exampleTranslation: '私は今週末イタリアに行きます。' },
                ko: { meaning: '가다', example: 'Vado in Italia questo fine settimana.', exampleTranslation: '나는 이번 주말에 이탈리아에 갑니다.' }
            }
        }
    ];

    // UI Translation mappings
    const uiTranslations = {
        zh: {
            heroTitle: 'Nova Dizionario Italiano',
            heroSubtitle: '義大利文線上學術詞典。提供精確的單字陰陽性、單複數變化、發音與生活例句對照，支援多國母語檢索。',
            selectLangTitle: '<i class="fas fa-globe"></i> 選擇您的母語 (Select Your Native Language):',
            searchPlaceholder: '輸入義大利文單字搜尋... (例如: pizza, libro, mangiare)',
            resultsCount: '顯示搜尋結果 (共 {count} 筆)',
            allResultsCount: '顯示所有詞彙 (共 {count} 筆)',
            noResults: '找不到符合的字彙，請嘗試輸入別的單字。',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> 義大利文推薦學習網站',
            resDescWr: '全球最受歡迎的義大利文字典，提供詳細的變位表與詞彙用法討論區。',
            resDescCollins: '優質的英義雙語字典，內附清晰的單字原生真人發音。',
            resDescTreccani: '義大利國家百科全書官方詞典，最權威的義義字典（適合中高級學者）。',
            resTitleYt: '<i class="fab fa-youtube"></i> 推薦 YouTube 學習頻道',
            resDescLucrezia: '最受歡迎 of 義大利文網紅！發音標準，包含豐富的生活 Vlogs 與文法教學。',
            resDescEasy: '街頭街坊實測學習！提供雙語字幕，帶您學習義大利人日常最真實的對話與語速。',
            resDescEasyItaly: '主持人講英文十分風趣，透過科學與邏輯方法拆解義大利文的結構，非常適合完全零基礎。',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> 推薦實用 App',
            appDescDuo: '每天 5 分鐘闖關式遊戲化學習，最適合建立基礎習慣。',
            appDescMem: '利用原生短片加深字彙記憶，提供最道地的當地人用語。',
            appDescAnki: '使用間隔重複系統 (SRS) 演算法，適合高效率背單字。',
            wordLabel: '單字',
            sentenceLabel: '例句',
            meaningLabel: '意',
            exampleLabel: '譯',
            singularLabel: '單數: ',
            pluralLabel: '複數: ',
            conjugationLabel: '動詞變位: ',
            articleLabel: '定冠詞: ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 語速: '
        },
        en: {
            heroTitle: 'Nova Dizionario Italiano',
            heroSubtitle: 'Italian online academic dictionary. Providing precise word genders, plural forms, conjugations, audio, and example sentences.',
            selectLangTitle: '<i class="fas fa-globe"></i> Select Your Native Language:',
            searchPlaceholder: 'Search Italian words... (e.g. pizza, libro, mangiare)',
            resultsCount: 'Found {count} results',
            allResultsCount: 'Showing all words ({count} total)',
            noResults: 'No matching words found locally. Check spelling or try online dictionaries.',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> Recommended Websites',
            resDescWr: 'The most popular translation dictionary, featuring helpful conjugation tables and community forums.',
            resDescCollins: 'A quality reference with native audio pronunciations.',
            resDescTreccani: 'The official dictionary of the Italian national encyclopedia, highly authoritative.',
            resTitleYt: '<i class="fab fa-youtube"></i> Recommended YouTube Channels',
            resDescLucrezia: 'Beloved creator teaching standard pronunciation, grammar, and daily culture.',
            resDescEasy: 'Learn Italian from real locals on the streets! Great bilingual captions to train speed.',
            resDescEasyItaly: 'Humorous host breaking down complex grammar rules scientifically for absolute beginners.',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> Recommended Apps',
            appDescDuo: 'Daily 5-minute gamified challenges, perfect for cultivating learning habits.',
            appDescMem: 'Immerse in short video clips featuring native local speakers to build context.',
            appDescAnki: 'SRS flashcard algorithm, highly optimized for custom active recall list building.',
            wordLabel: 'Word',
            sentenceLabel: 'Sentence',
            meaningLabel: 'Def',
            exampleLabel: 'Trans',
            singularLabel: 'Singular: ',
            pluralLabel: 'Plural: ',
            conjugationLabel: 'Conjugation: ',
            articleLabel: 'Def. Article: ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Speed: '
        },
        es: {
            heroTitle: 'Nova Dizionario Italiano',
            heroSubtitle: 'Diccionario italiano académico en línea. Proporciona géneros de palabras precisos, formas plurales, conjugaciones y audios.',
            selectLangTitle: '<i class="fas fa-globe"></i> Seleccione su idioma nativo (Native Language):',
            searchPlaceholder: 'Buscar palabras en italiano... (ej. pizza, libro, mangiare)',
            resultsCount: 'Se encontraron {count} resultados',
            allResultsCount: 'Mostrando todas las palabras ({count} total)',
            noResults: 'No se encontraron palabras coincidentes en el diccionario.',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> Sitios web recomendados',
            resDescWr: 'El diccionario bilingüe más popular, con tablas de conjugación y foros de discusión.',
            resDescCollins: 'Excelente recurso bilingüe con pronunciación nativa en audio de alta calidad.',
            resDescTreccani: 'El diccionario oficial de la enciclopedia nacional italiana, excelente para avanzados.',
            resTitleYt: '<i class="fab fa-youtube"></i> Canales de YouTube recomendados',
            resDescLucrezia: '¡Profesor nativa italiana! Accent estándar, vlogs diarios y lecciones prácticas.',
            resDescEasy: 'Aprende italiano en la calle con nativos locales. Excelente subtitulado doble.',
            resDescEasyItaly: 'Explicaciones divertidas en inglés, estructura del idioma analizada de forma lógica.',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> Aplicaciones recomendadas',
            appDescDuo: 'Juegos rápidos de 5 minutos al día, ideal para crear rutinas.',
            appDescMem: 'Clips cortos de video con nativos locales para aprender palabras coloquiales.',
            appDescAnki: 'Tarjetas de memorización con algoritmo SRS, perfecto para estudiar vocabulario.',
            wordLabel: 'Palabra',
            sentenceLabel: 'Frase',
            meaningLabel: 'Sign',
            exampleLabel: 'Trad',
            singularLabel: 'Singular: ',
            pluralLabel: 'Plural: ',
            conjugationLabel: 'Conjugación: ',
            articleLabel: 'Art. Def: ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Vel: '
        },
        ja: {
            heroTitle: 'Nova Dizionario Italiano',
            heroSubtitle: 'イタリア語オンライン学術辞典。正確な名詞の性（陰陽）、複数形、動詞の活用、音声、例文を提供します。',
            selectLangTitle: '<i class="fas fa-globe"></i> 母国語を選択してください (Select Your Native Language):',
            searchPlaceholder: 'イタリア語の単語を入力... (例: pizza, libro, mangiare)',
            resultsCount: '{count} 件の検索結果が見つかりました',
            allResultsCount: 'すべての語彙を表示中 (全 {count} 件)',
            noResults: '一致する単語が見つかりませんでした。スペルを確認してください。',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> おすすめ學習サイト',
            resDescWr: '動詞変化表や活発なQ&Aコミュニティが魅力の世界的なオンライン辞典。',
            resDescCollins: 'ネイティブスピーカーによる高品質な音声発音が付いた学習辞典。',
            resDescTreccani: '最も権威のあるイタリア国語（伊伊）辞典。',
            resTitleYt: '<i class="fab fa-youtube"></i> おすすめ YouTube チャンネル',
            resDescLucrezia: '標準的で聞き取りやすい発音が特徴。イタリアの日常Vlogと文法レッスン。',
            resDescEasy: 'イタリアの街角インタビュー！ネイティブの日常スピードと二言語字幕で学べます。',
            resDescEasyItaly: 'ユーモア溢れる解説で、初心者のためにイタリア語の文法規則を論理的に分解。',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> おすすめ學習アプリ',
            appDescDuo: '1日5分のゲーム感覚学習！毎日の基礎習慣作りに最適。',
            appDescMem: 'ネイティブが話すリアルなショート動画で、生きた単語を記憶。',
            appDescAnki: 'SRSアルゴリズムを採用した単語カード。効率的な暗記に最適。',
            wordLabel: '単語',
            sentenceLabel: '例文',
            meaningLabel: '意味',
            exampleLabel: '対訳',
            singularLabel: '単数: ',
            pluralLabel: '複数: ',
            conjugationLabel: '活用変化: ',
            articleLabel: '定冠詞: ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 速度: '
        },
        ko: {
            heroTitle: 'Nova Dizionario Italiano',
            heroSubtitle: '이탈리아어 온라인 학술 사전. 단어의 성별(남성/여성), 복수형 변화, 동사 활용 정보, 발음 및 예문을 제공합니다.',
            selectLangTitle: '<i class="fas fa-globe"></i> 모국어를 선택하세요 (Select Your Native Language):',
            searchPlaceholder: '이탈리아어 단어 검색... (예: pizza, libro, mangiare)',
            resultsCount: '{count}개의 검색 결과를 찾았습니다',
            allResultsCount: '모든 단어 표시 중 (총 {count}개)',
            noResults: '일치하는 단어가 사전에 없습니다. 철자를 확인해 보세요.',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> 추천 학습 사이트',
            resDescWr: '가장 널리 쓰이는 이탈리아어 사전으로 동사 변화표와 유용한 포럼 토론을 제공합니다.',
            resDescCollins: '원어민 오디오 발음이 포함된 고품질 영-이 사전입니다.',
            resDescTreccani: '가장 정밀하고 권위 있는 이-이 사전입니다.',
            resTitleYt: '<i class="fab fa-youtube"></i> 추천 YouTube 채널',
            resDescLucrezia: '가장 인기 있는 채널 중 하나로, 일상 Vlog와 핵심 문법 강의를 선사합니다.',
            resDescEasy: '이탈리아 거리의 원어민 대화! 이탈리아어-영어 이중 자막으로 실전 듣기를 훈련합니다.',
            resDescEasyItaly: '유머러스하게 이탈리아어 문법 구조를 쉽게 설명해 주는 초보자 추천 채널입니다.',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> 추천 필수 앱',
            appDescDuo: '하루 5분 게임처럼 학습하여 매일 공부하는 루틴을 만들기 좋습니다.',
            appDescMem: '원어민들이 촬영한 짧은 동영상을 통해 실생활에 유용한 어휘를 각인시킵니다.',
            appDescAnki: 'SRS 알고리즘을 사용한 플래시카드 앱으로, 개인별 맞춤형 단어 암기에 탁월합니다.',
            wordLabel: '단어',
            sentenceLabel: '문장',
            meaningLabel: '의미',
            exampleLabel: '번역',
            singularLabel: '단수형: ',
            pluralLabel: '복수형: ',
            conjugationLabel: '동사 변화: ',
            articleLabel: '정관사: ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 속도: '
        }
    };

    let selectedNativeLanguage = 'zh';
    let searchQuery = '';
    let selectedLetter = 'all';

    const vocabDisplay = document.getElementById('vocab-display');
    const rateSlider = document.getElementById('voice-rate');
    const rateVal = document.getElementById('rate-val');
    const flagButtons = document.querySelectorAll('.flag-btn');
    const alphabetButtons = document.querySelectorAll('.alphabet-btn');
    const searchInput = document.getElementById('dict-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const resultsCountText = document.getElementById('results-count-text');

    // Speech synthesis function
    const speakItalian = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'it-IT';
            utterance.rate = rateSlider ? parseFloat(rateSlider.value) : 1;
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert('您的瀏覽器不支援發音功能。建議使用 Chrome 或 Safari 瀏覽器。');
        }
    };

    // Render Dictionary Cards dynamically
    const renderDictionary = () => {
        if (!vocabDisplay) return;
        vocabDisplay.innerHTML = '';

        // Filter the database
        const filteredData = italianDictionaryData.filter(item => {
            // Letter filter
            const matchesLetter = selectedLetter === 'all' || item.word.toLowerCase().startsWith(selectedLetter);
            
            // Search text query filter
            const matchesSearch = searchQuery === '' || 
                                  item.word.toLowerCase().includes(searchQuery) ||
                                  (item.translations[selectedNativeLanguage] && 
                                   item.translations[selectedNativeLanguage].meaning.toLowerCase().includes(searchQuery));
            
            return matchesLetter && matchesSearch;
        });

        const ui = uiTranslations[selectedNativeLanguage] || uiTranslations['en'];

        // Update count text
        if (searchQuery !== '' || selectedLetter !== 'all') {
            resultsCountText.innerText = ui.resultsCount.replace('{count}', filteredData.length);
        } else {
            resultsCountText.innerText = ui.allResultsCount.replace('{count}', filteredData.length);
        }

        // Handle Empty state
        if (filteredData.length === 0) {
            vocabDisplay.innerHTML = `
                <div class="empty-results-box">
                    <i class="fas fa-search-minus"></i>
                    <h4>${ui.noResults}</h4>
                </div>
            `;
            return;
        }

        filteredData.forEach(item => {
            const translation = item.translations[selectedNativeLanguage] || item.translations['en'];
            const hasImage = !!item.image;

            const card = document.createElement('div');
            card.className = `vocab-card ${hasImage ? 'has-image' : ''}`;
            
            let imageHtml = '';
            if (hasImage) {
                imageHtml = `
                    <div class="vocab-card-image">
                        <img src="${item.image}" alt="${item.word}" loading="lazy">
                    </div>
                `;
            }

            // Grammatical parts layout
            let grammarHtml = '';
            if (item.pos === 'v.') {
                // Verb conjugation info
                grammarHtml = `
                    <div class="grammar-info-row">
                        <span><strong>${ui.conjugationLabel}</strong> ${item.conjugation}</span>
                    </div>
                `;
            } else if (item.pos === 's.m.' || item.pos === 's.f.') {
                // Noun gender and singular/plural info
                grammarHtml = `
                    <div class="grammar-info-row">
                        <span><strong>${ui.articleLabel}</strong> <em>${item.article}</em></span>
                        <span><strong>${ui.singularLabel}</strong> ${item.word}</span>
                        <span><strong>${ui.pluralLabel}</strong> ${item.plural}</span>
                    </div>
                `;
            }

            card.innerHTML = `
                ${imageHtml}
                <div class="vocab-word-info">
                    <h3>
                        ${item.word}
                        ${item.phonetic ? `<span class="phonetic">/ ${item.phonetic} /</span>` : ''}
                        <span class="pos-tag">${item.pos}</span>
                    </h3>
                    
                    ${grammarHtml}

                    <div class="vocab-meaning-row">
                        <span class="label-badge badge-meaning">${ui.meaningLabel}</span>
                        <div class="meaning">${translation.meaning}</div>
                    </div>
                    <div class="example">
                        <i class="fas fa-quote-left" style="font-size: 0.7rem; opacity: 0.5; margin-right: 0.3rem;"></i>
                        <strong>${translation.example}</strong>
                    </div>
                    <div class="example-translation-row">
                        <span class="label-badge badge-example">${ui.exampleLabel}</span>
                        <div class="example-translation">${translation.exampleTranslation}</div>
                    </div>
                </div>
                <div class="play-btn-group">
                    <button class="play-btn btn-play-word" aria-label="播放單字發音">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <span class="play-label">${ui.wordLabel}</span>
                    <button class="play-btn btn-play-sentence" aria-label="播放例句發音">
                        <i class="fas fa-comment-dots"></i>
                    </button>
                    <span class="play-label" style="font-size: 0.6rem;">${ui.sentenceLabel}</span>
                </div>
            `;

            // Speak Word Event
            card.querySelector('.btn-play-word').addEventListener('click', (e) => {
                e.stopPropagation();
                speakItalian(item.word);
            });

            // Speak Sentence Event
            card.querySelector('.btn-play-sentence').addEventListener('click', (e) => {
                e.stopPropagation();
                speakItalian(item.translations['en'].example); // Always speak Italian sentence
            });

            vocabDisplay.appendChild(card);
        });
    };

    // Translate UI texts based on target language selection
    const translateUITexts = (lang) => {
        const ui = uiTranslations[lang] || uiTranslations['en'];

        // Hero texts
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroTitle) heroTitle.innerText = ui.heroTitle;
        if (heroSubtitle) heroSubtitle.innerText = ui.heroSubtitle;

        // Select lang title
        const selectLangTitle = document.getElementById('select-lang-title');
        if (selectLangTitle) selectLangTitle.innerHTML = ui.selectLangTitle;

        // Search Input placeholder
        if (searchInput) searchInput.placeholder = ui.searchPlaceholder;

        // Labels in control bar
        const rateLabel = document.getElementById('rate-label');
        if (rateLabel) rateLabel.innerHTML = ui.rateLabel;

        // Resource sections title & texts
        const resTitleWeb = document.getElementById('res-title-web');
        if (resTitleWeb) resTitleWeb.innerHTML = ui.resTitleWeb;
        const resTitleYt = document.getElementById('res-title-yt');
        if (resTitleYt) resTitleYt.innerHTML = ui.resTitleYt;
        const resTitleApp = document.getElementById('res-title-app');
        if (resTitleApp) resTitleApp.innerHTML = ui.resTitleApp;

        // Web resource descriptions
        const resDescWr = document.getElementById('res-desc-wr');
        if (resDescWr) resDescWr.innerText = ui.resDescWr;
        const resDescCollins = document.getElementById('res-desc-collins');
        if (resDescCollins) resDescCollins.innerText = ui.resDescCollins;
        const resDescTreccani = document.getElementById('res-desc-treccani');
        if (resDescTreccani) resDescTreccani.innerText = ui.resDescTreccani;

        // YouTube descriptions
        const resDescLucrezia = document.getElementById('res-desc-lucrezia');
        if (resDescLucrezia) resDescLucrezia.innerText = ui.resDescLucrezia;
        const resDescEasy = document.getElementById('res-desc-easy');
        if (resDescEasy) resDescEasy.innerText = ui.resDescEasy;
        const resDescEasyItaly = document.getElementById('res-desc-easy-italy');
        if (resDescEasyItaly) resDescEasyItaly.innerText = ui.resDescEasyItaly;

        // Apps descriptions
        const appDescDuo = document.getElementById('app-desc-duo');
        if (appDescDuo) appDescDuo.innerText = ui.appDescDuo;
        const appDescMem = document.getElementById('app-desc-mem');
        if (appDescMem) appDescMem.innerText = ui.appDescMem;
        const appDescAnki = document.getElementById('app-desc-anki');
        if (appDescAnki) appDescAnki.innerText = ui.appDescAnki;
    };

    // Search bar event handling
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            
            // Show/hide clear button
            if (searchQuery !== '') {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }

            renderDictionary();
        });
    }

    // Clear search button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            renderDictionary();
        });
    }

    // Alphabet A-Z index filters
    alphabetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active class toggle
            alphabetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            selectedLetter = btn.getAttribute('data-letter');
            
            // Clear input search query for visual consistency
            searchInput.value = '';
            searchQuery = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';

            renderDictionary();
        });
    });

    // Voice Speed Range listener
    if (rateSlider && rateVal) {
        rateSlider.addEventListener('input', (e) => {
            rateVal.textContent = e.target.value + 'x';
        });
    }

    // Flag Buttons selection listener
    flagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active flag class
            flagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            selectedNativeLanguage = button.getAttribute('data-lang');
            translateUITexts(selectedNativeLanguage);
            renderDictionary();
        });
    });

    // Initial load
    if (vocabDisplay) {
        renderDictionary();
    }
});
