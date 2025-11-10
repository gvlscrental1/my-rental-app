// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TenantApplication, Adult, Household, RentalHistory, EmploymentHistory } = initSchema(schema);

export {
  TenantApplication,
  Adult,
  Household,
  RentalHistory,
  EmploymentHistory
};