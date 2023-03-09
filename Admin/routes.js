import { ROLES } from '@/constants/roles';

export const userLogin = {
  path: '/user-login',
  name: 'user-login',
  component: () => import('@/modules/Admin/views/admin-user-login.vue'),
  meta: {
    title: 'Логин под пользователем',
    icon: 'mdi-exit-run',
    accessList: [ROLES.admin],
  },
};

export const userSearch = {
  path: '/user-search',
  name: 'user-search',
  component: () => import('@/modules/Admin/views/admin-user-search.vue'),
  meta: {
    title: 'Поиск пользователя',
    icon: 'mdi-account-search',
    accessList: [ROLES.admin],
  },
};

export const userRecovery = {
  path: '/user-recovery',
  name: 'user-recovery',
  component: () => import('@/modules/Admin/views/admin-user-recovery.vue'),
  meta: {
    title: 'Пользователи',
    icon: 'mdi-account',
    accessList: [ROLES.admin],
  },
};

export const memberChangePage = {
  path: '/member-recovery/:id',
  name: 'member-recovery-id',
  component: () => import('@/modules/Admin/components/admin-user-change-pages/AdminMemberChangePage.vue'),
  meta: {
    title: 'Изменение пользователя',
    accessList: [ROLES.admin],
  },
};

export const organizationChangePage = {
  path: '/organization-recovery/:id',
  name: 'organization-recovery-id',
  component: () => import('@/modules/Admin/components/admin-user-change-pages/AdminOrganizationChangePage.vue'),
  meta: {
    title: 'Изменение организации',
    accessList: [ROLES.admin],
  },
};

export const expertChangePage = {
  path: '/expert-recovery/:id',
  name: 'expert-recovery-id',
  component: () => import('@/modules/Admin/components/admin-user-change-pages/AdminExpertChangePage.vue'),
  meta: {
    title: 'Изменение эксперта',
    accessList: [ROLES.admin],
  },
};

export const trainerChangePage = {
  path: '/trainer-recovery/:id',
  name: 'trainer-recovery-id',
  component: () => import('@/modules/Admin/components/admin-user-change-pages/AdminTrainerChangePage.vue'),
  meta: {
    title: 'Изменение тренера',
    accessList: [ROLES.admin],
  },
};

export const allDuplicatePage = {
  path: '/all-duplicates',
  name: 'all-duplicates',
  component: () => import('@/modules/Admin/components/admin-user-duplicate/AdminAllDuplicatePage.vue'),
  meta: {
    title: 'Поиск дубликатов',
    accessList: [ROLES.admin],
    icon: 'mdi-account-search',
  },
};

export const sameDuplicatePage = {
  path: '/same-duplicate/:id',
  name: 'same-duplicate-id',
  component: () => import('@/modules/Admin/components/admin-user-duplicate/AdminSameDuplicatePage.vue'),
  meta: {
    title: 'Поиск дубликата',
    accessList: [ROLES.admin],
  },
};

const routes = [
  userLogin,
  userSearch,
  userRecovery,
  memberChangePage,
  organizationChangePage,
  expertChangePage,
  trainerChangePage,
  allDuplicatePage,
  sameDuplicatePage,
];

export default routes;
