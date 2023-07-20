<script setup lang="ts">
    import {ref} from 'vue';
    import Square from '../components/minesweeper/Square.vue' 
    
    function createMap(width:number, height:number, times:number):number [][]
    {
        let size = width * height
        let linear_out: number[] = new Array(size).fill(0)
        let places: number[] = []
        let contender: number
        for (let i = 0; i < times; i++)
        {
            do
                contender = Math.floor(Math.random() * size)
            while (places.includes(contender))
            places.push(contender)
            linear_out[contender] = 1
        }
        let out: number[][] = new Array(height)
        for (let i = 0; i < )
        for (let i = 0; i < height; i++) 
            for (let j = 0; j < width; j++)

        return out
    }
    const val = ref("Hello world")
    const map = ref

    
</script>
<template>
    <div class="minesweeper">
        <div class="m_window">
            <div class="m_info"></div>
            <div class="m_outerfield">
                <div class="m_field">
                    <Square v-for="x in 16"></Square>
                </div>
            </div>
        </div>
    </div>
</template>