<template>
  <main class='favourites container'>
    <h1 class='favourites-title'>Избранное</h1>
    <div class='favourites-body'>
      <Article class='home-body__item' :article='item' v-for='item in $store.state.favorites' :key='item.id' />
    </div>
  </main>
</template>

<script setup>
import Article from '../components/Article.vue';
</script>
