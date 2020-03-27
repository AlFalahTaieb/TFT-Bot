const Discord = require('discord.js')

const bot = new Discord.Client()

const token = process.env.DISCORD_TOKEN

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

// channel.fetchMessages({ limit: 1 }).then(messages => {
//   let lastMessage = messages.first()

//   if (!lastMessage.author.bot) {
// console.log(lastMessage)  }
// })
// .catch(console.error);

bot.login(token)

// let chan = bot.channels.fetch("693168463346270222")
// .then(channel => console.log(channel.name))
//   .catch(console.error);


  bot.on('message',async message => {

    // Check if the message was sent in the channel with the specified id.
    if(message.channel.id === '693168463346270222'){
      if(message.content.startsWith('ping')) {
  
        // Get the channel to fetch the message from.
        const channelToCheck = bot.channels.fetch("693168463346270222")
        .then(channel => console.log(channel.name))
          .catch(console.error);
  
        // Fetch the last message from the mentioned channel.
        channelToCheck.fetchMessages({ limit: 1 }).then(messages => {
          const lastMessage = messages.first()
          console.log(lastMessage.content)
        }).catch(err => {
          console.error(err)
        })
      }
    }
  })

// console.log(chan)