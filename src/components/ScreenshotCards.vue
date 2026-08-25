<script setup lang="ts">
import { computed, ref } from 'vue'
import { t, lang } from '../i18n'
import ImageLightbox from './ImageLightbox.vue'

// 여섯 컷 모두 표시 박스와 같은 비율(720x500 = 1.44:1)이라, 데스크톱 3열에서는 object-fit: cover가
// 아무것도 자르지 않는다. 좁아져 비율이 어긋나는 모바일에서만 잘리는데, 컷마다 요점이 가운데에
// 몰려 있어 center면 어느 쪽이 잘려도 요점이 남는다.
//
// 언어별 이미지: 영문판은 영문 UI 캡처(scp-en-*). 단 **앱 글자가 안 나오는 컷은 한/영 공용**이다 -
// 팔레트 모양(spc-05)과 맨 앞 창 전환 GIF(spc-07)가 그렇다. 후자는 메모를 접은 채로 찍어 스티커가
// 색 사각형으로만 보이므로, 언어를 바꿔 다시 찍을 이유가 없다.
//
// 확장자는 배열에 함께 적는다. 첫 칸이 움직이는 GIF라 png로 고정할 수 없다.
// 2026-08-03에 한 컷이 붙어 양쪽 다 일곱 칸이 되었다. 3열이라 마지막 줄에 홀로 서고 두 칸이
// 빈다 - 의도한 모양이다. 설정·프리셋 창의 글자가 크게 보이는 컷이라 언어별로 따로 찍었다.
// 2026-08-05에 계산 컷이 붙어 여덟 칸이 됐다. 3열이라 마지막 줄에 둘이 서고 한 칸이 빈다.
// 이 컷은 **메뉴를 닫고 다시 찍었다** - 우클릭 메뉴가 열린 컷은 메뉴가 메모 위로 겹쳐
// 숫자가 가려졌고, 세로로 길어 카드 비율(1.44)에 넣으면 아래가 통째로 잘렸다.
// 720x500을 원본 화소 그대로 잘라내 축소가 없다.
// 2026-08-21에 아홉 칸이 됐다(배경 이미지). **한·영 따로 찍었다** - 프리셋 창의 글자가 크게
// 보이는 컷이라 공용으로 쓸 수 없다(앞의 spc-05·spc-07만 글자가 안 나와 공용이다).
// 3열이라 아홉이면 마지막 줄이 꽉 찬다(여덟일 때는 한 칸이 비어 있었다).
const KO = ['spc-07.gif', 'spc-01.png', 'spc-02.png', 'spc-03.png', 'spc-04.png', 'spc-05.png', 'spc-08.png', 'spc-09.png', 'spc-10.png']
const EN = ['spc-07.gif', 'scp-en-01.png', 'scp-en-02.png', 'scp-en-03.png', 'scp-en-04.png', 'spc-05.png', 'scp-en-08.png', 'scp-en-09.png', 'scp-en-10.png']

// **일본어는 영문 컷을 빌려 쓴다**(2026-08-24). 일본어 캡처는 아직 없는데, 그 사이 한국어 컷을
// 내보내면 일본어 사용자는 읽을 수 없는 화면을 보게 된다. 영문 UI는 적어도 무엇을 하는 화면인지
// 짚어 볼 수 있다. ▶ 일본어로 다시 찍으면 여기에 JA 배열을 하나 더 세운다.
const shots = computed(() =>
  (lang.value === 'ko' ? KO : EN).map((src) => ({ src, pos: 'center' })),
)

/* 카드를 누르면 원본 크기로 펼친다. 카드 폭이 340px 남짓이라 카드에서는 무슨 화면인지만
   알리고, 글자를 읽는 몫은 확대창이 받는다. 그래서 카드 쪽에서 잘라 넣지 않는다. */
const opened = ref<number | null>(null)
const sources = computed(() => shots.value.map((s) => `/screenshots/${s.src}`))
const alts = computed(() => t.value.screenshots.items.map((item) => item.title))
</script>

<template>
  <section id="screenshots">
    <div class="container">
      <div class="section-heading">
        <!-- 캐릭터 Tabsty가 제목 왼쪽에 선다(2026-08-21). -->
        <div class="heading-row">
          <img class="mascot" src="/character/features.png" alt="" />
          <h2>{{ t.screenshots.title }}</h2>
        </div>
      </div>

      <div class="grid">
        <figure v-for="(item, i) in t.screenshots.items" :key="item.title" class="card">
          <button type="button" class="shot" @click="opened = i">
            <img :src="`/screenshots/${shots[i].src}`" :alt="item.title" loading="lazy" />
          </button>
          <figcaption>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </figcaption>
        </figure>
      </div>
    </div>

    <ImageLightbox v-model="opened" :sources="sources" :alts="alts" />
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

/* 110의 90%(2026-08-21). 엎드려 가리키는 자세라 가로로 넓어 같은 높이에서도 커 보였다. */
.heading-row .mascot {
  height: 100px;
  width: auto;
  flex-shrink: 0;
  pointer-events: none;
}

/* 섹션 배경은 위아래와 번갈아 간다(2026-07-28). 전체 차례는
   히어로·제작동기(--bg) → 특징(--bg-alt) → 기타기능(--bg) → 사용방법(--bg-alt) →
   다운로드(--bg) → FAQ(--bg-alt). 예전에는 규칙 없이 어떤 섹션끼리는 붙고 어떤 것은
   갈려서, 어디가 한 덩이인지 읽히지 않았다. 히어로와 제작동기만 일부러 한 덩이로 둔다. */
/* 가로선 규칙: **히어로 아래 모든 섹션이 자기 위에 선을 하나 갖는다.** 경계마다 한 줄뿐이라
   겹쳐서 굵어지는 데가 없다. 두 배경 톤 차이가 워낙 작아 선이 실제로 경계를 만든다.
   예외는 제작동기 하나 - 히어로와 한 덩이로 두기로 했으므로 그 사이에는 톤 변화도 선도 없다. */
section {
  background: var(--bg-alt);
  border-top: 1px solid var(--border);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.card {
  margin: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 잘라내지 않는다(2026-08-25). 예전에는 720x500 창에 원본 화소를 그대로 잘라 넣었는데,
   찍는 쪽이 그 창에 요점을 맞춰 넣어야 해서 찍고 확인하고 다시 찍기를 되풀이해야 했다.
   지금은 컷을 통째로 담고, 글자를 읽는 몫은 누르면 열리는 확대창이 받는다.
   16:9인 것은 화면 전체를 찍은 컷을 그대로 넣기 위해서다. */
.shot {
  background: var(--bg-alt);
  aspect-ratio: 16 / 9;
  width: 100%;
  padding: 0;
  border: none;
  border-bottom: 1px solid var(--border);
  display: block;
  overflow: hidden;
  cursor: zoom-in;
}

.shot img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  /* 살짝 커지는 것으로 누를 수 있다는 것을 알린다. 카드가 overflow:hidden이라 넘치지 않는다. */
  transition: transform 0.2s ease;
}

.shot:hover img {
  transform: scale(1.03);
}

/* 키보드로 옮겨 다닐 때 어느 카드에 있는지 보이게 한다. */
.shot:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

figcaption {
  padding: 20px;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

figcaption p {
  font-size: 16px;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
