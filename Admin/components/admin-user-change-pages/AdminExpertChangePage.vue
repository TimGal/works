<template lang="pug">
v-container
  admin-user-change-confirm(
    :isConfirmShown="isConfirmChangeShown"
    :isChangeAllowed="isChangeAllowed"
    :changesMessage="changesMessage"
    changingRole="expert"
    @confirmChanges="checkConfirmation"
    @closeDialog="updateConfirmDialogStatus"
  )
  h1.text-h4.admin__changes__header Изменение эксперта с id: {{ this.$route.params.id }}
  v-form(
    ref="form"
    v-model="valid"
    lazy-validation
  )
    v-row
      v-col(
        cols="6"
      )
        ev-text-field(
          label="Логин"
          v-model.trim="updatedUserData.username"
          :rules="[$rules.required, $rules.username]"
          outlined
          dense
          hide-details
          tooltip
        )
          template(#tooltip)
            span Должно быть уникальным. Наличие пробелов не допускается.
    v-row
      v-col(
        cols="6"
      )
        ev-text-field(
          label="E-mail"
          v-model="updatedUserData.email"
          :rules="[$rules.email]"
          outlined
          dense
          hide-details
          tooltip
        )
          template(#tooltip)
            span Укажите действующий адрес электронной почты
    v-row
      v-col(
        cols="6"
      )
        directory-region-input(
          v-model="updatedUserData.region_id"
          label="Регион"
          prepend-inner-icon="mdi-magnify"
          hide-details
          :return-object="false"
          tooltip
        )
          template(#tooltip)
            span Поле региона не может быть пустым
    v-row
      v-col(
        cols="6"
      )
        directory-mun-input.v-text-field__slot(
          v-if="updatedUserData.region_id"
          v-model="updatedUserData.municipality_id"
          hide-details
          label="Муниципалитет"
          prepend-inner-icon="mdi-magnify"
          :return-object="false"
          :region="updatedUserData.region_id"
          tooltip
        )
          template(#tooltip)
            span Поле муниципалитета не может быть пустым
    v-row
      v-col(
        cols="6"
        )
        ev-text-field(
          label="Имя"
          v-model="updatedUserData.first_name"
          :rules="[$rules.required]"
          dense
          hide-details
          outlined
          tooltip
        )
          template(#tooltip)
              span Поле имени не может быть пустым
    v-row
      v-col(
        cols="6"
        )
        ev-text-field(
          label="Фамилия"
          v-model="updatedUserData.last_name"
          :rules="[$rules.required]"
          outlined
          dense
          hide-details
          tooltip
        )
          template(#tooltip)
            span Поле фамилии не может быть пустым
    v-row
      v-col(
        cols="6"
        )
        ev-text-field.mb-4(
          label="Отчество"
          v-model="updatedUserData.middle_name"
          :rules="[$rules.required]"
          outlined
          dense
          hide-details
          tooltip
        )
          template(#tooltip)
            span Поле отчества не может быть пустым
    v-row.btn__container
      v-btn.change__button.text-lg-h6(
        @click="showConfirmDialog"
        x-large
      ) Изменить
      router-link(:to='`/user-recovery/`')
        v-btn.text-lg-h6(
          x-large
        ) Назад
      router-link(:to='`/same-duplicate/${ this.$route.params.id }`')
        v-btn.text-lg-h6.ml-4(
          x-large
        ) Поиск дубликатов пользователя
</template>

<script>
import adminService from '@/services/API/admin/user-search.js';
import DirectoryMunInput from '@/components/inputs/DirectoryMunInput.vue';
import DirectoryRegionInput from '@/components/inputs/DirectoryRegionInput.vue';
import AdminUserChangeConfirm from '@/modules/Admin/components/admin-user-recovery-helpers/AdminUserChangeConfirm.vue';

export default {
  name: 'AdminExpertChangePage',
  components: {
    DirectoryMunInput,
    DirectoryRegionInput,
    AdminUserChangeConfirm,
  },
  data: () => ({
    oldUserDataValues: {
      username: '',
      email: '',
      region_id: null,
      municipality_id: null,
      first_name: '',
      middle_name: '',
      last_name: '',
    },
    updatedUserData: {
      username: '',
      email: '',
      region_id: null,
      municipality_id: null,
      first_name: '',
      middle_name: '',
      last_name: '',
    },
    isConfirmChangeShown: false,
    isChangeAllowed: false,
    changesMessage: [],
    changesKeys: [],
    valid: false,
  }),
  created() {
    this.loadSelectedUser();
  },
  methods: {
    loadSelectedUser() {
      const params = {
        'search[id]': this.$route.params.id,
      };
      this.$rHandler(adminService.getExpertUsers(params),
        (response) => {
          [response] = response.data.data;
          this.updatedUserData = response;
          this.oldUserDataValues = { ...this.updatedUserData };
        });
    },
    submitChangeUserData() {
      if (this.$refs.form.validate()) {
        if (this.isChangeAllowed !== false) {
          const params = {};
          const keys = this.changesKeys;
          for (let i = 0; i < keys.length; i++) {
            params[keys[i]] = this.updatedUserData[keys[i]];
          }
          this.$rHandler(adminService.putExpertData(this.updatedUserData.id, params),
            () => { this.$toast.success('Изменения в полях эксперта успешно приняты!'); });
          this.isChangeAllowed = false;
          this.isConfirmChangeShown = false;
        } else {
          this.$toast.error('Вы не подтвердили изменения');
        }
      }
    },
    showConfirmDialog() {
      this.makeTextAboutChanges();
      if (this.changesMessage.length > 0) {
        this.isConfirmChangeShown = true;
      } else {
        this.$toast.error('Вы ничего не изменили!');
      }
    },
    checkConfirmation(value) {
      this.isConfirmChangeShown = value.dialog;
      this.isChangeAllowed = value.changeAllowed;
      this.submitChangeUserData();
    },
    updateConfirmDialogStatus(value) {
      this.isConfirmChangeShown = value.dialog;
    },
    checkUserDataChanges() {
      const oldVal = [];
      const newVal = [];
      const changedKeys = [];
      const newKeys = Object.keys(this.updatedUserData);
      for (let i = 0; i < newKeys.length; i++) {
        if (this.oldUserDataValues[newKeys[i]] !== this.updatedUserData[newKeys[i]]) {
          changedKeys.push(newKeys[i]);
          oldVal.push(this.oldUserDataValues[newKeys[i]]);
          newVal.push(this.updatedUserData[newKeys[i]]);
        }
      }
      this.changesKeys = changedKeys;
      const result = {
        keys: changedKeys,
        oldValues: oldVal,
        newValues: newVal,
      };
      return result;
    },
    makeTextAboutChanges() {
      const changesResult = this.checkUserDataChanges();
      const Message = [];
      for (let i = 0; i < changesResult.keys.length; i++) {
        if (changesResult.oldValues[i]) {
          Message.push(`Поле <b>${changesResult.keys[i]}</b> изменилось с 
          <b>${changesResult.oldValues[i]}</b> на <b>${changesResult.newValues[i]}</b>`);
        } else {
          Message.push(`Поле <b>${changesResult.keys[i]}</b> задано новым значением <b>${changesResult.newValues[i]}</b>`);
        }
      }
      this.changesMessage = Message;
    },
  },
};
</script>

<style lang="sass">
.change__button
  background-color: #cf0d7e !important
  color: #fafafa !important
  margin-right: 16px
  &:hover
    background-color: #dd4492 !important
.btn__container
  margin-bottom: 25px
  padding-left: 12px
.v-main__wrap
  padding: 32px 16px 0
.admin__changes__header
  margin-bottom: 16px
</style>
