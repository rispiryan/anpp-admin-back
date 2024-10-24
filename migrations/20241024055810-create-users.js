'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
 CREATE TABLE public.users (
\tid serial4 NOT NULL,
\temail varchar(255) NOT NULL,
\t"password" varchar(255) NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\t"fullName" varchar(255) NOT NULL,
\tCONSTRAINT users_email_key UNIQUE (email),
\tCONSTRAINT users_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS users`);
  },
};
