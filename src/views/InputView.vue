<template>
  <div class="pixel-container">
    <div class="pixel-screen">
      <button class="pixel-back-btn" @click="$router.push('/')">◀</button>

      <div class="form-card">
        <h2 class="pixel-title">ENTER INFO</h2>
        <p class="pixel-subtitle">분석을 위한 정보를 입력해주세요.</p>

        <div class="input-group">
          <label class="pixel-label">BIRTH DATE</label>
          <div class="birth-inputs">
            <input 
              v-model="year" 
              type="number" 
              oninput="javascript: if (this.value.length > 4) this.value = this.value.slice(0, 4);" 
              placeholder="YYYY" 
              class="pixel-input" 
            />
            <input 
              v-model="month" 
              type="number" 
              oninput="javascript: if (this.value.length > 2) this.value = this.value.slice(0, 2);" 
              placeholder="MM" 
              class="pixel-input" 
            />
            <input 
              v-model="day" 
              type="number" 
              oninput="javascript: if (this.value.length > 2) this.value = this.value.slice(0, 2);" 
              placeholder="DD" 
              class="pixel-input" 
            />
          </div>
        </div>

        <div class="input-group">
          <label class="pixel-label">BIRTH TIME</label>
          <div class="pixel-select-wrapper">
            <select v-model="branch" class="pixel-select">
              <option v-for="b in branches" :key="b.key" :value="b.key">
                {{ b.label }}
              </option>
            </select>
            <div class="pixel-arrow"></div>
          </div>
        </div>

        <div class="input-group">
          <label class="pixel-label">GENDER</label>
          <div class="gender-group">
            <label class="pixel-radio" :class="{ active: gender === '남성' }">
              <input type="radio" v-model="gender" value="남성" /> MALE
            </label>
            <label class="pixel-radio" :class="{ active: gender === '여성' }">
              <input type="radio" v-model="gender" value="여성" /> FEMALE
            </label>
          </div>
        </div>

        <div class="pixel-actions">
          <button class="submit-btn" @click="submit" :disabled="loading">
            {{ loading ? 'LOADING...' : 'ANALYZE' }}
          </button>
        </div>
      </div>

      <p class="pixel-footer">© Hyojin Lee</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const gender = ref('남성')
const year = ref('')
const month = ref('')
const day = ref('')
const branch = ref('')

const branches = [
  { label: 'Select your birth time', key: ''},
  { label: '子(자) 23:30 ~ 01:29', key: '자' },
  { label: '丑(축) 01:30 ~ 03:29', key: '축' },
  { label: '寅(인) 03:30 ~ 05:29', key: '인' },
  { label: '卯(묘) 05:30 ~ 07:29', key: '묘' },
  { label: '辰(진) 07:30 ~ 09:29', key: '진' },
  { label: '巳(사) 09:30 ~ 11:29', key: '사' },
  { label: '午(오) 11:30 ~ 13:29', key: '오' },
  { label: '未(미) 13:30 ~ 15:29', key: '미' },
  { label: '申(신) 15:30 ~ 17:29', key: '신' },
  { label: '酉(유) 17:30 ~ 19:29', key: '유' },
  { label: '戌(술) 19:30 ~ 21:29', key: '술' },
  { label: '亥(해) 21:30 ~ 23:29', key: '해' },
  { label: 'Unknown (시간 모름)', key: 'unknown' }
]

const branchHourMap = {
  자: '23:30', 축: '01:30', 인: '03:30', 묘: '05:30', 진: '07:30', 사: '10:30',
  오: '12:30', 미: '14:30', 신: '16:30', 유: '18:30', 술: '20:30', 해: '22:30'
}

const validateDate = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const y = parseInt(year.value);
  const m = parseInt(month.value);
  const d = parseInt(day.value);

  if (y > currentYear || y < 1900) return false;
  if (m < 1 || m > 12) return false;
  if (y === currentYear) {
    if (m > currentMonth) return false;
    if (m === currentMonth && d > currentDay) return false;
  }

  const lastDay = new Date(y,m,0).getDate();

  if (d < 1 || d > lastDay) return false;

  return true;
};

