'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
  CREATE TABLE public.reports (
\tid serial4 NOT NULL,
\tfile varchar(255) NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\t"fileName" varchar NOT NULL,
\tCONSTRAINT reports_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS reports`);
  },
};
