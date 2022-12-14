import { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	if (text.includes('http://') || text.includes('https://')) {
		if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
		try {
			let anu = await youtubeSearch(`${text}`)
			let ini_txt = `ð *${anu.video[0].title}*\n\n`
			ini_txt += `ðŠķ *Author :* ${anu.video[0].authorName}\n`
			ini_txt += `âēïļ *Published :* ${anu.video[0].publishedTime}\n`
			ini_txt += `â *Duration :* ${anu.video[0].durationH}\n`
			ini_txt += `ðïļ *Views :* ${anu.video[0].viewH}\n`
			ini_txt += `ð *Url :* ${anu.video[0].url}`
			conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.video[0].thumbnail.split("?")[0], [
				[`ð§ Audio`, `${usedPrefix}yta ${anu.video[0].url}`],
				[`ðĨ Video`, `${usedPrefix}ytv ${anu.video[0].url}`]
			], m)
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
				let ini_txt = `ð *${anu.title}*\n\n`
				ini_txt += `ðïļ *id :* ${anu.id}\n`
				ini_txt += `â *v_id :* ${anu.v_id}\n`
				ini_txt += `ð *Url :* ${args[0]}`
				conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.thumbnail, [
					[`ð§ Audio`, `${usedPrefix}yta ${args[0]}`],
					[`ðĨ Video`, `${usedPrefix}ytv ${args[0]}`]
				], m)
			} catch (e) {
				console.log(e)
				try {
					let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${global.api}&url=${text}`)
					let anu = await anu2.json()
					let ini_txt = `ð *${anu.result.title}*\n\n`
					ini_txt += `ðŠķ *Author :* ${anu.result.uploader}\n`
					ini_txt += `â *Duration :* ${anu.result.duration}\n`
					ini_txt += `ðïļ *Views :* ${anu.result.view}\n`
					ini_txt += `ð *Url :* https://youtu.be/${anu.result.id}`
					conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.result.thumbnail, [
						[`ð§ Audio`, `${usedPrefix}yta https://youtu.be/${anu.result.id}`],
						[`ðĨ Video`, `${usedPrefix}ytv https://youtu.be/${anu.result.id}`]
					], m)
				} catch (e) {
					console.log(e)
					try {
						let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${global.api}&url=${text}`)
						let anu = await anu2.json()
						let ini_txt = `ð *${anu.result.title}*\n`
						conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.result.thumbnail, [
							[`ð§ Audio`, `${usedPrefix}yta https://youtu.be/${anu.result.thumbnail.split('/')[4]}`],
							[`ðĨ Video`, `${usedPrefix}ytv https://youtu.be/${anu.result.thumbnail.split('/')[4]}`]
						], m)
					} catch (e) {
						console.log(e)
						try {
							const xa = require('xfarr-api')
							let anu = await xa.downloader.youtube(`${text}`)
							let ini_txt = `ð *${anu.title}*\n\n`
							ini_txt += `ðŠķ *Author :* ${anu.author}\n`
							ini_txt += `ðïļ *Username :* ${anu.username}\n`
							ini_txt += `ð *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
							conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, anu.thumbnail, [
								[`ð§ Audio`, `${usedPrefix}yta https://youtu.be/${anu.thumbnail.split('/')[4]}`],
								[`ðĨ Video`, `${usedPrefix}ytv https://youtu.be/${anu.thumbnail.split('/')[4]}`]
							], m)
						} catch (e) {
							console.log(e)
							m.reply(`Tidak ditemukan hasil.`)
						}
					}
				}
			}
		}
	} else {
		let p = Math.random()
		try {
			let anu = await youtubeSearch(`${text}`)
			if (p <= 0.5) {
				let array = [];
				anu.video.forEach(function(i) {
					array.push({
						title: `ðŊ ${i.title}`,
						rowId: usedPrefix + `yts ${i.url}`,
						description: `â°â âĒ ${i.authorName} | â° ${i.durationH}`
					});
				});
				const sections = [
					{
						title: `â â â â ã Youtube Search ã â â â â`,
						rows: array
					}
				]
				const listMessage = {
					text: `â â ã *YOUTUBE SEARCH* ã â â\n\n*Request From :* ${conn.getName(m.sender)}\n\n*Result :* ${text}`,
					footer: packname + ' - ' + author,
					//title: `ââââã ${packname} ãââââ`,
					buttonText: `List Result ðŦ`,
					sections
				}
				await conn.sendMessage(m.chat, listMessage, { quoted : m })
			} else {
				let ini_txt = `*Hasil : ${text}*`
				for (let i of anu.video) {
					ini_txt += `\n\nðŊ *${i.title}*\n`
					ini_txt += `ðŠķ Author : ${i.authorName}\n`
					ini_txt += `â° Duration : ${i.durationH}\n`
					if (i.publishedTime == undefined) {
						ini_txt += `ð Uploaded : ${i.publishedTime}\n`
					} else {
						if (i.publishedTime.split(" ")[0] != 'Streamed') {
							ini_txt += `ð Uploaded ${i.publishedTime}\n`
						} else {
							ini_txt += `ð ${i.publishedTime}\n`
						}
					}
					ini_txt += `ð View : ${i.viewH}\n`
					ini_txt += `ð Url : ${i.url}\n`
					ini_txt += `âââââââââââââââââââ`
				}
				conn.sendFile(m.chat, anu.video[0].thumbnail.split("?")[0], 'yts.jpg', ini_txt, m)
			}
		} catch (e) {
			console.log(e)
			try {
				let anu2 = await fetch(`https://api.lolhuman.xyz/api/ytsearch?apikey=${global.api}&query=${encodeURIComponent(text)}`)
				let anu = await anu2.json()
				if (p <= 0.5) {
					let array = [];
					anu.result.forEach(function(i) {
						array.push({
							title: `ðŊ ${i.title}`,
							rowId: usedPrefix + `yts https://youtu.be/${i.videoId}`,
							description: `â°â âĒ ${i.published} | ${i.views} ð`
						});
					});
					const sections = [
						{
							title: `â â â â ã Youtube Search ã â â â â`,
							rows: array
						}
					]
					const listMessage = {
						text: `â â ã *YOUTUBE SEARCH* ã â â\n\n*Request From :* ${conn.getName(m.sender)}\n\n*Result :* ${text}`,
						footer: packname + ' - ' + author,
						//title: `ââââã ${packname} ãââââ`,
						buttonText: `List Result ðŦ`,
						sections
					}
					await conn.sendMessage(m.chat, listMessage, { quoted : m })
				} else {
					let ini_txt = `*Hasil : ${text}*`
					for (let i of anu.result) {
						ini_txt += `\n\nðŊ *${i.title}*\n`
						if (i.published == undefined) {
							ini_txt += `ð Uploaded : ${i.publishedTime}\n`
						} else {
							if (i.published.includes('Streamed')) {
								ini_txt += `ð ${i.published}\n`
							} else {
								ini_txt += `ð Uploaded ${i.published}\n`
							}
						}
						ini_txt += `ð View : ${i.views}\n`
						ini_txt += `ð Url : https://youtu.be/${i.videoId}\n`
						ini_txt += `âââââââââââââââââââ`
					}
					conn.sendFile(m.chat, anu.result[0].thumbnail, 'yts.jpg', ini_txt, m)
				}
			} catch (e) {
				console.log(e)
				m.reply(`Tidak ditemukan hasil.`)
			}
		}
	}
}

handler.menudownload = ['ytsearch <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^((search)?yt(s(earch)?)|youtube)$/i

export default handler