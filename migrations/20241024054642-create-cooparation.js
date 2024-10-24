'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`CREATE TABLE public.cooperation (
\tid serial4 NOT NULL,
\tlink varchar(255) NOT NULL,
\timage varchar(255) NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\ten_title varchar(255) NULL,
\tru_title varchar(255) NULL,
\tar_title varchar NULL,
\tCONSTRAINT cooperation_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS cooperation`);
  },
};
