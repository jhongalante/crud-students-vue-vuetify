<template>
  <v-alert dismissible icon="mdi-account" prominent text type="success">
    {{ textAlertSuccess }}
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AlertSuccess extends Vue {
  @Prop() public textAlertSuccess!: string;
}
</script>
