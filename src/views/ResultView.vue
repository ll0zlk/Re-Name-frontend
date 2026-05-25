<template>
    <div class="pixel-container" v-if="nameInfo">
        <div class="pixel-screen">
            <div id="saving-image" class="result-card-pixel">
                <div class="pixel-corner tl"></div>
                <div class="pixel-corner tr"></div>
                
                <div class="header-section">
                    <h2 class="pixel-title">YOUR KOREAN NAME</h2>
                    <p class="pixel-subtitle-ko">당신의 새로운 이름</p>
                </div>

                <div class="name-display-area">
                    <p class="pixel-pronunciation">{{ nameInfo.pronunciation }}</p>
                    <div class="hanja-box">
                        <div class="hanja-list">
                            <div 
                                v-for="(char, index) in nameInfo.hanja.split('')" 
                                :key="index" 
                                class="hanja-item"
                            >
                                <h1 class="hanja-char">
                                    {{ char }}
                                </h1>
                                <div class="hanja-element-bar" :style="{ backgroundColor: getHanjaColor(index) }">
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="hangeul-main">{{ nameInfo.name }}</p>
                </div>

                <div class="details-list">
                    <div class="detail-item">
                        <span class="pixel-label">MEANING</span>
                        <div class="pixel-value-box primary">
                            <p class="meaning-en">{{ nameInfo.meaning_en }}</p>
                            <div class="meaning-divider"></div>
                            <p class="meaning-ko">{{ nameInfo.meaning }}</p>
                        </div>
                    </div>

                    <div v-if="nameInfo.extra" class="extra-comment-box">
                        <p class="comment-text-en">"A timeless name loved across generations."</p>
                        <p class="comment-text-ko">세대에 관계없이 꾸준히 사용되고 있는 이름이에요!</p>
                    </div>

                    <div v-if="nameInfo.name === '효진'" class="extra-comment-box">
                        <p class="comment-text-en">"Same name as the developer!"</p>
                        <p class="comment-text-ko">개발자와 같은 이름이에요!</p>
                    </div>
                
                <div class="detail-item">
                    <span class="pixel-label">MY FIVE ELEMENTS STATS</span>
                    <div class="gauge-container">
                        <div v-for="(val, key) in nameInfo.fiveElements" :key="key" class="gauge-row">
                            <span class="gauge-name">
                                <span class="name-text">{{ key.toUpperCase() }}</span>
                                
                                <span 
                                    v-if="isLowestElement(key)" 
                                    class="pixel-alert"
                                    @click.stop="showTooltip(key)"
                                >
                                    !
                                    <div v-if="activeTooltip === key" class="pixel-tooltip-box">
                                        <p class="tooltip-en">This is your most deficient element. Names with this element are highly recommended!</p>
                                    </div>
                                </span>
                            </span>
                            
                            <div class="gauge-bar-bg">
                                <div class="gauge-bar-fill" 
                                    :style="{ width: val + '%', backgroundColor: getElementColor(key) }">
                                </div>
                            </div>
                            <span class="gauge-val">{{ val }}%</span>
                        </div>
                    </div>
                </div>
            </div>
        <div class="pixel-corner bl"></div>
        <div class="pixel-corner br"></div>
    </div>

    <div class="button-group">
        <button class="btn-pixel-secondary" @click="$router.push('/')">RETRY</button>
        <button class="btn-pixel-primary" @click="saveAsImage">SAVE IMAGE</button>
    </div>

        <p class="pixel-footer">© Hyojin Lee</p>
        </div>
    </div>

    <div v-else class="pixel-container">
        <div class="pixel-screen">
            <div class="error-box">
                <p class="pixel-title">NO DATA</p>
                <button class="btn-pixel-primary" @click="$router.push('/')">GO HOME</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import html2canvas from 'html2canvas';

const nameInfo = ref(null);
const activeTooltip = ref(null);

const isLowestElement = (key) => {
    if (!nameInfo.value || !nameInfo.value.fiveElements) return false;
    const values = Object.values(nameInfo.value.fiveElements);
    const minVal = Math.min(...values);
    return nameInfo.value.fiveElements[key] === minVal;
};

const showTooltip = (key) => {
    if (activeTooltip.value === key) {
        activeTooltip.value = null;
    } else {
        activeTooltip.value = key;
    }
};

const closeTooltipGlobal = () => {
    activeTooltip.value = null;
};

onMounted(() => {
    window.addEventListener('click', closeTooltipGlobal);
    
    if (history.state && history.state.resultData) {
        const data = history.state.resultData;
        console.log("전체 전달 데이터:", data);
        console.log("nameInfo 데이터:", data.nameInfo);

        const elementsArray = data.nameInfo.element ? data.nameInfo.element.split(',') : [];
        console.log("파싱된 오행 배열:", elementsArray);

        nameInfo.value = {
            ...data.nameInfo,
            fiveElements: data.fiveElements,
            elementsList: elementsArray
        };        
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeTooltipGlobal)
});

const getElementColor = (element) => {
    const colors = {
        wood: '#4CAF50', fire: '#FF5252', earth: '#FFD700', metal: '#B0BEC5', water: '#2196F3'
    };
    return colors[element.toLowerCase()] || '#000';
};

const elementMap = {
    '목': 'wood',
    '화': 'fire',
    '토': 'earth',
    '금': 'metal',
    '수': 'water'
};

const getHanjaElementName = (index) => {
    if (!nameInfo.value.elementsList || !nameInfo.value.elementsList[index]) return '';
    return nameInfo.value.elementsList[index];
};

