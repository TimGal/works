<template lang="pug">
  v-container
    v-row
      v-col(cols="4")
        v-card.pa-2(
          tile
          outlined)
          v-text-field(
                label="Краткое наименование"
                v-model="searchPropsValue.organization_short_name"
              )
      v-col(cols="4")
        v-card.pa-2(
        tile
        outlined)
          v-text-field(
                label="Полное наименование"
                v-model="searchPropsValue.organization_full_name"
              )
    v-row
      v-col(cols="4")
        v-btn(
          @click="SmartTableUpdate()"
        ) Искать в таблице
    v-row
      v-col(cols='12')
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
              :items='itemsRegion'
            )
          template(#value--view="{ item }")
            v-btn(
              @click="redirectToUser()"
            ) перейти на страницу
          template(#value--region_id="{ item }")
            span {{ getRegionName(item.region_id) }}
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import mixinRegion from '@/mixins/mixinRegion';

export default {
  name: 'OrganizationSearch',
  components: {
    SmartTable,
  },
  mixins: [mixinRegion],
  data: () => ({
    itemsRegion: [1, 2, 3, 4],
    selectedItems: [],
    needToUpdateTable: false,
    searchPropsValue: {
      organization_short_name: '',
      organization_full_name: '',
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
          text: ' ID',
          value: 'id',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Логин',
          value: 'username',
          sortable: false,
          searchable: true,
        },
        {
          text: ' E-mail',
          value: 'email',
          searchable: true,
        },
        {
          text: ' Регион',
          value: 'region_id',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Муниципалитет',
          value: 'municipality_id',
          sortable: false,
          searchable: true,
        },
        {
          text: ' ИНН',
          value: 'inn',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Краткое наименование',
          value: 'short_name',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Полное наименование',
          value: 'full_name',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Фио директора',
          value: 'contact_full_name',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Телефон ответственного лица',
          value: 'contact_phone',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Фактический адрес',
          value: 'fact_address',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Юридический адрес',
          value: 'legal_address',
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
        'search[organization_full_name]': this.searchPropsValue.organization_full_name,
        'search[organization_short_name]': this.searchPropsValue.organization_short_name,
        ...options,
      };
      this.setRegionIds();
      const response = adminService.getOrganizationUsers(params);
      return response;
    },
    SmartTableUpdate() {
      this.$refs.tableComponent.updateTable();
    },
    redirectToUser() {
      // eslint-disable-next-line
      alert('redirect');
    },
    setRegionIds() {
      this.itemsRegion = this.allRegions.map((el) => el.name);
    },
  },
};
</script>
