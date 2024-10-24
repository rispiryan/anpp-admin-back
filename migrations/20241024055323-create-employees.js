'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
  CREATE TABLE public.employees (
\tid serial4 NOT NULL,
\t"ar_fullName" varchar(255) NOT NULL,
\t"en_fullName" varchar(255) NULL,
\t"ru_fullName" varchar(255) NULL,
\tar_rank varchar(255) NOT NULL,
\ten_rank varchar(255) NULL,
\tru_rank varchar(255) NULL,
\tar_content text NOT NULL,
\ten_content text NULL,
\tru_content text NULL,
\timage varchar(255) NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\tCONSTRAINT employees_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS employees`);
  },
};
