<script setup="ts">
	import {ref, computed} from 'vue';
	import Card from '../components/quiz/Card.vue';
	import Answer from '../components/quiz/Answer.vue';
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
	// interpolation in attribute not working, v-bind
	// what about react input binding to variable? target.value
	// why no rerender
	// ...
	const step = ref(0);
	const score = ref(0);
	const currentQuestion = computed(() => rawData[step.value]);
	function check(inp) {
		if (inp == currentQuestion.value.correct) { 
			score.value++;
		}
		if (step.value < rawData.length - 1)
			step.value++;
		else {
			alert(`Result is ${score.value} out of ${rawData.length}`);
			score.value = 0;
			step.value = 0;
		}
	};

</script>
<template>
	<div class="quiz-main">
		<Card v-bind:value="currentQuestion.question">
			<Answer 
				v-for="(ans, ind) in currentQuestion.answers" 
				:key="ind"
				v-bind:value="ans"
				v-bind:number="ind"
				@next="check"
			/>
		</Card>
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
