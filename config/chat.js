<script>
const tokenProvider = new Chatkit.TokenProvider({
  url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/68d8f2b5-f0f6-48c2-8235-997628c86d5a/token"
});

const chatManager = new Chatkit.ChatManager({
  instanceLocator: "v1:us1:68d8f2b5-f0f6-48c2-8235-997628c86d5a",
  userId: "becchat",
  tokenProvider: tokenProvider
});


</script>