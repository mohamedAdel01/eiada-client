import gql from "graphql-tag";

export default {
  async ROLES({ apollo, token }) {
    return await apollo.query({
      query: gql`
        {
          ROLES {
            name
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
