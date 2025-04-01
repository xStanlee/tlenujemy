import { acceptHMRUpdate, defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbarStore', {
  state: () => ({
    message: '',
    color: 'positive', //'positive', 'negative', 'primary', 'secondary'
    timeout: 3000,
    icon: 'done_outline',
    iconSize: 'lg',
    position: 'bottom',
    visible: false,
    timeoutId: null, // To track the active timeout
  }),

  getters: {
    doubleCount: (state) => state.counter * 2,
  },

  actions: {
    // Show the snackbar with a message
    showSnackbar(message, options = {}) {
      // Clear any existing timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      // Update state with provided options
      this.message = message
      this.color = options.color || this.color
      this.timeout = options.timeout || this.timeout
      this.icon = options.icon || this.icon
      this.position = options.position || this.position
      this.visible = true

      // Auto-hide after timeout
      if (this.timeout > 0) {
        this.timeoutId = setTimeout(() => {
          this.hideSnackbar()
        }, this.timeout)
      }
    },

    hideSnackbar() {
      this.visible = false;
      // Optional: clear the timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))
}
