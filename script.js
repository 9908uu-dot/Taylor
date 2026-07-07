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
    // 2. Vocabulary Database with Royalty-Free Unsplash Images
    // ==========================================
    const italianVocabData = {
        greetings: [
            {
                word: 'Buongiorno',
                phonetic: 'bwohn-JOHR-noh',
                image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '早安 / 您好 (正式)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: '女士早安，您好嗎？' },
                    en: { meaning: 'Good morning / Hello (formal)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: 'Good morning, ma\'am. How are you?' },
                    es: { meaning: 'Buenos días / Hola (formal)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: 'Buenos días, señora. ¿Cómo está?' },
                    ja: { meaning: 'おはようございます / こんにちは', example: 'Buongiorno, signora. Come sta?', exampleTranslation: 'お早うございます、マダム。お元気ですか？' },
                    ko: { meaning: '좋은 아침 / 안녕하세요 (격식)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: '안녕하세요, 부인. 어떻게 지내세요?' }
                }
            },
            {
                word: 'Buonasera',
                phonetic: 'bwoh-nah-SEH-rah',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '晚安 / 下午好', example: 'Buonasera! Come sta?', exampleTranslation: '晚安！您好嗎？' },
                    en: { meaning: 'Good evening / Hello (evening)', example: 'Buonasera! Come sta?', exampleTranslation: 'Good evening! How are you?' },
                    es: { meaning: 'Buenas tardes / Buenas noches', example: 'Buonasera! Come sta?', exampleTranslation: '¡Buenas noches! ¿Cómo está?' },
                    ja: { meaning: 'こんばんは', example: 'Buonasera! Come sta?', exampleTranslation: 'こんばんは！お元気ですか？' },
                    ko: { meaning: '좋은 저녁입니다 / 안녕하세요', example: 'Buonasera! Come sta?', exampleTranslation: '좋은 저녁입니다! 어떻게 지내세요?' }
                }
            },
            {
                word: 'Ciao',
                phonetic: 'CHAH-oh',
                image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '你好 / 再見 (隨意)', example: 'Ciao Luca! Come va?', exampleTranslation: '嗨盧卡！最近怎麼樣？' },
                    en: { meaning: 'Hello / Goodbye (informal)', example: 'Ciao Luca! Come va?', exampleTranslation: 'Hi Luca! How\'s it going?' },
                    es: { meaning: 'Hola / Adiós (informal)', example: 'Ciao Luca! Come va?', exampleTranslation: '¡Hola Luca! ¿Cómo va?' },
                    ja: { meaning: 'やあ / バイバイ (カジュアル)', example: 'Ciao Luca! Come va?', exampleTranslation: 'やあルカ！調子はどう？' },
                    ko: { meaning: '안녕 (비격식)', example: 'Ciao Luca! Come va?', exampleTranslation: '안녕 루카! 어떻게 지내?' }
                }
            },
            {
                word: 'Grazie',
                phonetic: 'GRAHT-tsyeh',
                translations: {
                    zh: { meaning: '謝謝', example: 'Grazie mille per l\'ospitalità.', exampleTranslation: '非常感謝您的熱情款待。' },
                    en: { meaning: 'Thank you', example: 'Grazie mille per l\'ospitalità.', exampleTranslation: 'Thank you very much for the hospitality.' },
                    es: { meaning: 'Gracias', example: 'Grazie mille per l\'ospitalità.', exampleTranslation: 'Muchas gracias por la hospitalidad.' },
                    ja: { meaning: 'ありがとう', example: 'Grazie mille per l\'ospitalità.', exampleTranslation: 'おもてなしいただき、本当にありがとうございます。' },
                    ko: { meaning: '감사합니다', example: 'Grazie mille per l\'ospitalità.', exampleTranslation: '환대에 대단히 감사드립니다.' }
                }
            },
            {
                word: 'Prego',
                phonetic: 'PREH-goh',
                translations: {
                    zh: { meaning: '不客氣 / 請', example: 'Prego, si accomodi pure.', exampleTranslation: '不客氣，請隨意坐。' },
                    en: { meaning: 'You\'re welcome / Please', example: 'Prego, si accomodi pure.', exampleTranslation: 'You\'re welcome, please make yourself comfortable.' },
                    es: { meaning: 'De nada / Por favor', example: 'Prego, si accomodi pure.', exampleTranslation: 'De nada, por favor póngase cómodo.' },
                    ja: { meaning: 'どういたしまして / どうぞ', example: 'Prego, si accomodi pure.', exampleTranslation: 'どういたしまして、どうぞお楽にしてください。' },
                    ko: { meaning: '천만에요 / 편히', example: 'Prego, si accomodi pure.', exampleTranslation: '천만에요, 편히 앉으세요.' }
                }
            },
            {
                word: 'Per favore',
                phonetic: 'pehr fah-VOH-reh',
                translations: {
                    zh: { meaning: '請 (Please)', example: 'Un bicchiere d\'acqua, per favore.', exampleTranslation: '請給我一杯水。' },
                    en: { meaning: 'Please', example: 'Un bicchiere d\'acqua, per favore.', exampleTranslation: 'A glass of water, please.' },
                    es: { meaning: 'Por favor', example: 'Un bicchiere d\'acqua, per favore.', exampleTranslation: 'Un vaso de agua, por favor.' },
                    ja: { meaning: 'お願いします', example: 'Un bicchiere d\'acqua, per favore.', exampleTranslation: 'お水を一杯お願いします。' },
                    ko: { meaning: '부탁합니다', example: 'Un bicchiere d\'acqua, per favore.', exampleTranslation: '물 한 잔 주세요.' }
                }
            },
            {
                word: 'Arrivederci',
                phonetic: 'ahr-ree-veh-DEHR-chee',
                translations: {
                    zh: { meaning: '再見 (正式)', example: 'Grazie della cena, arrivederci.', exampleTranslation: '感謝招待，再見。' },
                    en: { meaning: 'Goodbye (formal)', example: 'Grazie della cena, arrivederci.', exampleTranslation: 'Thank you for dinner, goodbye.' },
                    es: { meaning: 'Adiós (formal)', example: 'Grazie della cena, arrivederci.', exampleTranslation: 'Gracias por la cena, adiós.' },
                    ja: { meaning: 'さようなら (フォーマル)', example: 'Grazie della cena, arrivederci.', exampleTranslation: '夕食をごちそうさまでした、さようなら。' },
                    ko: { meaning: '안녕히 가세요 (격식)', example: 'Grazie della cena, arrivederci.', exampleTranslation: '저녁 식사 감사했습니다, 안녕히 계세요.' }
                }
            }
        ],
        phrases: [
            {
                word: 'Come stai?',
                phonetic: 'KOH-meh STAH-ee',
                translations: {
                    zh: { meaning: '你好嗎？', example: 'Ciao Luca! Come stai? Tutto bene?', exampleTranslation: '嗨盧卡！你最近好嗎？一切順利嗎？' },
                    en: { meaning: 'How are you?', example: 'Ciao Luca! Come stai? Tutto bene?', exampleTranslation: 'Hi Luca! How are you? Everything good?' },
                    es: { meaning: '¿Cómo estás?', example: 'Ciao Luca! Come stai? Tutto bene?', exampleTranslation: '¡Hola Luca! ¿Cómo estás? ¿Todo bien?' },
                    ja: { meaning: '元気ですか？', example: 'Ciao Luca! Come stai? Tutto bene?', exampleTranslation: 'やあルカ！元気かい？順調？' },
                    ko: { meaning: '어떻게 지내?', example: 'Ciao Luca! Come stai? Tutto bene?', exampleTranslation: '안녕 루카! 잘 지내? 다 괜찮아?' }
                }
            },
            {
                word: 'Amico',
                phonetic: 'ah-MEE-koh',
                image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '朋友', example: 'Lui è il mio migliore amico.', exampleTranslation: '他是我的好朋友。' },
                    en: { meaning: 'Friend', example: 'Lui è il mio migliore amico.', exampleTranslation: 'He is my best friend.' },
                    es: { meaning: 'Amigo', example: 'Lui è il mio migliore amico.', exampleTranslation: 'Él es mi mejor amigo.' },
                    ja: { meaning: '友達 / 友人', example: 'Lui è il mio migliore amico.', exampleTranslation: '彼は私の親友です。' },
                    ko: { meaning: '친구', example: 'Lui è il mio migliore amico.', exampleTranslation: '그는 내 가장 친한 친구입니다.' }
                }
            },
            {
                word: 'Dov\'è il bagno?',
                phonetic: 'doh-VEH eel BAHN-yoh',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '廁所在哪裡？', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: '不好意思，請問這家咖啡廳的廁所在哪裡？' },
                    en: { meaning: 'Where is the bathroom?', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: 'Excuse me, where is the bathroom in this bar?' },
                    es: { meaning: '¿Dónde está el baño?', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: 'Disculpe, ¿dónde está el baño en este bar?' },
                    ja: { meaning: 'トイレはどこですか？', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: 'すみません、このカフェのトイレはどこですか？' },
                    ko: { meaning: '화장실이 어디예요?', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: '실례합니다, 이 카페의 화장실은 어디인가요?' }
                }
            },
            {
                word: 'Treno',
                phonetic: 'TREH-noh',
                image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '火車 / 列車', example: 'Il treno per Roma parte alle dieci.', exampleTranslation: '開往羅馬的火車在十點出發。' },
                    en: { meaning: 'Train', example: 'Il treno per Roma parte alle dieci.', exampleTranslation: 'The train to Rome leaves at ten.' },
                    es: { meaning: 'Tren', example: 'Il treno per Roma parte alle dieci.', exampleTranslation: 'El tren para Roma sale a las diez.' },
                    ja: { meaning: '電車 / 列車', example: 'Il treno per Roma parte alle dieci.', exampleTranslation: 'ローマ行きの列車は10時に出発します。' },
                    ko: { meaning: '기차 / 열차', example: 'Il treno per Roma parte alle dieci.', exampleTranslation: '로마행 기차는 10시에 출발합니다.' }
                }
            },
            {
                word: 'Quanto costa?',
                phonetic: 'KWAHN-toh KOHS-tah',
                translations: {
                    zh: { meaning: '這多少錢？', example: 'Quanto costa questo souvenir?', exampleTranslation: '這個紀念品多少錢？' },
                    en: { meaning: 'How much does it cost?', example: 'Quanto costa questo souvenir?', exampleTranslation: 'How much is this souvenir?' },
                    es: { meaning: '¿Cuánto cuesta?', example: 'Quanto costa questo souvenir?', exampleTranslation: '¿Cuánto cuesta este recuerdo?' },
                    ja: { meaning: 'いくらですか？', example: 'Quanto costa questo souvenir?', exampleTranslation: 'このお土産はいくらですか？' },
                    ko: { meaning: '얼마예요?', example: 'Quanto costa questo souvenir?', exampleTranslation: '이 기념품은 얼마예요?' }
                }
            },
            {
                word: 'Parla inglese?',
                translations: {
                    zh: { meaning: '您會說英文嗎？', example: 'Non parlo bene l\'italiano. Parla inglese?', exampleTranslation: '我義大利文說得不好。您會說英文嗎？' },
                    en: { meaning: 'Do you speak English?', example: 'Non parlo bene l\'italiano. Parla inglese?', exampleTranslation: 'I don\'t speak Italian well. Do you speak English?' },
                    es: { meaning: '¿Habla inglés?', example: 'Non parlo bene l\'italiano. Parla inglese?', exampleTranslation: 'No hablo bien italiano. ¿Habla inglés?' },
                    ja: { meaning: '英語は話せますか？', example: 'Non parlo bene l\'italiano. Parla inglese?', exampleTranslation: 'イタリア語をうまく話せません。英語は話せますか？' },
                    ko: { meaning: '영어 할 줄 아세요?', example: 'Non parlo bene l\'italiano. Parla inglese?', exampleTranslation: '이탈리아어를 잘 못해요. 영어 할 줄 아세요?' }
                }
            },
            {
                word: 'Mi dispiace',
                phonetic: 'mee dees-PYAH-cheh',
                translations: {
                    zh: { meaning: '對不起 / 抱歉', example: 'Mi dispiace, non posso venire stasera.', exampleTranslation: '很抱歉，我今晚無法前來。' },
                    en: { meaning: 'I\'m sorry', example: 'Mi dispiace, non posso venire stasera.', exampleTranslation: 'I\'m sorry, I cannot come tonight.' },
                    es: { meaning: 'Lo siento', example: 'Mi dispiace, non posso venire stasera.', exampleTranslation: 'Lo siento, no puedo venir esta noche.' },
                    ja: { meaning: 'ごめんなさい', example: 'Mi dispiace, non posso venire stasera.', exampleTranslation: 'すみません、今夜は行けません。' },
                    ko: { meaning: '죄송합니다', example: 'Mi dispiace, non posso venire stasera.', exampleTranslation: '미안해요, 오늘 밤에는 갈 수 없어요.' }
                }
            },
            {
                word: 'Non capisco',
                phonetic: 'nohn kah-PEES-koh',
                translations: {
                    zh: { meaning: '我不懂 / 我不明白', example: 'Può ripetere lentamente? Non capisco.', exampleTranslation: '您可以說慢一點嗎？我不明白。' },
                    en: { meaning: 'I don\'t understand', example: 'Può ripetere lentamente? Non capisco.', exampleTranslation: 'Could you repeat slowly? I don\'t understand.' },
                    es: { meaning: 'No entiendo', example: 'Può ripetere lentamente? Non capisco.', exampleTranslation: '¿Puede repetir lentamente? No entiendo.' },
                    ja: { meaning: '分かりません', example: 'Può ripetere lentamente? Non capisco.', exampleTranslation: 'ゆっくり繰り返していただけますか？分かりません。' },
                    ko: { meaning: '이해하지 못해요', example: 'Può ripetere lentamente? Non capisco.', exampleTranslation: '천천히 다시 말씀해 주시겠어요? 이해가 안 돼요.' }
                }
            }
        ],
        dining: [
            {
                word: 'Caffè',
                phonetic: 'kahf-FEH',
                image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '咖啡', example: 'Prendiamo un caffè insieme?', exampleTranslation: '我們要不要一起喝杯咖啡？' },
                    en: { meaning: 'Coffee', example: 'Prendiamo un caffè insieme?', exampleTranslation: 'Shall we grab a coffee together?' },
                    es: { meaning: 'Café', example: 'Prendiamo un caffè insieme?', exampleTranslation: '¿Tomamos un café juntos?' },
                    ja: { meaning: 'コーヒー', example: 'Prendiamo un caffè insieme?', exampleTranslation: '一緒にコーヒーを飲みませんか？' },
                    ko: { meaning: '커피', example: 'Prendiamo un caffè insieme?', exampleTranslation: '우리 같이 커피 한잔할까요?' }
                }
            },
            {
                word: 'Gelato',
                phonetic: 'jeh-LAH-toh',
                image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '冰淇淋', example: 'Vorrei un gelato al cioccolato.', exampleTranslation: '我想要一個巧克力冰淇淋。' },
                    en: { meaning: 'Ice Cream', example: 'Vorrei un gelato al cioccolato.', exampleTranslation: 'I would like a chocolate ice cream.' },
                    es: { meaning: 'Helado', example: 'Vorrei un gelato al cioccolato.', exampleTranslation: 'Me gustaría un helado de chocolate.' },
                    ja: { meaning: 'ジェラート (アイス)', example: 'Vorrei un gelato al cioccolato.', exampleTranslation: 'チョコレートジェラートを一つください。' },
                    ko: { meaning: '젤라토 (아이스크림)', example: 'Vorrei un gelato al cioccolato.', exampleTranslation: '초콜릿 젤라토 하나 주세요.' }
                }
            },
            {
                word: 'Pizza',
                phonetic: 'PEET-tsah',
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '比薩', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: '這款瑪格麗特比薩非常好吃！' },
                    en: { meaning: 'Pizza', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: 'This Margherita pizza is very tasty!' },
                    es: { meaning: 'Pizza', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: '¡Esta pizza Margherita es muy buena!' },
                    ja: { meaning: 'ピザ', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: 'このマルゲリータピザはとても美味しいです！' },
                    ko: { meaning: '피자', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: '이 마르게리타 피자는 정말 맛있어요!' }
                }
            },
            {
                word: 'Pasta',
                phonetic: 'PAHS-tah',
                image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '義大利麵', example: 'Stasera mangiamo la pasta.', exampleTranslation: '我們今晚吃義大利麵。' },
                    en: { meaning: 'Pasta', example: 'Stasera mangiamo la pasta.', exampleTranslation: 'Tonight we are eating pasta.' },
                    es: { meaning: 'Pasta', example: 'Stasera mangiamo la pasta.', exampleTranslation: 'Esta noche comemos pasta.' },
                    ja: { meaning: 'パスタ', example: 'Stasera mangiamo la pasta.', exampleTranslation: '今夜はパスタを食べます。' },
                    ko: { meaning: '파스타', example: 'Stasera mangiamo la pasta.', exampleTranslation: '오늘 밤에 우리는 파스타를 먹을 거예요.' }
                }
            },
            {
                word: 'Vino',
                phonetic: 'VEE-noh',
                image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '葡萄酒 / 紅酒', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: '我想來一杯紅葡萄酒。' },
                    en: { meaning: 'Wine', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: 'I would like a glass of red wine.' },
                    es: { meaning: 'Vino', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: 'Me gustaría una copa de vino tinto.' },
                    ja: { meaning: 'ワイン', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: '赤ワインをグラスで一杯お願いします。' },
                    ko: { meaning: '와인 / 포도주', example: 'Vorrei un bicchiere di vino rosso.', exampleTranslation: '레드 와인 한 잔 주세요.' }
                }
            },
            {
                word: 'Pane',
                phonetic: 'PAH-neh',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '麵包', example: 'Compriamo del pane fresco per cena.', exampleTranslation: '我們買些新鮮麵包當晚餐。' },
                    en: { meaning: 'Bread', example: 'Compriamo del pane fresco per cena.', exampleTranslation: 'Let\'s buy some fresh bread for dinner.' },
                    es: { meaning: 'Pan', example: 'Compriamo del pane fresco per cena.', exampleTranslation: 'Compremos pan fresco para la cena.' },
                    ja: { meaning: 'パン', example: 'Compriamo del pane fresco per cena.', exampleTranslation: '夕食のために新鮮なパンを買いましょう。' },
                    ko: { meaning: '빵', example: 'Compriamo del pane fresco per cena.', exampleTranslation: '저녁 식사로 신선한 빵을 좀 삽시다.' }
                }
            },
            {
                word: 'Formaggio',
                phonetic: 'fohr-MAHD-joh',
                image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '起司 / 乾酪', example: 'Mi piace molto il formaggio parmigiano.', exampleTranslation: '我非常喜歡帕馬森起司。' },
                    en: { meaning: 'Cheese', example: 'Mi piace molto il formaggio parmigiano.', exampleTranslation: 'I really like parmesan cheese.' },
                    es: { meaning: 'Queso', example: 'Mi piace molto il formaggio parmigiano.', exampleTranslation: 'Me gusta mucho el queso parmesano.' },
                    ja: { meaning: 'チーズ', example: 'Mi piace molto il formaggio parmigiano.', exampleTranslation: '私はパルメザンチーズが大好きです。' },
                    ko: { meaning: '치즈', example: 'Mi piace molto il formaggio parmigiano.', exampleTranslation: '나는 파르메산 치즈를 정말 좋아해요.' }
                }
            },
            {
                word: 'Acqua',
                phonetic: 'AHK-wah',
                image: 'https://images.unsplash.com/photo-1548839134-6fd0ec258549?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '水', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '請給我一瓶氣泡水。' },
                    en: { meaning: 'Water', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: 'A bottle of sparkling water, please.' },
                    es: { meaning: 'Agua', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: 'Una botella de agua con gas, por favor.' },
                    ja: { meaning: '水', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '炭酸水を一本お願いします。' },
                    ko: { meaning: '물', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '탄산수 한 병 주세요.' }
                }
            },
            {
                word: 'Tiramisù',
                phonetic: 'tee-rah-mee-SOO',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80',
                translations: {
                    zh: { meaning: '提拉米蘇', example: 'Questo tiramisù è delizioso!', exampleTranslation: '這個提拉米蘇太美味了！' },
                    en: { meaning: 'Tiramisu', example: 'Questo tiramisù è delizioso!', exampleTranslation: 'This tiramisu is delicious!' },
                    es: { meaning: 'Tiramisú', example: 'Questo tiramisù è delizioso!', exampleTranslation: '¡Este tiramisú es delicioso!' },
                    ja: { meaning: 'ティラミス', example: 'Questo tiramisù è delizioso!', exampleTranslation: 'このティラミスは最高に美味しいです！' },
                    ko: { meaning: '티라미수', example: 'Questo tiramisù è delizioso!', exampleTranslation: '이 티라미수는 너무 맛있어요!' }
                }
            },
            {
                word: 'Il conto, per favore',
                translations: {
                    zh: { meaning: '請結帳', example: 'Cameriere, il conto, per favore.', exampleTranslation: '服務生，請幫我結帳。' },
                    en: { meaning: 'The bill, please', example: 'Cameriere, il conto, per favore.', exampleTranslation: 'Waiter, the bill please.' },
                    es: { meaning: 'La cuenta, por favor', example: 'Cameriere, il conto, per favore.', exampleTranslation: 'Camarero, la cuenta por favor.' },
                    ja: { meaning: 'お会計をお願いします', example: 'Cameriere, il conto, per favore.', exampleTranslation: 'ウェイターさん、お会計をお願いします。' },
                    ko: { meaning: '계산서 부탁합니다', example: 'Cameriere, il conto, per favore.', exampleTranslation: '웨이터, 여기 계산서 좀 주세요.' }
                }
            }
        ]
    };

    // UI Translation mappings
    const uiTranslations = {
        zh: {
            heroTitle: 'Ciao, benvenuto!',
            heroSubtitle: '開啟您的義大利文學習之旅。在此學習最道地的發音、文字與生活例句，並可自由切換您的母語進行對照。',
            selectLangTitle: '<i class="fas fa-globe"></i> 選擇您的母語 (Select Your Native Language):',
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
            navGreetings: '日常問候',
            navPhrases: '實用情境',
            navDining: '飲食餐飲',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 語速: '
        },
        en: {
            heroTitle: 'Ciao, benvenuto!',
            heroSubtitle: 'Start your Italian learning journey. Learn authentic pronunciation, words, and real-life phrases, with free language translation toggling.',
            selectLangTitle: '<i class="fas fa-globe"></i> Select Your Native Language:',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> Recommended Websites',
            resDescWr: 'The most popular translation dictionary, featuring helpful conjugation tables and community forums.',
            resDescCollins: 'A quality bilingual English-Italian reference with clear native audio pronunciations.',
            resDescTreccani: 'The official encyclopedia monolingual dictionary, highly recommended for advanced learners.',
            resTitleYt: '<i class="fab fa-youtube"></i> Recommended YouTube Channels',
            resDescLucrezia: 'Beloved Italian vlogger teaching standard pronunciation, grammar, and daily culture.',
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
            navGreetings: 'Greetings',
            navPhrases: 'Daily Phrases',
            navDining: 'Food & Dining',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Speed: '
        },
        es: {
            heroTitle: 'Ciao, benvenuto!',
            heroSubtitle: 'Comienza tu viaje de aprendizaje de italiano. Aprende pronunciación auténtica, palabras y frases de la vida real con traducción gratuita.',
            selectLangTitle: '<i class="fas fa-globe"></i> Seleccione su idioma nativo (Native Language):',
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
            navGreetings: 'Saludos',
            navPhrases: 'Frases comunes',
            navDining: 'Comida y Cena',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Vel: '
        },
        ja: {
            heroTitle: 'Ciao, benvenuto!',
            heroSubtitle: 'イタリア語の学習へようこそ。ネイティブの発音、単語、日常会話を学びましょう。母国語での対訳表示にも対応しています。',
            selectLangTitle: '<i class="fas fa-globe"></i> 母国語を選択してください (Select Your Native Language):',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> おすすめ学習サイト',
            resDescWr: '動詞変化表や活発なQ&Aコミュニティが魅力の世界的な伊英・英伊オンライン辞典。',
            resDescCollins: 'ネイティブスピーカーによる高品質な音声発音が付いた英伊・伊英学習辞典。',
            resDescTreccani: 'イタリア最大の百科事典出版社が監修する、最も権威のある国語（伊伊）辞典。',
            resTitleYt: '<i class="fab fa-youtube"></i> おすすめ YouTube チャンネル',
            resDescLucrezia: '標準的で聞き取りやすい発音が特徴。イタリアの日常Vlogと文法レッスンを提供。',
            resDescEasy: 'イタリアの街角インタビュー！ネイティブの日常スピードと二言語字幕で学べます。',
            resDescEasyItaly: 'ユーモア溢れる英語解説で、初心者のためにイタリア語の文法規則を論理的に分解。',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> おすすめ学習アプリ',
            appDescDuo: '1日5分のゲーム感覚学習！毎日の基礎習慣作りに最適。',
            appDescMem: 'ネイティブが話すリアルなショート動画で、より現地に近い生きた単語を記憶。',
            appDescAnki: 'SRS（間隔反復）アルゴリズムを採用した単語カード。効率的な暗記に最適。',
            wordLabel: '単語',
            sentenceLabel: '例文',
            meaningLabel: '意味',
            exampleLabel: '対訳',
            navGreetings: '日常の挨拶',
            navPhrases: '実用表現',
            navDining: '飲食・グルメ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 速度: '
        },
        ko: {
            heroTitle: 'Ciao, benvenuto!',
            heroSubtitle: '이탈리아어 학습 여정을 시작하세요. 모국어 번역과 함께 원어민 발음, 단어, 그리고 실생활 예문을 학습할 수 있습니다.',
            selectLangTitle: '<i class="fas fa-globe"></i> 모국어를 선택하세요 (Select Your Native Language):',
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> 추천 학습 사이트',
            resDescWr: '가장 널리 쓰이는 이탈리아어 사전으로 동사 변화표와 유용한 포럼 토론을 제공합니다.',
            resDescCollins: '원어민 오디오 발음이 포함된 고품질 영-이 사전입니다.',
            resDescTreccani: '이탈리아 백과사전 학회 공식 사전으로, 가장 정밀하고 권위 있는 이-이 사전입니다.',
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
            navGreetings: '인사말',
            navPhrases: '유용한 대화',
            navDining: '식사 & 식당',
            rateLabel: '<i class="fas fa-tint"></i> 속도: '
        }
    };

    let currentItalianCategory = 'greetings';
    let selectedNativeLanguage = 'zh';

    const vocabDisplay = document.getElementById('vocab-display');
    const rateSlider = document.getElementById('voice-rate');
    const rateVal = document.getElementById('rate-val');
    const flagButtons = document.querySelectorAll('.flag-btn');
    const italianTabs = document.querySelectorAll('.btn-tab');

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

    // Render Vocabulary List and Translate UI dynamically
    const renderVocabList = (category) => {
        if (!vocabDisplay) return;
        vocabDisplay.innerHTML = '';
        currentItalianCategory = category;

        const data = italianVocabData[category];
        if (!data) return;

        const ui = uiTranslations[selectedNativeLanguage] || uiTranslations['en'];

        data.forEach(item => {
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

            card.innerHTML = `
                ${imageHtml}
                <div class="vocab-word-info">
                    <h3>
                        ${item.word}
                        ${item.phonetic ? `<span class="phonetic">/ ${item.phonetic} /</span>` : ''}
                    </h3>
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

        // Categories tabs text
        const tabGreetings = document.getElementById('tab-greetings');
        const tabPhrases = document.getElementById('tab-phrases');
        const tabDining = document.getElementById('tab-dining');
        if (tabGreetings) tabGreetings.innerText = ui.navGreetings;
        if (tabPhrases) tabPhrases.innerText = ui.navPhrases;
        if (tabDining) tabDining.innerText = ui.navDining;

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

    // Sub-tab toggling for categories
    italianTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            italianTabs.forEach(t => {
                t.classList.remove('btn-primary');
                t.classList.add('btn-secondary');
            });
            tab.classList.remove('btn-secondary');
            tab.classList.add('btn-primary');

            const category = tab.getAttribute('data-category');
            renderVocabList(category);
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
            renderVocabList(currentItalianCategory);
        });
    });

    // Initialize list inside current category
    if (vocabDisplay) {
        renderVocabList('greetings');
    }
});
