<template>
  <v-carousel cycle height="430" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://www.kuppingercole.com/pics/2018_csls_1000x563px.png",
        },
        {
          src: "https://cdn-az.allevents.in/events5/banners/3e48dd051efbc98b365133c98a97b1136a4c29ee345d86ec579c27452e9f0f58-rimg-w1200-h628-gmir.jpg?v=1637866509",
        },
        {
          src: "https://digitaltransformation-news.com/wp-content/uploads/sites/13/2021/01/CSC-EXPO-600x300-1.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      colors: ["indigo", "warning", "pink darken-2", "red lighten-1"],
      slides: ["First", "Second", "Third", "Fourth"],
    };
  },
};
</script>