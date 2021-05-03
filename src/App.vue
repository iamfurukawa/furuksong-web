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
import LocalStorageService from './services/local-storage/local-storage-service';

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
      const versionLocal = LocalStorageService.getVersion();
      const versionFirebase = (await FirebaseFirestoreService.version()).docs[0].id;
      let sounds = LocalStorageService.getSounds();

      console.log(`Actual Version: ${versionFirebase}`);
      console.log(`Local Version: ${versionLocal}`);

      if (versionLocal === versionFirebase && sounds) {
        console.log('Using Local Storage.');
        this.audios = _.sortBy(this.audios, ['playedTimes']).reverse();
        return;
      }

      LocalStorageService.saveVersion(versionFirebase);
      sounds = await FirebaseFirestoreService.get();
      this.audios = sounds.docs.map((doc) => ({
        uuid: doc.id,
        displayName: doc.data().displayName,
        playedTimes: doc.data().playedTimes,
      }));
      this.audios = _.sortBy(this.audios, ['playedTimes']).reverse();
      LocalStorageService.saveSounds(this.audios);
      console.log('Using Firebase.');
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
