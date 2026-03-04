<template>
    <section class="TlenovoWhatIs">
        <div class="TlenovoWhatIs__container">
            <div class="TlenovoWhatIs__header">
                <h2 class="TlenovoWhatIs__title">
                    Czym Jest Tlenoterapia Hiperbaryczna?
                </h2>
            </div>
                        
            <div class="TlenovoWhatIs__content">
                <div class="TlenovoWhatIs__description">
                    <p>
                        HBOT to <strong>bezpieczna i nieinwazyjna</strong> metoda, w której oddychasz tlenem w komorze pod podwyższonym ciśnieniem. Dzięki temu
                        <strong>więcej tlenu rozpuszcza się w osoczu</strong>, dociera głębiej do tkanek i <strong>wspiera naturalne procesy naprawcze</strong>, 
                        równowagę stanów zapalnych oraz komfort po wysiłku i urazach.
                    </p>
                    <p>
                        Podczas HBOT organizm dostaje więcej tlenu niż na co dzień. W części badań zauważono, że taki „tlenowy bodziec”
                        <strong>pobudza uwalnianie własnych komórek naprawczych</strong> 
                        <i> (tzw. komórek macierzytycznych)</i> ze szpiku do krwi.
                        To właśnie te komórki pomagają 
                        <strong>odnawiać i goić</strong> 
                        różne tkanki. Najlepiej opisano ten efekt przy<strong> wyższym ciśnieniu, ok. 1.8 ATA</strong>.
                        W doświadczeniach na zwierzętach obserwowano też ``
                        <strong>większą aktywność i podziały</strong> 
                        tych komórek w niektórych narządach. To nie jest 
                        <i>„magiczny włącznik”</i>, 
                        ale
                        <strong>naturalne wsparcie</strong> 
                        procesów, które ciało i tak ma wbudowane.
                    </p>
                </div>
                
                <div class="TlenovoWhatIs__benefits">
                    <div class="TlenovoWhatIs__benefit" @click="onBenefitClick('proces-terapii')">
                        <div class="TlenovoWhatIs__benefitIcon">⏳</div>
                        <span>Sprawność po kontuzji</span>
                        <q-icon name="chevron_right" class="TlenovoWhatIs__benefitArrow" />
                    </div>

                    <div class="TlenovoWhatIs__benefit" @click="onBenefitClick('wzrost-odpornosci')">
                        <div class="TlenovoWhatIs__benefitIcon">🛡️</div>
                        <span>Rewelacyjna odporność</span>
                        <q-icon name="chevron_right" class="TlenovoWhatIs__benefitArrow" />
                    </div>

                    <div class="TlenovoWhatIs__benefit" @click="onBenefitClick('wzrost-vo2max')">
                        <div class="TlenovoWhatIs__benefitIcon">📈</div>
                        <span>Wzrost VO₂ Max</span>
                        <q-icon name="chevron_right" class="TlenovoWhatIs__benefitArrow" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const emit = defineEmits(['benefitClick']);

function onBenefitClick(benefitId) {    
    emit('benefitClick', benefitId);
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.TlenovoWhatIs {
    padding: 40px 0;
    
    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 95%);
        background: linear-gradient(35deg, 
        rgba($white, 0.9) 0%, 
        rgba($white, 1) 100%);
    }
    
    &__header {
        padding-top: 6rem;
        text-align: center;
        margin-bottom: 3rem;
        animation: fadeInUp 0.8s ease-out;
    }

    &__icon {
        margin-bottom: 1.5rem;
        
        span {
            font-size: 4rem;
            display: inline-block;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba($accent, 0.9), rgba($secondary, 0.3));
            border-radius: 50%;
            backdrop-filter: blur(10px);
            border: 2px solid rgba($accent, 0.2);
            animation: scaleIn 0.8s ease-out 0.2s both;
        }
    }
    
    &__title {
        font-size: 1.8rem;
        font-weight: 700;
        color: $primary;
        margin: 0;
        line-height: 1.2;
        text-align: center;
    }
    
    &__content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        align-items: start;
        animation: fadeInUp 0.8s ease-out 0.3s both;
    }
    
    &__description {
        p {
            font-size: 1rem;
            line-height: 1.7;
            color: $primary;
            margin-bottom: 1.5rem;
            
            &:last-child {
                margin-bottom: 0;
            }
        }
        
        strong {
            color: $primary;
            font-weight: 600;
        }
    }
    
    &__benefits {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
        margin-bottom: 5rem;
        font-size: 0.9rem;
    }
    
    &__benefit {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1.2rem;
        border-radius: 15px;
        border: 1px solid rgba($accent, 0.1);
        transition: all 0.3s ease;
        font-size: 1rem;
        font-weight: 500;
        color: $white;
        background: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 45%));
        cursor: pointer;
        
        &:hover {
            transform: translateX(5px);
            border-color: rgba($accent, 0.2);
        }
    }
    
    &__benefitIcon {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    &__benefitArrow {
        margin-left: auto;
        font-size: 1.2rem;
        opacity: 0.6;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    &__benefit:hover &__benefitArrow {
        opacity: 1;
        transform: translateX(3px);
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
        
        &__description p {
            font-size: 1.1rem;
        }
        
        &__icon span {
            font-size: 3rem;
            padding: 1rem;
        }

        &__benefit {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }

        &__benefitArrow {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 480px) {
        &__benefit {
            padding: 0.5rem 0.8rem;
            font-size: 0.85rem;
            gap: 0.8rem;
        }

        &__benefitIcon {
            font-size: 1rem;
        }

        &__benefitArrow {
            font-size: 1rem;
        }
    }

    // Tablet Responsiveness (769px – 1023px)
    @media (min-width: 769px) and (max-width: 1023px) {
        &__container {
            padding: 0 2.5rem;
        }

        &__title {
            font-size: 2rem;
        }

        &__content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            align-items: start;
        }

        &__benefits {
            margin-bottom: 3rem;
        }

        &__description p {
            font-size: 1.05rem;
        }
    }
}
</style> 