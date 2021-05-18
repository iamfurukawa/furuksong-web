<template>
  <div class="listViewSound">
    <SoundCard
      v-for="audio in audios.filter((audio) =>
        (audio.displayName.toUpperCase().includes(filterValue.toUpperCase()) ||
          audio.tags.includes(capitalize(filterValue))) &&
        (tagSelected === 'todos' || audio.tags.includes(tagSelected)))"
      :key="JSON.stringify({uuid: audio.uuid, tags: audio.tags})"
      :displayName="audio.displayName"
      :uuid="audio.uuid"
      :tags="audio.tags"
      :playedTimes="audio.playedTimes"
      :ip="ip"
      @likeEvent="likeEvent"
      @showModal="showModal"
    />
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import LocalStorageService from '../services/local-storage/local-storage-service';
import SoundCard from './SoundCard.vue';
import Modal from './Modal.vue';

export default {
  name: 'ListViewSound',
  components: {
    SoundCard,
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  props: ['audios', 'filterValue', 'tagSelected', 'ip', 'like'],
  methods: {
    likeEvent({ tags, uuidSound }) {
      this.$emit('like', { tags, uuidSound });
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    showModal() {
      if (!LocalStorageService.getDiscordId()) {
        this.isModalVisible = true;
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.listViewSound {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
</style>
