// ============================================================
//  ПАРСЕР ПРИМЕРОВ В СТОЛБИК
// ============================================================

async function renderPuzzle(container, puzzleStr, delimage) {
    if (!puzzleStr || puzzleStr.trim() === '') {
        container.innerHTML = '<div style="color:#8a9aaa;">Нет примеров</div>';
        return;
    }
    
    const parts = puzzleStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    container.innerHTML = '';

    // Проверяем, есть ли деление
    const hasDivision = parts.some(p => p.includes('/'));

    // Если есть деление и есть картинка — показываем её
    if (hasDivision && delimage) {
        const div = document.createElement('div');
        div.className = 'puzzle-item';
        div.style.cssText = 'width:100%;max-width:100%;padding:0;background:none;box-shadow:none;';
        div.innerHTML = `
            <div style="width:100%;">
                <img src="${delimage}" alt="Решение деления" style="width:100%;max-width:500px;border-radius:12px;border:2px solid #e8edf3;display:block;">
            </div>
        `;
        container.appendChild(div);
        
        // Остальные примеры (без деления) показываем обычным способом
        const nonDivisionParts = parts.filter(p => !p.includes('/'));
        for (let part of nonDivisionParts) {
            const match = part.match(/^(\d+)\s*([+\-*/])\s*(\d+)$/);
            if (!match) {
                const div2 = document.createElement('div');
                div2.className = 'puzzle-item';
                div2.textContent = part;
                container.appendChild(div2);
                continue;
            }
            
            const a = parseInt(match[1]);
            const op = match[2];
            const b = parseInt(match[3]);
            let res;
            switch (op) {
                case '+': res = a + b; break;
                case '-': res = a - b; break;
                case '*': res = a * b; break;
                case '/': res = a / b; break;
            }
            
            // Умножение в столбик
            if (op === '*') {
                const div2 = document.createElement('div');
                div2.className = 'puzzle-item';
                const strA = String(a);
                const strB = String(b);
                const maxLen = Math.max(strA.length, strB.length) + 1;
                
                let html = '';
                html += strA.padStart(maxLen, ' ') + '\n';
                html += ('×' + strB).padStart(maxLen, ' ') + '\n';
                html += '─'.repeat(maxLen) + '\n';
                
                if (strB.length >= 2) {
                    const digits = strB.split('').reverse();
                    let shift = 0;
                    for (let d of digits) {
                        const digit = parseInt(d);
                        const partial = a * digit;
                        html += String(partial).padStart(maxLen - shift, ' ') + ' '.repeat(shift) + '\n';
                        shift++;
                    }
                    html += '─'.repeat(maxLen) + '\n';
                }
                
                html += String(res).padStart(maxLen, ' ');
                
                div2.innerHTML = `<pre style="margin:0;font-family:'Courier New',monospace;font-size:18px;font-weight:600;line-height:1.3;">${html}</pre>`;
                container.appendChild(div2);
                continue;
            }
            
            // Сложение/вычитание в столбик
            if (op === '+' || op === '-') {
                const div2 = document.createElement('div');
                div2.className = 'puzzle-item';
                const strA = String(a);
                const strB = String(b);
                const maxLen = Math.max(strA.length, strB.length) + 1;
                const opSymbol = op === '+' ? '+' : '−';
                
                let html = '';
                html += strA.padStart(maxLen, ' ') + '\n';
                html += (opSymbol + strB).padStart(maxLen, ' ') + '\n';
                html += '─'.repeat(maxLen) + '\n';
                html += String(res).padStart(maxLen, ' ');
                
                div2.innerHTML = `<pre style="margin:0;font-family:'Courier New',monospace;font-size:18px;font-weight:600;line-height:1.3;">${html}</pre>`;
                container.appendChild(div2);
                continue;
            }
        }
        return;
    }

    // Если деления нет — показываем всё как обычно
    for (let part of parts) {
        const match = part.match(/^(\d+)\s*([+\-*/])\s*(\d+)$/);
        if (!match) {
            const div = document.createElement('div');
            div.className = 'puzzle-item';
            div.textContent = part;
            container.appendChild(div);
            continue;
        }

        const a = parseInt(match[1]);
        const op = match[2];
        const b = parseInt(match[3]);
        let res;
        switch (op) {
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '*': res = a * b; break;
            case '/': res = a / b; break;
        }

        // --- УМНОЖЕНИЕ В СТОЛБИК ---
        if (op === '*') {
            const div = document.createElement('div');
            div.className = 'puzzle-item';
            const strA = String(a);
            const strB = String(b);
            const maxLen = Math.max(strA.length, strB.length) + 1;
            
            let html = '';
            html += strA.padStart(maxLen, ' ') + '\n';
            html += ('×' + strB).padStart(maxLen, ' ') + '\n';
            html += '─'.repeat(maxLen) + '\n';
            
            if (strB.length >= 2) {
                const digits = strB.split('').reverse();
                let shift = 0;
                for (let d of digits) {
                    const digit = parseInt(d);
                    const partial = a * digit;
                    html += String(partial).padStart(maxLen - shift, ' ') + ' '.repeat(shift) + '\n';
                    shift++;
                }
                html += '─'.repeat(maxLen) + '\n';
            }
            
            html += String(res).padStart(maxLen, ' ');
            
            div.innerHTML = `<pre style="margin:0;font-family:'Courier New',monospace;font-size:18px;font-weight:600;line-height:1.3;">${html}</pre>`;
            container.appendChild(div);
            continue;
        }

        // --- ДЕЛЕНИЕ (если нет delimage) ---
        if (op === '/') {
            const div = document.createElement('div');
            div.className = 'puzzle-item';
            const quotient = Math.floor(a / b);
            const remainder = a % b;
            const remStr = remainder > 0 ? `ост. ${remainder}` : '';
            
            div.innerHTML = `
                <div style="font-family:'Courier New',monospace;font-size:20px;font-weight:600;line-height:1.6;min-width:120px;">
                    <div style="display:flex;align-items:center;gap:2px;">
                        <span style="font-weight:700;font-size:18px;">${b}</span>
                        <span style="font-size:28px;font-weight:300;margin:0 2px;">∟</span>
                        <span style="border-bottom:3px solid #1a2a3a;padding:0 6px 2px 0;min-width:50px;display:inline-block;font-size:20px;">${a}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;padding-left:${String(b).length * 12 + 12}px;margin-top:-2px;">
                        <span style="border-top:3px solid #1a2a3a;padding-top:2px;min-width:40px;display:inline-block;text-align:center;font-size:20px;">${quotient}</span>
                        ${remStr ? `<span style="color:#1a6a3a;font-weight:700;font-size:16px;">${remStr}</span>` : ''}
                    </div>
                </div>
            `;
            container.appendChild(div);
            continue;
        }

        // --- СЛОЖЕНИЕ/ВЫЧИТАНИЕ В СТОЛБИК ---
        const div = document.createElement('div');
        div.className = 'puzzle-item';
        const strA = String(a);
        const strB = String(b);
        const maxLen = Math.max(strA.length, strB.length) + 1;
        const opSymbol = op === '+' ? '+' : '−';
        
        let html = '';
        html += strA.padStart(maxLen, ' ') + '\n';
        html += (opSymbol + strB).padStart(maxLen, ' ') + '\n';
        html += '─'.repeat(maxLen) + '\n';
        html += String(res).padStart(maxLen, ' ');
        
        div.innerHTML = `<pre style="margin:0;font-family:'Courier New',monospace;font-size:18px;font-weight:600;line-height:1.3;">${html}</pre>`;
        container.appendChild(div);
    }
}

