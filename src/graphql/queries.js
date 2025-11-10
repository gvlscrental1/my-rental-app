/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTenantApplication = /* GraphQL */ `
  query GetTenantApplication($id: ID!) {
    getTenantApplication(id: $id) {
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
export const listTenantApplications = /* GraphQL */ `
  query ListTenantApplications(
    $filter: ModelTenantApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTenantApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        leaseTerm
        uploadedFiles
        _version
        _lastChangedAt
        _deleted
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
