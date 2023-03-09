<template lang="pug">
  section.stages
    .content
      span {{ componentData }}
      h2.event__title {{ title }}
      event-chips
      v-expansion-panels.stages__group(
        multiple
      )
        v-expansion-panel.stage(
          v-for="(stage, idx) in componentData"
          :key="idx"
        )
          v-expansion-panel-header
            .stage-preview
              h3.step-name() {{ stage.name }}
              span.step-dates() {{ `${stage.start_at} - ${stage.end_at }` }}
            //- сюда нужно дописать
          v-expansion-panel-content
            .stage-card
              v-img.stage-img(
                :src="stage.stage_img_src"
                v-if="false"
              )
          //-     .stage-content
          //-       v-tabs.tabs
          //-         v-tab(
          //-           v-for="(tabName, key) in tabNames"
          //-           :key="key"
          //-         ) {{ tabName }}
          //-         v-tab-item.py-5
          //-           h3.step-title() {{ stage.step_title }}
          //-           .date
          //-             v-icon mdi-clock
          //-             .end_date {{ stage.step_end_date }}
          //-           p.description {{ stage.step_description }}
          //-           v-btn.land-btn(
          //-             color="primary"
          //-           ) {{ stage.step_action }}
          //-         v-tab-item
          //-           .speakers_wrap(
          //-             v-for="speaker in stage.step_speakers"
          //-           )
          //-             v-img.speaker_img(
          //-               :src="speaker.speaker_img_src"
          //-             )
          //-             .speaker_info
          //-               .speaker_name {{ speaker.speaker_name }}
          //-               .speaker_appointment {{ speaker.speaker_appointment }}
          //-               .bttn {{ speaker.speaker_more }}
          //-         v-tab-item
          //-           yandex-map(
          //-             :coords="stage.map_address.coords"
          //-             :zoom="stage.map_address.zoom"
          //-             :scroll-zoom="false"
          //-             :controls="stage.map_address.controls"
          //-             style="width: 30vw; height: 450px"
          //-           )
          //-             ymap-marker(markerId='1', :coords='stage.map_address.coords')
          //-       //- .land-btn {{ stage.step_action }}

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
    componentData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabNames: [
        'Что будет',
        'Спикеры',
        'Карта проезда',
      ],
      // pustoyMassiv: [],
    };
  },
  computed: {
  },
  watch: {
    componentData(v) {
      console.log('stages data:', JSON.parse(JSON.stringify(v)));
    },
  },
  created() {

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
.image-wrapper {
  position: relative;
}
.stages {
  padding: 64px 32px !important;
  background-color: #eee;
}
.content {
  position: relative;
  margin: auto;
}
.event__title {
  color: rgba(0, 0, 0, 0.75);
}
.button__group {
  display: flex;
  flex-direction: row;
  column-gap: 16px;
}
.bttn {
  font-size: 16px !important;
  padding: 4px 8px !important;
  background-color: #84629f !important;
  color: rgba(255, 255, 255, 0.9) !important;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}
.gallery__image {
  max-height: 240px;
  margin: -12px 4px 0;
}
.stage {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 16px;
}
.step-name {
  text-align: left !important;
  font-size: 24px;
  margin-bottom: 16px;
}
.step-dates {
  font-size: 18px;
  margin-bottom: 16px;
}
.step-title {
  text-align: left !important;
}
.stages_group {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
.stage-img {
  width: 350px;
  max-width: 350px;
  height: 500px;
}
.stage-card {
  display: flex;
  flex-direction: row;
}
.stage-content {
  padding: 0 32px;
}
.tabs {
  margin-bottom: 16px;
}
.end_date {
  margin-bottom: 0 !important;
  font-size: 18px;
}
.date {
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  justify-content: left;
  align-items: center;
  padding: 16px 0;
}
.description {
  font-size: 18px;
  text-indent: 24px;
  margin: 0 0 24px;
}
.land-btn {
  font-size: 24px !important;
  padding: 24px !important;
  color: rgba(255, 255, 255, 0.9) !important;
}
.stages__group {
  max-width: 1600px;
  margin: auto;
}
.speakers_wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.speaker_img {
  width: 80px;
  max-width: 80px;
  height: 80px;
  border-radius: calc(80px / 2);
}
.speaker_info {
  padding: 16px;
}
.speaker_name {
  font-size: 24px;
}
.speaker_appointment {
  font-size: 18px;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.75)
}
</style>
