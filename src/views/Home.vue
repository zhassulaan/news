<template>
  <main class='home container'>
    <div class='home-hero'>
      <div class='home-hero__background'></div>
      <Search @input='handleSearch' />
    </div>

    <div class='home-body'>
      <Article
        class='home-body__item'
        v-for='item in filteredImages'
        :key='filteredImages.id'
        :article='item'
        @click="toggleModal(item)"
      />
    </div>

    <Modal v-show='modal' :article='modal'  @close="toggleModal(null)" />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import Search from '@/components/Search.vue';
import Article from '@/components/Article.vue';
import Modal from '@/components/Modal.vue';
import { useStore } from 'vuex';

const store = useStore();
const searchInput = ref('');
const modal = ref(null);
const filteredImages = computed(() => {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) {
    return store.state.news;
  }
  return store.state.news.filter(
    (item) => 
      item.author?.toLowerCase().includes(query) ||
      item.title?.toLowerCase().includes(query)
  );
});

function handleSearch(value) {
  searchInput.value = value;
}
function toggleModal(value) {
  modal.value = value;
	let classes = document.querySelector('.modal');

	if (modal.value) {
		classes.classList.add("active");
		document.body.style.overflow = "hidden";
	} else {
		classes.classList.remove("active");
		document.body.style.overflow = "auto";
	}
};
</script>
