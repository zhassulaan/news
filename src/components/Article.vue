<template>
	<div class='article'>
		<img :src='article.urlToImage' :alt='article.title' class='article-image' />
	</div>
</template>

<script setup>
const props = defineProps({
	article: Object
});
</script>

<style scoped lang='scss'>
	.article {
		border-radius: 8px;
		overflow: hidden;
		&-image {
			width: 100%;
			height: 100%;
		}
		&:hover {
			scale: 1.05;
		}
	}
</style>
