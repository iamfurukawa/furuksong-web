<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Você não tem um usuário do discord selecionado
          </slot>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <center>
              <label for="fname">Qual é o seu discord id?</label>
              <br><br>
              <input
                type="text"
                id="fname"
                name="fname"
                v-model="discordId"
              >
              <br><br>
              <label for="fname">Aonde encontrar:</label>
              <br><br>
              <img src="@/assets/discordid.gif">
            </center>
          </slot>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Salvar
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import LocalStorageService from '../services/local-storage/local-storage-service';

export default {
  name: 'Modal',
  data() {
    return { discordId: '' };
  },
  methods: {
    close() {
      LocalStorageService.saveDiscordId(this.discordId);
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  font-family: 'Montserrat', sans-serif;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  font-family: 'Montserrat', sans-serif;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
