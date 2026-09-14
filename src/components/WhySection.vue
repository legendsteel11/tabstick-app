<script setup lang="ts">
import { t } from '../i18n'
import StickerIcon from './StickerIcon.vue'
</script>

<template>
  <section id="why">
    <div class="container">
      <div class="section-heading">
        <!-- 제목 앞에 팔레트 색 스티커를 세운다. 색은 섹션 차례대로 팔레트를 따른다(StickerIcon 주석). -->
        <div class="heading-row">
          <StickerIcon color="#DE2B26" />
          <h2>{{ t.why.title }}</h2>
        </div>
      </div>

      <ul class="questions">
        <li v-for="q in t.why.items" :key="q">{{ q }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.heading-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.questions {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 780px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

/* 맨 앞 한 줄은 홀로 선다(2026-07-27). 항목이 다섯이라 2열에 그냥 두면 마지막 줄에 하나가
   남아 허전한데, 앞으로 보내면 그 자리가 오히려 머리글이 된다. 두 열을 가로지르되 폭은
   한 칸 그대로 두고 가운데로 — 카드 크기가 나머지와 달라지면 특별 취급으로 보인다.
   한 칸 폭 = 50% - (간격 14의 절반). */
.questions li:first-child {
  grid-column: 1 / -1;
  width: calc(50% - 7px);
  margin: 0 auto;
}

.questions li {
  position: relative;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px 22px 20px 46px;
  font-size: 17px;
  line-height: 1.65;
  /* 대화체(혼잣말)라 본문과 구분되게 이탤릭 + 파란 톤(2026-07-24). Pretendard엔 진짜
     이탤릭이 없고 전역 font-synthesis:none이라 기울임이 안 그려진다 → 여기서만 style 합성 허용. */
  font-style: italic;
  font-synthesis: style;
  /* 굵기는 2026-07-28에 올렸다. 기울인 글씨는 획이 가늘어 보여 같은 굵기라도 옆 문단보다
     묽게 읽힌다 - 600이면 기울임을 유지한 채 눈에 먼저 들어온다. */
  font-weight: 600;
  color: var(--accent-strong);
}

/* 일본어에서는 기울이지 않는다. 한자·가나 서체에는 이탤릭 자형이 없어 화면에 보이는
   기울임은 전부 브라우저가 만든 합성(偽斜体)이고, 일본어 조판에서는 피하는 쪽이다.
   강조는 굵기와 색이 대신 받는다 - 아래 두 줄은 그대로 둔다. */
html[lang='ja'] .questions li {
  font-style: normal;
  font-synthesis: none;
}

/* 개발 취지가 전부 자문(自問)이라, 따옴표를 붙여 혼잣말처럼 읽히게 한다. */
.questions li::before {
  content: '“';
  position: absolute;
  left: 18px;
  top: 14px;
  font-size: 30px;
  line-height: 1;
  color: var(--accent);
  opacity: 0.5;
}

@media (max-width: 720px) {
  .questions {
    grid-template-columns: 1fr;
  }

  /* 한 열이 되면 가운데 세울 것이 없다. 첫 줄도 남들과 같은 폭으로 돌린다. */
  .questions li:first-child {
    width: auto;
  }
}
</style>
