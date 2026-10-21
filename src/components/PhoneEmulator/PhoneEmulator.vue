<template>
  <div class="PhoneEmulator">
    <div class="PhoneEmulator__device">
      <!-- Notch (wycięcie w ekranie) -->
      <div class="PhoneEmulator__notch"></div>

      <!-- Główny ekran telefonu -->
      <div class="PhoneEmulator__screen">
        <!-- Pasek statusu – jak na telefonie treść strony zaczyna się pod notchem -->
        <div class="PhoneEmulator__statusBar"></div>

        <!-- Aplikacja w iframe: media queries, vw/vh i $q.screen liczą się od rozmiaru ekranu telefonu -->
        <iframe ref="frameRef" class="PhoneEmulator__frame" :src="src" title="Tlenovo – widok na telefonie" />
      </div>

      <!-- Home indicator (pasek u dołu) -->
      <div class="PhoneEmulator__homeIndicator"></div>
    </div>

    <!-- Wrapper na video -->
    <div class="PhoneEmulator__videoWrapper">
      <slot name="video" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  // Adres aplikacji wyświetlanej na ekranie telefonu
  src: { type: String, required: true }
})

const frameRef = ref(null)

defineExpose({
  frame: frameRef
})
</script>

<style lang="scss" scoped>
// Wysokość obszaru pod notchem (pasek statusu telefonu)
$status-bar-height: 40px;

.PhoneEmulator {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 100vh;
  background: url('./desktopBackground.png') no-repeat center center;
  background-size: cover;
  padding: 20px;
  padding-left: 12.5%;
  padding-right: 7.5%;
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

  &__videoWrapper {
    position: relative;
    z-index: 2;
    width: 800px;
    height: 450px; // 720px / 16 * 9 = 405px (proporcje 16:9)
    background: rgba(#000, 0.8);
    border-radius: 12px;
    box-shadow:
      0 10px 25px rgba(0, 0, 0, 0.3),
      0 20px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #333;
    margin-bottom: 5%;
  }

  &__device {
    position: relative;
    flex: 0 0 auto;
    width: 393px;
    z-index: 2;
    height: 742px;
    background: #1a1a1a;
    border-radius: 40px;
    box-shadow:
      0 0 0 8px #2a2a2a,
      0 0 0 12px #1a1a1a,
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 40px 80px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 5%;

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
    display: flex;
    flex-direction: column;
    background: #000;
    border-radius: 32px;
    overflow: hidden;
    z-index: 5;
  }

  &__statusBar {
    flex: 0 0 $status-bar-height;
    background-color: $primary;
  }

  &__frame {
    flex: 1 1 auto;
    width: 100%;
    border: 0;
    display: block;
    background-color: $primary;
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
    pointer-events: none;
  }
}

// Media query - komponent widoczny tylko na desktop
@media (max-width: 768px) {
  .PhoneEmulator {
    display: none;
  }
}
</style>
