<template>
    <div class="TlenovoVideo">
        <div :class="{
            'TlenovoVideo__background': true,
            'TlenovoVideo__background--reversed': isReversed
        }">
            <p :class="{
                'TlenovoVideo__title': true,
                'TlenovoVideo__title--reversed': isReversed
            }">
                {{ title }}
            </p>
        </div>
        <div class="TlenovoVideo__content">
            <q-video
                :ratio="16/9"
                :src="videoSrc"
                :title="videoTitle"
            />
        </div>
    </div>
</template>

<script setup>
// Your component logic here using Composition API
defineProps({
    title: {
        type: String,
        default: 'Zobacz jak działa komora hiperbaryczna'
    },
    videoSrc: {
        type: String,
        default: 'https://www.youtube.com/embed/zdlYjo-5b1k'
    },
    videoTitle: {
        type: String,
        default: 'Tlenovo - Komora Hiperbaryczna'
    },
    isReversed: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped lang="scss">
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


.TlenovoVideo {
    position: relative;
    width: 100%;
    min-height: 420px;
    overflow: hidden;
    
    &__background {
        // Image should be passed
        background: linear-gradient(
                rgba($accent, 1.0), 
                rgba($primary, 0)
            ), url('/path/to/your/image.jpg') center/cover no-repeat;


        min-height: 300px;
        opacity: 0.85;
        clip-path: polygon(0 15%, 100% 0, 100% 60%, 0 75%);
        z-index: 0;
        padding: 50px 0;

        &--reversed {
            background: linear-gradient(
                    rgba($primary, .75), 
                    rgba($accent, 1.0)
                ), url('/path/to/your/image.jpg') center/cover no-repeat;
            clip-path: polygon(0 0, 100% 15%, 100% 75%, 0 60%);
        }
    }

    &__title {
        font-size: 32px;
        font-weight: 600;
        color: $primary;
        text-align: center;
        text-transform: uppercase;
        z-index: 1;

        &--reversed {
            color: $white;
        }
    }

    &__content {
        position: absolute;
        top: 146px;
        width: 100%;
        max-width: 800px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        transform: translateY(50px);
        animation: fadeInUp 1s ease-out forwards;
        animation-delay: 0.5s;

        iframe {
            aspect-ratio: 16 / 9;
            border: none;
            display: block;
        }
    }

    @media (max-width: 768px) {
        &__title {
            font-size: 24px;
        }

        &__content {
            padding: 0 8px;
            max-width: 100%;
        }
    }

    @media (max-width: 480px) {
        &__title {
            font-size: 20px;
            padding: 12px;
            margin-bottom: 20px;
        }

        &__content {
            padding: 0 8px;
        }
    }
}
</style>
