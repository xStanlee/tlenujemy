<template>
  <q-layout view="hHr lpR fFf" class="main-layout">
    <q-header class="main-layout__header" elevated>
      <q-toolbar class="main-layout__toolbar">
        <!-- Prev step mobile -->
        <q-btn class="main-layout__headerBtn--prev" v-if="isMobile && tab !== 'tab1'" fab dense round icon="chevron_left" size="xl" padding="12px" @click="onMobilePrev" />
        <!-- Gap -->
        <q-space v-if="isMobile && tab !== 'tab1'" />
        <!-- Logo -->
        <TlenovoLogo class="main-layout__toolbar-logo" :isMobile="isMobile"/>
        <!-- Gap -->
        <q-space />
        <!-- Next step mobile -->
        <q-btn class="main-layout__headerBtn--next" v-if="isMobile" fab dense round icon="chevron_right" size="xl" padding="12px" @click="onMobileNext" />

        <!-- Links desktop -->
        <q-tabs v-else class="main-layout__toolbar-tabs" v-model="tab">
          <q-tab class="main-layout__toolbar-tab" name="tab1" label="Strona główna" />
          <q-tab class="main-layout__toolbar-tab" name="tab2" label="Zastosowania" />
          <q-tab class="main-layout__toolbar-tab" name="tab3" label="Przeciwwskazania" />
          <q-tab class="main-layout__toolbar-tab" name="tab4" label="Cennik" />
          <q-tab class="main-layout__toolbar-tab" name="tab5" label="Kontakt" />
        </q-tabs>
      </q-toolbar>
    </q-header>


    <!-- Views -->
    <q-tab-panels class="main-layout__page-container" v-model="tab" animated>
      <q-tab-panel class="main-layout__page-section" name="tab1">
        <TlenovoMainView />
      </q-tab-panel>

      <q-tab-panel class="main-layout__page-section" name="tab2">
        <TlenovoInfoView />
      </q-tab-panel>

      <q-tab-panel class="main-layout__page-section" name="tab3">
        <TlenovoContraView />
      </q-tab-panel>

      <q-tab-panel class="main-layout__page-section" name="tab4">
        <TlenovoOfferView />
      </q-tab-panel>

      <q-tab-panel class="main-layout__page-section" name="tab5">
        <TlenovoContactView />
      </q-tab-panel>
    </q-tab-panels>

    <TlenovoSnackbar />
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

// Components
import TlenovoLogo from 'src/components/TlenovoLogo/TlenovoLogo.vue';
import TlenovoSnackbar from 'src/components/TlenovoSnackbar/TlenovoSnackbar.vue';
// Views
import TlenovoContactView from 'src/views/TlenovoContactView.vue';
import TlenovoContraView from 'src/views/TlenovoContraView.vue';
import TlenovoInfoView from 'src/views/TlenovoInfoView.vue';
import TlenovoMainView from 'src/views/TlenovoMainView.vue';
import TlenovoOfferView from 'src/views/TlenovoOfferView.vue';

const $q = useQuasar();
// Example usage: Check if the screen is mobile
const isMobile = computed(() => $q.screen.lt.md);

const tab = ref('tab1');

function onMobileNext() {
  const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
  const currentIndex = tabs.indexOf(tab.value);
  const nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
  tab.value = tabs[nextIndex];
}

function onMobilePrev() {
  const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
  const currentIndex = tabs.indexOf(tab.value);
  const prevIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
  tab.value = tabs[prevIndex];
}
</script>

<style lang="scss">
@import 'src/css/quasar.variables.scss'; // Ensure this path is correct based on your project structure

.main-layout {

  &__header {
    height: 80px;
  }

  &__list-header {
    color: $white;
  }

  &__headerBtn {
    &--prev {
      margin-left: 12px;
      border: 1px solid $white;
    }

    &--next {
      margin-right: 12px;
      border: 1px solid $white;
    }
  }

  &__toolbar {
    padding: 0;
    height: 100%;
  }

  &__toolbar-logo {
    height: 100%;
  }

  &__toolbar-tabs {
    height: 100%;
  }

  &__toolbar-tab {
    height: 100%;
  }

  &__page-container {
    width: 100vw;
    height: 100vh;
  }

  &__page-section {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
}
</style>