// ============================================================
//  ЗАГРУЗКА JSON
// ============================================================

async function loadYAML(date) {
    const url = `/Items/Match/${date}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Файл не найден');
    return await response.json();
}

// ============================================================
//  КАЛЬКУЛЯТОР (ПРОСТО ОТВЕТ)
// ============================================================

function calculateExpression(expr) {
    expr = expr.replace(/\s/g, '');
    
    if (!/^[\d+\-*/]+$/.test(expr)) {
        return { error: '❌ Можно использовать только + - * / и цифры' };
    }
    
    try {
        const result = Function('"use strict"; return (' + expr + ')')();
        if (!isFinite(result)) {
            return { error: '❌ Бесконечность или деление на ноль' };
        }
        return { expression: expr, result: result };
    } catch (e) {
        return { error: '❌ Некорректное выражение' };
    }
}

function renderCalculation(expr) {
    const result = calculateExpression(expr);
    const container = document.getElementById('calcResult');
    
    if (result.error) {
        container.innerHTML = `<div class="error">${result.error}</div>`;
        return;
    }
    
    container.innerHTML = `
        <div style="font-size:24px;font-weight:700;color:#1a3a5c;padding:20px;text-align:center;">
            ${result.expression} = <span style="color:#2d6a9f;">${result.result}</span>
        </div>
    `;
}