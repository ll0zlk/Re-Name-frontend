<template>
    <div class="result-container" v-if="nameInfo">
        <div id="saving-image" class="result-card-wrapper">
        <div class="header-section">
            <span class="badge">추천 완료</span>
            <h2 class="title">당신을 위한 최고의 이름</h2>
        </div>

        <div class="name-card">
            <div class="card-top">
            <p class="pronunciation">{{ nameInfo.pronunciation }}</p>
            <h1 class="hanja">{{ nameInfo.hanja }}</h1>
            <p class="hangeul">{{ nameInfo.name }}</p>
            </div>

            <div class="card-divider">
            <div class="circle left"></div>
            <div class="line"></div>
            <div class="circle right"></div>
            </div>

            <div class="details">
            <div class="detail-item">
                <span class="label">의미</span>
                <p class="value primary">{{ nameInfo.meaning }}</p>
            </div>
            <div class="grid-details">
                <div class="detail-item">
                <span class="label">오행 요소</span>
                <p class="value">{{ nameInfo.element }}</p>
                </div>
                <div class="detail-item">
                <span class="label">세대 분류</span>
                <p class="value">{{ nameInfo.generation }}</p>
                </div>
            </div>
            <div v-if="nameInfo.extra" class="detail-item">
                <span class="label">비고</span>
                <p class="value text-muted">{{ nameInfo.extra }}</p>
            </div>
            </div>
        </div>
        </div>

        <div class="button-group">
        <button class="btn-home" @click="$router.push('/')">다시 분석하기</button>
        <button class="btn-share" @click="saveAsImage">이미지 저장</button>
        </div>
    </div>

    <div v-else class="error-container">
        <div class="error-card">
        <p>결과 데이터를 찾을 수 없습니다.</p>
        <button class="btn-retry" @click="$router.push('/')">입력창으로 이동</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import html2canvas from 'html2canvas';

const nameInfo = ref(null);

onMounted(() => {
    if (history.state && history.state.resultData) {
        nameInfo.value = history.state.resultData;
    }
});

const saveAsImage = () => {
    html2canvas(document.getElementById('saving-image'))
    .then(canvas => {
        const link = document.createElement('a')
        link.download = 'sajuro.png'
        link.href = canvas.toDataURL()
        link.click()
    })
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&display=swap');

.result-container {
    max-width: 450px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #f8f9fd;
    min-height: 100vh;
}

.header-section {
    text-align: center;
    margin-bottom: 30px;
}

.badge {
    background: #6c5ce7;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.title {
    font-size: 1.4rem;
    color: #2d3436;
    margin-top: 10px;
}

.name-card {
    background: white;
    border-radius: 24px;
    padding: 40px 25px;
    box-shadow: 0 15px 35px rgba(108, 92, 231, 0.1);
    position: relative;
    overflow: hidden;
}

.card-top {
    text-align: center;
    margin-bottom: 20px;
}

.pronunciation {
    color: #a29bfe;
    font-size: 1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 5px;
}

.hanja {
    font-family: 'Noto Serif KR', serif;
    font-size: 3.5rem;
    color: #2d3436;
    margin: 0;
}

.hangeul {
    font-size: 1.2rem;
    color: #636e72;
    margin-top: 5px;
}

.card-divider {
    display: flex;
    align-items: center;
    margin: 30px -25px;
}

.line {
    flex: 1;
    height: 1px;
    border-top: 2px dashed #f1f2f6;
}

.circle {
    width: 20px;
    height: 20px;
    background: #f8f9fd;
    border-radius: 50%;
}
.circle.left { margin-left: -10px; }
.circle.right { margin-right: -10px; }

.details {
    text-align: left;
}

.detail-item {
    margin-bottom: 20px;
}

.label {
    display: block;
    font-size: 0.8rem;
    color: #b2bec3;
    margin-bottom: 6px;
}

.value {
    font-size: 1rem;
    color: #2d3436;
    line-height: 1.5;
    margin: 0;
    font-weight: 500;
}

.value.primary {
    color: #6c5ce7;
    font-weight: bold;
}

.grid-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.button-group {
    margin-top: 30px;
    display: flex;
    gap: 12px;
}

.btn-home, .btn-share {
    flex: 1;
    padding: 16px;
    border-radius: 14px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
    border: none;
}

.btn-home {
    background: #f1f2f6;
    color: #636e72;
}

.btn-share {
    background: #6c5ce7;
    color: white;
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.2);
}

.btn-share:hover {
    transform: translateY(-2px);
    background: #5849d4;
}

.error-container {
    padding: 100px 20px;
    text-align: center;
}

.error-card {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}
</style>