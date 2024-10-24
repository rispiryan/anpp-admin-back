'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
 CREATE TABLE public.shopping (
\tid serial4 NOT NULL,
\tar_title varchar(255) NOT NULL,
\ten_title varchar(255) NULL,
\tru_title varchar(255) NULL,
\tar_description varchar(255) NOT NULL,
\ten_description varchar(255) NOT NULL,
\tru_description varchar(255) NOT NULL,
\tlink varchar(255) NOT NULL,
\timage varchar(255) NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\tCONSTRAINT shopping_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS shopping`);
  },
};
