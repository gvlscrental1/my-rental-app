/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTenantApplication = /* GraphQL */ `
  mutation CreateTenantApplication(
    $input: CreateTenantApplicationInput!
    $condition: ModelTenantApplicationConditionInput
  ) {
    createTenantApplication(input: $input, condition: $condition) {
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
export const updateTenantApplication = /* GraphQL */ `
  mutation UpdateTenantApplication(
    $input: UpdateTenantApplicationInput!
    $condition: ModelTenantApplicationConditionInput
  ) {
    updateTenantApplication(input: $input, condition: $condition) {
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
export const deleteTenantApplication = /* GraphQL */ `
  mutation DeleteTenantApplication(
    $input: DeleteTenantApplicationInput!
    $condition: ModelTenantApplicationConditionInput
  ) {
    deleteTenantApplication(input: $input, condition: $condition) {
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
