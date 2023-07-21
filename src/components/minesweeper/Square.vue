<script setup lang="ts">
    import {ref} from 'vue'
    const props = defineProps({
        mode: {
            type: Number,
            default: 0
        },
        click_handler: {
            type: Function,
            default: ()=>{},
        },
        neighbour_handler: {
            type: Function,
            default: ()=>{}
        },
        pos: {
            type: Number,
            default: 0
        },
        vis: {
            type: Number,
            default: 0
        } 
    })
    const neighbours = ref(0)
    const avail = ref(true)
    const killer = ref(false)
    function handle()
    {
        if (avail.value)
        {
            avail.value = false
            let keep:boolean = props.click_handler(props.pos)
            if (keep)
                neighbours.value = props.neighbour_handler(props.pos)
            else
                killer.value = true
        }
    }
</script>
<template>
    <div 
     :class="{m_cell: true, m_clicked_empty: props.vis == 1, m_deadcell: killer}"
     @click="handle()">
       <!--{{ props.mode }} -->
        <span v-if="props.mode == 0 && neighbours > 0">
            {{neighbours}} 
        </span>
        <span v-if="props.vis == 1 && props.mode == 1">
            X
        </span>
    </div>
</template>