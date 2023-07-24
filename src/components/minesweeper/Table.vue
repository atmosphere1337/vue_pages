<script lang="ts">
    export default {
        data() {
            return {
                val: 'Hello',
                time: 0,
                timer_instance: 0,
            }
        },
        emits: ['restart'],
        methods: {
            timer_function(){return setInterval(()=>{ this.time++}, 1000)},
            emit_newgame() { this.$emit('restart', true) }
        },
        mounted() {
            this.time = 0
            this.timer_instance = this.timer_function()
        },
        props: {
            bombs: {
                type: Number,
                default: 0
            }

        }

    }
</script>
<template>
    <div>
        <div>{{ $props.bombs }}</div>
        <div @click="emit_newgame">Restart</div>
        <div>{{ time }}</div>
    </div>
</template>