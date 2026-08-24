import { ref, computed, watchEffect } from 'vue'

export type Lang = 'ko' | 'en' | 'ja'

const STORE_KEY = 'tabstick.lang'

const isLang = (v: unknown): v is Lang => v === 'ko' || v === 'en' || v === 'ja'

/**
 * 처음 열었을 때 어느 말로 맞이할지.
 *
 * 그 전에는 누가 와도 한국어로 시작했다. 일본어를 넣는 까닭이 일본 소개 채널에 등록하는
 * 것인데, 거기서 온 사람이 한국어 첫 화면을 받고 오른쪽 구석의 작은 단추를 스스로 찾아야
 * 한다면 그 등록이 헛돈다.
 *
 * 차례는 **고른 것 → 브라우저 언어 → 영어**다.
 * - 한 번이라도 직접 고른 적이 있으면 그것이 이긴다. 감지가 틀렸을 때 되돌릴 길이기도 하다.
 * - 모르는 언어는 **한국어가 아니라 영어**로 간다. 읽을 가능성이 그쪽이 높다.
 * ⚠ 사생활 보호 모드에서는 저장소를 읽고 쓰는 것 자체가 예외를 던진다. 막히면 감지로 넘어갈
 *   뿐이고 페이지는 그대로 선다.
 */
function pickInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORE_KEY)
    if (isLang(saved)) return saved
  } catch {
    // 저장소가 막혔다. 아래 감지로 간다.
  }

  const tags = navigator.languages?.length ? navigator.languages : [navigator.language]

  for (const tag of tags) {
    const base = String(tag).toLowerCase().split('-')[0]
    if (base === 'ko' || base === 'ja' || base === 'en') return base
  }

  return 'en'
}

export const lang = ref<Lang>(pickInitial())

/** 브라우저·스크린리더에도 알린다. 글꼴 대체와 읽는 말씨가 이 값을 본다. */
watchEffect(() => {
  document.documentElement.lang = lang.value
})

/** 머리에 세우는 차례. 단추가 이 차례로 선다. */
export const langs: readonly Lang[] = ['ko', 'en', 'ja']

/** 단추에 적는 한 글자. 그 언어를 찾는 사람이 읽을 수 있는 글자여야 한다. */
export const langLabel: Record<Lang, string> = { ko: '한', en: 'EN', ja: '日' }

/** 스크린리더가 읽는 이름. 가려는 언어로 적는다. */
export const langSwitchLabel: Record<Lang, string> = {
  ko: '한국어로 전환',
  en: 'Switch to English',
  ja: '日本語に切り替え',
}

export function setLang(next: Lang) {
  lang.value = next

  // 직접 고른 것은 기억한다. 새로고침하거나 다시 찾아와도 그 말로 선다.
  try {
    localStorage.setItem(STORE_KEY, next)
  } catch {
    // 저장소가 막혀도 이번 방문 동안은 고른 말로 보인다.
  }
}

