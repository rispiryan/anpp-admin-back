'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
 CREATE TABLE public.vacancies (
\tid serial4 NOT NULL,
\tlink varchar(255) NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\tar_title varchar NULL,
\ten_title varchar NULL,
\tru_title varchar NULL,
\tar_description varchar NULL,
\ten_description varchar NULL,
\tru_description varchar NULL,
\tCONSTRAINT vacancies_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS vacancies`);
  },
};