async function submit() {
  if (!year.value || !month.value || !day.value || !branch.value) {
    alert('Please enter all info😢');
    return;
  }
  if (!validateDate()) {
    alert('Please check your birthdate again🫢')
    return;
  }
  loading.value = true;
  
  const dateStr = `${year.value}-${String(month.value).padStart(2, '0')}-${String(day.value).padStart(2, '0')}`;
  let birthDateTime = "";

  if (branch.value === 'unknown') {
    birthDateTime = dateStr;
  } else {
    const [hour, minute] = branchHourMap[branch.value].split(':');
    birthDateTime = `${dateStr}T${hour}:${minute}:00`;
  }

  try {
    const response = await axios.post('https://is-that-my-name.onrender.com/api/saju/filter', {
      birthDateTime: birthDateTime,
      gender: gender.value
    });

    router.push({
      name: 'Result',
      state: { resultData: response.data }
    });
  } catch (error) {
    console.error(error);
    alert('Server connection failed.');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Pixelify+Sans:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

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
  padding: 40px 20px;
  text-align: center;
}

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

.pixel-title {
  font-family: 'Jersey 10';
  font-size: 2.5rem;
  color: #000;
  margin: 10px 0 5px 0;
}

.pixel-subtitle {
  font-family: 'Noto Sans KR';
  font-size: 0.8rem;
  color: #a64452;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.pixel-label {
  display: block;
  font-family: 'Jersey 10';
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #000;
}

.pixel-input {
  width: 100%;
  background: #fff;
  border: 3px solid #000;
  padding: 10px;
  font-family: 'Jersey 10';
  font-size: 1.2rem;
  outline: none;
  box-shadow: 3px 3px 0 #bdb595;
}

.birth-inputs {
  display: flex;
  gap: 8px;
}

.pixel-select-wrapper {
  position: relative;
  width: 100%;
}

.pixel-select {
  width: 100%;
  background: #fff;
  border: 3px solid #000;
  padding: 10px;
  font-family: 'Noto Sans KR';
  font-size: 0.9rem;
  outline: none;
  box-shadow: 3px 3px 0 #bdb595;
  /* 기본 화살표 제거 (브라우저 표준) */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

.pixel-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 8px;
  background-color: #000;
  clip-path: polygon(
    0% 0%, 100% 0%, 
    100% 40%, 80% 40%, 
    80% 70%, 60% 70%, 
    60% 100%, 40% 100%, 
    40% 70%, 20% 70%, 
    20% 40%, 0% 40%
  );
  pointer-events: none;
}

.gender-group {
  display: flex;
  gap: 10px;
}

.pixel-radio {
  flex: 1;
  background: #fff;
  border: 3px solid #000;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  font-family: 'Jersey 10';
  font-size: 1.1rem;
  color: #888;
  box-shadow: 3px 3px 0 #bdb595;
}

.pixel-radio.active {
  background: #a64452;
  color: #fff;
  box-shadow: 3px 3px 0 #000;
}

.pixel-radio input {
  display: none;
}

.submit-btn {
  width: 100%;
  margin-top: 30px;
  background-color: #000;
  color: #fff;
  padding: 10px;
  font-size: 1.8rem;
  font-family: 'Jersey 10';
  border: none;
  cursor: pointer;
  box-shadow: -4px 0 0 0 #000, 4px 0 0 0 #000, 0 -4px 0 0 #000, 0 4px 0 0 #000;
  transition: 0.1s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #a64452;
}

.submit-btn:disabled {
  background-color: #938a67;
  cursor: not-allowed;
}

.pixel-footer {
  margin-top: 40px;
  font-family: 'Jersey 10';
  font-size: 0.9rem;
  color: #938a67;
}
</style>