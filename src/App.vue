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
					<SearchBar @search="handleSearch"/>
				</div>
			</div>

			<!--	Search Result		-->
			<div
					v-if="searchedJokes && searchedJokes.length"
					class="mt-4 mb-10 px-8 py-4 bg-white rounded"
			>
				<PaginationList :items="searchedJokes" :itemPerPage="5">
				<template v-slot:item="{ item }">
						<JokeCard :joke="item" />
					</template>
				</PaginationList>
			</div>

			<!--	Not found		-->
			<div
					v-else-if="searchedJokes && searchedJokes.length === 0"
					class="mt-4 flex flex-col justify-center items-center gap-4"
			>
				<DanceChuck />
				<span class="text-red-800 uppercase">There are nothing</span>
			</div>

		</div>
	</DefaultLayout>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";

import {useJokeStore} from "@/stores/joke.js";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import JokeCard from "@/components/JokeCard.vue";
import DanceChuck from "@/components/Gif/DanceChuck.vue";
import PaginationList from "@/components/PaginationList.vue";
import SearchBar from "@/components/SearchBar.vue";


const jokeStore = useJokeStore();
const jokeList = jokeStore.jokeList;

const searchedJokes = computed(() => jokeStore.searchedJokeList);


async function handleSearch(newValue) {
	await jokeStore.searchJokes(newValue);
}

onBeforeMount(async () => {
	await jokeStore.getJokeList();
});
</script>

<style lang="scss" scoped>
</style>