<template>
  <RouterView />
</template>

<script>
export default {
  name: 'Home',
  beforeCreate() {
    this.$store.dispatch('fetchNews');
  }
}
</script>
