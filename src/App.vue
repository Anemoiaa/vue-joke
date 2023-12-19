<template>
	<DefaultLayout>
		<div class="container mx-auto mt-10">

			<!-- JOKES -->
			<div class="flex flex-col divide-y px-8 py-4 rounded bg-white">
				<div
						v-for="item in jokeList"
						:key="item.id"
						class="flex items-center gap-4 py-4"
				>
					<img
							class="w-10 h-10"
							src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" alt="">
					<p class="text-base">{{ item.value }}</p>
				</div>
			</div>

			<!--	Search Bar	-->
			<div class="mt-10 mx-auto">
				<input
						v-model="searchString"
						type="text"
						placeholder="Search">
			</div>
		</div>
	</DefaultLayout>
</template>

<script setup>
import {ref} from "vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import {useJokeStore} from "@/stores/joke.js";
import {onBeforeMount} from "vue";


const jokeStore = useJokeStore();
const jokeList = jokeStore.jokeList;


const searchString = ref(null);

onBeforeMount(async () => {
	await jokeStore.getJokeList();
});

</script>

<style lang="scss" scoped>

</style>