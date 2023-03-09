<template lang="pug">
  v-container
    admin-user-delete-confirm(
      :isDeleteShown="isConfirmDeleteShown"
      :isDeleteAllowed="isDeleteAllowed"
      :userIdToDelete="userIdToDelete"
      @confirmDeleting="checkConfirmation"
      @closeDialog="updateConfirmDialogStatus"
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
          template(#value--public="{ item }")
            v-btn(
              :to='`/public/trainer/${item.id}`'
              icon
              small
              color="primary"
              :ripple="false"
              target="_blank"
            )
              v-icon mdi-eye
          template(#value--delete="{ item }")
            v-btn.btn__delete(
              @click="showConfirmDialog(item.id)"
            ) Удалить
          template(#search--region="{searchKeys, runSearch }")
            directory-region-input(
              v-model="searchKeys.region_id"
              label="Регион"
              @change="runSearch"
              prepend-inner-icon="mdi-magnify"
              hide-details
              :return-object="false"
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
          template(#value--change="{ item }")
            router-link(:to='`/trainer-recovery/${item.id}`')
              v-btn Изменить
          template(#value--region="{ item }") {{ item.region_name }}
          template(#value--municipality="{ item }") {{ item.municipality_name }}
          template(#value--member_fio="{ item }")
            span {{ item.fio }}
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import AdminUserChangeModal from '@/modules/Admin/components/admin-user-recovery-helpers/AdminUserChangeModal.vue';
import AdminUserChangeModalButton from '@/modules/Admin/components/admin-user-recovery-helpers/AdminUserChangeModalButton.vue';
import DirectoryMunInput from '@/components/inputs/DirectoryMunInput.vue';
import DirectoryRegionInput from '@/components/inputs/DirectoryRegionInput.vue';
import AdminUserDeleteConfirm from '@/modules/Admin/components/admin-user-recovery-helpers/AdminUserDeleteConfirm.vue';

export default {
  name: 'TrainerSearch',
  components: {
    SmartTable,
    AdminUserChangeModal,
    AdminUserChangeModalButton,
    DirectoryMunInput,
    DirectoryRegionInput,
    AdminUserDeleteConfirm,
  },
  data: () => ({
    itemsRegion: [],
    selectedItems: [],
    needToUpdateTable: false,
    targetedUserData: {},
    isConfirmDeleteShown: false,
    isDeleteAllowed: false,
    userIdToDelete: null,
  }),
  computed: {
    headers() {
      const headers = [
        {
          text: 'Публичная страница',
          value: 'public',
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
          value: 'region',
          searchable: true,
        },
        {
          text: 'Муниципалитет',
          value: 'municipality',
          searchable: true,
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
          text: '',
          value: 'change',
        },
        {
          text: '',
          value: 'delete',
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

      const response = adminService.getTrainerUsers(params);
      return response;
    },
    SmartTableRunSearch() {
      this.$refs.tableComponent.updateTable();
    },
    changeUserData(userData) {
      this.targetedUserData = userData;
    },
    // showItem(item) {
    //   this.$router.push(`/user-recovery/:${item.id}`);
    // },
    submitDeleteUserProfile(id) {
      if (this.isDeleteAllowed !== false) {
        this.$rHandler(adminService.deleteTrainerProfile(id),
          (response) => { this.$toast.success(response); },
          (error) => { this.$toast.error(error); });
        this.isDeleteAllowed = false;
        this.isConfirmDeleteShown = false;
        this.SmartTableRunSearch();
      } else {
        this.$toast.error(`Вы не подтвердили удаление пользователя с id: ${id}`);
      }
    },
    showConfirmDialog(id) {
      this.isConfirmDeleteShown = true;
      this.userIdToDelete = id;
    },
    checkConfirmation(value) {
      this.isConfirmDeleteShown = value.dialog;
      this.isDeleteAllowed = value.changeAllowed;
      this.submitDeleteUserProfile(this.userIdToDelete);
    },
    updateConfirmDialogStatus(value) {
      this.isConfirmDeleteShown = value.dialog;
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
