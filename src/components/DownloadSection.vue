<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { track } from '@vercel/analytics'
import { t } from '../i18n'

// 폰으로 들어온 사람에게 다음 걸음을 준다.
//
// 방문자의 46%가 모바일인데(2026-07-26 실측: Android 23 + iOS 23), 그 절반은 여기서 할 수 있는
// 일이 없어 그냥 나갔다. 못 받는다고 말하는 대신 주소를 쥐여 준다 - 받을 수 없다는 사실은 어차피
// 곧 알게 되고, 그때 손에 아무것도 없는 것이 문제였다.
//
// 복사하는 주소에는 UTM을 붙이지 않는다. 지금 페이지 주소를 그대로 복사하면 유입 표시가 따라
// 퍼져 나가, 나중에 그 사람이 PC에서 연 것까지 원래 채널에서 온 것으로 잡힌다.
const SITE = 'https://tabstick.com/'

const copied = ref(false)
let clear: ReturnType<typeof setTimeout> | undefined

async function copySite() {
  // 폰으로 온 사람이 여기서 멈추지 않고 PC로 넘어갈 뜻을 보인 순간. 방문자의 절반 이상이
  // 모바일인데 그들은 받을 수가 없으므로, 이 버튼이 눌리는지가 그 절반을 건지고 있는지를
  // 말해 준다(2026-07-27, 지금까지는 눌리는지조차 몰랐다).
  //
  // **성공과 실패를 갈라 센다(2026-07-30).** 그전에는 누르기 전에 한 번 찍어서 "눌렀다"만 알았고,
  // 주소가 실제로 손에 들어갔는지는 몰랐다. 이 구분이 필요한 이유는 브라우저 표에 있다 -
  // 방문자의 21%(845명)가 **X 앱 안의 인앱 브라우저**로 들어오는데, 인앱 브라우저는 클립보드
  // 접근이 막히는 일이 흔하다. 막혔다면 그 사람은 누르고도 아무것도 못 가져갔고 체크 표시도
  // 못 봤으니 고장으로 읽혔을 것이다.
  //
  // 다음 창에서 ok=no가 많으면 클립보드 자체가 안 되는 것이므로 다른 길(공유 시트, 브라우저로
  // 열기 안내)을 봐야 하고, ok=yes가 대부분이면 문제는 "안 누른다"는 쪽이라 단추의 자리와
  // 문구를 봐야 한다. 지금은 둘 중 어느 쪽인지 모르는 상태다.
  try {
    await navigator.clipboard.writeText(SITE)

    copied.value = true
    clearTimeout(clear)
    clear = setTimeout(() => (copied.value = false), 2000)

    track('copy_link', { ok: 'yes' })
  } catch {
    // 클립보드가 막힌 브라우저(구형·비보안 컨텍스트·인앱)에서도 주소는 화면에 그대로 적혀 있어
    // 손으로 골라 복사할 수 있다. 그래서 화면에는 따로 알릴 것이 없다 - 세기만 한다.
    track('copy_link', { ok: 'no' })
  }
}

onUnmounted(() => clearTimeout(clear))

// 릴리즈 공개 전이라 링크는 비워 둔다(버튼은 '준비 중'으로 비활성). 공개 때 ready=true로 바꾸고
// 각 href를 채우면 끝 - 레이아웃·문구는 그대로다.
const ready = true

// 표시용 버전(배지 "v1.0.2")과 릴리즈 태그(v1.0.2)는 여기. channel이 비면 (Beta) 알약이 사라진다 -
// 2026-07-26에 뗐다(개인 프로그램의 베타 표기가 "덜 만든 것"으로 읽힌다는 지적).
const version = '1.4.3'
const channel = ''

/**
 * 업데이트 내역. 새 판이 i18n의 맨 위에 얹히고, 지난 판은 꺾쇠로 넘겨 본다.
 *
 * **아직 안 올라간 판은 감춘다.** 예전에는 notesVersion 상수를 따로 두고 "내역 먼저, 파일이
 * 올라간 날 version을 맞춘다"로 손으로 맞췄는데, 둘 중 하나만 올리면 없는 파일을 광고하거나
 * 지난 내역이 새 버전 카드로 남았다. 이제는 version보다 높은 덩이를 여기서 걸러내므로,
 * 1.0.4 내역을 미리 적어 두어도 version이 1.0.3인 동안은 나오지 않는다.
 */
