<template>
  <div id='modal' class='modal'>
    <div v-if="article" class="modal-background btn" @click="$emit('close')"></div>

    <div v-if="article" class="modal-wrap detail">
      <div class='detail-background'>
        <img :src='article.urlToImage' :alt='article.title' class='detail-background__image' />
      </div>

      <div class='detail-header'>
        <div class='detail-header__left'>
          <img :src='article.urlToImage' class='detail-header__left-avatar' :alt='article.artist' />
          <h6 class='detail-header__left-title'>{{ article.title }}</h6>
          <p class='detail-header__left-subtitle'>{{ article.author }}</p>
        </div>

        <div class='detail-header__right'>
          <div class='detail-header__right-button btn' @click='handleFavorite()'>
            <icon-heart class='button-icon' :class="{ 'active': isFavorite }" />
          </div>
          <a :href='article.url' class='detail-header__right-button btn'>
            <icon-download class='button-icon' />
            <p class='button-text'>Go to page</p>
          </a>
        </div>
      </div>

      <div class='detail-body'>
        <div class="detail-body__image">
          <img :src='article.urlToImage' :alt='article.title' />
          <icon-maximize class='detail-body__image-button btn' @click='toggleMaximize' />
        </div>
        <p>{{ article.description }}</p>
        <p>{{ article.publishedAt }}</p>
      </div>
    </div>

    <div class='modal-maximized' v-if='isMaximized'>
      <img :src='article.urlToImage' class='modal-maximized__image' :class="isWidthLarger ? 'width' : 'height'" :alt='article.name' @load='checkImageDimensions' />
      <div class='modal-maximized__close btn' @click='toggleMaximize'></div>
      <div class='modal-maximized__background' @click='toggleMaximize'></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import IconHeart from '../components/icons/Heart.vue';
import IconDownload from '../components/icons/Download.vue';
import IconMaximize from '../components/icons/Maximize.vue';

const store = useStore();
const props = defineProps({
  article: Object
});
const isFavorite = computed(() => store.state.favorites.some(fav => fav.id === props.article.id));
const isWidthLarger = ref(null);
const isMaximized = ref(false);

onMounted(() => {
  isMaximized.value = false;
});

function handleFavorite() {
  if (isFavorite.value) {
    store.dispatch('removeFavorite', props.article.id);
  } else {
    store.dispatch('addFavorite', props.article);
  }
};
function toggleMaximize() {
  console.log(store.state);
  isMaximized.value = !isMaximized.value;
  if (isMaximized.value) {
    document.body.classList.add('freeze');
  } else {
    document.body.classList.remove('freeze');
  }
}
function checkImageDimensions(event) {
  const imageElement = event.target;
  if (imageElement.naturalWidth > imageElement.naturalHeight) {
    isWidthLarger.value = true;
  } else {
    isWidthLarger.value = false;
  }
}
</script>
