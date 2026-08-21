<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="features" class="band">
    <div class="container">
      <div class="section-heading">
        <!-- 캐릭터 Tabsty가 제목 왼쪽에 선다(2026-08-21). -->
        <div class="heading-row">
          <img class="mascot" src="/character/more.png" alt="" />
          <h2>{{ t.features.title }}</h2>
        </div>
      </div>

      <div class="grid">
        <div v-for="item in t.features.items" :key="item.title" class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
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

/* ⚠ 110이 아니라 140이다(2026-08-21). 이 그림은 **두 팔을 위로 들고 있어** 그림 높이의 위쪽을
   팔과 카드가 차지한다 - 같은 높이를 주면 인물만 다른 섹션보다 작아 보인다. **맞출 것은 그림
   높이가 아니라 인물 크기다.** */
.heading-row .mascot {
  height: 140px;
  width: auto;
  flex-shrink: 0;
  pointer-events: none;
}

/* 번갈아 가는 섹션 배경에서 이 섹션은 어두운 쪽(--bg)이다 - 위(특징)와 아래(사용방법)가
   둘 다 밝은 쪽이라 그 사이에 눌린 띠로 앉는다(2026-07-28). 차례는 ScreenshotCards 주석에.
   클래스 이름은 원래 "번갈아 가는 쪽(alt)"이라는 뜻이었는데 이제 반대쪽을 가리키므로 band로 바꿨다. */
.band {
  background: var(--bg);
  border-top: 1px solid var(--border);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 32px;
}

/* 섹션이 어두운 쪽으로 바뀌었으니 칸은 반대로 **띄운다**(2026-07-28). 예전에는 밝은
   섹션 위에 칸을 한 단계 눌러 앉혔는데, 그 방향 그대로 두면 어두운 섹션 위에서 칸이 배경에
   묻힌다. 왼쪽 강조선은 그대로 두고 오른쪽만 둥글려, 선이 카드에 물린 모양을 유지한다. */
.item {
  background: var(--bg-alt);
  border-left: 2px solid var(--accent);
  border-radius: 0 10px 10px 0;
  padding: 18px 20px;
}

.item h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-strong);
}

.item p {
  font-size: 16px;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