const dict = {
  ko: {
    nav: {
      why: '제작동기',
      screenshots: '특징',
      features: '기타기능',
      howto: '사용방법',
      download: '다운로드',
      faq: '자주 묻는 질문',
    },
    hero: {
      eyebrow: 'Windows 인덱스 스티커 메모',
      title: 'TabStick',
      tagline: '메모를 바탕화면이 아니라, 그 메모가 필요한 “창” 옆에 붙입니다.',
      // "전송하지 않습니다"가 아니라 "내 PC에만"이다 - 같은 사실인데 앞은 없는 것을,
      // 뒤는 만들어 둔 것을 말한다. 셋을 한 줄에 두어 약속 목록이 아니라 성격 표시로 읽히게.
      badges: ['무료', '광고 없음', '메모는 내 PC에만'],
    },
    why: {
      title: '왜 만들게 되었나요?',
      items: [
        // 2026-07-27에 맨 앞에 한 줄 더했다. 나머지가 "있으면 편한 일"인 데 반해 이것은
        // 손해가 나는 일이라 앞에 세운다. 홀수가 되어 첫 항목만 가운데 한 칸으로 선다
        // (WhySection의 :first-child 규칙).
        '카톡 대화 중에 실수한 경험을 다시는 하고 싶지 않았습니다.',
        'AI와 대화할 때, 대화 작성 중에 잘못 엔터를 눌러 토큰 낭비하는 게 싫었습니다.',
        '모니터 옆에 붙여놓은 스티커메모가 자주 떨어져 불편했습니다.',
        '레시피 하나 보려고 재료와 조리법 사이를 스크롤 하는 것이 귀찮았습니다.',
        '보다 끊긴 유튜브를 기록 검색창에서 찾는 것이 번거로웠습니다.',
      ],
    },
    screenshots: {
      title: '특징',
      items: [
        // 2026-07-27 추가. 실사용자가 발견해서 알려준 쓰임새인데 어디에도 안 적혀 있었다 -
        // 나머지 카드는 전부 "메모가 창을 따라간다"인 반면 이건 "창이 메모를 따라온다"다.
        {
          title: '겹친 창도 스티커 한 번으로-',
          desc: '창을 여러 개 띄워 두어도, 스티커를 누르면 그 창이 바로 앞으로 나옵니다. 작업 표시줄에서 비슷한 아이콘을 뒤질 필요 없이 색으로 찾으세요.',
        },
        {
          title: '모든 스티커는 창과 함께-',
          // '팔레트로 돌아온다'만으로는 스티커만 돌아오고 글은 날아간 것으로 읽힐 수 있어
          // 한 줄 더한다(2026-07-28). 앞 문장에 '종료'가 이미 있어 뒤는 '닫아도'로 받는다.
          desc: '창과 같이 움직이고, 창과 함께 최소화 되고, 창이 종료되면 팔레트로 돌아옵니다. 실수로 닫았더라도 쓰던 내용은 그대로 남아 있습니다.',
        },
        {
          title: '단 9개의 스티커로 관리-',
          desc: '스티커메모는 9개로 관리하세요. 색으로 기억하고, 쓰고 지우며 다시 쓰다가 중요한 것만 별도로 저장하면 됩니다.',
        },
        {
          title: '원하는 방향, 원하는 위치-',
          desc: '원하는 창에 최대 3개를 붙이고, 각각 메모를 펼쳐 사용할 수 있습니다. 붙이고 나면 창의 좌, 우, 안, 밖으로 옮길 수 있습니다. 물론 위아래로 움직일 수 있습니다.',
        },
        {
          title: '보고 있는 창에서 바로 메모로-',
          // 끌어다 놓기는 따로 구현한 것이 아니라 WPF TextBox가 원래 받는 동작이다.
          // 코드에 Drop 핸들러가 없다고 안 되는 것으로 넘겨짚지 말 것(2026-07-28 실측 확인).
          desc: '유튜브 주소, 텍스트를 바로 메모로 옮겨 놓으세요. 링크는 Ctrl+클릭으로 바로 이동할 수 있습니다. 반대로 창에서 주소나 글을 끌어다 메모에 놓으면 그대로 옮겨집니다.',
        },
        {
          title: '세가지 팔레트 모양과 크기-',
          desc: '기본형, 가로형, 세로형, 그리고 크기를 취향대로 선택하세요. 팔레트는 트레이 메뉴에서 언제든지 다시 불러올 수 있습니다.',
        },
        // 2026-08-03 추가. 기타기능·사용방법에도 같은 얘기가 있는데, 여기는 '특징'이라
        // 겹쳐도 된다 - 저쪽은 찾아보는 자리고 여기는 보여주는 자리다.
        // 일곱 번째라 3열 마지막 줄에 홀로 서고 두 칸이 빈다.
        {
          title: '원하는 색과 형식으로-',
          desc: '원하는 메모색, 글자색으로 마음껏 미리 정해두고 사용할 수 있습니다. 또 자주 쓰는 기호로 형식을 지정하거나 체크박스를 사용할 수 있습니다.',
        },
        // 2026-08-05 추가(v1.2.0). 캡처는 장 보는 페이지에 붙은 메모라, 무엇에 쓰는지가
        // 문장보다 그림에서 먼저 읽힌다.
        {
          title: '메모 안에서 바로 계산-',
          desc: '숫자가 들어있는 행들을 선택한 상태에서 우클릭 메뉴의 연산기호를 선택하면 답을 아래쪽에 표시합니다. 2500 * 4 처럼 적은 행들을 선택한 후 +를 누르면 미리 곱한 후 합산되며, 제일 위에 예산을 적고 전부 선택한 후 -를 누르면 잔액이 계산됩니다.',
        },
        // 2026-08-21 추가(v2.0.0). 캡처는 메모에 캐릭터가 앉은 모습과 그것을 고르는 창을
        // 함께 담았다 - 어디서 정하는지가 그림에 같이 나온다.
        {
          title: '메모에 간단한 이미지를-',
          desc: '메모 하단에 이미지를 배경으로 넣을 수 있습니다. 캐릭터 이미지가 함께 들어 있고, 원하는 이미지 파일을 선택할 수 있습니다. 크기와 투명도, 배치를 조정할 수 있습니다.',
        },
        // '편리한 앱 메뉴' 카드는 2026-07-27에 뺐다. 관리 화면이 있다는 얘기라 어느 앱에나
        // 있는 것이고, 받을 이유를 만드는 힘이 여섯 중 제일 약했다. 캡처 spc-06은
        // 파일로 남겨 뒀다.
      ],
    },
    features: {
      title: '기타기능',
      items: [
        { title: '메모 잠금', desc: '중요한 메모는 잠시 잠가둘 수 있습니다. 잠긴 메모는 잠금을 풀 때까지 수정하거나 지울 수 없습니다.' },
        // 2026-08-18에 들어왔다. '메모 잠금' 바로 옆에 세운다 - 앱에서도 이 둘은 '편집 잠금 /
        // 전체 잠금'으로 갈라 부르는 한 갈래이고(Strings.cs 주석), 떨어뜨려 놓으면 카드를 읽는
        // 사람이 같은 기능의 두 이름으로 받는다.
        { title: '전체 잠금', desc: '자리를 비울 때 전체 잠금을 선택하면 부착된 메모가 한 번에 접히고 잠깁니다. 팔레트와 트레이 메뉴 양쪽에서 사용할 수 있습니다.' },
        // 저장과 백업을 한 칸에 합쳤다(2026-07-28). 둘 다 '알아서 남긴다'는 한 얘기라
        // 따로 세울 때보다 붙여 놓는 편이 뜻이 선명하고, 그 자리에 자동 시작이 들어왔다.
        { title: '자동 저장·백업', desc: '글자를 입력하거나 바꿀 때 자동으로 저장되고, 앱을 종료하거나 내용을 삭제할 때는 따로 백업을 남깁니다.' },
        // 2026-08-18. 사용방법 6단계에 '파일로 내보내거나' 한 마디로 묻혀 있던 것을 꺼냈다.
        // 앞 칸(자동 저장·백업)과 나란히 둔다 - '앱이 알아서 남기는 것' 다음에 '내가 꺼내 가는
        // 것'이 오는 차례다.
        { title: '파일로 내보내기', desc: '스티커 관리에서 아홉 개의 메모를 한자리에서 확인하고, TXT나 CSV 파일로 내보낼 수 있습니다.' },
        // 2026-08-03에 들어왔다. '편집 기능'(우클릭으로 기호·구분선 입력)이 있던 자리인데,
        // 그 카드가 말하던 것을 이 카드가 넓혀서 담는다 - 둘을 나란히 두면 사용자 눈에는
        // 같은 얘기가 두 번이다.
        { title: '목록과 체크박스', desc: '여러 줄을 선택해 기호를 누르면 각 줄 앞에 붙습니다. 할 일에는 체크박스를 달아 Ctrl+클릭으로 사용하세요.' },
        { title: '메모 색 만들기', desc: '메모지 색을 취향대로 바꿔 보세요. 여섯 칸마다 배경색과 글자 색을 프리셋으로 만들고 언제든지 선택해 사용할 수 있습니다.' },
        { title: '스티커 찾기', desc: '팔레트에서 떠난 스티커를 추적하고 회수할 수 있습니다.' },
        // 2026-08-18. '자동 시작' 바로 앞에 세운다 - 부팅으로 시작하면 트레이에서 뜨므로,
        // 두 칸이 이어서 읽혀야 "그러면 팔레트는 어디 갔나"가 그 자리에서 풀린다.
        { title: '트레이 메뉴', desc: '팔레트를 숨겨도 트레이 아이콘은 그대로 남습니다. 우클릭하면 팔레트와 같은 색이 표시되어 스티커를 바로 집을 수 있고, 전체 잠금과 스티커 관리도 여기에 있습니다.' },
        // ⚠ 1.4.5에서 동작이 바뀌었다. 그 전에는 부팅 때도 팔레트가 함께 떴는데, 이제 **부팅으로
        // 시작하면 팔레트 없이 트레이에서** 올라온다. 카드 제목은 '자동 시작'을 두되 본문 첫
        // 마디는 설정의 실제 라벨('윈도우 시작 시 실행')과 맞춘다 - 제목은 기능 이름이고,
        // 설정에서 찾을 사람은 본문의 라벨로 찾는다.
        { title: '자동 시작', desc: '윈도우 시작 시 함께 실행되도록 설정할 수 있습니다. 이 경우 화면을 가리지 않도록 팔레트 없이 트레이에서 시작합니다.' },
        // '설정 기억'은 2026-08-03에 뺐다. 설정이 유지되는 것은 어느 앱에서나 당연해서, 적어
        // 두면 오히려 "안 그런 앱도 있나" 쪽으로 읽힌다. 여섯 칸이 3열에 정확히 떨어지기도 한다.
      ],
    },
    howto: {
      title: '사용방법',
      steps: [
        {
          title: '스티커를 집어 창에 붙이기',
          desc: '팔레트에서 색 하나를 클릭하면 스티커가 커서에 붙습니다. 그대로 원하는 프로그램 창 아무 곳이나 클릭하면 부착됩니다. 옮기는 중에는 우클릭·바탕화면 클릭·ESC로 언제든 취소할 수 있습니다. 팔레트를 숨긴 상태에서는 트레이 아이콘을 우클릭해서 같은 색을 선택할 수 있습니다.',
        },
        {
          title: '가볍게 적기',
          desc: '떠오르는 대로 빠르게 적으세요. 한 글자만 입력해도 자동 저장되고, 링크나 경로는 Ctrl+클릭으로 바로 열립니다.',
        },
        {
          title: '메모 안에서 정리하기',
          desc: '여러 줄을 선택해 우클릭 메뉴에서 기호를 누르면 각 줄 앞에 붙습니다. 할 일 목록은 체크박스를 달아 Ctrl+클릭으로 사용하세요. 글자 크기와 줄 간격, 메모지 색은 메모마다 따로 정할 수 있습니다.',
        },
        {
          title: '메모 자리와 크기 맞추기',
          desc: '스티커 우클릭 메뉴에서 메모를 창의 좌/우, 안/밖으로 보낼 수 있습니다(모든 스티커 공통). 가장자리나 모서리를 끌어 크기를 바꾸고, 더블클릭하면 그 방향에 맞게 자동으로 맞춰집니다 — 아래 변은 높이, 왼쪽 변은 폭, 모서리는 처음 크기로. 크기를 바꿀 때 Shift를 누른 채 끌면 20px 격자에 맞아, 여러 메모를 같은 크기로 맞추기 쉽습니다.',
        },
        {
          title: '떼고, 다시 붙이기',
          desc: '앱을 종료하면 스티커는 팔레트로 돌아옵니다. 붙어 있는 스티커의 메뉴에서 팔레트로 보내거나, 팔레트 빈자리를 우클릭해 회수할 수도 있습니다. 회수한 스티커는 다른 창에 다시 붙이면 됩니다.',
        },
        {
          title: '스티커 관리와 설정',
          desc: '팔레트의 ••• 버튼을 누르면 스티커 관리가 열립니다. 트레이 메뉴에서도 열 수 있습니다. 아홉 메모의 내용을 한자리에서 보고, 파일로 내보내거나 삭제할 수 있습니다. 설정에서는 팔레트 모양, 앱·스티커 크기, 글자 크기와 줄 간격, 메모지 색, 다크/라이트, 언어를 바꿉니다.',
        },
      ],
    },
    // '드리는 말씀'(trust) 섹션은 2026-07-26에 통째로 뺐다 - 다운로드 버튼 바로 위에서 단점·해명을
    // 먼저 꺼내는 자리였다. 문구 원문은 git 이력에 있고, 필요하면 FAQ로 되살린다.
    download: {
      title: '다운로드',
      recommend: '추천',
      cta: '다운로드',
      pending: '준비 중',
      setupTitle: '설치 버전',
      setupDesc: '받아서 클릭 몇 번. 시작 메뉴에 등록되고, 제거도 깔끔합니다.',
      portableTitle: '무설치',
      portableDesc: '압축을 풀고 바로 실행합니다.',
      lightTitle: '경량',
      lightDesc: '.NET 8 데스크톱 런타임이 필요합니다.',
      // 업데이트 내역. 앱이 업데이트 뒤 첫 실행에 띄우는 창과 같은 글이다(EdgeIndex/WhatsNew.cs).
      // 새로 생긴 것을 먼저 적는다 - 고친 자리만 늘어놓으면 받는 사람에게 "그동안 고장나 있었다"로
      // 읽힌다. 다만 쓰던 사람이 실제로 만난 고장은 함께 적는다. 겪은 사람이 노트에서 그것부터 찾는다.
      // **DownloadSection의 notesVersion·version과 함께 올린다.** 내역만 앞서 나가면 새 기능을
      // 광고하면서 링크는 옛 파일을 가리킨다.
      notesTitle: '업데이트 내역',
      // 꺾쇠 단추의 읽어 주는 이름. 화면에는 안 보이고 스크린리더만 읽는다.
      notesOlder: '이전 업데이트 내역',
      notesNewer: '다음 업데이트 내역',
      // 새 판이 나오면 **맨 위에** 한 덩이를 얹는다. 지난 판은 지우지 않는다 - 꺾쇠로 넘겨 본다.
      // DownloadSection이 version보다 높은 덩이는 감추므로, 파일을 올리기 전에 미리 적어 두어도
      // 광고가 앞서 나가지 않는다(예전 notesVersion 상수가 하던 일을 데이터가 스스로 한다).
      // 1.0.2 이하는 싣지 않는다 - 한두 줄 요약뿐이라 목록이 채워 넣은 것처럼 보인다.
      notes: [
        {
          version: '2.1.0',
          items: [
            '메모 배경 이미지를 원하는 위치로 이동할 수 있습니다',
            '이미지 세로 위치가 메모 높이에 따라 자동으로 조정됩니다',
            '이미지의 최대 크기가 더 커졌습니다',
            '메모에서 프리셋 설정을 앱 메뉴 없이 단독으로 불러올 수 있으며 기능이 정리되었습니다',
            '업데이트 후 이미지가 보이지 않거나 위치가 달라진 경우 위치 초기화를 누르세요',
          ],
        },
        {
          version: '2.0.1',
          items: [
            '메모를 우클릭해서 그 메모의 프리셋을 바로 설정할 수 있습니다',
            '메모 우클릭 메뉴가 짧아지고 항목 간격이 정리되었습니다',
            '팔레트를 항상 위에 표시할 때 프리셋 창이 가려지던 문제를 수정했습니다',
            '이미지 크기와 투명도 슬라이더에서 클릭한 위치로 손잡이가 이동합니다',
            '본문이 이미지 영역을 침범하지 않도록 설정했을 때 커서가 이미지 위에 보이던 것을 수정했습니다',
          ],
        },
        {
          version: '2.0.0',
          items: [
            '메모 하단에 배경으로 이미지를 넣을 수 있습니다',
            '캐릭터 이미지 9종이 들어 있고, 원하는 이미지 파일을 선택할 수도 있습니다',
            '배경 이미지의 크기, 투명도, 배치, 좌우반전을 조정할 수 있습니다',
            '프리셋 창에서 변경한 내용을 원래대로 되돌릴 수 있습니다',
            '프리셋 칸에 A부터 F까지 표시되어 비슷한 색도 구분됩니다',
          ],
        },
        {
          version: '1.4.7',
          items: [
            '메모 폭을 조정할 때 스티커가 떨어져 보이던 것을 수정했습니다',
            '스티커를 우클릭해서 설정을 열거나 앱을 종료할 수 있습니다',
          ],
        },
        {
          version: '1.4.6',
          items: [
            '윈도우 시작 시 실행할 때 트레이 아이콘이 나오지 않던 문제를 고쳤습니다',
            '팔레트를 숨긴 채로 종료하면 다음에도 숨긴 채로 시작합니다',
            '팔레트의 ••• 버튼을 휠클릭하면 트레이로 바로 내려갑니다',
            '스티커 우클릭 메뉴가 스티커에서 살짝 떨어져 나옵니다',
          ],
        },
        {
          version: '1.4.5',
          items: [
            '트레이 메뉴가 바깥을 누르면 닫힙니다',
            '윈도우 시작 시 실행하면 팔레트 없이 트레이에서 시작합니다',
            '트레이 메뉴에서 바로 스티커를 집을 수 있습니다',
          ],
        },
        {
          version: '1.4.4',
          items: [
            '긴 메모에서 입력과 스크롤이 훨씬 빨라졌습니다',
            '붙여넣은 글이 한도를 넘어 잘리면 알려 줍니다',
            '메모가 펼쳐져 있을 때 스티커 우클릭 메뉴가 메모를 가리지 않습니다',
          ],
        },
        {
          version: '1.4.3',
          items: [
            '창을 옮길 때 메모가 창에 더 잘 붙어 따라옵니다',
            '메모의 스크롤 막대를 다시 쉽게 잡을 수 있습니다',
            '메모 내용을 전체 선택한 채 크기를 조절하거나 스크롤할 때 훨씬 가벼워졌습니다',
          ],
        },
        {
          version: '1.4.2',
          items: [
            '메모 내용을 전체 선택한 채 크기를 조절할 때 느려지는 문제를 수정했습니다',
          ],
        },
        {
          version: '1.4.0',
          items: [
            '설정의 크기 항목을 한자리에 모으고 [전체 크기]를 더했습니다. 하나만 움직이면 스티커·팔레트·메뉴가 함께 맞춰지고, 그중 하나만 따로 정할 수도 있습니다',
            '팔레트와 트레이에서 [전체 잠금]을 쓸 수 있습니다. 붙여 둔 메모를 한 번에 접고 잠가, 자리를 비울 때 화면을 덮어 둡니다',
            '메모 잠금이 [편집 잠금]으로 이름을 바꾸고 메모 우클릭 메뉴 맨 아래로 옮겼습니다. 적다가 그 자리에서 바로 잠급니다',
            '스티커 우클릭에서 팔레트를 바로 불러올 수 있고, 메모 편집 메뉴에 빈 줄 넣기가 생겼습니다',
            '기능 최적화 및 일부 버그 수정',
          ],
        },
        {
          version: '1.3.0',
          items: [
            '스티커를 우클릭해 그 자리에서 다른 메모로 바꾸거나 한 장 더 붙일 수 있습니다. 첫 스티커를 붙인 후에는 팔레트까지 가지 않아도 됩니다',
            '기능 최적화 및 일부 버그 수정',
          ],
        },
        {
          version: '1.2.1',
          items: [
            '새 판이 나오면 앱이 알려 줍니다. 앱 정보 탭과 트레이 메뉴에서 확인하고 바로 받을 수 있습니다',
            '메모에서 기호·글자 크기·계산 사용이 용이해졌습니다. 선택 영역을 벗어나 우클릭해도 선택이 유지됩니다',
            '기능 최적화 및 일부 버그 수정',
          ],
        },
        {
          version: '1.2.0',
          items: [
            '메모 안에서 바로 계산합니다. 숫자를 선택하고 우클릭 메뉴에서 + − × ÷ %를 사용하면 됩니다',
            '2500 * 4처럼 적은 줄은 곱해서 더합니다. 목록을 그대로 적고 +하여 합계, 제일 위에 예산을 적고 -를 하면 잔액이 산출됩니다',
            '메모 제목 줄이 바로 표시되는 옵션이 추가되었습니다. 메모 제목 줄을 잡고 위치를 이동할 수 있습니다',
            '창이 화면을 꽉 채울 때 스티커를 창 안으로 들일지 선택합니다',
            '기능 최적화 및 일부 버그 수정',
          ],
        },
        {
          version: '1.1.0',
          items: [
            '메모지 색을 직접 만듭니다.(프리셋 기능) 여섯 칸에 배경색과 글자색을 정해 두고 선택해 쓸 수 있습니다.',
            '행 간격을 여덟 단계로 조절합니다',
            '여러 줄을 선택해 기호를 누르면 줄머리 형식을 지정할 수 있습니다',
            '체크박스가 생겼습니다. 네모를 Ctrl+클릭해 켜고 끕니다',
            '가장자리 더블클릭이 폭 맞춤·높이 맞춤으로 단순해졌습니다',
            '스티커 초기화 — 떼기·잠금 해제·비우기를 한 번에 합니다',
            '기능 최적화 및 일부 버그 수정',
          ],
        },
        {
          version: '1.0.8',
          items: [
            '긴 메모에 글을 쓸 때 훨씬 가볍게',
            '한 창의 메모 크기를 같게 맞추는 설정',
          ],
        },
        {
          version: '1.0.7',
          items: [
            '앱 성능 최적화 및 버그 수정',
            '스티커 우클릭 메뉴 항목명 정리',
          ],
        },
        {
          version: '1.0.6',
          items: [
            '창 크기를 조절하거나 옮길 때 더 가볍게 동작',
            '메모 상단이나 제목을 잡고 위아래로 옮기기',
            '펼쳐진 메모의 스티커에 연필 표시',
          ],
        },
        {
          version: '1.0.5',
          items: [
            '편집줄 끝에 커서 위치 개선',
            '입력 커서 및 선택 영역 시인성 개선',
            '스크롤바 시인성 개선',
          ],
        },
        {
          version: '1.0.4',
          items: [
            '팔레트 크기: 작게·보통·크게 → 50~130%',
            '메모 글자 크기 범위를 11~24로 넓힘',
            'Shift + 스티커 클릭 → 메모를 펴지 않고 그 창만 앞으로',
          ],
        },
        {
          version: '1.0.3',
          items: [
            '스티커 우클릭 → 제목 입력 → 메모에 제목이 나타남(바로 편집 가능)',
            '글꼴/메모 배경색 → 메모 우클릭으로 이동',
            '스티커 우클릭 → 다시 집기 추가',
            '윈도우 시작 시 자동실행 옵션 추가',
            '모든 우클릭 메뉴 크기 조절 옵션 추가',
          ],
        },
      ],
      // 줄바꿈은 마크업이 아니라 글의 일부다(.handoff p가 white-space: pre-line).
      mobileNote: 'Windows에서 쓰는 앱입니다.\n주소를 복사해 두었다가 PC에서 열어보세요.',
      copyLink: '주소 복사',
      copied: '복사했습니다',
      soon: '다운로드 링크는 공개 준비 중입니다.',
      // 지원 언어를 여기 함께 적는다(2026-08-05). 프리웨어 아카이브들이 받기 버튼 근처를
      // 긁어 가는데, 어디에도 적혀 있지 않아 oldergeeks 등록 페이지에 "지원 언어: 찾을 수 없음"
      // 으로 실렸다. 이미 아는 사실을 문장으로 세워 두기만 하면 되는 일이다.
      requirement: 'Windows 10 / 11 · 64비트 · 한국어 · English · 日本語',
      // 메모리 이야기는 여기 한 곳에만 둔다(2026-07-28). FAQ에 "메모리가 커 보입니다" 항목을
      // 세우면 걱정하지 않던 사람에게 수치를 먼저 쥐여 주는 꼴이라 뺐다.
      //
      // 경량을 권하지는 않는다 - .NET을 따로 챙겨야 하는 버전이라 대부분의 사람에게는
      // 설치본이 맞다. 여기서는 "이미 설치해 두었다면 이런 길도 있다" 정도로만 말한다.
      // 큰 쪽 숫자도 꺼내지 않는다. 작은 쪽이 실제 사용량이라고만 하면 충분하다.
      bothApps:
        '.NET 8 데스크톱 런타임을 한 번 설치해 두시면 경량 버전을 쓸 수 있고, 다른 앱 Edgetree도 작은 파일 하나로 사용할 수 있습니다. (다운로드 용량이 작고, 메모리도 실제 사용량으로 표시됩니다)',
      // "메모는 오직 사용자 PC에만 저장됩니다"를 뒤에 붙여 두었다가 뺐다(2026-07-28).
      // SmartScreen 경고 이야기 바로 뒤에서는 안심시키는 말이 아니라, 무언가 나가는지
      // 의심해 보라는 신호로 읽힌다. 그 답은 FAQ가 맡는다 - 물어본 사람에게만 간다.
      smartscreenNote:
        '처음 실행할 때 윈도우 SmartScreen 창이 뜨면 추가 정보 → 실행을 누르면 됩니다.',
    },
    // FAQ. 여기 오는 사람은 이미 관심이 생겨 스크롤을 내려온 사람이라, 같은 솔직함이
    // 다운로드 버튼 옆에서와 달리 신뢰로 읽힌다. 다만 '드리는 말씀'에 있던 일곱 항목을
    // 그대로 되살리지는 않았다 - 없는 기능 나열·경쟁 제품 추천·기대 낮추기 셋은 2026-07-26에
    // 빼고 나서 다운로드가 늘었던 문구다. 여기 남긴 것은 전부 '왜 이렇게 만들었는가'다.
    //
    // 답을 "못 합니다"로 시작하지 않는다. 자동 재부착은 못 하는 것이 아니라 안 한 것이고,
    // 메모리 수치는 결함이 아니라 표시 방식이다. 사실은 그대로 두되 문장은 만든 이유로 쓴다.
    faq: {
      title: '자주 묻는 질문',
      items: [
        // 메모리 항목은 2026-07-28에 뺐다(보류). 묻지도 않은 사람에게 수치를 먼저 꺼내면
        // 걱정하지 않던 사람까지 걱정하게 만든다. 설명 자체가 필요 없어진 것은 아니므로,
        // 실제로 질문이 들어오면 그때 되살린다. 문구 원문은 이 커밋 직전 이력에 있다.
        // 순서가 문구만큼 중요하다. 사람은 위에서부터 읽으므로 되는 것을 먼저 두고,
        // 안 되는 것은 사이에 끼운다. 몰아 두면 그 대목만 '못하는 것 목록'으로 읽힌다.
        //
        // 앞의 넷은 '적어 둔 것을 잃을까 봐'라는 한 가지 걱정을 따라간다 - 저장을 해야 하나 →
        // 창을 닫아도 되나 → 다시 열면 어떻게 되나 → 지워 버렸는데. 자동 재부착만 '아니요'인데,
        // 앞뒤가 전부 '남아 있습니다'라서 그 하나가 손실로 읽히지 않는다.
        {
          q: '메모를 쓰는 동안 따로 저장해야 하나요?',
          // '저장 버튼이 없다'고 쓰지 않는다 - 스티커 메뉴에 저장이 실제로 있고, 그것은
          // 메모를 파일로 빼내는 기능이라 뜻이 다르다. 아래 내보내기 항목과 부딪힌다.
          a: '아니요, 따로 저장하지 않아도 됩니다. 입력을 멈추면 곧바로 저장되고, 다른 곳을 클릭할 때도 저장됩니다. 컴퓨터를 껐다 켠 뒤 스티커를 다시 붙여도 쓰던 글이 그대로 있습니다.',
        },
        {
          // ★ '그대로 이어집니다'를 걷었다(2026-08-18 검수). **글은 이어지는 것이 아니라 남아
          // 있는 것이고, 이어서 쓰는 주체는 사용자다.** 3번에도 같은 말이 연달아 있었다.
          q: '창을 닫으면 메모 내용이 사라지나요?',
          a: '아니요. 스티커는 팔레트로 돌아오고 적어 둔 내용은 그대로 남습니다. 다른 창에 다시 붙이면 이어서 쓸 수 있습니다.',
        },
        {
          // ⚠ '편법'을 뺐다 - 그 방식을 쓰는 다른 앱을 깎는 말로 읽힌다. 회사명보다 OS 이름이
          // 맞고, 이 맥락의 동사는 '허용'이 아니라 '지원'이다.
          q: '닫았던 창을 다시 열면 메모가 자동으로 붙나요?',
          a: '자동으로 붙지는 않습니다. Windows가 공식적으로 지원하는 기능만 써서 만들었고, 비공식적인 방법을 쓰면 구현할 수 있지만 의도적으로 넣지 않았습니다. 스티커는 팔레트에 돌아와 있으니 집어서 새 창에 붙이면 됩니다.',
        },
        {
          // 아홉 중 이것만 평서문이라 목록에서 튀었다(2026-08-18 검수). '되살리다'가 아니라
          // '복구'로 받는다 - 문체 규칙의 되돌리다→복원 계열이고, 검색에도 이쪽이 걸린다.
          q: '메모를 실수로 삭제했는데 복구할 수 있나요?',
          // 앱이 쓰는 말을 그대로 쓴다 - 랜딩에서만 다르게 부르면 찾아 들어간 화면에 그
          // 낱말이 없다. 한 장을 비우는 자리는 2026-08-03에 '내용 삭제'에서 '스티커 초기화'로
          // 바뀌었고, 전체를 지우는 '메모 전체 삭제'는 그대로다. 그래서 여기서는 버튼 이름을
          // 부르지 않고 '삭제'라는 일반적인 말로만 받는다 - 어느 쪽으로 지웠든 답이 같다.
          a: '메모 내용을 삭제하기 직전에 사본이 자동으로 남습니다(앱을 종료할 때도 남습니다). 파일 이름이 날짜와 스티커 색으로 되어 있어 바로 찾을 수 있습니다. 예를 들면 backup_260728_yellow_0001.txt 형식입니다. 기본 폴더는 문서 폴더 안의 TabStick이며, 앱 메뉴 → 설정 → 메모 백업 위치에서 열어 보거나 변경할 수 있습니다.',
        },
        {
          // 질문의 말과 눌러야 할 버튼 이름을 맞춘다 - UI 라벨이 '내보내기'다.
          // ⚠ '표 계산 프로그램'은 실무에서 안 쓰는 순화어투라 '스프레드시트'로 바꿨다.
          q: '적어 둔 메모를 파일로 내보낼 수 있나요?',
          a: '네. 한 장만 따로 저장할 수도 있고(스티커 우클릭 → 저장), 아홉 장을 한꺼번에 내보낼 수도 있습니다(팔레트의 ••• → 스티커 관리 → 내보내기). 한꺼번에 내보낼 때는 텍스트와 CSV 중에서 선택할 수 있어 스프레드시트에서 바로 열 수 있습니다.',
        },
        {
          q: '다른 곳에 적어 둔 글을 메모로 가져올 수 있나요?',
          a: '네. 스티커 우클릭 → 불러오기로 텍스트 파일을 그대로 불러옵니다. 기존 내용을 덮어쓰기 전에 확인 창이 표시됩니다.',
        },
        {
          q: '메모에 적은 링크나 폴더 경로를 바로 열 수 있나요?',
          a: '네. Ctrl을 누른 채 클릭하면 기본 브라우저나 파일 탐색기로 바로 열립니다.',
        },
        {
          // ★ **길이가 아니라 어조가 문제였다**(2026-08-18). 이유를 한 문장으로 말하면 결정으로,
          // 여러 문장으로 늘어놓으면 변명으로 들린다. 뺀 말 둘: '본연'(꾸미기를 원한 사람을
          // 평가한다) · '열어 두었습니다'(개발자가 베푼 구도가 된다). 제한을 **사용자가 얻는
          // 것**으로 바꿔 말한다 - 색이 불변 인덱스라는 대원칙 그대로다.
          q: '스티커를 더 늘리거나, 메모를 꾸밀 수 있나요?',
          a: '스티커는 9개로 고정입니다. 색만 보고 9개를 모두 기억할 수 있다는 것이 이 앱의 핵심이라, 개수를 늘리면 그 장점이 사라집니다. 꾸미기 기능을 최소화한 것도 같은 이유입니다. 다만 색상은 예외로, 여섯 칸의 프리셋을 원하는 대로 설정할 수 있습니다.',
        },
        {
          // ▣ **여기만 '아닙니다'인 것은 그대로 둔다.** 통일하자는 제안이 있었지만, 앞의 둘은
          // 안심시키는 자리라 '아니요'가 맞고 **여기는 프라이버시라 단호한 편이 값이다.**
          q: '서버에 메모를 전송하나요?',
          a: '아닙니다. 메모는 사용자 PC에만 저장됩니다. 업데이트 안내를 위해 GitHub에서 새 버전이 나왔는지만 확인할 뿐이고, 그때도 메모나 개인정보는 보내지 않습니다.',
        },
      ],
    },
    footer: {
      contact: '문의',
      otherTool: '같은 개발자의 다른 도구',
      // 내장한 글꼴·아이콘 고지. 두 라이선스 모두 배포할 때 표기를 요구한다. 앱 정보 탭에도
      // 같은 두 줄이 있고(ArchiveWindow), 여기 것은 받기 전에도 볼 수 있게 두는 몫이다.
      credits: '사용한 오픈소스',
      // 라이선스 고지. GitHub의 LICENSE.md로 넘긴다 - 받기 전에도 재배포 조건을 볼 수 있게
      // 두는 몫이다. 저작권 줄에 붙여 같은 무게로 낮춰 둔다.
      licence: '라이선스',
      copyright: '© 2026 TabStick.',
    },
  },
  en: {
    nav: {
      why: 'Why',
      screenshots: 'Features',
      features: 'More',
      howto: 'How it works',
      download: 'Download',
      faq: 'FAQ',
    },
    hero: {
      eyebrow: 'Windows index-sticker notes',
      title: 'TabStick',
      tagline: 'Stick a note beside the window it belongs to — not on your desktop.',
      badges: ['Free', 'No ads', 'Your notes stay on your PC'],
    },
    why: {
      title: 'Why I made it',
      items: [
        // 카카오톡은 영어권에 안 통해 일반화한다(a chat window).
        'I once sent the wrong thing to the wrong chat window, and never wanted to do it again.',
        'Chatting with an AI, a stray Enter would send half a message and burn a turn.',
        // ⚠ **여기의 sticky notes는 모니터 옆에 붙이던 진짜 포스트잇이다** - 앱 이야기가
        // 아니다. 다른 곳의 sticky note는 Windows 기본 앱과 겹쳐서 걷어냈지만(2026-08-18),
        // 이 줄만은 그대로 둔다. 앱을 만든 이유가 여기 있다.
        'The sticky notes beside my monitor kept falling off.',
        'Cooking from a recipe, I got tired of scrolling between the ingredients and the steps.',
        'Digging a half-watched video out of my browser history was a chore.',
      ],
    },
    screenshots: {
      title: 'Features',
      items: [
        {
          // 제목의 its가 가리킬 것이 제목 안에 없었다(2026-08-18 검수). 스티커를 앞에 세운다.
          title: 'Click a sticker, bring its window forward',
          desc: 'However many windows you have open, clicking a sticker pulls its window to the front. No more hunting through identical taskbar icons — pick the window by its color.',
        },
        {
          title: 'Every note stays with its window',
          desc: 'It moves with the window, minimizes with it, and returns to the palette when the window closes. Close one by accident and what you wrote is still there.',
        },
        {
          title: 'Manage with just nine stickers',
          desc: 'Nine notes, and that’s it. Remember each by its color, write, wipe, and reuse them, and save only the important ones separately.',
        },
        {
          title: 'Any direction, any spot',
          desc: 'Attach up to three notes to a window and open each one. Once attached, move a note to the left or right of the window, inside or outside, then nudge it up or down.',
        },
        {
          title: 'Drop things straight into a note',
          desc: 'Drop a YouTube link or some text straight into a note. Ctrl+click a link to jump right to it. Or the reverse: drag an address or some text from the window onto a note and it drops in as-is.',
        },
        {
          // 제목이 "모양 셋과 크기 셋"으로 읽혔다. 크기는 자유다.
          title: 'Three palette shapes, any size',
          desc: 'Pick default, row, or column, then set the size you want. The palette is always a tray-menu click away.',
        },
        {
          title: 'Your own colors and marks',
          desc: 'Save the note and text colors you like as presets, ready to pick whenever you want them. Mark up your lines with the symbols you reach for most, or add checkboxes.',
        },
        {
          // ▣ **두 문장으로 나눈다**(2026-08-18 검수). 한 문장에 서로 다른 예시 둘이 들어 있어
          // 페이지에서 가장 읽기 어려운 자리였다. 예시 숫자는 캡처와 맞춘 국문 그대로 둔다.
          title: 'Add it up without leaving the note',
          desc: 'Select the lines that hold numbers, pick an operator from the right-click menu, and the answer appears below them. A line written as 11.68 * 2 is multiplied first, then added in when you press +. Put your budget on the top line, select everything, and press - to see what is left.',
        },
        {
          title: 'A small image on your note',
          desc: 'An image can sit behind the foot of a note. Character images come with the app, or pick a file of your own, and you choose the size, how faint it is, and which side it rests on.',
        },
      ],
    },
    features: {
      title: 'More',
      items: [
        { title: 'Lock a note', desc: 'Lock a note you do not want to change. A locked note cannot be edited or cleared until you unlock it.' },
        // 국문 '전체 잠금'과 짝. UI 라벨이 그대로 Lock all이라 문장 안에서도 그 말을 쓴다.
        { title: 'Lock all', desc: 'Stepping away from the desk? Lock all folds every attached note away at once. It sits on the palette and in the tray menu.' },
        { title: 'Saves and backs up on its own', desc: 'Saves as you type or edit, and writes a separate backup whenever the app closes or you delete a note.' },
        // 국문 '파일로 내보내기'와 짝. 보관함의 영문 라벨은 Stickers다(tray.archive).
        { title: 'Export to a file', desc: 'Open Stickers to see all nine notes in one place, and export them as a TXT or CSV file.' },
        // ▣ 사용방법 3단계와 겹치던 절차 설명을 걷고 쓰임 쪽으로 돌렸다(2026-08-18 검수).
        { title: 'Lists and checkboxes', desc: 'Put a bullet or a dash at the head of your lines, and give a to-do a checkbox you can tick with Ctrl+click.' },
        { title: 'Save your own colors', desc: 'Save a background and a text color in each of the six slots as presets, ready to pick whenever you want.' },
        // 'has left the palette'는 스티커가 스스로 나간 것으로 읽혔다(2026-08-18 검수).
        { title: 'Find a sticker', desc: 'Track down a sticker that’s out on a window and bring it back to the palette.' },
        // 국문 '트레이 메뉴'와 짝. 'Start with Windows' 앞에 두는 이유는 국문 주석에.
        { title: 'Tray menu', desc: 'Hide the palette and the tray icon stays put. Right-click it for the same colors as the palette — pick up a sticker straight away, or reach Lock all and Stickers from there.' },
        // ⚠ 1.4.5에서 동작이 바뀌었다 - 부팅으로 시작하면 팔레트 없이 트레이에서 뜬다.
        // 설정의 실제 라벨은 'Start with Windows'라 제목을 그대로 두고 본문이 새 동작을 말한다.
        // 제목이 주어를 못 세워서 본문 첫 마디에 TabStick을 적는다(검수).
        { title: 'Start with Windows', desc: 'Set TabStick to run when Windows starts. It comes up in the tray with the palette hidden, so nothing covers your screen.' },
      ],
    },
    howto: {
      title: 'How it works',
      steps: [
        {
          title: 'Pick a sticker, click a window',
          desc: 'Click a color in the palette and the sticker rides your cursor. Click anywhere on the window you want and it sticks. To cancel, right-click, click the desktop, or press Esc. With the palette hidden, right-click the tray icon to reach the same colors.',
        },
        {
          title: 'Jot it down',
          desc: 'Write as it comes to you. Even a single character is saved automatically, and links or paths open with Ctrl+click.',
        },
        {
          title: 'Give the note some shape',
          desc: 'Select several lines and pick a symbol from the right-click menu to put one at the head of each. For a to-do list, add checkboxes and use them with Ctrl+click. Text size, line spacing, and note color can all be set per note.',
        },
        {
          // 괄호는 "이 설정이 스티커 전체에 걸린다"는 뜻이다(코드에서 확인 - 좌/우·안/밖은
          // _settings에 있어 창마다가 아니라 앱 전체 값이다). 검수가 물은 두 뜻 중 이쪽이다.
          title: 'Position and resize the note',
          desc: 'From the sticker right-click menu, send the note to the left or right of the window, inside or outside (this setting applies to every sticker). Drag an edge or corner to resize, or double-click an edge to fit that side — the bottom edge fits the height, the left edge the width, and the corner resets both. Hold Shift while resizing to snap to a 20px grid — handy for making several notes the same size.',
        },
        {
          title: 'Take it off, put it back',
          desc: 'Close the app and stickers return to the palette. You can also send one back from its menu, or right-click an empty palette slot to reclaim it — then stick it on a different window.',
        },
        {
          title: 'Stickers and settings',
          desc: 'The ••• button on the palette opens the Stickers tab, and so does the tray menu: see all nine notes in one place, export them to a file, or delete them. Settings cover the palette shape, app and sticker size, text size and line spacing, note colors, dark/light, and language.',
        },
      ],
    },
    download: {
      title: 'Download',
      recommend: 'Recommended',
      cta: 'Download',
      pending: 'Coming soon',
      setupTitle: 'Installer',
      setupDesc: 'Download, click through, done — it lands in your Start menu and uninstalls cleanly.',
      portableTitle: 'Portable',
      portableDesc: 'Unzip and run. No installation.',
      lightTitle: 'Light',
      lightDesc: 'Needs the .NET 8 Desktop Runtime.',
      // 영문은 Changelog로 적는다(2026-08-05) - 아카이브들이 그 낱말로 찾는데 "Update notes"는
      // 못 잡아, oldergeeks 등록 페이지의 변경 사항 칸이 "찾을 수 없음"으로 비었다.
      notesTitle: 'Changelog',
      notesOlder: 'Older update notes',
      notesNewer: 'Newer update notes',
      notes: [
        {
          version: '2.1.0',
          items: [
            'Move a note’s background image anywhere on the note',
            'The image’s vertical position adjusts to the note’s height',
            'The image can be larger than before',
            'Edit a note’s preset on its own, without the app menu, and the window is tidier',
            'If the image looks out of place after updating, press Reset position',
          ],
        },
        {
          version: '2.0.1',
          items: [
            'Edit a note’s preset from the note itself',
            'The note’s right-click menu is shorter and more evenly spaced',
            'Fixed the preset window opening behind an always-on-top palette',
            'Click anywhere on the image size or opacity slider and its knob goes there',
            'Fixed the caret showing over the image when text is kept clear of it',
          ],
        },
        {
          version: '2.0.0',
          items: [
            'A note can carry an image in its bottom corner',
            'Nine character images are included, or choose a file of your own',
            'Set the image’s size, opacity, placement and flip',
            'Restore a preset to how it was before you opened it',
            'Preset swatches are lettered A to F',
          ],
        },
        {
          version: '1.4.7',
          items: [
            'Fixed the sticker appearing to come away while a note’s width is dragged',
            'Right-click a sticker to open Settings or quit TabStick',
          ],
        },
        {
          version: '1.4.6',
          items: [
            'Fixed the tray icon not appearing when TabStick starts with Windows',
            'The palette comes back hidden if you left it hidden',
            'Middle-click the ••• button to put the palette in the tray',
            'The sticker’s right-click menu stands clear of the sticker',
          ],
        },
        {
          version: '1.4.5',
          items: [
            'The tray menu closes when you click away',
            'Starting with Windows now begins in the tray, without the palette',
            'Stickers can be picked up straight from the tray menu',
          ],
        },
        {
          version: '1.4.4',
          items: [
            'Typing and scrolling in a long memo are much faster',
            "You're told when pasted text was cut to fit",
            "With a memo open, the sticker's right-click menu opens clear of it",
          ],
        },
        {
          version: '1.4.3',
          items: [
            "Memos follow the window's edge more closely while you move it",
            "The memo's scroll bar is easy to grab again",
            'Resizing or scrolling a memo with all of its text selected is much lighter',
          ],
        },
        {
          version: '1.4.2',
          items: [
            'Fixed a slowdown when resizing a memo with all of its text selected',
          ],
        },
        {
          version: '1.4.0',
          items: [
            'The size settings now sit together, under one [Overall size]. Move it and the sticker, palette and menus follow - or set any of them on its own',
            'Lock everything from the palette or the tray - every memo folds away at once, for when you step away from the desk',
            'Locking a memo is now [Lock editing], at the bottom of the memo\'s own right-click menu - lock it where you are writing',
            'Bring the palette to a sticker from its right-click menu, and add blank lines from the memo menu',
            'Refinements and bug fixes',
          ],
        },
        {
          version: '1.3.0',
          items: [
            'Right-click a sticker to swap it for another memo or add one more - once the first sticker is up, no trip to the palette',
            'Refinements and bug fixes',
          ],
        },
        {
          version: '1.2.1',
          items: [
            'The app now tells you when a new version is out - check the About tab or the tray menu and get it there',
            'Symbols, text size and the sum row are easier to use in a memo - the selection holds even when the right click lands outside it',
            'Refinements and bug fixes',
          ],
        },
        {
          version: '1.2.0',
          items: [
            'Calculate inside a memo - select the numbers and use + - × ÷ % in the right-click menu',
            'A line written 2500 * 4 counts as its product. Write the list as it is and press + for the total, or put your budget on the first line and press - for what is left',
            'A setting shows the memo title line right away, and that line can be dragged to move the memo',
            'Choose whether stickers move inside a window that fills the screen',
            'Refinements and bug fixes',
          ],
        },
        {
          version: '1.1.0',
          items: [
            'Make your own memo papers (presets). Set a background and a text colour in each of the six slots and pick from them.',
            'Line spacing in eight steps',
            'Select across lines and pick a symbol to format their heads',
            'Checkboxes, ticked and cleared by Ctrl+clicking the box',
            'Double-clicking an edge is now simply fit width or fit height',
            'Reset a sticker - detach, unlock and empty in one press',
            'Refinements and bug fixes',
          ],
        },
        {
          version: '1.0.8',
          items: [
            'Typing in a long memo is much lighter',
            'A setting to keep memo sizes matched within a window',
          ],
        },
        {
          version: '1.0.7',
          items: [
            'Performance improvements and bug fixes',
            'Tidier item names in the sticker right-click menu',
          ],
        },
        {
          version: '1.0.6',
          items: [
            'Resizing and moving windows is lighter',
            'Drag a memo by its top edge or title to move it up or down',
            'The sticker of an open memo now shows a pencil',
          ],
        },
        {
          version: '1.0.5',
          items: [
            'Clicking at the end of a line now puts the caret there',
            'Clearer text caret and selection highlight',
            'Scroll bar is easier to see',
          ],
        },
        {
          version: '1.0.4',
          items: [
            'Palette size: Small / Normal / Large → 50-130%',
            'Memo text size range widened to 11-24',
            'Shift + click a sticker → bring its window forward without opening the memo',
          ],
        },
        {
          version: '1.0.3',
          items: [
            'Sticker right-click → Title → the title appears on the memo (edit it there)',
            "Font / memo background colour → moved to the memo's right-click menu",
            'Sticker right-click → Pick up again, added',
            'Option to start with Windows, added',
            'Size option for every right-click menu, added',
          ],
        },
      ],
      mobileNote: 'TabStick runs on Windows.\nCopy the link and open it on your PC.',
      copyLink: 'Copy link',
      copied: 'Copied',
      soon: 'Download links are being prepared.',
      // 영문 화면에서는 언어 이름도 영어로 적는다 - 긁어 가는 쪽이 읽는 것은 이 화면이다.
      requirement: 'Windows 10 / 11 · 64-bit · English · Korean · Japanese',
      bothApps:
        'Install the .NET 8 Desktop Runtime once and the Light build becomes an option — as does Edgetree, another app, from a single small file. (A smaller download, and the memory figure shows what is actually in use.)',
      smartscreenNote:
        'If Windows SmartScreen appears on the first run, choose More info → Run.',
    },
    faq: {
      title: 'Frequently asked',
      items: [
        {
          q: 'Do I have to save my notes manually?',
          a: 'No — you never have to save anything yourself. It saves the moment you stop typing, and again the moment you click away. Shut down your PC, put the sticker back on a window, and what you wrote is still there.',
        },
        {
          q: 'If I close a window, do I lose what I wrote?',
          a: 'No. The sticker returns to the palette and everything you wrote stays with it. Drop it on another window and your note is exactly as you left it.',
        },
        {
          // ▣ '못 하는 것'을 신뢰의 근거로 돌려 놓은 답이라 뜻은 그대로 두고 말만 고쳤다
          // (2026-08-18 검수). tricks → undocumented workarounds가 이 맥락의 표준 단어이고,
          // Microsoft → Windows가 자연스럽다.
          q: 'If I reopen a window, does the note come back automatically?',
          a: 'Not automatically. TabStick only uses what Windows officially supports. Reattaching on its own would mean relying on undocumented workarounds, so it’s left out on purpose. The sticker is waiting in the palette — pick it up, drop it on the new window, and carry on.',
        },
        {
          // ⚠⚠ **`Memo backup folder`는 앱의 실제 라벨이라 그대로 둔다.** 검수는 `Note backup
          // folder`로 바꾸자고 했는데, 앱 설정에 그 글자가 없어서 찾아 들어간 사람이 못 찾는다.
          // 랜딩이 앱 화면을 인용하는 자리는 앱 표기가 먼저다 - 용어 통일은 앱을 옮긴 다음이다.
          q: 'I deleted a note by mistake. Can I get it back?',
          a: 'A copy is written automatically just before a note is deleted (and again when the app closes). The filename carries the date and the sticker color, so you can spot it at a glance — backup_260728_yellow_0001.txt, for instance. The folder defaults to TabStick under Documents; open or change it under the app menu → Settings → Note backup folder.',
        },
        {
          q: 'Can I export my notes to a file?',
          a: 'Yes — one at a time or all at once. Right-click a sticker and choose Save for just that one; for everything, open Stickers from the ••• button on the palette and use Export. The bulk export offers plain text or CSV, so it opens directly in a spreadsheet.',
        },
        {
          q: 'Can I import a text file into a note?',
          a: 'Yes. Right-click a sticker and choose Load to pull in a text file. It asks before replacing anything already there.',
        },
        {
          q: 'Can I open links and file paths from a note?',
          a: 'Yes. Ctrl+click opens a link in your default browser, or a path in File Explorer.',
        },
        {
          // ★ **길이가 아니라 어조가 문제였다**(2026-08-18). 이유를 한 문장으로 말하면 결정으로,
          // 세 문장으로 말하면 변명으로 들린다. 그리고 'dressing it up'은 원한 사람을 깎는 말이라
          // 뺐다. 제한을 **사용자가 얻는 것**(색으로 아홉을 다 기억한다)으로 바꿔 말한다 -
          // 색이 불변 인덱스라는 대원칙 그대로다.
          q: 'Can I add more than nine stickers, or customize how a note looks?',
          a: 'Nine is the limit, and that’s deliberate. The whole point is to keep notes few enough that you can remember every one of them by color — more stickers would work against that. Styling is kept light for the same reason. Colors are the exception: the six preset slots are yours to set up however you like.',
        },
        {
          q: 'Do my notes go to a server?',
          a: 'No. They are stored only on your PC. It checks GitHub for a newer version so it can let you know — even then, no notes or personal data are sent.',
        },
      ],
    },
    footer: {
      contact: 'Requests',
      otherTool: 'Other tools by the same maker',
      credits: 'Open source used',
      licence: 'Licence',
      copyright: '© 2026 TabStick.',
    },
  },
  ja: {
    nav: {
      why: 'きっかけ',
      screenshots: '特長',
      features: 'その他',
      howto: '使い方',
      download: 'ダウンロード',
      faq: 'よくある質問',
    },
    hero: {
      eyebrow: 'Windows用 インデックスメモ',
      title: 'TabStick',
      tagline: 'メモを貼るのは、デスクトップではなく、そのメモが必要なウィンドウのとなり。',
      badges: ['無料', '広告なし', 'メモはPCの中だけ'],
    },
    why: {
      title: 'なぜ作ったのか',
      items: [
        'チャットの送り先を間違えたことがあって、二度と同じ思いをしたくないと思いました。',
        'AIとやり取りしているとき、書きかけでうっかりEnterを押してしまい、トークンを無駄にするのが嫌でした。',
        'モニターの横に貼っておいた付箋が、よく落ちて困っていました。',
        'レシピをひとつ見るのに、材料と作り方の間をスクロールで行き来するのが面倒でした。',
        '途中まで見た動画を、履歴の検索欄から探し出すのはひと苦労でした。',
      ],
    },
    screenshots: {
      title: '特長',
      items: [
        {
          title: '重なったウィンドウも、ステッカーひとつで。',
          desc: 'ウィンドウをいくつ開いていても、ステッカーを押せば、そのウィンドウがすぐ手前に出てきます。タスクバーで似たアイコンを探し回らなくても、色を見ればすぐ分かります。',
        },
        {
          title: 'ステッカーは、いつもウィンドウと一緒に。',
          desc: 'ウィンドウと一緒に動き、一緒に最小化され、ウィンドウを閉じるとパレットに戻ります。うっかり閉じてしまっても、書いた内容はそのまま残っています。',
        },
        {
          title: '管理するのは、たった9枚。',
          desc: 'メモは9枚あれば十分です。色で覚えて、書いては消してまた使い、大事なものだけ別に保存すれば十分です。',
        },
        {
          title: '好きな向きに、好きな場所へ。',
          desc: '1つのウィンドウに3枚まで貼れて、それぞれメモを開いて使えます。貼ったあとは、ウィンドウの左・右・内側・外側へ動かせます。もちろん上下にも動かせます。',
        },
        {
          title: '見ているウィンドウから、そのままメモへ。',
          desc: 'YouTubeのURLも文章も、そのままメモに移しておけます。リンクはCtrl+クリックですぐ開けます。逆に、ウィンドウからアドレスや文章をドラッグしてメモに落とせば、そのまま入ります。',
        },
        {
          title: 'パレットは、3つの形と好きなサイズで。',
          desc: '標準・横・縦の3つの形と、お好みのサイズを選べます。パレットはトレイメニューからいつでも呼び戻せます。',
        },
        {
          title: '好きな色と、好きな書式で。',
          desc: 'お好みのメモの色と文字色を、あらかじめ決めておけます。よく使う記号で行頭を整えたり、チェックボックスを使ったりもできます。',
        },
        {
          title: 'メモの中で、そのまま計算。',
          desc: '数字の入った行を選んだ状態で、右クリックメニューの演算記号を選ぶと、答えが下に表示されます。2500 * 4 のように書いた行を選んで + を押せば、先に掛けてから合計されます。いちばん上に予算を書いてすべてを選び、- を押せば残額が計算されます。',
        },
        {
          title: 'メモに、ちいさな絵を。',
          desc: 'メモの下のほうに、背景として画像を置けます。キャラクター画像が同梱されているほか、好きな画像ファイルも選べます。サイズ・透明度・配置を調整できます。',
        },
      ],
    },
    features: {
      title: 'その他の機能',
      items: [
        {
          title: '編集ロック',
          desc: '変えたくないメモは、しばらくロックしておけます。ロック中のメモは、解除するまで編集も削除もできません。',
        },
        {
          title: '全体ロック',
          desc: '席を外すときに全体ロックを選ぶと、貼ってあるメモが一度に畳まれてロックされます。パレットとトレイメニューのどちらからも使えます。',
        },
        {
          title: '自動保存・バックアップ',
          desc: '文字を入力したり変えたりするたびに自動で保存され、アプリを終了するときや内容を削除するときには、別にバックアップを残します。',
        },
        {
          title: 'ファイルへの書き出し',
          desc: 'アプリメニューの[ステッカー]で9枚のメモを一か所にまとめて確認し、TXTやCSVファイルに書き出せます。',
        },
        {
          title: 'リストとチェックボックス',
          desc: '複数の行を選んで記号を押すと、各行の先頭に付きます。やることリストにはチェックボックスを付けて、Ctrl+クリックでチェックを付け外しできます。',
        },
        {
          title: 'メモの色づくり',
          desc: 'メモの色を、お好みで変えてみてください。6つの枠それぞれに背景色と文字色をプリセットとして作っておき、いつでも選んで使えます。',
        },
        {
          title: 'ステッカー探し',
          desc: 'どのウィンドウに貼ったか分からなくなっても、探して呼び戻せます。',
        },
        {
          title: 'トレイメニュー',
          desc: 'パレットを隠しても、トレイアイコンはそのまま残ります。右クリックするとパレットと同じ色が並び、ステッカーをすぐつかめます。全体ロックと［ステッカー］もここから開けます。',
        },
        {
          title: '自動起動',
          desc: 'Windowsの起動と同時に実行するよう設定できます。このときは画面を覆わないよう、パレットを出さずにトレイから始まります。',
        },
      ],
    },
    howto: {
      title: '使い方',
      steps: [
        {
          title: 'ステッカーをつかんで、ウィンドウに貼る',
          desc: 'パレットで色を1つクリックすると、ステッカーがカーソルに付きます。そのまま、貼りたいプログラムのウィンドウのどこかをクリックすれば貼り付きます。カーソルに付けている間は、右クリック・デスクトップのクリック・Escでいつでも取り消せます。パレットを隠しているときは、トレイアイコンを右クリックして同じ色を選べます。',
        },
        {
          title: '気軽に書く',
          desc: '思いついたまま、さっと書いてください。1文字入力しただけでも自動で保存され、リンクやパスはCtrl+クリックですぐ開きます。',
        },
        {
          title: 'メモの中で整える',
          desc: '複数の行を選んで右クリックメニューの記号を押すと、各行の先頭に付きます。やることリストにはチェックボックスを付けて、Ctrl+クリックでチェックを付け外しできます。文字サイズ・行間・メモの色は、メモごとに別々に決められます。',
        },
        {
          title: 'メモの位置とサイズを合わせる',
          desc: 'ステッカーの右クリックメニューから、メモをウィンドウの左/右、内側/外側へ送れます（すべてのステッカーに共通の設定です）。ふちや角をドラッグしてサイズを変えられます。ダブルクリックすると、その向きに合わせて自動で調整されます。下辺は高さ、左辺は幅、角は最初のサイズに戻ります。サイズを変えるときにShiftを押しながらドラッグすると20pxのグリッドに吸着するので、複数のメモを同じサイズに揃えやすくなります。',
        },
        {
          title: '外して、また貼る',
          desc: 'アプリを終了すると、ステッカーはパレットに戻ります。貼ってあるステッカーのメニューからパレットへ送ったり、パレットの空き枠を右クリックして回収したりもできます。回収したステッカーは、別のウィンドウに貼り直せます。',
        },
        {
          title: 'ステッカーの管理と設定',
          desc: 'パレットの ••• ボタンを押すと[ステッカー]が開きます。トレイメニューからも開けます。9枚のメモの内容を一か所で見て、ファイルに書き出したり削除したりできます。設定では、パレットの形、アプリとステッカーのサイズ、文字サイズと行間、メモの色、ダーク/ライト、言語を変えられます。',
        },
      ],
    },
    download: {
      title: 'ダウンロード',
      recommend: 'おすすめ',
      cta: 'ダウンロード',
      pending: '準備中',
      setupTitle: 'インストール版',
      setupDesc: 'ダウンロードして数回クリックするだけ。スタートメニューに登録され、アンインストールしても、余計なものが残りません。',
      portableTitle: 'ポータブル版',
      portableDesc: '解凍してすぐ実行できます。インストールは不要です。',
      lightTitle: '軽量版',
      lightDesc: '.NET 8 デスクトップ ランタイムが必要です。',
      notesTitle: '更新内容',
      notesOlder: '以前の更新内容',
      notesNewer: '次の更新内容',
      mobileNote: 'Windowsで使うアプリです。\nリンクをコピーしておいて、PCで開いてみてください。',
      copyLink: 'リンクをコピー',
      copied: 'コピーしました',
      soon: 'ダウンロードリンクは公開の準備中です。',
      requirement: 'Windows 10 / 11 · 64ビット · 日本語 · 한국어 · English',
      bothApps: '.NET 8 デスクトップ ランタイムを一度インストールしておけば、軽量版が使えるようになり、別のアプリ Edgetree も小さなファイル1つで使えます。（ダウンロード容量が小さく、メモリも実際の使用量で表示されます）',
      smartscreenNote: '初回起動時に「WindowsによってPCが保護されました」と表示された場合は、[詳細情報] → [実行] を押してください。',
      notes: [
        {
          version: '2.1.0',
          items: [
            'メモの背景画像を好きな位置に動かせます',
            '画像の縦位置が、メモの高さに合わせて自動で調整されます',
            '画像の最大サイズが大きくなりました',
            'メモからプリセット設定を、アプリメニューを開かずに単独で呼び出せるようになり、機能が整理されました',
            '更新後に画像が見えない、または位置が変わっている場合は、[位置をリセット]を押してください',
          ],
        },
        {
          version: '2.0.1',
          items: [
            'メモを右クリックして、そのメモのプリセットをすぐ設定できます',
            'メモの右クリックメニューが短くなり、項目の間隔が整いました',
            'パレットを常に手前に表示しているときに、プリセット画面が隠れる問題を修正しました',
            '画像サイズと透明度のスライダーで、クリックした位置につまみが移動します',
            '本文が画像の領域に入らない設定のときに、カーソルが画像の上に見えていたのを修正しました',
          ],
        },
        {
          version: '2.0.0',
          items: [
            'メモの下のほうに、背景として画像を置けます',
            'キャラクター画像が9種類入っており、好きな画像ファイルを選ぶこともできます',
            '背景画像のサイズ・透明度・配置・左右反転を調整できます',
            'プリセット画面で変更した内容を、変更前の状態に戻せます',
            'プリセットの枠にAからFまで表示され、似た色も見分けられます',
          ],
        },
      ],
    },
    faq: {
      title: 'よくある質問',
      items: [
        {
          q: 'メモを書いている間、別に保存する必要はありますか？',
          a: 'いいえ、保存の操作は要りません。入力を止めるとすぐ保存され、別の場所をクリックしたときにも保存されます。パソコンを再起動したあとにステッカーを貼り直しても、書いた文章はそのまま残っています。',
        },
        {
          q: 'ウィンドウを閉じると、メモの内容は消えますか？',
          a: 'いいえ。ステッカーはパレットに戻り、書いておいた内容はそのまま残ります。別のウィンドウに貼り直せば、続きから使えます。',
        },
        {
          q: '閉じたウィンドウをもう一度開くと、メモは自動で貼り直されますか？',
          a: '貼り直しは自動では行いません。TabStickは、Windowsが公式に用意している仕組みだけで作られています。非公式な方法を使えば実現できますが、あえて入れていません。ステッカーはパレットに戻っていますので、つまんで新しいウィンドウに貼ってください。',
        },
        {
          q: 'メモを間違えて削除しました。元に戻せますか？',
          a: 'メモの内容を削除する直前に、コピーが自動で残ります（アプリを終了するときにも残ります）。ファイル名が日付とステッカーの色になっているので、すぐ見つけられます。たとえば backup_260728_yellow_0001.txt という形です。既定のフォルダーはドキュメント内の TabStick で、アプリメニュー → 設定 → メモのバックアップ先 から開いたり変更したりできます。',
        },
        {
          q: '書いておいたメモを、ファイルに書き出せますか？',
          a: 'はい。1枚だけ保存することも（ステッカーを右クリック → 保存）、9枚をまとめて書き出すこともできます（パレットの ••• → ステッカー → エクスポート）。まとめて書き出すときはテキストとCSVから選べるので、表計算ソフトでそのまま開けます。',
        },
        {
          q: 'ほかの場所に書いておいた文章を、メモに取り込めますか？',
          a: 'はい。ステッカーを右クリック → 読み込み で、テキストファイルをそのまま読み込めます。今の内容を上書きする前に確認画面が出ます。',
        },
        {
          q: 'メモに書いたリンクやフォルダーのパスは、そのまま開けますか？',
          a: 'はい。Ctrlを押しながらクリックすると、既定のブラウザーやエクスプローラーですぐ開きます。',
        },
        {
          q: 'ステッカーを増やしたり、メモを飾ったりできますか？',
          a: 'ステッカーは9枚と決めています。色を見るだけで9枚すべてを覚えていられることがこのアプリのいちばん大事なところで、数を増やすとその良さが薄れてしまいます。見た目を飾る機能を最小限にしているのも同じ理由です。ただし色は例外で、6つの枠のプリセットを好きなように設定できます。',
        },
        {
          q: 'メモをサーバーに送っていますか？',
          a: 'いいえ。メモはお使いのPCの中だけに保存されます。更新のお知らせのために、GitHubで新しいバージョンが出ていないかを確認するだけで、そのときもメモや個人情報は送りません。',
        },
      ],
    },
    footer: {
      contact: 'お問い合わせ',
      otherTool: '同じ開発者の他のツール',
      credits: '使用したオープンソース',
      licence: 'ライセンス',
      copyright: '© 2026 TabStick.',
    },
  },
} as const

export const t = computed(() => dict[lang.value])
