<template lang="pug">
  v-card.text-center.flex-row.d-flex.card(
    width="460"
  )
    .card__img-wrapper
      v-img(
        height="340"
        :src="card.img_src"
      )
    .card__info
      h5 {{ card.nomination }}
      h5.word-break {{ card.title }}
      v-spacer
      h5 {{ card.place }}
        strong &nbsp;Место
      v-btn.mt-4(width="100%") Подробнее
</template>

<script>
export default {
  name: 'WinnerCard',
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
.card {
  border-radius: 2.5rem 0 2.5rem 0!important;
}
.card__info {
  align-items: start;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  row-gap: 0.5rem;
  padding: 1rem;
}
.card__img-wrapper {
  overflow: hidden !important;
}
</style>
