<template>
  <div
    id="modal"
    class="fixed inset-0 flex items-center justify-center bg-gray-50/80"
  >
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
      <h2 class="text-xl font-semibold mb-4">Folder Name</h2>

      <label
        class="text-red-500 py-2"
        :class="errorMessage === '' ? 'hidden' : 'block'"
        >{{ errorMessage }}</label
      >
      <div class="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Folder Name"
          v-model="folderName"
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button
          @click="hideModals(false)"
          data-type="hidemodals"
          type="submit"
          class="disabled:bg-red-50 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          :disabled="isLoading"
        >
          Cancel
        </button>
        <button
          @click="submitHandler(folderName)"
          type="submit"
          class="disabled:bg-blue-50 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          :disabled="isLoading"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

import { useAppStore } from "../store/store";
import axios from "axios";
const props = defineProps({
  parent: Number,
});
const errorMessage = ref("");
const isLoading = ref(false);
const folderName = ref("");
const store = useAppStore();

const hideModals = async () => {
  store.updateShowModal(false);
};
const submitHandler = (folderName) => {
  errorMessage.value = "";
  isLoading.value = true;
  axios
    .post("api/v1/directory", {
      parent: props.parent === null ? 0 : props.parent,
      name: folderName,
    })
    .then(async (result) => {
      const response = await axios.get("/api/v1/directory", {
        params: {
          parent: props.parent === null ? 0 : props.parent,
        },
      });
      const leftPanel = await axios.get("api/v1/directory");
      store.updateLeftPanel(leftPanel.data.data.detail);
      store.updateDirectory(response.data.data.detail);
      store.updateParent(response.data.data.parent);
      store.updateDirectory(response.data.data.detail);
      store.updateParent(response.data.data.parent);
      store.updateShowModal(false);
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });

  isLoading.value = false;
};
</script>
