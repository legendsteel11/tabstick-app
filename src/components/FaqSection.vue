<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <!-- 다운로드 섹션 '뒤'에 둔다. 받기로 마음먹은 사람은 이미 버튼을 눌렀고, 망설이는 사람만
       여기까지 내려온다. 버튼 위나 바로 아래에 두면 받을지 정하기 직전에 망설일 이유를
       읽히게 된다(2026-07-26에 '드리는 말씀'을 뺀 것이 그 자리였다). -->
  <section id="faq">
    <div class="container">
      <div class="section-heading">
        <!-- 캐릭터 Tabsty가 제목 왼쪽에 선다(2026-08-21). -->
        <div class="heading-row">
          <img class="mascot" src="/character/faq.png" alt="" />
          <h2>{{ t.faq.title }}</h2>
        </div>
      </div>

      <!-- details/summary라 JS 없이 접히고, 키보드·스크린리더가 그냥 읽는다.
           전부 닫힌 채로 시작한다 - 답이 궁금한 사람만 편다. -->
      <div class="list">
        <details v-for="item in t.faq.items" :key="item.q" class="item">
          <summary>
            <span class="q">{{ item.q }}</span>
            <span class="mark" aria-hidden="true"></span>
          </summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 제목과 캐릭터를 한 줄에. 값은 다른 섹션과 같다 - 섹션마다 다르면 훑어 내릴 때 눈에 걸린다. */
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

/* 배경·가로선 규칙은 ScreenshotCards 주석에. */
section {
  background: var(--bg-alt);
  border-top: 1px solid var(--border);
}

.list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
}

summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  cursor: pointer;
  list-style: none;
  user-select: none;
}

/* 사파리의 기본 삼각형. 위 list-style만으로는 안 지워진다. */
summary::-webkit-details-marker {
  display: none;
}

.q {
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.5;
}

/* 열림 표시는 +/− 대신 회전하는 선 하나. 글자가 아니라 도형이라 번역이 필요 없다. */
.mark {
  flex-shrink: 0;
  position: relative;
  width: 14px;
  height: 14px;
  color: var(--accent-strong);
  transition: transform 0.2s ease;
}

.mark::before,
.mark::after {
  content: '';
  position: absolute;
  background: currentColor;
  border-radius: 1px;
}

.mark::before {
  left: 0;
  top: 6px;
  width: 14px;
  height: 2px;
}

.mark::after {
  left: 6px;
  top: 0;
  width: 2px;
  height: 14px;
  transition: opacity 0.2s ease;
}

.item[open] .mark {
  transform: rotate(180deg);
}

.item[open] .mark::after {
  opacity: 0;
}

.item p {
  padding: 0 20px 20px;
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-muted, inherit);
}

@media (hover: hover) {
  summary:hover .q {
    color: var(--accent-strong);
  }
}
</style>
