<template>
    <div class="pixel-container" v-if="nameInfo">
        <div class="pixel-screen">
            <button class="pixel-back-btn" @click="$router.push('/input')">◀</button>

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
                        <h1 class="hanja-main">{{ nameInfo.hanja }}</h1>
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

                    <div v-if="nameInfo.extra === '1' || nameInfo.extra === 1 || nameInfo.extra === true" class="extra-comment-box">
                        <p class="comment-text">세대에 관계없이 꾸준히 사용되고 있는 이름이에요!</p>
                    </div>
                
                <div class="detail-item">
                    <span class="pixel-label">MY SAJU STATS</span>
                    <div class="gauge-container">
                        <div v-for="(val, key) in nameInfo.fiveElements" :key="key" class="gauge-row">
                            <span class="gauge-name">{{ key.toUpperCase() }}</span>
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
import { onMounted, ref } from 'vue';
import html2canvas from 'html2canvas';

const nameInfo = ref(null);

onMounted(() => {
    if (history.state && history.state.resultData) {
        const data = history.state.resultData;
        
        nameInfo.value = {
            ...data.nameInfo,
            fiveElements: data.fiveElements
        };        
    }
});

const getElementColor = (element) => {
    const colors = {
        wood: '#4CAF50', fire: '#FF5252', earth: '#FFD700', metal: '#B0BEC5', water: '#2196F3'
    };
    return colors[element.toLowerCase()] || '#000';
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

.hanja-main {
    font-family: 'Noto Serif KR';
    font-size: 2.6rem;
    font-weight: 900;
    color: #000;
    margin: 5px 0;
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
    padding: 12px;
    margin-bottom: 10px;
    text-align: center;
}

.comment-text {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.7rem;
    color: #666;
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
}

.gauge-name { 
    font-family: 'Jersey 10'; 
    width: 50px; 
    font-size: 0.9rem; 
    color: #000; 
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

.pixel-back-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 30px;
    height: 30px;
    background: #fff;
    border: 3px solid #000;
    font-family: 'Jersey 10';
    cursor: pointer;
    box-shadow: 3px 3px 0 #000;
}

.pixel-footer { margin-top: 30px; font-family: 'Jersey 10'; font-size: 0.9rem; color: #938a67; }
</style>