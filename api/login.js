
export default async function handler(req, res) {
  const client_id = process.env.TWITTER_CLIENT_ID;
  const redirect_uri = "https://princess-takeover.vercel.app/api/callback";
  const state = Math.random().toString(36).substring(2);
  const code_challenge = state;
  const scope = "tweet.read tweet.write users.read offline.access";

  const twitterOAuthURL = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&code_challenge=${code_challenge}&code_challenge_method=plain`;

  res.redirect(twitterOAuthURL);
}
