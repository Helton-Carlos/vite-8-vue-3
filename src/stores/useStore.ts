import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("useStore", () => {
  const user = ref<string | null>(null);

  function setUser(newUser: string | null) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        newUser,
        requiresAuth: true,
      }),
    );

    user.value = newUser;
  }

  function logout() {
    localStorage.removeItem("user");

    user.value = null;
  }

  return {
    user,
    setUser,
    logout,
  };
});
