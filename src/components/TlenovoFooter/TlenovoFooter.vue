<template>
    <footer class="TlenovoFooter">
            <!-- Contact Info Section -->
            <div class="TlenovoFooter__info">
                <q-icon @click="onPlaceClickHandler" class="TlenovoFooter__placeIcon" name="place" size="xl"></q-icon>
            </div>
            
            <!-- Decorative Wave Animation -->
            <svg viewBox="0 0 90 180" aria-hidden="true">
                <path 
                    id="wave" 
                    class="TlenovoFooter__wave" 
                    d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 40 h -240 z" 
                />
                <use 
                    id="wave2" 
                    class="TlenovoFooter__wave" 
                    xlink:href="#wave" 
                    x="0" 
                    y="-2"
                />
                <use 
                    id="wave3" 
                    class="TlenovoFooter__wave" 
                    xlink:href="#wave" 
                    x="0" 
                    y="0"
                />
            </svg>
    </footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const ring = ref(false);

const emit = defineEmits('onLocation');

let interval;
onMounted(() => {
    interval = setInterval(() => {
        ring.value = true;

        setTimeout(() => {
            ring.value = false;
        }, 4950);
    }, 5000);
});

onUnmounted(() => {
    clearInterval(interval);
});

function onPlaceClickHandler() {
    emit('onLocation');
}
</script>

<style lang="scss" scoped>
@keyframes wave {
    2% {
        transform: translateX(1);
    }

    25% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(-50%);
    }

    75% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(1);
    }
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  10%, 30%, 50%, 70%, 90% { transform: rotate(-12deg); }
  20%, 40%, 60%, 80% { transform: rotate(12deg); }
  100% { transform: rotate(0deg); }
}

.TlenovoFooter {
    min-width: 100%;
    min-height: 160px;
    overflow-x: hidden;
    z-index: 3;
    
    &__info {
        position: absolute;
        bottom: 2px;
        width: 100%;
        left: 8px;
        color: $primary;
        display: flex;
        justify-content: space-between ;
    }
    
    &__phone {
        display: flex;
        justify-content: flex-end;
        margin: 12px;
        color: $primary;
        text-decoration: none;
        
        p {
            font-size: 32px;
            margin-right: auto;
        }

        q-icon {
            color: $primary;
        }
    }

    &__phoneIcon {
        margin-right: 16px;
        animation: shake 1.2s linear;
    }

    &__placeIcon {
        padding: 10px 48px 10px 10px;
    }

    &__wave {
        fill: $accent;
        animation: wave 10s linear infinite;


        &:nth-child(1) {
            opacity: .9;    
        }

        &:nth-child(2) {
            animation-duration: 15s;
            animation-direction: reverse;
            opacity: .9;
        }

        &:nth-child(3) {
            animation-duration: 20s;
            opacity: .9;
        }
    }
}

// Responsive Design dla mobile
@media (max-width: 768px) {
    .TlenovoFooter {
        min-height: 140px;
        
        &__placeIcon {
            padding: 8px 40px 8px 8px;
        }
        
        &__phone p {
            font-size: 28px;
        }
    }
}

@media (max-width: 480px) {
    .TlenovoFooter {
        min-height: 120px;
        
        &__placeIcon {
            padding: 6px 32px 6px 6px;
        }
        
        &__phone p {
            font-size: 24px;
        }
    }
}
</style>