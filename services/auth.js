import gql from "graphql-tag";

export default {
  REGISTER(apollo, payload) {
    return apollo.mutate({
      mutation: gql`
              mutation {
                Register(
                  fullname: ${payload.fullname}
                  email: ${payload.email}
                  phone: ${payload.phone}
                  password: ${payload.password}
                ) {
                  user {
                    id
                    email
                    token
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
  }
};
