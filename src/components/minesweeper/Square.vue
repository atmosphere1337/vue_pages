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
        pos: {
            type: Number,
            default: 0
        },
        vis: {
            type: Number,
            default: 0
        },
        neighbours: {
            type: Number,
            default: 0
        },
        gameover: {
            type: Boolean,
            default: false
        }
    })
    const emit = defineEmits(['marked_down'])
    const colors = ref(['black', 'blue', 'green', 'red', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'])
    const avail = ref(true)
    const killer = ref(false)
    const marked = ref(false)
    function handle()
    {
        if (!props.gameover && avail.value)
        {
            avail.value = false
            let keep:boolean = props.click_handler(props.pos)
            if (!keep)
                killer.value = true
        }
    }
    function rightclick(e:Event)
    {
        marked.value = !marked.value 
        if (props.vis == 0)
            emit('marked_down', marked.value)
        e.preventDefault()
    }
</script>
<template>
    <div 
     :class="{m_cell: true, m_clicked_empty: props.vis == 1, m_deadcell: killer}"
     :style="{textAlign: 'center', fontSize: '28px', fontWeight: 'bold'}"
     @click="handle()"
     @contextmenu="rightclick"
     >
        <span 
         v-if="props.mode == 0 && props.vis == 1 && props.neighbours > 0"
         :style="{color: colors[neighbours]}"
        >
            {{neighbours}} 
        </span>
        <span v-if="props.vis == 1 && props.mode == 1">
            X
        </span>
        <span v-if="marked && props.vis == 0">
            P
        </span>
    </div>
</template>