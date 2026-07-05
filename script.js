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
    // 7. Tool: Italian Learning Assistant
    // ==========================================
    // Data definition for Italian vocabularies
    const italianVocabData = {
        greetings: [
            { word: 'Buongiorno', phonetic: 'bwohn-JOHR-noh', meaning: '早安 / 您好 (正式)', example: 'Buongiorno, signora. Come sta?', exampleTranslation: '女士早安，您好嗎？' },
            { word: 'Ciao', phonetic: 'CHAH-oh', meaning: '你好 / 再見 (非正式)', example: 'Ciao Luca! Come va?', exampleTranslation: '嗨盧卡！最近怎麼樣？' },
            { word: 'Grazie', phonetic: 'GRAHT-tsyeh', meaning: '謝謝', example: 'Grazie mille per l\'ospitalità.', exampleTranslation: '非常感謝您的熱情款待。' },
            { word: 'Prego', phonetic: 'PREH-goh', meaning: '不客氣 / 請', example: 'Prego, si accomodi pure.', exampleTranslation: '不客氣，請隨意坐。' },
            { word: 'Per favore', phonetic: 'pehr fah-VOH-reh', meaning: '請 (Please)', example: 'Un bicchiere d\'acqua, per favore.', exampleTranslation: '請給我一杯水。' },
            { word: 'Arrivederci', phonetic: 'ahr-ree-veh-DEHR-chee', meaning: '再見 (正式)', example: 'Grazie della cena, arrivederci.', exampleTranslation: '感謝招待，再見。' }
        ],
        phrases: [
            { word: 'Come stai?', phonetic: 'KOH-meh STAH-ee', meaning: '你好嗎？', example: 'Ciao! Come stai? Tutto bene?', exampleTranslation: '嗨！你好嗎？一切都好嗎？' },
            { word: 'Dov\'è il bagno?', phonetic: 'doh-VEH eel BAHN-yoh', meaning: '廁所在哪裡？', example: 'Scusi, dov\'è il bagno in questo ristorante?', exampleTranslation: '不好意思，請問這家餐廳的廁所在哪裡？' },
            { word: 'Quanto costa?', phonetic: 'KWAHN-toh KOHS-tah', meaning: '這多少錢？', example: 'Quanto costa questo souvenir?', exampleTranslation: '這個紀念品多少錢？' },
            { word: 'Parla inglese?', phonetic: 'PAHR-lah een-GLEH-zeh', meaning: '您會說英文嗎？', example: 'Non parlo bene l\'italiano. Parla inglese?', exampleTranslation: '我義大利文說得不好。您會說英文嗎？' },
            { word: 'Mi dispiace', phonetic: 'mee dees-PYAH-cheh', meaning: '對不起 / 遺憾', example: 'Mi dispiace, non posso venire stasera.', exampleTranslation: '很抱歉，我今晚無法過來。' },
            { word: 'Non capisco', phonetic: 'nohn kah-PEES-koh', meaning: '我不懂 / 我不明白', example: 'Può ripetere lentamente? Non capisco.', exampleTranslation: '您可以說慢一點嗎？我不明白。' }
        ],
        dining: [
            { word: 'Il conto, per favore', phonetic: 'eel KOHN-toh pehr fah-VOH-reh', meaning: '請結帳', example: 'Cameriere, il conto, per favore.', exampleTranslation: '服務生，請幫我結帳。' },
            { word: 'Buono', phonetic: 'BWOH-noh', meaning: '好吃的 / 好的', example: 'Questa pasta al pomodoro è molto buona!', exampleTranslation: '這盤番茄麵非常好吃！' },
            { word: 'Acqua', phonetic: 'AHK-wah', meaning: '水', example: 'Una bottiglia di acqua frizzante, per favore.', exampleTranslation: '請給我一瓶氣泡水。' },
            { word: 'Salute!', phonetic: 'sah-LOO-teh', meaning: '乾杯！ / 祝健康！', example: 'Brindiamo al tuo successo. Salute!', exampleTranslation: '為你的成功乾杯。祝你健康！' },
            { word: 'Il menù', phonetic: 'eel meh-NOO', meaning: '菜單', example: 'Posso ordinare? Vorrei vedere il menù.', exampleTranslation: '我可以點餐嗎？我想看菜單。' },
            { word: 'Delizioso', phonetic: 'deh-lee-tsYOH-zoh', meaning: '美味的', example: 'Questo tiramisù è delizioso!', exampleTranslation: '這個提拉米蘇太美味了！' }
        ]
    };

    let currentItalianCategory = 'greetings';
    const vocabDisplay = document.getElementById('vocab-display');
    const rateSlider = document.getElementById('voice-rate');
    const rateVal = document.getElementById('rate-val');
    const italianTabs = document.querySelectorAll('.btn-tab');

    // Speech synthesis function
    const speakItalian = (text) => {
        if ('speechSynthesis' in window) {
            // Cancel current speech if speaking
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'it-IT';
            utterance.rate = rateSlider ? parseFloat(rateSlider.value) : 1;
            
            // Log voice list info for debugging or fallbacks
            window.speechSynthesis.speak(utterance);
        } else {
            alert('您的瀏覽器不支援發音功能。建議使用 Chrome 或 Safari 瀏覽器。');
        }
    };

    // Render Vocabulary List
    const renderVocabList = (category) => {
        if (!vocabDisplay) return;
        vocabDisplay.innerHTML = '';
        currentItalianCategory = category;

        const data = italianVocabData[category];
        if (!data) return;

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'vocab-card';
            card.innerHTML = `
                <div class="vocab-word-info">
                    <h3>
                        ${item.word}
                        <span class="phonetic">/ ${item.phonetic} /</span>
                    </h3>
                    <div class="meaning">${item.meaning}</div>
                    <div class="example">
                        <i class="fas fa-quote-left" style="font-size: 0.7rem; opacity: 0.5; margin-right: 0.3rem;"></i>
                        <strong>${item.example}</strong>
                    </div>
                    <div class="example-translation">${item.exampleTranslation}</div>
                </div>
                <div class="play-btn-group">
                    <button class="play-btn btn-play-word" aria-label="播放單字發音">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <span class="play-label">單字</span>
                    <button class="play-btn btn-play-sentence" aria-label="播放例句發音">
                        <i class="fas fa-comment-dots"></i>
                    </button>
                    <span class="play-label" style="font-size: 0.6rem;">例句</span>
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
                speakItalian(item.example);
            });

            vocabDisplay.appendChild(card);
        });
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

    // Initialize list inside current category
    if (vocabDisplay) {
        renderVocabList('greetings');
    }
});
