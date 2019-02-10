'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('h1b2014s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lca_case_number: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      lca_case_submit: {
        type: Sequelize.DATE
      },
      decision_date: {
        type: Sequelize.DATE
      },
      visa_class: {
        type: Sequelize.STRING
      },
      lca_case_employment_start_date: {
        type: Sequelize.DATE
      },
      lca_case_employment_end_date: {
        type: Sequelize.DATE
      },
      lca_case_employer_name: {
        type: Sequelize.STRING
      },
      lca_case_employer_address: {
        type: Sequelize.STRING
      },
      lca_case_employer_city: {
        type: Sequelize.STRING
      },
      lca_case_employer_state: {
        type: Sequelize.STRING
      },
      lca_case_employer_postal_code: {
        type: Sequelize.STRING
      },
      lca_case_soc_code: {
        type: Sequelize.STRING
      },
      lca_case_soc_name: {
        type: Sequelize.STRING
      },
      lca_case_job_title: {
        type: Sequelize.STRING
      },
      lca_case_wage_rate_from: {
        type: Sequelize.BIGINT
      },
      lca_case_wage_rate_to: {
        type: Sequelize.BIGINT
      },
      lca_case_wage_rate_unit: {
        type: Sequelize.STRING
      },
      full_time_pos: {
        type: Sequelize.STRING
      },
      total_workers: {
        type: Sequelize.INTEGER
      },
      lca_case_workloc1_city: {
        type: Sequelize.STRING
      },
      lca_case_workloc1_state: {
        type: Sequelize.STRING
      },
      pw_1: {
        type: Sequelize.BIGINT
      },
      pw_unit_1: {
        type: Sequelize.STRING
      },
      pw_source_1: {
        type: Sequelize.STRING
      },
      other_wage_source_1: {
        type: Sequelize.STRING
      },
      yr_source_pub_1: {
        type: Sequelize.INTEGER
      },
      lca_case_workloc2_city: {
        type: Sequelize.STRING
      },
      lca_case_workloc2_state: {
        type: Sequelize.STRING
      },
      pw_2: {
        type: Sequelize.BIGINT
      },
      pw_unit_2: {
        type: Sequelize.STRING
      },
      pw_source_2: {
        type: Sequelize.STRING
      },
      other_wage_source_2: {
        type: Sequelize.STRING
      },
      yr_source_pub_2: {
        type: Sequelize.STRING
      },
      lca_case_naics_code: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('h1b2014s');
  }
};
