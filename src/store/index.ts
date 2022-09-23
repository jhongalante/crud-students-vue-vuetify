import Vue from "vue";
import Vuex from "vuex";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import { IStudent } from "@/types";
import { StudentAPI } from "@/api";

Vue.use(Vuex);

@Module({ name: "StudentStore" })
export class StudentStore extends VuexModule {
  students: IStudent[] = [];
  studentToEdit: IStudent = {} as IStudent;
  studentToDelete: IStudent = {} as IStudent;
  edit = false;
  error = false;
  errorMsg = "";

  dialog = {
    isOpen: false,
  };

  get all(): IStudent[] {
    return this.students;
  }

  get isEdit(): boolean {
    return this.edit;
  }

  get isError(): boolean {
    return this.error;
  }

  get selectedStudent(): IStudent {
    return this.studentToEdit;
  }

  get selectedStudentToDelete(): IStudent {
    return this.studentToDelete;
  }

  @Mutation
  private setNewStudent(newStudent: IStudent): void {
    this.students.push(newStudent);
  }

  @Mutation
  private setStudentToEdit(student: IStudent): void {
    this.studentToEdit = student;
  }

  @Mutation
  private setEditedStudent(editedStudent: IStudent) {
    this.students.find((student: IStudent) => {
      if (student.academicRecord === editedStudent.academicRecord) {
        student.name = editedStudent.name;
        student.email = editedStudent.email;
      }
    });
    this.studentToEdit = {} as IStudent;
  }

  @Mutation
  private setStudentToDelete(student: IStudent): void {
    this.studentToDelete = student;
  }

  @Mutation
  private toggleDeleteModal(): void {
    this.dialog.isOpen = !this.dialog.isOpen;
  }

  @Mutation
  private deleteStudent(): void {
    const studentIndex = this.students.findIndex(
      (student) =>
        student.academicRecord === this.studentToDelete.academicRecord
    );
    if (studentIndex >= 0) {
      this.students.splice(studentIndex, 1);
      this.studentToDelete = {} as IStudent;
    }
  }

  @Mutation
  private generateDataStudents(students: IStudent[]): void {
    this.students = students;
  }

  @Mutation
  private setEdit(isEdit: boolean): void {
    this.edit = isEdit;
  }

  @Mutation
  private setError(isError: boolean): void {
    this.error = isError;
  }

  @Action
  public async loadData(): Promise<void> {
    StudentAPI.findAll()
      .then((students) => {
        if (students) {
          const studentsLoaded = students.data as IStudent[];
          this.context.commit("generateDataStudents", studentsLoaded);
        }
      })
      .catch((error) => {
        console.error(error);
        this.context.commit("setError", true);
      });
  }

  @Action
  public async addNewStudent(student: IStudent): Promise<void> {
    StudentAPI.register(student)
      .then((newStudent) => {
        if (newStudent) {
          this.context.commit("setNewStudent", newStudent.data);
          this.context.commit("setError", false);
        }
      })
      .catch((error) => {
        console.error(error);
        this.context.commit("setError", true);
      });
  }

  @Action
  public addStudentToEdit(studentToEdit: IStudent): void {
    this.context.commit("setStudentToEdit", studentToEdit);
  }

  @Action
  public async addEditedStudent(editedStudent: IStudent): Promise<void> {
    StudentAPI.update({
      name: editedStudent.name,
      email: editedStudent.email,
      academicRecord: editedStudent.academicRecord,
    })
      .then((studentEdited) => {
        if (studentEdited) {
          this.context.commit("setEditedStudent", studentEdited);
        }
      })
      .catch((error) => {
        console.error(error);
        this.context.commit("setError", true);
      });
  }

  @Action
  public addStudentToDelete(studentToDelete: IStudent): void {
    this.context.commit("setStudentToDelete", studentToDelete);
    this.context.commit("toggleDeleteModal");
  }

  @Action
  public async deleteSelectedStudent(): Promise<void> {
    StudentAPI.delete(this.studentToDelete.academicRecord)
      .then(() => {
        this.context.commit("deleteStudent");
      })
      .catch((error) => {
        console.error(error);
        this.context.commit("setError", true);
      });
  }

  @Action
  public handleDialog(): void {
    this.context.commit("toggleDeleteModal");
  }

  @Action
  public handleSetEdit(isEdit: boolean): void {
    this.context.commit("setEdit", isEdit);
  }
}

export default new Vuex.Store({
  modules: {
    StudentStore,
  },
});