const rank = (v: string) => v.split('.').map(Number)

const atOrBelow = (v: string) => {
  const a = rank(v)
  const b = rank(version)

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? 0) - (b[i] ?? 0)
    if (d !== 0) return d < 0
  }
  return true
}

const notes = computed(() => t.value.download.notes.filter((n) => atOrBelow(n.version)))

// 0이 가장 최신. 언어를 바꿔도 덩이 수가 같으므로 보던 자리가 유지된다.
const noteAt = ref(0)

const note = computed(() => notes.value[Math.min(noteAt.value, notes.value.length - 1)])

// 자산명 규칙: TabStick-<fileVer>-win-x64-<...>. 베타 땐 파일명에만 b를 붙였고(1.0.0b),
// 정식부터는 version과 같다.
const fileVer = version
const base = `TabStick-${fileVer}-win-x64`

// GitHub 릴리즈 자산으로 직접 링크. 태그는 v<version>, 파일명은 base.
//
// ⚠ **세 이름이 릴리즈에 올린 파일명과 글자 하나까지 같아야 한다.** 여기가 어긋나면 링크가
// 404로 죽는데, 페이지는 멀쩡해 보여서 받으려는 사람만 안다. 실제로 경량이 1.0.5에서
// `-win-x64.exe`→`-win-x64-light.exe`로 바뀌었는데 여기를 안 고쳐, 그 판이 나가 있는 내내
// 경량만 404였다(2026-07-29, 제보로 발견). **버전을 올릴 때 이름 규칙도 함께 확인할 것.**
const relBase = `https://github.com/legendsteel11/tabstick-app/releases/download/v${version}`
const dl = {
  setup: { size: '49 MB', file: `${base}-setup.exe`, href: `${relBase}/${base}-setup.exe` },
  portable: { size: '64 MB', file: `${base}-portable.zip`, href: `${relBase}/${base}-portable.zip` },
  light: { size: '5 MB', file: `${base}-light.exe`, href: `${relBase}/${base}-light.exe` },
}
// t는 computed(ComputedRef)라 <script setup> 최상단에서 t.download를 만지면 undefined다.
// 라벨은 템플릿에서 t를 참조한다(템플릿은 ref를 자동 언랩한다).

/// 어느 빌드를 받아 갔는지 남긴다.
///
/// 지금까지는 GitHub 릴리즈의 다운로드 수와 방문자 수를 눈으로 견줘 짐작했다. 그 둘은 기간도
/// 기준도 달라서(릴리즈는 판마다 끊기고 봇도 섞인다) 전환율이라 부를 수 있는 값이 아니었다.
/// 여기서 찍으면 같은 화면 안에서 방문 → 다운로드가 이어진다.
///
/// 링크를 막지 않는다(preventDefault 없음). 받는 링크는 페이지를 떠나게 하지 않고 브라우저가
/// 내려받기만 시작하므로, 이벤트가 잘릴 자리가 없다.
function trackDownload(build: 'setup' | 'portable' | 'light') {
  if (!ready) return

  track('download', { build, version })
}
</script>

