// ============================================================
//  ТОП-ПАНЕЛЬ (ВСТАВЛЯЕТСЯ НА ВСЕ СТРАНИЦЫ)
// ============================================================

function loadTopBar() {
    const topbarContainer = document.getElementById('topbar-container');
    if (!topbarContainer) return;

    const currentPath = window.location.pathname;
    const isGdzPage = currentPath.includes('/pages/') || currentPath.includes('/Match/');
    const basePath = isGdzPage ? '/gdz' : '/gdz';

    topbarContainer.innerHTML = `
        <div class="top-bar">
            <div class="logo">
                <img src="${basePath}/logo.png" alt="Логотип" class="logo-img">
                <span>5А</span> Класс
            </div>
            <div class="nav-links">
                <a href="${basePath}/" class="${currentPath === '/gdz/' || currentPath === '/gdz' ? 'active' : ''}">🏠 Главная</a>
                <a href="${basePath}/pages/?subject=Match" class="${currentPath.includes('Match') ? 'active' : ''}">📐 Математика</a>
                <a href="${basePath}/pages/?subject=Eng" class="${currentPath.includes('Eng') ? 'active' : ''}">🇬🇧 Английский</a>
                <a href="${basePath}/pages/?subject=Russia" class="${currentPath.includes('Russia') ? 'active' : ''}">🇷🇺 Русский</a>
                <a href="${basePath}/pages/?subject=Bio" class="${currentPath.includes('Bio') ? 'active' : ''}">🧬 Биология</a>
                <a href="${basePath}/pages/?subject=Geo" class="${currentPath.includes('Geo') ? 'active' : ''}">🌍 География</a>
                <a href="${basePath}/pages/?subject=History" class="${currentPath.includes('History') ? 'active' : ''}">📜 История</a>
                <a href="https://max.ru/join/RK0c3CptLFfg-gif9OvTAcxou3Rjwyg3PDBiwB_cHZw" target="_blank" class="max-link">📺 Канал MAX</a>
                <a href="https://max.ru/u/f9LHodD0cOJwtxTs5D6sIVjWs3DfQbwdr2NvNZ6BSya6U1-1Pv6eNlww0Ok" target="_blank" class="uploader-link">📤 Стать загрузчиком</a>
            </div>
            <button class="calc-toggle" onclick="openCalc()">🧮</button>
        </div>
    `;
}

// Загружаем топ-панель при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTopBar);
