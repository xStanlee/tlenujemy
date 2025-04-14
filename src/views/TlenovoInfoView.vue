<template>
    <q-page-container class="TlenovoInfoView">
        <div class="TlenovoInfoView__background">
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--1"></div>
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--2"></div>
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--3"></div>
            <div class="TlenovoInfoView__shape TlenovoInfoView__shape--4"></div>
        </div>
        
        <div class="TlenovoInfoView__header">
            <h1>Informacje o Tlenoterapii</h1>
            <p>Poznaj korzyści i zastosowanie tlenoterapii hiperbarycznej</p>
        </div>
        
        <div class="TlenovoInfoView__content">
            <!-- First row - single fact -->
            <div class="TlenovoInfoView__row TlenovoInfoView__row--full">
                <TlenovoFact
                    title="Tlenoterapia"
                    subtitle="Terapia przyszłości"
                    image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    insetImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    :content="[
                        'Tlenoterapia hiperbaryczna to innowacyjna metoda leczenia, która wykorzystuje czysty tlen pod zwiększonym ciśnieniem.',
                        'Terapia ta przyspiesza procesy regeneracyjne organizmu, poprawia krążenie krwi i dotlenienie tkanek.',
                        'Wykorzystywana jest w leczeniu wielu schorzeń, od ran po udary mózgu i autyzm.'
                    ]"
                />
            </div>
            
            <!-- Second row - two facts side by side -->
            <div class="TlenovoInfoView__row">
                <div class="TlenovoInfoView__col">
                    <TlenovoFact
                        title="Korzyści"
                        subtitle="Dla zdrowia"
                        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        insetImage="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        :content="[
                            'Tlenoterapia przyspiesza gojenie ran i oparzeń.',
                            'Poprawia funkcje poznawcze i pamięć.',
                            'Redukuje stany zapalne w organizmie.',
                            'Wzmacnia układ odpornościowy.'
                        ]"
                    />
                </div>
                <div class="TlenovoInfoView__col">
                    <TlenovoFact
                        title="Zastosowania"
                        subtitle="W medycynie"
                        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                        insetImage="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                        :content="[
                            'Leczenie ran trudno gojących się i oparzeń.',
                            'Terapia wspomagająca w leczeniu udarów mózgu.',
                            'Wsparcie w leczeniu autyzmu i mózgowego porażenia dziecięcego.',
                            'Przyspieszenie regeneracji po urazach sportowych.'
                        ]"
                    />
                </div>
            </div>
            
            <!-- Third row - single fact -->
            <div class="TlenovoInfoView__row TlenovoInfoView__row--full">
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
                <div class="TlenovoInfoView__col">
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
                <div class="TlenovoInfoView__col">
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
        </div>
    </q-page-container>
</template>

<script setup>
import TlenovoFact from '../components/TlenovoFact/TlenovoFact.vue';
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.TlenovoInfoView {
    padding: 1rem;
    background-color: $accent;
    position: relative;
    overflow: hidden;
    
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
        opacity: 0.1;
        
        &--1 {
            width: 300px;
            height: 300px;
            background-color: $primary;
            top: -100px;
            left: -100px;
            z-index: 1;
        }
        
        &--2 {
            width: 200px;
            height: 200px;
            background-color: $secondary;
            top: 20%;
            right: -50px;
            z-index: 1;
        }
        
        &--3 {
            width: 250px;
            height: 250px;
            background-color: $primary;
            bottom: 10%;
            left: 30%;
            z-index: 1;
        }
        
        &--4 {
            width: 150px;
            height: 150px;
            background-color: $secondary;
            bottom: -50px;
            right: 20%;
            z-index: 1;
        }
    }
    
    &__header {
        text-align: center;
        margin-bottom: 1rem;
        padding: 1rem;
        position: relative;
        z-index: 2;
        
        h1 {
            color: $primary;
            font-size: 2rem;
            letter-spacing: 2px;
            line-height: 2;
            margin-bottom: 0.5rem;
        }
        
        p {
            color: $primary;
            font-size: 1.2rem;
            opacity: 0.8;
        }
    }
    
    &__content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;
        z-index: 2;
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
    
    // Tablet and desktop styles
    @media (min-width: 768px) {
        padding: 2rem;
        
        &__header {
            margin-bottom: 3rem;
            
            h1 {
                font-size: 2.5rem;
            }
            
            p {
                font-size: 1.5rem;
            }
        }
        
        &__row {
            flex-direction: row;

            &--full {
                .TlenovoFact {
                    width: 100%;
                }
            }
        }
        
        &__col {
            width: 50%;
            
            &:last-of-type {
                margin-bottom: 4rem;
            }
        }
        
        &__shape {
            &--1 {
                width: 400px;
                height: 400px;
                top: -150px;
                left: -150px;
            }
            
            &--2 {
                width: 300px;
                height: 300px;
                top: 15%;
                right: -100px;
            }
            
            &--3 {
                width: 350px;
                height: 350px;
                bottom: 5%;
                left: 25%;
            }
            
            &--4 {
                width: 250px;
                height: 250px;
                bottom: -100px;
                right: 15%;
            }
        }
    }
    
    // Large desktop styles
    @media (min-width: 1200px) {
        padding: 3rem;
        
        &__header {
            margin-bottom: 4rem;
            
            h1 {
                font-size: 3rem;
            }
        }
        
        &__shape {
            &--1 {
                width: 500px;
                height: 500px;
                top: -200px;
                left: -200px;
            }
            
            &--2 {
                width: 400px;
                height: 400px;
                top: 10%;
                right: -150px;
            }
            
            &--3 {
                width: 450px;
                height: 450px;
                bottom: 0;
                left: 20%;
            }
            
            &--4 {
                width: 350px;
                height: 350px;
                bottom: -150px;
                right: 10%;
            }
        }
    }
}
</style>