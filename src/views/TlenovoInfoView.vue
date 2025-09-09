<template>
    <q-page-container class="TlenovoInfoView">
        <div class="TlenovoInfoView__background">
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--1"></div>
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--2"></div>
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--3"></div>
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--footer"></div>
        </div>
        
        <header class="TlenovoInfoView__header">
            <h1>Informacje o Tlenoterapii</h1>
            <p class="TlenovoInfoView__headerTagline">
                Poznaj korzyści i zastosowanie tlenoterapii hiperbarycznej
            </p>
        </header>
        
        <section class="TlenovoInfoView__content">
            <!-- First row - single fact -->
            <div class="TlenovoInfoView__row TlenovoInfoView__row--full" id="naturalna-regeneracja">
                <TlenovoFact
                    title="Naturalna regeneracja"
                    subtitle="Naturalna regeneracja dodatkowy opis dojebany"
                    image="\img_1.png"
                    insetImage="\img_1.png"
                    :content="[
                        'Tlenoterapia hiperbaryczna to innowacyjna metoda leczenia, która wykorzystuje czysty tlen pod zwiększonym ciśnieniem.',
                        'Terapia ta przyspiesza procesy regeneracyjne organizmu, poprawia krążenie krwi i dotlenienie tkanek.',
                        'Wykorzystywana jest w leczeniu wielu schorzeń, od ran po udary mózgu i autyzm.',
                        'Tlenoterapia hiperbaryczna to innowacyjna metoda leczenia, która wykorzystuje czysty tlen pod zwiększonym ciśnieniem.',
                        'Terapia ta przyspiesza procesy regeneracyjne organizmu, poprawia krążenie krwi i dotlenienie tkanek.',
                        'Wykorzystywana jest w leczeniu wielu schorzeń, od ran po udary mózgu i autyzm.',
                        'Tlenoterapia hiperbaryczna to innowacyjna metoda leczenia, która wykorzystuje czysty tlen pod zwiększonym ciśnieniem.',
                        'Terapia ta przyspiesza procesy regeneracyjne organizmu, poprawia krążenie krwi i dotlenienie tkanek.',
                        'Wykorzystywana jest w leczeniu wielu schorzeń, od ran po udary mózgu i autyzm.'
                    ]"
                />
            </div>
            
            <!-- Second row - two facts side by side -->
            <div class="TlenovoInfoView__row">
                <div class="TlenovoInfoView__col" id="najlepsza-koncentracja">
                    <TlenovoFact
                        title="Lepsza koncentracja"
                        subtitle="Lepsza koncentracja dodatkowy opis dojebany"
                        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        insetImage="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        :content="[
                            'Tlenoterapia przyspiesza gojenie ran i oparzeń.',
                            'Poprawia funkcje poznawcze i pamięć.',
                            'Redukuje stany zapalne w organizmie.',
                            'Wzmacnia układ odpornościowy.',
                            'Tlenoterapia przyspiesza gojenie ran i oparzeń.',
                            'Poprawia funkcje poznawcze i pamięć.',
                            'Redukuje stany zapalne w organizmie.',
                            'Wzmacnia układ odpornościowy.'
                        ]"
                    />
                </div>
                <div class="TlenovoInfoView__col" id="wzrost-energii">
                    <TlenovoFact
                        ref="wzrostEnergii"
                        title="Wzrost energii"
                        subtitle="Wzrost energii dodatkowy opis dojebany"
                        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                        insetImage="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                        :content="[
                            'Leczenie ran trudno gojących się i oparzeń.',
                            'Terapia wspomagająca w leczeniu udarów mózgu.',
                            'Wsparcie w leczeniu autyzmu i mózgowego porażenia dziecięcego.',
                            'Przyspieszenie regeneracji po urazach sportowych.',
                            'Leczenie ran trudno gojących się i oparzeń.',
                            'Terapia wspomagająca w leczeniu udarów mózgu.',
                            'Wsparcie w leczeniu autyzmu i mózgowego porażenia dziecięcego.',
                            'Przyspieszenie regeneracji po urazach sportowych.'
                        ]"
                    />
                </div>
            </div>
            
            <!-- Third row - single fact -->
            <div class="TlenovoInfoView__row TlenovoInfoView__row--full" id="proces-terapii">
                <TlenovoFact
                    title="Proces terapii"
                    subtitle="Jak wygląda?"
                    image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    insetImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    :content="[
                        'Terapia odbywa się w specjalnej komorze hiperbarycznej, gdzie pacjent oddycha czystym tlenem pod zwiększonym ciśnieniem.',
                        'Standardowa sesja trwa około 60-90 minut, podczas której pacjent może odpoczywać, czytać lub oglądać film.',
                        'Liczba zalecanych sesji zależy od schorzenia i indywidualnych potrzeb pacjenta.',
                        'Terapia jest bezbolesna i bezpieczna, choć wymaga konsultacji z lekarzem przed rozpoczęciem.'
                    ]"
                />
            </div>
            
            <!-- Fourth row - two facts side by side -->
            <div class="TlenovoInfoView__row">
                <div class="TlenovoInfoView__col" id="przeciwwskazania">
                    <TlenovoFact
                        title="Przeciwwskazania"
                        subtitle="Kiedy nie stosować"
                        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        insetImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        :content="[
                            'Niekontrolowane napady drgawkowe.',
                            'Nieleczona odma opłucnowa.',
                            'Ciężka infekcja górnych dróg oddechowych.',
                            'Ciąża (w niektórych przypadkach).'
                        ]"
                    />
                </div>
                <div class="TlenovoInfoView__col" id="badania">
                    <TlenovoFact
                        title="Badania"
                        subtitle="Potwierdzone naukowo"
                        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        insetImage="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        :content="[
                            'Liczne badania kliniczne potwierdzają skuteczność tlenoterapii hiperbarycznej.',
                            'Terapia jest zatwierdzona przez FDA do leczenia wielu schorzeń.',
                            'Skuteczność potwierdzona w leczeniu ran trudno gojących się i oparzeń.',
                            'Badania pokazują poprawę funkcji poznawczych u pacjentów po udarach.'
                        ]"
                    />
                </div>
            </div>
        </section>
    </q-page-container>
