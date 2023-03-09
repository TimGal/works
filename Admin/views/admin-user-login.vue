<template lang="pug">
  v-container
    v-row
      v-col(
        cols='6'
      )
        v-text-field(
          label="Введите login пользователя"
          v-model="username"
          outlined
          dense
          hide-details
        )
    v-row
        v-btn(
          x-large
          @click="loginAsUser"
        ) Войти в аккаунт
</template>

<script>
import adminService from '@/services/API/admin/user-search.js';
import JWTService from '@/services/JWTService';
import { mapActions } from 'vuex';

export default {
  name: 'AdminLoginUser',
  components: {
    adminService,
  },
  data: () => ({
    username: '',
  }),
  methods: {
    ...mapActions({
      init: 'auth/init',
    }),
    loginAsUser() {
      if (this.username) {
        const params = {
          username: this.username,
        };
        this.$rHandler(
          adminService.loginAsUser(params),
          (response) => {
            JWTService.setToken(response.data.data.access_token);
            JWTService.setRefreshToken(response.data.data.refresh_token);
            this.init().then(() => {
              this.$router.push('/');
            });
          },
        );
      } else {
        this.$toast.error(`Вы не ввели логин пользователя`);
      }
    },
  },
};
</script>
