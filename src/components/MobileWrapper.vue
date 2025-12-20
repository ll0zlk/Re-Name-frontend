<template>
  <div class="outer">
    <div class="mobile">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.outer {
  min-height: 100vh;
  background: #eee;
}

.mobile {
  max-width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  background: white;
}
</style>