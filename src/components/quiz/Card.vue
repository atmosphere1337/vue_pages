<script setup="ts">
	import Answer from './Answer.vue';
	/*
		improt answer 
		(import from '*.vue' must be specified explicitely)
		
		pass props
		onclick

	*/
	const props = defineProps(['value']);
</script>
<template>
	<div class="card">
		<div class="question">
			{{ props.value }}		
		</div>
		<slot />
	</div>
</template>
	
<style scoped>
	.card {
		background-color: rgb(180, 250, 230);
		width: 500px;
		height: 500px;
		padding: 50px;
		border-radius: 20px;
	}
	.question {
		margin-bottom: 30px;
		background-color: rgb(150, 250, 150);
		border-radius: 8px;
		padding: 20px;
		
	}
</style>
