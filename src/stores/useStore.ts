import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("useStore", () => {
  const user = ref<string | null>(null);

  function setUser(newUser: string | null) {
    user.value = newUser;
  }

  return {
    user,
    setUser,
  };
});
