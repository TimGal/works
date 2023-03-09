<template lang="pug">
v-container
  breadcrumbs.mt-4(
    :items="breadcrumbs"
    large
  )
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
        ref="DuplicateTableComponent"
      )
        template(#value--delete="{ item }")
          v-btn.btn__delete(
            @click="showConfirmDialog(item.id)"
            :disabled="item.dispatcher_id != null"
          ) Удалить
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
        template(#value--region_id="{ item }") {{ item.region_name }}
        template(#value--municipality_id="{ item }") {{ item.municipality_name }}
        template(#value--roles="{ item }") {{ item.roles.map(((role) => role.name)).join(', ') }}
</template>

<script>
import SmartTable from '@/components/SmartTable/index.vue';
import adminService from '@/services/API/admin/user-search.js';
import userService from '@/services/API/user/index';
import DirectoryMunInput from '@/components/inputs/DirectoryMunInput.vue';
import DirectoryRegionInput from '@/components/inputs/DirectoryRegionInput.vue';
import AdminUserDeleteConfirm from '@/modules/Admin/components/admin-user-recovery-helpers/AdminUserDeleteConfirm.vue';

export default {
  name: 'AdminSameDublicatePage',
  components: {
    SmartTable,
    DirectoryMunInput,
    DirectoryRegionInput,
    AdminUserDeleteConfirm,
  },
  data: () => ({
    selectedItems: [],
    needToUpdateTable: false,
    isConfirmDeleteShown: false,
    isDeleteAllowed: false,
    userIdToDelete: null,
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
          text: 'ID',
          value: 'id',
          searchable: true,
        },
        {
          text: 'Логин',
          value: 'username',
          searchable: true,
        },
        {
          text: 'Роль',
          value: 'roles',
        },
        {
          text: 'E-mail',
          value: 'email',
          searchable: true,
        },
        {
          text: 'Регион',
          value: 'region_id',
          searchable: true,
        },
        {
          text: 'Муниципалитет',
          value: 'municipality_id',
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
          text: 'Номер сертификата',
          value: 'certificate_number',
          searchable: true,
        },
        {
          text: 'Дата рождения',
          value: 'birthday_at',
          searchable: true,
        },
        {
          text: 'Номер телефона',
          value: 'phone',
          searchable: true,
        },
        {
          text: 'Общий рейтинг',
          value: 'rating',
          searchable: true,
        },
        {
          text: 'Рейтинг за год',
          value: 'year_rating',
          searchable: true,
        },
        {
          text: 'Рейтинг за месяц',
          value: 'month_rating',
          searchable: true,
        },
        {
          text: '',
          value: 'delete',
        },
      ];

      return headers;
    },
  },
  created() {
    this.breadcrumbs.push({
      to: `/same-duplicate/${this.$route.params.id}`,
      text: 'Дубликаты пользователя',
      disabled: false,
    });
  },
  methods: {
    async adapter({ ...options }) {
      options['per-page'] = 20;
      this.needToUpdateTable = false;

      const params = {
        ...options,
      };

      const duplicateResponse = await adminService.getSameDuplicates(this.$route.params.id, params);
      const idsArray = duplicateResponse.data.data.map(({ id }) => id).join(',');
      const ratingResponse = await userService.getRatings({ 'search[user_id]': idsArray });
      const result = duplicateResponse.data.data.map((duplicate) => {
        const ratingIndex = ratingResponse.data.data.findIndex((item) => duplicate.id === item.user_id);
        if (ratingIndex !== -1) {
          duplicate.rating = ratingResponse.data.data[ratingIndex].rating;
          duplicate.year_rating = ratingResponse.data.data[ratingIndex].year_rating;
          duplicate.month_rating = ratingResponse.data.data[ratingIndex].month_rating;
        }
        return duplicate;
      });
      return new Promise((resolve) => resolve({
        headers: duplicateResponse.headers,
        data: {
          data: result,
        },
      }));
    },
    SmartTableRunSearch() {
      this.$refs.DuplicateTableComponent.updateTable();
    },
    submitDeleteUserProfile(id) {
      if (this.isDeleteAllowed !== false) {
        this.$rHandler(adminService.deleteUserProfile(id),
          (response) => { this.$toast.success(response); },
          (error) => { this.$toast.error(error); });
        this.isDeleteAllowed = false;
        this.isConfirmDeleteShown = false;
        this.SmartTableRunSearch();
        this.$toast.success(`Пользователь с id: ${id} успешно удалён!`);
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
