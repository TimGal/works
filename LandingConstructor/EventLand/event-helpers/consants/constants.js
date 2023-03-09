export const CARD_TYPES = {
  icon: 0,
  info: 1,
  winner: 2,
};

export const CARD_TYPES_COMPONENT = {
  [CARD_TYPES.icon]: 'icon-card',
  [CARD_TYPES.info]: 'info-card',
  [CARD_TYPES.winner]: 'winner-card',
};

export const SECTION_TYPES = {
  cards: 0,
  gallery: 1,
  reverseGrid: 2,
  stages: 3,
  tabs: 4,
  graphs: 5,
};

export const SECTION_TYPES_COMPONENT = {
  [SECTION_TYPES.cards]: 'event-cards',
  [SECTION_TYPES.gallery]: 'event-gallery',
  [SECTION_TYPES.reverseGrid]: 'event-reverse-grid',
  [SECTION_TYPES.stages]: 'event-stages',
  [SECTION_TYPES.tabs]: 'event-tabs',
};

export const MARKUP_TYPE = {
  grid: 0,
  carousel: 1,
};

export const MARKUP_TYPES_TEXT = {
  [MARKUP_TYPE.grid]: 'grid',
  [MARKUP_TYPE.carousel]: 'carousel',
};

export const EVENT_DIRECTIONS = {
  technical: 2,
  artistic: 3,
  natural_science: 4,
  social_humanitarian: 5,
  touristic_historic: 6,
  athletic: 7,
};

export const EVENT_DIRECTIONS_TEXT = {
  [EVENT_DIRECTIONS.technical]: 'Техническая',
  [EVENT_DIRECTIONS.artistic]: 'Художественная',
  [EVENT_DIRECTIONS.natural_science]: 'Естественнонаучная',
  [EVENT_DIRECTIONS.social_humanitarian]: 'Социально-гуманитарная',
  [EVENT_DIRECTIONS.touristic_historic]: 'Туристско-краеведческая',
  [EVENT_DIRECTIONS.athletic]: 'Физкультурно-спортивная',
};
// {
//   id: 2,
//   name: 'Техническая',
// },
// {
//   id: 3,
//   name: 'Художественная',
// },
// {
//   id: 4,
//   name: 'Естественнонаучная',
// },
// {
//   id: 5,
//   name: 'Социально-гуманитарная',
// },
// {
//   id: 6,
//   name: 'Туристско-краеведческая',
// },
// {
//   id: 7,
//   name: 'Физкультурно-спортивная',
// },
