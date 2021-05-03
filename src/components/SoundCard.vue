<template>
  <div class="card" @click="() => handleClick(this.uuid)">
    <font-awesome-icon icon="music" class="icon" />
    <h3>{{ this.displayName }}</h3>
  </div>
</template>

<script>
import FirebaseRealtimeService from '../services/firebase/firebase-realtime-service';

export default {
  name: 'SoundCard',
  props: ['displayName', 'uuid'],
  methods: {
    handleClick: async (uuid) => {
      await FirebaseRealtimeService.update('RequestSoundMonitoring', uuid);
    },
  },
};
</script>

<style scoped lang='scss'>
.card {
  display: flex;
  align-items: center;

  width: 300%;
  height: 100px;
  max-width: 400px;

  cursor: pointer;
  margin: 10px;

  background-color: #404040;

  .icon {
    font-size: 64px;
    margin: 15px;
    color: #c4c4c4;
  }

  h3 {
    color: #c4c4c4;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;

    max-height: 80px;
    margin: 10px;
  }
}
</style>
