<template lang="pug">
  v-btn(
    color="primary"
    dark
    @click="changeUserData"
  ) Изменить
</template>

<script>

// Работает в паре с AdminUserChangeModal

export default {
  name: 'AdminUserChangeModalButton',
  props: {
    currentUserData: {
      default: () => {},
      type: Object,
    },
  },
  data: () => ({
  }),
  methods: {
    changeUserData() {
      this.transferDataToModal();
    },
    transferDataToModal() {
      this.$emit('changeUserItem', this.currentUserData);
    },
  },
};
</script>
