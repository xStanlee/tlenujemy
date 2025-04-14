<template>
  <div
    :class="[
      'TlenovoFact',
      'TlenovoFact--animate',
      'TlenovoFact--pop',
      { 'TlenovoFact--open': isOpen },
    ]"
    @click="toggleOpen"
  >
    <div class="TlenovoFact__overlay">
      <div
        class="TlenovoFact__overlay-content TlenovoFact--animate TlenovoFact--slide-left TlenovoFact--delay-2"
      >
        <h1
          v-if="!isOpen"
          class="TlenovoFact__header TlenovoFact--animate TlenovoFact--slide-left TlenovoFact--pop TlenovoFact--delay-4"
        >
          {{ title }}
        </h1>
        <p
          v-if="!isOpen"
          class="TlenovoFact__paragraph TlenovoFact--animate TlenovoFact--slide-left TlenovoFact--pop TlenovoFact--delay-5"
        >
          {{ subtitle }}
        </p>
      </div>
      <div
        class="TlenovoFact__image-content TlenovoFact--animate TlenovoFact--slide TlenovoFact--delay-5"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="TlenovoFact__dots TlenovoFact--animate">
        <div
          class="TlenovoFact__dot TlenovoFact--animate TlenovoFact--slide-up TlenovoFact--delay-6"
        ></div>
        <div
          class="TlenovoFact__dot TlenovoFact--animate TlenovoFact--slide-up TlenovoFact--delay-7"
        ></div>
        <div
          class="TlenovoFact__dot TlenovoFact--animate TlenovoFact--slide-up TlenovoFact--delay-8"
        ></div>
      </div>
    </div>
    <div class="TlenovoFact__text">
      <p>
        <img class="TlenovoFact__inset" :src="insetImage" alt="Inset" />
        {{ content[0] }}
      </p>
      <p v-for="(paragraph, index) in content.slice(1)" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  insetImage: {
    type: String,
    default: '',
  },
  content: {
    type: Array,
    required: false,
  },
})

const $q = useQuasar()
const isMobile = computed(() => $q.screen.lt.md)
const isOpen = ref(false)

function toggleOpen() {
  console.log(isMobile.value)
  // Guard for desktop
  if (!isMobile.value) {
    return
  }

  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.TlenovoFact {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 85vmin;
  height: 80vmin;
  margin: 0 auto;
  border: 3px solid;
  border-image: linear-gradient(
      -50deg,
      $primary,
      $secondary,
      $primary,
      $primary,
      $secondary,
      $secondary,
      $primary
    )
    1;
  transition: 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &--open {
    .TlenovoFact__overlay {
      transform: translateX(-60vmin);
    }

    .TlenovoFact__image-content {
      width: 60vmin;
    }

    .TlenovoFact__overlay-content {
      border: none;
      transition-delay: 0.2s;
      transform: translateX(60vmin);
    }

    .TlenovoFact__dots {
      transform: translateX(1rem);

      .TlenovoFact__dot {
        background: $white;
      }
    }
  }

  &__overlay {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1rem 0.75rem;
    background: $primary;
    transition: 0.4s ease-in-out;
    z-index: 1;
  }

  &__overlay-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15vmin;
    height: 100%;
    padding: 0.5rem 0 0 0.5rem;
    border: 3px solid;
    border-image: linear-gradient(to bottom, $secondary 5%, $primary 35% 65%, $secondary 95%) 0 0 0
      100%;
    transition: 0.3s ease-in-out 0.2s;
    z-index: 1;
  }

  &__header {
    color: $white;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  &__paragraph {
    color: $white;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 2.5rem;
  }

  &__image-content {
    position: absolute;
    top: 0;
    right: 0;
    width: 50vmin;
    height: 100%;
    background-size: cover;
    transition: 0.3s ease-in-out;
  }

  &__inset {
    max-width: 50%;
    margin: 0.25em 1em 1em 0;
    border-radius: 0.25em;
    float: left;
  }

  &__dots {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 55px;
    height: 4vmin;
    transition: 0.3s ease-in-out 0.3s;
  }

  &__dot {
    width: 12px;
    height: 12px;
    background: $white;
    border: 1px solid $primary;
    border-radius: 50%;
    transition: 0.3s ease-in-out 0.3s;
  }

  &__text {
    position: absolute;
    top: 0;
    right: 0;
    width: 60vmin;
    height: 100%;
    padding: 3vmin 4vmin;
    background: $white;
    box-shadow: inset 1px 1px 15px 0 rgba(0 0 0 / 0.4);
    overflow-y: scroll;

    p {
      font-size: 1.4rem;
      background: linear-gradient(45deg, var(--q-primary) 100%, var(--q-secondary) 0%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &:hover &__overlay {
    transform: translateX(-60vmin);
  }

  &:hover &__image-content {
    width: 30vmin;
  }

  &:hover &__overlay-content {
    border: none;
    transition-delay: 0.2s;
    transform: translateX(60vmin);
  }

  &:hover &__dots {
    transform: translateX(1rem);

    .TlenovoFact__dot {
      background: $white;
    }
  }

  // Modifiers
  &--animate {
    animation-duration: 0.7s;
    animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
    animation-fill-mode: backwards;
  }

  &--pop {
    animation-name: pop;
  }

  &--slide {
    animation-name: slide;
  }

  &--slide-left {
    animation-name: slide-left;
  }

  &--slide-up {
    animation-name: slide-up;
  }
}

@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translate(4em, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translate(-40px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(3em);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@for $i from 1 through 8 {
  .TlenovoFact--delay-#{$i} {
    animation-delay: #{0.3 * $i}s;
  }
}
</style>
