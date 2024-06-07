require("dotenv").config()
const config = require('./config')
const express = require('express')
const app = express()
const port = 3000
const ROLE_ID = '1221457530102747229';

const Discord = require('djst-client')
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    prefix: config.prefix,
    initCommands: true
})

app.use('/', (req, res) => {
    res.send("Ini Halaman Pertama")
})
setTimeout(() => {
    console.log("server berjalan normal")
}, 5000);

// Help - list command
client.generateHelpCommand();

client.createCommand({
    category: 'admin',
    name: 'addrole',
    aliases: ['ar'],
    cooldown: 3,
    description: 'Menambahkan peran kepada pengguna',
    usage: '/addrole <username>',
    execute: async (message, args, bot) => {
        console.log('Command /addrole sedang dieksekusi.');
        // Memeriksa izin administrator
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            console.log('Pengguna tidak memiliki izin administrator.');
            return message.reply('Anda tidak memiliki izin untuk menggunakan perintah ini.');
        }

        // Mendapatkan nama pengguna dari argumen
        const username = args[0];
        if (!username) {
            console.log('Nama pengguna tidak ditemukan.');
            return message.reply('Harap masukkan nama pengguna.');
        }

        console.log('Nama pengguna:', username);

        // Mendapatkan member berdasarkan nama pengguna
        const member = message.guild.members.cache.find(member => member.user.email === username);
        if (!member) {
            console.log('Pengguna tidak ditemukan.');
            return message.reply(`Pengguna dengan nama pengguna ${username} tidak ditemukan.`);
        }

        console.log('Member ditemukan:', member.user.tag);

        // Mendapatkan peran berdasarkan ID
        const role = message.guild.roles.cache.get(ROLE_ID);
        if (!role) {
            console.log('Peran tidak ditemukan.');
            return message.reply(`Peran dengan ID ${ROLE_ID} tidak ditemukan.`);
        }

        console.log('Peran ditemukan:', role.name);

        // Menambahkan peran ke pengguna
        try {
            await member.roles.add(role);
            console.log('Peran berhasil ditambahkan.');
            message.reply(`Peran ${role.name} berhasil ditambahkan kepada pengguna ${member.user.username}.`);
        } catch (error) {
            console.error(error);
            console.log('Terjadi kesalahan:', error.message);
            message.reply(`Terjadi kesalahan saat menambahkan peran kepada pengguna ${member.user.username}.`);
        }
    }
});


client.createCommand({
    category: 'random',
    name: "hello",
    aliases: ['halo'],
    cooldown: 3,
    description: "Simple Command",
    execute: async (message, args, bot) => {
        message.channel.send("p aku masih idup bang")
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
            'Januari', 'Februari', 'Maret', 'April', 'Mei',
            'Juni', 'Juli', 'Agustus', 'September', 'Oktober',
            'November', 'Desember'
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
            bulan = bulan + 1
            bulan = bulan < 10 ? '0' + bulan : bulan
            let tahun = new Date().getFullYear()
            message.channel.send(`Sekarang tanggal ${tanggal}-${bulan}-${tahun}`)
        } catch (error) {
            message.channel.send(`bentar ada yang error`)
        }
    }
})

