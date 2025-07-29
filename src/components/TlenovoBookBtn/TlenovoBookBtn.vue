<template>
  <q-btn
    :class="{
      'TlenovoBookBtn': true,
      'TlenovoBookBtn--mobile': isMobile
    }"
    label="Umów się na wizytę"
    rounded
    color="primary"
    size="xl"
    icon="calendar_month"
    padding="12px 20px"
    @click="onBookClick"
  />
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);

const emit = defineEmits(['book']);

function onBookClick() {
  emit('book');
}
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.TlenovoBookBtn {
  position: fixed;
  bottom: 80px;
  left: calc(50% - 117px);
  z-index: 3;
  z-index: 100;
  -webkit-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
  -moz-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
  box-shadow: 2px 2px 31px 2px rgba($white, 0.7);

  &--mobile {
    left: calc(50% - 160px);
  }
}
</style> 