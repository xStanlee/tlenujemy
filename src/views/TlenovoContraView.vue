<template>
    <q-page-container class="TlenovoContraView">
        <div class="TlenovoContraView__background">
            <div class="TlenovoContraView__shape TlenovoContraView__shape--1"></div>
            <div class="TlenovoContraView__shape TlenovoContraView__shape--2"></div>
            <div class="TlenovoContraView__shape TlenovoContraView__shape--3"></div>
            <div class="TlenovoContraView__shape TlenovoContraView__shape--footer"></div>
        </div>
        
        <header class="TlenovoContraView__header">
            <h1>Informacje o Przeciwwskazaniach</h1>
            <p class="TlenovoContraView__headerTagline">
                Zapoznaj się z przeciwwskazaniami dla hiperbarii
            </p>
        </header>
        
        <section class="TlenovoContraView__content">
            <div class="TlenovoContraView__contentItem">
                <h2 class="TlenovoContraView__contentItemTitle">Bezwzględne przeciwwskazania do hiperbarii:</h2>
                <ul class="TlenovoContraView__contentItemList">
                    <li class="TlenovoContraView__contentItemListElement">nieleczona odma płucna</li>
                    <li class="TlenovoContraView__contentItemListElement">przyjmowanie bleomycyny</li>
                    <li class="TlenovoContraView__contentItemListElement">przymowanie doksorubicyny</li>
                    <li class="TlenovoContraView__contentItemListElement">przyjmowanie cisplatyny</li>
                    <li class="TlenovoContraView__contentItemListElement">przyjmowanie disulfiramu</li>
                    <li class="TlenovoContraView__contentItemListElement">chemioterapia</li>
                    <li class="TlenovoContraView__contentItemListElement">klaustrofobia</li>
                </ul>
            </div>

            <div class="TlenovoContraView__contentItem">
                <h2 class="TlenovoContraView__contentItemTitle">Przeciwwskazania względne:</h2>
                <ul class="TlenovoContraView__contentItemList">
                    <li class="TlenovoContraView__contentItemListElement">zastosowanie tlenoterapii hiperbarycznej w ciąży</li>
                    <li class="TlenovoContraView__contentItemListElement">rozrusznik serca</li>
                    <li class="TlenovoContraView__contentItemListElement">zaćma</li>
                    <li class="TlenovoContraView__contentItemListElement">zespół niedokrwistości hemolitycznej</li>
                    <li class="TlenovoContraView__contentItemListElement">infekcje wirusowe płuc i zatok</li>
                    <li class="TlenovoContraView__contentItemListElement">sferocytoza</li>
                    <li class="TlenovoContraView__contentItemListElement">rozedma płuc</li>
                    <li class="TlenovoContraView__contentItemListElement">nowotwory leczone radioterapią (niezbędna konsultacja z lekarzem)</li>
                </ul>
            </div>
        </section>
    </q-page-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Font import - zgodność z TlenovoMainView
$font: 'Inter';
@import url('//fonts.googleapis.com/css2?family=#{$font}:wght@300;400;500;600;700;800&display=swap');

// Animations - zgodność z TlenovoMainView
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

.TlenovoContraView {
    position: relative;
    font-family: $font;
    background-color: $primary;
    max-width: 100%;
    padding: 2rem 1rem;
    min-height: 100vh;
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

    &__header {
        position: relative;
        z-index: 2;
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem 1rem 1rem 1rem;
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
        position: relative;
        z-index: 2;
        max-width: 800px;
        margin: 0 auto 7rem auto;
        animation: slideInLeft 0.6s ease-out 0.4s both;
    }

    &__contentItem {
        margin-bottom: 3rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-2px);
        }
    }

    &__contentItemTitle {
        color: $white;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        line-height: 1.3;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    &__contentItemList {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    &__contentItemListElement {
        color: $white;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 0.8rem;
        padding: 0.6rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border-left: 3px solid $accent;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
            border-left-color: lighten($accent, 20%);
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
       
    &__shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.08;

        &--1 {
            width: 300px;
            height: 300px;
            top: -100px;
            left: -100px;
            background-color: $accent;
        }
        
        &--2 {
            width: 200px;
            height: 200px;
            top: 20%;
            right: -80px;
            background-color: $accent;
        }
        
        &--3 {
            width: 250px;
            height: 250px;
            bottom: 10%;
            left: 15%;
            background-color: $accent;
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
}
</style>