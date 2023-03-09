<template lang="pug">
  .carousel(
  )
    flicking(
      :options="flickingOptions"
      :plugins="flickingPlugins"
      :gap="20"
    )
      .cards__group.flicking-panel.mr-6.mb-10(
          v-for="(card, index) in cardsData"
          :key="index"
        )
        component(
        :is="CARD_TYPE.component"
        :card="card"
        )
      .pagination(slot="viewport" class="flicking-pagination")
</template>

<script>
import '@egjs/flicking-plugins/dist/pagination.css';
import IconCard from '@/modules/Events/views/Event/EventLand/event-groups/IconCard.vue';
import InfoCard from '@/modules/Events/views/Event/EventLand/event-groups/InfoCard.vue';
import WinnerCard from '@/modules/Events/views/Event/EventLand/event-groups/WinnerCard.vue';
import { CARD_TYPES_COMPONENT } from '@/modules/Events/views/Event/EventLand/event-helpers/consants/constants';

export default {
  components: {
    IconCard,
    InfoCard,
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
    flickingPlugins: {
      type: Array,
      default: () => [],
      required: true,
    },
    flickingOptions: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
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
  },
  methods: {
    // - сделать карточку
  },
};
</script>
<style scoped lang="scss">
.carousel {
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
.add__info {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
}
.button__group {
  display: flex;
  flex-direction: row;
  column-gap: 16px;
}
.bttn {
  font-size: 24px !important;
  padding: 24px !important;
  color: rgba(255, 255, 255, 0.9) !important;
}
.hardbass {
  animation: color-change 1s infinite;
}
@keyframes color-change {
  0% { background-color: red }
  33% { background-color: green }
  66% {background-color: blue}
  100% { background-color: red }
}
.card {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
}
.cards__group {
  display: flex;
  flex-direction: row;
}
.cards__group > .card {
  width: 320px;
}
.adv_icon {
  width: 50px;
  height: 50px;
}
.card__title {
  font-size: 24px;
}
.card__text {
  font-size: 18px;
  text-indent: 16px;
}
.card__info {
  min-height: 160px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  row-gap: 0.5rem;
  padding: 1rem;
}
</style>
