import { ref, computed } from 'vue'

export type Lang = 'ko' | 'en' | 'vi'

export const lang = ref<Lang>('ko')

export function toggleLang() {
lang.value = lang.value === 'ko' ? 'en' : lang.value === 'en' ? 'vi' : 'ko'
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
      otherToolName: 'Edgetree',
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
      otherTool: 'Another tool by the same maker',
      otherToolName: 'Edgetree',
      credits: 'Open source used',
      licence: 'Licence',
      copyright: '© 2026 TabStick.',
    },
  },
  vi: {
    nav: {
        why: 'Tại sao',
        screenshots: 'Tính năng',
        features: 'Thêm',
        howto: 'Cách hoạt động',
        download: 'Tải xuống',
        faq: 'Câu hỏi thường gặp',
    },
    hero: {
        eyebrow: 'Ứng dụng ghi chú dán chỉ mục cửa sổ',
        title: 'TabStick',
        tagline: 'Gắn ghi chú cạnh cửa sổ thuộc về nó — không phải trên màn hình nền của bạn.',
        badges: ['Miễn phí', 'Không quảng cáo', 'Ghi chú của bạn ở lại trên máy tính của bạn'],
    },
    why: {
        title: 'Tại sao tôi tạo ra nó',
        items: [
            // 카카오톡은 영어권에 안 통해 일반화한다(a chat window).
            'Tôi từng gửi nhầm nội dung vào cửa sổ trò chuyện nhầm lẫn, và chưa bao giờ muốn làm lại điều đó.',
            'Trò chuyện với AI, một phím Enter lạc lối sẽ gửi nửa tin nhắn và tự động kết thúc lượt.',
            // ⚠️ **여기의 sticky notes는 모니터 옆에 붙이던 진짜 포스트잇이다** - 앱 이야기가
            // 아니다. 다른 곳의 sticky note는 Windows 기본 앱과 겹쳐서 걷어냈지만(2026-08-18),
            // 이 줄만은 그대로 둔다. 앱을 만든 이유가 여기 있다.
            'Các ghi chú dán cạnh màn hình của tôi cứ bị rơi ra.',
            'Nấu ăn theo công thức, tôi cảm thấy mệt mỏi vì phải cuộn trang giữa các nguyên liệu và các bước.',
            'Tìm lại một video xem dở từ lịch sử duyệt web thực sự là một việc vặt mệt mỏi.',
        ],
    },
    screenshots: {
        title: 'Tính năng',
        items: [
            {
                // 제목의 its가 가리킬 것이 제목 안에 없었다(2026-08-18 검수). 스티커를 앞에 세운다.
                title: 'Nhấp vào một nhãn dán, đưa cửa sổ của nó lên phía trước',
                desc: 'Dù bạn mở bao nhiêu cửa sổ, việc nhấp vào một nhãn dán sẽ kéo cửa sổ của nó lên trên cùng. Không còn phải tìm kiếm qua các biểu tượng thanh tác vụ giống hệt nhau — hãy chọn cửa sổ theo màu sắc của nó.',
            },
            {
                title: 'Mỗi ghi chú ở lại với cửa sổ của nó',
                desc: 'Nó di chuyển cùng cửa sổ, thu nhỏ cùng cửa sổ và quay trở lại bảng màu khi cửa sổ đóng lại. Đóng nhầm một cửa sổ và những gì bạn đã viết vẫn ở đó.',
            },
            {
                title: 'Quản lý chỉ với chín nhãn dán',
                desc: 'Chín ghi chú, và thế là hết. Nhớ từng cái qua màu sắc của chúng, viết, xóa và tái sử dụng, đồng thời chỉ lưu giữ những ghi chú quan trọng một cách riêng biệt.',
            },
            {
                title: 'Bất kỳ hướng nào, bất kỳ vị trí nào',
                desc: 'Gắn tối đa ba ghi chú vào một cửa sổ và mở từng ghi chú một. Khi đã gắn, hãy di chuyển ghi chú sang bên trái hoặc bên phải của cửa sổ, bên trong hoặc bên ngoài, sau đó tinh chỉnh dịch lên hoặc xuống.',
            },
            {
                title: 'Thả mọi thứ thẳng vào một ghi chú',
                desc: 'Thả một liên kết YouTube hoặc một số văn bản thẳng vào ghi chú. Nhấn Ctrl+nhấp vào liên kết để chuyển thẳng đến đó. Hoặc ngược lại: kéo một địa chỉ hoặc văn bản từ cửa sổ lên ghi chú và nó sẽ được thả vào nguyên trạng.',
            },
            {
                // 제목이 "모양 셋과 크기 셋"으로 읽혔다. 크기는 자유다.
                title: 'Ba hình dạng bảng màu, mọi kích thước',
                desc: 'Chọn kiểu mặc định, hàng hoặc cột, sau đó đặt kích thước bạn muốn. Bảng màu luôn chỉ cách một cú nhấp chuột trên menu khay hệ thống.',
            },
            {
                title: 'Màu sắc và dấu ấn của riêng bạn',
                desc: 'Lưu màu ghi chú và văn bản bạn thích làm cài đặt sẵn, sẵn sàng chọn bất cứ khi nào bạn muốn. Đánh dấu các dòng của bạn bằng các ký hiệu bạn hay dùng nhất, hoặc thêm hộp kiểm.',
            },
            {
                // ▣ **두 문장으로 나눈다**(2026-08-18 검수). 한 문장에 서로 다른 예시 둘이 들어 있어
                // 페이지에서 가장 읽기 어려운 자리였다. 예시 숫자는 캡처와 맞춘 국문 그대로 둔다.
                title: 'Cộng dồn mà không cần rời khỏi ghi chú',
                desc: 'Chọn các dòng chứa số, chọn phép toán từ menu nhấp chuột phải và kết quả sẽ xuất hiện bên dưới chúng. Một dòng được viết là 11.68 * 2 được nhân lên trước, sau đó được cộng vào khi bạn nhấn +. Đặt ngân sách của bạn ở dòng trên cùng, chọn tất cả và nhấn - để xem phần còn lại.',
            },
        ],
    },
    features: {
        title: 'Thêm',
        items: [
        { title: 'Khóa ghi chú', desc: 'Khóa ghi chú mà bạn không muốn thay đổi. Ghi chú đã khóa không thể được chỉnh sửa hoặc xóa cho đến khi bạn mở khóa.' },
        // 국문 '전체 잠금'과 짝. UI 라벨이 그대로 Lock all이라 문장 안에서도 그 말을 쓴다.
        { title: 'Khóa tất cả', desc: 'Bạn rời khỏi bàn làm việc phải không? Khóa tất cả sẽ thu gọn mọi ghi chú đã đính kèm đi ngay lập tức. Nó nằm trên bảng màu và trong menu khay hệ thống.' },
        { title: 'Tự động lưu và sao lưu', desc: 'Lưu khi bạn gõ hoặc chỉnh sửa, đồng thời ghi lại một bản sao lưu riêng biệt bất cứ khi nào ứng dụng đóng lại hoặc bạn xóa ghi chú.' },
        // 국문 '파일로 내보내기'와 짝. 보관함의 영문 라벨은 Stickers다(tray.archive).
        { title: 'Xuất ra tệp', desc: 'Mở phần Nhãn dán để xem tất cả chín ghi chú ở cùng một nơi, và xuất chúng dưới dạng tệp TXT hoặc CSV.' },
        // ▣ 사용방법 3단계와 겹치던 절차 설명을 걷고 쓰임 쪽으로 돌렸다(2026-08-18 검수).
        { title: 'Danh sách và hộp kiểm', desc: 'Đặt dấu đầu dòng hoặc dấu gạch ngang ở đầu các dòng của bạn, và thêm vào việc cần làm một hộp kiểm mà bạn có thể tích bằng cách Ctrl+nhấp.' },
        { title: 'Lưu màu sắc của riêng bạn', desc: 'Lưu màu nền và màu văn bản ở mỗi sáu ô làm cài đặt sẵn, sẵn sàng chọn bất cứ khi nào bạn muốn.' },
        // 'has left the palette'는 스티커가 스스로 나간 것으로 읽혔다(2026-08-18 검수).
        { title: 'Tìm nhãn dán', desc: 'Theo dõi một nhãn dán đang ở trên cửa sổ và đưa nó quay trở lại bảng màu.' },
        // 국문 '트레이 메뉴'와 짝. 'Start with Windows' 앞에 두는 이유는 국문 주석에.
        { title: 'Menu khay hệ thống', desc: 'Ẩn bảng màu và biểu tượng khay hệ thống vẫn giữ nguyên vị trí. Nhấp chuột phải vào nó để có các màu sắc giống như bảng màu — lấy ngay một nhãn dán, hoặc truy cập Khóa tất cả và Nhãn dán từ đó.' },
        // ⚠ 1.4.5에서 동작이 바뀌었다 - 부팅으로 시작하면 팔레트 없이 트레이에서 뜬다.
        // 설정의 실제 라벨은 'Start with Windows'라 제목을 그대로 두고 본문이 새 동작을 말한다.
        // 제목이 주어를 못 세워서 본문 첫 마디에 TabStick을 적는다(검수).
        { title: 'Khởi động cùng Windows', desc: 'Đặt TabStick chạy khi Windows khởi động. Nó hiện lên ở khay hệ thống với bảng màu được ẩn đi, do đó không có gì che khuất màn hình của bạn.' },
    ],
},
howto: {
    title: 'Cách hoạt động',
    steps: [
        {
            title: 'Chọn nhãn dán, nhấp vào cửa sổ',
            desc: 'Nhấp vào một màu trong bảng màu và nhãn dán sẽ đi theo con trỏ của bạn. Nhấp vào bất kỳ đâu trên cửa sổ bạn muốn và nó sẽ dính vào. Để hủy, hãy nhấp chuột phải, nhấp vào màn hình nền hoặc nhấn Esc. Khi bảng màu bị ẩn, hãy nhấp chuột phải vào biểu tượng khay hệ thống để truy cập các màu tương tự.',
        },
        {
            title: 'Ghi nhanh lại',
            desc: 'Viết ngay khi ý tưởng xuất hiện. Ngay cả một ký tự duy nhất cũng được lưu tự động, và các liên kết hoặc đường dẫn mở ra bằng Ctrl+nhấp.',
        },
        {
            title: 'Tạo hình cho ghi chú',
            desc: 'Chọn nhiều dòng và chọn một biểu tượng từ menu nhấp chuột phải để đặt một biểu tượng vào đầu mỗi dòng. Đối với danh sách việc cần làm, hãy thêm hộp kiểm và sử dụng chúng bằng Ctrl+nhấp. Kích thước văn bản, khoảng cách dòng và màu sắc ghi chú đều có thể được thiết lập cho từng ghi chú.',
        },
        {
            // 괄호는 "이 설정이 스티커 전체에 걸린다"는 뜻이다(코드에서 확인 - 좌/우·안/밖은
            // _settings에 있어 창마다가 아니라 앱 전체 값이다). 검수가 물은 두 뜻 중 이쪽이다.
            title: 'Định vị và thay đổi kích thước ghi chú',
            desc: 'Từ menu nhấp chuột phải của nhãn dán, hãy đưa ghi chú sang bên trái hoặc bên phải của cửa sổ, bên trong hoặc bên ngoài (cài đặt này áp dụng cho mọi nhãn dán). Kéo một cạnh hoặc góc để thay đổi kích thước, hoặc nhấp đúp vào một cạnh để khớp với cạnh đó — cạnh dưới khớp với chiều cao, cạnh trái khớp với chiều rộng và góc sẽ đặt lại cả hai. Giữ phím Shift trong khi thay đổi kích thước để bám vào lưới 20px — rất tiện dụng để làm cho nhiều ghi chú có cùng kích thước.',
        },
        {
            title: 'Gỡ ra, đặt lại',
            desc: 'Đóng ứng dụng và các nhãn dán sẽ quay trở lại bảng màu. Bạn cũng có thể gửi một nhãn dán quay lại từ menu của nó, hoặc nhấp chuột phải vào ô bảng màu trống để lấy lại — sau đó dán nó lên một cửa sổ khác.',
        },
        {
            title: 'Nhãn dán và cài đặt',
            desc: 'Nút ••• trên bảng màu mở ra tab Nhãn dán, và menu khay hệ thống cũng vậy: xem tất cả chín ghi chú ở một nơi, xuất chúng ra tệp hoặc xóa chúng. Cài đặt bao gồm hình dạng bảng màu, kích thước ứng dụng và nhãn dán, kích thước văn bản và khoảng cách dòng, màu sắc ghi chú, chế độ tối/sáng và ngôn ngữ.',
        },
    ],
},
download: {
    title: 'Tải xuống',
    recommend: 'Được khuyên dùng',
    cta: 'Tải xuống',
    pending: 'Sắp ra mắt',
    setupTitle: 'Trình cài đặt',
    setupDesc: 'Tải xuống, bấm qua, hoàn tất — nó nằm trong menu Bắt đầu của bạn và gỡ cài đặt sạch sẽ.',
    portableTitle: 'Bản di động (Portable)',
    portableDesc: 'Giải nén và chạy. Không cần cài đặt.',
    lightTitle: 'Bản rút gọn (Light)',
    lightDesc: 'Cần có .NET 8 Desktop Runtime.',
    // 영문은 Changelog로 적는다(2026-08-05) - 아카이브들이 그 낱말로 찾는데 "Update notes"는
    // 못 잡아, oldergeeks 등록 페이지의 변경 사항 칸이 "찾을 수 없음"으로 비었다.
    notesTitle: 'Nhật ký thay đổi',
    notesOlder: 'Ghi chú cập nhật cũ hơn',
    notesNewer: 'Ghi chú cập nhật mới hơn',
    notes: [
        {
            version: '1.4.6',
            items: [
                'Đã sửa lỗi biểu tượng khay hệ thống không hiển thị khi TabStick khởi động cùng Windows',
                'Bảng màu sẽ hiển thị trở lại ở trạng thái ẩn nếu bạn để nó ở trạng thái ẩn',
                'Nhấp đúp vào nút ••• để đưa bảng màu vào khay hệ thống',
                'Menu nhấp chuột phải của nhãn dán hiển thị tách biệt rõ ràng khỏi nhãn dán',
            ],
        },
        {
            version: '1.4.5',
            items: [
                'Menu khay hệ thống đóng lại khi bạn nhấp ra ngoài',
                'Khởi động cùng Windows giờ đây sẽ bắt đầu trong khay hệ thống, không hiển thị bảng màu',
                'Có thể nhấc các nhãn dán trực tiếp từ menu khay hệ thống',
            ],
        },
        {
            version: '1.4.4',
            items: [
                'Việc gõ phím và cuộn trang trong một ghi chú dài nhanh hơn rất nhiều',
                'Thông báo cho bạn biết khi văn bản được dán bị cắt bớt cho vừa vặn',
                'Khi một ghi chú đang mở, menu nhấp chuột phải của nhãn dán mở ra không bị che khuất',
            ],
        },
        {
            version: '1.4.3',
            items: [
                'Các ghi chú bám sát cạnh cửa sổ hơn trong lúc bạn di chuyển nó',
                'Thanh cuộn của ghi chú dễ cầm nắm lại hơn',
                'Việc thay đổi kích thước hoặc cuộn một ghi chú có toàn bộ văn bản được chọn trở nên nhẹ nhàng hơn rất nhiều',
            ],
        },
    ],
    {
            version: '1.4.2',
            items: [
                'Đã sửa lỗi giảm tốc độ khi thay đổi kích thước ghi chú với toàn bộ văn bản được chọn',
            ],
        },
        {
            version: '1.4.0',
            items: [
                'Cài đặt kích thước nay nằm chung lại, dưới mục [Kích thước tổng thể]. Di chuyển mục này thì nhãn dán, bảng màu và các menu sẽ đi theo - hoặc thiết lập riêng lẻ từng mục',
                'Khóa mọi thứ từ bảng màu hoặc khay hệ thống - mọi ghi chú đều được thu gọn lại ngay lập tức, dùng cho khi bạn rời khỏi bàn làm việc',
                'Khóa ghi chú nay đổi thành [Khóa chỉnh sửa], nằm ở cuối menu nhấp chuột phải của ghi chú - khóa ngay tại nơi bạn đang viết',
                'Đưa bảng màu đến nhãn dán từ menu nhấp chuột phải của nó, và thêm các dòng trống từ menu ghi chú',
                'Cải tiến và sửa lỗi',
            ],
        },
        {
            version: '1.3.0',
            items: [
                'Nhấp chuột phải vào nhãn dán để đổi sang ghi chú khác hoặc thêm ghi chú mới - khi nhãn dán đầu tiên đã hiển thị, không cần thao tác với bảng màu',
                'Cải tiến và sửa lỗi',
            ],
        },
        {
            version: '1.2.1',
            items: [
                'Ứng dụng nay thông báo cho bạn khi có phiên bản mới - hãy kiểm tra tab Giới thiệu hoặc menu khay hệ thống để nhận phiên bản mới ở đó',
                'Các ký hiệu, kích thước văn bản và dòng tổng dễ sử dụng hơn trong ghi chú - vùng chọn được giữ nguyên ngay cả khi cú nhấp chuột phải nằm ở bên ngoài vùng chọn',
                'Cải tiến và sửa lỗi',
            ],
        },
        {
            version: '1.2.0',
            items: [
                'Tính toán bên trong ghi chú - chọn các số và sử dụng + - × ÷ % trong menu nhấp chuột phải',
                'Một dòng được viết 2500 * 4 được tính là tích của nó. Viết danh sách như bình thường và nhấn + để tính tổng, hoặc đặt ngân sách của bạn ở dòng đầu tiên và nhấn - để xem phần còn lại',
                'Cài đặt hiển thị ngay dòng tiêu đề ghi chú, và có thể kéo dòng đó để di chuyển ghi chú',
                'Chọn xem nhãn dán có di chuyển bên trong cửa sổ lấp đầy màn hình hay không',
                'Cải tiến và sửa lỗi',
            ],
        },
        {
            version: '1.1.0',
            items: [
                'Tạo trang ghi chú của riêng bạn (cài đặt sẵn). Thiết lập màu nền và màu văn bản trong mỗi sáu ô và chọn từ các ô đó.',
                'Khoảng cách dòng gồm tám mức',
                'Chọn nhiều dòng và chọn một ký hiệu để định dạng phần đầu của chúng',
                'Hộp kiểm, được tích và bỏ tích bằng cách Ctrl+nhấp vào hộp kiểm',
                'Nhấp đúp vào một cạnh nay đơn giản là khớp chiều rộng hoặc khớp chiều cao',
                'Đặt lại nhãn dán - tách rời, mở khóa và làm trống trong một lần nhấn',
                'Cải tiến và sửa lỗi',
            ],
        },
        {
            version: '1.0.8',
            items: [
                'Gõ phím trong ghi chú dài mượt mà hơn rất nhiều',
                'Cài đặt giữ cho kích thước ghi chú đồng bộ trong một cửa sổ',
            ],
        },
        {
            version: '1.0.7',
            items: [
                'Cải thiện hiệu suất và sửa lỗi',
                'Tên các mục gọn gàng hơn trong menu nhấp chuột phải của nhãn dán',
            ],
        },
        {
            version: '1.0.6',
            items: [
                'Thay đổi kích thước và di chuyển cửa sổ mượt mà hơn',
                'Kéo ghi chú bằng cạnh trên hoặc tiêu đề của nó để di chuyển lên hoặc xuống',
                'Nhãn dán của một ghi chú đang mở nay hiển thị hình cây bút chì',
            ],
        },
        {
            version: '1.0.5',
            items: [
                'Nhấp vào cuối dòng nay đưa con trỏ văn bản đến đó',
                'Con trỏ văn bản và vùng chọn nổi bật rõ ràng hơn',
                'Thanh cuộn dễ nhìn hơn',
            ],
        },
        {
            version: '1.0.4',
            items: [
                'Kích thước bảng màu: Nhỏ / Bình thường / Lớn → 50-130%',
                'Phạm vi kích thước văn bản ghi chú được mở rộng thành 11-24',
                'Shift + nhấp vào nhãn dán → đưa cửa sổ của nó lên phía trước mà không mở ghi chú',
            ],
        },
        {
            version: '1.0.3',
            items: [
                'Nhấp chuột phải vào nhãn dán → Tiêu đề → tiêu đề xuất hiện trên ghi chú (chỉnh sửa trực tiếp tại đó)',
                'Màu phông chữ / nền ghi chú → đã chuyển sang menu nhấp chuột phải của ghi chú',
                'Đã thêm mục Nhấp chuột phải vào nhãn dán → Nhấc lại',
                'Đã thêm tùy chọn khởi động cùng Windows',
                'Đã thêm tùy chọn kích thước cho mọi menu nhấp chuột phải',
            ],
        },
    ],
    mobileNote: 'TabStick chạy trên Windows.\nSao chép liên kết và mở nó trên máy tính của bạn.',
    copyLink: 'Sao chép liên kết',
    copied: 'Đã sao chép',
    soon: 'Đang chuẩn bị liên kết tải xuống.',
    // 영문 화면에서는 언어 이름도 영어로 적는다 - 긁어 가는 쪽이 읽는 것은 이 화면이다.
    requirement: 'Windows 10 / 11 · 64-bit · Tiếng Anh · Tiếng Hàn',
    bothApps:
      'Cài đặt .NET 8 Desktop Runtime một lần và bản Light sẽ trở thành một tùy chọn — cũng như Edgetree, một ứng dụng khác, từ một tệp nhỏ duy nhất. (Tải xuống nhỏ hơn và số liệu bộ nhớ hiển thị dung lượng thực tế đang được sử dụng.)',
    smartscreeNote: // Hoặc giữ nguyên smartscreenNote
      'Nếu SmartScreen của Windows xuất hiện trong lần chạy đầu tiên, hãy chọn Thêm thông tin → Vẫn chạy.',
    },
    faq: {
      title: 'Các câu hỏi thường gặp',
      items: [
        {
          q: 'Tôi có phải lưu ghi chú của mình thủ công không?',
          a: 'Không — bạn không bao giờ phải tự lưu bất cứ thứ gì. Ứng dụng sẽ lưu ngay khi bạn dừng gõ và lưu lại lần nữa ngay khi bạn nhấp ra ngoài. Tắt máy tính, đưa nhãn dán trở lại cửa sổ và những gì bạn đã viết vẫn ở đó.',
        },
        {
          q: 'Nếu tôi đóng cửa sổ, tôi có bị mất những gì đã viết không?',
          a: 'Không. Nhãn dán sẽ quay trở lại bảng màu và mọi thứ bạn viết sẽ đi kèm với nó. Thả nó lên một cửa sổ khác và ghi chú của bạn sẽ y nguyên như lúc bạn rời đi.',
        },
        {
          // ▣ '못 하는 것'을 신뢰의 근거로 돌려 놓은 답이라 뜻은 그대로 두고 말만 고쳤다
          // (2026-08-18 검수). tricks → undocumented workarounds가 이 맥락의 표준 단어이고,
          // Microsoft → Windows가 자연스럽다.
          q: 'Nếu tôi mở lại cửa sổ, ghi chú có tự động quay lại không?',
          a: 'Không tự động. TabStick chỉ sử dụng những gì Windows hỗ trợ chính thức. Việc tự động đính kèm lại sẽ có nghĩa là phải dựa vào các cách giải quyết không chính thức, vì vậy tính năng đó bị bỏ qua có chủ ý. Nhãn dán đang đợi trong bảng màu — hãy lấy nó, thả lên cửa sổ mới và tiếp tục.',
        },
        {
          // ⚠⚠ **`Memo backup folder`는 앱의 실제 라벨이라 그대로 둔다.** 검수는 `Note backup
          // folder`로 바꾸자고 했는데, 앱 설정에 그 글자가 없어서 찾아 들어간 사람이 못 찾는다.
          // 랜딩이 앱 화면을 인용하는 자리는 앱 표기가 먼저다 - 용어 통일은 앱을 옮긴 다음이다.
          q: 'Tôi vô tình xóa ghi chú. Tôi có thể lấy lại không?',
          a: 'Một bản sao được ghi tự động ngay trước khi ghi chú bị xóa (và một lần nữa khi ứng dụng đóng lại). Tên tệp mang theo ngày tháng và màu sắc của nhãn dán, vì vậy bạn có thể nhận ra ngay lập tức — ví dụ: backup_260728_yellow_0001.txt. Thư mục mặc định nằm trong TabStick dưới mục Documents; mở hoặc thay đổi thư mục này trong menu ứng dụng → Cài đặt → Thư mục sao lưu ghi chú.',
        },
        {
          q: 'Tôi có thể xuất ghi chú ra tệp không?',
          a: 'Có — xuất từng cái một hoặc xuất tất cả cùng lúc. Nhấp chuột phải vào nhãn dán và chọn Lưu cho riêng ghi chú đó; đối với tất cả mọi thứ, hãy mở Nhãn dán từ nút ••• trên bảng màu và sử dụng Xuất. Tính năng xuất hàng loạt cung cấp văn bản thuần túy hoặc CSV, do đó tệp có thể mở trực tiếp trong bảng tính.',
        },
        {
          q: 'Tôi có thể nhập tệp văn bản vào ghi chú không?',
          a: 'Có. Nhấp chuột phải vào nhãn dán và chọn Tải lên để đưa tệp văn bản vào. Ứng dụng sẽ hỏi trước khi thay thế bất kỳ nội dung nào đã có sẵn.',
        },
        {
          q: 'Tôi có thể mở các liên kết và đường dẫn tệp từ ghi chú không?',
          a: 'Có. Ctrl+nhấp sẽ mở một liên kết trong trình duyệt mặc định của bạn hoặc một đường dẫn trong File Explorer.',
        },
        {
          // ★ **길이가 아니라 어조가 문제였다**(2026-08-18). 이유를 한 문장으로 말하면 결정으로,
          // 세 문장으로 말하면 변명으로 들린다. 그리고 'dressing it up'은 원한 사람을 깎는 말이라
          // 뺐다. 제한을 **사용자가 얻는 것**(색으로 아홉을 다 기억한다)으로 바꿔 말한다 -
          // 색이 불변 인덱스라는 대원칙 그대로다.
          q: 'Tôi có thể thêm nhiều hơn chín nhãn dán hoặc tùy chỉnh giao diện của ghi chú không?',
          a: 'Chín là giới hạn, và đó là điều có chủ ý. Điểm mấu chốt là giữ số lượng ghi chú ít để bạn có thể nhớ từng ghi chú bằng màu sắc — có nhiều nhãn dán hơn sẽ đi ngược lại điều đó. Kiểu dáng được giữ ở mức nhẹ nhàng vì lý do tương tự. Màu sắc là ngoại lệ: sáu ô cài đặt sẵn là để bạn tự thiết lập theo ý muốn.',
        },
        {
          q: 'Ghi chú của tôi có được gửi lên máy chủ không?',
          a: 'Không. Chúng chỉ được lưu trữ trên máy tính của bạn. Ứng dụng kiểm tra GitHub để tìm phiên bản mới hơn nhằm thông báo cho bạn — ngay cả khi đó, không có ghi chú hoặc dữ liệu cá nhân nào được gửi đi.',
        },
      ],
    },
    footer: {
      contact: 'Yêu cầu',
      otherTool: 'Một công cụ khác của cùng tác giả',
      otherToolName: 'Edgetree',
      credits: 'Mã nguồn mở được sử dụng',
      licence: 'Giấy phép',
      copyright: '© 2026 TabStick.',
    },
  },      
} as const

export const t = computed(() => dict[lang.value])
