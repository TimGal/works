<template lang="pug">
  section.reverse__grid
    .content
      h2.event__title {{ title }}
      div.reverse__card
        figure(v-for="item in testStepperData")
          img(:src="item.img_src" width=160 height=160)
          div.reverse__card-text
            h3.mb-2 {{ item.title }}
            h4 {{ item.text }}
</template>

<script>
import { testStepperData } from './event-test-data/stepper';

export default {
  name: 'EventReverseGrid',
  components: {
  },
  props: {
    title: {
      type: String,
      default: () => '',
      required: true,
    },
  },
  data() {
    return {
      testStepperData,
    };
  },
  computed: {

  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.reverse__card {
  display: grid;
  row-gap: 6rem;
  column-gap: 6rem;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
}
.reverse__card-text {
  color: #FFF8EE;
  //padding: 0 6rem;
  max-width: 40%;
}
figure {
  background-color: transparent;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 6rem;
  &:nth-of-type(even) {
    flex-direction: row-reverse;
  }
}
.image-wrapper {
  position: relative;
  text-align: center;
}
.reverse__grid {
  background-attachment: fixed;
  background: radial-gradient(circle, rgba(0,0,0,0.1) 10%, transparent 11%);
  background-size: 2em 2em;
  background-color: #ffffff;
  height: 100%;
  background-attachment: fixed;
}
.content {
  opacity: 1;
  position: relative;
  margin: auto;
}
.event__title {
  color: #FFF8EE;
}
</style>
