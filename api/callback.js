
import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing code from Twitter OAuth redirect.");
  }

  const client_id = process.env.TWITTER_CLIENT_ID;
  const client_secret = process.env.TWITTER_CLIENT_SECRET;
  const redirect_uri = "https://princess-takeover.vercel.app/api/callback";
  const code_verifier = "simple-code-verifier";

  try {
    const tokenResponse = await axios.post("https://api.twitter.com/2/oauth2/token", null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        code,
        grant_type: "authorization_code",
        client_id,
        redirect_uri,
        code_verifier
      }
    });

    const { access_token } = tokenResponse.data;

    await axios.post("https://api.twitter.com/1.1/account/update_profile.json", null, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: {
        description: "Just got taken over by my Princess 👑"
      }
    });

    return res.status(200).send("Profile takeover complete 💖");
  } catch (err) {
    console.error("OAuth callback error:", err.response?.data || err.message);
    return res.status(500).send("Something went wrong during the Twitter takeover.");
  }
}
