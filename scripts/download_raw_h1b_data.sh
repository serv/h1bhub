#!/bin/bash

mkdir -p data

# Files from https://www.foreignlaborcert.doleta.gov/performancedata.cfm#dis
wget -O data/h1b-2018.xlsx https://www.foreignlaborcert.doleta.gov/pdf/PerformanceData/2018/H-1B_Disclosure_Data_FY2018_Q4_EOY.xlsx
wget -O data/h1b-2017.xlsx https://www.foreignlaborcert.doleta.gov/pdf/PerformanceData/2017/H-1B_Disclosure_Data_FY17.xlsx
wget -O data/h1b-2016.xlsx https://www.foreignlaborcert.doleta.gov/docs/Performance_Data/Disclosure/FY15-FY16/H-1B_Disclosure_Data_FY16.xlsx
wget -O data/h1b-2015.xlsx https://www.foreignlaborcert.doleta.gov/docs/py2015q4/H-1B_Disclosure_Data_FY15_Q4.xlsx
wget -O data/h1b-2014.xlsx https://www.foreignlaborcert.doleta.gov/docs/py2014q4/H-1B_FY14_Q4.xlsx

