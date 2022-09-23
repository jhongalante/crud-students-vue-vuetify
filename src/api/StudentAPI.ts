import { IStudent, IUpdatedStudent } from "@/types";
import http from "../utils/http-common";

export const StudentAPI = {
  async register(student: IStudent) {
    return await http.post(`/student`, student);
  },

  async update(student: IUpdatedStudent) {
    return await http.put(`/student/${student.academicRecord}`, {
      name: student.name,
      email: student.email,
    });
  },

  async delete(academicRecord: string) {
    return await http.delete(`/student/${academicRecord}`);
  },

  async findAll() {
    return await http.get(`/student`);
  },
};
