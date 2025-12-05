<template>
  <!-- Desktop view z emulatorem telefonu -->
  <PhoneEmulator v-if="!isMobile">
    <q-layout view="hHr lpR fFf" class="MainLayout MainLayout--desktop-emulated">
      <q-header class="MainLayout__header" elevated>
          <q-toolbar class="MainLayout__toolbar">
            <!-- Links mobile (zawsze używamy mobile UI w emulatorze) -->
            <q-btn class="MainLayout__headerBtnPrev" v-if="tab !== 'tab1'" fab dense round icon="chevron_left" size="xl" padding="12px" @click="onMobilePrev" />
            <q-space v-if="tab !== 'tab1'" />
            <TlenovoLogo @click="onLogoClickHandler" class="MainLayout__toolbarLogo" :isMobile="true"/>
            <q-space v-if="tab !== 'tab4'" />
            <q-btn class="MainLayout__headerBtnNext" v-if="tab !== 'tab4'" fab dense round icon="chevron_right" size="xl" padding="12px" @click="onMobileNext" />
          </q-toolbar>
        </q-header>
        
        <!-- Views -->
        <q-tab-panels 
          ref="tabPanelsDesktop"
          class="MainLayout__pageContainer MainLayout__pageContainer--desktop" 
          v-model="tab" 
          animated 
          @update:model-value="onTabUpdateHandler"
        >
          <q-tab-panel
            v-for="tabConfig in tabConfigs"
            :key="tabConfig.name"
            class="MainLayout__pageSection"
            :name="tabConfig.name"
          >
            <q-scroll-observer @scroll="onLayoutScroll" />
            <component
              :is="tabConfig.component"
              v-bind="tabConfig.props"
              v-on="tabConfig.events"
            />
          </q-tab-panel>
        </q-tab-panels>

        <!-- Booked Button -->
        <transition name="bookBtnTransition" appear>
          <TlenovoBookBtn v-if="isActionBtnVisibleDesktop" @book="onBookClickHandler" />
        </transition>

        <!-- Telephone Anchor -->
        <transition name="telephoneBtnTransition" appear>
          <TlenovoPhoneAnchor v-if="isActionBtnVisibleDesktop" />
        </transition>
        
        <!-- Snackbar -->
        <TlenovoSnackbar />
    </q-layout>
  </PhoneEmulator>

  <!-- Mobile view (oryginalne zachowanie) -->
  <q-layout v-else view="hHr lpR fFf" class="MainLayout">
    <q-header class="MainLayout__header" elevated>
        <q-toolbar class="MainLayout__toolbar">
          <!-- Links mobile -->
          <q-btn class="MainLayout__headerBtnPrev" v-if="isMobile && tab !== 'tab1'" fab dense round icon="chevron_left" size="xl" padding="12px" @click="onMobilePrev" />
          <q-space v-if="isMobile && tab !== 'tab1'" />
          <TlenovoLogo class="MainLayout__toolbarLogo" :isMobile="isMobile"/>
          <q-space v-if="(isMobile && tab !== 'tab4') || !isMobile" />
          <q-btn class="MainLayout__headerBtnNext" v-if="isMobile && tab !== 'tab4'" fab dense round icon="chevron_right" size="xl" padding="12px" @click="onMobileNext" />

          <!-- Links desktop -->
          <q-tabs v-if="!isMobile" class="MainLayout__toolbarTabs" v-model="tab">
            <q-tab
              v-for="tabConfig in tabConfigs"
              :key="tabConfig.name"
              class="MainLayout__toolbarTab"
              :name="tabConfig.name"
              :label="tabConfig.label"
            />
          </q-tabs>
        </q-toolbar>
      </q-header>
      
      <!-- Views -->
      <q-tab-panels 
        ref="tabPanelsMobile"
        class="MainLayout__pageContainer" 
        v-model="tab" 
        animated
      >
        <q-tab-panel
          v-for="tabConfig in tabConfigs"
          :key="tabConfig.name"
          class="MainLayout__pageSection"
          :name="tabConfig.name"
        >
          <q-scroll-observer @scroll="onLayoutScroll" />
          <component
            :is="tabConfig.component"
            v-bind="tabConfig.props"
            v-on="tabConfig.events"
          />
        </q-tab-panel>
      </q-tab-panels>

      <!-- Booked Button -->
      <transition name="bookBtnTransition" appear>
        <TlenovoBookBtn v-if="isActionBtnOrderVisible" @book="onBookClickHandler" />
      </transition>

      <!-- Telephone Anchor -->
      <transition name="telephoneBtnTransition" appear>
        <TlenovoPhoneAnchor v-if="isActionBtnPhoneVisible" />
      </transition>
      
      <!-- Snackbar -->
      <TlenovoSnackbar />
