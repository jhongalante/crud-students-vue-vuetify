export const inputRules = {
  nameInputRules: [
    (value: string): boolean | string => !!value || "Informe um nome.",
  ],

  academicRecordInputRules: [
    (value: string): boolean | string =>
      !!value || "Informe um Registro Acadêmico.",
  ],

  emailInputRules: [
    (value: string): boolean | string => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return pattern.test(value) || "Informe um e-mail válido";
    },
  ],

  cpfInputRules: [
    (value: string): boolean | string => {
      const pattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

      return pattern.test(value) || "Informe um CPF válido";
    },
  ],
};
