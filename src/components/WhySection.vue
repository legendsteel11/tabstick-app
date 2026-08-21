<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="why">
    <div class="container">
      <div class="section-heading">
        <!-- 제목과 캐릭터(GIF)를 한 줄에 나란히, 가로 가운데 정렬 + 세로 가운데 맞춤. -->
        <div class="heading-row">
          <!-- 캐릭터 Tabsty(2026-08-21). 그전에는 제목 뒤에서 도는 GIF였는데 **그 그림은 지금
               캐릭터가 아니라** 7월에 따로 만든 것이었다. 자리도 제목 왼쪽으로 옮겼다. -->
          <img class="mascot" src="/character/why.png" alt="" />
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
  /* 2 → 12(2026-08-21). 옛 GIF는 그림 안에 좌우 여백이 들어 있어 gap을 0에 가깝게 둬야
     붙어 보였다. 지금 PNG는 여백이 없어 그 값 그대로면 제목에 닿는다. */
  gap: 12px;
}

/* 캐릭터 Tabsty(2026-08-21). 그전 GIF에 있던 clip-path·음수 여백·pixelated는 전부 걷었다 -
   그것들은 **그 GIF 안에 배경색 여백이 들어 있어서** 필요했던 손질이고, 이 PNG는 배경이
   투명하며 여백도 없다. 지금 남은 것은 크기 하나뿐이다. */
.mascot {
  height: 110px;
  width: auto;
  flex-shrink: 0;
  pointer-events: none;
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
  /* 대화체(혼잣말)라 본문과 구분되게 이탤릭 + 파란 톤(2026-07-24 요청). Pretendard엔 진짜
     이탤릭이 없고 전역 font-synthesis:none이라 기울임이 안 그려진다 → 여기서만 style 합성 허용. */
  font-style: italic;
  font-synthesis: style;
  /* 굵기는 2026-07-28 요청. 기울인 글씨는 획이 가늘어 보여 같은 굵기라도 옆 문단보다
     묽게 읽힌다 - 600이면 기울임을 유지한 채 눈에 먼저 들어온다. */
  font-weight: 600;
  color: var(--accent-strong);
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
