<template>
    <footer class="TlenovoFooter">
        <!-- Decorative Background Shapes -->
        <div class="TlenovoFooter__background">
            <div class="TlenovoFooter__shape TlenovoFooter__shape--1"></div>
            <div class="TlenovoFooter__shape TlenovoFooter__shape--2"></div>
        </div>

        <!-- Main Footer Content -->
        <div class="TlenovoFooter__content">
            <!-- Top Section - Location & Social -->
            <div class="TlenovoFooter__topSection">
                <!-- Location Card -->
                <div class="TlenovoFooter__card TlenovoFooter__card--location">
                    <div class="TlenovoFooter__cardIcon">
                        <q-icon name="place" size="28px" />
                    </div>
                    <div class="TlenovoFooter__cardContent" @click.prevent="onLocationClickHandler">
                        <h3 class="TlenovoFooter__cardTitle">Lokalizacja</h3>
                        <p class="TlenovoFooter__cardText">
                            ul. Ratuszowa 6<br>
                            58-304 Wałbrzych
                        </p>
                        <p 
                            href="#" 
                            class="TlenovoFooter__cardLink"
                        >
                            <span>Zobacz na mapie</span>
                            <q-icon name="arrow_forward" size="16px" />
                        </p>
                    </div>
                </div>

                <!-- Social Links Card -->
                <div class="TlenovoFooter__card TlenovoFooter__card--social">
                    <h3 class="TlenovoFooter__cardTitle">Obserwuj nas</h3>
                    <div class="TlenovoFooter__socialLinks">
                        <a 
                            :href="socialLinks.instagram" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="TlenovoFooter__socialLink TlenovoFooter__socialLink--instagram"
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <span>Instagram</span>
                        </a>
                        <a 
                            :href="socialLinks.facebook" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="TlenovoFooter__socialLink TlenovoFooter__socialLink--facebook"
                            aria-label="Facebook"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span>Facebook</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="TlenovoFooter__divider"></div>

            <!-- Bottom Section - Links & Copyright -->
            <div class="TlenovoFooter__bottomSection">
                <div class="TlenovoFooter__links">
                    <router-link 
                        to="/regulamin" 
                        class="TlenovoFooter__link"
                    >
                        <q-icon name="description" size="18px" />
                        <span>Regulamin</span>
                    </router-link>
                    <router-link 
                        to="/przeciwwskazania" 
                        class="TlenovoFooter__link"
                    >
                        <q-icon name="warning_amber" size="18px" />
                        <span>Przeciwwskazania</span>
                    </router-link>
                </div>

                <div class="TlenovoFooter__copyright">
                    <p>© {{ currentYear }} Tlenujemy. Wszelkie prawa zastrzeżone.</p>
                    <p class="TlenovoFooter__copyrightSub">
                        Terapia tlenem hiperbarycznym
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['onLocationClick']);

const currentYear = computed(() => new Date().getFullYear());

const socialLinks = {
    instagram: 'https://instagram.com/tlenujemy',
    facebook: 'https://facebook.com/tlenujemy'
};

function onLocationClickHandler() {
    emit('onLocationClick');
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Font - zgodność z resztą projektu
$font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-10px) rotate(2deg);
    }
}

@keyframes waveFlow {
    0% {
        d: path("M0,30 Q300,50 600,30 T1200,30");
    }
    25% {
        d: path("M0,35 Q300,20 600,40 T1200,25");
    }
    50% {
        d: path("M0,25 Q300,45 600,25 T1200,35");
    }
    75% {
        d: path("M0,40 Q300,25 600,35 T1200,30");
    }
    100% {
        d: path("M0,30 Q300,50 600,30 T1200,30");
    }
}

@keyframes shimmerGlow {
    0% {
        background-position: -200% center;
    }
    100% {
        background-position: 200% center;
    }
}

