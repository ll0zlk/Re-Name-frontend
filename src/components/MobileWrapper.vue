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
  background: #dfe6ecc2;
}

.mobile {
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>