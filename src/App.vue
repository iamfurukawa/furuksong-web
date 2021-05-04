<template>
  <div class="content">
    <Header />
    <SearchBar
      @onType="onType"
      @selectTag="selectTag"
      :selectOptions="selectOptions"
    />
    <ListViewSound
      :audios="audios"
      :filterValue="filterValue"
      :tagSelected="tagSelected"
    />

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
  data: () => ({
    audios: [],
    filterValue: '',
    selectOptions: '',
    tagSelected: 'todos',
  }),
  methods: {
    async getAudios() {
      const versionLocal = LocalStorageService.getVersion();
      const versionFirebase = (await FirebaseFirestoreService.version()).docs[0]
        .id;
      let sounds = LocalStorageService.getSounds();

      console.log(`Actual Version: ${versionFirebase}`);
      console.log(`Local Version: ${versionLocal}`);

      if (versionLocal === versionFirebase && sounds) {
        console.log('Using Local Storage.');
        this.audios = _.sortBy(sounds, ['playedTimes']).reverse();
        return;
      }

      LocalStorageService.saveVersion(versionFirebase);
      sounds = await FirebaseFirestoreService.get();
      this.audios = sounds.docs.map((doc) => {
        const splitted = doc.data().displayName.replaceAll('[', '').split(']');
        const tags = splitted.map((e) => e.trim());
        return {
          uuid: doc.id,
          displayName: tags.pop(),
          playedTimes: doc.data().playedTimes,
          tags,
        };
      });
      LocalStorageService.saveSounds(this.audios);
      this.audios = _.sortBy(this.audios, ['playedTimes']).reverse();
      console.log('Using Firebase.');
    },
    onType(filterValue) {
      this.filterValue = filterValue;
    },
    selectTag(tag) {
      this.tagSelected = tag;
    },
  },
  async created() {
    await this.getAudios();

    const tags = [];
    this.audios.forEach((audio) => {
      tags.push(...audio.tags);
    });
    this.selectOptions = _.uniq(tags);
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
