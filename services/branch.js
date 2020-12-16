import gql from "graphql-tag";

export default {
  async CREATE_BRANCHES({ apollo, token }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation($addresses: [BranchInput]) {
          CREATE_BRANCHES(addresses: $addresses) {
            branches {
              id
              address
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
        addresses: payload.addresses
      },
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  }
};
