<template>
  <Analytics />
  
  <MobileWrapper>
    <router-view />
  </MobileWrapper>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/vue';
import MobileWrapper from './components/MobileWrapper.vue'
</script>