client.createCommand({
    category: 'waktu',
    name: 'prakerin',
    aliases: ['kapan prakerin selesai?'],
    cooldown: 2,
    description: 'tanya prakerin berapa hari lagi',
    execute: async (message, args, bot) => {
        const tanggalSekarang = new Date()
        const selesaiPrakerin = new Date('2024-04-30')
        const newSelesaiPrakerin = new Date('2024-04-08')
        const selisihHari = selesaiPrakerin - tanggalSekarang
        const newSelisihHari = newSelesaiPrakerin - tanggalSekarang
        const hasil = Math.ceil(selisihHari / (1000 * 3600 * 24))
        const newHasil = Math.ceil(newSelisihHari / (1000 * 3600 * 24))
        message.channel.send(`Prakerin mu sisa ${hasil} hari lagi eh apa ${newHasil} hari lagi ya 😋`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'puasa',
    aliases: ['kapan puasa'],
    description: 'tanya kapan puasa',
    cooldown: 2,
    execute: async (message, args, bot) => {
        const tanggalSekarang = new Date()
        const puasa = new Date('2024-03-10')
        const selisihHari = puasa - tanggalSekarang
        const hasil = Math.ceil(selisihHari / (1000 * 3600 * 24))
        message.channel.send(`Puasa ${hasil} hari lagi cooy 🤩`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'selesai-puasa',
    aliases: ['kapan selesai puasa'],
    description: 'tanya kapan selesai puasa',
    cooldown: 2,
    execute: async (message, args, bot) => {
        const tanggalSekarang = new Date()
        const puasa = new Date('2024-04-9')
        const selisihHari = puasa - tanggalSekarang
        const hasil = Math.ceil(selisihHari / (1000 * 3600 * 24))
        message.channel.send(`Puasa selesai ${hasil} hari lagi 😥`)
    }
})


client.createCommand({
    category: 'waktu',
    name: 'istirahat',
    aliases: ['kapan istirahat?'],
    cooldown: 2,
    description: 'tanya istirahat berapa hari lagi',
    execute: async (message, args, bot) => {
        const today = new Date()
        const istirahat = new Date()
        istirahat.setHours(12, 0, 0, 0)
        let itung = istirahat - today
        let hasil = Math.ceil(itung / (1000 * 60))
        let Hitungjam = hasil / 60
        let jam = Math.round(Hitungjam)
        // let hasil = 10
        if (hasil <= 0) {
            message.channel.send(`Istirahat mulu`)
        } else {
            message.channel.send(`Sabar istirahat masih sekitar ${jam} jam / ${hasil} menit lagi`)
        }
    }
})

client.createCommand({
    category: 'waktu',
    name: 'pulang',
    aliases: ['kapan pulang?'],
    description: 'tanya kapan pulang',
    cooldown: 2,
    execute: async (message, args, bot) => {
        const today = new Date()
        const pulang = new Date()
        pulang.setHours(16, 0, 0, 0)
        let itung = pulang - today
        let hasil = Math.ceil(itung / (1000 * 60))
        let hitungJam = hasil / 60
        let jam = Math.round(hitungJam)
        if (hasil <= 0) {
            message.channel.send("Lol kok masih di kantor???")
        } else {
            message.channel.send(`Pulang masih sekitar ${jam} jam / ${hasil} menit lagi`)
        }
    }
})

client.createCommand({
    category: 'random',
    name: 'tidur',
    aliases: ['mau tidur?'],
    description: 'tanya kapan tidur',
    cooldown: 2,
    execute: async (message, args, bot) => {
        message.channel.send(`tidur tidur KERJA`)
    }
})

client.createCommand({
    category: 'random',
    name: 'sholat',
    aliases: ['sholat?'],
    description: 'tanya kapan sholat',
    cooldown: 2,
    execute: async (message, args, bot) => {
        message.channel.send(`Gasss`)
    }
})

client.createCommand({
    category: 'random',
    name: 'tobat',
    aliases: ['tobat'],
    description: 'tanya tobat',
    cooldown: 2,
    execute: async (message, args, bot) => {
        message.channel.send(`Astaghfirullah`)
    }
})

client.createCommand({
    category: 'random',
    name: 'malas',
    aliases: ['malas'],
    description: 'JAngan malas',
    cooldown: 2,
    execute: async (message, args, bot) => {
        message.channel.send(`ril cuy`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'piket',
    aliases: ['siapa piket'],
    cooldown: 2,
    description: 'siapa piket',
    execute: async (message, args, bot) => {
        let date = new Date().getDay()
        date--
        console.log(date)
        const userId = ['1120290576223453266', '552810939460747264',
            '1169072843930214433', '870493155861102673']
        message.channel.send(`nih piket nih <@${userId[date]}>`)
    }
})

client.createCommand({
    category: 'waktu',
    name: 'besok-piket',
    aliases: ['besok piket'],
    cooldown: 2,
    description: 'siapa piket',
    execute: async (message, args, bot) => {
        try {
            let date = new Date().getDay()
            console.log(date)
            const userId = ['1120290576223453266', '552810939460747264',
                '1169072843930214433', '870493155861102673']
            message.channel.send(`nih besok piket nih <@${userId[date]}>`)
        } catch (error) {
            console.log(error)
        }
    }
})

// client.createCommand()

function sendScheduledMessage() {
    console.log("Mengecek waktu...");
    const targetHour = 16;
    const targetMinute = 0;

    const jamIstirahat = 12
    const menitIstirahat = 0

    const sahur = 3
    const menitSahur = 25

    const targetChannelId = '1170925839454584904'; // Ganti dengan ID saluran tujuan

    setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        let currentMinute = now.getMinutes();
        // cek perintah pulang
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
        // cek perintah pulang

        // Cek Perintah Istirahat
        if (currentHour == jamIstirahat && currentMinute == menitIstirahat) {
            console.log('waktunya kirim pesan istirahat')
            currentMinute = currentMinute < 10 ? '0' + currentMinute : currentMinute
            const targetChannel = client.channels.cache.get(targetChannelId)

            if (targetChannel) {
                targetChannel.send(`udah jam ${currentHour}:${currentMinute} ga pengen istirahat?`)
            } else {
                console.error("Gagal mengirim pesan")
            }
        }
        // Cek Perintah Istirahat

        // Cek Perintah sahur
        if (currentHour == sahur && currentMinute == menitSahur) {
            console.log('waktunya kirim pesan sahur')
            currentMinute = currentMinute < 10 ? '0' + currentMinute : currentMinute
            const targetChannel = client.channels.cache.get(targetChannelId)

            if (targetChannel) {
                targetChannel.send(`Pe Sahur Kang`)
            } else {
                console.error("Gagal mengirim pesan")
            }
        }
        // Cek Perintah sahur

    }, 45000); //periksa tiap 50 detik
}
const token = "MTE3Mjc5OTkwMzk0NTIxNjAxMQ.G5rkZZ.GHqXVKn-gOAIJ8D4qZgNYB2xr9JpaCUV-yQTIU"
client.login(token)
    .then(() => {
        console.log({ Message: { Status: true, Message: "Berhasil Login" } });
    })
    .catch(error => {
        console.error("Gagal login:", error);
    });


client.on('ready', () => {
    console.log("botnya udah ready")
    sendScheduledMessage()
})

app.listen(port, () => {
    console.log('express berhasil berjalan di port' + port)
})