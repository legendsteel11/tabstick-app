<script setup lang="ts">
import { computed } from 'vue'
import { t, lang } from '../i18n'

// 언어별 히어로 GIF. **한국어만 한글 캡처를 쓰고 나머지는 영문 캡처로 간다**(2026-08-24).
// 일본어 캡처가 아직 없는데, 그 사이 한글 화면을 내보내면 일본어 사용자는 첫 화면에서 아무것도
// 읽을 수 없다. ▶ 일본어로 다시 찍으면 여기에 한 갈래를 더한다.
const heroSrc = computed(() =>
  lang.value === 'ko' ? '/screenshots/hero.gif' : '/screenshots/hero-en.gif',
)
</script>

<template>
  <section id="top" class="hero">
    <div class="container">
      <div class="copy">
        <!-- 아이콘·한 줄 소개·제목을 한 상자(lead)로 묶는다(2026-08-22) - 오른쪽 캐릭터가
             이 상자를 기준으로 서서, 묶음의 높이와 저절로 맞는다. -->
        <div class="lead">
          <img src="/icon.png" alt="" width="56" height="56" class="icon" />
          <p class="eyebrow">{{ t.hero.eyebrow }}</p>
          <!-- 제목 오른쪽 위에 ™처럼 걸려 있던 Beta 표시는 2026-07-26에 뗐다. -->
          <div class="title-row">
            <h1 class="title">{{ t.hero.title }}</h1>
          </div>
          <!-- 캐릭터 Tabsty(2026-08-21). 파일은 긴 변 400. 화면 크기는 붙박이 값이 아니라
               왼쪽 묶음의 높이를 따라간다(아래 .lead .mascot). -->
          <img class="mascot" src="/character/hero.png" alt="" />
        </div>
        <p class="tagline">{{ t.hero.tagline }}</p>

        <!-- 받을지 정하기 전에 알고 싶은 셋. 단점·해명을 앞세우지 않는다는 규칙과 부딪히지
             않는다 - 이건 망설일 이유가 아니라 **받을 이유**다. 다만 문구는 긍정형으로 쓴다:
             "데이터를 전송하지 않습니다"가 아니라 "메모는 내 PC에만". 없는 것을 말하면
             묻지 않은 사람에게 질문을 심는다(2026-07-26에 그 자리에서 한 번 겪었다). -->
        <ul class="badges">
          <li v-for="b in t.hero.badges" :key="b">{{ b }}</li>
        </ul>
      </div>
      <div class="shot">
        <img :src="heroSrc" alt="TabStick index notes attached to browser windows, with the color palette" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ⚠ **제품명은 화면 가운데 그대로 두고 캐릭터만 옆에 얹는다**(2026-08-21).
   한 줄에 나란히 놓았더니 둘이 한 덩이로 가운데를 잡아 **제목이 왼쪽으로 밀렸다.**
   캐릭터를 흐름에서 빼면(absolute) 자리를 차지하지 않아 제목이 원래 자리를 지킨다.
   `.copy`가 text-align:center이고 이 상자는 제목 폭에 딱 맞으므로(inline-block) 가운데에 선다. */
/* 아이콘~제목 묶음이자 캐릭터의 기준 상자. 폭이 안 내용(제목)에 맞고 .copy의 가운데
   정렬로 중앙에 선다 - 캐릭터는 흐름 밖(absolute)이라 제목 자리를 밀지 않는다. */
.lead {
  display: inline-block;
  position: relative;
}

.title-row {
  display: inline-block;
  position: relative;
}

/* 캐릭터 크기는 값이 아니라 **묶음의 높이**가 정한다(2026-08-22) - 머리가 아이콘 위끝,
   발이 제목 아래끝에 맞는다. 빼는 16은 제목의 아래 여백(h1 margin-bottom) 몫이다.
   ⚠ **img는 top·bottom으로 늘어나지 않는다**(대체 요소는 auto 높이가 원본 크기로 풀린다) -
   처음에 그렇게 뒀다가 400px 원본이 그대로 서서 태그라인까지 덮었다. height를 직접 준다. */
