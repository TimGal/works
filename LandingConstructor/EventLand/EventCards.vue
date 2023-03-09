<template lang="pug">
section.cards
  .content
    h2.event__title {{ title }}
    carousel-cards-group(
      v-if="options.markupType === '1'"
      :flicking-options="flickingOptions"
      :flicking-plugins="plugins"
      :cards-data="componentData"
      :options="options"
      )
    cards-group(
      v-else
      :cardsData="componentData"
      :options="options"
    )
</template>

<script>
import CardsGroup from '@/modules/Events/views/Event/EventLand/event-groups/CardsGroup.vue';
import { AutoPlay, Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';
import CarouselCardsGroup from '@/modules/Events/views/Event/EventLand/event-groups/CarouselCardsGroup.vue';

export default {
  name: 'EventCards',
  components: {
    CarouselCardsGroup,
    CardsGroup,
  },
  props: {
    title: {
      type: String,
      default: () => '',
      required: true,
    },
    options: {
      type: Object,
      default: () => {},
      required: false,
    },
    componentData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isRegisterLoaded: false,
      isRegister: false,
      isFollowLoaded: false,
      isFollow: false,
      imageSlider: false,
      images: [],
      flickingOptions: {
        margin: {
          prev: 200,
          next: 200,
        },
        horizontal: true,
        circular: true,
        panelsPerView: -1,
        align: 'center',
        easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2),
      },
      plugins: [new AutoPlay({
        duration: 2000,
        animationDuration: 6000,
        direction: 'NEXT',
        stopOnHover: false,
      }),
      new Pagination({
        type: 'bullet',
      })],
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.cards {
  background-color: #fff;
}
.content {
  padding: 0 32px;
  // position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.event__title {
  color: black;
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
  column-gap: 32px;
}
.adv_icon {
  width: 50px;
  height: 50px;
}
.card__title {
  font-size: 32px;
}
.card__text {
  font-size: 18px;
  text-indent: 16px;
}
</style>
