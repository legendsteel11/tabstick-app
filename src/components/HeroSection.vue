<script setup lang="ts">
import { computed } from 'vue'
import { t, lang } from '../i18n'

// 언어별 히어로 GIF. 영문 UI 캡처는 영문판에만 쓰고, 캡처가 없는 언어는 한글판으로 떨어진다.
const heroSrc = computed(() => (lang.value === 'en' ? '/screenshots/hero-en.gif' : '/screenshots/hero.gif'))
</script>

<template>
  <section id="top" class="hero">
    <div class="container">
      <div class="copy">
        <img src="/icon.png" alt="" width="56" height="56" class="icon" />
        <p class="eyebrow">{{ t.hero.eyebrow }}</p>
        <!-- 제목 오른쪽 위에 ™처럼 걸려 있던 Beta 표시는 2026-07-26에 뗐다. -->
        <div class="title-row">
          <h1 class="title">{{ t.hero.title }}</h1>
          <!-- 캐릭터 Tabsty(2026-08-21). 파일은 긴 변 400이고 화면에는 190으로 선다 -
               고DPI에서 흐리지 않을 만큼만 크게 두고 그 이상은 담지 않는다. -->
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
.title-row {
  display: inline-block;
  position: relative;
}

.title-row .mascot {
  position: absolute;
  /* 제목 오른쪽 끝에서 시작해 그만큼 떨어진다. */
  left: 100%;
  margin-left: 30px;
  /* 제목 아래끝을 기준으로 그만큼 띄워 위로 솟는다 - 세로로 긴 그림이라 이 편이 안정적이다. */
  bottom: 16px;
  height: 190px;
  width: auto;
  /* 글 옆에 선 그림이라 클릭 대상이 아니다. */
  pointer-events: none;
}

/* 좁은 화면에서는 제목이 먼저다. 자리를 안 차지하는 대신 화면 밖으로 나갈 수 있어 줄인다. */
@media (max-width: 860px) {
  .title-row .mascot { height: 130px; margin-left: 8px; }
}

/* 더 좁아지면 아예 내린다 - 절대 위치라 여기서는 잘려 보일 뿐이다. */
@media (max-width: 560px) {
  .title-row .mascot { display: none; }
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
  margin-bottom: 12px;
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
