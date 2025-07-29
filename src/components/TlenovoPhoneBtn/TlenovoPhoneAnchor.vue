<template>
    <a href="tel:+48733096056" :class="{
        'TlenovoPhoneBtn': true,
        'TlenovoPhoneBtn--shake': shake
    }">
        <q-icon name="call" size="md" />
    </a>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const shake = ref(false);
let interval;

onMounted(() => {
    interval = setInterval(() => {
        shake.value = true;

        setTimeout(() => {
            shake.value = false;
        }, 1000); // Animation duration
    }, 5000); // Every 5 seconds
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.TlenovoPhoneBtn {
    position: fixed;
    top: 110px;
    right: 30px;
    z-index: 1000;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 66px;
    height: 66px;
    padding: 12px;
    
    background: $primary;
    border-radius: 50%;

    -webkit-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    -moz-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    
    text-decoration: none;
    color: $white;
    
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba($primary, 0.4);
    }
    
    &--shake {
        animation: shake 1s ease-in-out;
    }
}

@keyframes shake {
    0% { transform: rotate(0deg); }
    10%, 30%, 50%, 70%, 90% { transform: rotate(-12deg); }
    20%, 40%, 60%, 80% { transform: rotate(12deg); }
    100% { transform: rotate(0deg); }
}
</style> 