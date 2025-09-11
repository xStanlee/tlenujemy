<template>
    <section class="TlenovoCTASection">
        <div class="TlenovoCTASection__container">
            <!-- Background decorative elements -->
            <div class="TlenovoCTASection__decorBg">
                <div class="TlenovoCTASection__decorCircle TlenovoCTASection__decorCircle--1"></div>
                <div class="TlenovoCTASection__decorCircle TlenovoCTASection__decorCircle--2"></div>
                <div class="TlenovoCTASection__decorCircle TlenovoCTASection__decorCircle--3"></div>
            </div>
            
            <!-- Main CTA Card -->
            <div class="TlenovoCTASection__card">
                <div class="TlenovoCTASection__cardHeader">
                    <div class="TlenovoCTASection__badge">
                        <span class="TlenovoCTASection__badgeIcon">🏆</span>
                        <span class="TlenovoCTASection__badgeText">Profesjonalna Opieka</span>
                    </div>
                    <h3 class="TlenovoCTASection__title">
                        Jedyna taka komora<br>
                        <span class="TlenovoCTASection__titleHighlight">w Wałbrzychu</span>
                    </h3>
                    <p class="TlenovoCTASection__subtitle">
                        Nowoczesna komora z <strong>zakresem 1.6 ATA - 2.0 ATA</strong> z pełną obsługą
                    </p>
                </div>

                <div class="TlenovoCTASection__features">
                    <div 
                        class="TlenovoCTASection__feature" 
                        v-for="(feature, index) in features" 
                        :key="index"
                        :style="{ animationDelay: `${index * 150}ms` }"
                    >
                        <div class="TlenovoCTASection__featureIcon">
                            <span>{{ feature.icon }}</span>
                        </div>
                        <div class="TlenovoCTASection__featureContent">
                            <h4 class="TlenovoCTASection__featureTitle">{{ feature.title }}</h4>
                            <p class="TlenovoCTASection__featureDesc">{{ feature.description }}</p>
                        </div>
                    </div>
                </div>

                <div class="TlenovoCTASection__stats">
                    <div class="TlenovoCTASection__stat" v-for="(stat, index) in stats" :key="index">
                        <div class="TlenovoCTASection__statNumber">{{ stat.number }}</div>
                        <div class="TlenovoCTASection__statLabel">{{ stat.label }}</div>
                    </div>
                </div>

                <div class="TlenovoCTASection__action">
                    <a href="tel:+48733096056" class="TlenovoCTASection__contact">
                        <div class="TlenovoCTASection__contactIcon">📞</div>
                        <div class="TlenovoCTASection__contactInfo">
                            <span class="TlenovoCTASection__contactLabel">Zadzwoń już dziś</span>
                            <span class="TlenovoCTASection__contactNumber">+48 733 096 056</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
    {
        icon: '🏥',
        title: 'Profesjonalna opieka',
        description: 'Wykwalifikowany personel podczas każdej sesji'
    },
    {
        icon: '⚡',
        title: 'Nowoczesna komora',
        description: 'Najnowsza technologia, jedyna taka w okolicy'
    },
    {
        icon: '👨‍⚕️',
        title: 'Indywidualne podejście',
        description: 'Każdy pacjent otrzymuje spersonalizowaną opiekę'
    }
]);

const stats = ref([
    { number: '2.0', label: 'ATA' },
    { number: '100%', label: 'Tlen' },
    { number: '60', label: 'minut' }
]);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

