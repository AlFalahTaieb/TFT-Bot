const Discord = require('discord.js')
var moviesFile = require('./movies')
const axios = require('axios')
const bot = new Discord.Client()

const token = process.env.DISCORD_TOKEN
const movies = moviesFile.movies


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})


getUser = async (randomMovie, letterboxUrl) => {
  try {
    const body = await axios.get(`https://www.omdbapi.com/?apikey=d8c25d63&t=${randomMovie}`)
    return {
      Title: body.data.Title,
      Year: body.data.Year,
      Rated: body.data.Rated,
      Plot: body.data.Plot,
      Released: body.data.Released,
      Runtime: body.data.Runtime,
      Director: body.data.Director,
      Awards: body.data.Awards || '',
      Actors: body.data.Actors,
      Poster: body.data.Poster,
      Link: letterboxUrl
    }

  } catch (error) {
    console.error(error);
  }
}

bot.login(token)

// let chan = bot.channels.fetch("693168463346270222")
// .then(channel => console.log(channel.name))
//   .catch(console.error);


// bot.on('message',async message => {

//   // Check if the message was sent in the channel with the specified id.
//   if(message.channel.id === '693168463346270222'){
//     if(message.content.startsWith('ping')) {

//       // Get the channel to fetch the message from.
//       const channelToCheck = bot.channels.fetch("693168463346270222")
//       .then(channel => console.log(channel.name))
//         .catch(console.error);

//       // Fetch the last message from the mentioned channel.
//       channelToCheck.fetchMessages({ limit: 1 }).then(messages => {
//         const lastMessage = messages.first()
//         console.log(lastMessage.content)
//       }).catch(err => {
//         console.error(err)
//       })
//     }
//   }
// })
// console.log(getRandoMovie.Plot)
bot.on('message', async msg => {
  let randomMovie = movies[Math.floor(Math.random() * movies.length)]
  console.log(randomMovie)
  let letterboxDTitle = randomMovie.replace(/\s/g, "-").replace(":", "").replace("'", "").toLocaleLowerCase()
  let letterboxUrl = 'https://letterboxd.com/film/' + letterboxDTitle
  let getRandoMovie = await getUser(randomMovie, letterboxUrl)
  let ytsLink = `https://yts.ms/movie/${letterboxDTitle}-${getRandoMovie.Year}`
  console.log(ytsLink)
  // var myString = 'watchlist kenza';

  var myWord = '!watchlist'
  var wishList = new RegExp('(' + myWord + ')\\W.*', 'i');
  wishList.test(msg.content)

  if (msg.content === 'ping') {

    let embed = new Discord.MessageEmbed()
      .setThumbnail(getRandoMovie.Poster)
      .setColor(0x00AE86)
      .setTitle(getRandoMovie.Title)
      .setDescription(getRandoMovie.Plot)
      .addField("Year: ", getRandoMovie.Year, true)
      .addField("Director: ", getRandoMovie.Director, true)
      .addField("Runtime: ", getRandoMovie.Runtime, true)
      .addField("Rated: ", getRandoMovie.Rated, true)
      .addField("Actors: ", getRandoMovie.Actors, true)
      .addField('Torrent Link: ', ytsLink)
      // .addFileds(
      //   {name: "Actors: ",  value: getRandoMovie.Actors,  inline: true},
      //   {name: "Director: ",value: getRandoMovie.Director,inline:   true},
      //   {name: "Runtime: ", value:  getRandoMovie.Runtime,inline:   true},
      //   {name: "Rated: ",   value:  getRandoMovie.Rated,  inline: true},
      // )
      .setURL(letterboxUrl)
    // .setFooter('Download',ytsLink)

    msg.reply(embed)
    // msg.reply(`TO DOWNLOAD FOLLOW THIS LINK: ${ytsLink}`)
  }
  else if (msg.content == myWord) {
    // var matchWord = msg.content.match(wishList)
    // // console.log(a.test(myString))
    // let user = matchWord[0].substring(10).trim()
    let users = {
      user1: {
        name: 'mohamedjd56',
        discordName: 'majaouadi'
      },
      user2: {
        name: 'mangaaddict',
        discordName: 'MangaAddict'
      },
      user3: {
        name: 'Malikhf',
        discordName: 'Malek'
      },
      user4: {
        name: 'donniek',
        discordName: 'KenzaZ'
      },
      user5: {
        name: 'g3nzo',
        discordName: 'Taiieb'
      },
      user6: {
        name: 'ysn',
        discordName: 'Yassine'
      }
    }

    console.log(users.user1.name)
    let embedwatchList = new Discord.MessageEmbed()
    // .setThumbnail(getRandoMovie.Poster)
    .setColor(0x00AE86)
    .setTitle('🍿 COMMUNITY WATCHLIST 🍿')
    .setURL('https://letterboxd.com/g3nzo/list/tunisianfilmtwitter-movie-watchlist/')
    .addField(users.user5.discordName, `https://letterboxd.com/${users.user5.name}/watchlist/`)
    .addField(users.user4.discordName, `https://letterboxd.com/${users.user4.name}/watchlist/`)
    .addField(users.user3.discordName, `https://letterboxd.com/${users.user3.name}/watchlist/`)
    .addField(users.user1.discordName, `https://letterboxd.com/${users.user1.name}/watchlist/`)
    .addField(users.user2.discordName, `https://letterboxd.com/${users.user2.name}/watchlist/`)
    .addField(users.user6.discordName, `https://letterboxd.com/${users.user6.name}/watchlist/`)

    // .addField('Torrent Link: ', ytsLink)
    // let userWatchlist = `https://letterboxd.com/${user}/watchlist/`
    msg.reply(embedwatchList)
  }
})
// bot.on("error", (e) => console.error(e))
// bot.on("warn", (e) => console.warn(e))
// bot.on("debug", (e) => console.info(e))
// console.log(chan)