<template>
	<div
			class="flex items-center gap-4 py-4"
	>
		<img
				class="w-10 h-10"
				src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" alt="">
		<p class="text-base">{{ props.joke.value }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	joke: {
		required: true,
		type: Object,
	}
});

</script>

<style lang="scss" scoped>

</style>