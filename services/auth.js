import gql from "graphql-tag";

export default {
  async REGISTER({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
              mutation {
                REGISTER(
                  fullname: "${payload.fullname}",
                  email: "${payload.email}",
                  phone: "${payload.phone}",
                  password: "${payload.password}"
                ) {
                  user {
                    id
                    email
                    token
                    email_verified
                  }
                  clinic {
                    id
                    name
                  }
                  branchs {
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
            `
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
        mutation {
          LOGIN(email: "${payload.email}", password: "${payload.password}") {
            user {
              id
              fullname
              email
              token
              email_verified
            }
            clinic {
              id
              name
            }
            branchs {
                id
                address
            }
            errors {
              key
              message
            }
          }
        }
      `
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
