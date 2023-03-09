<template lang="pug">
v-container
  breadcrumbs.mt-4(
    :items="breadcrumbs"
    large
  )
  v-row
    v-col(col='12')
      smart-table(
        v-model="selectedItems"
        :headers="headers"
        :adapter="adapter"
        :needToUpdateTable="needToUpdateTable"
        ref="tableComponent"
      )
        template(#search--municipality="{searchKeys, runSearch }")
          directory-mun-input(
            v-if="searchKeys.region_id"
            v-model="searchKeys.municipality_id"
            hide-details
            label="Муниципалитет"
            @change="runSearch"
            prepend-inner-icon="mdi-magnify"
            :return-object="false"
            :region="searchKeys.region_id"
          )
        // template(#value--municipality_id="{ item }") {{ item.municipality_name }}
        template(#value--user_ids="{ item }") {{ JSON.parse(item.user_ids).join(', ') }}
        template(#value--resolve="{ item }")
          router-link(:to='`/same-duplicate/${ JSON.parse(item.user_ids)[0]}`')
            v-btn Подробнее
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import DirectoryMunInput from '@/components/inputs/DirectoryMunInput.vue';
import DirectoryRegionInput from '@/components/inputs/DirectoryRegionInput.vue';

export default {
  name: 'AdminAllDuplicatePage',
  components: {
    SmartTable,
    DirectoryMunInput,
    DirectoryRegionInput,
  },
  data: () => ({
    needToUpdateTable: false,
    selectedItems: [],
    breadcrumbs: [
      {
        to: '/all-duplicates',
        text: 'Все дубликаты',
        disabled: false,
      },
    ],
  }),
  computed: {
    headers() {
      const headers = [
        {
          text: 'Кол-во дубликатов',
          value: 'duplicate',
          searchable: true,
          sortable: true,
        },
        {
          text: 'Фамилия',
          value: 'last_name',
          searchable: true,
        },
        {
          text: 'Имя',
          value: 'first_name',
          searchable: true,
        },
        {
          text: 'Отчество',
          value: 'middle_name',
          searchable: true,
        },
        {
          text: 'Муниципалитет',
          value: 'municipality_id',
          searchable: true,
        },
        {
          text: 'ID копий',
          value: 'user_ids',
        },
        {
          text: '',
          value: 'resolve',
        },
      ];

      return headers;
    },
  },
  methods: {
    async adapter({ _update, ...options }) {
      this.updateTable = _update;
      options['per-page'] = 20;
      this.needToUpdateTable = false;

      const params = {
        ...options,
      };
      const response = await adminService.getAllDuplicates(params);
      return response;
    },
  },
};
</script>

<style lang="sass" scoped>
.btn__delete
  background-color: #d2202f !important
  color: #fafafa
  &:hover
    background-color: rgb(248, 27, 27) !important
td
  font-size: 1rem !important
</style>
