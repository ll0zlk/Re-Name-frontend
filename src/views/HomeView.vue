<template>
  <div class="container">
    <h1>사주 기반 개명 추천 시스템</h1>
    <p>당신의 사주 오행을 분석하여 가장 잘 어울리는 이름을 찾아드립니다.</p>
    <button @click="$router.push('/input')">이름 추천받기 시작</button>
  </div>
</template>

<style scoped>
.container { text-align: center; margin-top: 100px; }
button { padding: 15px 30px; font-size: 18px; cursor: pointer; background: #42b983; color: white; border: none; border-radius: 8px; }
</style>