<template>
  <section id="download">
    <div class="container">
      <div class="section-heading">
        <!-- 다운로드 제목과 초록 메모 든 고양이를 한 줄에, 세로 가운데 정렬. -->
        <div class="title-row">
          <h2>{{ t.download.title }}</h2>
          <img class="memo-cat" src="/screenshots/cat-memo.png" alt="" aria-hidden="true"
               width="22" height="16" />
        </div>
      </div>

      <!-- 이번 판에 무엇이 생겼는가. 제목 아래, 단추 바로 위에 둔다 - 받을지 정하기 직전에
           보는 자리라 새로 생긴 기능만 올린다. 고친 자리·내부 정리는 여기 올리지 않는다
           (받는 사람에겐 그동안 고장나 있었다는 말로만 읽힌다). -->
      <div class="notes">
        <!-- 지난 판도 꺾쇠로 넘겨 본다(2026-07-29 요청). 꺾쇠는 제목 오른쪽에 붙인다 -
             왼쪽에 두면 판이 쌓일 때 제목이 오른쪽으로 밀려 카드마다 시작선이 달라진다. -->
        <div class="notes-head">
          <span>v{{ note.version }} {{ t.download.notesTitle }}</span>

          <!-- 넘길 판이 없으면 꺾쇠 자체를 안 그린다. 눌러도 아무 일 없는 단추 둘을 띄워 두는 것은
               카드만 복잡하게 한다 - 판이 쌓이면 그때 저절로 나타난다. -->
          <span v-if="notes.length > 1" class="turns">
            <button type="button" class="turn" :disabled="noteAt >= notes.length - 1"
                    :aria-label="t.download.notesOlder" @click="noteAt++">‹</button>
            <button type="button" class="turn" :disabled="noteAt === 0"
                    :aria-label="t.download.notesNewer" @click="noteAt--">›</button>
          </span>
        </div>

        <ul>
          <li v-for="line in note.items" :key="line">{{ line }}</li>
        </ul>
      </div>

      <!-- 모바일에서만 뜨는 안내. 다운로드 단추 '위'에 둔다 - 눌러 보고 나서 안 되는 것을
           아는 것보다, 누르기 전에 다음 걸음을 아는 편이 낫다. -->
      <div class="handoff">
        <p>{{ t.download.mobileNote }}</p>
        <div class="handoff-row">
          <code>tabstick.com</code>
          <button type="button" @click="copySite">
            {{ copied ? t.download.copied : t.download.copyLink }}
          </button>
        </div>
      </div>

      <!-- 히어로: 설치 버전. 대부분 여기로 오므로 시선을 독점한다(채운 강조색 + 디스크 아이콘). -->
      <a class="hero" :class="{ 'is-disabled': !ready }" :href="ready ? dl.setup.href : undefined"
         :aria-disabled="!ready" @click="trackDownload('setup')">
        <span class="hero-main">
          <span class="hero-icon" aria-hidden="true">
            <!-- 디스크(저장) 아이콘 -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
              <path d="M8 3v5h6V3" />
              <rect x="8" y="13" width="8" height="8" rx="1" />
            </svg>
          </span>
          <span class="hero-body">
            <span class="hero-title">
              {{ t.download.setupTitle }}
              <span class="badge">{{ t.download.recommend }}</span>
            </span>
            <span class="hero-desc">{{ t.download.setupDesc }}</span>
          </span>
          <span class="hero-cta">
            <span class="cta-label">{{ ready ? t.download.cta : t.download.pending }}</span>
            <span class="size">{{ dl.setup.size }}</span>
          </span>
        </span>

        <!-- 설치본 파일명 + 버전. 카드 안 하단, 구분선과 함께. 규칙: TabStick-<ver>-win-x64-setup.exe + (Beta). -->
        <span class="hero-meta">
          <code>{{ dl.setup.file }}</code>
          <span class="ver">v{{ version }}<span v-if="channel" class="beta">{{ channel }}</span></span>
        </span>
      </a>

      <!-- 보조 둘: 무설치 / 경량. 한 단 작고 옅게. -->
      <div class="alt-grid">
        <a class="alt" :class="{ 'is-disabled': !ready }" :href="ready ? dl.portable.href : undefined"
           :aria-disabled="!ready" @click="trackDownload('portable')">
          <span class="alt-icon" aria-hidden="true">
            <!-- 상자(포터블) 아이콘 -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2 3 7v10l9 5 9-5V7z" />
              <path d="M3 7l9 5 9-5" />
              <path d="M12 12v10" />
            </svg>
          </span>
          <span class="alt-title">{{ t.download.portableTitle }}</span>
          <span class="alt-desc">{{ t.download.portableDesc }}</span>
          <span class="alt-cta">{{ ready ? t.download.cta : t.download.pending }} · {{ dl.portable.size }}</span>
        </a>

        <a class="alt" :class="{ 'is-disabled': !ready }" :href="ready ? dl.light.href : undefined"
           :aria-disabled="!ready" @click="trackDownload('light')">
          <span class="alt-icon" aria-hidden="true">
            <!-- 번개(경량) 아이콘 -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
            </svg>
          </span>
          <span class="alt-title">{{ t.download.lightTitle }}</span>
          <span class="alt-desc">{{ t.download.lightDesc }}</span>
          <span class="alt-cta">{{ ready ? t.download.cta : t.download.pending }} · {{ dl.light.size }}</span>
        </a>
      </div>

      <!-- 접이식 "메모리 사용량이 커 보이나요?"는 2026-07-26에 뺐다 - 접어 뒀어도 다운로드
           버튼 바로 아래에서 먼저 변명을 꺼내는 꼴이었다.

           2026-07-28에 메모리 이야기가 이 자리로 돌아왔지만 방향이 반대다: 그때 뺀 것은
           "커 보이나요?"라는 문제 제기였고, 지금 있는 것은 "경량을 고르면 작다"는 선택지다.
           큰 쪽 숫자는 꺼내지 않는다 - 묻지 않은 사람에게 걱정을 쥐여 주지 않기 위해서다. -->

      <!-- 두 앱을 함께 쓰는 사람을 위한 팁도 겸한다: .NET 8 한 번 설치 → 양쪽 경량 버전.
           Edtree 앱엔 반대로 TabStick을 가리키게. -->
      <p class="cross-tip">{{ t.download.bothApps }}</p>

      <p v-if="!ready" class="soon">{{ t.download.soon }}</p>
      <p class="requirement">{{ t.download.requirement }}</p>

      <div class="disclaimers">
        <p>{{ t.download.smartscreenNote }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 배경·가로선 규칙은 ScreenshotCards 주석에 - 히어로 아래 모든 섹션이 자기 위에 선을 하나 갖는다.
   이 선은 원래 여기만 따로 있었다. '드리는 말씀' 섹션을 빼면서 사용방법과 다운로드가 그냥
   이어져 버려 급히 넣은 것인데(2026-07-26), 2026-07-28에 전 섹션이 같은 규칙을 갖게 되면서
   예외가 아니라 규칙의 일부가 됐다. 배경은 따로 정하지 않아 body(--bg)를 그대로 받는다. */
#download {
  border-top: 1px solid var(--border);
}

