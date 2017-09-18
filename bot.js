  const Discord = require('discord.js');
const client = new Discord.Client();

const SteamCommunity = require('steamcommunity');
var community = new SteamCommunity();

const youtubedl = require('youtube-dl');
const fs = require('fs');

var whoppl = JSON.parse(fs.readFileSync('./texts/whois.json').toString("utf-8"));

const hiddenppl = {
  "god": "me",
  "england": "my city"
};

var everyone = everyone = Object.keys(whoppl).join(", ");
var helpdocs = JSON.parse(fs.readFileSync('./texts/helpdocs.json').toString("utf-8"));
var jokes = (fs.readFileSync('./texts/jokes.txt').toString("utf-8").split("\n"))
for (let i = 0; i < jokes.length; i++) {
  while (jokes[i].includes("//"))
  jokes[i] = jokes[i].replace("//","\n");
}

process.stdin.setEncoding('utf8');
var commands = {
  "UNKNOWN_COMMAND": function() {
    return "Unknown command. Type `help` for help.";
  },
  "reload": function() {
    whoppl = JSON.parse(fs.readFileSync('./texts/whois.json').toString("utf-8"));
    everyone = Object.keys(whoppl).join(", ");
    helpdocs = JSON.parse(fs.readFileSync('./texts/helpdocs.json').toString("utf-8"));
    jokes = (fs.readFileSync('./texts/jokes.txt').toString("utf-8").split("\n"))
    for (let i = 0; i < jokes.length; i++) {
      while (jokes[i].includes("//"))
      jokes[i] = jokes[i].replace("//","\n")
    }
    return "Reloaded.";
  }
};

process.stdin.on('data', (text) => {
  var stuff;
  while (text.indexOf('\n') !== -1 || text.indexOf('\r') !== -1 || text.indexOf('  ') !== -1) {
    text = text.replace(/\n|\r|\t/, '').replace(/  /, ' ');
  }
  var args = text.split(' ');
  //call a function with args. Maybe make a function list or something?
  var command = args[0].toLowerCase();
  var trip = false;
  for (var key in commands) {
    if (key === command) {
      trip = true;
      stuff = commands[key](args[1], args[2], args[3]);
      if (Array.isArray(stuff)) {
        // stuff.forEach(log);
      } else {
        console.log(stuff);
      }
    }
  }
  if (!trip) {
    stuff = commands.UNKNOWN_COMMAND();
    if (Array.isArray(stuff)) {
      for (var i = 0; i < stuff.length; i++) {
        console.log(stuff[i]);
      }
    } else {
      console.log(stuff);
    }
  }
});

function whois(person) {
  let trueppl = Object.assign({}, whoppl, hiddenppl);
  for (var key in trueppl) {
    if (person.toLowerCase() === key) {
      // console.log(key)
      return person + " is " + trueppl[key];
    }
  }
}



client.on('ready', () => {
  console.log('Connected and initialized.');
  // client.setGame(".");
});

function formatPrice(prices) {
  ret = "";
  for (var i = 0; i < (prices.length < 5 ? prices.length : 5); i++) {
    ret += prices[i].market_hash_name + " costs $" + (prices[i].price / 100) + "\n";
  }
  return ret;
}

function formatPrice25(prices) {
  ret = "";
  for (var i = 0; i < (prices.length < 25 ? prices.length : 25); i++) {
    ret += prices[i].market_hash_name + " costs $" + (prices[i].price / 100) + "\n";
  }
  return ret;
}

