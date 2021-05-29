import gql from "graphql-tag";
import AUTH_TYPES from "./auth";
import BRANCH_TYPES from "./branch";
import CLINIC_TYPES from "./clinic";
import ROLE_TYPES from "./role";
import USER_TYPES from "./user";

let TYPES = {
  ...AUTH_TYPES,
  ...BRANCH_TYPES,
  ...CLINIC_TYPES,
  ...ROLE_TYPES,
  ...USER_TYPES
};

export default {
  async MUTATION({ apollo, token, service, payload }) {
    return await apollo.mutate({
      mutation: gql`
        ${TYPES[service]}
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

  async QUERY({ apollo, token, service, payload }) {
    return await apollo.query({
      query: gql`
        ${TYPES[service]}
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