/* 모바일 안내. 손가락으로 쓰는 기기에서만 보인다 - 화면 폭이 아니라 입력 방식으로 가른다
   (창을 좁힌 데스크톱에는 뜨지 않는다). */
.handoff {
  display: none;
}

@media (hover: none) and (pointer: coarse) {
  .handoff {
    display: block;
    max-width: 620px;
    margin: 0 auto 16px;
    padding: 14px 16px;
    background: var(--accent-bg);
    border-radius: 12px;
    text-align: center;
  }
}

.handoff p {
  font-size: 14px;
  line-height: 1.6;
  /* 문구 안의 줄바꿈을 그대로 살린다 - 두 문장을 한 줄로 이으면 좁은 화면에서 아무 데서나
     접혀 "PC에서" 같은 말이 줄 끝에 걸린다. */
  white-space: pre-line;
  color: var(--accent-strong);
  margin-bottom: 10px;
}

.handoff-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.handoff code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--bg);
  color: var(--text-strong);
  user-select: all;
}

.handoff button {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border: 0;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* ---------- 업데이트 내역 ---------- */
/* 단추 바로 위에 서지만 단추보다 조용해야 한다 - 카드 배경·가는 테두리로 두고, 색을 채운
   히어로가 시선을 그대로 가져가게 둔다. 폭은 히어로와 같은 620이라 한 기둥으로 읽힌다. */
.notes {
  max-width: 620px;
  margin: 0 auto 18px;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-align: left;
}

.notes-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  color: var(--accent-strong);
  margin-bottom: 10px;
}

/* 꺾쇠 둘은 제목 오른쪽에 붙여 한 묶음으로 둔다. */
.turns {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-left: 2px;
}

/* 판을 넘기는 꺾쇠. 제목과 같은 색이되 한 겹 물러나 있는다 - 있는 줄은 알되 제목보다 먼저
   눈에 들지는 않게. 글자가 작아 잘 안 보이므로 제목보다 한 호 키우고, 누를 자리도 넉넉히 준다. */
.turn {
  font-family: inherit;
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity 0.15s ease;
}

.turn:hover:not(:disabled),
.turn:focus-visible:not(:disabled) {
  opacity: 1;
}

/* 갈 곳이 없는 쪽. 자리는 지키되 눌리지 않는다는 것이 보이는 선까지만 죽인다 -
   너무 흐리면 아예 없는 것으로 읽혀 반대쪽 꺾쇠도 못 찾는다. */
.turn:disabled {
  opacity: 0.3;
  cursor: default;
}

.notes ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/* 점은 ::marker 대신 직접 찍는다 - 접힌 줄이 점 아래로 파고들지 않게 본문을 들여쓰고
   점만 그 왼쪽에 세운다. */