function removeAll(str, rep) {
  while (str.includes(rep) === true) {
    str = str.replace(rep, "");
  }
  return str;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFromList(list) {
  return list[getRandomInt(0, list.length)];
}

function game(args) {

}

var lastsent = Date.now();

client.on('message', message => {

  // console.log(message.author.id);

  // if (message.author.id == "117428625950638083") {
  //   message.delete();
  //   console.log(message.content);
  // }

  if (message.author.bot === true) {
    return;
  }
  // if (message.channel.name == "nazimod_talk") {
  //   return;
  // }

  var loc = message.channel;
  var msg = removeAll(message.content, "?");

  // console.log(msg.substring(0, "!info ".length).toLowerCase() === "!info ")

  var send = function(msg, opts) {
    if (lastsent + 1000 < Date.now()) {
      lastsent = Date.now();
      loc.send(msg, opts);
    } else {

    }
  };

  let mroles = message.member.roles.array();
  let ismod = false;
  for (let i = 0; i < mroles.length; i++) {
    if (mroles[i].name.includes("Mod")) {
      ismod = true;
    }
  }

  if (msg.toLowerCase().includes("drakemoon.com/promo-code/") || msg.toLowerCase().includes("puu.sh")) {
    message.delete();
    return;
  }

  if (msg.toLowerCase().includes("kms") || msg.toLowerCase().includes("kill myself")) {
    send("https://suicidepreventionlifeline.org/, unless that was sarcasm, in which case haha me too")
  }

  if (msg == "!info") {
    send("I'm a bot run by Charred. https://github.com/charredgrass/raocsgo-discord-bot");
  }
  if (msg == "!ping") {
    send("Pong.");
  }
  if (msg.toLowerCase().includes("osu")) {
    send("We get it, you're a weeb.")
  }
  if (msg.toLowerCase() === "!whatthefuck" || msg.toLowerCase() === "!what") {
    send("https://docs.google.com/document/d/1u0-YAZG7Rv7P9N94vKEGocvJccGlDvK2RZxWMcg8pDA/edit?usp=sharing")
  }
  if (msg.toLowerCase().includes("trap")) {
    send('Traps? Ask Kairu about our Grade A Traps today!');
  }
  if (msg.toLowerCase() === "who am i") {
    send("None of your business.");
  }
  if (msg.toLowerCase() === "what is love") {
    send("Something you'll never feel.");
  }
  if (msg.toLowerCase() === "who are you" || msg.toLowerCase() === "who is bot charred") {
    send("You're fucking retarded.");
    return;
  }
  if (msg.toLowerCase() === "who is 为什么" || msg.toLowerCase() === "who is weishenme") {
    send("\"为什么\"是小孩子");
    return;
  }
  if (msg.toLowerCase() === "who is your daddy") {
    send("Charred is my daddy");
    return;
  }
  if (msg.substring(0, "who is everyone".length).toLowerCase() === "who is everyone") {
    send(everyone + ", 为什么");
  }
  if (msg.substring(0, "who is ".length).toLowerCase() === "who is ") {
    // console.log(msg.substring("who is ".length))
    send(whois(msg.substring("who is ".length)));
  }
  if (msg.toLowerCase().includes("what is gambl")) {
    send("gamble is bad")
  }
  if (msg.substring(0, "!jokes".length).toLowerCase() === "!jokes") {
    if (message.channel.name === "bot_spam") {
      send(jokes.join("\n"))
    } else {
      send("Please only use this command in #bot_spam. :poop:")
    }
    return;
  }
  if (msg.substring(0, "!joke".length).toLowerCase() === "!joke") {
    if (msg.split(" ").length > 1) {
      let x = parseInt(msg.substring("!joke ".length));
      if (x && x - 1 < jokes.length) {
        if (x == 69) {
          // send("")
        } else {
          send(jokes[x - 1])
        }
      } else if (x && x != 69) {
        send("People who think the bot has an unlimited number of jokes.")
      }
    } else {
      send(getRandomFromList(jokes));
    }
  }
  if (msg.substring(0, "!music".length).toLowerCase() === "!music") {
    if (ismod === false) {
      send("You do not have permission.");
      return;
    }
    if (msg.substring("!music ".length) == "") {
      send("You must supply a URL")
      return;
    }
    toPlay = msg.substring("!music ".length);
    if (toPlay == "it's everyday bro") {
      toPlay = "http://dopefile.pk/mp3embed-ujje58ncqvlx.mp3"
    }
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          // const dispatcher = connection.playFile('./texts/rick.mp3');
          // dispatcher.on('end', () => {
          //   connection.disconnect();
          // });
          // connection.playArbitraryInput("http://here-and-now.info/audio/rickastley_artists.mp3")
          // connection.playArbitraryInput("https://www.youtube.com/watch?v=0jgrCKhxE1s")
          connection.playArbitraryInput(toPlay);
          // let vid = youtubedl(msg.substring("!music ".length));
          // let fn = ""
          // vid.on('info', function(info){fn=info._filename})
          // vid.on('end', function() {
          //   connection.playArbitraryInput(fn);
          // });
        })
        .catch(console.log);
    } else {
      message.reply('You must be in a voice channel.');
    }
  }
  if (msg.toLowerCase() == "!stopmusic") {
    for (let i = 0; i < client.voiceConnections.array().length; i++) {
      client.voiceConnections.array()[i].disconnect()
    }
  }
  if (msg.substring(0, "!priceof ".length).toLowerCase() === "!priceof ") {
    item = (msg.substring("!priceof ".length));
    community.marketSearch({
      query: item,
      appid: 730
    }, (err, items) => {
      if (err) {
        send(err.message);
      } else {
        send(formatPrice(items));
      }
    });
  }
  if (msg.substring(0, "!priceofdota ".length).toLowerCase() === "!priceofdota ") {
    item = (msg.substring("!priceofdota ".length));
    community.marketSearch({
      query: item,
      appid: 570
    }, (err, items) => {
      if (err) {
        send(err.message);
      } else {
        send(formatPrice(items));
      }
    });
  }
  if (msg.substring(0, "!priceoftf ".length).toLowerCase() === "!priceoftf ") {
    item = (msg.substring("!priceoftf ".length));
    community.marketSearch({
      query: item,
      appid: 440
    }, (err, items) => {
      if (err) {
        send(err.message);
      } else {
        send(formatPrice(items));
      }
    });
  }
  if (msg.substring(0, "!priceofpubg ".length).toLowerCase() === "!priceofpubg ") {
    item = (msg.substring("!priceofpubg ".length));
    community.marketSearch({
      query: item,
      appid: 578080
    }, (err, items) => {
      if (err) {
        send(err.message);
      } else {
        send(formatPrice(items));
      }
    });
  }
  //578080
  // if (msg.substring(0, "!price25 ".length).toLowerCase() === "!price25 ") {
  //   item = (msg.substring("!price25 ".length));
  //   community.marketSearch({
  //     query: item,
  //     appid: 730
  //   }, (err, items) => {
  //     if (err) {
  //       send(err.message);
  //     } else {
  //       send(formatPrice25(items));
  //     }
  //   });
  // }
  if (msg.substring(0, "!imgof ".length).toLowerCase() === "!imgof ") {
    item = (msg.substring("!imgof ".length));
    // console.log(item)
    if (item.toLowerCase() == "kairu") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://vignette1.wikia.nocookie.net/powerlisting/images/a/ad/Trap-image.png/revision/latest?cb=20160113212524")
      });
      return;
    } else if (item.toLowerCase() == "livid") {
      send("", {
        embed: new Discord.RichEmbed().setImage("https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/transoceanrig_600x400.jpg")
      });
      return;
    } else if (item.toLowerCase() == "dank") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://st.motortrend.com/uploads/sites/10/2015/11/2015-nissan-juke-sl-suv-angular-front.png?interpolation=lanczos-none&fit=around|300;199")
      });
      return;
    } else if (item.toLowerCase() == "yuna") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://i.imgur.com/5vDmod7.png")
      });
      return;
    } else if (item.toLowerCase() == "dank") {
      send("", {
        embed: new Discord.RichEmbed().setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mao_Zedong_portrait.jpg/330px-Mao_Zedong_portrait.jpg")
      });
      return;
    } else if (item.toLowerCase() == "truth") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://i.imgur.com/mquGuuk.png")
      });
      return;
    }
    community.marketSearch({
      query: item,
      appid: 730
    }, (err, items) => {
      if (err) {
        send(err.message);
      } else {
        send(items[0].market_hash_name, {
          embed: new Discord.RichEmbed().setImage(items[0].image)
        });
      }
    });
  }
  if (msg.substring(0, "!imgofpubg ".length).toLowerCase() === "!imgofpubg ") {
    item = (msg.substring("!imgofpubg ".length));
    // console.log(item)
    if (item.toLowerCase() == "kairu") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://vignette1.wikia.nocookie.net/powerlisting/images/a/ad/Trap-image.png/revision/latest?cb=20160113212524")
      });
      return;
    } else if (item.toLowerCase() == "livid") {
      send("", {
        embed: new Discord.RichEmbed().setImage("https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/transoceanrig_600x400.jpg")
      });
      return;
    } else if (item.toLowerCase() == "dank") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://st.motortrend.com/uploads/sites/10/2015/11/2015-nissan-juke-sl-suv-angular-front.png?interpolation=lanczos-none&fit=around|300;199")
      });
      return;
    } else if (item.toLowerCase() == "yuna") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://i.imgur.com/5vDmod7.png")
      });
      return;
    } else if (item.toLowerCase() == "dank") {
      send("", {
        embed: new Discord.RichEmbed().setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mao_Zedong_portrait.jpg/330px-Mao_Zedong_portrait.jpg")
      });
      return;
    } else if (item.toLowerCase() == "truth") {
      send("", {
        embed: new Discord.RichEmbed().setImage("http://i.imgur.com/mquGuuk.png")
      });
      return;
    }
    community.marketSearch({
      query: item,
      appid: 578080
    }, (err, items) => {
      if (err) {
        send(err.message);
      } else {
        send(items[0].market_hash_name, {
          embed: new Discord.RichEmbed().setImage(items[0].image)
        });
      }
    });
  }
  if (msg.substring(0, "!magic8 ".length).toLowerCase() === "!magic8 ") {
    var answers = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
    send(getRandomFromList(answers));
  }
  if (msg.substring(0, "!help".length).toLowerCase() === "!help") {
    var preargs = (msg.substring("!help".length).split(" "));
    args = [];
    for (var i = 0; i < preargs.length; i++) {
      if (preargs[i] === "") {
        //kill space
      } else {
        args.push(preargs[i]);
      }
    }
    // console.log(args)
    if (args.length === 0) {
      send("Valid commands: !help, !what, !priceof, !imgof, who is [person], !magic8, !info\nType \"!help help\" for more specific help.");
    } else if (args.length == 1) {
      // console.log([args[0]])
      if (helpdocs[args[0]]) {
        send(helpdocs[args[0]]);
      }
    } else {
      send("Unknown command. Type \"!help\" for help.");
    }
  }
});

client.login(fs.readFileSync('./key.txt').toString("utf-8"));