@keyframes floatAnimation {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(2deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
}

@keyframes pulseGlow {
    0%, 100% { 
        box-shadow: 0 0 0 0 rgba($secondary, 0.4);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 0 20px rgba($secondary, 0);
        transform: scale(1.05);
    }
}

@keyframes slideInMobile {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes rotateDecor {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.TlenovoCTASection {
    padding: 60px 0;
    position: relative;
    background: $primary;
    clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 97%);
    overflow: hidden;
    
    // Mobile First Design
    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        position: relative;
        z-index: 2;
    }
    
    &__decorBg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
    }
    
    &__decorCircle {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba($white, 0.8), rgba($primary, 0.2));
        
        &--1 {
            width: 100px;
            height: 100px;
            top: 10%;
            right: 10%;
            animation: floatAnimation 6s ease-in-out infinite;
        }
        
        &--2 {
            width: 60px;
            height: 60px;
            bottom: 25%;
            left: 15%;
            animation: floatAnimation 8s ease-in-out infinite reverse;
        }
        
        &--3 {
            width: 80px;
            height: 80px;
            top: 50%;
            right: 15%;
            animation: rotateDecor 20s linear infinite;
            opacity: 0.5;
        }
    }
    
    &__card {
        background: linear-gradient(135deg, 
            rgba($white, 0.95) 0%,
            rgba($accent, 0.95) 100%);
        border-radius: 20px;
        padding: 2rem 1.5rem;
        box-shadow: 0 20px 60px rgba($primary, 0.1);
        border: 1px solid rgba($primary, 0.1);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
        animation: slideInMobile 0.8s ease-out;
        margin-bottom: 7rem;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba($secondary, 0.1) 50%, 
                transparent 100%);
            animation: shimmer 3s ease-in-out infinite;
            pointer-events: none;
        }
    }
    
    &__cardHeader {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    &__badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 30%));
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 1rem;
        animation: pulseGlow 2s ease-in-out infinite;
    }
    
    &__badgeIcon {
        font-size: 1rem;
    }
    
    &__title {
        font-size: 1.8rem;
        font-weight: 700;
        color: $primary;
        margin: 0 0 1rem 0;
        line-height: 1.3;
    }
    
    &__titleHighlight {
        background: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 30%));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 800;
    }
    
    &__subtitle {
        font-size: 1rem;
        color: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 30%));
        margin: 0;
        opacity: 0.8;
        line-height: 1.5;
        padding: 0 1rem;
    }
    
    &__features {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    &__feature {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: rgba($white, 0.6);
        border-radius: 15px;
        border: 1px solid rgba($primary, 0.1);
        transition: all 0.3s ease;
        animation: slideInMobile 0.6s ease-out both;
        
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba($primary, 0.1);
            background: rgba($white, 0.8);
        }
    }
    
    &__featureIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        background: linear-gradient(135deg, rgba($secondary, 0.1), rgba($primary, 0.1));
        border-radius: 12px;
        font-size: 1.5rem;
        flex-shrink: 0;
    }
    
    &__featureTitle {
        font-size: 1.1rem;
        font-weight: 600;
        color: $primary;
        line-height: 1.6rem;
        margin: 0 0 0.3rem 0;
    }
    
    &__featureDesc {
        font-size: 0.9rem;
        color: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 30%));
        margin: 0;
        line-height: 1.4;
        opacity: 0.8;
    }
    
    &__stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;
        padding: 1.5rem 0;
        background: linear-gradient(135deg, rgba($primary, 0.05), rgba($secondary, 0.05));
        border-radius: 15px;
        border: 1px solid rgba($primary, 0.1);
    }
    
    &__stat {
        text-align: center;
        
        &Number {
            font-size: 2rem;
            font-weight: 800;
            color: $primary;
            line-height: 1;
            margin-bottom: 0.2rem;
            display: block;
        }
        
        &Label {
            font-size: 0.8rem;
            color: $primary;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    }
    
    &__action {
        text-align: center;
    }
    
    &__contact {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1.2rem;
        background: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 45%));
        color: white;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        
        &:hover {
            transform: scale(1.02);
            box-shadow: 0 15px 40px rgba($primary, 0.3);
        }
    }
    
    &__contactIcon {
        font-size: 1.5rem;
        animation: floatAnimation 2s ease-in-out infinite;
    }
    
    &__contactInfo {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    
    &__contactLabel {
        font-size: 0.9rem;
        opacity: 0.9;
        margin-bottom: 0.2rem;
    }
    
    &__contactNumber {
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 1px;
    }
    
    // Tablet responsiveness
    // @media (min-width: 640px) {
    //     padding: 80px 0;
        
    //     &__container {
    //         padding: 0 2rem;
    //     }
        
    //     &__card {
    //         padding: 3rem 2.5rem;
    //     }
        
    //     &__title {
    //         font-size: 2.2rem;
    //     }
        
    //     &__subtitle {
    //         font-size: 1.1rem;
    //     }
        
    //     &__features {
    //         gap: 1.2rem;
    //     }
        
    //     &__feature {
    //         flex-direction: row;
    //         align-items: center;
    //     }
        
    //     &__contact {
    //         max-width: 400px;
    //         margin: 0 auto;
    //     }
    // }
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}
</style> 