<template>
  <q-layout view="hHr lpR fFf" class="main-layout">
    <q-header class="main-layout__header" elevated>
      <q-toolbar class="main-layout__toolbar" >
        <!-- Logo -->
        <TlenovoLogo class="main-layout__toolbar-logo" @click="toggleLeftDrawer" />

        <!-- Gap -->
        <q-space />

        <!-- Links -->
        <q-tabs class="main-layout__toolbar-tabs" v-model="tab" >
          <q-tab class="main-layout__toolbar-tab" name="tab1" label="Strona główna" />
          <q-tab class="main-layout__toolbar-tab" name="tab2" label="Zastosowania" />
          <q-tab class="main-layout__toolbar-tab" name="tab3" label="Przeciwwskazania" />
          <q-tab class="main-layout__toolbar-tab" name="tab4" label="Cennik" />
          <q-tab class="main-layout__toolbar-tab" name="tab5" label="Kontakt" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="right"
      class="main-layout__drawer"
    >
      <q-list class="main-layout__list">
        <q-item-label
          header
          class="main-layout__list-header"
        >
          Awatar / logo
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="main-layout__list-item"
        />
      </q-list>
    </q-drawer>

    <!-- TODO: Do i need router? -->
    <!-- <router-view /> -->

      <q-tab-panels class="main-layout__page-container" v-model="tab" animated>
        <q-tab-panel class="main-layout__page-section" name="tab1">
          <TlenovoFireflies />
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
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

// Components
import EssentialLink from 'src/components/EssentialLink.vue';
import TlenovoFireflies from 'src/components/TlenovoFireflies/TlenovoFireflies.vue';
import TlenovoLogo from 'src/components/TlenovoLogo/TlenovoLogo.vue';
// Views
import TlenovoContactView from 'src/views/TlenovoContactView.vue';
import TlenovoContraView from 'src/views/TlenovoContraView.vue';
import TlenovoInfoView from 'src/views/TlenovoInfoView.vue';
import TlenovoMainView from 'src/views/TlenovoMainView.vue';
import TlenovoOfferView from 'src/views/TlenovoOfferView.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const tab = ref('tab1');
const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss">
@import 'src/css/quasar.variables.scss'; // Ensure this path is correct based on your project structure

.main-layout__header {
  height: 80px;
}

.main-layout__drawer {
  background-color: $primary; /* Use the $primary variable */
  color: $white;
}

.main-layout__list-header {
  color: $white;
}

.main-layout__toolbar {
  padding: 0;
  height: 100%;
}

.main-layout__toolbar-logo {
  height: 100%;
}

.main-layout__toolbar-tabs {
  height: 100%;
}

.main-layout__toolbar-tab {
  height: 100%;
}

.main-layout__page-container {
  width: 100%;
  height: 100%;
}

.main-layout__page-section {
  width: 100%;
  height: 100%;
  padding: 0px;
}
</style>