.notes li {
  position: relative;
  padding-left: 15px;
  font-size: 15.5px;
  line-height: 1.65;
  opacity: 0.85;
}

/* 각 판의 첫 줄은 그 판을 대표하는 기능이다. 나머지와 같은 세기로 두면 목록에 묻힌다 -
   흐림만 걷고 한 눈금 굵혀, 훑어보는 눈이 먼저 걸리게 한다. 새 판을 적을 때도 대표
   기능을 맨 위에 두면 이 규칙이 그대로 듣는다. */
.notes li:first-child {
  opacity: 1;
  font-weight: 600;
}

.notes li::before {
  content: '·';
  position: absolute;
  left: 2px;
  color: var(--accent-strong);
  font-weight: 700;
}

.memo-cat {
  display: block;
  flex-shrink: 0;
}

/* ---------- 히어로(설치) ---------- */
.hero {
  display: flex;
  flex-direction: column;
  max-width: 620px;
  margin: 0 auto;
  padding: 24px 28px;
  background: var(--accent);
  color: #fff;
  border-radius: 16px;
  text-decoration: none;
  box-shadow: 0 10px 26px var(--accent-bg);
}

.hero-main {
  display: flex;
  align-items: center;
  gap: 22px;
}

.hero-icon svg {
  width: 40px;
  height: 40px;
  display: block;
}

.hero-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.hero-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
}

.badge {
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.22);
  padding: 2px 9px;
  border-radius: 999px;
}

.hero-desc {
  font-size: 15px;
  opacity: 0.92;
  line-height: 1.5;
}

.hero-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 10px 20px;
  background: #fff;
  color: var(--accent-strong);
  border-radius: 10px;
  white-space: nowrap;
}

.hero-cta .cta-label {
  font-size: 15px;
  font-weight: 700;
}

.hero-cta .size {
  font-size: 12px;
  opacity: 0.65;
}

/* 설치본 파일명 + 버전(Beta). 파일명은 모노스페이스 칩, 버전은 강조색, Beta는 앱 캡션처럼 흐린 알약. */
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 13px;
}

.hero-meta code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12.5px;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  word-break: break-all;
}

.hero-meta .ver {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #fff;
}

.hero-meta .beta {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  opacity: 0.9;
  border: 1px solid rgba(255, 255, 255, 0.45);
  padding: 1px 6px;
  border-radius: 999px;
}

/* ---------- 보조(무설치 / 경량) ---------- */
.alt-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 620px;
  margin: 16px auto 0;
}

.alt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.alt-icon svg {
  width: 26px;
  height: 26px;
  display: block;
  color: var(--accent-strong);
  opacity: 0.85;
}

.alt-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-strong);
}

.alt-desc {
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.7;
}

.alt-cta {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-strong);
}

/* 링크가 아직 없을 때: 클릭 여지를 지우되 히어로는 여전히 눈에 들어오게 둔다. */
.is-disabled {
  cursor: default;
}

.hero.is-disabled .hero-cta,
.alt.is-disabled .alt-cta {
  opacity: 0.8;
}

/* ---------- 메모리 설명(접이식) ---------- */
/* 두 앱 함께 쓰는 사람용 팁. 경고(스마트스크린)와 달리 도움 제안이라 옅은 강조색 상자로 둔다.
   접이식 메모리 설명이 있던 자리라, 버튼 묶음과의 간격은 그쪽이 쓰던 24를 물려받는다. */
.cross-tip {
  max-width: 560px;
  margin: 24px auto 0;
  padding: 10px 16px;
  background: var(--accent-bg);
  border-radius: 10px;
  text-align: center;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--accent-strong);
}

/* ---------- 아래 안내 ---------- */
.soon {
  text-align: center;
  margin-top: 22px;
  font-size: 15px;
  color: var(--accent-strong);
  font-weight: 600;
}

.requirement {
  text-align: center;
  margin-top: 6px;
  font-size: 14px;
  opacity: 0.7;
}

.disclaimers {
  max-width: 560px;
  margin: 12px auto 0;
  text-align: center;
}

.disclaimers p {
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.7;
}

@media (max-width: 600px) {
  .hero-main {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .hero-body {
    text-align: center;
    align-items: center;
  }

  .hero-cta {
    width: 100%;
  }

  .hero-meta {
    justify-content: center;
  }

  .alt-grid {
    grid-template-columns: 1fr;
  }
}
</style>
