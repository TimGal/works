<template lang="pug">
.cards__group
  template(
      v-for="(card, index) in cardsData"
    )
    component(
      :key="index"
      :is="CARD_TYPE.component"
      :card="card"
    )
  v-btn(@click="cardsData.push({title: 'Введите Заголовок', text: 'Введите описание карточки', img_src: ''})") push
</template>

<script>

import IconCard from '@/modules/Events/views/Event/EventLand/event-groups/IconCard.vue';
import InfoCard from '@/modules/Events/views/Event/EventLand/event-groups/InfoCard.vue';
import WinnerCard from '@/modules/Events/views/Event/EventLand/event-groups/WinnerCard.vue';
import { CARD_TYPES_COMPONENT } from '@/modules/Events/views/Event/EventLand/event-helpers/consants/constants';

// TODO: custom colors
// const colors = ['f15152', 'edb183', '631d76', '9e4770', '31572c', 'fcd581'];
// :style="{backgroundColor: '#' + colors[index]}"
export default {
  components: {
    InfoCard,
    IconCard,
    WinnerCard,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    cardsData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      // colors,
      isUser: this.options,
      // testCardsData: CardsData,
      // - добавить данные
    };
  },
  computed: {
    CARD_TYPE() {
      return {
        component: CARD_TYPES_COMPONENT[this.options.cardType],
      };
    },
    // - сделать карточку
  },
  methods: {
    // - сделать карточку
  },
};
</script>
<style scoped lang="scss">
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
.cards__group > .card {
  width: calc((100% - 32px * 3) / 4);
}
</style>
