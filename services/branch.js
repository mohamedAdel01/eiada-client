export default {
  CREATE_BRANCHES: `
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
`
};
