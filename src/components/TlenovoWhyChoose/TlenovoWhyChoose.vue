<template>
    <section class="TlenovoWhyChoose">
        <div class="TlenovoWhyChoose__container">
            <div class="TlenovoWhyChoose__header">
                <h2 class="TlenovoWhyChoose__title">
                    Dlaczego Warto Skorzystać?
                </h2>
            </div>
            
            <div class="TlenovoWhyChoose__content">
                <div class="TlenovoWhyChoose__mainText">
                    <p class="TlenovoWhyChoose__intro">
                        Tlenoterapia hiperbaryczna to nie tylko odświeżenie – to 
                        <span class="TlenovoWhyChoose__highlight">inwestycja w Twoje zdrowie i pomoc w walce z codziennymi dolegliwościami</span>.
                    </p>
                </div>
                
                <div class="TlenovoWhyChoose__benefits">
                    <div class="TlenovoWhyChoose__benefit" v-for="(benefit, index) in benefits" :key="index">
                        <div class="TlenovoWhyChoose__benefitIcon">
                            {{ benefit.icon }}
                        </div>
                        <div class="TlenovoWhyChoose__benefitContent">
                            <h4 class="TlenovoWhyChoose__benefitTitle">{{ benefit.title }}</h4>
                            <p class="TlenovoWhyChoose__benefitDescription">{{ benefit.description }}</p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const benefits = ref([
    {
        icon: '🩺',
        title: 'Wspomaganie leczenia cukrzycy',
        description: 'Badania pokazują skuteczność w wspieraniu terapii cukrzycy i poprawie gojenia się ran.'
    },
    {
        icon: '🏃‍♂️',
        title: 'Regeneracja po urazach sportowych',
        description: 'Przyspiesza proces gojenia i regeneracji tkanek po kontuzjach sportowych.'
    },
    {
        icon: '🧠',
        title: 'Poprawa koncentracji',
        description: 'Zwiększa dotlenienie mózgu, co prowadzi do lepszej koncentracji i jasności myślenia.'
    },
    {
        icon: '🛡️',
        title: 'Wzmocnienie odporności',
        description: 'Regularne sesje mogą przyczynić się do wzmocnienia naturalnej odporności organizmu.'
    }
])
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes glow {
    0%, 100% {
        box-shadow: 0 8px 32px rgba($secondary, 0.2);
    }
    50% {
        box-shadow: 0 12px 40px rgba($secondary, 0.3);
    }
}

.TlenovoWhyChoose {
    padding: 40px 0;
    clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 97%);
    background: linear-gradient(135deg, 
        rgba($white, 1) 0%,
        rgba($accent, 0.75) 50%,
        rgba($white, 1) 100%);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 50%, rgba($white, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba($accent, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
    
    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 .5rem;
        position: relative;
        z-index: 2;
    }
    
    &__header {
        text-align: center;
        margin: 4rem 0;
        animation: fadeInUp 0.8s ease-out;
    }
    
    &__icon {
        margin-bottom: 1.5rem;
        
        span {
            font-size: 4rem;
            display: inline-block;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba($white, 1), rgba($accent, 0.1));
            border-radius: 50%;
            backdrop-filter: blur(10px);
            border: 2px solid rgba($accent, 0.3);
            animation: glow 3s ease-in-out infinite;
            box-shadow: 2px 2px 31px 2px rgba($primary, 0.75);
        }
    }
    
    &__title {
        font-size: 1.8rem;
        font-weight: 700;
        color: $primary;
        margin: 0;
        line-height: 1.2;
    }
    
    &__content {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }
    
    &__mainText {
        text-align: center;
        animation: fadeInUp 0.8s ease-out 0.2s both;
    }
    
    &__intro {
        font-size: 1.1rem;
        line-height: 1.6;
        color: $primary;
        margin: 0;
        font-weight: 500;
        max-width: 800px;
        margin: 0 auto;
        flex-direction: column;
        text-align: center;
        padding: 1.2rem;
    }
    
    &__highlight {
        background: linear-gradient(135deg, $primary, $secondary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 600;
    }
    
    &__benefits {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 5rem;
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    &__benefit {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        padding: 2rem;
        background: rgba($white, 0.8);
        border-radius: 20px;
        border: 1px solid rgba($primary, 0.1);
        box-shadow: 2px 2px 31px 2px rgba($primary, 0.5);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        animation: slideInRight 0.8s ease-out;
        
        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 48px rgba($primary, 0.15);
            border-color: rgba($secondary, 0.2);
        }
        
        &:nth-child(even) {
            animation-delay: 0.1s;
        }
        
        &:nth-child(3n) {
            animation-delay: 0.2s;
        }
        
        &:nth-child(4n) {
            animation-delay: 0.3s;
        }
    }
    
    &__benefitIcon {
        font-size: 2.5rem;
        padding: 1rem;
        border-radius: 15px;
        box-shadow: 2px 2px 31px 2px rgba($primary, 0.15);
        flex-shrink: 0;
    }
    
    &__benefitTitle {
        font-weight: 600;
        color: $primary;
        margin: 0 0 0.8rem 0;
        line-height: 1.3;
        font-size: 1.1rem;
    }
    
    &__benefitDescription {
        font-size: 1rem;
        line-height: 1.6;
        color: $primary;
        margin: 0;
    }
}
</style> 