// 빌드 뒤에 돈다(package.json의 build). dist/index.html(영어)을 바탕으로 dist/ko/index.html과
// dist/ja/index.html을 만든다 - 같은 앱, 다른 <html lang>·제목·설명·og·canonical.
//
// **왜 HTML을 셋 두는가.** 페이지 안의 글은 브라우저 언어로 바뀌지만 검색엔진은 그 전 단계의
// HTML을 읽는다. 한 벌이면 구글 국문 검색에도 영어 제목·설명이 뜬다(2026-08-27에 확인).
// 주소마다 그 언어의 메타가 박힌 HTML이 있어야 셋이 따로 색인된다. 세 HTML이 서로를 가리키는
// hreflang은 index.html에 정적으로 있어 여기서 손댈 것이 없다.
//
// ⚠ 아래 문구는 i18n.ts의 검수된 줄(eyebrow·tagline·badges)을 조합한 것이다. 새 문장을 여기서
//   지어내지 않는다 - 검수를 안 거친 글이 검색 결과에 먼저 나가는 자리라서다. 그쪽이 바뀌면
//   여기도 같이 본다.
// ⚠ 자산 경로는 Vite가 `/assets/...`로 절대 경로를 내므로 `/ko/`에서도 그대로 통한다.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const SITE = 'https://www.tabstick.com'

const dist = new URL('../dist/', import.meta.url)
const source = readFileSync(new URL('index.html', dist), 'utf8')

const META = {
  ko: {
    locale: 'ko_KR',
    title: 'TabStick - Windows 인덱스 스티커 메모',
    description:
      '메모를 바탕화면이 아니라, 그 메모가 필요한 창 옆에 붙입니다. 무료이고 광고가 없으며, 메모는 내 PC에만 저장됩니다.',
  },
  ja: {
    locale: 'ja_JP',
    title: 'TabStick - Windows用 インデックスメモ',
    description:
      'メモを貼るのは、デスクトップではなく、そのメモが必要なウィンドウのとなり。無料・広告なし・メモはPCの中だけ。',
  },
}

/** 딱 한 번 맞아야 한다. 0이면 index.html이 바뀐 것이고, 둘 이상이면 엉뚱한 곳까지 갈아 끼운다. */
function swapOnce(html, pattern, replacement, what) {
  const count = (html.match(pattern) ?? []).length
  if (count !== 1) throw new Error(`localize: ${what} 자리가 ${count}곳 - index.html이 바뀌었나?`)

  return html.replace(pattern, replacement)
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

for (const [code, m] of Object.entries(META)) {
  const url = `${SITE}/${code}/`
  let html = source

  html = swapOnce(html, /<html lang="en">/, `<html lang="${code}">`, 'html lang')
  html = swapOnce(html, /<title>[^<]*<\/title>/, `<title>${m.title}</title>`, 'title')
  html = swapOnce(
    html,
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(m.description)}"`,
    'description',
  )
  html = swapOnce(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`, 'canonical')
  html = swapOnce(html, /property="og:locale" content="[^"]*"/, `property="og:locale" content="${m.locale}"`, 'og:locale')
  html = swapOnce(html, /property="og:url" content="[^"]*"/, `property="og:url" content="${url}"`, 'og:url')
  html = swapOnce(html, /property="og:title" content="[^"]*"/, `property="og:title" content="${escapeAttr(m.title)}"`, 'og:title')
  html = swapOnce(
    html,
    /property="og:description" content="[^"]*"/,
    `property="og:description" content="${escapeAttr(m.description)}"`,
    'og:description',
  )

  const dir = new URL(`${code}/`, dist)
  mkdirSync(dir, { recursive: true })
  writeFileSync(new URL('index.html', dir), html)

  console.log(`localize: dist/${code}/index.html`)
}
