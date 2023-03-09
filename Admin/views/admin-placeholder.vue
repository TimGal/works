<template lang="pug">
<!-- eslint-disable -->
v-container
  v-row
    v-col(cols='2')
      img.cat-img(src="https://nok.pfdo.ru/img/cat3.4425c19f.svg" )
    v-col(cols='10')
      h1.text-h4 Админочка
      ul.ma-4.text-h6 Выберите вкладку слева для:
        li.text-h6 Логина под пользователем (для этого надо ввести его логин)
        li.text-h6 Поиск пользователя (в том числе по ролям: по организациям,по участникам мероприятия, тренеров, экспертов.)
        li.text-h6 Восстановление login/password
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminPage',
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>

<style lang="sass">
.v-main__wrap
  padding: 32px 0 0
</style>
