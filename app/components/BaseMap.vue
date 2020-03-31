<template>
  <div class="map">
    <h2 v-if="data.headline" class="map__headline">{{ data.headline }}</h2>
    <l-map :bounds="bounds">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
        v-for="(marker, index) in data.markers"
        :key="index"
        :lat-lng="[marker.lat, marker.lng]"
      >
        <l-popup>
          <div v-html="markerDescription(marker)"></div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLngBounds, latLng } from "leaflet";

export default {
  name: "BaseMap",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      bounds: latLngBounds(
        this.data.markers.map(marker => {
          return [marker.lat, marker.lng];
        })
      )
    };
  },
  methods: {
    markerDescription(marker) {
      const rows = [];
      if (marker.address) {
        rows.push(`<strong>${marker.address}</strong>`);
      }
      if (marker.phone) {
        rows.push(`<strong>Telefon:</strong> ${marker.phone}`);
      }
      if (marker.www) {
        rows.push(`<strong>Strona www:</strong> ${marker.www}`);
      }
      if (marker.email) {
        rows.push(`<strong>E-mail:</strong> ${marker.email}`);
      }
      if (marker.content) {
        rows.push(
          `<strong>Dodatkowe informacje:</strong><br> ${marker.content}`
        );
      }
      return rows.join("<br>");
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  border-radius: 5px;
  height: 500px;
  overflow: hidden;
}
</style>