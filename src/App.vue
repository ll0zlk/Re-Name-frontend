<template>
  <Analytics />
  
  <MobileWrapper>
    <router-view />
  </MobileWrapper>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/vue';
import MobileWrapper from './components/MobileWrapper.vue'

import { onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
  axios.get('https://re-name-backend-production.up.railway.app/api/saju/health')
    .catch(() => {
      console.log("Wake-up signal sent to server.");
    });
});
</script>