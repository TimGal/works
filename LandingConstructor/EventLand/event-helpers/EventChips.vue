<template lang="pug">
.nomination-chips
  //- v-skeleton-loader(
  //-   v-if="isLoadingNominations"
  //-   type="chip"
  //- )
  v-row
    v-col(
      cols=12
    )
      v-chip-group(
        column
        mandatory
      )
        v-chip(
          v-for="(nomination, idx) in testNoms"
          :key="idx"
          :value="nomination.id"
          active-class="accent"
        ) {{ nomination.name }}
</template>

<script>

export default {
  components: {
  },
  // props: {
  //   data: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      testTitle: 'Давай уже, чего ты ждёшь!',
      testNoms: [
        {
          id: 1,
          name: 'Аэрокосмические технологии',
        },
        {
          id: 2,
          name: 'Информационные технологии',
        },
        {
          id: 3,
          name: 'Робототехника',
        },
        {
          id: 4,
          name: 'Технологии проектирования',
        },
        {
          id: 5,
          name: 'Технологические технологии',
        },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.nomination-chips {
  margin-bottom: 24px;
}
</style>
