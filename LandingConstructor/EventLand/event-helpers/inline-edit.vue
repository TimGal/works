<template lang="pug">
  textarea.textarea__edit(
    ref="textarea"
    dense
    solo
    hide-spin-buttons
    hide-details
    auto-grow
    rows="1"
    autofocus
    v-if="edit"
    v-focus=""
    :value="valueLocal"
    @blur="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal);"
    @keyup.enter="valueLocal = $event.target.value; edit = true; $emit('input', valueLocal);")
  span(
    v-else
    @click="edit = true;"
  ) {{ valueLocal }}
</template>

<script>
export default {

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },

  props: ['value'],

  data() {
    return {
      edit: false,
      valueLocal: this.value,
    };
  },

  watch: {
    value() {
      this.valueLocal = this.value;
    },
  },

};
</script>
<style lang="sass">
.textarea__edit
  font-style: inherit
  font-size: inherit
  text-transform: inherit
</style>
