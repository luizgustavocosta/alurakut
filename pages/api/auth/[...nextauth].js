import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Store from "../../../src/components/Store";
import {useContext} from "react";
import nookies, {parseCookies} from "nookies";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const userId = "";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user"
    })
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
  },

  jwt: {},

  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn(user, account, profile) {
      user.name = profile['login'];
      return true
    },
    // async redirect(url, baseUrl) {
    //   return baseUrl
    // },
    async session(session, user) {
      return session
    },
    // async jwt(token, user, account, profile, isNewUser) {
    //   return token
    // }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: 'auto',

  // Enable debug messages in the console if you are having problems
  debug: false,
})
