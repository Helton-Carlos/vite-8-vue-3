import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import type { UserRole } from '../mocks/users';

export const useStore = defineStore('useStore', () => {
  const user = ref<string | null>(null);
  const sidebarOpen = ref(false);
  const userRole = ref<UserRole>(
    (localStorage.getItem('userRole') as UserRole) || 'admin',
  );
  const timezone = ref<string>(
    localStorage.getItem('timezone') || 'America/Sao_Paulo',
  );

  const savedTheme = localStorage.getItem('theme') || 'light';
  const theme = ref<string>(savedTheme);

  const isAdmin = computed(() => userRole.value === 'admin');

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  }

  function setTheme(newTheme: string) {
    theme.value = newTheme;
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  }

  watch(theme, applyTheme, { immediate: true });

  function setTimezone(tz: string) {
    timezone.value = tz;
    localStorage.setItem('timezone', tz);
  }

  function setUserRole(role: UserRole) {
    userRole.value = role;
    localStorage.setItem('userRole', role);
  }

  function setUser(newUser: string | null) {
    localStorage.setItem(
      'user',
      JSON.stringify({ newUser, requiresAuth: true }),
    );
    user.value = newUser;
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function closeSidebar() {
    sidebarOpen.value = false;
  }

  function logout() {
    localStorage.removeItem('user');
    user.value = null;
  }

  return {
    user,
    theme,
    userRole,
    timezone,
    isAdmin,
    sidebarOpen,
    setUser,
    logout,
    toggleTheme,
    setTheme,
    setTimezone,
    setUserRole,
    toggleSidebar,
    closeSidebar,
  };
});
