<script setup lang="ts">
import { t, lang, toggleLang } from '../i18n'
</script>

<template>
  <header class="header">
    <div class="container bar">
      <a href="#top" class="brand">
        <img src="/icon.png" alt="TabStick" width="28" height="28" />
        <span>TabStick</span>
        <!-- 주소를 이름 옆에 붙여 스크롤 내내 눈에 남긴다(sticky 헤더).
             자리가 빠듯해지는 좁은 화면에서는 숨긴다 - 아래 미디어쿼리. -->
        <span class="domain">tabstick.com</span>
      </a>

      <nav class="nav">
        <a href="#why">{{ t.nav.why }}</a>
        <a href="#screenshots">{{ t.nav.screenshots }}</a>
        <a href="#features">{{ t.nav.features }}</a>
        <a href="#howto">{{ t.nav.howto }}</a>
        <a href="#download">{{ t.nav.download }}</a>
        <a href="#faq">{{ t.nav.faq }}</a>
      </nav>

      <button
        class="lang-toggle"
        type="button"
        @click="toggleLang"
        :aria-label="lang === 'ko' ? 'Switch to English' : '한국어로 전환'"
      >
        <span :class="{ active: lang === 'ko' }">한</span>
        <span class="sep">/</span>
        <span :class="{ active: lang === 'en' }">EN</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
  color: var(--text-strong);
  text-decoration: none;
  flex-shrink: 0;
}

.domain {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  opacity: 0.5;
  padding-left: 10px;
  border-left: 1px solid var(--border);
  margin-left: 2px;
}

.nav {
  display: flex;
  gap: 24px;
  margin-left: 8px;
  flex-grow: 1;
}

.nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 17px;
  /* 메뉴 한 칸은 절대 두 줄이 되지 않는다. flex 항목은 min-width:auto라 자리가 모자라면
     min-content까지 줄어드는데, 그 min-content가 "How it works"에서는 한 낱말이고 한글은
     글자 하나라, 폭이 빠듯해지면 "제작동 기"처럼 접혔다(2026-07-29 확인, 740~780px).
     접히는 대신 넘치게 두고, 넘치지 않도록 아래 미디어쿼리가 사이와 크기를 줄인다. */
  white-space: nowrap;
}

.nav a:hover {
  color: var(--text-strong);
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 12px;
  color: var(--text);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}

.lang-toggle .sep {
  opacity: 0.4;
}

.lang-toggle .active {
  color: var(--accent-strong);
}

/* 메뉴가 아직 살아 있는 폭에서 먼저 주소를 접는다. 로고·메뉴·언어 단추가 서로
   밀기 시작하는 것이 이 언저리라, 셋 중 가장 덜 급한 것을 먼저 내린다.

   주소를 접어도 아직 모자라므로 메뉴 자신도 함께 조인다. 항목은 이제 줄어들지 못하니
   (white-space:nowrap) 사이와 글자 크기로 자리를 만든다. 한국어 메뉴가 영어보다 길어서
   기준은 한국어로 잡았다 - "자주 묻는 질문" 한 칸이 영어 두 칸만 하다. */
@media (max-width: 900px) {
  .domain {
    display: none;
  }

  .bar {
    gap: 16px;
  }

  .nav {
    gap: 14px;
    margin-left: 0;
  }

  .nav a {
    font-size: 15px;
  }
}

/* 메뉴를 접는 폭. 800이다(2026-07-29). 720이던 시절에는 720~800 구간에서 메뉴가 아직
   살아 있는데 자리가 모자라, 위에서 조인 뒤에도 항목이 넘쳤다. 접을 거면 넘치기 전에
   접는다 - 넘쳐서 언어 단추를 밀어내는 모습보다 없는 편이 낫다. */
@media (max-width: 800px) {
  .nav {
    display: none;
  }

  /* 좁은 화면에선 메뉴가 사라져 언어 단추가 로고 옆에 붙어 버린다. 남는 자리를 왼쪽에 몰아
     오른쪽 끝으로 보낸다 - 넓은 화면에선 .nav의 flex-grow가 이미 같은 일을 한다. */
  .lang-toggle {
    margin-left: auto;
  }
}
</style>
