<template>
  <div class="PhoneEmulator">
    <div class="PhoneEmulator__device">
      <!-- Notch (wycięcie w ekranie) -->
      <div class="PhoneEmulator__notch"></div>
      
      <!-- Główny ekran telefonu -->
      <div class="PhoneEmulator__screen" ref="screenRef">
        <slot />
      </div>
      
      <!-- Home indicator (pasek u dołu) -->
      <div class="PhoneEmulator__homeIndicator"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const screenRef = ref(null)
let isScrolling = false
let startY = 0
let scrollTop = 0
let velocity = 0
let amplitude = 0
let frame = 0
let scrollableElement = null

// Find the actual scrollable element inside the screen
const findScrollableElement = () => {
  if (!screenRef.value) return null
  
  // Look for common scrollable elements inside the phone screen
  const candidates = [
    screenRef.value.querySelector('.q-tab-panels'),
    screenRef.value.querySelector('.q-tab-panel'),
    screenRef.value.querySelector('.MainLayout__pageContainer'),
    screenRef.value.querySelector('[class*="scroll"]'),
    screenRef.value
  ]
  
  for (const element of candidates) {
    if (element && element.scrollHeight > element.clientHeight) {
      return element
    }
  }
  
  return screenRef.value
}

// Touch scroll simulation
const handleTouchStart = (e) => {
  scrollableElement = findScrollableElement()
  if (!scrollableElement) return
  
  isScrolling = true
  startY = e.touches ? e.touches[0].clientY : e.clientY
  scrollTop = scrollableElement.scrollTop
  velocity = 0
  amplitude = 0
  frame = 0
  
  e.preventDefault()
}

const handleTouchMove = (e) => {
  if (!isScrolling || !scrollableElement) return
  
  const currentY = e.touches ? e.touches[0].clientY : e.clientY
  const deltaY = currentY - startY
  const newScrollTop = scrollTop - deltaY
  
  scrollableElement.scrollTop = Math.max(0, Math.min(scrollableElement.scrollHeight - scrollableElement.clientHeight, newScrollTop))
  
  // Calculate velocity for momentum (based on movement delta)
  velocity = (startY - currentY) * 0.8
  
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  if (!isScrolling || !scrollableElement) return
  
  isScrolling = false
  
  // Momentum scrolling
  if (Math.abs(velocity) > 1) {
    amplitude = 0.8 * velocity
    const timestamp = Date.now()
    
    const momentumScroll = () => {
      const elapsed = Date.now() - timestamp
      const delta = amplitude * Math.exp(-elapsed / 325) // Decay factor
      
      if (Math.abs(delta) > 0.5) {
        const newScrollTop = scrollableElement.scrollTop + delta
        scrollableElement.scrollTop = Math.max(0, Math.min(scrollableElement.scrollHeight - scrollableElement.clientHeight, newScrollTop))
        frame = requestAnimationFrame(momentumScroll)
      } else {
        cancelAnimationFrame(frame)
      }
    }
    
    momentumScroll()
  }
  
  e.preventDefault()
}

onMounted(() => {
  if (screenRef.value) {
    // Add touch event listeners
    screenRef.value.addEventListener('touchstart', handleTouchStart, { passive: false })
    screenRef.value.addEventListener('touchmove', handleTouchMove, { passive: false })
    screenRef.value.addEventListener('touchend', handleTouchEnd, { passive: false })
    
    // Add mouse event listeners for desktop simulation
    screenRef.value.addEventListener('mousedown', handleTouchStart)
    screenRef.value.addEventListener('mousemove', handleTouchMove)
    screenRef.value.addEventListener('mouseup', handleTouchEnd)
    screenRef.value.addEventListener('mouseleave', handleTouchEnd)
  }
})

onUnmounted(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>

<style lang="scss" scoped>
.PhoneEmulator {
  display: flex;
  justify-content: flex-end; // do usunięcia
  align-items: center;
  min-height: 100vh;
  background: url('./desktopBackground.png') no-repeat center center;
  background-size: cover;
  padding: 20px;
  padding-right: 10%; // do dodania
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($primary, 0.5) 0%, rgba($white, 0.15) 100%);
    backdrop-filter: blur(4px);
    z-index: 1;
  }

  &__device {
    position: relative;
    width: 393px;
    z-index: 2;
    height: 812px;
    background: #1a1a1a;
    border-radius: 40px;
    box-shadow: 
      0 0 0 8px #2a2a2a,
      0 0 0 12px #1a1a1a,
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 40px 80px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 32px;
      border: 2px solid #333;
      pointer-events: none;
      z-index: 10;
    }
  }

  &__notch {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 28px;
    background: #1a1a1a;
    border-radius: 20px;
    z-index: 15;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: #333;
      border-radius: 50%;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 60px;
      height: 4px;
      background: #333;
      border-radius: 2px;
    }
  }

  &__screen {
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    background: #000;
    border-radius: 32px;
    overflow: hidden;
    overflow-x: hidden;
    z-index: 5;
    
    // Zapewniamy, że content idealnie się mieści
    width: calc(393px - 12px);
    height: calc(814px - 12px);
    
    // Tworzymy nowy stacking context dla fixed elementów
    transform: translateZ(0);
    
    // Ukrywamy scrollbar
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    
    &::-webkit-scrollbar {
      display: none; /* WebKit */
    }
    
    // Płynny scroll jak na telefonie
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
    
    // Touch scroll handling
    touch-action: pan-y;
    
    // Ukrywamy scrollbary też w dzieciach
    :deep(*) {
      scrollbar-width: none !important; /* Firefox */
      -ms-overflow-style: none !important; /* Internet Explorer 10+ */
      
      &::-webkit-scrollbar {
        display: none !important; /* WebKit */
      }
    }
  }

  &__homeIndicator {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 134px;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    z-index: 15;
  }
}

// Media query - komponent widoczny tylko na desktop
@media (max-width: 768px) {
  .PhoneEmulator {
    display: none;
  }
}
</style> 