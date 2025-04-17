<template>
    <q-page-container class="TlenovoContraView">
        <div class="TlenovoContraView__background">
            <div class="TlenovoContraView__shape TlenovoContraView__shape--1"></div>
            <div class="TlenovoContraView__shape TlenovoContraView__shape--2"></div>
            <div class="TlenovoContraView__shape TlenovoContraView__shape--3"></div>
            <div class="TlenovoContraView__shape TlenovoContraView__shape--footer"></div>
        </div>
        
        <div class="TlenovoContraView__header">
            <h1>Informacje o Przeciwwskazaniach</h1>
            <p>Zapoznaj się z przeciwwskazaniami dla hiperbarii</p>
        </div>
        
        <div class="TlenovoContraView__content">
            <div class="TlenovoContraView__contentItem">
                <p class="TlenovoContraView__contentItemTitle">Bezwzględne przeciwwskazania do hiperbarii:</p>
                <ul class="TlenovoContraView__contentItemList">
                    <li class="TlenovoContraView__contentItemListElement">chemioterapia</li>
                    <li class="TlenovoContraView__contentItemListElement">klaustrofobia</li>
                    <li class="TlenovoContraView__contentItemListElement">nieleczona odma płucna</li>
                    <li class="TlenovoContraView__contentItemListElement">przyjmowanie bleomycyny</li>
                    <li class="TlenovoContraView__contentItemListElement">przymowanie doksorubicyny</li>
                    <li class="TlenovoContraView__contentItemListElement">przyjmowanie cisplatyny</li>
                    <li class="TlenovoContraView__contentItemListElement">disulfiramu</li>
                </ul>
            </div>

            <div class="TlenovoContraView__contentItem">
                <p class="TlenovoContraView__contentItemTitle">Przeciwwskazania względne:</p>
                <ul class="TlenovoContraView__contentItemList">
                    <li class="TlenovoContraView__contentItemListElement">zastosowanie tlenoterapii hiperbarycznej w ciąży</li>
                    <li class="TlenovoContraView__contentItemListElement">rozrusznik serca</li>
                    <li class="TlenovoContraView__contentItemListElement">zaćma</li>
                    <li class="TlenovoContraView__contentItemListElement">zespół niedokrwistości hemolitycznej</li>
                    <li class="TlenovoContraView__contentItemListElement">infekcje wirusowe płuc i zatok</li>
                    <li class="TlenovoContraView__contentItemListElement">sferocytoza</li>
                    <li class="TlenovoContraView__contentItemListElement">rozedma płuc</li>
                    <li class="TlenovoContraView__contentItemListElement TlenovoContraView__contentItemListElement--marginBottom">nowotwory leczone radioterapią (niezbędna konsultacja z lekarzem)</li>
                </ul>
            </div>
        </div>

        
    </q-page-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.TlenovoContraView {
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

    &__contentItem {
        margin-bottom: 3rem;
    }

    &__contentItemTitle {
        color: $primary;
        font-size: 1.2rem;
    }
    
    &__contentItemList {
        list-style-type: disc;
        margin-left: 1rem;
    }

    &__contentItemListElement {
        color: $primary;
        font-size: 1.2rem;

        &--marginBottom {
            margin-bottom: 7rem;
        }
    }
       
    &__shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;

            &--1 {
                width: 400px;
                height: 400px;
                top: -150px;
                left: -150px;
                background-color: $primary;
            }
            
            &--2 {
                width: 300px;
                height: 300px;
                top: 15%;
                right: -100px;
                background-color: $primary;
            }
            
            &--3 {
                width: 350px;
                height: 350px;
                bottom: 5%;
                left: 25%;
                background-color: $primary;
            }

            &--footer {
                width: 100%;
                height: 15vh;
                bottom: 0;
                left: 0;
                background-color: $primary;
                opacity: 1;
                border-radius: 0;
                clip-path: polygon(
                    0% 100%,
                    100% 100%,
                    100% 22%,
                    0% 0%
                );
            }
        }
}
</style>