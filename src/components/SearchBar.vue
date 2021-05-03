<template>
  <input
    type="text"
    placeholder="Sound name"
    v-model="search"
    @keyup="$emit('onType', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      search: '',
    };
  },
};
</script>

<style scoped lang='scss'>
input {
  margin-left: 10px;
  margin-right: 10px;
  padding: 0.5em;

  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  border-radius: 3px;
}
</style>
