<template>
  <div class="PhoneEmulator">
    <div class="PhoneEmulator__device">
      <!-- Notch (wycięcie w ekranie) -->
      <div class="PhoneEmulator__notch"></div>
      
      <!-- Główny ekran telefonu -->
      <div class="PhoneEmulator__screen">
        <slot />
      </div>
      
      <!-- Home indicator (pasek u dołu) -->
      <div class="PhoneEmulator__homeIndicator"></div>
    </div>
  </div>
</template>

<script setup>
// Nie potrzebuje żadnej logiki, tylko renderuje slot
</script>

<style lang="scss" scoped>
.PhoneEmulator {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;

  &__device {
    position: relative;
    width: 430px;
    height: 932px;
    background: #1a1a1a;
    border-radius: 40px;
    box-shadow: 
      0 0 0 8px #2a2a2a,
      0 0 0 12px #1a1a1a,
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 40px 80px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    
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
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    background: #000;
    border-radius: 32px;
    overflow: hidden;
    overflow-x: hidden;
    z-index: 5;
    
    // Zapewniamy, że content idealnie się mieści
    width: calc(430px - 16px);
    height: calc(932px - 16px);
    
    // Tworzymy nowy stacking context dla fixed elementów
    transform: translateZ(0);
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