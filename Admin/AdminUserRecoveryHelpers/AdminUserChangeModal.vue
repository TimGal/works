<template lang="pug">
v-row(justify="center")
  v-dialog(
    v-model="dialog"
    max-width="600px")
    template(
      v-slot:activator="{ on, attrs }")
      v-btn(
        color="primary"
        dark
        v-bind="attrs"
        v-on="on") Изменить
    v-card
      v-card-title
        span(class="text-h5") User Profile
      v-card-text
        v-container
          v-row
            v-col(
              cols="12"
              sm="6"
              md="4")
              v-text-field(
                label="Legal first name*"
                required)
            v-col(
              cols="12"
              sm="6"
              md="4")
              v-text-field(
                label="Legal middle name")
            v-col(
              cols="12"
              sm="6"
              md="4")
              v-text-field(
                label="Legal last name*"
                persistent-hint
                required)
            v-col(
              cols="12")
              v-text-field(
                label="Email*"
                required
              )
            v-col(cols="12")
              v-text-field(label="Password*"
                type="password"
                required)
            v-col(
              cols="12"
              sm="6")
              v-select(
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required)
            v-col(
              cols="12"
              sm="6")
              v-autocomplete(
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple)
      v-card-actions
        v-spacer
        v-btn(
          color="blue darken-1"
          text
          @click="dialog = false") Close
        v-btn(
          color="blue darken-1"
          text
          @click="dialog = false") Save
</template>

<script>

export default {
  name: 'AdminUserChangeModal',
  data: () => ({
    dialog: false,
  }),
};
</script>
