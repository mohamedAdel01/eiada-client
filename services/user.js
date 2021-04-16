import gql from "graphql-tag";

export default {
  async CREATE_USER({ apollo, token }, payload) {
    return await apollo.mutate({
      mutation: gql`
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
            message
            errors {
              key
              message
            }
          }
        }
      `,
      variables: {
        ...payload
      },
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  },
  async USERS({ apollo, token }) {
    return await apollo.query({
      query: gql`
        {
          USERS {
            fullname
            email
          }
        }
      `,
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  }
};
