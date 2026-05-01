import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useStore = defineStore('useStore', () => {
  const user = ref<string | null>(null);

  const savedTheme = localStorage.getItem('theme') || 'aqua';
  const theme = ref<string>(savedTheme);

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'aqua' : 'dark';
  }

  watch(theme, applyTheme, { immediate: true });

  function setUser(newUser: string | null) {
    localStorage.setItem(
      'user',
      JSON.stringify({ newUser, requiresAuth: true }),
    );
    user.value = newUser;
  }

  function logout() {
    localStorage.removeItem('user');
    user.value = null;
  }

  return { user, theme, setUser, logout, toggleTheme };
});
