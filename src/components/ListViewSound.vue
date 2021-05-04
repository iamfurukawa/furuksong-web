<template>
  <div class="listViewSound">
    <SoundCard
      v-for="audio in audios.filter((audio) =>
        audio.displayName.includes(filterValue) &&
        (tagSelected === 'todos' || audio.tags.includes(tagSelected))
      )"
      :key="audio.uuid"
      :displayName="audio.displayName"
      :uuid="audio.uuid"
      :tags="audio.tags"
    />
  </div>
</template>

<script>
import SoundCard from './SoundCard.vue';

export default {
  name: 'ListViewSound',
  components: {
    SoundCard,
  },
  props: ['audios', 'filterValue', 'tagSelected'],
};
</script>

<style scoped lang='scss'>
.listViewSound {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
</style>
