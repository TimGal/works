<template lang="pug">
  v-container
    v-row
      v-col(col="4")
        v-text-field(
              label="ФИО участника"
              v-model="searchPropsValue.member_fio"
            )
    v-row
      v-col(col="4")
        v-btn(
          @click="SmartTableRunSearch()"
        ) Искать в таблице
    v-row
      v-col(col='12')
        smart-table(
        v-model="selectedItems"
        :headers="headers"
        :adapter="adapter"
        :needToUpdateTable="needToUpdateTable"
        show-select
        ref="tableComponent"
        )
          template(#search--region_id="{searchKeys, runSearch }")
            v-select(
              v-model="searchKeys.region_id"
              label="Регион"
              @change="runSearch"
              prepend-inner-icon="mdi-magnify"
              hide-details
              :items="allRegions"
              item-text="name"
              item-value="id"
            )
          template(#search--id="{searchKeys, runSearch }")
            v-text-field(
              v-model="searchKeys.id"
              label="ID"
              @input="runSearch"
              prepend-inner-icon="mdi-magnify"
              hide-details
            )
          template(#value--region_id="{ item }")
            span {{ getRegionName(item.region_id) }}
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import mixinRegion from '@/mixins/mixinRegion';

export default {
  name: 'MemberSearch',
  components: {
    SmartTable,
  },
  mixins: [mixinRegion],
  data: () => ({
    itemsRegion: [],
    selectedItems: [],
    needToUpdateTable: false,
    searchPropsValue: {
      member_fio: '',
    },
  }),
  computed: {
    headers() {
      const headers = [
        {
          text: '',
          value: 'view',
          sortable: false,
        },
        {
          text: 'ID',
          value: 'id',
          sortable: false,
          searchable: true,
        },
        {
          text: 'Логин',
          value: 'username',
          sortable: false,
          searchable: true,
        },
        {
          text: 'E-mail',
          value: 'email',
          searchable: true,
        },
        {
          text: 'Регион',
          value: 'region_id',
          sortable: false,
          searchable: true,
        },
        {
          text: 'Муниципалитет',
          value: 'municipality_id',
          sortable: false,
          searchable: true,
        },
        {
          text: 'ФИО',
          value: 'fio',
          sortable: false,
          searchable: true,
        },
        {
          text: 'Номер сертификата',
          value: 'certificate_number',
          sortable: false,
          searchable: true,
        },
        {
          text: 'Дата рождения',
          value: 'action',
          sortable: false,
          searchable: true,
        },
        {
          text: 'Класс',
          value: 'action',
          sortable: false,
          searchable: true,
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
        'search[member_fio]': this.searchPropsValue.member_fio,
        ...options,
      };
      const response = adminService.getMemberUsers(params);
      return response;
    },
    SmartTableRunSearch() {
      this.$refs.tableComponent.updateTable();
      // eslint-disable-next-line
    },
  },
};
</script>
