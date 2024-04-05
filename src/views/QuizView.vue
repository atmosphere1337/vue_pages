<script setup="ts">
	import {ref} from 'vue';
	import Card from '../components/quiz/Card.vue';
	/*
	 *   mind the notes
	 *   
	 *    
	 *    
	 *    
	 */
	const rawData = [
    {
        question: "What is the largest planet in our solar system?",
        correct: 3,
        answers: ["Saturn", "Sun", "Earth", "Jupiter"]
    },
    {
        question: "What name is given to animals that only eat plants and vegetables?",
        correct: 2,
        answers: ["Carnivores", "Omnivores", "Herbivores"]
    },
    {
        question: "What gas do we breathe in?",
        correct: 3,
        answers: ["Nitrogen", "Copium", "Helium", "Oxygen"]
    },
    {
        question: "What is the world’s largest mammal?",
        correct: 3,
        answers: ["JoeMoma", "Lion", "Bear", "Blue whale"]
    },
    {
        question: "What temperature does water boil at?",
        correct: 3,
        answers: ["36.6º",  "451º",  "0º", "100º"]
    },

	];
	// 1. create 2 components and import
	// now import works. problem was in { }. 
	// import answer component
	// ...
	const igor = ref(0);
</script>
<template>
	<div class="quiz-main">
		what
		<Card></Card>
	</div>
</template>
<style>
	.quiz-main {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(255, 170, 220);
	}
</style>
