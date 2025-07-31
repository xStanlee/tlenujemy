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
        <q-tab-panels class="MainLayout__pageContainer MainLayout__pageContainer--desktop" v-model="tab" animated>
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
        
        <!-- Footer -->
        <transition name="footerTransition" appear>
          <TlenovoFooter v-if="isFooterVisibleDesktop" class="MainLayout__footer" @on-location="onLocationClickHandler"/>
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
      <q-tab-panels class="MainLayout__pageContainer" v-model="tab" animated>
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
        <TlenovoBookBtn v-if="isActionBtnVisible" @book="onBookClickHandler" />
      </transition>

      <!-- Telephone Anchor -->
      <transition name="telephoneBtnTransition" appear>
        <TlenovoPhoneAnchor v-if="isActionBtnVisible" />
      </transition>
      
      <!-- Footer -->
      <transition name="footerTransition" appear>
        <TlenovoFooter v-if="isFooterVisible" class="MainLayout__footer" @on-location="onLocationClickHandler"/>
      </transition>
      
      <!-- Snackbar -->
      <TlenovoSnackbar />
</q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, reactive, ref } from 'vue';

// Components
import PhoneEmulator from 'src/components/PhoneEmulator/PhoneEmulator.vue';
import TlenovoBookBtn from 'src/components/TlenovoBookBtn/TlenovoBookBtn.vue';
import TlenovoFooter from 'src/components/TlenovoFooter/TlenovoFooter.vue';
import TlenovoLogo from 'src/components/TlenovoLogo/TlenovoLogo.vue';
import TlenovoPhoneAnchor from 'src/components/TlenovoPhoneBtn/TlenovoPhoneAnchor.vue';
import TlenovoSnackbar from 'src/components/TlenovoSnackbar/TlenovoSnackbar.vue';
// Views
import TlenovoContraView from 'src/views/TlenovoContraView.vue';
import TlenovoInfoView from 'src/views/TlenovoInfoView.vue';
import TlenovoMainView from 'src/views/TlenovoMainView.vue';
import TlenovoOfferView from 'src/views/TlenovoOfferView.vue';

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);
const offsetTop = ref(0);
const isFormVisible = ref(false);
const tab = ref('tab1');

// Logika dla mobile
const isActionBtnVisible = computed(() => {
  return !isFormVisible.value && isMobile.value && tab.value === 'tab1' && offsetTop.value < 300;
});

const isFooterVisible = computed(() => {
  return  (!isFormVisible.value && isMobile.value && tab.value === 'tab1' && offsetTop.value > 301) ||
          (!isFormVisible.value && isMobile.value && tab.value !== 'tab1');
});

// Logika dla desktop (emulator telefonu - zachowuje się jak mobile)
const isActionBtnVisibleDesktop = computed(() => {
  return !isFormVisible.value && tab.value === 'tab1' && offsetTop.value < 300;
});

const isFooterVisibleDesktop = computed(() => {
  return  (!isFormVisible.value && tab.value === 'tab1' && offsetTop.value > 301) ||
          (!isFormVisible.value && tab.value !== 'tab1');
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

function onRedirectHandler() {
  tab.value = 'tab3';
}

function onLogoClickHandler() {
  tab.value = 'tab1';
}

function onLocationClickHandler() {
  tab.value = 'tab4';
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
      formToggle: onFormToggleHandler
    }
  },
  {
    name: 'tab2',
    label: 'Zastosowania',
    component: TlenovoInfoView,
    props: {},
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
    }

    .MainLayout__pageSection {
      width: 100%;
      height: 100%;
      padding: 0px;
      overflow-x: hidden;
    }

    .MainLayout__footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 160px;
      background-color: transparent;
      z-index: 2;
      
      // W emulatorze telefonu stosujemy style jak dla mobile 768px
      height: 140px;
    }
  }

  &__header {
    height: 80px;
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

// Book button transition styles
.bookBtnTransition {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(40px);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(40px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}

.telephoneBtnTransition {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(-40px);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(-40px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}

.footerTransition {
  &-enter-active,
  &-leave-active {
    transition: all 0.7s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(100px);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
