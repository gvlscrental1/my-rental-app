import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerAdult = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly ssn?: string | null;
}

type LazyAdult = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly ssn?: string | null;
}

export declare type Adult = LazyLoading extends LazyLoadingDisabled ? EagerAdult : LazyAdult

export declare const Adult: (new (init: ModelInit<Adult>) => Adult)

type EagerHousehold = {
  readonly adults: number;
  readonly children: number;
}

type LazyHousehold = {
  readonly adults: number;
  readonly children: number;
}

export declare type Household = LazyLoading extends LazyLoadingDisabled ? EagerHousehold : LazyHousehold

export declare const Household: (new (init: ModelInit<Household>) => Household)

type EagerRentalHistory = {
  readonly address?: string | null;
  readonly from?: string | null;
  readonly to?: string | null;
  readonly contactName?: string | null;
  readonly contactPhone?: string | null;
  readonly contactEmail?: string | null;
}

type LazyRentalHistory = {
  readonly address?: string | null;
  readonly from?: string | null;
  readonly to?: string | null;
  readonly contactName?: string | null;
  readonly contactPhone?: string | null;
  readonly contactEmail?: string | null;
}

export declare type RentalHistory = LazyLoading extends LazyLoadingDisabled ? EagerRentalHistory : LazyRentalHistory

export declare const RentalHistory: (new (init: ModelInit<RentalHistory>) => RentalHistory)

type EagerEmploymentHistory = {
  readonly employer?: string | null;
  readonly from?: string | null;
  readonly to?: string | null;
  readonly supervisorName?: string | null;
  readonly supervisorPhone?: string | null;
  readonly supervisorEmail?: string | null;
}

type LazyEmploymentHistory = {
  readonly employer?: string | null;
  readonly from?: string | null;
  readonly to?: string | null;
  readonly supervisorName?: string | null;
  readonly supervisorPhone?: string | null;
  readonly supervisorEmail?: string | null;
}

export declare type EmploymentHistory = LazyLoading extends LazyLoadingDisabled ? EagerEmploymentHistory : LazyEmploymentHistory

export declare const EmploymentHistory: (new (init: ModelInit<EmploymentHistory>) => EmploymentHistory)

type EagerTenantApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TenantApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly adults: Adult[];
  readonly leaseTerm: string;
  readonly household: Household;
  readonly rentalHistory?: (RentalHistory | null)[] | null;
  readonly employmentHistory?: (EmploymentHistory | null)[] | null;
  readonly uploadedFiles?: (string | null)[] | null;
  readonly _version?: number | null;
  readonly _lastChangedAt?: number | null;
  readonly _deleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTenantApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TenantApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly adults: Adult[];
  readonly leaseTerm: string;
  readonly household: Household;
  readonly rentalHistory?: (RentalHistory | null)[] | null;
  readonly employmentHistory?: (EmploymentHistory | null)[] | null;
  readonly uploadedFiles?: (string | null)[] | null;
  readonly _version?: number | null;
  readonly _lastChangedAt?: number | null;
  readonly _deleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TenantApplication = LazyLoading extends LazyLoadingDisabled ? EagerTenantApplication : LazyTenantApplication

export declare const TenantApplication: (new (init: ModelInit<TenantApplication>) => TenantApplication) & {
  copyOf(source: TenantApplication, mutator: (draft: MutableModel<TenantApplication>) => MutableModel<TenantApplication> | void): TenantApplication;
}