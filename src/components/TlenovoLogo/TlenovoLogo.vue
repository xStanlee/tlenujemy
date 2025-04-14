<template>
    <q-img
        :class="[
            'TlenovoLogo',
            { 'TlenovoLogo--small': isMobile }
        ]"
        src="src/assets/logo.png"
        spinner-color="white"
    />
</template>

<script setup>
defineProps({
    isMobile: Boolean,
})
</script>

<style lang="scss" scoped>
.TlenovoLogo {
    width: 220px;
    height: 100%;

    &:hover {
        cursor: pointer;
    }

    &--small {
        width: 180px;
    }
}
</style>