.lead .mascot {
  position: absolute;
  /* 묶음 오른쪽 끝에서 시작해 그만큼 떨어진다. */
  left: 100%;
  margin-left: 20px;
  /* 발을 제목 아래끝에 붙인 채 살짝만 줄인다(2026-08-22) - 빼는 값을 16에서 30으로 키우면
     그만큼 머리 쪽이 내려온다. */
  /* 발끝을 TabStick 글자 아래선에 맞춘다 - 글줄 상자에는 글자 밑으로 여백이 더 있어서
     (내림 문자 몫), 상자 기준(16)보다 그만큼 올려야 눈으로 맞는다. */
  bottom: 28px;
  height: calc(100% - 30px);
  width: auto;
  /* 글 옆에 선 그림이라 클릭 대상이 아니다. */
  pointer-events: none;
}

/* 좁은 화면에서는 제목이 먼저다. 자리를 안 차지하는 대신 화면 밖으로 나갈 수 있어,
   묶음 높이 대신 고정 높이로 줄여 아래 기준으로 세운다. */
@media (max-width: 860px) {
  .lead .mascot { top: auto; bottom: 16px; height: 110px; margin-left: 8px; }
}

/* 더 좁아지면 아예 내린다 - 절대 위치라 여기서는 잘려 보일 뿐이다. */
@media (max-width: 560px) {
  .lead .mascot { display: none; }
}

.hero {
  padding-top: 56px;
  background:
    radial-gradient(ellipse 900px 460px at 50% 0%, var(--accent-bg), transparent 62%),
    var(--bg);
}

.copy {
  text-align: center;
  max-width: 760px;
  /* 설명 문단을 뺀 뒤 태그라인과 이미지가 붙지 않게 아래 여백을 준다. */
  margin: 0 auto 52px;
}

.icon {
  margin: 0 auto 20px;
  border-radius: 12px;
}

.eyebrow {
  color: var(--accent-strong);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
  /* 12 → 4(2026-08-22). 한 줄 소개와 제목이 한 묶음으로 읽히게 붙인다. */
  margin-bottom: 4px;
}

h1 {
  font-size: 48px;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  /* 제목 상자를 글자 폭에 딱 맞춰(inline-block) .copy의 가운데 정렬로 중앙에 세운다. */
  display: inline-block;
  position: relative;
}

.tagline {
  font-size: 23px;
  color: var(--text-strong);
  line-height: 1.5;
  margin-bottom: 16px;
  font-weight: 500;

  /* 줄을 고르게 나눈다. 일본어는 글자 사이 어디서나 끊기므로, 그냥 두면 마지막 한두 글자만
     다음 줄로 떨어져 문장이 어색해진다(`り。` 한 덩이가 홀로 내려왔다). 이 자리는 문장이
     짧고 가운데 정렬이라 균형이 곧 인상이다.
     ▣ 브라우저가 이 값을 모르면 예전처럼 흐르므로 잃는 것은 없다. */
  text-wrap: balance;
}

/* 성격 표시지 약속 목록이 아니다. 크게 박으면 그쪽이 첫인상이 되고, 나중에 Pro가 생겨
   "무료"를 고칠 때도 자국이 크게 남는다. 태그라인보다 작고 흐리게 두어, 읽히되 앞서지
   않게 한다. 가운데 정렬은 .copy가 이미 하고 있으므로 목록만 inline-flex로 모은다. */
.badges {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 18px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.badges li {
  font-size: 14.5px;
  color: var(--text-soft);
  display: flex;
  align-items: center;
  gap: 7px;
}

/* 항목 사이의 점. 글자 앞이 아니라 **앞 항목과의 사이**에 서야 첫 항목 왼쪽이 비지 않는다. */
.badges li + li::before {
  content: '';
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-soft);
  opacity: 0.55;
  margin-right: 11px;
}

.shot {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.shot img {
  width: 100%;
  display: block;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 30px 70px -28px rgba(27, 33, 41, 0.35);
}

/* 히어로 이미지 하단에 겹쳐 있던 "미리보기 GIF" 안내는 2026-07-26에 뺐다 - 첫 화면에서
   먼저 단서를 다는 글이었다. .shot의 position:relative는 남겨 둔다(다른 겹침에 쓸 자리). */

@media (max-width: 720px) {
  h1 {
    font-size: 38px;
  }

  .tagline {
    font-size: 20px;
  }
}
</style>
