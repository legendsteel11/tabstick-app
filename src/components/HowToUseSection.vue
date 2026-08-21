<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="howto">
    <div class="container">
      <div class="section-heading">
        <!-- 캐릭터 Tabsty가 제목 왼쪽에 선다(2026-08-21). 노트에 적는 장을 골랐다 -
             이 섹션이 쓰는 법을 말하는 자리다. 크기·간격은 다른 섹션과 같은 값이다. -->
        <div class="heading-row">
          <img class="mascot" src="/character/howto.png" alt="" />
          <h2>{{ t.howto.title }}</h2>
        </div>
      </div>

      <ol class="steps">
        <li v-for="(step, i) in t.howto.steps" :key="step.title" class="step">
          <span class="num">{{ i + 1 }}</span>
          <div class="body">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
/* 제목과 캐릭터를 한 줄에. 값은 WhySection과 같다 - 섹션마다 다르면 훑어 내릴 때 눈에 걸린다. */
.heading-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.heading-row .mascot {
  height: 110px;
  width: auto;
  flex-shrink: 0;
  pointer-events: none;
}

/* 번갈아 가는 섹션 배경(2026-07-28). 차례는 ScreenshotCards 주석에. */
section {
  background: var(--bg-alt);
  border-top: 1px solid var(--border);
}

.steps {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.num {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent-strong);
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.body p {
  font-size: 16px;
  line-height: 1.65;
}
</style>
