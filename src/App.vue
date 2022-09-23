<template>
  <v-app>
    <div class="app-container">
      <v-app-bar elevation="0">
        <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon color="black">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in menuAppBar" :key="i">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="2" md="2">
            <v-navigation-drawer app absolute v-model="isMenuOpen">
              <v-list-item>
                <v-list-item-content>
                  <v-img src="./assets/logo.png"></v-img>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item class="grey lighten-1 white--text">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 text-center">
                    Módulo Acadêmico
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list dense nav>
                <v-list-item
                  color="grey lighten-1"
                  v-for="item in menuLeftItems"
                  :key="item.title"
                  router
                  :to="item.href"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="10" sm="12" md="10">
            <main>
              <router-view />
            </main>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { menuOptions } from "@/utils";

@Component
export default class App extends Vue {
  public isMenuOpen = true;

  public toggleMenu(): void {
    this.isMenuOpen = true;
  }

  menuAppBar = [{ title: "Opção 1" }, { title: "Opção 2" }];

  menuLeftItems = menuOptions;
}
</script>

<style scoped lang="scss">
.menu {
  min-height: 90vh;
}
</style>
