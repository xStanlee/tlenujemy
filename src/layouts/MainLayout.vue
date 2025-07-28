<template>
  <q-layout view="hHr lpR fFf" class="MainLayout">
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
        <component
          :is="tabConfig.component"
          v-bind="tabConfig.props"
          v-on="tabConfig.events"
        />
      </q-tab-panel>
    </q-tab-panels>
    
    <!-- Footer -->
    <TlenovoFooter v-if="!isFormVisible" class="MainLayout__footer" @on-location="onLocationClickHandler"/>
    
    <!-- Snackbar -->
    <TlenovoSnackbar />
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, reactive, ref } from 'vue';

// Components
import TlenovoFooter from 'src/components/TlenovoFooter/TlenovoFooter.vue';
import TlenovoLogo from 'src/components/TlenovoLogo/TlenovoLogo.vue';
import TlenovoSnackbar from 'src/components/TlenovoSnackbar/TlenovoSnackbar.vue';
// Views
import TlenovoContraView from 'src/views/TlenovoContraView.vue';
import TlenovoInfoView from 'src/views/TlenovoInfoView.vue';
import TlenovoMainView from 'src/views/TlenovoMainView.vue';
import TlenovoOfferView from 'src/views/TlenovoOfferView.vue';

const $q = useQuasar();
// Example usage: Check if the screen is mobile
const isMobile = computed(() => $q.screen.lt.md);
const isFormVisible = ref(false);
const tab = ref('tab1');

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

function onLocationClickHandler() {
  tab.value = 'tab4';
}

function onFormToggleHandler(isToggled) {
  isFormVisible.value = isToggled;
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
    position: absolute;
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
</style>
