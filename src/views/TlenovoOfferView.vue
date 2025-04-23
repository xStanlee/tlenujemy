<template>
    <q-page-container class="TlenovoOfferView">
        <div class="TlenovoOfferView__background">
            <div class="TlenovoOfferView__shape TlenovoOfferView__shape--1"></div>
            <div class="TlenovoOfferView__shape TlenovoOfferView__shape--2"></div>
        </div>
        
        <div class="TlenovoOfferView__header">
            <h1>Gdzie nas znajdziesz</h1>
            <p>Nasza siedziba znajduje się w: Swiebodzicach, ul. Wodna 13</p>
        </div>
        
        <div class="TlenovoOfferView__content">
            <!-- TODO: replace with google maps embed Telnovo -->
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d629.5387489643476!2d16.31261724396172!3d50.865330242434545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e54c8321e622d%3A0xd73cbcfeb5aede3!2sSklep%20aqua-active%20%C5%9Awiebodzice!5e0!3m2!1spl!2spl!4v1745398640815!5m2!1spl!2spl" 
                width="100%" 
                height="400" 
                style="border:0;" 
                referrerpolicy="no-referrer-when-downgrade"
            />
            
            <div class="TlenovoOfferView__contentItem">
                <p>Nasz gabinet jest ustytuowany w budynku OSIR Swiebodzice na poziomie 0</p>
            </div>
        </div>
    </q-page-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.TlenovoOfferView {
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
        position: relative;
        z-index: 2;
    }

    &__contentItem {
        margin: 2rem 0 6rem 0;
        color: $primary;
        font-size: 1.2rem;
        line-height: 1.2;
        opacity: 0.8;
    }

    &__shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;

        &--1 {
            width: 400px;
            height: 400px;
            top: -150px;
            left: 150px;
            background-color: $primary;
        }
        
        &--2 {
            width: 300px;
            height: 300px;
            top: 15%;
            left: -100px;
            background-color: $primary;
        }
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
    }
}
</style>