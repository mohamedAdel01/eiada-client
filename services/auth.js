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
        mutation($verification_code: String!) {
          VERIFY_EMAIL(verification_code: $verification_code) {
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
      }
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
    console.log(payload);
    return await apollo.mutate({
      mutation: gql`
        mutation($email: String!) {
          FORGET_PASSWORD_REQUREST(email: $email) {
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
      }
    });
  },

  async CHANGE_PASSWORD({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation($new_password: String!, $verification_code: String!) {
          CHANGE_PASSWORD(
            new_password: $new_password
            verification_code: $code
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
      }
    });
  }
};
