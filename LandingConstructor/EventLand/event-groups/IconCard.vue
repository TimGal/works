<template lang="pug">
  v-card(flat).card.pa-0
    .card__img-wrapper
      v-img.card__img(
        width="100%"
        height="240px"
        :src="currentCard.img_src"
      )
    .card__info.full-width
      h5
        inline-edit(v-model="card.title")
      p
        inline-edit(v-model="card.text")
      //- h5(
      //-   contenteditable
      //-   @input="changeH5"
      //- ) {{ currentCard.title }}
      //-   //- inline-edit(v-model="card.title")
      //- //h5 {{ currentCard.title }}
      //- p.card__text(
      //-   contenteditable
      //-   @input="changeText"
      //- ) {{ currentCard.text }}
      span {{ currentCard }}
</template>

<script>
import InlineEdit from '@/modules/Events/views/Event/EventLand/event-helpers/inline-edit.vue';

export default {
  name: 'InfoCard',
  components: { InlineEdit },
  props: {
    card: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      currentCard : { ...this.card },
    };
  },
  methods: {
    changeText(e) {
      this.currentCard.text = e.target.innerText;
    },
    changeTitle(e) {
      this.currentCard.title = e.target.innerText;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  //border: 1px solid teal;
  //outline: 5px solid #fff;
  //border-radius: 0.5rem !important;
}
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
.card {
  padding: 16px 32px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cards__group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  column-gap: 32px;
  row-gap: 32px;
  flex-wrap: wrap;
  text-align: justify;
}
.adv_icon {
  width: 50px;
  height: 50px;
}
.card__img {
  width: 128px;
  height: 128px;
  max-width: 128px;
  max-height: 128px;
  border-radius: calc(128px / 2) !important;
}
.card__title {
}
.card__text {
  font-size: 18px;
  //text-indent: 16px;
}
.card__img-wrapper {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__info {
  padding: 0 1rem 1rem;
  display: flex;
  row-gap: 16px;
  flex-direction: column;
}
</style>
