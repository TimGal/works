<template lang="pug">
v-row(justify="center")
  v-dialog(
    v-model="dialog"
    max-width="600px"
    persistent
  )
    v-card
      v-card-title
        span(class="text-h5") Удалить пользователя?
      v-card-text
        v-container
          p {{ 'Вы уверены что хотите удалить пользователя c id: ' + this.idToDelete }}?
      v-card-actions
        v-spacer
        v-btn(
          color="darken-1"
          text
          @click="closeDeleteDialog"
        ) Закрыть
        v-btn.btn__delete(
          color="darken-1"
          text
          @click="confirmDeleting"
        ) Удалить
</template>

<script>

export default {
  name: 'AdminUserDeleteModal',
  props: {
    isDeleteShown: {
      default: false,
      type: Boolean,
    },
    isDeleteAllowed: {
      default: false,
      type: Boolean,
    },
    userIdToDelete: {
      default: null,
      type: Number,
    },
  },
  data: () => ({
    dialog: false,
    AllowChange: false,
    idToDelete: null,
  }),
  watch: {
    isDeleteShown() {
      this.dialog = this.isDeleteShown;
    },
    isDeleteAllowed() {
      this.AllowDelete = this.isDeleteAllowed;
    },
    userIdToDelete() {
      this.idToDelete = this.userIdToDelete;
    },
  },
  methods: {
    closeDeleteDialog() {
      this.dialog = false;
      this.$emit('closeDialog', {
        dialog: this.dialog,
      });
    },
    confirmDeleting() {
      this.AllowDelete = true;
      this.$emit('confirmDeleting', {
        dialog: this.dialog,
        deleteAllowed: this.AllowDelete,
      });
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss">
.btn__delete {
  background-color: #d2202f !important;
  &:hover {
    background-color: rgb(248, 27, 27) !important;
  }
  & > span.v-btn__content {
    color: #fff !important;
  }
}
</style>
