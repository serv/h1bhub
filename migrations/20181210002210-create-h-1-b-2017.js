'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('h1b2017s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      case_number: {
        type: Sequelize.STRING
      },
      case_status: {
        type: Sequelize.STRING
      },
      case_submitted: {
        type: Sequelize.DATE
      },
      decision_date: {
        type: Sequelize.DATE
      },
      visa_class: {
        type: Sequelize.STRING
      },
      employment_start_date: {
        type: Sequelize.DATE
      },
      employment_end_date: {
        type: Sequelize.DATE
      },
      employer_name: {
        type: Sequelize.STRING
      },
      employer_business_dba: {
        type: Sequelize.STRING
      },
      employer_address: {
        type: Sequelize.STRING
      },
      employer_city: {
        type: Sequelize.STRING
      },
      employer_state: {
        type: Sequelize.STRING
      },
      employer_postal_code: {
        type: Sequelize.STRING
      },
      employer_country: {
        type: Sequelize.STRING
      },
      employer_province: {
        type: Sequelize.STRING
      },
      employer_phone: {
        type: Sequelize.BIGINT
      },
      employer_phone_ext: {
        type: Sequelize.INTEGER
      },
      agent_representing_employer: {
        type: Sequelize.STRING
      },
      agent_attorney_name: {
        type: Sequelize.STRING
      },
      agent_attorney_city: {
        type: Sequelize.STRING
      },
      agent_attorney_state: {
        type: Sequelize.STRING
      },
      job_title: {
        type: Sequelize.STRING
      },
      soc_code: {
        type: Sequelize.STRING
      },
      soc_name: {
        type: Sequelize.STRING
      },
      naics_code: {
        type: Sequelize.INTEGER
      },
      total_workers: {
        type: Sequelize.INTEGER
      },
      new_employment: {
        type: Sequelize.INTEGER
      },
      continued_employment: {
        type: Sequelize.INTEGER
      },
      change_previous_employment: {
        type: Sequelize.INTEGER
      },
      new_concurrent_employment: {
        type: Sequelize.INTEGER
      },
      change_employer: {
        type: Sequelize.INTEGER
      },
      amended_petition: {
        type: Sequelize.INTEGER
      },
      full_time_position: {
        type: Sequelize.STRING
      },
      prevailing_wage: {
        type: Sequelize.BIGINT
      },
      pw_unit_of_pay: {
        type: Sequelize.STRING
      },
      pw_wage_level: {
        type: Sequelize.STRING
      },
      pw_source: {
        type: Sequelize.STRING
      },
      pw_source_year: {
        type: Sequelize.INTEGER
      },
      pw_source_other: {
        type: Sequelize.STRING
      },
      wage_rate_of_pay_from: {
        type: Sequelize.BIGINT
      },
      wage_rate_of_pay_to: {
        type: Sequelize.BIGINT
      },
      wage_unit_of_pay: {
        type: Sequelize.STRING
      },
      h1b_dependent: {
        type: Sequelize.STRING
      },
      willful_violator: {
        type: Sequelize.STRING
      },
      support_h1b: {
        type: Sequelize.STRING
      },
      labor_con_agree: {
        type: Sequelize.STRING
      },
      public_disclosure_location: {
        type: Sequelize.STRING
      },
      worksite_city: {
        type: Sequelize.STRING
      },
      worksite_county: {
        type: Sequelize.STRING
      },
      worksite_state: {
        type: Sequelize.STRING
      },
      worksite_postal_code: {
        type: Sequelize.STRING
      },
      original_cert_date: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('h1b2017s');
  }
};
