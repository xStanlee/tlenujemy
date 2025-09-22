<template>
   <div class="TlenovoFact">
        <span class="TlenovoFact__backgroundCircle">
          <svg class="TlenovoFact__logo" width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="60" y="125" font-family="Arial" font-size="72" fill="#FFF" font-weight="bold">O</text>
            <text x="115" y="145" font-family="Arial" font-size="36" fill="#FFF" font-weight="bold">2</text>
          </svg>   
        </span>

        <div class="TlenovoFact__cardContent">
            <span class="TlenovoFact__iconContainer">
                {{ icon }}
            </span>
            <div class="TlenovoFact__textContent">
                <p class="TlenovoFact__description">
                    {{ text }}
                </p>
            </div>
            <div class="TlenovoFact__linkContainer">
              <span class="TlenovoFact__exploreLink" @click="onClickLinkHandler(link)">{{ linkText }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
});

function onClickLinkHandler(link) {
  window.open(link, '_blank');
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Font import - zgodność z innymi komponentami
$font: 'Inter';
@import url('//fonts.googleapis.com/css2?family=#{$font}:wght@300;400;500;600;700;800;900&display=swap');

.TlenovoFact {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background: linear-gradient(135deg, rgba($white, .9), rgba($white, 0.75));
    border-radius: 1rem;
    padding: 3rem 1.5rem 2.5rem 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    ring: 1px solid rgba(17, 24, 39, 0.05);
    transition: all 0.5s ease;
    transform: scale(1);
    margin: 0 auto;
    min-width: 22rem;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.35);

      &__backgroundCircle {
        transform: scale(20);
      }

      &__textContent {
        color: white;
      }

      &__exploreLink {
        color: white;
      }
    }

    &__backgroundCircle {
      position: absolute;
      top: .75rem;
      left: .75rem;
      z-index: 0;
      height: 8rem;
      width: 8rem;
      border-radius: 50%;
      background: linear-gradient(to right, $primary, lighten($primary, 10%));
      transition: all 0.5s ease;
      transform: scale(1);
    }

    &__logo {
      width: 100%;
      height: 100%;
      z-index: 10;
    }

    &__cardContent {
      position: relative;
      z-index: 10;
      margin: 0 auto;
      max-width: 24rem;
    }

    &__iconContainer {
        display: grid;
        margin-left: 2.5rem;
        margin-top: .5rem;
        height: 6rem;
        font-size: 2.8rem;
        width: 6rem;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(to right, rgba($white, 1), rgba($white, 0.9));
        transition: all 0.5s ease;
        transform: scale(1);
    }

    &__icon {
      height: 3rem;
      width: 3rem;
      color: white;
      transition: all 0.5s ease;
    }

    &__textContent {
      padding-top: 1.5rem;
      font-size: 1.125rem;
      line-height: 2rem;
      color: #374151;
      transition: all 0.5s ease;

      & > * + * {
        margin-top: 1.5rem;
      }
    }

    &__description {
      font-weight: 500;
      margin: 0;
      color: $primary;
    }

    &__linkContainer {
      padding-top: 1.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.75rem;

      & > p {
        margin: 0;
      }
    }

    &__exploreLink {
      color: darken($secondary, 30%);
      text-decoration: underline;
      letter-spacing: 1px;
      transition: all 0.5s ease;
    }
}
</style>
