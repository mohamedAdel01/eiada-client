import gql from "graphql-tag";

export default {
  async REGISTER(apollo, payload) {
    return await apollo.mutate({
      mutation: gql`
              mutation {
                Register(
                  fullname: "${payload.fullname}",
                  email: "${payload.email}",
                  phone: "${payload.phone}",
                  password: "${payload.password}"
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
