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
      Link: letterboxUrl,
      Genre: body.data.Genre
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

  let myWord = '!watchlist'
  let movieDetail = '!moviedetail'
  let wishList = new RegExp('(' + myWord + ')\\W.*', 'i')

  getTheText = (word, message) => {

    let wishList = new RegExp('(' + word + ')\\W.*', 'i')
    var matchWord = message.match(wishList)
    // let text = matchWord[0].substring(10).trim()
    let text = matchWord[0].toLowerCase().replace(word, '').trim();
    return text
  }
  checkifExist = (example, message) => {
    let wishList = new RegExp('(' + example + ')\\W.*', 'i')
    return wishList.test(message)
  }
  wishList.test(msg.content)

  if (msg.content === '!blindpick' && (msg.channel.id === '693591361730904166' || msg.channel.id === '693757637174624297')) {

    let embed = new Discord.MessageEmbed()
      .setThumbnail(getRandoMovie.Poster)
      .setColor(0x00AE86)
      .setTitle(getRandoMovie.Title)
      .setDescription(getRandoMovie.Plot)
      .addField("Year: ", getRandoMovie.Year, true)
      .addField("Director: ", getRandoMovie.Director, true)
      .addField("Runtime: ", getRandoMovie.Runtime, true)
      .addField("Genre: ", getRandoMovie.Genre, true)
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
  else if (msg.content == myWord && (msg.channel.id === '693591361730904166' || msg.channel.id==='693757637174624297'))  {
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
  else if (checkifExist(movieDetail, msg.content) && (msg.channel.id === '693591361730904166' || msg.channel.id==='693757637174624297')) {
    console.log(getTheText(movieDetail, msg.content))
    let movie = getTheText(movieDetail, msg.content)
    let letterboxFormatedURl = 'https://letterboxd.com/film/' + movie
    let detailMovie = await getUser(movie, letterboxFormatedURl)
    let movieFormated = movie.replace(/\s/g, "-").replace(":", "").replace("'", "").toLocaleLowerCase()
    let ytsLink = `https://yts.ms/movie/${movieFormated}-${detailMovie.Year}`
    let embed = new Discord.MessageEmbed()
      .setThumbnail(detailMovie.Poster)
      .setColor(0x00AE86)
      .setTitle(detailMovie.Title)
      .setDescription(detailMovie.Plot)
      .addField("Year: ", detailMovie.Year, true)
      .addField("Director: ", detailMovie.Director, true)
      .addField("Runtime: ", detailMovie.Runtime, true)
      .addField("Rated: ", detailMovie.Rated, true)
      .addField("Actors: ", detailMovie.Actors, true)
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
    // console.log('HEEEEEEEEEEEY')

  } else if (msg.content == '!Coppola' && (msg.channel.id === '693591361730904166' || msg.channel.id==='693757637174624297')) {
    console.log(msg.channel.id)
    let Messages=[
      'I think cinema, movies, and magic have always been closely associated. The very earliest people who made film were magicians.',
      'I was always the black sheep of the family and always told that I was dumb, and I had a low IQ and did badly in school.',
      'Art depends on luck and talent.',
      'You have to really be courageous about your instincts and your ideas. Otherwise you’ll just knuckle under, and things that might have been memorable will be lost.',
      'Sound is your friend because sound is much cheaper than picture, but it has equal effect on the audience – in some ways, perhaps more effect because it does it in a very indirect way.',
      'That’s part of the requirement for me to be an artist is that you’re trying to share your personal existence with others and trying to illuminate modern life, trying to understand life.',
      'When that happens – when risk is taken and the filmmakers dive into the subject matter without a parachute – very often what you get is something with those qualities that make it age well with the public.',
      'I believe that filmmaking – as, probably, is everything – is a game you should play with all your cards, and all your dice, and whatever else you’ve got. So, each time I make a movie, I give it everything I have. I think everyone should, and I think everyone should do everything they do that way.',
      'I don’t think there’s any artist of any value who doesn’t doubt what they’re doing.',
      'Anyone who’s made film and knows about the cinema has a lifelong love affair with the experience. You never stop learning about film.',
      'The essence of cinema is editing. It’s the combination of what can be extraordinary images of people during emotional moments, or images in a general sense, put together in a kind of alchemy.',
      'A number of images put together a certain way become something quite above and beyond what any of them are individually.',
      'In a sense, I think a movie is really a little like a question and when you make it, that’s when you get the answer.',
      'I like to work in the morning. I like to sometimes go to a place where I’m all alone where I’m not going to get a phone call early that hurts my feelings, because once my feelings are hurt, I’m dead in the water.',
      'My film is not a movie; it’s not about Vietnam. It is Vietnam.',
      'Everything I do is personal. I have never made a movie that didn’t have very strong personal resonance.',
      'I wanted to be a film student again, as a man in my 60s. To go someplace alone and see what you can cook up, with non-existent budgets. I didn’t want to be surrounded by comforts and colleagues, which you have when you’re a big time director. I wanted to write personal works.',
      'I became quite successful very young, and it was mainly because I was so enthusiastic and I just worked so hard at it.',
      'The stuff that I got in trouble for, the casting for The Godfather or the flag scene in Patton, was the stuff that was remembered, and was considered the good work.',
      'Films and hotels have many aspects that are the same. For example, there is always a big vision, an idea.',
      'I just admire people like Woody Allen, who every year writes an original screenplay. It’s astonishing. I always wished that I could do that.',
      'To make great movies, there is an element of risk. You have to say, ‘Well, I am going to make this film, and it is not really a sure thing.',
      'You ought to love what you’re doing because, especially in a movie, over time you really will start to hate it.',
      'When I adapt a novel, I don’t really use the script, I use the book; when I did Apocalypse Now, I used Heart of Darkness. Novels usually have so much rich material.',
      'I like simplicity; I don’t need luxury.'
    ]
   let CopolaMessage= Messages[Math.floor(Math.random() * Messages.length)]
   msg.reply(CopolaMessage)
  }
  else if(msg.content =='!help' && (msg.channel.id === '693591361730904166' || msg.channel.id==='693757637174624297')){
    message = 'Oyez, oyez, braves gens, damoiselles et damoiseaux! Je suis votre modeste sérviteur: vous pouvez faire appel à moi grace à ces commandes : `!watchlist` pour voir la watchlist de tous les membres vous pouvez aussi faire !`blindpick` laissez le hasard choisir un film pour vous et si vous voulez des détails concernant un film faites !`moviedetail NOMDUFILM` et !`Coppola`'
  msg.reply(message)
  }
})
// bot.on("error", (e) => console.error(e))
// bot.on("warn", (e) => console.warn(e))
// bot.on("debug", (e) => console.info(e))
// console.log(chan)
