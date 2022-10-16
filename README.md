# Discordjs Webhook
Simplified discord webhook posting library. 

## Installation
```
npm i discordjs-webhook
```

## Usage
```js
const WebhookClient = require('discordjs-webhook');
const client = new WebhookClient('https://discordapp.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz');
```

## Sending Message
```js
client.send('Hello, world!', {
    username: 'Webhook',
    avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    tts: false,
    embeds: [{
        title: 'Embed title',
        description: 'Embed description',
        url: 'https://discordapp.com',
        color: "#ced4da",
        footer: {
            text: 'Embed footer',
            iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        thumbnail: {
            url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        image: {
            url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
    }],
    files: ['./test.png', './wumpus.txt']
});
```

## Get Webhook
```js
client.getWebhook().then(data => console.log(data));

// Output
// {
//     type: 1,
//     id: '1031233915874185216',
//     name: 'Spidey Bot',
//     avatar: null,
//     channel_id: '1009745562792370256',
//     guild_id: '967172024990584903',
//     application_id: null,
//     token: 'eD6MypE8BFGh0EtexNisku0naJN9r2V-MrHXs4bF0E6dkZ9x3I6XVvnS6u5unsglCeFX'
// }
```

## Modify Webhook
```js
client.modifyWebhook({
    avatar: 'https://cdn.discordapp.com/avatars/1031233915874185216/8b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b.png',
    channelID: '1031233915874185216',
    name: 'test'
})
```

## Delete Webhook
```js
client.deleteWebhook();
```

## Edit Message
```js
client.editMessage('1031227722539733043', {
    content: 'Hello world!',
    embeds: [{
        title: 'Embed title',
        description: 'Embed description',
        url: 'https://discord.js.org',
        color: "#ced4da",
        footer: {
            text: 'Footer text',
            iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        thumbnail: {
            url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        image: {
            url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
    }],
    files: ['./test.png', './wumpus.txt']
})
```

## Delete Message
```js
client.deleteMessage('12345678990023623')
```


