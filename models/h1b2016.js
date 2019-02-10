'use strict';
module.exports = (sequelize, DataTypes) => {
  const h1b2016 = sequelize.define(
    'h1b2016',
    {
      case_number: DataTypes.STRING,
      case_status: DataTypes.STRING,
      case_submitted: DataTypes.DATE,
      decision_date: DataTypes.DATE,
      visa_class: DataTypes.STRING,
      employment_start_date: DataTypes.DATE,
      employment_end_date: DataTypes.DATE,
      employer_name: DataTypes.STRING,
      employer_address: DataTypes.STRING,
      employer_city: DataTypes.STRING,
      employer_state: DataTypes.STRING,
      employer_postal_code: DataTypes.STRING,
      employer_country: DataTypes.STRING,
      employer_province: DataTypes.STRING,
      employer_phone: DataTypes.BIGINT,
      employer_phone_ext: DataTypes.INTEGER,
      agent_attorney_name: DataTypes.STRING,
      agent_attorney_city: DataTypes.STRING,
      agent_attorney_state: DataTypes.STRING,
      job_title: DataTypes.STRING,
      soc_code: DataTypes.STRING,
      soc_name: DataTypes.STRING,
      naic_code: DataTypes.INTEGER,
      total_workers: DataTypes.INTEGER,
      full_time_position: DataTypes.STRING,
      prevailing_wage: DataTypes.BIGINT,
      pw_unit_of_pay: DataTypes.STRING,
      pw_wage_source: DataTypes.STRING,
      pw_source_year: DataTypes.INTEGER,
      pw_source_other: DataTypes.STRING,
      wage_rate_of_pay_from: DataTypes.BIGINT,
      wage_rate_of_pay_to: DataTypes.BIGINT,
      wage_unit_of_pay: DataTypes.STRING,
      h1b_dependent: DataTypes.STRING,
      willful_violator: DataTypes.STRING,
      worksite_city: DataTypes.STRING,
      worksite_county: DataTypes.STRING,
      worksite_state: DataTypes.STRING,
      worksite_postal_code: DataTypes.STRING,
      original_cert_date: DataTypes.DATE
    },
    {}
  );
  h1b2016.associate = function(models) {
    // associations can be defined here
  };
  return h1b2016;
};
