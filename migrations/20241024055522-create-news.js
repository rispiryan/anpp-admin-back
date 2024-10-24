'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
CREATE TABLE public.news (
\tid serial4 NOT NULL,
\tar_title varchar(25500) NOT NULL,
\ten_title varchar(25500) NULL,
\tru_title varchar(25500) NULL,
\tar_description varchar(25500) NOT NULL,
\ten_description varchar(25500) NULL,
\tru_description varchar(25500) NULL,
\tar_content1 text NULL,
\ten_content1 text NULL,
\tru_content1 text NULL,
\tar_content2 text NULL,
\ten_content2 text NULL,
\tru_content2 text NULL,
\tar_content3 text NULL,
\ten_content3 text NULL,
\tru_content3 text NULL,
\timage text NOT NULL,
\t"contentImages1" text NOT NULL,
\t"contentImages2" text NOT NULL,
\t"createdAt" timestamptz NOT NULL,
\t"updatedAt" timestamptz NOT NULL,
\tCONSTRAINT news_pkey PRIMARY KEY (id)
);`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS news`);
  },
};