</q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';

// Composables
import { usePdfGenerator } from 'src/composables/usePdfGenerator';

// Components
import PhoneEmulator from 'src/components/PhoneEmulator/PhoneEmulator.vue';
import TlenovoBookBtn from 'src/components/TlenovoBookBtn/TlenovoBookBtn.vue';
import TlenovoLogo from 'src/components/TlenovoLogo/TlenovoLogo.vue';
import TlenovoPhoneAnchor from 'src/components/TlenovoPhoneBtn/TlenovoPhoneAnchor.vue';
import TlenovoSnackbar from 'src/components/TlenovoSnackbar/TlenovoSnackbar.vue';
// Views
import TlenovoContraView from 'src/views/TlenovoContraView.vue';
import TlenovoInfoView from 'src/views/TlenovoInfoView.vue';
import TlenovoMainView from 'src/views/TlenovoMainView.vue';
import TlenovoOfferView from 'src/views/TlenovoOfferView.vue';

const $q = useQuasar();
const { openRegulaminInNewTab } = usePdfGenerator();

const isMobile = computed(() => $q.screen.lt.md);
const offsetTop = ref(0);
const isFormVisible = ref(false);
const tab = ref('tab1');
const targetBenefit = ref(null);

// Refs for swipe functionality
const tabPanelsDesktop = ref(null);
const tabPanelsMobile = ref(null);

const ACTION_BTN_ACTIVATION_OFFSET = 500;
const ACTION_BTN_PHONE_ACTIVATION_OFFSET = 2100;
const FOOTER_ACTIVATION_OFFSET = {
  tab1: 5850,
  tab2: 3200,
  tab3: 750,
  // tab4: Infinity dla ostatniej strony
  tab4: Infinity
}
// Logika dla mobile
const isActionBtnOrderVisible = computed(() => {
  return !isFormVisible.value && isMobile.value && tab.value === 'tab1' && offsetTop.value <= ACTION_BTN_ACTIVATION_OFFSET;
});

const isActionBtnPhoneVisible = computed(() => {
  return !isFormVisible.value && isMobile.value && tab.value === 'tab1' && offsetTop.value <= ACTION_BTN_PHONE_ACTIVATION_OFFSET;
});

// Logika dla desktop (emulator telefonu - zachowuje się jak mobile)
const isActionBtnVisibleDesktop = computed(() => {
  return !isFormVisible.value && tab.value === 'tab1' && offsetTop.value <= FOOTER_ACTIVATION_OFFSET[tab.value];
});

function onMobileNext() {
  const tabs = tabConfigs.map(t => t.name);
  const currentIndex = tabs.indexOf(tab.value);
  const nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
  tab.value = tabs[nextIndex];
}

function onMobilePrev() {
  const tabs = tabConfigs.map(t => t.name);
  const currentIndex = tabs.indexOf(tab.value);
  const prevIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
  tab.value = tabs[prevIndex];
}

// Swipe handling variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const minSwipeDistance = 50; // Minimum distance in pixels to trigger swipe

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipeGesture();
}

function handleSwipeGesture() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Check if horizontal swipe is stronger than vertical
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Check if swipe distance is sufficient
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0) {
        // Swipe left = następny tab
        onMobileNext();
      } else {
        // Swipe right = poprzedni tab
        onMobilePrev();
      }
    }
  }
}