</template>

<script setup>
import { onMounted } from 'vue';
import TlenovoFact from '../components/TlenovoFact/TlenovoFact.vue';

const props = defineProps({
    targetBenefit: String
});

onMounted(() => {
    if(!props.targetBenefit) {
        return;
    }

    scrollToSection(props.targetBenefit);
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        });
    }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Font import - zgodność z innymi widokami
$font: 'Inter';
@import url('//fonts.googleapis.com/css2?family=#{$font}:wght@300;400;500;600;700;800&display=swap');

// Animations - zgodność z innymi widokami
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
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.TlenovoInfoView {
    position: relative;
    font-family: $font;
    background-color: $primary;
    max-width: 100%;
    padding: 1rem 2rem 3rem;
    min-height: calc(730px - 80px);
    overflow-x: hidden;

    &__background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
    }
    
    &__shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.08;
        
        &--1 {
            width: 300px;
            height: 300px;
            background-color: $accent;
            top: -100px;
            left: -100px;
        }
        
        &--2 {
            width: 200px;
            height: 200px;
            background-color: $accent;
            top: 20%;
            right: -80px;
        }
        
        &--3 {
            width: 250px;
            height: 250px;
            background-color: $accent;
            bottom: 15%;
            left: 15%;
        }
        
        &--footer {
            width: 100%;
            height: 12vh;
            bottom: 0;
            left: 0;
            background-color: $accent;
            opacity: 0.15;
            border-radius: 0;
            clip-path: polygon(
                0% 100%,
                100% 100%,
                100% 30%,
                0% 0%
            );
        }
    }
    
    &__header {
        position: relative;
        z-index: 2;
        text-align: center;
        font-size: 2.8rem;
        margin-bottom: 2rem;
        padding: 1rem 1rem;
        color: $white;
        animation: fadeInUp 0.8s ease-out 0.2s both;
        
        h1 {
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: 1px;
            line-height: 1.2;
            margin: 0 0 1rem 0;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            text-transform: uppercase;
        }
    }

    &__headerTagline {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
        opacity: 0.95;
        line-height: 1.4;
        color: $white;
    }
    
    &__content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto 7rem auto;
        animation: slideInLeft 0.6s ease-out 0.4s both;
    }
    
    &__row {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        &--full {
            width: 100%;
        }
    }
    
    &__col {
        width: 100%;
    }
}
</style>