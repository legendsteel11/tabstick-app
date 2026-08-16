import { ref, computed } from 'vue'

export type Lang = 'ko' | 'en'

export const lang = ref<Lang>('ko')

export function toggleLang() {
  lang.value = lang.value === 'ko' ? 'en' : 'ko'
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
        // 겹쳐도 된다(사용자 판단) - 저쪽은 찾아보는 자리고 여기는 보여주는 자리다.
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
        // '편리한 앱 메뉴' 카드는 2026-07-27에 뺐다. 관리 화면이 있다는 얘기라 어느 앱에나
        // 있는 것이고, 받을 이유를 만드는 힘이 여섯 중 제일 약했다(사용자 판단). 캡처 spc-06은
        // 파일로 남겨 뒀다.
      ],
    },
    features: {
      title: '기타기능',
      items: [
        { title: '메모 잠금', desc: '중요한 메모는 잠시 잠가둘 수 있습니다. 잠긴 메모는 잠금을 풀 때까지 수정하거나 지울 수 없습니다.' },
        // 저장과 백업을 한 칸에 합쳤다(2026-07-28). 둘 다 '알아서 남긴다'는 한 얘기라
        // 따로 세울 때보다 붙여 놓는 편이 뜻이 선명하고, 그 자리에 자동 시작이 들어왔다.
        { title: '자동 저장·백업', desc: '글자를 입력하거나 바꿀 때 자동으로 저장되고, 앱을 종료하거나 내용을 삭제할 때는 따로 백업을 남깁니다.' },
        // 2026-08-03에 들어왔다. '편집 기능'(우클릭으로 기호·구분선 입력)이 있던 자리인데,
        // 그 카드가 말하던 것을 이 카드가 넓혀서 담는다 - 둘을 나란히 두면 사용자 눈에는
        // 같은 얘기가 두 번이다.
        { title: '목록과 체크박스', desc: '여러 줄을 선택해 기호를 누르면 각 줄 앞에 붙습니다. 할 일에는 체크박스를 달아 Ctrl+클릭으로 사용하세요.' },
        { title: '메모 색 만들기', desc: '메모지 색을 취향대로 바꿔 보세요. 여섯 칸마다 배경색과 글자 색을 프리셋으로 만들고 언제든지 선택해 사용할 수 있습니다.' },
        { title: '스티커 찾기', desc: '팔레트에서 떠난 스티커를 추적하고 회수할 수 있습니다.' },
        { title: '자동 시작', desc: '윈도우를 켤 때 팔레트가 함께 올라오도록 설정할 수 있습니다.' },
        // '설정 기억'은 2026-08-03에 뺐다. 설정이 유지되는 것은 어느 앱에서나 당연해서, 적어
        // 두면 오히려 "안 그런 앱도 있나" 쪽으로 읽힌다. 여섯 칸이 3열에 정확히 떨어지기도 한다.
      ],
    },
    howto: {
      title: '사용방법',
      steps: [
        {
          title: '스티커를 집어 창에 붙이기',
          desc: '팔레트에서 색 하나를 클릭하면 스티커가 커서에 붙습니다. 그대로 원하는 프로그램 창 아무 곳이나 클릭하면 부착됩니다. 옮기는 중에는 우클릭·바탕화면 클릭·ESC로 언제든 취소할 수 있습니다.',
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
          desc: '팔레트의 ••• 버튼을 누르면 스티커 관리가 열립니다. 아홉 메모의 내용을 한자리에서 보고, 파일로 내보내거나 삭제할 수 있습니다. 설정에서는 팔레트 모양, 앱·스티커 크기, 글자 크기와 줄 간격, 메모지 색, 다크/라이트, 언어를 바꿉니다.',
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
      // 새로 생긴 것만 적는다 - 고친 자리는 받는 사람에게 "그동안 고장나 있었다"로 읽힌다.
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
      requirement: 'Windows 10 / 11 · 64비트 · 한국어 · English',
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
          q: '메모를 쓰는 중에 매번 저장해야 하나요?',
          // '저장 버튼이 없다'고 쓰지 않는다 - 스티커 메뉴에 저장이 실제로 있고, 그것은
          // 메모를 파일로 빼내는 기능이라 뜻이 다르다. 아래 내보내기 항목과 부딪힌다.
          a: '아니요, 따로 저장하지 않아도 됩니다. 타이핑을 멈추면 곧바로, 다른 곳을 클릭하면 그 순간 저장됩니다. 컴퓨터를 껐다 켠 뒤 스티커를 다시 붙여도 쓰던 글이 그대로 있습니다.',
        },
        {
          q: '창을 닫으면 메모 내용이 사라지나요?',
          a: '아니요. 스티커는 팔레트로 돌아오고, 적어 둔 내용은 그대로 남습니다. 다른 창에 다시 붙이면 쓰던 메모가 그대로 이어집니다.',
        },
        {
          q: '닫았던 창을 다시 열면 메모가 자동으로 붙나요?',
          a: '자동으로 붙지는 않습니다. 마이크로소프트가 공식적으로 허용하는 기술만 써서 만들었고, 편법을 쓰면 가능했더라도 의도적으로 넣지 않았습니다. 스티커는 팔레트에 돌아와 있으니, 집어서 새 창에 붙이면 그대로 이어집니다.',
        },
        {
          q: '저장하지 않고 메모를 삭제해 버렸어요.',
          // 앱이 쓰는 말을 그대로 쓴다 - 랜딩에서만 다르게 부르면 찾아 들어간 화면에 그
          // 낱말이 없다. 한 장을 비우는 자리는 2026-08-03에 '내용 삭제'에서 '스티커 초기화'로
          // 바뀌었고, 전체를 지우는 '메모 전체 삭제'는 그대로다. 그래서 여기서는 버튼 이름을
          // 부르지 않고 '삭제'라는 일반적인 말로만 받는다 - 어느 쪽으로 지웠든 답이 같다.
          a: '메모 내용을 삭제하기 직전에 사본이 자동으로 남습니다(앱을 종료할 때도 남습니다). 파일 이름이 날짜와 스티커 색으로 되어 있어 눈으로 바로 찾을 수 있습니다 — backup_260728_yellow_0001.txt 같은 식입니다. 폴더는 문서 아래 TabStick이 기본이고, 앱 메뉴 → 설정 → 메모 백업 위치에서 열어 보거나 바꿀 수 있습니다.',
        },
        {
          q: '적어 둔 메모를 파일로 빼낼 수 있나요?',
          a: '네. 한 장만 따로 저장할 수도 있고(스티커 우클릭 → 저장), 아홉 장을 한꺼번에 내보낼 수도 있습니다(팔레트의 ••• → 스티커 관리 → 내보내기). 한꺼번에 내보낼 때는 텍스트와 CSV 중에 고를 수 있어, 표 계산 프로그램에서 바로 열립니다.',
        },
        {
          q: '다른 데 적어 둔 글을 메모로 가져올 수 있나요?',
          a: '네. 스티커 우클릭 → 불러오기로 텍스트 파일을 그대로 읽어옵니다. 지금 적혀 있는 글을 덮어쓰기 전에 한 번 물어봅니다.',
        },
        {
          q: '메모에 적은 링크나 폴더 경로를 바로 열 수 있나요?',
          a: '네. Ctrl을 누른 채 클릭하면 기본 브라우저나 탐색기로 바로 열립니다.',
        },
        {
          q: '스티커를 더 늘리거나, 메모를 꾸밀 수 있나요?',
          a: '스티커는 9개로 고정입니다. 메모가 무한정 늘어나 오히려 관리가 어려워지는 것 — 그걸 덜어 보려고 만든 앱이라, 9개라는 제한이 이 앱의 출발점입니다. 꾸미기보다 메모 본연의 기능에 무게를 두고 있습니다. 다만 메모지 색은 여섯 칸을 직접 만들어 쓸 수 있게 열어 두었습니다.',
        },
        {
          q: '서버에 메모를 전송하나요?',
          a: '아닙니다. 오직 사용자의 PC에만 저장됩니다. 업데이트 안내를 위해 GitHub에서 새 버전이 나왔는지만 확인할 뿐이고, 그때도 메모나 개인정보는 보내지 않습니다.',
        },
      ],
    },
    footer: {
      contact: '문의',
      otherTool: '같은 개발자의 다른 도구',
      otherToolName: 'Edgetree',
      // 내장한 글꼴·아이콘 고지. 두 라이선스 모두 배포할 때 표기를 요구한다. 앱 정보 탭에도
      // 같은 두 줄이 있고(ArchiveWindow), 여기 것은 받기 전에도 볼 수 있게 두는 몫이다.
      credits: '사용한 오픈소스',
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
        'I had sent the wrong thing in a chat window once, and never wanted to again.',
        'Talking to an AI, I hated wasting tokens on a stray Enter mid-message.',
        'The sticky notes beside my monitor kept falling off.',
        'Following one recipe, I was tired of scrolling between the ingredients and the steps.',
        'Digging a half-watched video out of my history was a chore.',
      ],
    },
    screenshots: {
      title: 'Features',
      items: [
        {
          title: 'One click brings its window forward',
          desc: 'Stack as many windows as you like — clicking a sticker pulls its window to the front. No more hunting through identical taskbar icons; pick it by colour.',
        },
        {
          title: 'Every sticky note stays with its window',
          desc: 'It moves with the window, minimizes with it, and returns to the palette when the window closes. Close one by accident and what you wrote is still there.',
        },
        {
          title: 'Manage with just nine stickers',
          desc: 'Keep to nine sticky notes. Remember each by its color, reuse them as you write and wipe, and save only the important ones separately.',
        },
        {
          title: 'Any direction, any spot',
          desc: 'Attach up to three notes to a window and open each one. Once attached, move a note to the window’s left, right, inside, or outside — and up or down, of course.',
        },
        {
          title: 'From the window you’re on, straight into a note',
          desc: 'Drop a YouTube link or some text straight into a note. Ctrl+click a link to jump right to it. The other way round, drag an address or some text from the window onto a note and it lands there as it is.',
        },
        {
          title: 'Three palette shapes and sizes',
          desc: 'Pick default, row, or column — and a size to taste. The palette is always a tray-menu click away.',
        },
        {
          title: 'Your own colours and marks',
          desc: 'Save the paper and text colours you like as presets, ready to pick whenever you want them. Mark up your lines with the symbols you reach for most, or add checkboxes.',
        },
        {
          title: 'Add it up without leaving the note',
          desc: 'Select the lines that hold numbers, pick an operator from the right-click menu, and the answer appears below them. Lines written as 11.68 * 2 are multiplied first and then added when you press +, and with your budget on the top line, selecting everything and pressing - gives you what is left.',
        },
      ],
    },
    features: {
      title: 'More',
      items: [
        { title: 'Lock a note', desc: 'Lock an important note for a while. A locked note cannot be edited or cleared until you unlock it.' },
        { title: 'Saves and backs itself up', desc: 'Saves as you type or edit, and writes a separate backup whenever the app closes or content is deleted.' },
        { title: 'Lists and checkboxes', desc: 'Select several lines and pick a symbol to put one at the head of each. Add a checkbox to a to-do and use it with Ctrl+click.' },
        { title: 'Make your own paper', desc: 'Give the paper the colours you like. Save a background and a text colour in each of the six slots as presets, ready to pick whenever you want.' },
        { title: 'Find a sticker', desc: 'Track down and reclaim a sticker that has left the palette.' },
        { title: 'Start with Windows', desc: 'Set the palette to come up with your next boot.' },
      ],
    },
    howto: {
      title: 'How it works',
      steps: [
        {
          title: 'Pick a sticker, click a window',
          desc: 'Click a color in the palette and the sticker rides your cursor. Click anywhere on the window you want and it sticks. While carrying it, right-click, a desktop click, or ESC cancels.',
        },
        {
          title: 'Write it down, lightly',
          desc: 'Write as it comes to you. A single character saves automatically, and links or paths open with Ctrl+click.',
        },
        {
          title: 'Give the note some shape',
          desc: 'Select several lines and pick a symbol from the right-click menu to put one at the head of each. For a to-do list, add checkboxes and use them with Ctrl+click. Text size, line spacing and paper colour can each be set per note.',
        },
        {
          title: 'Place and size the paper',
          desc: 'From the sticker right-click menu, send the paper to the left or right of the window, inside or outside (applies to all stickers). Drag an edge or corner to resize, or double-click to fit that direction — the bottom edge fits the height, the left edge the width, and the corner puts both back. Hold Shift while resizing to snap to a 20px grid — handy for making several notes the same size.',
        },
        {
          title: 'Take it off, put it back',
          desc: 'Close the app and stickers return to the palette. You can also send one back from its menu, or right-click an empty palette slot to reclaim it — then stick it on a different window.',
        },
        {
          title: 'Stickers and settings',
          desc: 'The ••• button on the palette opens the Stickers tab: read all nine notes in one place, export them to a file, or delete them. Settings cover the palette shape, app and sticker size, text size and line spacing, paper colours, dark/light, and language.',
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
      requirement: 'Windows 10 / 11 · 64-bit · English · Korean',
      bothApps:
        'Install the .NET 8 Desktop Runtime once and the Light build becomes an option — as does Edgetree, another app, from a single small file. (A smaller download, and the memory figure shows what is actually in use.)',
      smartscreenNote:
        'If Windows SmartScreen appears on the first run, choose More info → Run.',
    },
    faq: {
      title: 'Frequently asked',
      items: [
        {
          q: 'Do I have to save while I am writing?',
          a: 'No — you never have to save it yourself. It saves the moment you stop typing, and again the moment you click away. Shut the PC down, put the sticker back, and what you wrote is still there.',
        },
        {
          q: 'If I close a window, do I lose what I wrote?',
          a: 'No. The sticker returns to the palette and everything you wrote stays with it. Drop it on another window and the memo carries on where it left off.',
        },
        {
          q: 'If I reopen a window I closed, does its memo come back on its own?',
          a: 'Not on its own. This was built only with what Microsoft officially permits, and while tricks could have made it work, they were deliberately left out. The sticker is waiting in the palette — pick it up, drop it on the new window, and carry on.',
        },
        {
          q: 'I deleted a memo without saving it.',
          a: 'A copy is written automatically just before a memo is deleted (and again when the app closes). The filename carries the date and the sticker colour, so you can spot it at a glance — backup_260728_yellow_0001.txt, for instance. The folder defaults to TabStick under Documents; open or change it under the app menu → Settings → Memo backup folder.',
        },
        {
          q: 'Can I get my notes out as a file?',
          a: 'Yes — one at a time or all at once. Right-click a sticker and choose Save for just that one; for everything, open Stickers from the ••• button on the palette and use Export. The bulk export offers plain text or CSV, so it opens straight into a spreadsheet.',
        },
        {
          q: 'Can I bring in something I wrote elsewhere?',
          a: 'Yes. Right-click a sticker and choose Load to read a text file straight in. It asks first, before replacing what is already written there.',
        },
        {
          q: 'Can I open a link or folder path written in a memo?',
          a: 'Yes. Ctrl+click opens it in your default browser or in Explorer.',
        },
        {
          q: 'Can I add more stickers, or restyle a memo?',
          a: 'Nine stickers, fixed. Notes piling up until they are harder to manage than helpful — easing that is why this app exists, so the limit of nine is where it starts. The weight goes on what a memo is for rather than on dressing it up. Paper colour is the one place left open: the six slots are yours to make.',
        },
        {
          q: 'Do my notes go to a server?',
          a: 'No. They are stored only on your PC. It checks GitHub for a newer version so it can tell you one exists — even then, no notes or personal data are sent.',
        },
      ],
    },
    footer: {
      contact: 'Requests',
      otherTool: 'Another tool by the same maker',
      otherToolName: 'Edgetree',
      credits: 'Open source used',
      copyright: '© 2026 TabStick.',
    },
  },
} as const

export const t = computed(() => dict[lang.value])
