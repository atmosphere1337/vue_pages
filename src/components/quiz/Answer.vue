<script setup="ts">
	// defineProps no need to import
	const props = defineProps(['number', 'value']);
</script>
<template>
	<div class="answer" @click="$emit('next', number)">
		{{props.value}} {{ props.number }}
	</div>
</template>
<style scoped>
	.answer {
		background-color: rgb(180, 200, 250);
		padding: 20px;
		margin-bottom: 10px;
		border-radius: 5px;
	}
	.answer:hover {
		background-color: yellow;
	}
</style>
