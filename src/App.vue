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
					v-if="searchedJokes && searchedJokes.length"
					class="mt-4 mb-10 px-8 py-4 bg-white rounded"
			>
				<div class="flex flex-col divide-y">
					<JokeCard
							v-for="item in paginatedAndSearchedJokes"
							:key="item.id"
							:joke="item"
					/>
				</div>
				<!--  Pagination  -->
				<div class="flex-col gap-4 flex items-center justify-between border-t border-gray-200 bg-white pt-4">
					<div>
						<p class="text-sm text-gray-700">
							Showing
							<span class="font-medium">{{ (currentPage - 1) * itemPerPage + 1 }}</span>
							to
							<span class="font-medium">{{ Math.min(currentPage * itemPerPage, searchedJokesAmount) }}</span>
							of
							<span class="font-medium">{{ searchedJokesAmount }}</span>
							results
						</p>
					</div>
					<div>
						<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
							<button
									class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
									@click="prevPage"
									:disabled="currentPage === 1"
							>
								<span class="sr-only">Previous</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
								</svg>
							</button>
							<button
									v-for="page in pagesAmount"
									:key="page"
									@click="goToPage(page)"
									:class="{
										'z-10 bg-indigo-600 px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600': currentPage === page,
										'hidden relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0': currentPage !== page,
							}"
							>
								{{ page }}
							</button>

							<button
									class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
									@click="nextPage"
									:disabled="currentPage === pagesAmount"
							>
								<span class="sr-only">Next</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
								</svg>
							</button>
						</nav>
					</div>
				</div>

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
import {computed, ref, watch} from "vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import {useJokeStore} from "@/stores/joke.js";
import {onBeforeMount} from "vue";
import JokeCard from "@/components/JokeCard.vue";
import DanceChuck from "@/components/Gif/DanceChuck.vue";


const jokeStore = useJokeStore();
const jokeList = jokeStore.jokeList;


const searchedJokes = computed(() => jokeStore.searchedJokeList);
const searchedJokesAmount = computed(() => searchedJokes.value.length);

const currentPage = ref(1);
const itemPerPage = 5;
const pagesAmount = computed(() => Math.ceil(searchedJokesAmount.value / itemPerPage));
const paginatedAndSearchedJokes = computed(() => {
	const startIndex = (currentPage.value - 1) * itemPerPage;
	const endIndex = startIndex + itemPerPage;
	return searchedJokes.value.slice(startIndex, endIndex);

});

const searchString = ref(null);

function goToPage(page) {
	currentPage.value = page;
}

function nextPage() {
	currentPage.value++;
}

function prevPage() {
	currentPage.value--;
}

let searchTimerId;
watch(
		searchString,
		async (newValue, oldValue) => {
			if(newValue.length === 0) {
				return;
			}
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