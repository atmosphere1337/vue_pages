<script lang="ts" setup>
    import Minesweeper from './Minesweeper.vue'
    import {ref} from 'vue'
    const val = ref(0)
    const rerender = () => val.value++
</script>
<template>
    <Minesweeper :key="val" @reset="rerender()"></Minesweeper>
</template>