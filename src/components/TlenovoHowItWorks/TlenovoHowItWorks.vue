<template>
    <section class="TlenovoHowItWorks">
        <div class="TlenovoHowItWorks__container">
            <div class="TlenovoHowItWorks__header">
                <div class="TlenovoHowItWorks__icon">
                    <span>⚗️</span>
                </div>
                <h2 class="TlenovoHowItWorks__title">
                    Jak Działa Zabieg? Krok po Kroku
                </h2>
                <p class="TlenovoHowItWorks__subtitle">
                    Zabieg jest prosty, relaksujący i trwa zwykle od 60 do 90 minut. 
                    Oto, co dzieje się w Twoim ciele podczas sesji:
                </p>
            </div>
            
            <div class="TlenovoHowItWorks__steps">
                <div class="TlenovoHowItWorks__step" v-for="(step, index) in steps" :key="index">
                    <div class="TlenovoHowItWorks__stepNumber">
                        {{ index + 1 }}
                    </div>
                    <div class="TlenovoHowItWorks__stepContentWrapper">
                        <div class="TlenovoHowItWorks__stepIcon">
                            {{ step.icon }}
                        </div>
                        <div class="TlenovoHowItWorks__stepContent">
                            <h3 class="TlenovoHowItWorks__stepTitle">
                                {{ step.title }}
                            </h3>
                            <p class="TlenovoHowItWorks__stepDescription">
                                {{ step.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="TlenovoHowItWorks__conclusion">
                <div class="TlenovoHowItWorks__conclusionIcon">🌟</div>
                <p>
                    Wyobraź sobie, jak tlen <span class="TlenovoHowItWorks__highlight">"budzi" Twoje komórki do życia</span>, 
                    pomagając w walce z codziennymi dolegliwościami, takimi jak zmęczenie, problemy skórne czy powolne gojenie po urazach.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const steps = ref([
    {
        icon: '🚪',
        title: 'Wejście do komory',
        description: 'Wchodzisz do komfortowej, szczelnej komory, gdzie stopniowo zwiększane jest ciśnienie. Czujesz się jak w bezpiecznym, relaksującym kokonie – możesz czytać książkę, słuchać muzyki lub po prostu odpoczywać.'
    },
    {
        icon: '💨',
        title: 'Nasycenie tlenem',
        description: 'Pod wpływem wyższego ciśnienia tlen nie tylko wiąże się z hemoglobiną we krwi, ale także rozpuszcza się bezpośrednio w osoczu i płynach ustrojowych. To oznacza, że nawet do 20 razy więcej tlenu dociera do tkanek, które normalnie mają ograniczony dostęp – na przykład do obszarów z słabym krążeniem.'
    },
    {
        icon: '🔄',
        title: 'Regeneracja na poziomie komórkowym',
        description: 'Dodatkowy tlen stymuluje naturalne procesy naprawcze. Pomaga w walce z infekcjami, redukuje stany zapalne, przyspiesza gojenie ran i wspiera tworzenie nowych naczyń krwionośnych. Efekt? Twój organizm regeneruje się szybciej, a Ty czujesz przypływ energii!'
    }
])
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.TlenovoHowItWorks {
    padding: 100px 0;
    clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 97%);
    background: linear-gradient(135deg, 
        rgba($secondary, 0.03) 0%,
        rgba($primary, 0.08) 50%,
        rgba($secondary, 0.03) 100%);
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(76,144,212,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
        pointer-events: none;
    }
    
    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
        z-index: 2;
    }
    
    &__header {
        text-align: center;
        margin-bottom: 4rem;
        animation: fadeInUp 0.8s ease-out;
    }
    
    &__icon {
        margin-bottom: 2rem;
        
        span {
            font-size: 4rem;
            display: inline-block;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba($white, 0.9), rgba($accent, 0.6));
            border-radius: 50%;
            backdrop-filter: blur(10px);
            border: 2px solid rgba($primary, 0.2);
            animation: pulse 2s ease-in-out infinite;
        }
    }
    
    &__title {
        background: linear-gradient(135deg, rgba($white, 1), rgba($accent, 0.85));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        background-clip: text;
        font-weight: 600;
        font-size: 3rem;
        font-weight: 700;
        color: $primary;
        margin: 0 0 1.5rem 0;
        line-height: 1.2;
    }
    
    &__subtitle {
        background: linear-gradient(135deg, rgba($white, 1), rgba($accent, 0.85));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        font-size: 1.3rem;
        color: $primary;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        font-weight: 400;
    }
    
    &__steps {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        margin-bottom: 4rem;
    }
    
    &__step {
        display: grid;
        grid-template-columns: auto auto 1fr;
        gap: 2rem;
        align-items: start;
        padding: 2rem;
        background: linear-gradient(135deg, rgba($white, 1), rgba($accent, 0.9));
        border-radius: 20px;
        border: 1px solid rgba($primary, 0.1);
        box-shadow: 0 8px 32px rgba($primary, 0.1);
        backdrop-filter: blur(10px);
        position: relative;
        animation: slideInLeft 0.8s ease-out;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba($primary, 0.15);
        }
        
        &:nth-child(even) {
            animation-delay: 0.2s;
        }
        
        &:nth-child(3n) {
            animation-delay: 0.4s;
        }
    }
    
    &__stepNumber {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba($white, 0.5), rgba($accent, 0.2));
        color: $primary;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        box-shadow: 2px 2px 31px 2px rgba($primary, 0.5)
    }

    &__stepContentWrapper {
        // Very bad Patrick
        margin-top: -50px;
    }
    
    &__stepIcon {
        font-size: 2.5rem;
        padding: 0.5rem;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    &__stepContent {
        min-width: 0; // Prevents content from overflowing
    }
    
    &__stepTitle {
        font-size: 1.6rem;
        font-weight: 600;
        color: $primary;
        margin: 0 0 1rem 0;
        line-height: 1.3;
    }
    
    &__stepDescription {
        font-size: 1.1rem;
        line-height: 1.7;
        color: primary;
        margin: 0;
    }
    
    &__conclusion {
        text-align: center;
        padding: 2.5rem;
        margin-bottom: 8rem;
        background: linear-gradient(135deg, rgba($secondary, 0.08), rgba($primary, 0.08));
        border-radius: 20px;
        border: 2px solid rgba($secondary, 0.4);
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    &__conclusionIcon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        animation: pulse 2s ease-in-out infinite;
    }
    
    &__conclusion p {
        font-size: 1.3rem;
        line-height: 1.6;
        color: $white;
        margin: 0;
        font-weight: 500;
    }
    
    &__highlight {
        background: linear-gradient(135deg, rgba($secondary, 0.8), rgba($white, 0.8));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 600;
    }
    
    // Responsive Design
    @media (max-width: 768px) {
        padding: 60px 0;
        
        &__container {
            padding: 0 1rem;
        }
        
        &__title {
            font-size: 2.2rem;
        }
        
        &__subtitle {
            font-size: 1.1rem;
        }
        
        &__step {
            grid-template-columns: 1fr;
            gap: .5rem;
            padding: 1.5rem;
            text-align: center;
        }
        
        &__stepIcon {
            justify-self: center;
            font-size: 2rem;
        }
        
        &__stepTitle {
            font-size: 1.4rem;
        }
        
        &__stepDescription {
            font-size: 1rem;
        }
        
        &__conclusion {
            padding: 2rem 1.5rem;
        }
        
        &__conclusion p {
            font-size: 1.1rem;
        }
    }
    
    @media (max-width: 480px) {
        padding: 40px 0;
        
        &__title {
            font-size: 1.8rem;
        }
        
        &__subtitle {
            font-size: 1rem;
        }
        
        &__step {
            padding: 1.2rem;
        }
        
        &__stepTitle {
            font-size: 1.2rem;
        }
        
        &__stepDescription {
            font-size: 0.95rem;
        }
        
        &__conclusion p {
            font-size: 1rem;
        }
    }
}
</style> 