# h1bhub

h1bhub provides you clean H1B data from 2014 to 2018 in local Postgresql database.

## Dependancies

- Docker
  - Postgresql
- Node v10.9.0

## Usage

### Preparing raw data

Run `$ ./scripts/download_raw_h1b_data.sh` to download the raw data.

This takes around 10 to 20 minutes.

### Instal Node dependencies

`$ npm i`

### Convert data from xlsx to JSON

#### Convert all years from 2014 to 2018.

This takes anywhere from half an hour to an hour.

`$ node scripts/convert-all-xlsx-json.js`

#### Convert a specific year

`$ node scripts/convert-all-xlsx-json.js [year]`

### Preparing local development database

First install Docker.

On Ubuntu, use these links

- [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/).
- [docker-compose](https://docs.docker.com/compose/install/#install-compose)

Then run the following to run the database in the development environment.

```
docker-compose down
docker-compose up
```

### Run Migrations

We have to prepare the tables in postgresql.

`$ node_modules/.bin/sequelize db:migrate`

### Load data

#### Load intermediary data

This takes around 10 minutes.

```
cat data/h1b-2014.json | PGPASSWORD=password psql -h localhost -p 5434 -U postgres test_h1bhub_pg -c "COPY temp_table_2014s (data) FROM STDIN;"
cat data/h1b-2015.json | PGPASSWORD=password psql -h localhost -p 5434 -U postgres test_h1bhub_pg -c "COPY temp_table_2015s (data) FROM STDIN;"
cat data/h1b-2016.json | PGPASSWORD=password psql -h localhost -p 5434 -U postgres test_h1bhub_pg -c "COPY temp_table_2016s (data) FROM STDIN;"
cat data/h1b-2017.json | PGPASSWORD=password psql -h localhost -p 5434 -U postgres test_h1bhub_pg -c "COPY temp_table_2017s (data) FROM STDIN;"
cat data/h1b-2018.json | PGPASSWORD=password psql -h localhost -p 5434 -U postgres test_h1bhub_pg -c "COPY temp_table_2018s (data) FROM STDIN;"
```

#### Load final data

Run sqls found under [`server/db/sql`](https://github.com/serv/h1bhub/tree/master/server/db/sql).

The connection info for the Docker Postgresql is the following.

```
Host: localhost
Port: 5434
Database: test_h1bhub_pg
User: postgres
Password: password
```

#### Read data

```
select * from h1b2014s limit 100;
select * from h1b2015s limit 100;
select * from h1b2016s limit 100;
select * from h1b2017s limit 100;
select * from h1b2018s limit 100;
```

##### Notes on the data

- 2014
  - There are 4 records that have unreasonably large values for `pw_1`,
    `pw_2`, `lca_case_wage_rate_to`, `lca_case_wage_rate_from`.

## Development

### Migration

#### Creating Migrations

See scripts/migrations.sh

- 2014
  - `node_modules/.bin/sequelize model:generate --name h1b2014 --attributes lca_case_number:string,status:string,lca_case_submit:date,decision_date:date,visa_class:string,lca_case_employment_start_date:date,lca_case_employment_end_date:date,lca_case_employer_name:string,lca_case_employer_address:string,lca_case_employer_city:string,lca_case_employer_state:string,lca_case_employer_postal_code:string,lca_case_soc_code:string,lca_case_soc_name:string,lca_case_job_title:string,lca_case_wage_rate_from:bigint,lca_case_wage_rate_to:bigint,lca_case_wage_rate_unit:string,full_time_pos:string,total_workers:integer,lca_case_workloc1_city:string,lca_case_workloc1_state:string,pw_1:bigint,pw_unit_1:string,pw_source_1:string,other_wage_source_1:string,yr_source_pub_1:integer,lca_case_workloc2_city:string,lca_case_workloc2_state:string,pw_2:bigint,pw_unit_2:string,pw_source_2:string,other_wage_source_2:string,yr_source_pub_2:string,lca_case_naics_code:integer`
- 2015
  - `node_modules/.bin/sequelize model:generate --name h1b2015 --attributes case_number:string,case_status:string,case_submitted:date,decision_date:date,visa_class:string,employment_start_date:date,employment_end_date:date,employer_name:string,employer_address1:string,employer_address2:string,employer_city:string,employer_state:string,employer_postal_code:string,employer_country:string,employer_province:string,employer_phone:bigint,employer_phone_ext:integer,agent_attorney_name:string,agent_attorney_city:string,agent_attorney_state:string,job_title:string,soc_code:string,soc_name:string,naic_code:integer,total_workers:integer,full_time_position:string,prevailing_wage:bigint,pw_unit_of_pay:string,pw_wage_level:string,pw_wage_source:string,pw_wage_source_year:integer,pw_wage_source_other:string,wage_rate_of_pay:string,wage_rate_of_pay_from:bigint,wage_rate_of_pay_to:bigint,h1b_dependent:string,willful_violator:string,worksite_city:string,worksite_county:string,worksite_state:string,worksite_postal_code:string`
- 2016
  - `node_modules/.bin/sequelize model:generate --name h1b2016 --attributes case_number:string,case_status:string,case_submitted:date,decision_date:date,visa_class:string,employment_start_date:date,employment_end_date:date,employer_name:string,employer_address:string,employer_city:string,employer_state:string,employer_postal_code:string,employer_country:string,employer_province:string,employer_phone:bigint,employer_phone_ext:integer,agent_attorney_name:string,agent_attorney_city:string,agent_attorney_state:string,job_title:string,soc_code:string,soc_name:string,naic_code:integer,total_workers:integer,full_time_position:string,prevailing_wage:bigint,pw_unit_of_pay:string,pw_wage_source:string,pw_source_year:integer,pw_source_other:string,wage_rate_of_pay_from:bigint,wage_rate_of_pay_to:bigint,wage_unit_of_pay:string,h1b_dependent:string,willful_violator:string,worksite_city:string,worksite_county:string,worksite_state:string,worksite_postal_code:string,original_cert_date:date`
- 2017
  - `node_modules/.bin/sequelize model:generate --name h1b2017 --attributes case_number:string,case_status:string,case_submitted:date,decision_date:date,visa_class:string,employment_start_date:date,employment_end_date:date,employer_name:string,employer_business_dba:string,employer_address:string,employer_city:string,employer_state:string,employer_postal_code:string,employer_country:string,employer_province:string,employer_phone:bigint,employer_phone_ext:integer,agent_representing_employer:string,agent_attorney_name:string,agent_attorney_city:string,agent_attorney_state:string,job_title:string,soc_code:string,soc_name:string,naics_code:integer,total_workers:integer,new_employment:integer,continued_employment:integer,change_previous_employment:integer,new_concurrent_employment:integer,change_employer:integer,amended_petition:integer,full_time_position:string,prevailing_wage:bigint,pw_unit_of_pay:string,pw_wage_level:string,pw_source:string,pw_source_year:integer,pw_source_other:string,wage_rate_of_pay_from:bigint,wage_rate_of_pay_to:bigint,wage_unit_of_pay:string,h1b_dependent:string,willful_violator:string,support_h1b:string,labor_con_agree:string,public_disclosure_location:string,worksite_city:string,worksite_county:string,worksite_state:string,worksite_postal_code:string,original_cert_date:date`
- 2018
  - `node_modules/.bin/sequelize model:generate --name h1b2018 --attributes case_number:string,case_status:string,case_submitted:date,decision_date:date,visa_class:string,employment_start_date:date,employment_end_date:date,employer_name:string,employer_business_dba:string,employer_address:string,employer_city:string,employer_state:string,employer_postal_code:string,employer_country:string,employer_province:string,employer_phone:bigint,employer_phone_ext:integer,agent_representing_employer:string,agent_attorney_name:string,agent_attorney_city:string,agent_attorney_state:string,job_title:string,soc_code:string,soc_name:string,naics_code:integer,total_workers:integer,new_employment:integer,continued_employment:integer,change_previous_employment:integer,new_concurrent_emp:integer,change_employer:integer,amended_petition:integer,full_time_position:string,prevailing_wage:bigint,pw_unit_of_pay:string,pw_wage_level:string,pw_source:string,pw_source_year:integer,pw_source_other:string,wage_rate_of_pay_from:bigint,wage_rate_of_pay_to:bigint,wage_unit_of_pay:string,h1b_dependent:string,willful_violator:string,support_h1b:string,labor_con_agree:string,public_disclosure_location:string,worksite_city:string,worksite_county:string,worksite_state:string,worksite_postal_code:string,original_cert_date:date`

#### Update Migration Files

- Change the columns `created_at` and `updated_at` to camelcases.
- Their default values should be `new Date()`.

## Contributors

- [@agmarcassa](https://twitter.com/agmarcassa)
