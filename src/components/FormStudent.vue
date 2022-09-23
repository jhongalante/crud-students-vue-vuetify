<template>
  <v-form :key="formSubmited" @submit.prevent="handleSubmit">
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <AlertSuccess :textAlertSuccess="textAlertSuccess" v-if="isSuccess" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <AlertError :textAlertError="textAlertError" v-if="isError" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="mr-2">
          <v-text-field
            prepend-icon="mdi-account"
            v-model="data.name"
            label="Nome"
            name="name"
            :rules="nameInputRules"
            required
            @change="validate"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            prepend-icon="mdi-email"
            v-model="data.email"
            label="E-mail"
            name="email"
            :rules="emailInputRules"
            @change="validate"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="mr-2">
          <v-text-field
            prepend-icon="mdi-text-box"
            v-model="data.academicRecord"
            label="Registro Acadêmico"
            name="academicRecord"
            :rules="academicRecordInputRules"
            :disabled="isEdit"
            @change="validate"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            prepend-icon="mdi-card-account-details"
            v-model="data.cpf"
            label="CPF"
            name="cpf"
            :rules="cpfInputRules"
            :disabled="isEdit"
            @change="validate"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col cols="2" class="mr-n16">
        <v-btn
          :disabled="!canSubmitForm"
          color="grey lighten-1 white--text"
          type="submit"
          >Salvar</v-btn
        >
      </v-col>
      <v-col cols="2">
        <v-btn color="grey lighten-1 white--text" type="button" to="/"
          >Cancelar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { StudentStore } from "@/store";
import { IStudent } from "@/types";
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import AlertSuccess from "./AlertSucess.vue";
import AlertError from "./AlertError.vue";
import { inputRules } from "@/utils";

@Component({
  components: {
    AlertSuccess,
    AlertError,
  },
})
export default class FormStudent extends Vue {
  private studentStore = getModule(StudentStore, this.$store);
  public isEdit = false;
  public formSubmited = false;
  public isSuccess = false;
  public isError = false;
  public textAlertSuccess = "";
  public textAlertError = "";
  public nameInputRules = inputRules.nameInputRules;
  public academicRecordInputRules = inputRules.academicRecordInputRules;
  public emailInputRules = inputRules.emailInputRules;
  public cpfInputRules = inputRules.cpfInputRules;
  public data = {
    name: "",
    email: "",
    cpf: "",
    academicRecord: "",
  };

  public canSubmitForm = false;

  public value = [];

  public validate(): boolean | void {
    type ObjectKey = keyof typeof this.data;
    const keys = [
      "name" as ObjectKey,
      "email" as ObjectKey,
      "cpf" as ObjectKey,
      "academicRecord" as ObjectKey,
    ];
    let numberOfInputsWithError = 0;
    keys.forEach((key) => {
      if (!this.data[key]) {
        numberOfInputsWithError += 1;
      }
    });
    if (!numberOfInputsWithError) {
      return (this.canSubmitForm = true);
    }
    this.canSubmitForm = false;
  }

  private resetForm(): void {
    this.formSubmited = !this.formSubmited;

    this.data = {
      name: "",
      email: "",
      cpf: "",
      academicRecord: "",
    };

    this.canSubmitForm = false;
  }

  public async handleSubmit(): Promise<void> {
    this.validate();
    const student: IStudent = {
      ...this.data,
    };
    this.isError = false;

    if (this.canSubmitForm) {
      if (this.isEdit) {
        this.studentStore.addEditedStudent(student);

        this.verifyError(
          this.studentStore.isError,
          "Não foi possível editar o cadastro do aluno. Tente novamente!"
        );

        if (!this.isError) {
          this.showAlertSuccess(true, "Cadastro de aluno editado com sucesso!");
        }
      } else {
        await this.studentStore.addNewStudent(student);

        this.verifyError(
          this.studentStore.isError,
          "Não foi possível cadastrar o aluno. Tente novamente!"
        );
        if (!this.isError) {
          this.showAlertSuccess(true, "Aluno cadastrado com sucesso!");
          this.resetForm();
        }
      }
    }
  }

  private created(): void {
    this.isEdit = this.studentStore.isEdit;
    if (this.isEdit) {
      this.data = { ...this.studentStore.selectedStudent };
      this.validate();
    }
  }

  private showAlertSuccess(isSuccess: boolean, msg: string) {
    if (isSuccess) {
      this.textAlertSuccess = msg;
      this.isSuccess = isSuccess;
    }
    return isSuccess;
  }

  private verifyError(isError: boolean, msg: string) {
    if (isError) {
      this.textAlertError = msg;
      this.isError = isError;
    }
    return isError;
  }
}
</script>
