<template lang="pug">
  v-container
    h3 Восстановление логинов-паролей
    v-select(
      :items="items"
      v-model="selectedValue"
      label="Выберите тип искомого пользователя"
    )
    component(
      :is="itemData[selectedValue].component"
      v-if="selectedValue"
    )
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import MemberRecoverySearch from '@/modules/Admin/components/admin-user-recovery-types/MemberRecoverySearch.vue';
import OrganizationRecoverySearch from '@/modules/Admin/components/admin-user-recovery-types/OrganizationRecoverySearch.vue';
import ExpertRecoverySearch from '@/modules/Admin/components/admin-user-recovery-types/ExpertRecoverySearch.vue';
import TrainerRecoverySearch from '@/modules/Admin/components/admin-user-recovery-types/TrainerRecoverySearch.vue';

export default {
  name: 'AdminUserRecovery',
  components: {
    SmartTable,
    MemberRecoverySearch,
    OrganizationRecoverySearch,
  },
  data: () => ({
    items: ['Участник', 'Организация', 'Эксперт', 'Тренер'],
    itemsRegion: [1, 2, 3, 4],
    selectedValue: 'Участник',
    needToUpdateTable: false,
  }),
  computed: {
    itemData() {
      return {
        Организация: {
          component: OrganizationRecoverySearch,
        },
        Участник: {
          component: MemberRecoverySearch,
        },
        Эксперт: {
          component: ExpertRecoverySearch,
        },
        Тренер: {
          component: TrainerRecoverySearch,
        },
      };
    },
  },
  methods: {
    async adapter({ _update, ...options }) {
      this.updateTable = _update;
      options['per-page'] = 20;
      this.needToUpdateTable = false;
      const params = {
        'search[member_fio]': this.searchPropsValue.member_fio,
        ...options,
      };

      const response = adminService.getMemberUsers(params);
      return response;
    },
    SmartTableRunSearch() {
      this.$refs.tableComponent.updateTable();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn__delete {
  background-color: #eb0101;
}
.btn__change {
  background-color: #ebdb00;
}
</style>
