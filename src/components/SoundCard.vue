<template>
  <div
    class="card"
    @click="() => handleClick(this.uuid)"
    @click="() => handleClick(this.uuid, this.ip)"
  >
    <font-awesome-icon
      icon="music"
      class="icon"
    />
    <h3>{{ this.displayName.substring(0,50) }} {{this.displayName.length > 50 ? '...' : ''}}</h3>
    <div class="bottomBar">
      <font-awesome-icon
        icon="star"
        class="star-gray"
      />
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

export default {
  name: 'SoundCard',
  props: ['displayName', 'uuid', 'tags'],
  props: ['displayName', 'uuid', 'tags', 'ip'],
  methods: {
    handleClick: async (uuid) => {
      await FirebaseRealtimeService.update('RequestSoundMonitoring', uuid);
    handleClick: async (uuid, ip) => {
      await FirebaseRealtimeService.update('RequestSoundMonitoring', uuid, ip);
    },
    },
  },
};
</script>

<style scoped lang='scss'>
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  height: 200px;
  width: 200px;

  cursor: pointer;
  margin: 10px;

  background-color: #404040;

  .icon {
    font-size: 64px;
    color: #c4c4c4;
    padding: 10px;
  }

  .bottomBar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;

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
      background-color: #F04043;

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
