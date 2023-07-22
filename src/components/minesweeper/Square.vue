<script setup lang="ts">
    import {ref, computed} from 'vue'
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
    const neighbours = computed(()=>{if (props.vis == 1) return props.neighbour_handler(props.pos); else return 0;})
    const avail = ref(true)
    const killer = ref(false)
    function handle()
    {
        if (avail.value)
        {
            avail.value = false
            let keep:boolean = props.click_handler(props.pos)
            if (!keep)
                killer.value = true
        }
    }
</script>
<template>
    <div 
     :class="{m_cell: true, m_clicked_empty: props.vis == 1, m_deadcell: killer}"
     @click="handle()">
        <span v-if="props.mode == 0 && props.vis == 1 && neighbours > 0">
            {{neighbours}} 
        </span>
        <span v-if="props.vis == 1 && props.mode == 1">
            X
        </span>
    </div>
</template>