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
            <div class="TlenovoInfoView__row TlenovoInfoView__row--full" id="naturalna-regeneracja">
                <TlenovoFact
                        ref="naturalnaRegeneracja"
                        :text="naturalnaRegeneracja.text"
                        :linkText="naturalnaRegeneracja.linkText"
                        :link="naturalnaRegeneracja.link"
                        :icon="naturalnaRegeneracja.icon"
                />
            </div>
            
            <div class="TlenovoInfoView__row">
                <div class="TlenovoInfoView__col" id="najlepsza-koncentracja">
                    <TlenovoFact
                        ref="najlepszaKoncentracja"
                        :text="najlepszaKoncentracja.text"
                        :linkText="najlepszaKoncentracja.linkText"
                        :link="najlepszaKoncentracja.link"
                        :icon="najlepszaKoncentracja.icon"
                    />
            </div>

            <div class="TlenovoInfoView__col" id="wzrost-energii">
                    <TlenovoFact
                        ref="wzrostEnergii"
                        :text="wzrostEnergii.text"
                        :linkText="wzrostEnergii.linkText"
                        :link="wzrostEnergii.link"
                        :icon="wzrostEnergii.icon"
                    />
                </div>
            </div>
            
            <div class="TlenovoInfoView__row TlenovoInfoView__row--full" id="proces-terapii">
                <TlenovoFact
                        ref="procesTerapii"
                        :text="procesTerapii.text"
                        :linkText="procesTerapii.linkText"
                        :link="procesTerapii.link"
                        :icon="procesTerapii.icon"
                />
            </div>
            
            <div class="TlenovoInfoView__row">
                <div class="TlenovoInfoView__col" id="wzrost-odpornosci">
                    <TlenovoFact
                        ref="wzrostOdpornosci"
                        :text="wzrostOdpornosci.text"
                        :linkText="wzrostOdpornosci.linkText"
                        :link="wzrostOdpornosci.link"
                        :icon="wzrostOdpornosci.icon"
                    />
                </div>
                <div class="TlenovoInfoView__col" id="wzrost-vo2max">
                    <TlenovoFact
                        ref="wzrostVo2max"
                        :text="wzrostVo2max.text"
                        :linkText="wzrostVo2max.linkText"
                        :link="wzrostVo2max.link"
                        :icon="wzrostVo2max.icon"
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

const naturalnaRegeneracja = {
    text: "Badania kliniczne na zdrowych dorosłych wykazały, że regularne sesje HBOT zwiększają ilość krążących komórek macierzystych (CD34+) aż o 800% po pełnym cyklu zabiegów (20–40 sesji), przekładając się na skokowy wzrost zdolności regeneracyjnych i odporności organizmu.",
    linkText: "Department of Internal Medicine, University of Texas Southwestern Medical Center",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10318163",
    icon: "💪"
}

const najlepszaKoncentracja = {
    text: "Terapia ta nie tylko zwiększa natlenienie mózgu, ale także uruchamia procesy neuroregeneracji, co przekłada się na większą efektywność pracy, nauki i codziennych aktywności. Każda nawet drobna poprawa uwagi, szybkości reakcji czy sprawności umysłowej oznacza przewagę w pracy, sporcie i życiu.",
    linkText: "Sackler School of Medicine, Tel-Aviv University, Tel-Aviv, Israel",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7377835",
    icon: "🧠"
}

const wzrostEnergii = {
    text: "Regularne sesje w komorze hiperbarycznej to sprawdzony sposób, by naturalnie podnieść poziom energii, zredukować chroniczne zmęczenie oraz odzyskać chęci do aktywnego życia szczególnie w okresie jesienno-zimowym.",
    linkText: "Annals of Military and Health Sciences Research",
    link: "https://brieflands.com/articles/amhsr-59684",
    icon: "⚡"
}

const procesTerapii = {
    text: "HBOT intensywnie natlenia tkanki, przyspiesza regenerację tkanek miękkich, skóry, ścięgien i kości po urazach, otwartych złamaniach czy operacjach — efekty potwierdzone w licznych badaniach klinicznych na zdrowych dorosłych i sportowcach: wzrost neowaskularyzacji, produkcji kolagenu i zmniejszenie stanów zapalnych.",
    linkText: "Prince of Wales Hospital, Department of Anaesthesia, Barker Street, Randwick, NSW, Australia",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7387126",
    icon: "⏳"
}

const wzrostOdpornosci = {
    text: "Wysoki poziom komórek macierzystych po terapii HBOT przyspiesza gojenie się ran, regenerację skóry, narządów oraz tkanek, co wspiera szybką mobilizację układu immunologicznego podczas walki z infekcjami czy przewlekłymi schorzeniami.",
    linkText: "Departamento de Biología, Universidad de Chile, Santiago, Chile",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6078002",
    icon: "🛡️"
}

const wzrostVo2max = {
    text: "Sesje w komorze hiperbarycznej to przełomowy sposób na naturalną poprawę VO₂Max, czyli maksymalnej zdolności organizmu do wykorzystania tlenu. Każda nawet niewielka poprawa VO₂Max przekłada się na dłuższe i intensywniejsze treningi, szybszą regenerację oraz wymierne efekty zarówno w profesjonalnym sporcie, jak i codziennej aktywności.",
    linkText: "Physical Therapy Department, Shamir Medical Center, Zerifin, Israel",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8825926",
    icon: "📈"
}


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
    padding: 3rem 1rem 3rem 1rem !important;
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
        margin: 0 auto 2rem auto;
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

    // Tablet Responsiveness (769px – 1023px)
    @media (min-width: 769px) and (max-width: 1023px) {
        & {
            padding: 3rem 2.5rem 3rem 2.5rem !important;
        }

        &__header {
            h1 {
                font-size: 2rem;
            }
        }

        &__headerTagline {
            font-size: 1.05rem;
        }

        &__row {
            flex-direction: row;
            align-items: stretch;

            &--full {
                flex-direction: column;
            }
        }

        &__col {
            flex: 1;
            min-width: 0;
        }
    }
}
</style>