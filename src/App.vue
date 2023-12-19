<template>
	<DefaultLayout>
		<div class="container mx-auto mt-10">
			<!-- JOKES -->
			<div class="flex flex-col divide-y px-8 py-4 rounded bg-white">
				<JokeCard
						v-for="item in jokeList"
						:key="item.id"
						:joke="item"
				/>
			</div>

			<!--	Search Bar	-->
			<div class="mt-10">
				<div class="mx-auto w-fit">
					<input
							v-model="searchString"
							class="px-4 py-2 border rounded"
							type="text"
							placeholder="Search"
					/>
				</div>
			</div>

			<!--	Search Result		-->
			<div
					v-if="searchedJokes.length"
					class="mt-4 mb-10 px-8 py-4 bg-white rounded"
			>
				<div class="flex flex-col divide-y">
					<JokeCard
							v-for="item in searchedJokes"
							:key="item.id"
							:joke="item"
					/>
				</div>
			</div>

		</div>
	</DefaultLayout>
</template>

<script setup>
import {computed, ref, watch} from "vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import {useJokeStore} from "@/stores/joke.js";
import {onBeforeMount} from "vue";
import JokeCard from "@/components/JokeCard.vue";


const jokeStore = useJokeStore();
const jokeList = jokeStore.jokeList;
const searchedJokes = computed(() => jokeStore.searchedJokeList);


const searchString = ref(null);

let searchTimerId;
watch(
		searchString,
		async (newValue, oldValue) => {
			clearTimeout(searchTimerId);

			searchTimerId = setTimeout(async () => {
				await jokeStore.searchJokes(newValue);
			}, 800);
		},
		{ immediate: false }
);


onBeforeMount(async () => {
	await jokeStore.getJokeList();
});

</script>

<style lang="scss" scoped>

</style>