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
    // 2. Comprehensive Dictionary Database
    // ==========================================
    const italianDictionaryData = [
        {
            word: 'libro',
            phonetic: 'LEE-broh',
            pos: 's.m.', // Masculine Noun
            article: 'il',
            plural: 'libri',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '書 / 書籍', example: 'Leggo un libro interessante in biblioteca.', exampleTranslation: '我正在圖書館看一本很有趣的書。' },
                en: { meaning: 'book', example: 'Leggo un libro interessante in biblioteca.', exampleTranslation: 'I am reading an interesting book in the library.' },
                es: { meaning: 'libro', example: 'Leggo un libro interessante in biblioteca.', exampleTranslation: 'Leo un libro interesante en la biblioteca.' },
                ja: { meaning: '本 / 書籍', example: 'Leggo un libro interessante in biblioteca.', exampleTranslation: '私は図書館で面白い本を読んでいます。' },
                ko: { meaning: '책', example: 'Leggo un libro interessante in biblioteca.', exampleTranslation: '나는 도서관에서 흥미로운 책을 읽고 있습니다.' }
            }
        },
        {
            word: 'casa',
            phonetic: 'KAH-zah',
            pos: 's.f.', // Feminine Noun
            article: 'la',
            plural: 'case',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '房子 / 家', example: 'La mia casa si trova a Roma.', exampleTranslation: '我的家位在羅馬。' },
                en: { meaning: 'house / home', example: 'La mia casa si trova a Roma.', exampleTranslation: 'My house is located in Rome.' },
                es: { meaning: 'casa / hogar', example: 'La mia casa si trova a Roma.', exampleTranslation: 'Mi casa se encuentra en Roma.' },
                ja: { meaning: '家 / 自宅', example: 'La mia casa si trova a Roma.', exampleTranslation: '私の家はローマにあります。' },
                ko: { meaning: '집', example: 'La mia casa si trova a Roma.', exampleTranslation: '우리 집은 로마에 있습니다.' }
            }
        },
        {
            word: 'caffè',
            phonetic: 'kahf-FEH',
            pos: 's.m.',
            article: 'il',
            plural: 'caffè',
            image: 'assets/images/caffe.jpg',
            translations: {
                zh: { meaning: '咖啡', example: 'Prendiamo un caffè espresso al bar?', exampleTranslation: '我們要不要在咖啡廳喝杯濃縮咖啡？' },
                en: { meaning: 'coffee', example: 'Prendiamo un caffè espresso al bar?', exampleTranslation: 'Shall we grab an espresso at the bar?' },
                es: { meaning: 'café', example: 'Prendiamo un caffè espresso al bar?', exampleTranslation: '¿Tomamos un café expresso en el bar?' },
                ja: { meaning: 'コーヒー', example: 'Prendiamo un caffè espresso al bar?', exampleTranslation: 'カフェでエスプレッソを一杯飲みませんか？' },
                ko: { meaning: '커피', example: 'Prendiamo un caffè espresso al bar?', exampleTranslation: '우리 카페에서 에스프레소 한잔할까요?' }
            }
        },
        {
            word: 'pizza',
            phonetic: 'PEET-tsah',
            pos: 's.f.',
            article: 'la',
            plural: 'pizze',
            image: 'assets/images/pizza.jpg',
            translations: {
                zh: { meaning: '比薩', example: 'Questa pizza Margherita calda è fantastica.', exampleTranslation: '這款剛出爐的瑪格麗特比薩棒透了。' },
                en: { meaning: 'pizza', example: 'Questa pizza Margherita calda è fantastica.', exampleTranslation: 'This hot Margherita pizza is fantastic.' },
                es: { meaning: 'pizza', example: 'Questa pizza Margherita calda è fantastica.', exampleTranslation: 'Esta pizza Margherita caliente es fantástica.' },
                ja: { meaning: 'ピザ', example: 'Questa pizza Margherita calda è fantastica.', exampleTranslation: 'この焼きたてのマルゲリータピザは素晴らしいです。' },
                ko: { meaning: '피자', example: 'Questa pizza Margherita calda è fantastica.', exampleTranslation: '이 따끈한 마르게리타 피자는 정말 대단해요.' }
            }
        },
        {
            word: 'pasta',
            phonetic: 'PAHS-tah',
            pos: 's.f.',
            article: 'la',
            plural: 'paste',
            image: 'assets/images/pasta.jpg',
            translations: {
                zh: { meaning: '義大利麵', example: 'Cucino la pasta al pomodoro stasera.', exampleTranslation: '我今晚要煮番茄義大利麵。' },
                en: { meaning: 'pasta', example: 'Cucino la pasta al pomodoro stasera.', exampleTranslation: 'I am cooking tomato pasta tonight.' },
                es: { meaning: 'pasta', example: 'Cucino la pasta al pomodoro stasera.', exampleTranslation: 'Cocino la pasta con tomate esta noche.' },
                ja: { meaning: 'パスタ', example: '今夜はトマトパスタを作ります。', exampleTranslation: '今夜はトマトパスタを作ります。' },
                ko: { meaning: '파스타', example: 'Cucino la pasta al pomodoro stasera.', exampleTranslation: '오늘 밤에 토마토 파스타를 요리할 거예요.' }
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
                zh: { meaning: '水', example: 'Una bottiglia di acqua minerale, per favore.', exampleTranslation: '請給我一瓶礦泉水。' },
                en: { meaning: 'water', example: 'Una bottiglia di acqua minerale, per favore.', exampleTranslation: 'A bottle of mineral water, please.' },
                es: { meaning: 'agua', example: 'Una bottiglia di agua mineral, por favor.', exampleTranslation: 'Una botella de agua mineral, por favor.' },
                ja: { meaning: '水', example: 'Una bottiglia di acqua minerale, per favore.', exampleTranslation: 'ミネラルウォーターをボトルで一本お願いします。' },
                ko: { meaning: '물', example: 'Una bottiglia di acqua minerale, per favore.', exampleTranslation: '생수 한 병 주세요.' }
            }
        },
        {
            word: 'tiramisù',
            phonetic: 'tee-rah-mee-SOO',
            pos: 's.m.',
            article: 'il',
            plural: 'tiramisù',
            image: 'assets/images/tiramisu.jpg',
            translations: {
                zh: { meaning: '提拉米蘇', example: 'Ordino un tiramisù classico come dolce.', exampleTranslation: '我點了一份經典提拉米蘇當甜點。' },
                en: { meaning: 'tiramisu', example: 'Ordino un tiramisù classico come dolce.', exampleTranslation: 'I order a classic tiramisu as dessert.' },
                es: { meaning: 'tiramisú', example: 'Ordino un tiramisù classico come dolce.', exampleTranslation: 'Pido un tiramisú clásico como postre.' },
                ja: { meaning: 'ティラミス', example: 'デザートにクラシックなティラミスを注文します。', exampleTranslation: 'デザートにクラシックなティラミスを注文します。' },
                ko: { meaning: '티라미수', example: 'Ordino un tiramisù classico come dolce.', exampleTranslation: '디저트로 클래식 티라미수를 주문합니다.' }
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
                zh: { meaning: '朋友 (男)', example: 'Lui è il mio migliore amico d\'infanzia.', exampleTranslation: '他是我的兒時死黨。' },
                en: { meaning: 'friend (male)', example: 'Lui è il mio migliore amico d\'infanzia.', exampleTranslation: 'He is my best childhood friend.' },
                es: { meaning: 'amigo', example: 'Lui è il mio migliore amico d\'infanzia.', exampleTranslation: 'Él es mi mejor amigo de la infancia.' },
                ja: { meaning: '友達 (男性)', example: 'Lui è il mio migliore amico d\'infanzia.', exampleTranslation: '彼は私の幼馴染みの親友です。' },
                ko: { meaning: '친구 (남자)', example: 'Lui è il mio migliore amico d\'infanzia.', exampleTranslation: '그는 내 소꿉친구이자 가장 친한 친구입니다.' }
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
                zh: { meaning: '火車', example: 'Prendo il treno ad alta velocità per Firenze.', exampleTranslation: '我搭乘高速鐵路火車前往佛羅倫斯。' },
                en: { meaning: 'train', example: 'Prendo il treno ad alta velocità per Firenze.', exampleTranslation: 'I take the high-speed train to Florence.' },
                es: { meaning: 'tren', example: 'Prendo il treno ad alta velocità per Firenze.', exampleTranslation: 'Tomo el tren de alta velocidad a Florencia.' },
                ja: { meaning: '電車 / 列車', example: 'フィレンツェ行きの高速列車に乗ります。', exampleTranslation: 'フィレンツェ行きの高速列車に乗ります。' },
                ko: { meaning: '기차 / 열차', example: 'Prendo il treno ad alta velocità per Firenze.', exampleTranslation: '피렌체행 고속열차를 탑니다.' }
            }
        },
        {
            word: 'vino',
            phonetic: 'VEE-noh',
            pos: 's.m.',
            article: 'il',
            plural: 'vini',
            image: 'assets/images/vino.jpg',
            translations: {
                zh: { meaning: '葡萄酒', example: 'Offro un bicchiere di vino rosso toscano.', exampleTranslation: '我請喝一杯托斯卡尼的紅葡萄酒。' },
                en: { meaning: 'wine', example: 'Offro un bicchiere di vino rosso toscano.', exampleTranslation: 'I offer a glass of Tuscan red wine.' },
                es: { meaning: 'vino', example: 'Offro un bicchiere di vino rosso toscano.', exampleTranslation: 'Ofrezco una copa de vino tinto toscano.' },
                ja: { meaning: 'ワイン', example: 'トスカーナの赤ワインを一杯ごちそうします。', exampleTranslation: 'トスカーナの赤ワインを一杯ごちそうします。' },
                ko: { meaning: '와인', example: 'Offro un bicchiere di vino rosso toscano.', exampleTranslation: '토스카나 레드 와인 한 잔 대접할게요.' }
            }
        },
        {
            word: 'pane',
            phonetic: 'PAH-neh',
            pos: 's.m.',
            article: 'il',
            plural: 'pani',
            image: 'assets/images/pane.jpg',
            translations: {
                zh: { meaning: '麵包', example: 'Compriamo il pane fresco al panificio.', exampleTranslation: '我們去麵包店買剛出爐的新鮮麵包。' },
                en: { meaning: 'bread', example: 'Compriamo il pane fresco al panificio.', exampleTranslation: 'We buy fresh bread at the bakery.' },
                es: { meaning: 'pan', example: 'Compriamo il pane fresco al panificio.', exampleTranslation: 'Compramos pan fresco en la panadería.' },
                ja: { meaning: 'パン', example: 'Compriamo il pane fresco al panificio.', exampleTranslation: 'パン屋さんで新鮮なパンを買います。' },
                ko: { meaning: '빵', example: 'Compriamo del pane fresco al panificio.', exampleTranslation: '우리는 제과점에서 신선한 빵을 삽니다.' }
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
                zh: { meaning: '起司 / 乾酪', example: 'Aggiungo il formaggio parmigiano grattugiato.', exampleTranslation: '我撒上磨碎的帕馬森起司。' },
                en: { meaning: 'cheese', example: 'Aggiungo il formaggio parmigiano grattugiato.', exampleTranslation: 'I add grated parmesan cheese.' },
                es: { meaning: 'queso', example: 'Aggiungo il formaggio parmigiano grattugiato.', exampleTranslation: 'Agrego queso parmesano rallado.' },
                ja: { meaning: 'チーズ', example: 'すりおろしたパルメザンチーズを加えます。', exampleTranslation: 'すりおろしたパルメザンチーズを加えます。' },
                ko: { meaning: '치즈', example: 'Aggiungo il formaggio parmigiano grattugiato.', exampleTranslation: '갈아 놓은 파르메산 치즈를 뿌립니다.' }
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
                zh: { meaning: '蘋果', example: 'Mangio una mela rossa per merenda.', exampleTranslation: '我吃一顆紅蘋果當點心。' },
                en: { meaning: 'apple', example: 'Mangio una mela rossa per merenda.', exampleTranslation: 'I eat a red apple for a snack.' },
                es: { meaning: 'manzana', example: 'Mangio una mela rossa per merenda.', exampleTranslation: 'Como una manzana roja para la merienda.' },
                ja: { meaning: 'リンゴ', example: 'おやつに赤いリンゴを食べます。', exampleTranslation: 'おやつに赤いリンゴを食べます。' },
                ko: { meaning: '사과', example: 'Mangio una mela rossa per merenda.', exampleTranslation: '간식으로 빨간 사과를 먹습니다.' }
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
                zh: { meaning: '太陽', example: 'Il sole splende nel cielo oggi.', exampleTranslation: '今天太陽高掛在天空中。' },
                en: { meaning: 'sun', example: 'Il sole splende nel cielo oggi.', exampleTranslation: 'The sun is shining in the sky today.' },
                es: { meaning: 'sol', example: 'Il sole splende nel cielo oggi.', exampleTranslation: 'El sol brilla en el cielo hoy.' },
                ja: { meaning: '太陽', example: '今日は空に太陽が輝いています。', exampleTranslation: '今日は空に太陽が輝いています。' },
                ko: { meaning: '태양', example: '오늘 하늘에 태양이 밝게 빛나고 있습니다.', exampleTranslation: '오늘 하늘에 태양이 밝게 빛나고 있습니다.' }
            }
        },
        {
            word: 'gatto',
            phonetic: 'GAHT-toh',
            pos: 's.m.',
            article: 'il',
            plural: 'gatti',
            image: 'assets/images/gatto.jpg',
            translations: {
                zh: { meaning: '貓', example: 'Il gatto nero dorme sulla sedia.', exampleTranslation: '這隻黑貓在椅子上睡覺。' },
                en: { meaning: 'cat', example: 'Il gatto nero dorme sulla sedia.', exampleTranslation: 'The black cat is sleeping on the chair.' },
                es: { meaning: 'gato', example: 'Il gatto nero dorme sulla sedia.', exampleTranslation: 'El gato negro duerme en la silla.' },
                ja: { meaning: '猫', example: '黒猫が椅子の上で寝ています。', exampleTranslation: '黒猫が椅子の上で寝ています。' },
                ko: { meaning: '고양이', example: '검은 고양이가 의자 위에서 자고 있습니다.', exampleTranslation: '검은 고양이가 의자 위에서 자고 있습니다.' }
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
                zh: { meaning: '狗', example: 'Il cane corre felice nel parco.', exampleTranslation: '狗狗開心地在公園裡奔跑。' },
                en: { meaning: 'dog', example: 'Il cane corre felice nel parco.', exampleTranslation: 'The dog runs happily in the park.' },
                es: { meaning: 'perro', example: 'Il cane corre felice nel parco.', exampleTranslation: 'El perro corre feliz en el parque.' },
                ja: { meaning: '犬', example: '犬が公園を嬉しそうに走っています。', exampleTranslation: '犬が公園を嬉しそうに走っています。' },
                ko: { meaning: '개 / 강아지', example: '개가 공원에서 행복하게 달리고 있습니다.', exampleTranslation: '개가 공원에서 행복하게 달리고 있습니다.' }
            }
        },
        {
            word: 'ragazzo',
            phonetic: 'rah-GAHT-tsoh',
            pos: 's.m.',
            article: 'il',
            plural: 'ragazzi',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '男孩 / 少年', example: 'Quel ragazzo gioca bene a calcio.', exampleTranslation: '那個男孩足球踢得很好。' },
                en: { meaning: 'boy / young man', example: 'Quel ragazzo gioca bene a calcio.', exampleTranslation: 'That boy plays soccer well.' },
                es: { meaning: 'chico / muchacho', example: 'Quel ragazzo gioca bene a calcio.', exampleTranslation: 'Ese chico juega bien al fútbol.' },
                ja: { meaning: '少年 / 男の子', example: 'あの男の子はサッカーが上手です。', exampleTranslation: 'あの男の子はサッカーが上手です。' },
                ko: { meaning: '소년 / 남자아이', example: '저 소년은 축구를 잘합니다.', exampleTranslation: '저 소년은 축구를 잘합니다.' }
            }
        },
        {
            word: 'ragazza',
            phonetic: 'rah-GAHT-tsah',
            pos: 's.f.',
            article: 'la',
            plural: 'ragazze',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '女孩 / 少女', example: 'La ragazza studia l\'italiano a scuola.', exampleTranslation: '那個女孩在學校學習義大利文。' },
                en: { meaning: 'girl / young woman', example: 'La ragazza studia l\'italiano a scuola.', exampleTranslation: 'The girl studies Italian at school.' },
                es: { meaning: 'chica / muchacha', example: 'La ragazza studia l\'italiano a scuola.', exampleTranslation: 'La chica estudia italiano en la escuela.' },
                ja: { meaning: '少女 / 女の子', example: '女の子は学校でイタリア語を勉強しています。', exampleTranslation: '女の子は学校でイタリア語を勉強しています。' },
                ko: { meaning: '소녀 / 여자아이', example: '그 소녀는 학교에서 이탈리아어를 공부합니다.', exampleTranslation: '그 소녀는 학교에서 이탈리아어를 공부합니다.' }
            }
        },
        {
            word: 'macchina',
            phonetic: 'MAHK-kee-nah',
            pos: 's.f.',
            article: 'la',
            plural: 'macchine',
            image: 'assets/images/macchina.jpg',
            translations: {
                zh: { meaning: '汽車 / 機器', example: 'Guido una macchina rossa veloce.', exampleTranslation: '我開著一輛快速的紅色跑車。' },
                en: { meaning: 'car / machine', example: 'Guido una macchina rossa veloce.', exampleTranslation: 'I drive a fast red car.' },
                es: { meaning: 'coche / carro', example: 'Guido una macchina rossa veloce.', exampleTranslation: 'Conduzco un coche rojo rápido.' },
                ja: { meaning: '車 / 自動車', example: '私は速い赤い車を運転します。', exampleTranslation: '私は速い赤い車を運転します。' },
                ko: { meaning: '차 / 자동차', example: '나는 빠른 빨간 자동차를 운전합니다.', exampleTranslation: '나는 빠른 빨간 자동차를 운전합니다.' }
            }
        },
        {
            word: 'città',
            phonetic: 'cheet-TAH',
            pos: 's.f.',
            article: 'la',
            plural: 'città',
            image: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '城市', example: 'Roma è la città eterna.', exampleTranslation: '羅馬是永恆之城。' },
                en: { meaning: 'city', example: 'Roma è la città eterna.', exampleTranslation: 'Rome is the eternal city.' },
                es: { meaning: 'ciudad', example: 'Roma è la città eterna.', exampleTranslation: 'Roma es la ciudad eterna.' },
                ja: { meaning: '都市 / 街', example: 'ローマは永遠の都です。', exampleTranslation: 'ローマは永遠の都です。' },
                ko: { meaning: '도시', example: '로마는 영원의 도시입니다.', exampleTranslation: '로마는 영원의 도시입니다.' }
            }
        },
        {
            word: 'notte',
            phonetic: 'NOHT-teh',
            pos: 's.f.',
            article: 'la',
            plural: 'notti',
            image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '夜晚', example: 'Auguro buona notte a tutti.', exampleTranslation: '祝大家晚安。' },
                en: { meaning: 'night', example: 'Auguro buona notte a tutti.', exampleTranslation: 'I wish good night to everyone.' },
                es: { meaning: 'noche', example: 'Auguro buona noche a tutti.', exampleTranslation: 'Les deseo buenas noches a todos.' },
                ja: { meaning: '夜 / 夜間', example: '皆さんに「おやすみなさい」と言います。', exampleTranslation: '皆さんに「おやすみなさい」と言います。' },
                ko: { meaning: '밤', example: '모두에게 좋은 밤 되시길 바랍니다.', exampleTranslation: '모두에게 좋은 밤 되시길 바랍니다.' }
            }
        },
        {
            word: 'famiglia',
            phonetic: 'fah-MEEL-yah',
            pos: 's.f.',
            article: 'la',
            plural: 'famiglie',
            image: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '家庭 / 家人', example: 'La mia famiglia vive felice.', exampleTranslation: '我的家庭生活非常幸福。' },
                en: { meaning: 'family', example: 'La mia famiglia vive felice.', exampleTranslation: 'My family lives happily.' },
                es: { meaning: 'familia', example: 'La mia famiglia vive felice.', exampleTranslation: 'Mi familia vive feliz.' },
                ja: { meaning: '家族 / 家庭', example: '私の家族は幸せに暮らしています。', exampleTranslation: '私の家族は幸せに暮らしています。' },
                ko: { meaning: '가족', example: '우리 가족은 행복하게 살고 있습니다.', exampleTranslation: '우리 가족은 행복하게 살고 있습니다.' }
            }
        },
        {
            word: 'scuola',
            phonetic: 'SKWOH-lah',
            pos: 's.f.',
            article: 'la',
            plural: 'scuole',
            image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '學校', example: 'I bambini vanno a scuola alle otto.', exampleTranslation: '小孩子們八點上學。' },
                en: { meaning: 'school', example: 'I bambini vanno a scuola alle otto.', exampleTranslation: 'The children go to school at eight o\'clock.' },
                es: { meaning: 'escuela', example: 'I bambini vanno a scuola alle otto.', exampleTranslation: 'Los niños van a la escuela a las ocho.' },
                ja: { meaning: '学校', example: '子供たちは8時に学校に行きます。', exampleTranslation: '子供たちは8時に学校に行きます。' },
                ko: { meaning: '학교', example: '아이들은 8시에 학교에 갑니다.', exampleTranslation: '아이들은 8시에 학교에 갑니다.' }
            }
        },
        {
            word: 'mare',
            phonetic: 'MAH-reh',
            pos: 's.m.',
            article: 'il',
            plural: 'mari',
            image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '海 / 海洋', example: 'Facciamo il bagno nel mare d\'estate.', exampleTranslation: '我們夏天在海裡游泳游泳。' },
                en: { meaning: 'sea / ocean', example: 'Facciamo il bagno nel mare d\'estate.', exampleTranslation: 'We swim in the sea in summer.' },
                es: { meaning: 'mar', example: 'Facciamo il bagno nel mare d\'estate.', exampleTranslation: 'Nos bañamos en el mar en verano.' },
                ja: { meaning: '海 / 海洋', example: '夏には海で泳ぎます。', exampleTranslation: '夏には海で泳ぎます。' },
                ko: { meaning: '바다', example: '우리는 여름에 바다에서 수영을 합니다.', exampleTranslation: '우리는 여름에 바다에서 수영을 합니다.' }
            }
        },
        {
            word: 'fiore',
            phonetic: 'FYOH-reh',
            pos: 's.m.',
            article: 'il',
            plural: 'fiori',
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '花 / 花朵', example: 'Questo fiore profuma di primavera.', exampleTranslation: '這朵花聞起來有春天的氣息。' },
                en: { meaning: 'flower', example: 'Questo fiore profuma di primavera.', exampleTranslation: 'This flower smells like spring.' },
                es: { meaning: 'flor', example: 'Questo fiore profuma di primavera.', exampleTranslation: 'Esta flor huele a primavera.' },
                ja: { meaning: '花 / 草花', example: 'この花は春の香りがします。', exampleTranslation: 'この花は春の香りがします。' },
                ko: { meaning: '꽃', example: '이 꽃에서 봄 냄새가 납니다.', exampleTranslation: '이 꽃에서 봄 냄새가 납니다.' }
            }
        },
        {
            word: 'stella',
            phonetic: 'STEHL-lah',
            pos: 's.f.',
            article: 'la',
            plural: 'stelle',
            image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=300&q=80',
            translations: {
                zh: { meaning: '星星', example: 'Vedo una stella cadente nel cielo.', exampleTranslation: '我看見天空中有一顆流星。' },
                en: { meaning: 'star', example: 'Vedo una stella cadente nel cielo.', exampleTranslation: 'I see a shooting star in the sky.' },
                es: { meaning: 'estrella', example: 'Vedo una stella cadente nel cielo.', exampleTranslation: 'Veo una estrella fugaz en el cielo.' },
                ja: { meaning: '星 / 天体', example: '空に流れ星が見えます。', exampleTranslation: '空に流れ星が見えます。' },
                ko: { meaning: '별', example: '하늘에서 별똥별이 보입니다.', exampleTranslation: '하늘에서 별똥별이 보입니다.' }
            }
        },
        {
            word: 'mangiare',
            phonetic: 'mahn-JAH-reh',
            pos: 'v.', // verbo
            conjugation: 'regular -are',
            image: 'assets/images/mangiare.jpg',
            translations: {
                zh: { meaning: '吃 (動詞)', example: 'Mi piace mangiare la pizza italiana.', exampleTranslation: '我喜歡吃義大利比薩。' },
                en: { meaning: 'to eat', example: 'Mi piace mangiare la pizza italiana.', exampleTranslation: 'I like to eat Italian pizza.' },
                es: { meaning: 'comer', example: 'Mi piace mangiare la pizza italiana.', exampleTranslation: 'Me gusta comer pizza italiana.' },
                ja: { meaning: '食べる', example: '私はイタリアンピザを食べるのが好きです。', exampleTranslation: '私はイタリアンピザを食べるのが好きです。' },
                ko: { meaning: '먹다', example: '나는 이탈리아 피자를 먹는 것을 좋아합니다.', exampleTranslation: '나는 이탈리아 피자를 먹는 것을 좋아합니다.' }
            }
        },
        {
            word: 'parlare',
            phonetic: 'pahr-LAH-reh',
            pos: 'v.',
            conjugation: 'regular -are',
            image: 'assets/images/parlare.jpg',
            translations: {
                zh: { meaning: '說話 / 討論', example: 'Parlo l\'italiano con i miei amici.', exampleTranslation: '我和我的朋友們說義大利文。' },
                en: { meaning: 'to speak / to talk', example: 'Parlo l\'italiano con i miei amici.', exampleTranslation: 'I speak Italian with my friends.' },
                es: { meaning: 'hablar', example: 'Parlo l\'italiano con i miei amici.', exampleTranslation: 'Hablo italiano con mis amigos.' },
                ja: { meaning: '話す / しゃべる', example: '私は友達とイタリア語を話します。', exampleTranslation: '私は友達とイタリア語を話します。' },
                ko: { meaning: '말하다', example: '나는 친구들과 이탈리아어로 말합니다.', exampleTranslation: '나는 친구들과 이탈리아어로 말합니다.' }
            }
        },
        {
            word: 'andare',
            phonetic: 'ahn-DAH-reh',
            pos: 'v.',
            conjugation: 'irregular',
            translations: {
                zh: { meaning: '去 / 前往', example: 'Vado in Italia questo fine settimana.', exampleTranslation: '這個週末我要去義大利。' },
                en: { meaning: 'to go', example: 'Vado in Italia questo fine settimana.', exampleTranslation: 'I am going to Italy this weekend.' },
                es: { meaning: 'ir', example: 'Vado in Italia questo fine settimana.', exampleTranslation: 'Voy a Italia este fin de semana.' },
                ja: { meaning: '行く', example: '私は今週末イタリアに行きます。', exampleTranslation: '私は今週末イタリアに行きます。' },
                ko: { meaning: '가다', example: '나는 이번 주말에 이탈리아에 갑니다.', exampleTranslation: '나는 이번 주말에 이탈리아에 갑니다.' }
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
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 語速: ',
            onlineTag: '<i class="fas fa-globe-americas"></i> 線上即時翻譯系統',
            onlineTranslating: '正在翻譯中...',
            onlineTranslationLabel: '譯',
            onlineTranslationError: '翻譯失敗，請檢查網路連線。',
            posMasculine: '陽性名詞 [s.m.]',
            posFeminine: '陰性名詞 [s.f.]',
            posVerb: '動詞 [v.]',
            posOther: '其他詞性'
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
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Speed: ',
            onlineTag: '<i class="fas fa-globe-americas"></i> Online Translation System',
            onlineTranslating: 'Translating...',
            onlineTranslationLabel: 'Trans',
            onlineTranslationError: 'Translation failed. Please check connection.',
            posMasculine: 'Masculine Noun [s.m.]',
            posFeminine: 'Feminine Noun [s.f.]',
            posVerb: 'Verb [v.]',
            posOther: 'Other POS'
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
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Vel: ',
            onlineTag: '<i class="fas fa-globe-americas"></i> Sistema de traducción en línea',
            onlineTranslating: 'Traduciendo...',
            onlineTranslationLabel: 'Trad',
            onlineTranslationError: 'La traducción falló. Compruebe la conexión.',
            posMasculine: 'Sustantivo Masculino [s.m.]',
            posFeminine: 'Sustantivo Femenino [s.f.]',
            posVerb: 'Verbo [v.]',
            posOther: 'Otro POS'
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
            resDescWr: '動詞変化表や活發なQ&Aコミュニティが魅力の世界的なオンライン辞典。',
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
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 速度: ',
            onlineTag: '<i class="fas fa-globe-americas"></i> オンライン即時翻訳システム',
            onlineTranslating: '翻訳中...',
            onlineTranslationLabel: '翻訳',
            onlineTranslationError: '翻訳に失敗しました。接続を確認してください。',
            posMasculine: '男性名詞 [s.m.]',
            posFeminine: '女性名詞 [s.f.]',
            posVerb: '動詞 [v.]',
            posOther: 'その他'
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
            rateLabel: '<i class="fas fa-tint"></i> 속도: ',
            onlineTag: '<i class="fas fa-globe-americas"></i> 온라인 실시간 번역 시스템',
            onlineTranslating: '번역 중...',
            onlineTranslationLabel: '번역',
            onlineTranslationError: '번역에 실패했습니다. 연결을 확인하세요.',
            posMasculine: '남성 명사 [s.m.]',
            posFeminine: '여성 명사 [s.f.]',
            posVerb: '동사 [v.]',
            posOther: '기타 품사'
        }
    };

    let selectedNativeLanguage = 'zh';
    let searchQuery = '';
    let selectedLetter = 'all';
    let lastTranslationTimeout = null;

    const vocabDisplay = document.getElementById('vocab-display');
    const rateSlider = document.getElementById('voice-rate');
    const rateVal = document.getElementById('rate-val');
    const flagButtons = document.querySelectorAll('.flag-btn');
    const alphabetButtons = document.querySelectorAll('.alphabet-btn');
    const searchInput = document.getElementById('dict-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const resultsCountText = document.getElementById('results-count-text');

    // Helper: Guess POS and Gender of online query words dynamically
    const guessPOSAndGender = (word) => {
        const cleaned = word.toLowerCase().trim();
        if (cleaned.endsWith('are') || cleaned.endsWith('ere') || cleaned.endsWith('ire')) {
            return {
                posClass: 'pos-verb',
                posLabelKey: 'posVerb',
                guessDetail: 'Probable verb (-are/-ere/-ire infinitive)'
            };
        } else if (cleaned.endsWith('o') || cleaned.endsWith('i')) {
            return {
                posClass: 'pos-masculine',
                posLabelKey: 'posMasculine',
                guessDetail: 'Probable masculine singular/plural noun'
            };
        } else if (cleaned.endsWith('a') || cleaned.endsWith('e')) {
            return {
                posClass: 'pos-feminine',
                posLabelKey: 'posFeminine',
                guessDetail: 'Probable feminine singular/plural noun'
            };
        }
        return {
            posClass: 'pos-other',
            posLabelKey: 'posOther',
            guessDetail: 'General vocabulary term'
        };
    };

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

    // Client-side translation lookup via MyMemory API
    const fetchOnlineTranslation = async (query, lang) => {
        const langMap = {
            'zh': 'zh-TW',
            'en': 'en',
            'es': 'es',
            'ja': 'ja',
            'ko': 'ko'
        };
        const targetLang = langMap[lang] || 'zh-TW';
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=it|${targetLang}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API response failed');
            const data = await response.json();
            
            if (data && data.responseData && data.responseData.translatedText) {
                return data.responseData.translatedText;
            }
            return null;
        } catch (error) {
            console.error('Translation error:', error);
            return null;
        }
    };

    // Render Dictionary Cards dynamically
    const renderDictionary = () => {
        if (!vocabDisplay) return;
        
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

        // Handle Empty state - fallback to Online Translation System!
        if (filteredData.length === 0) {
            if (searchQuery !== '') {
                const guess = guessPOSAndGender(searchQuery);
                const posLabelText = ui[guess.posLabelKey] || ui.posOther;

                // Render an Instant Online Translator card with gender guesses!
                vocabDisplay.innerHTML = `
                    <div class="vocab-card online-translation-card" style="border-color: var(--primary);">
                        <div class="vocab-word-info">
                            <h3>
                                ${searchQuery}
                                <span class="pos-tag ${guess.posClass}" style="margin-left: 0.8rem;">
                                    ${posLabelText}
                                </span>
                            </h3>
                            
                            <div class="grammar-info-row" style="margin-top: 0.5rem; font-size: 0.8rem;">
                                <span><i class="fas fa-magic"></i> <strong>Grammar Guess:</strong> ${guess.guessDetail}</span>
                                <span><i class="fas fa-globe-americas"></i> <strong>Source:</strong> AI Translator</span>
                            </div>

                            <div class="vocab-meaning-row" style="margin-top: 1rem;">
                                <span class="label-badge badge-meaning">${ui.onlineTranslationLabel}</span>
                                <div class="meaning" id="online-translation-result" style="font-style: italic; color: var(--text-secondary);">
                                    ${ui.onlineTranslating}
                                </div>
                            </div>
                        </div>
                        <div class="play-btn-group">
                            <button class="play-btn btn-play-word" id="btn-play-online-word" aria-label="播放線上發音">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <span class="play-label">${ui.wordLabel}</span>
                        </div>
                    </div>
                `;

                // Add sound listener to online result
                const playBtn = document.getElementById('btn-play-online-word');
                if (playBtn) {
                    playBtn.addEventListener('click', () => speakItalian(searchQuery));
                }

                // Debounce translation API request to prevent overwhelming the server
                if (lastTranslationTimeout) clearTimeout(lastTranslationTimeout);
                lastTranslationTimeout = setTimeout(async () => {
                    const translatedText = await fetchOnlineTranslation(searchQuery, selectedNativeLanguage);
                    const resultDiv = document.getElementById('online-translation-result');
                    if (resultDiv) {
                        if (translatedText) {
                            resultDiv.innerText = translatedText;
                            resultDiv.style.fontStyle = 'normal';
                            resultDiv.style.color = 'var(--text-primary)';
                        } else {
                            resultDiv.innerText = ui.onlineTranslationError;
                            resultDiv.style.color = 'var(--danger)';
                        }
                    }
                }, 500);

            } else {
                vocabDisplay.innerHTML = `
                    <div class="empty-results-box">
                        <i class="fas fa-search-minus"></i>
                        <h4>${ui.noResults}</h4>
                    </div>
                `;
            }
            return;
        }

        vocabDisplay.innerHTML = '';
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

            // Map internal POS tags to localized display strings and styles
            let posClass = 'pos-other';
            let posLabel = ui.posOther;
            if (item.pos === 's.m.') {
                posClass = 'pos-masculine';
                posLabel = ui.posMasculine;
            } else if (item.pos === 's.f.') {
                posClass = 'pos-feminine';
                posLabel = ui.posFeminine;
            } else if (item.pos === 'v.') {
                posClass = 'pos-verb';
                posLabel = ui.posVerb;
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
                        <span class="pos-tag ${posClass}">${posLabel}</span>
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
