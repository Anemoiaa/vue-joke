<template>
	<div class="flex flex-col divide-y">
		<slot name="item" v-for="item in paginatedItems" :key="item.id" :item="item"></slot>
	</div>

	<!--  Pagination  -->
	<div class="flex-col gap-4 flex items-center justify-between border-t border-gray-200 bg-white pt-4">
		<div>
			<p class="text-sm text-gray-700">
				Showing
				<span class="font-medium">{{ (currentPage - 1) * itemPerPage + 1 }}</span>
				to
				<span class="font-medium">{{ Math.min(currentPage * itemPerPage, props.items.length) }}</span>
				of
				<span class="font-medium">{{ props.items.length }}</span>
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
										'hidden sm:inline-flex relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0': currentPage !== page,
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
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(['items', 'itemPerPage']);
const currentPage = ref(1);
const pagesAmount = computed(() => Math.ceil(props.items.length / props.itemPerPage));

const paginatedItems = computed(() => {
	const startIndex = (currentPage.value - 1) * props.itemPerPage;
	const endIndex = startIndex + props.itemPerPage;
	return props.items.slice(startIndex, endIndex);

});

function goToPage(page) {
	if(page < props.items.length && page > 0) {
		currentPage.value = page;
	}
}

function nextPage() {
	if(currentPage.value < props.items.length) {
		currentPage.value++;
	}
}

function prevPage() {
	if(currentPage.value > 1) {
		currentPage.value--;
	}
}

</script>

<style lang="scss" scoped>

</style>

