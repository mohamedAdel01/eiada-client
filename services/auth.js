import gql from "graphql-tag";

export default {
  async REGISTER({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation(
          $fullname: String!
          $email: String!
          $phone: String!
          $password: String!
        ) {
          REGISTER(
            fullname: $fullname
            email: $email
            phone: $phone
            password: $password
          ) {
            user {
              id
              email
              token
              role
              email_verified
            }
            clinic {
              id
              name
            }
            branches {
              id
              address
            }
            errors {
              key
              message
            }
            message
          }
        }
      `,
      variables: {
        ...payload
      }
    });
  },

  async VERIFY_EMAIL({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          VERIFY_EMAIL(verification_code: "${payload}") {
            message
            errors {
              key
              message
            }
          }
        }
      `
    });
  },

  async RESEND_VERIFICATION_EMAIL({ apollo, token }) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          RESEND_VERIFICATION_EMAIL {
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
  },

  async LOGIN({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation($email: String!, $password: String!) {
          LOGIN(email: $email, password: $password) {
            user {
              id
              fullname
              email
              token
              role
              email_verified
            }
            clinic {
              id
              name
            }
            branches {
              id
              address
            }
            errors {
              key
              message
            }
          }
        }
      `,
      variables: {
        ...payload
      }
    });
  },

  async FORGET_PASSWORD_REQUREST({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
      mutation {
        FORGET_PASSWORD_REQUREST(email:"${payload.email}"){
          message
          errors {
            key
            message
          }
        }
      }
      `
    });
  },

  async CHANGE_PASSWORD({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          CHANGE_PASSWORD(
            new_password: "${payload.new_password}"
            verification_code: "${payload.code}"
          ) {
            message
            errors {
              key
              message
            }
          }
        }
      `
    });
  }
};
