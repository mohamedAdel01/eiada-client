import gql from "graphql-tag";

export default {
  async CREATE_CLINIC({ apollo, token }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          CREATE_CLINIC(name: "${payload.name}") {
            clinic {
              name
              owner {
                id
                fullname
                email
              }
            }
            message
            errors {
              key
              message
            }
          }
        }
      `,
      variables: {},
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  }
};
