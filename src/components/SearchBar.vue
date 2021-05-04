<template>
  <div class="searchBar">
    <input
      type="text"
      placeholder="Sound name"
      v-model="search"
      @keyup="$emit('onType', $event.target.value)"
    />
    <select
      @change="$emit('selectTag', $event.target.value)"
      name="tags"
      id="tags"
    >
      <option value="todos">Todos</option>
      <option
        v-for="option in this.selectOptions"
        :value="option"
        :key="option"
      >{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['selectOptions', 'selectTag'],
  data() {
    return {
      search: '',
    };
  },
};
</script>

<style scoped lang='scss'>
.searchBar {
  display: flex;
  width: 100%;
}

select {
  flex: 1;
  margin-right: 10px;
  width: 100%;

  padding: 0.5em;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  border-radius: 3px;
}

input {
  flex: 5;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;

  padding: 0.5em;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  border-radius: 3px;
}
</style>
