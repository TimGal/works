<template lang="pug">
  .land__wrapper
    event-main(
      :eventData="EventData"
    )
    template(
      v-for="(section, idx) in sections"
    )
      component(
        :is="SECTION_TYPES_COMPONENT[section.component]"
        :key="section.order"
        v-bind="section.component_attrs"
      )
</template>

<script>
// import _ from 'lodash';
import EventMain from './EventLand/EventMain.vue';
import EventCards from './EventLand/EventCards.vue';
import EventGallery from './EventLand/EventGallery.vue';
import EventStages from './EventLand/EventStages.vue';
import EventTabs from './EventLand/EventTabs.vue';
import EventReverseGrid from './EventLand/EventReverseGrid.vue';
import testCardsData from './EventLand/event-test-data/cards';
import testExpertData from './EventLand/event-test-data/experts';
import testImagesArr from './EventLand/event-test-data/images';
// import testStagesArr from './EventLand/event-test-data/stages';
import { testWinnersData } from './EventLand/event-test-data/winners';
import {
  CARD_TYPES,
  MARKUP_TYPE,
  SECTION_TYPES,
  SECTION_TYPES_COMPONENT,
} from './EventLand/event-helpers/consants/constants';
import { EVENT_LEVELS_TEXT, EVENT_LEVELS_STATUS_TEXT } from '@/modules/Events/constants.js';
import eventService from '@/services/API/event';
import userService from '@/services/API/user/index';
// import { EVENT_MEMBER_TYPE_TEXT } from '@/modules/Moderation/constants';

export default {
  name: 'ProgramView',
  components: {
    EventMain,
    EventStages,
    EventGallery,
    EventCards,
    EventReverseGrid,
    EventTabs,
  },
  data() {
    return {
      stagesData: [],
      currentTab: 1,
      loading: true,
      dialog: false,
      id: null,
      testCardsData, // тестовые данные первого отдела карточек без карусели
      testExpertData, // тестовые данные второго отдела карточек с каруселью
      organization: {},
      mobileTabMenu: false,
      currentInfoTab: null,
      SECTION_TYPES_COMPONENT,
      tabNames: [
        'О мероприятии',
        'Правила',
        'Номинации',
        'Цели и задачи',
      ],
      additionalInfo: {
        phone_number: '',
      },
      EventData: {
        name: '', // Название мероприятия
        event_stage_start_at: '', // Дата начала
        event_stage_end_at: '', // Дата завершения
        level: '', // Уровень мероприятия LEVEL_NAMES[]
        event_member_type: 'Командное', // Тип участия EVENT_MEMBER_TYPE_TEXT[]
        pay_type: 'Платное', // Форма участия (плат/не плат) EVENT_PAY_TYPES_TEXT[]
        event_type: 'Техническое', // Вид деятельности getEventType()
        directory_direction_id: '', // Направленность мероприятия getDirection()
        active_members_count: '', // Записано участников asdasdas!!!!
        organization_name: '', // Имя организатора asdasdasd!!!!
        short_organization_name: '',
        status: '',
        controls: ['input_text', 'switcher', 'add-btn'],
      },
    };
  },
  computed: {
    // sortedSections() {
    //   return _.sortBy(this.sections, ['order']);
    // },
    sections() {
      return [
        // {
        //   component: SECTION_TYPES.cards,
        //   component_attrs: {
        //     componentData: testCardsData,
        //     title: 'Давай уже, чего ты ждёшь!',
        //     options: {
        //       cardType: CARD_TYPES.icon,
        //       markupType: MARKUP_TYPE.grid,
        //     },
        //   },
        //   order: 1,
        // },
        // {
        //   component: SECTION_TYPES.cards,
        //   component_attrs: {
        //     componentData: testCardsData,
        //     title: 'Давай уже, чего ты ждёшь!',
        //     options: {
        //       cardType: CARD_TYPES.winner,
        //       isCarousel: false,
        //     },
        //   },
        //   order: 2,
        // },
        {
          component: SECTION_TYPES.gallery,
          component_attrs: {
            componentData: testImagesArr,
            title: 'Голосуйте за работы участников',
            options: {
              markupType: MARKUP_TYPE.grid,
            },
          },
          order: 2,
        },
        // {
        //   component: SECTION_TYPES.reverseGrid, // пришёл нолик
        //   component_attrs: {
        //     componentData: testImagesArr,
        //     title: 'Коротко о главном',
        //     options: {
        //       markupType: MARKUP_TYPE.grid,
        //     },
        //   },
        //   order: 3,
        // },
        {
          component: SECTION_TYPES.cards,
          component_attrs: {
            componentData: testWinnersData,
            title: 'Наши победители',
            options: {
              cardType: CARD_TYPES.winner,
              markupType: MARKUP_TYPE.grid,
            },
          },
          order: 5,
        },
        {
          component: SECTION_TYPES.stages,
          component_attrs: {
            componentData: this.stagesData,
            title: 'Программа мероприятия',
            options: {
              styles: {
                'font-size': '48px',
              },
            },
          },
          order: 6,
        },
        {
          component: SECTION_TYPES.cards,
          component_attrs: {
            componentData: testExpertData,
            title: 'Жюри!',
            options: {
              cardType: CARD_TYPES.info,
              markupType: MARKUP_TYPE.grid,
            },
          },
          order: 4,
        },
        {
          component: SECTION_TYPES.tabs,
          component_attrs: {
            title: 'Секция с вкладками',
            options: {
              markupType: MARKUP_TYPE.grid,
            },
          },
          order: 7,
        },
      ];
    },
  },
  watch: {},
  created() {
    this.getLandingData();
  },
  methods: {
    getLandingData() {
      const params = {
        expand: 'directory_direction_id',
      };
      this.$rHandler(eventService.getLanding(this.$route.params.id, params), (response) => {
        const { data } = response.data;
        this.EventData.name = data.name;
        this.EventData.event_stage_start_at = data.event_stage_end_at;
        this.EventData.event_stage_end_at = data.event_stage_end_at;
        this.EventData.level = EVENT_LEVELS_TEXT[data.level];
        this.EventData.status = data.status;
        this.EventData.target = data.target;
        this.EventData.status = EVENT_LEVELS_STATUS_TEXT[data.status];
        // this.EventData.status = EVENT_LEVELS_STATUS_TEXT[data.status];
        // console.log('main data', data);
        userService.getPublicUser(data.owner_id).then((resp) => {
          this.EventData.organization_name = resp.data.data.organizer.full_name;
          this.EventData.short_organization_name = resp.data.data.organizer.short_name;
        });
      });
      eventService.getLandingSections(this.$route.params.id);
      this.$rHandler(eventService.getLandingSections(this.$route.params.id), (response) => {
        const { data } = response.data;
        this.stagesData = data[5].componentData;
        // console.log('stagesData', this.stagesData);
        // console.log('sections', data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './EventLand/event-helpers/event-page-style.scss';
</style>
