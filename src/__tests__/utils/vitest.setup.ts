import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { h } from 'vue';

vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon'],
    setup(props: { icon?: string }) {
      return () => h('span', { 'data-icon': props.icon });
    },
  },
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({
    path: '/',
    name: 'dashboard',
    params: {},
    query: {},
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));
