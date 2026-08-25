<script setup lang="ts">
/*
 * 이미지를 원본 크기로 펼쳐 보는 창.
 *
 * 카드 안의 스크린샷은 폭이 340px 남짓이라 무슨 화면인지만 알린다. 글자를 읽는 몫은
 * 여기가 받는다. 그래서 카드 쪽에서 잘라 넣을 이유가 없어지고, 찍을 때 트리밍에 맞춰
 * 다시 찍는 일도 없어진다.
 *
 * 열림 상태는 부모가 쥔다(v-model). 이 컴포넌트는 보여 주는 일만 한다.
 */
import { computed, onBeforeUnmount, watch } from 'vue'
import { lang } from '../i18n'

const props = defineProps<{
  /** 열린 컷의 자리. 닫혀 있으면 null. */
  modelValue: number | null
  sources: string[]
  alts: string[]
}>()

const emit = defineEmits<{ 'update:modelValue': [number | null] }>()

/* 버튼을 읽어 주는 이름. 화면에 글자로는 안 나오지만 스크린리더가 읽는다. */
const LABELS = {
  ko: { close: '닫기', prev: '이전 이미지', next: '다음 이미지' },
  en: { close: 'Close', prev: 'Previous image', next: 'Next image' },
  ja: { close: '閉じる', prev: '前の画像', next: '次の画像' },
} as const

const label = computed(() => LABELS[lang.value])
const isOpen = computed(() => props.modelValue !== null)
const current = computed(() =>
  props.modelValue === null ? null : props.sources[props.modelValue] ?? null,
)
const currentAlt = computed(() =>
  props.modelValue === null ? '' : props.alts[props.modelValue] ?? '',
)

function close() {
  emit('update:modelValue', null)
}

/* 끝에서 한 칸 더 가면 반대쪽으로 돈다. 아홉 컷을 훑어보는 자리라 막다른 끝이 없는 편이 낫다. */
function step(delta: number) {
  if (props.modelValue === null || props.sources.length === 0) return
  const n = props.sources.length
  emit('update:modelValue', (props.modelValue + delta + n) % n)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

/* 열려 있는 동안에만 키를 듣고, 뒤쪽 문서가 따라 스크롤되지 않게 막는다.
   막을 때 스크롤바 폭만큼 여백을 채워 넣지 않으면 페이지가 옆으로 한 번 튄다. */
watch(isOpen, (open) => {
  if (open) {
    window.addEventListener('keydown', onKeydown)
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
  } else {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
})

/* 창이 열린 채로 컴포넌트가 사라지면 잠근 스크롤이 그대로 남는다. */
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="overlay"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <button class="close" type="button" :aria-label="label.close" @click="close">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <button
          v-if="sources.length > 1"
          class="nav prev"
          type="button"
          :aria-label="label.prev"
          @click="step(-1)"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- 이미지 자체를 누르면 닫히지 않는다. 바깥(@click.self)만 닫는 자리다. -->
        <img v-if="current" class="shot" :src="current" :alt="currentAlt" />

        <button
          v-if="sources.length > 1"
          class="nav next"
          type="button"
          :aria-label="label.next"
          @click="step(1)"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(12, 16, 22, 0.82);
}

/* 화면을 넘지 않는 선에서 원본 화소를 그대로 쓴다. 원본보다 크게 늘리지는 않는다 -
   늘리면 흐려질 뿐이고, 카드에서 못 읽던 글자를 읽자고 여는 창이다. */
.shot {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
  background: #fff;
}

.close,
.nav {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  cursor: pointer;
  transition: background 0.15s ease;
}

.close:hover,
.nav:hover {
  background: rgba(255, 255, 255, 0.28);
}

.close {
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
}

.nav {
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 좁은 화면에서는 좌우 단추가 이미지를 덮는다. 넘기는 것은 스와이프 대신
   닫고 다음 카드를 누르는 쪽으로 두고, 여기서는 단추를 아래로 내린다. */
@media (max-width: 600px) {
  .overlay {
    padding: 12px;
  }

  .nav {
    top: auto;
    bottom: 20px;
    transform: none;
    width: 46px;
    height: 46px;
  }

  .prev {
    left: 50%;
    margin-left: -56px;
  }

  .next {
    right: 50%;
    margin-right: -56px;
  }
}
</style>
