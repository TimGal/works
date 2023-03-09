<template lang="pug">
  v-card().text-center.d-flex.flex-column(
    width="460"
  )
    .card__img-wrapper
      v-img(
        height="340"
        :src="card.img_src"
      )
    .card__info.align-center.flex-column.justify-center
      h5.word-break {{ card.title }}
      p {{ card.text }}
      p {{ card.description }}
      v-btn.mt-4(width="100%") Подробнее
</template>

<script>
export default {
  name: 'IconCard',
  props: {
    card: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style scoped>

.card__info {
  min-height: 160px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  row-gap: 0.5rem;
  padding: 1rem;
}
</style>
