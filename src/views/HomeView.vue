<template>
  <div class="pixel-container">
    <div class="pixel-screen">
      <button class="pixel-info-btn" @click="showInfo = true" title="Info">
        ?
      </button>

      <div class="content">
        <p class="pixel-sub">GET YOUR KOREAN NAME</p>
        <h1 class="pixel-logo">Is that my name?</h1>
        
        <div class="pixel-icon">🏮</div>

        <div class="pixel-actions">
          <button class="btn-pixel-start" @click="$router.push('/input')">
            START
          </button>
        </div>
      </div>
      
      <p class="pixel-footer">© Hyojin Lee</p>

      <div v-if="showInfo" class="pixel-modal-overlay" @click.self="showInfo = false">
        <div class="pixel-modal">
          <div class="modal-header">
            <span class="modal-title">INFORMATION</span>
            <button class="btn-close" @click="showInfo = false">X</button>
          </div>
          <div class="modal-body">
            <p class="desc-en">
              This website recommends a Korean name based on the Five Elements, one of the traditional factors considered when naming in Korea. <br><br>
              The Five Elements are determined by your date and time of birth. 
              While there are various methods for naming using the Five Elements, this site focuses on complementing the elements you lack through your name. <br><br>
              Please enjoy this service for fun, and we hope you have a pleasant experience! :)
            </p>
            <div class="divider"></div>
            <p class="desc-ko">
              외국인들에게 오행을 바탕으로 한국 이름을 추천해주는 사이트입니다.
              한국인 분들은 이미 자신에게 잘 어울리는 이름을 가지고 계시니,
              가볍게 재미로 즐겨주시면 감사하겠습니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showInfo = ref(false);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Pixelify+Sans:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Noto+Sans+KR:wght@100..900&display=swap');

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
  height: 630px;
  background-color: #efead8;
  border: 8px solid #000;
  box-shadow: 0 0 0 4px #fff inset, 10px 10px 0px rgba(0,0,0,0.2);
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pixel-info-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 3px solid #000;
  font-family: 'Jersey 10';
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 0px #000;
  transition: all 0.1s;
  z-index: 10;
}

.pixel-info-btn:hover {
  background-color: #bdb595;
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #000;
}

.pixel-info-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.pixel-sub {
  font-family: 'Jersey 10';
  font-size: 1.2rem;
  color: #a64452;
  margin-top: 50px;
  letter-spacing: 2px;
}

.pixel-logo {
  font-family: 'Jersey 10';
  font-size: clamp(2rem, 12vw, 3.5rem);
  color: #000;
  margin: 10px 0 70px 0;
  line-height: 1;
}

.pixel-icon {
  font-size: 4rem;
  margin: 40px 0;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.btn-pixel-start {
  margin-top: 30px;
  background-color: #a64452;
  color: #fff;
  padding: 10px 50px;
  font-size: 2rem;
  font-family: 'Jersey 10';
  border: none;
  cursor: pointer;
  box-shadow: -4px 0 0 0 #000, 4px 0 0 0 #000, 0 -4px 0 0 #000, 0 4px 0 0 #000;
  position: relative;
}

.btn-pixel-start:hover { background-color: #8c3641; }

.pixel-modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.pixel-modal {
  background: #efead8;
  border: 6px solid #000;
  width: 100%;
  max-width: 420px;
  box-shadow: 8px 8px 0 #000;
}

.modal-header {
  background: #000;
  color: #fff;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title { font-family: 'Jersey 10'; font-size: 1.2rem; }

.btn-close {
  background: #a64452;
  color: #fff;
  border: none;
  padding: 2px 10px;
  cursor: pointer;
  font-family: 'Jersey 10';
}

.modal-body {
  padding: 20px;
  text-align: left;
}

.desc-en {
  font-family: 'Jersey 10';
  font-size: 1.1rem;
  line-height: 1.2;
  color: #333;
  margin-bottom: 15px;
}

.desc-ko {
  font-family: 'Noto Sans Korean';
  font-size: 0.85rem;
  line-height: 1.6;
  color: #555;
  word-break: keep-all;
}

.divider {
  height: 2px;
  background: #000;
  margin: 15px 0;
  opacity: 0.1;
}

.pixel-footer {
  margin-top: auto;
  font-family: 'Jersey 10';
  font-size: 0.9rem;
  color: #938a67;
}

@media (max-width: 480px) {
  .pixel-logo {
    margin-bottom: 20px; 
    font-size: 2.2rem;
  }

  .pixel-icon {
    margin: 10px 0; 
    font-size: 3rem;
  }
  
  .pixel-sub {
    margin-top: 20px;
  }
}
</style>