const getHanjaColor = (index) => {
    const elementKo = getHanjaElementName(index);
    const elementEn = elementMap[elementKo];
    if (elementEn) {
        return getElementColor(elementEn);
    }
    return '#000';
};

const saveAsImage = () => {
    const target = document.getElementById('saving-image');
    html2canvas(target, {
        backgroundColor: '#efead8',
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-korean-name-is.png';
        link.href = canvas.toDataURL();
        link.click();
    });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Pixelify+Sans:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

.pixel-container {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #bdb595;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.pixel-screen {
    position: relative;
    width: 100%;
    background-color: #efead8;
    border: 8px solid #000;
    box-shadow: 0 0 0 4px #fff inset, 10px 10px 0px rgba(0,0,0,0.2);
    padding: 60px 20px 30px;
    text-align: center;
}

.result-card-pixel {
    position: relative;
    background-color: #fdfcf7;
    border: 4px solid #000;
    padding: 40px 20px;
    margin-bottom: 30px;
    box-shadow: 8px 8px 0px rgba(0,0,0,0.1);
}

.pixel-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 4px solid #a64452;
}
.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

.pixel-title {
    font-family: 'Jersey 10';
    font-size: 2rem;
    color: #000;
    margin: 0;
}

.pixel-subtitle-ko {
    font-family: 'Noto Sans KR';
    font-size: 0.75rem;
    color: #a64452;
    font-weight: bold;
}

.name-display-area { margin: 25px 0; }

.pixel-pronunciation {
    font-family: 'Jersey 10';
    font-size: 1.1rem;
    color: #938a67;
    letter-spacing: 4px;
}

.hanja-box {
    margin: 10px 0;
    display: flex;
    justify-content: center;
}

.hanja-list {
    display: flex;
    gap: 0px;
    justify-content: center;
}

.hanja-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.hanja-char {
    font-family: 'Noto Serif KR';
    font-size: 2.8rem;
    font-weight: 900;
    margin: 0;
    line-height: 1.1;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.05);
}

.hanja-element-bar {
    width: 36px;
    height: 3px;
}

.hangeul-main {
    font-family: 'Noto Serif KR', serif;
    font-size: 1.2rem;
    color: #333;
}

.details-list { text-align: left; }

.pixel-label {
    display: block;
    font-family: 'Jersey 10';
    font-size: 1.1rem;
    color: #a64452;
    margin-bottom: 5px;
    margin-top: 20px;
}

.pixel-value-box {
    background: #fff;
    border: 3px solid #000;
    padding: 10px;
    font-family: 'Noto Sans KR';
    font-size: 0.8rem;
    box-shadow: 4px 4px 0px #efead8;
    margin-bottom: 5px;
}

.meaning-en {
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 0.8rem;
    color: #000;
    margin-bottom: 8px;
    line-height: 1.2;
}

.meaning-divider {
    border-top: 1px dashed #ccc;
    margin: 8px 0;
}

.meaning-ko {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.65rem;
    color: #666;
    margin: 0;
}

.pixel-value-box.primary {
    border-left: 8px solid #a64452;
    padding: 12px;
}

.extra-comment-box {
    padding: 10px;
    margin-bottom: 15px;
    text-align: center;

}

.comment-text-en {
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 0.75rem;
    color: #a64452;
    margin-bottom: 4px;
    font-weight: bold;
}

.comment-text-ko {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.65rem;
    color: #888;
    margin: 0;
}

.gauge-container { 
    display: flex; 
    flex-direction: column; 
    gap: 5px; 
}

.gauge-row { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    position: relative;
}

.gauge-name { 
    font-family: 'Jersey 10' !important; 
    width: 75px; 
    font-size: 0.9rem; 
    color: #000; 
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
}

.gauge-bar-bg { 
    flex: 1; 
    height: 12px; 
    background: #efead8; 
    border: 2px solid #000; 
    position: relative; 
}

.gauge-bar-fill { 
    height: 100%; 
    transition: width 1s ease-out; 
}

.gauge-val { 
    font-family: 'Jersey 10'; 
    width: 15px; font-size: 1rem; 
    text-align: right; 
}

.pixel-alert {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    background: #a64452;
    color: #fff;
    font-family: 'Jersey 10', sans-serif;
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    margin-left: 4px;
    vertical-align: middle;
    border: 2px solid #000;
    box-shadow: 1px 1px 0px rgba(0,0,0,0.2);
    margin: 0;
}

.pixel-tooltip-box {
    position: absolute;
    bottom: 22px;
    left: 50%;
    transform: translateX(-14%);
    width: 160px;
    background-color: rgba(255, 255, 255, 0.92);
    border: 3px solid #000;
    padding: 8px;
    z-index: 999;
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.15);
    text-align: left;
    pointer-events: none;
}

.pixel-tooltip-box::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 15px;
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: #000 transparent;
    display: block;
    width: 0;
}

.tooltip-en {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.65rem;
    color: #000;
    margin: 0;
    word-break: keep-all;
}

.button-group { display: flex; gap: 10px; margin-top: 20px; }
.btn-pixel-primary, .btn-pixel-secondary {
    flex: 1;
    padding: 7px;
    font-family: 'Jersey 10';
    font-size: 1.8rem;
    border: none;
    cursor: pointer;
    box-shadow: -4px 0 0 0 #000, 4px 0 0 0 #000, 0 -4px 0 0 #000, 0 4px 0 0 #000;
}
.btn-pixel-primary { background-color: #a64452; color: #fff; }
.btn-pixel-secondary { background-color: #fff; color: #000; }

.pixel-footer { margin-top: 30px; font-family: 'Jersey 10'; font-size: 0.9rem; color: #938a67; }
</style>