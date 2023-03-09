<template lang="pug">
  section.gallery
    v-dialog(
      v-model="galleryDialog"
      max-width="600"
      @click:outside="clearCurrentGalleryItem()"
    )
      .gallery__card
        .card__image
          v-img(
            :src="currentGalleryItem.src"
            height="400px"
          )
        .card__info
          p {{ currentGalleryItem }}
        .card__actions
          v-btn Подробнее
          v-btn Голосовать

    .content
      h2.event__title {{ title }}
      masonry-wall(
        :items="componentData"
        :column-width="350"
        :gap="20"
      )
        template(#default="{item}")
          .wrapper
            img.wrap__trans(
              :src="item.thumb"
            )
            .card
              .front
                img.gallery__image(
                  :src="item.thumb"
                )
              .back
                h5 Имя автора
                h5 Возраст
                p Краткое описание
                v-btn(
                  @click="showGalleryCard(item)"
                ) Подробнее

</template>

<script>
import MasonryWall from '@yeger/vue2-masonry-wall';

export default {
  name: 'EventGallery',
  components: {
    MasonryWall,
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
      galleryDialog: false,
      currentGalleryItem: {},
    };
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    showGalleryCard(item) {
      this.currentGalleryItem = item;
      this.galleryDialog = true;
    },
    clearCurrentGalleryItem() {
      this.currentGalleryItem = {};
    },
  },
};
</script>
<style scoped lang="scss">
.image-wrapper {
  // position: relative;
  // text-align: center;
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // justify-content: center;
}
.gallery {
  // background-color: #eee;
}
.content {
  // position: relative;
  // width: 1200px;
  // margin: auto;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
}
.event__title {
  //color: rgba(255, 255, 255, 0.75);
  // color: #FFF8EE;
}
.gallery__image {
  // max-height: 280px;
  // width: 350px;
  width: 100%;
  // margin: 4px;
}
.v-dialog {
  border-radius: 2rem !important;
}
.gallery__card {
  background-color: #eee;
  border-radius: 2rem;
  overflow: hidden;
}
.card__image {
  width: 100%;
  border-radius: 2rem;
}
.card__info, .card__actions {
  padding: 1rem;
  width: 100%;
  overflow: hidden;
}

// flip
$primary: hsl(222,80%,50%);
$primary-light: hsl(222,50%,95%);

$secondary: hsl(350,80%,50%);

$red: hsl(10,80%,50%);
$orange: hsl(50,80%,50%);

.card {
  cursor: pointer;
  perspective: 1000px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.front {
  justify-content: center;
  align-items: center;
}
.back {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
}

.front,
.back {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 800ms;
  // overflow: hidden;
}

.front {
  overflow: hidden;
  &:before {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .25;
    z-index: -1;
  }
  .card:hover & {
    transform: rotateY(180deg);
  }
  // .card:nth-child(even):hover & {
  //   transform: rotateY(-180deg);
  // }
}

.back {
  background: #fff;
  transform: rotateY(-180deg);
  padding: 0 2em;
  .card:hover & {
    transform: rotateY(0deg);
  }
  // .card:nth-child(even) & {
  //   transform: rotateY(180deg);
  // }
  // .card:nth-child(even):hover & {
  //   transform: rotateY(0deg);
  // }
}
.wrap__trans {
  opacity: 0;
  width: 100%;
}
.wrapper {
  position: relative;
}
// flip end
</style>
