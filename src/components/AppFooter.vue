<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { t } from '../i18n'

const EMAIL = 'pjh85336@gmail.com'

// 다운로드 섹션의 SITE와 같은 주소이고, 같은 이유로 UTM을 붙이지 않는다 - 지금 페이지 주소를
// 그대로 복사하면 유입 표시가 따라 퍼져, 나중에 그 사람이 연 것까지 원래 채널로 잡힌다.
const SITE = 'https://tabstick.com/'

const copied = ref(false)
let clear: ReturnType<typeof setTimeout> | undefined

async function copySite() {
  // 여기서는 track()을 부르지 않는다. 다운로드 섹션의 copy_link는 "폰으로 온 사람을 PC로
  // 넘기고 있는가"를 재는 지표인데, PC에서 누른 것까지 같은 이름으로 섞으면 그 답이 흐려진다.
  try {
    await navigator.clipboard.writeText(SITE)
    copied.value = true
    clearTimeout(clear)
    clear = setTimeout(() => (copied.value = false), 2000)
  } catch {
    // 클립보드가 막힌 브라우저에서도 주소는 그대로 적혀 있어 손으로 골라 복사할 수 있다.
  }
}

onUnmounted(() => clearTimeout(clear))
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="brand">
          <img src="/icon.png" alt="" width="20" height="20" />
          <span>TabStick</span>
          <!-- 링크로 걸지 않는다 - 지금 그 주소에 서 있는 사람에게 자기 자신으로 가는
               링크는 눌러도 아무 일이 없다. 대신 눌러서 복사하는 자리로 쓴다: 읽고 기억하라고
               적어 둔 글자였는데, 기억하는 대신 가져갈 수 있게 한다(2026-07-28).
               모바일 안내(DownloadSection)의 복사 단추와 같은 주소를 같은 방식으로 복사한다. -->
          <button type="button" class="domain" @click="copySite"
                  :title="copied ? t.download.copied : t.download.copyLink"
                  :aria-label="copied ? t.download.copied : t.download.copyLink">
            <span>tabstick.com</span>

            <!-- 복사 아이콘. 누르면 잠깐 체크로 바뀌어 복사됐음을 그 자리에서 말한다.
                 글자를 따로 띄우지 않는 것은 푸터 한 줄이 길어지지 않게 하려는 것이다. -->
            <svg class="ic" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"
                 fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polyline v-if="copied" points="20 6 9 17 4 12" />
              <template v-else>
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </template>
            </svg>
          </button>
        </div>
        <a class="contact" :href="`mailto:${EMAIL}`">{{ t.footer.contact }}: {{ EMAIL }}</a>
      </div>

      <!-- 상호 링크는 푸터에(랜딩 계획). 다른 앱으로 가는 약한 방향이라 여기 한 줄로만.
           이름은 고유명사라 두 언어가 같아 본문에 그대로 적는다(2026-08-23, SweepCap 추가). -->
      <p class="other">
        {{ t.footer.otherTool }} ·
        <a href="https://edgetree.vercel.app/" target="_blank" rel="noopener">Edgetree</a> ·
        <a href="https://github.com/legendsteel11/SweepCap" target="_blank" rel="noopener">SweepCap</a>
      </p>

      <!-- 내장한 글꼴·아이콘 고지. 두 라이선스 모두 배포할 때 표기를 요구하므로 앱 정보 탭에도
           같은 두 줄이 있고, 여기 것은 받기 전에도 볼 수 있게 두는 몫이다. 저작권 줄과 같은
           무게로 낮춰 둔다 - 지켜야 해서 적는 것이지 읽히려고 적는 것이 아니다. -->
      <p class="credits">
        {{ t.footer.credits }}:
        <a href="https://github.com/orioncactus/pretendard" target="_blank" rel="noopener">Pretendard</a>
        (SIL OFL 1.1) ·
        <a href="https://github.com/google/material-design-icons" target="_blank" rel="noopener">Material Symbols</a>
        (Apache 2.0)
      </p>

      <!-- 라이선스는 저작권 줄에 붙인다 - 푸터에 블록을 하나 더 세우지 않고, 규정이라 적어 두는
           credits와 같은 무게로 물러나 있게 한다. 링크는 리포의 LICENSE.md로 간다. -->
      <p class="copyright">
        {{ t.footer.copyright }} ·
        <a href="https://github.com/legendsteel11/tabstick-app/blob/main/LICENSE.md"
           target="_blank" rel="noopener">{{ t.footer.licence }}</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 0;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: var(--text-strong);
  font-size: 14px;
}

/* 이름 뒤에 가운뎃점으로 잇는다. 굵기·크기를 낮춰 이름과 경쟁하지 않게.
   .domain이 inline-flex라 이 점도 flex 항목이 된다 - gap(5)이 이미 들어가므로 여백은
   3만 더해 예전의 8을 맞춘다. */
.domain::before {
  content: '·';
  margin-right: 3px;
  opacity: 0.45;
}

/* 단추지만 단추처럼 보이지 않게 둔다 - 푸터의 다른 글자들과 같은 무게로 서 있다가,
   올려놓았을 때만 또렷해지며 누를 수 있다는 것을 알린다. */
.domain {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: inherit;
  font-weight: 500;
  font-size: 13px;
  opacity: 0.6;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.domain:hover,
.domain:focus-visible {
  opacity: 1;
}

/* 아이콘은 주소보다 한 겹 더 물러나 있는다. 있는 줄은 알되 먼저 눈에 들지는 않게. */
.ic {
  opacity: 0.7;
  flex: none;
}

.domain:hover .ic,
.domain:focus-visible .ic {
  opacity: 1;
}

/* 같은 줄에 선 브랜드(14)에 맞춘다. 16으로 두었더니 푸터에서 이것만 커 보였다
   (2026-07-28) - 푸터의 다른 글자들은 13~15다. */
.contact {
  color: var(--text);
  text-decoration: none;
  font-size: 14px;
}

.contact:hover {
  color: var(--accent-strong);
}

/* 다른 도구(Edgetree) 안내를 살짝 강조 - 옅은 파랑 틴트 알약으로 감싸 다른 푸터 줄과
   구분하고, 링크는 볼드로 올린다(2026-07-24). 내용 폭만큼만 감싸게 inline-block. */
.other {
  display: inline-block;
  font-size: 15px;
  margin-bottom: 12px;
  padding: 8px 20px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--accent-bg);
}

.other a {
  color: var(--accent-strong);
  font-weight: 700;
  text-decoration: none;
}

.other a:hover {
  text-decoration: underline;
}

.credits {
  font-size: 13px;
  opacity: 0.55;
  margin-bottom: 6px;
}

.credits a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
}

.credits a:hover {
  color: var(--accent-strong);
}

.copyright {
  font-size: 14px;
  opacity: 0.6;
}

/* credits 링크와 같은 처리 - 색을 따로 주지 않고 옅은 밑줄만 둬서, 있는 줄은 알되
   저작권 줄보다 앞으로 나오지 않게 한다. */
.copyright a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
}

.copyright a:hover {
  color: var(--accent-strong);
}
</style>
