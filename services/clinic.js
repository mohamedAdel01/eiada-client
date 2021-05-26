export default {
  CREATE_CLINIC: `
  mutation($name: String!) {
    CREATE_CLINIC(name: $name) {
      clinic {
        name
        owner {
          id
          fullname
          email
        }
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
