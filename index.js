require("dotenv").config()
const config = require('./config')

const Discord = require('djst-client')
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    prefix: config.prefix,
    initCommands: true
})

var globalJam = new Date().getHours()
var globalMenit = new Date().getMinutes()
globalMenit = globalMenit < 10 ? '0' + globalMenit : globalMenit
var globalWaktu = `${globalJam}:${globalMenit}`
console.log(globalWaktu)

// Help - list command
client.generateHelpCommand();

if (globalWaktu == '17:06') {
    client.createCommand({
        name: 'tes',
        aliases: ['tes juga'],
        cooldown: 2,
        description: 'tes',
        execute: async (message, args, bot) => {
            message.channel.send('ayo pulang')
            console.log('sudah kekirim')
        }
    })
}

client.createCommand({
    category: 'random',
    name: "hello",
    aliases: ['halo'],
    cooldown: 3,
    description: "Simple Command",
    execute: async (message, args, bot) => {
        message.channel.send("Halooo")
    }
})

client.createCommand({
    category: 'random',
    name: 'keren',
    aliases: ['kamu keren'],
    cooldown: 2,
    description: 'ini keren',
    execute: async (message, args, bot) => {
        message.channel.send('Makasi bang')
    }
})

client.createCommand({
    category: 'waktu',
    name: "jam",
    aliases: ['jam berapa'],
    cooldown: 3,
    description: "Simple Command",
    execute: async (message, args, bot) => {
        let waktuSekarang = new Date();
        let jam = waktuSekarang.getHours();
        let menit = waktuSekarang.getMinutes();
        let sore = jam >= 12 ? 'PM' : 'AM';
        jam = jam % 12 || 12;
        menit = menit < 10 ? '0' + menit : menit;
        let waktuDiformat = `${jam}:${menit} ${sore}`;
        message.channel.send(`sekarang jam ${waktuDiformat}`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'hari',
    aliases: ['hari apa', 'hari apa?'],
    description: 'tanya hari',
    cooldown: 2,
    execute: async (message, args, bot) => {
        const date = new Date().getDay()
        let hari
        if (date == 1) {
            hari = "Senin"
        } else if (date == 2) {
            hari = "Selasa"
        } else if (date == 3) {
            hari = "Rabu"
        } else if (date == 4) {
            hari = "Kamis"
        } else if (date == 5) {
            hari = "Jumat"
        } else {
            hari = "Ga tau pokoknya libur"
        }
        message.channel.send(`Sekarang hari ${hari}`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'bulan',
    aliases: ['bulan apa', 'bulan apa?'],
    cooldown: 2,
    description: 'tanya bulan',
    execute: async (message, args, bot) => {
        let bulan = new Date().getMonth()
        let bulanApa = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ]
        let iniBulan = bulanApa[bulan]
        message.channel.send(`Sekarang bulan ${iniBulan}`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'tanggal',
    aliases: ['tanggal berapa', 'tanggal berapa?'],
    cooldown: 2,
    description: 'tanya tanggal lengkap',
    execute: async (message, args, bot) => {
        try {
            let tanggal = new Date().getDate()
            let bulan = new Date().getMonth()
            bulan = bulan < 10 ? '0' + bulan : bulan
            let tahun = new Date().getFullYear()
            message.channel.send(`Sekarang tanggal ${tanggal}-${bulan}-${tahun}`)
        } catch (error) {
            message.channel.send(`bentar ada yang error`)
        }
    }
})

function sendScheduledMessage() {
    console.log("Mengecek waktu...");
    const targetHour = 16;
    const targetMinute = 0;

    const targetChannelId = '1114363992933159055'; // Ganti dengan ID saluran tujuan

    setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        let currentMinute = now.getMinutes();

        if (currentHour === targetHour && currentMinute === targetMinute) {
            console.log("Waktunya mengirim pesan!");
            currentMinute = currentMinute < 10 ? '0' + currentMinute : currentMinute
            const targetChannel = client.channels.cache.get(targetChannelId);

            if (targetChannel) {
                targetChannel.send(`Sudah jam ${currentHour}:${currentMinute} ga pengen pulang?`);
                console.log('pesan sudah terkirim')
            } else {
                console.error("Saluran tidak ditemukan!");
            }
        }
    }, 45000); //periksa tiap 50 detik
}


client.on('ready', () => {
    console.log("botnya udah ready")
    sendScheduledMessage()
})

client.login(process.env.TOKEN)
