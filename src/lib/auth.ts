import type { NextAuthOptions, Profile } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';

export type ExtendedProfile = Profile & {
	company?: string;
	id?: string;
	login?: string;
	username?: string;
};

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		})
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				const user = session.user as any;
				user.company  ??= token.company;
				user.id       ??= token.id;
				user.username ??= token.username;
			}
			return session;
		},
		async jwt({ profile, token }: { profile?: ExtendedProfile; token: JWT }) {
			// console.log('jwt:profile:', profile);
			// console.log('jwt:token:', token);
			token.company  ??= profile?.company;
			token.id       ??= profile?.id;
			token.username ??= profile?.login;
			return token;
		}
	}
}
