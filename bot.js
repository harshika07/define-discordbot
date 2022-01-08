require("dotenv").config();
const axios = require("axios");
const { Client, Intents, Message } = require("discord.js");

const prefix = "!";

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.on("messageCreate", function async(msg) {
  const command = msg.content.slice(prefix.length).trim().split(/ +/g);

  const final_command = command.toString().toLowerCase();

  let getMeaning = async () => {
    try {
      let respons = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${final_command}`
      );

      let data = await respons.data[0].meanings[0].definitions[0].definition;
      return data;
    } catch (err) {
      console.error(err);
      msg.channel.send("no definition found");
    }
  };

  if (msg.content.startsWith(prefix)) {
    (async () => {
      let meaningValue = await getMeaning();
      let means = JSON.stringify(meaningValue);
      means = JSON.parse(means);
      msg.channel.send(means);
    })();
  }
});

bot.login(process.env.BOT_TOKEN);
