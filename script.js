document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Navigation & Tab Switching
    // ==========================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const activeTitle = document.getElementById('active-tool-title');
    const toolCards = document.querySelectorAll('.tool-card');

    const switchTab = (targetId) => {
        // Remove active class from buttons and panes
        navButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active to selected button and pane
        const targetBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        const targetPane = document.getElementById(targetId);

        if (targetBtn && targetPane) {
            targetBtn.classList.add('active');
            targetPane.classList.add('active');
            
            // Update Header Title
            const titleText = targetBtn.textContent.trim();
            activeTitle.textContent = titleText;

            // Trigger sub-initializations if needed
            if (targetId === 'italian-tool') {
                renderVocabList(currentItalianCategory);
            }
        }
    };

    // Nav list clicks
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            switchTab(target);
        });
    });

    // Dashboard card clicks
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-card-target');
            switchTab(target);
        });
    });

    // ==========================================
    // 2. Tool Search Filter
    // ==========================================
    const toolSearch = document.getElementById('tool-search');
    
    if (toolSearch) {
        toolSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            navButtons.forEach(btn => {
                const target = btn.getAttribute('data-target');
                if (target === 'dashboard') return; // Skip dashboard item

                const btnText = btn.textContent.toLowerCase();
                if (btnText.includes(query)) {
                    btn.parentElement.style.display = 'block';
                } else {
                    btn.parentElement.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 3. Theme Toggle (Dark / Light)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    const savedTheme = localStorage.getItem('toolbox-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('toolbox-theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('toolbox-theme', 'dark');
        }
    });

    // ==========================================
    // Helper: Clipboard Copy
    // ==========================================
    const copyToClipboard = (text, successCallback) => {
        navigator.clipboard.writeText(text)
            .then(successCallback)
            .catch(err => {
                console.error('無法複製文字: ', err);
            });
    };

    // ==========================================
    // 4. Tool: JSON Formatter & Validator
    // ==========================================
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');
    const btnJsonFormat = document.getElementById('btn-json-format');
    const btnJsonMinify = document.getElementById('btn-json-minify');
    const btnJsonClear = document.getElementById('btn-json-clear');
    const btnJsonCopy = document.getElementById('btn-json-copy');

    const updateJsonStatus = (isValid, message = '') => {
        jsonStatus.className = 'tool-status-bar';
        if (isValid) {
            jsonStatus.classList.add('valid');
            jsonStatus.innerHTML = '<i class="fas fa-check-circle"></i> JSON 格式正確！';
        } else {
            jsonStatus.classList.add('invalid');
            jsonStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> 語法錯誤: ${message}`;
        }
    };

    const processJson = (minify = false) => {
        const val = jsonInput.value.trim();
        if (!val) {
            jsonOutput.textContent = '格式化後的資料將在此顯示...';
            jsonOutput.className = 'empty-output';
            jsonStatus.className = 'tool-status-bar';
            jsonStatus.innerHTML = '';
            return;
        }

        try {
            const parsed = JSON.parse(val);
            const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 4);
            jsonOutput.textContent = formatted;
            jsonOutput.className = '';
            updateJsonStatus(true);
        } catch (e) {
            jsonOutput.textContent = '解析錯誤，請確認輸入資料。';
            jsonOutput.className = 'empty-output';
            updateJsonStatus(false, e.message);
        }
    };

    if (btnJsonFormat) {
        btnJsonFormat.addEventListener('click', () => processJson(false));
        btnJsonMinify.addEventListener('click', () => processJson(true));
        
        btnJsonClear.addEventListener('click', () => {
            jsonInput.value = '';
            processJson();
        });

        btnJsonCopy.addEventListener('click', () => {
            const text = jsonOutput.textContent;
            if (text && !jsonOutput.classList.contains('empty-output')) {
                copyToClipboard(text, () => {
                    const originalText = btnJsonCopy.innerHTML;
                    btnJsonCopy.innerHTML = '<i class="fas fa-check"></i> 已複製';
                    setTimeout(() => {
                        btnJsonCopy.innerHTML = originalText;
                    }, 2000);
                });
            }
        });
    }

    // ==========================================
    // 5. Tool: Color Palette Generator
    // ==========================================
    const paletteDisplay = document.getElementById('palette-display');
    const btnGenerateColors = document.getElementById('btn-generate-colors');
    let colorSlotsData = [];

    // Helper: generate random beautiful color
    const generateRandomHex = () => {
        // HSL based generation to ensure clean, vibrant colors (no muddy colors)
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 25) + 65; // 65% - 90%
        const l = Math.floor(Math.random() * 20) + 45; // 45% - 65%
        
        // Convert HSL to Hex
        const hslToHex = (h, s, l) => {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        };
        
        return hslToHex(h, s, l);
    };

    // Helper: Hex to RGB
    const hexToRgbString = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `RGB(${r}, ${g}, ${b})`;
    };

    const renderPalette = () => {
        if (!paletteDisplay) return;
        paletteDisplay.innerHTML = '';
        
        colorSlotsData.forEach((slot, index) => {
            const slotEl = document.createElement('div');
            slotEl.className = 'color-slot';
            
            slotEl.innerHTML = `
                <div class="color-block" style="background-color: ${slot.hex}"></div>
                <div class="color-slot-meta">
                    <div class="color-hex">${slot.hex.toUpperCase()}</div>
                    <div class="color-rgb">${hexToRgbString(slot.hex)}</div>
                    <button class="lock-btn ${slot.locked ? 'locked' : ''}" aria-label="鎖定色彩">
                        <i class="fas ${slot.locked ? 'fa-lock' : 'fa-lock-open'}"></i>
                    </button>
                </div>
            `;

            // Lock toggle listener
            const lockBtn = slotEl.querySelector('.lock-btn');
            lockBtn.addEventListener('click', () => {
                colorSlotsData[index].locked = !colorSlotsData[index].locked;
                renderPalette();
            });

            // Copy Hex on click
            const hexEl = slotEl.querySelector('.color-hex');
            const colorBlock = slotEl.querySelector('.color-block');
            
            const handleCopy = () => {
                copyToClipboard(slot.hex.toUpperCase(), () => {
                    const originalText = hexEl.textContent;
                    hexEl.textContent = '複製成功！';
                    hexEl.style.color = 'var(--success)';
                    setTimeout(() => {
                        hexEl.textContent = originalText;
                        hexEl.style.color = '';
                    }, 1200);
                });
            };

            hexEl.addEventListener('click', handleCopy);
            colorBlock.addEventListener('click', handleCopy);

            paletteDisplay.appendChild(slotEl);
        });
    };

    const generatePalette = (initial = false) => {
        if (initial) {
            colorSlotsData = Array.from({ length: 5 }, () => ({
                hex: generateRandomHex(),
                locked: false
            }));
        } else {
            colorSlotsData = colorSlotsData.map(slot => {
                if (slot.locked) return slot;
                return {
                    hex: generateRandomHex(),
                    locked: false
                };
            });
        }
        renderPalette();
    };

    if (btnGenerateColors) {
        btnGenerateColors.addEventListener('click', () => generatePalette(false));
        // Run initial load
        generatePalette(true);
    }

    // ==========================================
    // 6. Tool: Markdown Previewer
    // ==========================================
    const markdownInput = document.getElementById('markdown-input');
    const markdownOutput = document.getElementById('markdown-output');
    const btnMdClear = document.getElementById('btn-md-clear');
    const btnMdSample = document.getElementById('btn-md-sample');

    const sampleMarkdown = `# Markdown 範例文件

這是一個由 **Nova Toolbox** 即時渲染的範本。

## 常用語法介紹

### 1. 清單項目
*   **粗體字** 與 *斜體字* 混合使用。
*   內嵌 \`inline code\` 程式碼。
*   支援項目符號：
    *   子清單項目一
    *   子清單項目二

### 2. 程式碼區塊 (Code Block)
\`\`\`javascript
function calculateSum(a, b) {
    console.log("計算總和中...");
    return a + b;
}
console.log(calculateSum(10, 20));
\`\`\`

### 3. 引言 (Blockquote)
> "科技始終來自於人性，而代碼始終來自於熱情。"
> — *Nova Chen*

---
請在此處隨意編輯或輸入您的 Markdown 文件，右側會立刻顯示網頁排版結果。`;

    const renderMarkdown = () => {
        if (!markdownInput || !markdownOutput) return;
        const rawText = markdownInput.value;
        if (!rawText.trim()) {
            markdownOutput.innerHTML = '<p class="empty-output">預覽結果將在此顯示...</p>';
            return;
        }
        
        // Parse markdown using marked.js library loaded via CDN
        try {
            markdownOutput.innerHTML = marked.parse(rawText);
        } catch (e) {
            markdownOutput.innerHTML = `<p style="color: var(--danger)">編譯錯誤: ${e.message}</p>`;
        }
    };

    if (markdownInput) {
        markdownInput.addEventListener('input', renderMarkdown);
        
        if (btnMdClear) {
            btnMdClear.addEventListener('click', () => {
                markdownInput.value = '';
                renderMarkdown();
            });
        }

        if (btnMdSample) {
            btnMdSample.addEventListener('click', () => {
                markdownInput.value = sampleMarkdown;
                renderMarkdown();
            });
        }

        // Load initial state if empty
        renderMarkdown();
    }

    // ==========================================
    // 7. Tool: Italian Learning Assistant (Multilingual)
    // ==========================================
    
    // Core Vocabulary Data with multiple translation targets
    const italianVocabData = {
        greetings: [
            {
                word: 'Buongiorno',
                phonetic: 'bwohn-JOHR-noh',
                translations: {
                    zh: { meaning: '早安 / 您好 (正式)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: '女士早安，您好嗎？' },
                    en: { meaning: 'Good morning / Hello (formal)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: 'Good morning, ma\'am. How are you?' },
                    es: { meaning: 'Buenos días / Hola (formal)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: 'Buenos días, señora. ¿Cómo está?' },
                    ja: { meaning: 'おはようございます / こんにちは', example: 'Buongiorno, signora. Come sta?', exampleTranslation: 'お早うございます、マダム。お元気ですか？' },
                    ko: { meaning: '좋은 아침 / 안녕하세요 (격식)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: '안녕하세요, 부인. 어떻게 지내세요?' }
                }
            },
            {
                word: 'Ciao',
                phonetic: 'CHAH-oh',
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
                word: 'Dov\'è il bagno?',
                phonetic: 'doh-VEH eel BAHN-yoh',
                translations: {
                    zh: { meaning: '廁所在哪裡？', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: '不好意思，請問這家咖啡廳的廁所在哪裡？' },
                    en: { meaning: 'Where is the bathroom?', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: 'Excuse me, where is the bathroom in this bar?' },
                    es: { meaning: '¿Dónde está el baño?', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: 'Disculpe, ¿dónde está el baño en este bar?' },
                    ja: { meaning: 'トイレはどこですか？', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: 'すみません、このカフェのトイレはどこですか？' },
                    ko: { meaning: '화장실이 어디예요?', example: 'Scusi, dov\'è il bagno in questo bar?', exampleTranslation: '실례합니다, 이 카페의 화장실은 어디인가요?' }
                }
            },
            {
                word: 'Quanto costa?',
                phonetic: 'KWAHN-toh KOHS-tah',
                translations: {
                    zh: { meaning: '這多少錢？', example: 'Quanto costa questo gelato al pistacchio?', exampleTranslation: '這球開心果冰淇淋多少錢？' },
                    en: { meaning: 'How much does it cost?', example: 'Quanto costa questo gelato al pistacchio?', exampleTranslation: 'How much is this pistachio gelato?' },
                    es: { meaning: '¿Cuánto cuesta?', example: 'Quanto costa questo gelato al pistacchio?', exampleTranslation: '¿Cuánto cuesta este helado de pistacho?' },
                    ja: { meaning: 'いくらですか？', example: 'Quanto costa questo gelato al pistacchio?', exampleTranslation: 'このピスタチオジェラートはいくらですか？' },
                    ko: { meaning: '얼마예요?', example: 'Quanto costa questo gelato al pistacchio?', exampleTranslation: '이 피스타치오 젤라토는 얼마예요?' }
                }
            },
            {
                word: 'Parla inglese?',
                phonetic: 'PAHR-lah een-GLEH-zeh',
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
                word: 'Il conto, per favore',
                phonetic: 'eel KOHN-toh pehr fah-VOH-reh',
                translations: {
                    zh: { meaning: '請結帳', example: 'Cameriere, il conto, per favore.', exampleTranslation: '服務生，請幫我結帳。' },
                    en: { meaning: 'The bill, please', example: 'Cameriere, il conto, per favore.', exampleTranslation: 'Waiter, the bill please.' },
                    es: { meaning: 'La cuenta, por favor', example: 'Cameriere, il conto, per favore.', exampleTranslation: 'Camarero, la cuenta por favor.' },
                    ja: { meaning: 'お会計をお願いします', example: 'Cameriere, il conto, per favore.', exampleTranslation: 'ウェイターさん、お会計をお願いします。' },
                    ko: { meaning: '계산서 부탁합니다', example: 'Cameriere, il conto, per favore.', exampleTranslation: '웨이터, 여기 계산서 좀 주세요.' }
                }
            },
            {
                word: 'Buono',
                phonetic: 'BWOH-noh',
                translations: {
                    zh: { meaning: '好吃 / 好的', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: '這款瑪格麗特比薩非常好吃！' },
                    en: { meaning: 'Good / Tasty', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: 'This Margherita pizza is very tasty!' },
                    es: { meaning: 'Bueno / Sabroso', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: '¡Esta pizza Margherita es muy buena!' },
                    ja: { meaning: '美味しい / 良い', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: 'このマルゲリータピザはとても美味しいです！' },
                    ko: { meaning: '맛있는 / 좋은', example: 'Questa pizza Margherita è molto buona!', exampleTranslation: '이 마르게리타 피자는 정말 맛있어요!' }
                }
            },
            {
                word: 'Acqua',
                phonetic: 'AHK-wah',
                translations: {
                    zh: { meaning: '水', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '請給我一瓶氣泡水。' },
                    en: { meaning: 'Water', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: 'A bottle of sparkling water, please.' },
                    es: { meaning: 'Agua', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: 'Una botella de agua con gas, por favor.' },
                    ja: { meaning: '水', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '炭酸水を一本お願いします。' },
                    ko: { meaning: '물', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '탄산수 한 병 주세요.' }
                }
            },
            {
                word: 'Salute!',
                phonetic: 'sah-LOO-teh',
                translations: {
                    zh: { meaning: '乾杯！ / 祝健康！', example: 'Cin cin, salute a tutti!', exampleTranslation: '親親（乾杯聲），祝大家健康！' },
                    en: { meaning: 'Cheers! / To your health!', example: 'Cin cin, salute a tutti!', exampleTranslation: 'Cheers! To everyone\'s health!' },
                    es: { meaning: '¡Salud! / ¡A su salud!', example: 'Cin cin, salute a tutti!', exampleTranslation: '¡Salud, salud para todos!' },
                    ja: { meaning: '乾杯！ / 健康を祝して！', example: 'Cin cin, salute a tutti!', exampleTranslation: 'チンチン（乾杯）、みんなの健康に乾杯！' },
                    ko: { meaning: '건배! / 건강을 위해!', example: 'Cin cin, salute a tutti!', exampleTranslation: '짠! 모두의 건강을 위해!' }
                }
            },
            {
                word: 'Il menù',
                phonetic: 'eel meh-NOO',
                translations: {
                    zh: { meaning: '菜單', example: 'Posso ordinare? Vorrei vedere il menù.', exampleTranslation: '我可以點餐嗎？我想看一下菜單。' },
                    en: { meaning: 'The menu', example: 'Posso ordinare? Vorrei vedere il menù.', exampleTranslation: 'Can I order? I would like to see the menu.' },
                    es: { meaning: 'El menú', example: 'Posso ordinare? Vorrei vedere il menù.', exampleTranslation: '¿Puedo pedir? Me gustaría ver el menú.' },
                    ja: { meaning: 'メニュー', example: 'Posso ordinare? Vorrei vedere il menù.', exampleTranslation: '注文してもいいですか？メニューを見せてください。' },
                    ko: { meaning: '메뉴판', example: 'Posso ordinare? Vorrei vedere il menù.', exampleTranslation: '주문해도 될까요? 메뉴판을 보고 싶어요.' }
                }
            },
            {
                word: 'Delizioso',
                phonetic: 'deh-lee-tsYOH-zoh',
                translations: {
                    zh: { meaning: '美味的', example: 'Questo tiramisù è delizioso!', exampleTranslation: '這個提拉米蘇太美味了！' },
                    en: { meaning: 'Delicious', example: 'Questo tiramisù è delizioso!', exampleTranslation: 'This tiramisu is delicious!' },
                    es: { meaning: 'Delicioso', example: 'Questo tiramisù è delizioso!', exampleTranslation: '¡Este tiramisú es delicioso!' },
                    ja: { meaning: 'とても美味しい', example: 'Questo tiramisù è delizioso!', exampleTranslation: 'このティラミスは美味です！' },
                    ko: { meaning: '아주 맛있는', example: 'Questo tiramisù è delizioso!', exampleTranslation: '이 티라미수는 너무 맛있어요!' }
                }
            }
        ]
    };

    // UI Translation mappings
    const uiTranslations = {
        zh: {
            resTitleWeb: '<i class="fas fa-external-link-alt"></i> 義大利文推薦學習網站',
            resDescWr: '全球最受歡迎的義大利文字典，提供詳細的變位表與詞彙用法討論區。',
            resDescCollins: '優質的英義雙語字典，內附清晰的單字原生真人發音。',
            resDescTreccani: '義大利國家百科全書官方詞典，最權威的義義字典（適合中高級學者）。',
            resTitleYt: '<i class="fab fa-youtube"></i> 推薦 YouTube 學習頻道',
            resDescLucrezia: '最受歡迎的義大利文網紅！發音標準，包含豐富的生活 Vlogs 與文法教學。',
            resDescEasy: '街頭街坊實測學習！提供雙語字幕，帶您學習義大利人日常最真實的對話與語速。',
            resDescEasyItaly: '主持人講英文十分風趣，透過科學與邏輯方法拆解義大利文的結構，非常適合完全零基礎。',
            resTitleApp: '<i class="fas fa-mobile-alt"></i> 推薦實用 App',
            appDescDuo: '每天 5 分鐘闖關式遊戲化學習，最適合建立基礎習慣。',
            appDescMem: '利用原生短片加深字彙記憶，提供最道地的當地人用語。',
            appDescAnki: '使用間隔重複系統 (SRS) 演算法，適合高效率背單字。',
            wordLabel: '單字',
            sentenceLabel: '例句',
            navGreetings: '日常問候',
            navPhrases: '實用情境',
            navDining: '飲食餐飲',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 語速: ',
            langLabel: '<i class="fas fa-globe"></i> 母語: '
        },
        en: {
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
            navGreetings: 'Greetings',
            navPhrases: 'Daily Phrases',
            navDining: 'Food & Dining',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Speed: ',
            langLabel: '<i class="fas fa-globe"></i> Native: '
        },
        es: {
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
            navGreetings: 'Saludos',
            navPhrases: 'Frases comunes',
            navDining: 'Comida y Cena',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> Vel: ',
            langLabel: '<i class="fas fa-globe"></i> Materno: '
        },
        ja: {
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
            navGreetings: '日常の挨拶',
            navPhrases: '実用表現',
            navDining: '飲食・グルメ',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 速度: ',
            langLabel: '<i class="fas fa-globe"></i> 母国語: '
        },
        ko: {
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
            navGreetings: '인사말',
            navPhrases: '유용한 대화',
            navDining: '식사 & 식당',
            rateLabel: '<i class="fas fa-tachometer-alt"></i> 속도: ',
            langLabel: '<i class="fas fa-globe"></i> 모국어: '
        }
    };

    let currentItalianCategory = 'greetings';
    let selectedNativeLanguage = 'zh';

    const vocabDisplay = document.getElementById('vocab-display');
    const rateSlider = document.getElementById('voice-rate');
    const rateVal = document.getElementById('rate-val');
    const nativeLangSelect = document.getElementById('native-lang');
    const italianTabs = document.querySelectorAll('.btn-tab');

    // Speech synthesis function
    const speakItalian = (text) => {
        if ('speechSynthesis' in window) {
            // Cancel current speech if speaking
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
            // Get translation block based on selected mother tongue, fall back to english
            const translation = item.translations[selectedNativeLanguage] || item.translations['en'];

            const card = document.createElement('div');
            card.className = 'vocab-card';
            card.innerHTML = `
                <div class="vocab-word-info">
                    <h3>
                        ${item.word}
                        <span class="phonetic">/ ${item.phonetic} /</span>
                    </h3>
                    <div class="meaning">${translation.meaning}</div>
                    <div class="example">
                        <i class="fas fa-quote-left" style="font-size: 0.7rem; opacity: 0.5; margin-right: 0.3rem;"></i>
                        <strong>${translation.example}</strong>
                    </div>
                    <div class="example-translation">${translation.exampleTranslation}</div>
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

        // Categories tabs text
        const tabs = document.querySelectorAll('.btn-tab');
        if (tabs.length >= 3) {
            tabs[0].innerText = ui.navGreetings;
            tabs[1].innerText = ui.navPhrases;
            tabs[2].innerText = ui.navDining;
        }

        // Labels in control bar
        const rateLabel = document.querySelector('.voice-selection-bar label');
        if (rateLabel) rateLabel.innerHTML = ui.rateLabel;
        const langLabel = document.querySelector('.lang-selector-wrapper label');
        if (langLabel) langLabel.innerHTML = ui.langLabel;

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

    // Mother Tongue Dropdown listener
    if (nativeLangSelect) {
        nativeLangSelect.addEventListener('change', (e) => {
            selectedNativeLanguage = e.target.value;
            translateUITexts(selectedNativeLanguage);
            renderVocabList(currentItalianCategory);
        });
    }

    // Initialize list inside current category
    if (vocabDisplay) {
        renderVocabList('greetings');
    }
});
