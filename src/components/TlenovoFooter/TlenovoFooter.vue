<template>
    <div class="TlenovoFooter">
        <footer class="TlenovoFooter__wrapper">
            <div class="TlenovoFooter__info">
                <div class="TlenovoFooter__phone">
                    <q-icon name="call" size="sm" />
                    <p>(+48) 733 096 056</p>
                </div>
                <div class="TlenovoFooter__openHours">
                    <q-icon name="access_time" size="sm" />
                    <p>pn-niedz 8:00 - 20:00</p>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 51" class="TlenovoFooter__instagram">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9-51.3-114.9-114.9-114.9zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.5s-57.8-34.5-93.5-36.2c-37-2.1-148-2.1-185 0-35.7 1.7-67.3 9.9-93.5 36.2s-34.5 57.8-36.2 93.5c-2.1 37-2.1 148 0 185 1.7 35.7 9.9 67.3 36.2 93.5s57.8 34.5 93.5 36.2c37 2.1 148 2.1 185 0 35.7-1.7 67.3-9.9 93.5-36.2s34.5-57.8 36.2-93.5c2.1-37 2.1-148 0-185zm-48.2 224c-7.8 19.6-23 35.8-42.6 42.6-29.5 11.7-99.5 9-132.7 9s-103.2 2.6-132.7-9c-19.6-7.8-35.8-23-42.6-42.6-11.7-29.5-9-99.5-9-132.7s-2.6-103.2 9-132.7c7.8-19.6 23-35.8 42.6-42.6 29.5-11.7 99.5-9 132.7-9s103.2-2.6 132.7 9c19.6 7.8 35.8 23 42.6 42.6 11.7 29.5 9 99.5 9 132.7s2.6 103.2-9 132.7z"/>
            </svg>

            <svg viewBox="0 0 50 100">
                <path id="wave" class="TlenovoFooter__wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
                <use id="wave2" class="TlenovoFooter__wave" xlink:href="#wave" x="0" y="-2" ></use> 
                <use id="wave3" class="TlenovoFooter__wave" xlink:href="#wave" x="0" y="0" ></use>
            </svg>
        </footer>
    </div>
</template>

<script setup>
// Composition API component logic goes here

</script>

<style lang="scss" scoped>
@keyframes wave {
    2% {
        transform: translateX(1);
    }

    25% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(-50%);
    }

    75% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(1);
    }
}

.TlenovoFooter {
    width: 100%;
    height: 250px;
    position: relative;
    background-color: transparent;

    &__wrapper {
        background-color: transparent;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        svg {
            width: 100%;
        }
    }


    &__info {
        position: absolute;
        bottom: 20%;
        left: 12px;
        color: $primary;
        display: flex;
        flex-direction: column;
        z-index: 1;
    }
    
    &__phone {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        color: $primary;

        p {
            font-size: 16px;
            margin-right: auto;
            text-decoration: underline;
        }

        q-icon {
            color: $primary;
        }
    }

    &__openHours {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        color: $primary;

        p {
            font-size: 16px;
            text-decoration: underline;
        }

        q-icon {
            color: $primary;
        }
    }

    &__instagram {
        position: absolute;
        bottom: 20%;
        left: 0;
        color: $primary;
        z-index: 1;
        width: 40px;
        height: 40px;
        fill: $primary;

        &:hover {
            cursor: pointer;
            fill: $accent;
            transition: all .3s ease-in-out;
        }
    }

    &__wave {
        fill: $accent;
        animation: wave 10s linear infinite;


        &:nth-child(1) {
            opacity: .9;    
        }

        &:nth-child(2) {
            animation-duration: 15s;
            animation-direction: reverse;
            opacity: .9;
        }

        &:nth-child(3) {
            animation-duration: 20s;
            opacity: .9;
        }
    }
}
</style>