.TlenovoFooter {
    position: relative;
    font-family: $font;
    background: linear-gradient(
        180deg, 
        color.adjust($primary, $lightness: -5%) 0%,
        color.adjust($primary, $lightness: -10%) 100%
    );
    overflow: hidden;
    z-index: 3;
    padding: 4rem 1rem 0.75rem 1rem;
    margin-top: -3rem;
    clip-path: polygon(0 4%, 100% 0, 100% 100%, 0 100%);

    // Gradient Transition Section with Blur Effect
    &__transition {
        position: relative;
        height: 150px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 2rem;
    }

    // Base layer - transparent
    &__transitionBase {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 1;
    }

    // Blur layer - transparent with subtle blur effect
    &__transitionBlur {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: transparent;
    }

    // Gradient layer - transparent
    &__transitionGradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        background: transparent;
        
        // Shimmer effect
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -50%;
            width: 200%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba($accent, 0.03) 20%,
                rgba($accent, 0.06) 50%,
                rgba($accent, 0.03) 80%,
                transparent 100%
            );
            animation: shimmerGlow 8s ease-in-out infinite;
        }
    }

    // Glow effect - subtle
    &__transitionGlow {
        position: absolute;
        top: 30%;
        left: 0;
        width: 100%;
        height: 70%;
        z-index: 4;
        background: radial-gradient(
            ellipse 120% 60% at 50% 20%,
            rgba($accent, 0.08) 0%,
            rgba($accent, 0.04) 40%,
            transparent 70%
        );
        filter: blur(25px);
        pointer-events: none;
    }

    &__transitionWave {
        position: absolute;
        bottom: 15px;
        left: 0;
        width: 100%;
        height: 40px;
        z-index: 5;
        opacity: 0.5;
    }

    &__transitionWavePath {
        fill: none;
        stroke: rgba($accent, 0.35);
        stroke-width: 1.5;
        stroke-linecap: round;
        animation: waveFlow 12s ease-in-out infinite;
        filter: drop-shadow(0 0 8px rgba($accent, 0.25));
    }

    // Background Shapes
    &__background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
    }

    &__shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.06;
        background: $accent;

        &--1 {
            width: 250px;
            height: 250px;
            top: 200px;
            right: -60px;
            animation: float 8s ease-in-out infinite;
        }

        &--2 {
            width: 180px;
            height: 180px;
            bottom: 20%;
            left: -60px;
            animation: float 10s ease-in-out infinite reverse;
        }
    }

    // Main Content
    &__content {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        height: 100%;
        margin: 0 auto;
        animation: fadeInUp 0.6s ease-out;
    }

    // Top Section
    &__topSection {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    // Cards
    &__card {
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 1.5rem;
        transition: transform 0.3s ease, background 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-4px);
        }

        &--location {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }

        &--social {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    &__cardIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, $accent, color.adjust($accent, $lightness: -15%));
        border-radius: 14px;
        color: $primary;
        flex-shrink: 0;
    }

    &__cardContent {
        flex: 1;
    }

    &__cardTitle {
        font-size: 1rem;
        font-weight: 700;
        color: $white;
        margin: 0 0 0.5rem 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__cardText {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        margin: 0 0 0.75rem 0;
        line-height: 1.5;
    }

    &__cardLink {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        font-weight: 600;
        color: $accent;
        text-decoration: none;
        transition: gap 0.2s ease, color 0.2s ease;

        &:hover {
            color: color.adjust($accent, $lightness: 10%);
            gap: 0.75rem;
        }
    }

    // Social Links
    &__socialLinks {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
    }

    &__socialLink {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
        color: $white;
        transition: transform 0.2s ease, background 0.2s ease;

        svg {
            width: 20px;
            height: 20px;
        }

        &--instagram {
            background: linear-gradient(135deg, #833AB4, #E1306C, #F77737);

            &:hover {
                transform: scale(1.05);
            }
        }

        &--facebook {
            background: linear-gradient(135deg, #1877F2, #0D65D9);

            &:hover {
                transform: scale(1.05);
            }
        }
    }

    // Divider
    &__divider {
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 20%,
            rgba(255, 255, 255, 0.15) 80%,
            transparent 100%
        );
        margin: 1.5rem 0;
    }

    // Bottom Section
    &__bottomSection {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    &__links {
        display: flex;
        gap: 1.5rem;
    }

    &__link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.75);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: all 0.2s ease;

        &:hover {
            color: $white;
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
    }

    &__copyright {
        text-align: right;
        color: rgba(255, 255, 255, 0.6);

        p {
            margin: 0;
            font-size: 0.85rem;
        }
    }

    &__copyrightSub {
        font-size: 0.75rem !important;
        margin-top: 0.25rem !important;
        opacity: 0.7;
    }
}

// Responsive Design
@media (max-width: 768px) {
    .TlenovoFooter {
        &__transition {
            height: 120px;
            margin-bottom: 1.5rem;
        }

        &__transitionGlow {
            filter: blur(15px);
        }

        &__topSection {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        &__card {
            padding: 1.25rem;
        }

        &__cardIcon {
            width: 44px;
            height: 44px;
        }

        &__socialLinks {
            flex-direction: column;
            gap: 0.75rem;
        }

        &__socialLink {
            justify-content: center;
        }

        &__bottomSection {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
        }

        &__links {
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
        }

        &__link {
            justify-content: center;
        }

        &__copyright {
            text-align: center;
        }
    }
}

@media (max-width: 480px) {
    .TlenovoFooter {

        &__transition {
            height: 80px;
            margin-bottom: 1rem;
        }

        &__transitionWave {
            height: 30px;
            bottom: 10px;
        }

        &__transitionGlow {
            filter: blur(12px);
        }

        &__transitionBlur::after {
            filter: blur(18px);
        }

        &__card {
            padding: 1rem;
            border-radius: 16px;

            &--location {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
        }

        &__cardIcon {
            width: 48px;
            height: 48px;
        }

        &__cardTitle {
            font-size: 0.95rem;
        }

        &__cardText {
            font-size: 0.85rem;
        }

        &__socialLink {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;

            svg {
                width: 18px;
                height: 18px;
            }
        }

        &__link {
            font-size: 0.85rem;
            padding: 0.6rem 0.9rem;
        }

        &__copyright p {
            font-size: 0.8rem;
        }

        &__shape {
            &--1 {
                width: 150px;
                height: 150px;
            }

            &--2 {
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>
