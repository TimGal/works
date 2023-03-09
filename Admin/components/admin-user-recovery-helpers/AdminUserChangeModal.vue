<template lang="pug">
v-row(justify="center")
  v-dialog(
    v-model="isAdminModalShown"
    max-width="600px"
  )
    v-card
      v-card-title
        span(class="text-h5") User Profile
      v-card-text
        v-container
          v-row
            v-col(
              cols="12"
              sm="6"
              md="4"
            )
              v-text-field(
                label="Логин"
                :value="updatedData.username"
              )
            v-col(
              cols="12"
              sm="6"
              md="4"
            )
              v-text-field(
                label="E-mail"
                :value="updatedData.email"
                required
              )
            v-col(
              cols="12"
              sm="6"
              md="4"
            )
              v-text-field(
                label="Пароль"
                :value="updatedData.password"
                required
              )
            v-col(
              cols="12"
              sm="6"
              md="4"
            )
              v-text-field(
                label="Подтверждение пароля"
                :value="updatedData.password_confirmation"
                required
              )
            v-col(
              cols="6")
              v-select(
                label="Регион"
                :value="updatedData.region_id"
                :items="allRegions"
                item-text="name"
                item-value="id"
                prepend-inner-icon="mdi-magnify"
                hide-details
                required,
              )
            v-col(cols="6")
              v-select(
                label="Муниципалитет"
                :value="updatedData.municipality_id"
                :items="[1,2,3,4]"
                required
              )
            //- End of common inputs
            //- Certificate
            v-col(
              cols="4"
              sm="4"
              v-if="userRole == 'certificate'"
              )
              v-text-field(
                label="ФИО"
                :value="updatedData.fio"
                required
              )
            v-col(
              cols="4"
              sm="4"
              v-if="userRole == 'certificate'"
            )
              v-text-field(
                label="Номер сертификата"
                :value="updatedData.certificate_number"
                required
              )
            v-col(
              cols="4"
              sm="4"
              v-if="userRole == 'certificate'"
            )
              v-text-field(
                label="Дата рождения"
                :value="updatedData.birthday_at"
                required
              )
            //- Organization
            v-col(
              cols="12"
              sm="12"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="ИНН"
                :value="updatedData.inn"
                required
              )
            v-col(
              cols="12"
              sm="12"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="Краткое наименование"
                :value="updatedData.short_name"
                required
              )
            v-col(
              cols="12"
              sm="12"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="Полное наименование"
                :value="updatedData.full_name"
                required
              )
            v-col(
              cols="6"
              sm="6"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="Фио директора"
                :value="updatedData.contact_full_name"
                required
              )
            v-col(
              cols="6"
              sm="6"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="Телефон ответственного лица"
                :value="updatedData.contact_phone"
                required
              )
            v-col(
              cols="12"
              sm="12"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="Фактический адрес"
                :value="updatedData.fact_address"
                required
              )
            v-col(
              cols="12"
              sm="12"
              v-if="userRole == 'organization'"
            )
              v-text-field(
                label="Юридический адрес"
                :value="updatedData.legal_address"
                required
              )
      v-card-actions
        v-spacer
        v-btn(
          color="blue darken-1"
          text
          @click="isAdminModalShown = false"
        ) Закрыть
        v-btn(
          color="blue darken-1"
          text
          @click="submitChangeUserData"
        ) Изменить
</template>

<script>
import mixinRegion from '@/mixins/mixinRegion';
import adminService from '@/services/API/admin/user-search.js';

// Работает в паре с AdminUserChangeModalButton
export default {
  name: 'AdminUserChangeModal',
  mixins: [mixinRegion],
  props: {
    userData: {
      default: () => {},
      type: Object,
    },
    userRole: {
      default: () => {},
      type: String,
    },
  },
  data: () => ({
    isAdminModalShown: false,
    updatedData: {},
  }),
  watch: {
    userData(value) {
      if (Object.keys(value).length !== 0) {
        this.isAdminModalShown = true;
        this.updatedData = value;
      }
    },
  },
  methods: {
    submitChangeUserData() {
      const params = {
        email: this.updatedData.email,
        region_id: this.updatedData.region_id,
        municipality_id: this.updatedData.municipality_id,
        birthday_at: this.updatedData.birthday_at,
      };
      const logParams = {
        username: this.updatedData.username,
        password: this.updatedData.password,
        password_confirmation: this.updatedData.password_confirmation,
      };
      adminService.putUserData(this.updatedData.id, params);
      adminService.putUserLogPass(this.updatedData.id, logParams);
      this.isAdminModalShown = false;
    },
  },
};
</script>
