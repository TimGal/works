<template lang="pug">
  section.experts
    .content
      h2.event__title {{ testTitle }}
      flicking.main__slider(
        :options="flickingOptions"
        :plugins="plugins"
      )
    .img-wrapper(
      v-for="(item, idx) in testImages"
      :key="idx"
    )
      v-img(
      lazy-src=""
        height="100%"
        width="100%"
        :src="item"
        position="center center"
      )
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
      // - добавить данные
    };
  },
  computed: {
    // - сделать карточку
  },
  methods: {
    // - сделать карточку
  },
};
</script>
<style scoped lang="scss">
.experts {
  background-color: #eee;
}
.content {
  // position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.event__title {
  color: black;
}

</style>
