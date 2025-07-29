<template>
  <q-btn
    class="TlenovoBookBtn"
    label="Umów się na wizytę"
    rounded
    color="primary"
    size="lg"
    icon="calendar_month"
    @click="onBookClick"
  />
</template>

<script setup>
const emit = defineEmits(['book']);

function onBookClick() {
  emit('book');
}
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.TlenovoBookBtn {
  width: 300px;
  height: 70px;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  -webkit-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
  -moz-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
  box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
}
</style> 