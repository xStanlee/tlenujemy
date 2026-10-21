<template>
    <section :class="['TlenovoVideo', { 'TlenovoVideo--bare': !title }]">
        <h2 v-if="title" class="TlenovoVideo__title">
            {{ title }}
        </h2>

        <div class="TlenovoVideo__content">
            <!-- playsinline: na iOS wideo nie przechodzi od razu w pełny ekran -->
            <video
                class="TlenovoVideo__player"
                :src="src"
                :aria-label="videoTitle"
                controls
                playsinline
                preload="metadata"
            />
        </div>
    </section>
</template>

<script setup>
defineProps({
    // Pusty tytuł = sam odtwarzacz (np. w PhoneEmulator na desktopie)
    title: {
        type: String,
        default: 'Zobacz jak działa komora hiperbaryczna'
    },
    // Plik z folderu public – BASE_URL uwzględnia /tlenujemy/ na GitHub Pages
    src: {
        type: String,
        default: `${import.meta.env.BASE_URL}video/tlenovo.mp4`
    },
    videoTitle: {
        type: String,
        default: 'Tlenovo - Komora Hiperbaryczna'
    }
})
</script>

<style scoped lang="scss">
.TlenovoVideo {
    padding: 2rem 1rem;

    &__title {
        background: linear-gradient(135deg, rgba($white, 1), rgba($accent, 0.85));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1.3;
        text-align: center;
        margin: 0 0 1.5rem 0;
    }

    &__content {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        background: #000;
    }

    &__player {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: #000;
    }

    // Sam odtwarzacz wypełnia kontener rodzica
    &--bare {
        padding: 0;
        width: 100%;
        height: 100%;

        .TlenovoVideo__content {
            height: 100%;
            border-radius: 0;
            box-shadow: none;
        }

        .TlenovoVideo__player {
            height: 100%;
            aspect-ratio: auto;
        }
    }
}
</style>
