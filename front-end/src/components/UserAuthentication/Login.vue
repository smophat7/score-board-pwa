<template>
  <v-container>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <v-row>
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
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            ></v-text-field>
        </v-col>
        <v-col cols=12>
          <span v-if="error" class="red--text">{{error}}</span>
          <v-btn color="primary" type="submit" :disabled="!noValidationErrors" class="float-right">Log In</v-btn>
        </v-col>
        <v-col cols=12 class="text-right">
          <router-link to="/register" class="mr-5 no-account-link">Don't have an account?</router-link>
          <a @click="showResetPasswordDialog">Forgot password?</a>
        </v-col>
      </v-row>
    </form>
    <v-dialog
      v-model="resetPasswordDialog"
      width="500"
    >
      <v-card>
        <v-card-title v-if="!resetEmailSentSuccess" class="primary headline white--text">
          <span>Reset Password?</span>
        </v-card-title>
        <v-card-title v-else class="secondary headline white--text">
          <span>Reset Link Sent</span>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" v-if="resetError">
              <span class="red--text">{{resetError}}</span>
            </v-col>
            <v-col cols=12 v-if="!resetEmailSentSuccess">
              <v-text-field
                v-model="emailForReset"
                :error-messages="emailForResetErrors"
                label="Email"
                required
                @input="$v.emailForReset.$touch()"
                @blur="$v.emailForReset.$touch()"
                prepend-icon="mdi-email"
              ></v-text-field>
            </v-col>
            <v-col cols=12 v-if="resetEmailSentSuccess">
              <span>If there was an account associated with that email, a password reset email has been sent. If you don't see an email from noreply@scoreboard.games, note that it might be in your spam.</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeResetPasswordDialog">
            Close
          </v-btn>
          <v-btn @click="sendResetPasswordEmail" v-if="!resetEmailSentSuccess" color="primary" :disabled="!noResetValidationErrors">
            <v-progress-circular v-if="loadingResetPassword"
              indeterminate
              color="white"
            ></v-progress-circular>
            <span v-else>
              Send Reset Email
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
    emailForReset: { required, email },
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      error: null,
      resetPasswordDialog: false,
      emailForReset: "",
      loadingResetPassword: false,
      resetError: null,
      resetEmailSentSuccess: false,
    };
  },
  computed: {
    noValidationErrors() {
      return this.emailErrors.length === 0 && this.passwordErrors.length === 0;
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
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    noResetValidationErrors() {
      return this.emailForResetErrors.length === 0;
    },
    emailForResetErrors() {
      const errors = [];
      if (!this.$v.emailForReset.$dirty) return errors;
      !this.$v.emailForReset.email && errors.push("Must be valid e-mail");
      !this.$v.emailForReset.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {
    async submit() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace({ name: "Collection" });
      }
      catch(error) {
        this.error = error.message;
      }
    },
    async sendResetPasswordEmail() {
      this.loadingResetPassword = true;
      try {
        await firebase.auth().sendPasswordResetEmail(this.emailForReset);
        this.resetEmailSentSuccess = true;
      }
      catch(error) {
        this.resetError = error.message;
      }
      this.loadingResetPassword = false;
    },
    showResetPasswordDialog() {
      this.emailForReset = this.email;
      this.resetPasswordDialog = true;
    },
    closeResetPasswordDialog() {
      this.emailForReset = "";
      this.resetPasswordDialog = false;
      this.resetError = null;
      this.resetEmailSentSuccess = false;
    },
  },
};
</script>

<style scoped>

.no-account-link {
  text-decoration: none;
}

</style>