/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTenantApplication = /* GraphQL */ `
  subscription OnCreateTenantApplication(
    $filter: ModelSubscriptionTenantApplicationFilterInput
    $owner: String
  ) {
    onCreateTenantApplication(filter: $filter, owner: $owner) {
      id
      adults {
        firstName
        lastName
        email
        phone
        ssn
        __typename
      }
      leaseTerm
      household {
        adults
        children
        __typename
      }
      rentalHistory {
        address
        from
        to
        contactName
        contactPhone
        contactEmail
        __typename
      }
      employmentHistory {
        employer
        from
        to
        supervisorName
        supervisorPhone
        supervisorEmail
        __typename
      }
      uploadedFiles
      _version
      _lastChangedAt
      _deleted
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateTenantApplication = /* GraphQL */ `
  subscription OnUpdateTenantApplication(
    $filter: ModelSubscriptionTenantApplicationFilterInput
    $owner: String
  ) {
    onUpdateTenantApplication(filter: $filter, owner: $owner) {
      id
      adults {
        firstName
        lastName
        email
        phone
        ssn
        __typename
      }
      leaseTerm
      household {
        adults
        children
        __typename
      }
      rentalHistory {
        address
        from
        to
        contactName
        contactPhone
        contactEmail
        __typename
      }
      employmentHistory {
        employer
        from
        to
        supervisorName
        supervisorPhone
        supervisorEmail
        __typename
      }
      uploadedFiles
      _version
      _lastChangedAt
      _deleted
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteTenantApplication = /* GraphQL */ `
  subscription OnDeleteTenantApplication(
    $filter: ModelSubscriptionTenantApplicationFilterInput
    $owner: String
  ) {
    onDeleteTenantApplication(filter: $filter, owner: $owner) {
      id
      adults {
        firstName
        lastName
        email
        phone
        ssn
        __typename
      }
      leaseTerm
      household {
        adults
        children
        __typename
      }
      rentalHistory {
        address
        from
        to
        contactName
        contactPhone
        contactEmail
        __typename
      }
      employmentHistory {
        employer
        from
        to
        supervisorName
        supervisorPhone
        supervisorEmail
        __typename
      }
      uploadedFiles
      _version
      _lastChangedAt
      _deleted
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
