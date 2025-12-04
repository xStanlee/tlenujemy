<template>
    <q-page-container class="TlenovoOfferView">
        <div class="TlenovoOfferView__background">
            <div class="TlenovoOfferView__shape TlenovoOfferView__shape--1"></div>
            <div class="TlenovoOfferView__shape TlenovoOfferView__shape--2"></div>
            <div class="TlenovoOfferView__shape TlenovoOfferView__shape--3"></div>
            <div class="TlenovoOfferView__shape TlenovoOfferView__shape--footer"></div>
        </div>
        
        <header class="TlenovoOfferView__header">
            <h1>Gdzie nas znajdziesz</h1>
            <p class="TlenovoOfferView__headerTagline">
                Nasza siedziba znajduje się w:
                <br/> <br/> 
                Wałbrzychu, ul. Ratuszowa 6
                <br/>
                58-304 Wałbrzych
                <br/>
            </p>
        </header>
        
        <section class="TlenovoOfferView__content">
            <div class="TlenovoOfferView__mapContainer">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.533882477003!2d16.249017677116132!3d50.78421367165772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e5691a8945371%3A0x4d0245478485a0bd!2sAqua%20Zdr%C3%B3j!5e0!3m2!1spl!2spl!4v1764858276464!5m2!1spl!2spl" 
                    width="100%" 
                    height="400" 
                    style="border:0;" 
                    referrerpolicy="no-referrer-when-downgrade"
                    class="TlenovoOfferView__map"
                />
            </div>
            
            <div class="TlenovoOfferView__contentItem">
                <h2 class="TlenovoOfferView__contentItemTitle">Informacje dodatkowe</h2>
                <p class="TlenovoOfferView__contentItemText">
                    Nasz gabinet znajduje się w budynku głównym Aqua Zdrój w Wałbrzychu na poziomie 0. 
                    Na wprost od głównego wejścia na basen.
                </p>
            </div>
        </section>
    </q-page-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Font import - zgodność z TlenovoMainView i TlenovoContraView
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

.TlenovoOfferView {
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

    &__header {
        position: relative;
        z-index: 2;
        text-align: center;
        margin-bottom: 3rem;
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
        position: relative;
        z-index: 2;
        max-width: 900px;
        margin: 0 auto 5rem auto;
        animation: slideInLeft 0.6s ease-out 0.4s both;
    }

    &__mapContainer {
        margin-bottom: 2rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        overflow: hidden;

        &:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-2px);
        }
    }

    &__map {
        border-radius: 15px;
        width: 100%;
        height: 300px;
        filter: grayscale(20%) brightness(0.9);
        transition: all 0.3s ease;

        &:hover {
            filter: grayscale(0%) brightness(1);
        }
    }

    &__contentItem {
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
        margin-bottom: 1rem;
        line-height: 1.3;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    &__contentItemText {
        color: $white;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
        margin: 0;
        opacity: 0.9;
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
            bottom: 15%;
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