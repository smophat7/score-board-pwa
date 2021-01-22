<template>
  <v-container>
    <h1>Registration</h1>
    <form @submit.prevent="submit">
      <v-row>
        <v-col cols=12 sm=6>
          <v-text-field
            v-model="firstName"
            :error-messages="firstNameErrors"
            label="First Name"
            required
            @input="$v.firstName.$touch()"
            @blur="$v.firstName.$touch()"
            prepend-icon="mdi-badge-account-horizontal"
          ></v-text-field>
        </v-col>
        <v-col cols=12 sm=6>
          <v-text-field
            v-model="lastName"
            :error-messages="lastNameErrors"
            label="Last Name"
            required
            @input="$v.lastName.$touch()"
            @blur="$v.lastName.$touch()"
            prepend-icon="mdi-badge-account-horizontal"
          ></v-text-field>
        </v-col>
        <v-col cols=12>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            prepend-icon="mdi-email"
          ></v-text-field>
        </v-col>
        <v-col cols=12>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="passwordErrors"
            label="Password"
            required
            counter
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            ></v-text-field>
        </v-col>
        <v-col cols=12>
          <v-text-field
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            :error-messages="confirmPasswordErrors"
            label="Confirm Password"
            required
            counter
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
            prepend-icon="mdi-lock"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>
        </v-col>
        <v-col cols=12>
          <span v-if="registrationError" class="red--text">{{registrationError}}</span>
          <v-btn color="primary" type="submit" :disabled="!noValidationErrors" class="float-right">Register</v-btn>
        </v-col>
        <v-col cols=12 class="text-right">
          <router-link to="/login" class="login-link">Already have an account?</router-link>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>


<script>
import firebase from "firebase";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Register",
  mixins: [validationMixin],
  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: { sameAsPassword: sameAs("password") }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      // error: null,
    };
  },
  computed: {
    registrationError() {
      return this.$store.state.registerErrorMessage;
    },
    noValidationErrors() {
      return this.firstNameErrors.length === 0 &&
        this.lastNameErrors.length === 0 &&
        this.emailErrors.length === 0 &&
        this.passwordErrors.length === 0 && 
        this.confirmPasswordErrors.length === 0;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Passwords must match");
      return errors;
    }
  },
  methods: {
    async submit() {
      let newUserInfo = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      await this.$store.dispatch("registerNewUser", newUserInfo);
      if (this.$store.state.user.loggedIn) {
        this.$router.replace({ name: "Collection" });
      }
    }
  }
};
</script>

<style scoped>

.login-link {
  text-decoration: none;
}

</style>