<template>
  <div class="container">
    <h1>Namie</h1>
    <p>오행 분석 렛츠고</p>
    <button @click="$router.push('/input')">START</button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

h1 {
  margin: 50px 0;
}

button {
  margin: 10px;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer; 
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
}
</style>