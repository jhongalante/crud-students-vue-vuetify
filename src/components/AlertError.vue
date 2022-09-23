<template>
  <v-alert dismissible prominent text type="error">
    {{ textAlertError }}
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AlertError extends Vue {
  @Prop() public textAlertError!: string;
}
</script>
