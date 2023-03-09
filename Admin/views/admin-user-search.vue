<template lang="pug">
  v-container
    h3 Поиск по пользователям
    v-row
      v-col(cols='4')
        v-select(
          :items="items"
          v-model="selectedValue"
          label="Выберите тип искомого пользователя")
    component(
      :is="itemData[selectedValue].component"
      v-if="selectedValue"
    )
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import OrganizationSearch from '@/modules/Admin/components/user-search-types/OrganizationSearch.vue';
import MemberSearch from '@/modules/Admin/components/user-search-types/MemberSearch.vue';

export default {
  name: 'AdminUserSearch',
  components: {
    SmartTable,
    MemberSearch,
  },
  data: () => ({
    items: ['Организация', 'Участник мероприятия', 'Тренер', 'Эксперт'],
    itemsRegion: [1, 2, 3, 4],
    selectedValue: '',
    needToUpdateTable: false,
  }),
  computed: {
    itemData() {
      return {
        Организация: {
          component: OrganizationSearch,
        },
        'Участник мероприятия': {
          component: MemberSearch,
        },
      };
    },
  },
};
</script>
