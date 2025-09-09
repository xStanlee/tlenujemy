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
    <!-- Floating particles background -->
    <div class="TlenovoFact__particles">
      <div class="TlenovoFact__particle" v-for="n in 8" :key="n" :style="{ '--delay': n * 0.5 + 's' }"></div>
    </div>

    <!-- Neon glow border -->
    <div class="TlenovoFact__neon-border"></div>

    <div class="TlenovoFact__overlay">
    <!-- 
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

       
        <div class="TlenovoFact__progress-bar">
          <div class="TlenovoFact__progress-fill"></div>
        </div>
      </div>
      -->

      <div
        class="TlenovoFact__image-content TlenovoFact--animate TlenovoFact--slide TlenovoFact--delay-5"
        :style="{ backgroundImage: `url(${image})` }"
      >
        <!-- Image overlay with gradient -->
        <div class="TlenovoFact__image-overlay"></div>
      </div>
    </div>

    <div class="TlenovoFact__video">
      <!-- Modern video container with enhanced styling -->
      <div class="TlenovoFact__video-header">
        <div class="TlenovoFact__video-title">{{ title }}</div>
      </div>
      
      <!-- 
      Tymczasowo pomysł wyłączony
      <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/YLdNU67kHgk"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="TlenovoFact__iframe"
      /> 
      -->
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

//TODO: Replace paragraph with video
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
  // Guard for desktop
  if (!isMobile.value) {
    return
  }

  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Font import - zgodność z innymi komponentami
$font: 'Inter';
@import url('//fonts.googleapis.com/css2?family=#{$font}:wght@300;400;500;600;700;800;900&display=swap');

.TlenovoFact {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  // Fixed height might need upgrade
  height: 450px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  font-family: $font;
  // Advanced glassmorphism with multiple layers
  background: 
    linear-gradient(135deg, rgba($primary, 0.15), rgba($accent, 0.1)),
    linear-gradient(45deg, rgba($secondary, 0.05), rgba($primary, 0.08));
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  
  // Modern box shadow with multiple layers
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 16px rgba($primary, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Floating animation
  animation: float 6s ease-in-out;

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
  }

  // Floating particles
  &__particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  &__particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, $accent, $secondary);
    border-radius: 50%;
    opacity: 0.6;
    animation: particleFloat 8s linear infinite;
    animation-delay: var(--delay);
    
    &:nth-child(odd) {
      animation-duration: 10s;
    }
    
    &:nth-child(even) {
      animation-duration: 12s;
    }
  }

  // Neon glow border
  &__neon-border {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 26px;
    background: linear-gradient(45deg, 
      transparent,
      rgba($accent, 0.3),
      transparent,
      rgba($secondary, 0.3),
      transparent
    );
    background-size: 400% 400%;
    animation: neonPulse 4s ease-in-out infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__overlay {
    position: relative;
    display: flex;
    width: 100%;
    padding: 1rem 0.8rem;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba($primary, 0.95), 
      rgba($primary, 0.85),
      rgba($primary, 0.9)
    );
    backdrop-filter: blur(15px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
    border-radius: 24px;
  }

  &__overlay-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    position: relative;
    width: 100%;
    padding: 0.8rem 0 0 0.8rem;
    
    // Modern border with gradient
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, 
        $accent,
        rgba($accent, 0.3),
        $secondary,
        rgba($secondary, 0.3),
        $accent
      );
      border-radius: 2px;
      box-shadow: 0 0 10px rgba($accent, 0.4);
    }
    
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
    z-index: 1;
  }

  // Status indicator
  &__status-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(45deg, #00ff88, #00cc6a);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  }

  &__pulse {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: inherit;
    animation: pulse 2s ease-in-out infinite;
  }

  &__header {
    color: $white;
    font-size: 1.3rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 0.8rem;
    text-shadow: 
      0 2px 10px rgba(0, 0, 0, 0.3),
      0 0 20px rgba($accent, 0.2);
    letter-spacing: 0.5px;
    
    // Modern text gradient
    background: linear-gradient(135deg, $white, rgba($white, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__paragraph {
    color: rgba($white, 0.9);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 2rem;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.3px;
  }

  &__image-content {
    position: absolute;
    top: 0;
    right: 0;
    width: 50vmin;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 24px 24px 0;
    overflow: hidden;
  }

  &__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba($primary, 0.1), 
      transparent, 
      rgba($accent, 0.15)
    );
    transition: all 0.3s ease;
  }

  &__video {
    position: absolute;
    top: 0;
    right: 0;
    width: 60vmin;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba($white, 0.98), 
      rgba($white, 0.95),
      rgba($white, 0.97)
    );
    backdrop-filter: blur(20px);
    border-radius: 0 24px 24px 0;
    overflow: hidden;
    
    // Modern glass effect
    box-shadow: 
      inset 1px 1px 0 rgba(255, 255, 255, 0.1),
      0 8px 32px rgba(0, 0, 0, 0.1);
  }

  &__video-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    background: linear-gradient(135deg, 
      rgba($primary, 0.05), 
      rgba($accent, 0.03)
    );
    border-bottom: 1px solid rgba($primary, 0.1);
  }

  &__video-controls {
    display: flex;
    gap: 8px;
  }

  &__control-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &--red {
      background: linear-gradient(135deg, #ff5f57, #ff3b30);
      box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
    }
    
    &--yellow {
      background: linear-gradient(135deg, #ffbd2e, #ff9500);
      box-shadow: 0 2px 8px rgba(255, 149, 0, 0.3);
    }
    
    &--green {
      background: linear-gradient(135deg, #28ca42, #30d158);
      box-shadow: 0 2px 8px rgba(48, 209, 88, 0.3);
    }
    
    &:hover {
      transform: scale(1.1);
    }
  }

  &__video-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: $primary;
    letter-spacing: 0.5px;
  }

  &__iframe {
    width: 100%;
    height: calc(100% - 60px);
    border: none;
    border-radius: 0 0 24px 0;
  }

  // Hover effects
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.15),
      0 8px 32px rgba($primary, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);

    .TlenovoFact__neon-border {
      opacity: 1;
    }

    .TlenovoFact__overlay {
      transform: translateX(-60vmin);
    }

    .TlenovoFact__image-content {
      width: 30vmin;
      
      .TlenovoFact__image-overlay {
        background: linear-gradient(135deg, 
          rgba($primary, 0.05), 
          transparent, 
          rgba($accent, 0.1)
        );
      }
    }

    .TlenovoFact__overlay-content {
      border: none;
      transition-delay: 0.2s;
      transform: translateX(60vmin);
    }
  }

  // Modifiers
  &--animate {
    animation-duration: 0.8s;
    animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
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

// Keyframe animations
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-10vh) translateX(50px);
    opacity: 0;
  }
}

@keyframes neonPulse {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
}

@keyframes progressFill {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

@keyframes progressShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translate(4em, 0) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translate(-40px, 0) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(3em) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@for $i from 1 through 8 {
  .TlenovoFact--delay-#{$i} {
    animation-delay: #{0.2 * $i}s;
  }
}
</style>
