export default {
  CREATE_USER: () => `
  mutation(
    $email: String!
    $jop_title: String!
    $role_name: String!
    $branch_id: ID!
    $new_role: RoleInput!
  ) {
    CREATE_USER(
      email: $email
      jop_title: $jop_title
      role_name: $role_name
      branch_id: $branch_id
      new_role: $new_role
    ) {
      user{
        jop_title
        name
        email
      }
      message
      errors {
        key
        message
      }
    }
  }
`,
  USERS: response_schema => `
  query(
    $page: Int
    $limit: Int
    $role: String
  ){
    USERS(
      page: $page
      limit: $limit
      role: $role
    ) {
      ${
        response_schema
          ? response_schema
          : `
          users {
          id
          jop_title
          name
          email
        }
        total`
      }

    }
  }
`
};
