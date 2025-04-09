import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    currentDisplay: [],
    parent: { name: "Master", id: null },
    showModal: false,
    leftPanel: [],
  }),
  actions: {
    updateDirectory(newDisplay) {
      this.currentDisplay = newDisplay;
    },
    updateLeftPanel(newLeftPanel) {
      this.leftPanel = newLeftPanel;
    },
    updateParent(newParent) {
      this.parent = newParent;
    },
    updateShowModal(status) {
      this.showModal = status;
    },
  },
});
