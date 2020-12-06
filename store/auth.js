import ser from '@/services/auth'

export const state = () => ({
  user: null
});

export const mutations = {
  test(state, payload) {
    console.log("ppppp", payload);
    console.log("koooooo", state);
  }
};

export const actions = {
  test({ commit }, req) {
    let apollo = this.app.apolloProvider.defaultClient
    ser.tt(apollo)
    // this.app.apolloProvider.defaultClient.mutate({
    //   mutation: gql`
    //     mutation {
    //       Register(
    //         fullname: "radwa adel"
    //         email: "adelradwa44@gmail.com"
    //         phone: "+201116515446"
    //         password: "123456"
    //       ) {
    //         user {
    //           id
    //           email
    //           token
    //         }
    //         errors {
    //           key
    //           message
    //         }
    //         message
    //       }
    //     }
    //   `
    // });
    // console.log(this.app.apolloProvider.defaultClient.mutate);
  }
};
