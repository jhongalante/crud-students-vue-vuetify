<template>
  <div class="regiter-container">
    <h1>{{ title }}</h1>
    <FormStudent />
  </div>
</template>

<script lang="ts">
import FormStudent from "@/components/FormStudent.vue";
import { StudentStore } from "@/store";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    FormStudent,
  },
})
export default class RegisterStudent extends Vue {
  private studentStore = getModule(StudentStore, this.$store);
  public title = "Cadastrar aluno";
  private isEdit = false;

  private created(): void {
    this.isEdit = this.studentStore.isEdit;
    if (this.isEdit) {
      this.title = "Editar cadastro do aluno";
    }
  }
}
</script>

<style scoped lang="scss">
.regiter-container {
  padding-left: 40px;
}
</style>
