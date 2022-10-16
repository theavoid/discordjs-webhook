const axios = require('axios');
const fs = require('fs');
const formData = require('form-data');

class WebhookClient {
    constructor(url) {
        this.url = url;
    }
    send(message, options) {
        if (!message) throw new Error('Message is not provided.');
        if (typeof message !== 'string') throw new TypeError('Message must be a string.');
        if (options && typeof options !== 'object') throw new TypeError('Options must be an object.');
        if (options && options.username && typeof options.username !== 'string') throw new TypeError('Username must be a string.');
        if (options && options.avatarURL && typeof options.avatarURL !== 'string') throw new TypeError('Avatar URL must be a string.');
        if (options && options.tts && typeof options.tts !== 'boolean') throw new TypeError('TTS must be a boolean.');
        if (options && options.embeds && !Array.isArray(options.embeds)) throw new TypeError('Embeds must be an array.');
        if (options && options.embeds) {
            options.embeds.forEach(embed => {
                if (embed && embed.title && typeof embed.title !== 'string') throw new TypeError('Embed title must be a string.');
                if (embed && embed.description && typeof embed.description !== 'string') throw new TypeError('Embed description must be a string.');
                if (embed && embed.url && typeof embed.url !== 'string') throw new TypeError('Embed URL must be a string.');
                if (embed && embed.timestamp && typeof embed.timestamp !== 'string') throw new TypeError('Embed timestamp must be a string.');
                if (embed && embed.color && typeof embed.color == 'string') {
                    if (embed.color.startsWith('#')) embed.color = parseInt(embed.color.replace('#', ''), 16);
                    else embed.color = parseInt(embed.color, 16);
                }
                if (embed && embed.footer && embed.footer.text && typeof embed.footer.text !== 'string') throw new TypeError('Embed footer text must be a string.');
                if (embed && embed.footer && embed.footer.iconURL && typeof embed.footer.iconURL !== 'string') throw new TypeError('Embed footer icon URL must be a string.');
                if (embed && embed.image && embed.image.url && typeof embed.image.url !== 'string') throw new TypeError('Embed image URL must be a string.');
                if (embed && embed.thumbnail && embed.thumbnail.url && typeof embed.thumbnail.url !== 'string') throw new TypeError('Embed thumbnail URL must be a string.');
                if (embed && embed.author && embed.author.name && typeof embed.author.name !== 'string') throw new TypeError('Embed author name must be a string.');
                if (embed && embed.author && embed.author.url && typeof embed.author.url !== 'string') throw new TypeError('Embed author URL must be a string.');
                if (embed && embed.author && embed.author.iconURL && typeof embed.author.iconURL !== 'string') throw new TypeError('Embed author icon URL must be a string.');
                if (embed && embed.fields && !Array.isArray(embed.fields)) throw new TypeError('Embed fields must be an array.');
                if (embed && embed.fields) {
                    embed.fields.forEach(field => {
                        if (field && field.name && typeof field.name !== 'string') throw new TypeError('Embed field name must be a string.');
                        if (field && field.value && typeof field.value !== 'string') throw new TypeError('Embed field value must be a string.');
                        if (field && field.inline && typeof field.inline !== 'boolean') throw new TypeError('Embed field inline must be a boolean.');
                    });
                }
            });
        }

        if (options && options.files) {

            if (!Array.isArray(options.files)) throw new TypeError('Files must be an array.');
            if (options.files.length > 10) throw new Error('You can only send 10 files at once.');
            if (options.files.length < 1) throw new Error('You must send at least 1 file.');
            if (options.files.length > 1 && options.embeds) throw new Error('You cannot send embeds with multiple files.');

            for (let i = 0; i < options.files.length; i++) {
                if (!fs.existsSync(options.files[i])) throw new Error(`File ${options.files[i]} does not exist.`);
            }

            let form = new formData();
            for (let i = 0; i < options.files.length; i++) {
                form.append('file' + options.files[i], fs.createReadStream(options.files[i]));
            }
            form.append('payload_json', JSON.stringify({
                content: message,
                username: options && options.username ? options.username : undefined,
                avatar_url: options && options.avatarURL ? options.avatarURL : undefined,
                tts: options && options.tts ? options.tts : undefined,
                embeds: options && options.embeds ? options.embeds : undefined
            }));
    
    
            axios.post(this.url, form);    
        } else {
            axios.post(this.url, {
                content: message,
                username: options && options.username ? options.username : undefined,
                avatar_url: options && options.avatarURL ? options.avatarURL : undefined,
                tts: options && options.tts ? options.tts : undefined,
                embeds: options && options.embeds ? options.embeds : undefined
            });
        }
    }
    getWebhook() {
        let data = axios.get(this.url).then(res => res.data);
        return data;
    }
    modifyWebhook(options) {
        if (!options) throw new Error('Options are not provided.');
        if (typeof options !== 'object') throw new TypeError('Options must be an object.');
        if (options && options.avatar && typeof options.avatar !== 'string') throw new TypeError('Avatar must be a string.');
        if (options && options.channelID && typeof options.channelID !== 'string') throw new TypeError('Channel ID must be a string.');
        if (options && options.name && typeof options.name !== 'string') throw new TypeError('Name must be a string.');

        axios.patch(this.url, {
            avatar: options && options.avatar ? options.avatar : undefined,
            channel_id: options && options.channelID ? options.channelID : undefined,
            name: options && options.name ? options.name : undefined,
        });
    }
    deleteWebhook() {
        axios.delete(this.url, {Headers: {'Content-Type': 'application/json', 'X-Audit-Log-Reason': 'Deleted with discordjs-webhook'}});
    }
    editMessage(messageID, options) {
        if (!messageID) throw new Error('Message ID is not provided.');
        if (typeof messageID !== 'string') throw new TypeError('Message ID must be a string.');
        if (!options) throw new Error('Options are not provided.');
        if (typeof options !== 'object') throw new TypeError('Options must be an object.');
        if (options && options.content && typeof options.content !== 'string') throw new TypeError('Content must be a string.');
        if (options && options.embeds && !Array.isArray(options.embeds)) throw new TypeError('Embeds must be an array.');
        if (options && options.embeds) {
            options.embeds.forEach(embed => {
                if (embed && embed.title && typeof embed.title !== 'string') throw new TypeError('Embed title must be a string.');
                if (embed && embed.description && typeof embed.description !== 'string') throw new TypeError('Embed description must be a string.');
                if (embed && embed.url && typeof embed.url !== 'string') throw new TypeError('Embed URL must be a string.');
                if (embed && embed.color && typeof embed.color == 'string') {
                    if (embed.color.startsWith('#')) embed.color = parseInt(embed.color.replace('#', ''), 16);
                    else embed.color = parseInt(embed.color, 16);
                }
                if (embed && embed.footer && embed.footer.text && typeof embed.footer.text !== 'string') throw new TypeError('Embed footer text must be a string.');
                if (embed && embed.footer && embed.footer.iconURL && typeof embed.footer.iconURL !== 'string') throw new TypeError('Embed footer icon URL must be a string.');
                if (embed && embed.image && embed.image.url && typeof embed.image.url !== 'string') throw new TypeError('Embed image URL must be a string.');
                if (embed && embed.thumbnail && embed.thumbnail.url && typeof embed.thumbnail.url !== 'string') throw new TypeError('Embed thumbnail URL must be a string.');
                if (embed && embed.author && embed.author.name && typeof embed.author.name !== 'string') throw new TypeError('Embed author name must be a string.');
                if (embed && embed.author && embed.author.url && typeof embed.author.url !== 'string') throw new TypeError('Embed author URL must be a string.');
                if (embed && embed.author && embed.author.iconURL && typeof embed.author.iconURL !== 'string') throw new TypeError('Embed author icon URL must be a string.');
                if (embed && embed.fields && !Array.isArray(embed.fields)) throw new TypeError('Embed fields must be an array.');
                if (embed && embed.fields) {
                    embed.fields.forEach(field => {
                        if (field && field.name && typeof field.name !== 'string') throw new TypeError('Embed field name must be a string.');
                        if (field && field.value && typeof field.value !== 'string') throw new TypeError('Embed field value must be a string.');
                        if (field && field.inline && typeof field.inline !== 'boolean') throw new TypeError('Embed field inline must be a boolean.');
                    });
                }
            });
        }

        if (options && options.files) {
            if (!Array.isArray(options.files)) throw new TypeError('Files must be an array.');
            for (let i = 0; i < options.files.length; i++) {
                if (typeof options.files[i] !== 'string') throw new TypeError('Files must be an array of strings.');
            }

            let form = new formData();
            for (let i = 0; i < options.files.length; i++) {
                form.append('file' + options.files[i], fs.createReadStream(options.files[i]));
            }
            form.append('payload_json', JSON.stringify({
                content: options && options.content ? options.content : undefined,
                embeds: options && options.embeds ? options.embeds : undefined
            }));


            axios.patch(this.url + '/messages/' + messageID, form);
        } else {
            axios.patch(this.url + '/messages/' + messageID, {
                content: options && options.content ? options.content : undefined,
                embeds: options && options.embeds ? options.embeds : undefined
            });

        }
    }
    deleteMessage(messageID) {
        if (!messageID) throw new Error('Message ID is not provided.');
        if (typeof messageID !== 'string') throw new TypeError('Message ID must be a string.');

        axios.delete(`${this.url}/messages/${messageID}`);
    }
}

module.exports = WebhookClient;