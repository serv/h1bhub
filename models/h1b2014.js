'use strict';
module.exports = (sequelize, DataTypes) => {
  const h1b2014 = sequelize.define(
    'h1b2014',
    {
      lca_case_number: DataTypes.STRING,
      status: DataTypes.STRING,
      lca_case_submit: DataTypes.DATE,
      decision_date: DataTypes.DATE,
      visa_class: DataTypes.STRING,
      lca_case_employment_start_date: DataTypes.DATE,
      lca_case_employment_end_date: DataTypes.DATE,
      lca_case_employer_name: DataTypes.STRING,
      lca_case_employer_address: DataTypes.STRING,
      lca_case_employer_city: DataTypes.STRING,
      lca_case_employer_state: DataTypes.STRING,
      lca_case_employer_postal_code: DataTypes.STRING,
      lca_case_soc_code: DataTypes.STRING,
      lca_case_soc_name: DataTypes.STRING,
      lca_case_job_title: DataTypes.STRING,
      lca_case_wage_rate_from: DataTypes.BIGINT,
      lca_case_wage_rate_to: DataTypes.BIGINT,
      lca_case_wage_rate_unit: DataTypes.STRING,
      full_time_pos: DataTypes.STRING,
      total_workers: DataTypes.INTEGER,
      lca_case_workloc1_city: DataTypes.STRING,
      lca_case_workloc1_state: DataTypes.STRING,
      pw_1: DataTypes.BIGINT,
      pw_unit_1: DataTypes.STRING,
      pw_source_1: DataTypes.STRING,
      other_wage_source_1: DataTypes.STRING,
      yr_source_pub_1: DataTypes.INTEGER,
      lca_case_workloc2_city: DataTypes.STRING,
      lca_case_workloc2_state: DataTypes.STRING,
      pw_2: DataTypes.BIGINT,
      pw_unit_2: DataTypes.STRING,
      pw_source_2: DataTypes.STRING,
      other_wage_source_2: DataTypes.STRING,
      yr_source_pub_2: DataTypes.STRING,
      lca_case_naics_code: DataTypes.INTEGER
    },
    {}
  );
  h1b2014.associate = function(models) {
    // associations can be defined here
  };
  return h1b2014;
};
