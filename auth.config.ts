// This object will contain the configuration options for NextAuth.js

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // this redirect to the login page rather than next js own default protected page so override this 
  pages : { 
    signIn : '/login'
  },
callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // !! (double bang operator ) is used to convert it to boolean 
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
  
