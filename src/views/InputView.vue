<template>
  <div class="input-container">
    <div class="form-card">
      <h2 class="title">정보 입력</h2>
      <p class="subtitle">사주 분석을 위해 정확한 정보를 입력해주세요.</p>

      <div class="input-group">
        <label>생년월일</label>
        <div class="birth-inputs">
          <input v-model="year" type="number" placeholder="YYYY" class="birth-input" />
          <input v-model="month" type="number" placeholder="MM" class="birth-input" />
          <input v-model="day" type="number" placeholder="DD" class="birth-input" />
        </div>
      </div>

      <div class="input-group">
        <label>태어난 시간 (지시)</label>
        <select v-model="branch" class="full-select">
          <option v-for="b in branches" :key="b.key" :value="b.key">
            {{ b.label }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label>성별</label>
        <div class="gender-group">
          <label class="radio-label" :class="{ active: gender === '남성' }">
            <input type="radio" v-model="gender" value="남성" /> 남성
          </label>
          <label class="radio-label" :class="{ active: gender === '여성' }">
            <input type="radio" v-model="gender" value="여성" /> 여성
          </label>
        </div>
      </div>

      <button class="submit-btn" @click="submit" :disabled="loading">
        {{ loading ? '분석 중...' : '결과 보기' }}
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const gender = ref('')
const year = ref('')
const month = ref('')
const day = ref('')
const branch = ref('자')

const branches = [
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
  { label: '亥(해) 21:30 ~ 23:29', key: '해' }
]

const branchHourMap = {
  자: '23:30', 축: '01:30', 인: '03:30', 묘: '05:30', 진: '07:30', 사: '10:30',
  오: '12:30', 미: '14:30', 신: '16:30', 유: '18:30', 술: '20:30', 해: '22:30'
}

async function submit() {
  if (!year.value || !month.value || !day.value) {
    alert('날짜를 모두 입력해주세요.'); 
    return;
  }
  loading.value = true;
  
  const [hour, minute] = branchHourMap[branch.value].split(':');
  const birthDateTime = `${year.value}-${String(month.value).padStart(2, '0')}-${String(day.value).padStart(2, '0')}T${hour}:${minute}:00`;

  try {
    const response = await axios.post('http://localhost:8000/api/saju/filter', {
      birthDateTime: birthDateTime,
      gender: gender.value,
      keywords: []
    });

    router.push({
      name: 'Result',
      state: { resultData: response.data }
    });
  } catch (error) {
    console.error(error);
    alert('백엔드 서버(8000포트) 연결에 실패했습니다.');
  } finally {
    loading.value = false;
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.input-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.form-card {
  width: 100%;
  max-width: 350px;
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(108, 92, 231, 0.15); /* 보라색 톤 그림자 */
  text-align: center;
}

.title {
  margin-bottom: 8px;
  color: #2d3436;
  font-size: 1.5rem;
}

.subtitle {
  color: #b2bec3;
  margin-bottom: 30px;
  font-size: 0.85rem;
}

.input-group {
  margin-bottom: 25px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  color: #636e72;
  font-size: 0.9rem;
}

/* 2. 날짜 입력칸 3개 한 줄 정렬 핵심 코드 */
.birth-inputs {
  display: flex;
  gap: 8px; /* 입력칸 사이 간격 */
}

.birth-input {
  flex: 1; /* 3등분 */
  min-width: 0; /* 중요: 내용물 때문에 늘어나는 것 방지 */
  padding: 12px 5px;
  text-align: center;
  border: 2px solid #f1f2f6;
  border-radius: 10px;
  outline: none;
  transition: 0.3s;
}

.birth-input:focus {
  border-color: #6c5ce7;
}

/* 3. 셀렉트 박스 디자인 */
.full-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #f1f2f6;
  border-radius: 10px;
  outline: none;
  background: #fdfbff;
}

/* 4. 성별 라디오 버튼 디자인 */
.gender-group {
  display: flex;
  gap: 10px;
}

.radio-label {
  flex: 1;
  padding: 12px;
  border: 2px solid #f1f2f6;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  color: #b2bec3;
  font-weight: bold;
}

.radio-label.active {
  border-color: #6c5ce7;
  color: #6c5ce7;
  background: #f8f7ff;
}

.radio-label input {
  display: none; /* 실제 라디오 버튼은 숨김 */
}

/* 5. 버튼 디자인 복구 */
.submit-btn {
  width: 100%;
  padding: 16px;
  background: #6c5ce7; /* 메인 보라색 */
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
}

.submit-btn:hover:not(:disabled) {
  background: #5849d4;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #a29bfe;
  cursor: not-allowed;
}
</style>