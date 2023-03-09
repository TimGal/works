<template lang="pug">
.main
  .content
    h1.event__title {{ testTitle }}
    // - сделать карточку
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
.main {
  width: 100%;
  padding: 64px;
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
  font-size: 48px;
  color: black;
  text-align: center;
  margin-bottom: 24px;
}

</style>