function setupSwipeListeners() {
  const desktopEl = tabPanelsDesktop.value?.$el;
  const mobileEl = tabPanelsMobile.value?.$el;
  
  if (desktopEl) {
    desktopEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    desktopEl.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
  
  if (mobileEl) {
    mobileEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    mobileEl.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
}

function removeSwipeListeners() {
  const desktopEl = tabPanelsDesktop.value?.$el;
  const mobileEl = tabPanelsMobile.value?.$el;
  
  if (desktopEl) {
    desktopEl.removeEventListener('touchstart', handleTouchStart);
    desktopEl.removeEventListener('touchend', handleTouchEnd);
  }
  
  if (mobileEl) {
    mobileEl.removeEventListener('touchstart', handleTouchStart);
    mobileEl.removeEventListener('touchend', handleTouchEnd);
  }
}

onMounted(() => {
  setupSwipeListeners();
});

onUnmounted(() => {
  removeSwipeListeners();
});

async function onRegulationsClickHandler() {
  await openRegulaminInNewTab();
}

function onRedirectHandler() {
  tab.value = 'tab2';
}

function onBenefitClickHandler(benefitId) {
  // Navigate to info tab
  tab.value = 'tab2';
  
  // Set targetBenefit based on benefitId
  switch (benefitId) {
    case 'wzrost-energii':
      targetBenefit.value = 'wzrost-energii';
      break;
    case 'najlepsza-koncentracja':
      targetBenefit.value = 'najlepsza-koncentracja';
      break;
    case 'naturalna-regeneracja':
      targetBenefit.value = 'naturalna-regeneracja';
      break;
    case 'proces-terapii':
      targetBenefit.value = 'proces-terapii';
      break;
    case 'wzrost-odpornosci':
      targetBenefit.value = 'wzrost-odpornosci';
      break;
    case 'wzrost-vo2max':
      targetBenefit.value = 'wzrost-vo2max';
      break;
  }
    
  // Reset after scrolling
  setTimeout(() => {
    // targetBenefit.value = null;
  }, 2000);
}

function onLocationClickHandler() {
  tab.value = 'tab4';
}

function onContraindicationsClickHandler() {
  tab.value = 'tab3';
}

function onLogoClickHandler() {
  tab.value = 'tab1';
}

function onFormToggleHandler(isToggled) {
  isFormVisible.value = isToggled;
}

function onBookClickHandler() {
  isFormVisible.value = true;
}

function onLayoutScroll(payload) {
  const { position: { top } } = payload;
  offsetTop.value = top
}

function onTabUpdateHandler(payload) {
  console.log('🔄 Tab updated:', payload);
}

const tabConfigs = reactive([
  {
    name: 'tab1',
    label: 'Strona główna',
    component: TlenovoMainView,
    props: {
      get isFormVisible() {
        return isFormVisible.value;
      }
    },
    events: { 
      redirect: onRedirectHandler,
      formToggle: onFormToggleHandler,
      benefitClick: onBenefitClickHandler,
      locationClick: onLocationClickHandler,
      regulationsClick: onRegulationsClickHandler,
      contraindicationsClick: onContraindicationsClickHandler
    }
  },
  {
    name: 'tab2',
    label: 'Zastosowania',
    component: TlenovoInfoView,
    props: {
      get targetBenefit() {
        return targetBenefit.value;
      }
    },
    events: {}
  },
  {
    name: 'tab3',
    label: 'Przeciwwskazania',
    component: TlenovoContraView,
    props: {},
    events: {}
  },
  {
    name: 'tab4',
    label: 'Kontakt',
    component: TlenovoOfferView,
    props: {},
    events: {}
  }
]);
</script>

<style lang="scss">
@import 'src/css/quasar.variables.scss'; // Ensure this path is correct based on your project structure

.MainLayout {
  position: relative;

  // Style dla wersji emulowanej w telefonie (desktop)
  &--desktop-emulated {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    
    .MainLayout__pageContainer {
      width: 100%;
      height: 100%;
      z-index: 2;
      
      &--desktop {
        overflow-x: hidden;
      }
    }

    .MainLayout__header {
      height: 80px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .MainLayout__pageSection {
      width: 100%;
      height: 100%;
      padding: 0px;
      // Dodajemy padding na dole żeby footer nie zakrywał contentu
      padding-bottom: 160px;
      overflow-x: hidden;
    }

    .MainLayout__footer {
      // bottom: 0;
      // left: 0;
      // width: 100%;
      // height: 160px;
      // background-color: transparent;
      // z-index: 2;
      
      // W emulatorze telefonu stosujemy style jak dla mobile 768px
      // height: 140px;
    }
  }

  &__header {
    height: 80px;
    position: sticky;
    top: 0;
    z-index: 100 !important;
  }
  
  &__headerBtnPrev {
    margin-left: 12px;
    border: 1px solid $white;
  }

  &__headerBtnNext {
    margin-right: 12px;
    border: 1px solid $white;
  }

  &__toolbar {
    padding: 0;
    height: 100%;
  }

  &__toolbarLogo {
    height: 100%;
  }

  &__toolbarTabs {
    height: 100%;
  }

  &__toolbarTab {
    height: 100%;
  }

  &__pageContainer {
    width: 100vw;
    height: 100vh;
    z-index: 2;
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 160px;
    background-color: transparent;
    z-index: 2;
  }

  &__pageSection {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
}

// Optimized book button transition styles
.bookBtnTransition {
  &-enter-active,
  &-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
    will-change: transform, opacity;
  }

  &-enter-from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }

  &-leave-to {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.telephoneBtnTransition {
  &-enter-active,
  &-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
    will-change: transform, opacity;
  }

  &-enter-from {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }

  &-leave-to {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.footerTransition {
  &-enter-active,
  &-leave-active {
    transition: transform 0.4s ease, opacity 0.4s ease;
    will-change: transform, opacity;
  }

  &-enter-from {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
  }

  &-leave-to {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
