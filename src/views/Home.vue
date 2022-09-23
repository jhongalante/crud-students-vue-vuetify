<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="students-list-container">
    <v-card>
      <v-card-title>
        Consulta de Alunos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-btn
          color="grey lighten-1"
          large
          class="mt-4 ml-6 white--text"
          @click="handleCreate()"
        >
          Cadastrar Aluno
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="dataTableFromStore"
        :locale="tableLang"
        :search="search"
        no-data-text="Nenhum aluno cadastrado"
        no-results-text="Nenhum aluno encontrado"
        sort-by="name"
        class="elevation-1"
        :footer-props="{
          itemsPerPageAllText: 'Todos',
          itemsPerPageText: 'Alunos Por Página',
        }"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="handleEdit(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="handleDelete(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <DeleteStudentModal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IStudent } from "@/types";
import { getModule } from "vuex-module-decorators";
import { StudentStore } from "@/store";
import DeleteStudentModal from "@/components/DeleteStudentModal.vue";
import { headersTable } from "@/utils/headers-table";

@Component({
  components: {
    DeleteStudentModal,
  },
})
export default class Home extends Vue {
  private studentStore = getModule(StudentStore, this.$store);
  public search = "";
  public tableLang = "pt-BR";
  public students: IStudent[] = [];
  public headers = headersTable;

  get dataTableFromStore(): IStudent[] {
    return this.studentStore.all;
  }

  get hasData(): boolean {
    return Boolean(this.studentStore.all.length);
  }

  public handleCreate(): void {
    this.studentStore.handleSetEdit(false);
    this.$router.push("/register/student");
  }

  public handleEdit(student: IStudent): void {
    this.studentStore.handleSetEdit(true);
    this.studentStore.addStudentToEdit(student);
    this.$router.push(`/register/student`);
  }

  public handleDelete(selectedStudent: IStudent): void {
    this.studentStore.addStudentToDelete(selectedStudent);
  }

  private async created(): Promise<void> {
    await this.studentStore.loadData();
  }
}
</script>

<style scoped lang="scss">
.students-list-container {
  padding: 0 40px;
}

.check-size {
  width: 50px;
}
.active {
  background: rgb(173, 173, 173);
}
</style>
