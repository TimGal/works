<template lang="pug">
section.tabs
  .content
    h2.event__title {{ title }}
      .tabs-content
        v-tabs.tabs(
          centered
        )
          v-tab(
            v-for="(tabName, key) in tabNames"
            :key="key"
          ) {{ tabName }}
          v-tab-item.py-5(
            v-for="(text, idx) in testTexts"
            :key="idx"
          )
            p.tab__text {{ text }}
</template>

<script>
import EventChips from './event-helpers/EventChips.vue';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
  name:'EventStages',
  components: {
    EventChips,
    yandexMap,
    ymapMarker,
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
      tabNames: [
        'Овен',
        'Телец',
        'Близнецы',
        'Скорпион',
      ],
      testTexts: [
        'Если ты родилась в мае, скорее всего, ты считаешь себя Тельцом, а рожденные в сентябре обычно считают себя Девами. Но задумывалась ли ты когда-нибудь о причинах такого распределения? Пришло время сделать это – за этими датами стоит история, которая может тебя заинтересовать. ',
        'Когда мы говорим о знаке зодиака, мы по сути имеем в виду солнечный знак в натальной карте. Натальная карта — это по сути снимок небосвода в тот момент, когда ты появилась на свет. Каждая планета тогда занимала определенная положение, и из этих данных складываются характеристики натальной карты. ',
        'Знак Солнца (то, что мы привыкли называть знаком зодиака) определяется по тому, где именно находилось Солнце в момент рождения. С солнечным знаком обычно не бывает проблем — даже если ты не знаешь точного времени рождения, в том или ином знаке Солнце находится практически месяц — невозможно ошибиться. ',
        'Почему существует 12 знаков зодиака? Эта история уходит корнями в Вавилонский лунно-солнечный календарь, который был придуман около 3000 лет назад. Год в этом календаре был разделен на 12 месяцев, но не привычным нам способом, а в зависимости от того, на широте какого созвездия на данный момент находится Солнце. ',
      ],
    };
  },
  computed: {
  },
  mounted() {
    this.$nextTick(() => {
      // eslint-disable-next-line
      // console.log('next tick called');
    });
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.stages {
  padding: 64px 32px !important;
  // background-color: #eee;
}
.content {
  position: relative;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabs {
  width: 1500px;
  margin: 1.5rem auto 0;
}
.tab__text {
  font-size: 24px;
}
</style>
