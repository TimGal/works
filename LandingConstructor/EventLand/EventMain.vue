<template lang="pug">
section.main
  .slider__overlay
    .content
      .titles
        h1.event__title {{ eventData.name }}
        .add__info {{ `${ eventData.event_stage_start_at } - ${ eventData.event_stage_end_at }` }}
        .add__info {{ eventData.organization_name }}
      .button__group
        //- v-btn.bnt__info.bttn(
        //-   color="#19CDB5"
        //- ) О мероприятии
        v-btn.btn__action.bttn(
          color="primary"
        ) Участвовать
        //- v-btn.hardbass.bttn Потусить
  flicking.main__slider(
    :options="flickingOptions"
    :plugins="plugins"
  )
    .img-wrapper(
      v-for="(item, idx) in images"
      :key="idx"
    )
      v-img(
        height="100%"
        width="100%"
        :src="item"
        position="center center"
      )
  .main__bottom__panel
    //- .label__wrapper
    //-   v-icon.bottom__text mdi-earth
    //-   p.bottom__text {{ eventData.level }}
    //- .label__wrapper
    //-   v-icon.bottom__text mdi-animation-outline
    //-   p.bottom__text {{ directory_direction }}
    .label__wrapper(
      v-for="(label, idx) in labels"
    )
      v-icon.bottom__text {{ label.icon }}
      p.bottom__text {{ label.name }}
</template>

<script>
import eventService from '@/services/API/event';
// import { mapGetters } from 'vuex';
import EventIcons from '@/modules/Events/components/EventIcons.vue';
import EventStartCounter from '@/modules/Events/views/Event/EventViewInfo/components/EventStartCounter.vue';
import mixinEventDirection from '@/mixins/mixinEventDirection';
import mixinEventType from '@/mixins/mixinEventType';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import { EVENT_STATUS } from '@/modules/Events/constants';
import mixinTime from '@/mixins/mixinTime';
import { LEVEL_NAMES } from '@/constants/level';
import { EVENT_MEMBER_TYPE_TEXT, EVENT_PAY_TYPES_TEXT } from '@/modules/Moderation/constants';
import NominationsChips from '@/components/NominationsChips.vue';
import PresentationVideo from '@/modules/Events/components/PresentationVideo.vue';
import { AutoPlay } from '@egjs/flicking-plugins';
import { EVENT_DIRECTIONS_TEXT } from './event-helpers/consants/constants';

export default {
  components: {
    EventIcons,
    EventStartCounter,
    ConfirmDialog,
    NominationsChips,
    PresentationVideo,
  },
  mixins: [mixinEventDirection, mixinEventType, mixinTime],
  props: {
    eventData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isRegisterLoaded: false,
      isRegister: false,
      dialog: false,
      editorMode: true,
      isFollowLoaded: false,
      isFollow: false,
      directory_direction: '',
      imageSlider: false,
      images: [],
      testImages: [
        // 'https://images.unsplash.com/photo-1673377134996-48aaf17bbac4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        // 'https://images.unsplash.com/photo-1673423050639-a1779551b838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        // 'https://images.unsplash.com/photo-1673423184846-0ff85b4d47c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1808&q=80',
        // 'https://plus.unsplash.com/premium_photo-1661887248442-0b4a4a73bc46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      ],

      plugins: [new AutoPlay({
        duration: 2000,
        animationDuration: 6000,
        direction: 'NEXT',
        stopOnHover: false,
      })],
      EVENT_STATUS,
      LEVEL_NAMES,
      EVENT_MEMBER_TYPE_TEXT,
      EVENT_PAY_TYPES_TEXT,
      flickingOptions: {
        circular: true,
        panelsPerView: 1,
        align: 'prev',
        easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2),
      },
    };
  },
  computed: {
    labels() {
      return [
        {
          name: this.eventData.level,
          icon: 'mdi-earth',
        },
        {
          name: this.directory_direction,
          icon: 'mdi-animation-outline',
        },
        {
          name: 'Командное',
          icon: 'mdi-account-group',
        },
        {
          name: '3 тыс. участников',
          icon: 'mdi-account-multiple',
        },
        {
          name: '12 номинаций',
          icon: 'mdi-trophy-award',
        },
        {
          name: 'Пермь, ул. Пушкина, дом Колотушкина',
          icon: 'mdi-map-marker-outline',
        },
      ];
    },
    sliderImages() {
      return this.images.map((item) => item.url);
    },

    checkAcceptingDate() {
      const NOW = new Date().getTime();
      const { start_accepting_at, end_accepting_at } = this.eventData.options;
      if (start_accepting_at && end_accepting_at) {
        const startDate = new Date(start_accepting_at).getTime();
        const endDate = new Date(end_accepting_at).getTime();
        return !(startDate <= NOW && NOW <= endDate);
      }
      return false;
    },
  },
  async created() {
    this.getEventImages();
    const params = {
      expand: 'address, organization',
    };
    this.$rHandler(eventService.showEvent(this.$route.params.id, params), (resp) => {
      const { data } = resp.data;
      // console.log('event with expand address', data);
      this.contact_phone = data.organization.contact_phone;
      this.contact_email = data.organization.contact_email;
      this.title = data.short_name;
    });
    const params2 = {
      expand: 'directory_direction_id',
    };
    this.$rHandler(eventService.showEvent(this.$route.params.id, params2), (resp) => {
      const { data } = resp.data;
      this.directory_direction = EVENT_DIRECTIONS_TEXT[data.directory_direction_id];
      // console.log('event with expand directory_direction_id', data);
    });
  },
  methods: {
    openDialog() {
      this.dialog = !this.dialog;
    },
    getEventImages() {
      const params = {
        'search[event_id]': this.$route.params.id,
        sort: 'id',
      };
      this.$rHandler(eventService.getImages(params), (response) => {
        this.images = response.data.data.map((item) => item.url) || [];
        // console.log('images', this.images);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.main {
  height: 100vh;
  position: relative;
  padding: 0 !important;
}
.main__slider {
  z-index: 3;
}
.editor_btn {
  color: white;
  background-color: #000;
  font-size: 24px;
  padding: 8px 16px;
  position: absolute;
  top: calc(100% - 160px);
  // margin: auto;
  border-radius: 4px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  cursor: pointer;
}
.slider__overlay {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0, 0.50);
  z-index: 4;
}
.content {
  // position: absolute;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-wrapper {
  width: 100%;
  height: 100vh;
}
.titles {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.event__title {
  color: white;
  text-transform: uppercase;
  margin: 0 !important;
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
.main__bottom__panel {
  height: 6rem;
  position: absolute;
  width: 100%;
  top: calc(100% - 6rem);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
}
.bottom__text {
  color: #eee;
  font-size: 1.25rem;
}
.label__wrapper {
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
}
</style>
