<template>
  <div class="content">
    <Header />
    <SearchBar @onType="onType" />
    <ListViewSound :audios="audios" :filterValue="filterValue"/>

  </div>
</template>

<script>
import _ from 'lodash';

import Header from './components/Header.vue';
import SearchBar from './components/SearchBar.vue';
import ListViewSound from './components/ListViewSound.vue';

import FirebaseFirestoreService from './services/firebase/firebase-firestore-service';

export default {
  name: 'App',
  components: {
    Header,
    SearchBar,
    ListViewSound,
  },
  data: () => ({ audios: [], filterValue: '' }),
  methods: {
    async getAudios() {
      const sounds = await FirebaseFirestoreService.get();
      this.audios = sounds.docs.map((doc) => ({
        uuid: doc.id,
        displayName: doc.data().displayName,
        playedTimes: doc.data().playedTimes,
      }));
      this.audios = _.sortBy(this.audios, ['playedTimes']).reverse();
    },
    onType(filterValue) {
      this.filterValue = filterValue;
    },
  },
  async created() {
    await this.getAudios();
  },
};
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Montserrat&display=swap');

html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  background: #202226;

  .content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }
}
</style>
