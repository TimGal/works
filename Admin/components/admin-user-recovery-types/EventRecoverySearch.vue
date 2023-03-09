<template lang="pug">
  v-container
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
          template(#value--change="{ item }")
            admin-user-change-modal(userData=item)
          template(#value--delete="{ item }")
            v-btn.btn__delete(
              @click="deleteUserProfile"
            ) Удалить
          template(#value--region_id="{ item }")
            span {{ getRegionName(item.region_id) }}
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import mixinRegion from '@/mixins/mixinRegion';
import AdminUserChangeModal from '@/modules/Admin/components/admin-user-recovery-helpers/AdminUserChangeModal.vue';

export default {
  name: 'MemberSearch',
  components: {
    SmartTable,
    AdminUserChangeModal,
  },
  mixins: [mixinRegion],
  data: () => ({
    itemsRegion: [1, 2, 3, 4],
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
          text: 'Пароль',
          value: 'password',
          sortable: false,
          searchable: false,
        },
        {
          text: 'E-mail',
          value: 'email',
        },
        {
          text: 'Регион',
          value: 'region_id',
          sortable: false,
        },
        {
          text: 'Муниципалитет',
          value: 'municipality_id',
          sortable: false,
        },
        {
          text: ' ФИО',
          value: 'fio',
          sortable: false,
          searchable: true,
        },
        {
          text: ' Номер сертификата',
          value: 'certificate_number',
          sortable: false,
          searchable: true,
        },
        {
          text: '',
          value: 'change',
          sortable: false,
          searchable: true,
        },
        {
          text: '',
          value: 'delete',
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
      this.setRegionIds();
      return response;
    },
    SmartTableRunSearch() {
      this.$refs.tableComponent.updateTable();
      // eslint-disable-next-line
    },
    setRegionIds() {
      this.itemsRegion = this.allRegions.map((el) => el.name);
    },
  },
};
</script>
