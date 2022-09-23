<template>
  <v-row justify="center">
    <v-dialog v-model="isModalOpen" persistent width="290">
      <v-card>
        <v-card-title class="text-h5"> Excluir aluno </v-card-title>
        <v-card-text>Tem certeza que deseja excluir esse aluno(a)?</v-card-text>
        <v-card-text>{{ studentName }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleCloseModal">
            Cancelar
          </v-btn>
          <v-btn color="red darken-1" text @click="handleDeleteStudent">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import { StudentStore } from "@/store";

@Component
export default class DeleteStudentModal extends Vue {
  private studentStore = getModule(StudentStore, this.$store);

  get isModalOpen(): boolean {
    return this.studentStore.dialog.isOpen;
  }

  get studentName(): string {
    return this.studentStore.selectedStudentToDelete.name;
  }

  public handleCloseModal(): void {
    this.studentStore.handleDialog();
  }

  public handleDeleteStudent(): void {
    this.studentStore.deleteSelectedStudent();
    this.handleCloseModal();
  }
}
</script>
