<template>
  <div class="home-wrapper">
    <div class="home-card">
      <h1 class="home-title">学生成绩管理系统</h1>
      <!-- <p class="home-subtitle">Simple · Efficient · Clear</p> -->
          </div>
  </div>
</template>

<script setup name="Index">
</script>

<style scoped lang="scss">
.home-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: radial-gradient(circle at top left, #e0f3ff 0%, #f5f7ff 40%, #ffffff 100%);
}

.home-card {
  padding: 48px 64px;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(15, 76, 129, 0.18);
  background: linear-gradient(135deg, #ffffff, #f3f8ff);
  text-align: center;
  border: 1px solid rgba(64, 158, 255, 0.18);
}

.home-title {
  margin: 0 0 16px;
  font-size: 40px;
  letter-spacing: 4px;
  font-weight: 700;
  background: linear-gradient(120deg, #1d52ff, #2f9bff);
  -webkit-background-clip: text;
  color: transparent;
}

// .home-subtitle {
//   margin: 0;
//   font-size: 16px;
//   letter-spacing: 0.32em;
//   text-transform: uppercase;
//   color: #8b9bb5;
// }

@media (max-width: 768px) {
  .home-card {
    padding: 32px 24px;
    border-radius: 18px;
  }

  .home-title {
    font-size: 30px;
    letter-spacing: 2px;
  }

  .home-subtitle {
    font-size: 14px;
    letter-spacing: 0.24em;
  }
}
</style>

