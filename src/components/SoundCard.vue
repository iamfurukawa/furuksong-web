<template>
  <div class="card">
    <div
      class="topBar"
      @click="() => (handleClick(this.uuid, this.ip) && $emit('showModal'))"
    >
      <font-awesome-icon
        icon="music"
        class="icon"
      />
      <h3>{{ this.displayName.substring(0,50) }} {{this.displayName.length > 50 ? '...' : ''}}</h3>
    </div>
    <div class="bottomBar">
      <font-awesome-icon
        icon="star"
        :class="getStarStyle(tags)"
        @click="$emit('likeEvent', {tags, uuidSound: uuid})"
      />
      <span class="tag">
        {{playedTimes}}
      </span>
      <span
        class="tag"
        v-for="tag in tags"
        :key="tag"
      >{{tag}}</span>
    </div>
  </div>
</template>

<script>
import FirebaseRealtimeService from '../services/firebase/firebase-realtime-service';
import LocalStorageService from '../services/local-storage/local-storage-service';

export default {
  name: 'SoundCard',
  props: [
    'displayName',
    'uuid',
    'tags',
    'ip',
    'likeEvent',
    'playedTimes',
    'showModal',
  ],
  methods: {
    handleClick: async (uuid, ip) => {
      const discordId = LocalStorageService.getDiscordId();
      if (discordId) {
        await FirebaseRealtimeService.update(
          'RequestSoundMonitoring',
          uuid,
          ip,
          discordId,
        );
      }
    },
    getStarStyle: (tags) => (tags.includes('Like') ? 'star-gold' : 'star-gray'),
  },
};
</script>

<style scoped lang='scss'>
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  height: 250px;
  width: 200px;

  margin: 10px;

  background-color: #404040;

  .icon {
    font-size: 64px;
    color: #c4c4c4;
    padding: 10px;
  }
  .topBar {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 100%;

    cursor: pointer;
  }

  .bottomBar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 10px;

    .star-gray {
      font-size: 18px;
      color: white;
      padding: 10px;
    }

    .star-gold {
      font-size: 18px;
      color: gold;
      padding: 10px;
    }

    .tag {
      padding: 0.25rem 0.4rem;
      border-radius: 3px;
      align-items: center;
      display: inline-flex;
      justify-content: center;
      background-color: #f04043;

      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      color: #ffffff;
      box-sizing: border-box;
      line-height: 1.5;

      margin: 5px;
    }
  }

  h3 {
    color: #c4c4c4;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 400;

    margin-top: 0px;
    margin-bottom: 0px;

    padding: 10px;
  }
}
</style>
