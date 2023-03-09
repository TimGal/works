<template lang="pug">
v-row(justify="center")
  v-dialog(
    v-model="dialog"
    max-width="900px"
    persistent
  )
    v-card
      v-card-title
        span.text-h5 {{ `Изменить ${role_name[changingRole]}?` }}
      v-card-text
        v-container
          p.text-h6 Вы уверены что хотите применить следующие изменения?
          ul
            li.text-changes(
              v-for="message in changesMessage"
              :key="message"
              v-html="message"
            )
      v-card-actions
        v-spacer
        v-btn(
          color="blue darken-1"
          text
          @click="closeChangeDialog"
        ) Закрыть
        v-btn(
          color="blue darken-1"
          text
          @click="confirmChanges"
        ) Изменить
</template>

<script>

export default {
  name: 'AdminUserChangeConfirm',
  props: {
    isConfirmShown: {
      default: false,
      type: Boolean,
    },
    isChangeAllowed: {
      default: false,
      type: Boolean,
    },
    changesMessage: {
      default: () => '',
      type: Array,
    },
    changingRole: {
      default: '',
      type: String,
    },
  },
  data: () => ({
    dialog: false,
    AllowChange: false,
    role_name: {
      member: 'участника',
      organization: 'организацию',
      expert: 'эксперта',
      trainer: 'тренера',
    },
  }),
  watch: {
    isConfirmShown(value) {
      this.dialog = value;
    },
    isChangeAllowed(value) {
      this.AllowChange = value;
    },
  },
  methods: {
    closeChangeDialog() {
      this.dialog = false;
      this.$emit('closeDialog', {
        dialog: this.dialog,
      });
    },
    confirmChanges() {
      this.AllowChange = true;
      this.$emit('confirmChanges', {
        dialog: this.dialog,
        changeAllowed: this.AllowChange,
      });
      this.dialog = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.text-changes
  font-size: 16px !important
  line-height: 20px !important
  list-style: none
</style>
