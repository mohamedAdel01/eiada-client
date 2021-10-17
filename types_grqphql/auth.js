export default {
  REGISTER: () => `
    mutation(
      $name: String!
      $email: String!
      $phone: String!
      $password: String!
    ) {
      REGISTER(
        name: $name
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
  VERIFY_EMAIL: () => `
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
  RESEND_VERIFICATION_EMAIL: () => `
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
  LOGIN: () => `
  mutation($email: String!, $password: String!) {
    LOGIN(email: $email, password: $password) {
      user {
        id
        name
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
  FORGET_PASSWORD_REQUREST: () => `
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
  CHANGE_PASSWORD: () => `
  mutation($new_password: String!, $verification_code: String!) {
    CHANGE_PASSWORD(
      new_password: $new_password
      verification_code: $verification_code
    ) {
      message
      errors {
        key
        message
      }
    }
  }
  `
};
