import gql from "graphql-tag";

export default {
  async CREATE_CLINIC({ apollo, token }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation($name: String!) {
          CREATE_CLINIC(name: $name) {
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
      variables: {
        ...payload
      },
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  }
};
