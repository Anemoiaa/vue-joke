<template>
	<div class="flex flex-col gap-4">
		<input
				v-model="searchString"
				class="px-4 py-2 border rounded"
				type="text"
				placeholder="Search"
		/>
		<div v-for="error in validationError">
			<span class="text-[12px] text-red-800">{{ error }}</span>
		</div>
	</div>

</template>

<script setup>
import { ref, watch} from "vue";

const emit = defineEmits(['search'])

const searchString = ref(null);
const validationError = ref(new Set());


let searchTimerId;
watch(
		searchString,
		async (newValue, oldValue) => {
			if(newValue.length === 0) {
				validationError.value.clear();
				return;
			} else if (newValue && newValue.length <= 2) {
				validationError.value.add('The field must contain more than 2 characters');
				return
			}

			validationError.value.clear();
			clearTimeout(searchTimerId);

			searchTimerId = setTimeout(async () => {
				emit("search", newValue);
			}, 800);
		},
		{ immediate: false }
);
</script>

<style lang="scss" scoped>
</style>
