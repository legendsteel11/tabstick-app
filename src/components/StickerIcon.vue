<script setup lang="ts">
// 섹션 제목 앞에 서는 스티커. 앱에 붙는 스티커와 같은 모양이다 - 팔레트 색 사각형에 우하단
// 흰 사각형(메모에 내용이 있다는 표시, 흰색 60%)을 얹는다. 비율은 앱과 같은 9:2:1이라 한 변을
// 12칸으로 나누면 표시는 9~11칸에 선다.
//
// 색은 섹션 차례대로 앱 팔레트의 순서를 따른다(초록은 연한 쪽 하나만):
// 제작동기 #DE2B26 · 특징 #F76B15 · 기타기능 #F2E33C · 사용방법 #86CF2E · 다운로드 #3E63DD · FAQ #D6409F
defineProps<{ color: string }>()
</script>

<template>
  <!-- 뜻을 더하지 않는 장식이라 스크린리더에서 뺀다. -->
  <svg class="sticker" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
    <rect width="12" height="12" :fill="color" />
    <rect x="9" y="9" width="2" height="2" fill="#fff" fill-opacity="0.6" />
  </svg>
</template>

<style scoped>
/* 크기는 여기 한 곳에서만 정한다. 24는 12칸의 배수라 한 칸이 2px로 딱 떨어져 모서리 표시가
   번지지 않는다. 제목 글자(26px)와 나란히 서는 높이다. */
.sticker {
  display: block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  shape-rendering: crispEdges;
}
</style>
