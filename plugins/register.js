const { createHash } = require('crypto')
let Reg = /(.*)([.|])([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  //let d = new Date
  //let locale = 'id'
  //let gmt = new Date(0).getTime() - new Date('26 February 2021').getTime()
  //let week = d.toLocaleDateString(locale, { weekday: 'long' })
  //let date = d.toLocaleDateString(locale, {
  let user = global.DATABASE._data.users[m.sender]
  if (user.registered === true) throw `Ya te as registrado\nQuiere volver a registrarte?: ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Formato incorrecto\n*${usedPrefix}lista <nombre>.edad>*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Hey como te llamas, el nombre no puede estar estar vacΓ­o (Alphanumeric)'
  if (!age) throw 'Hey Cuantos aΓ±os tienesπ₯±'
  user.name = name
  user.age = parseInt(age)
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
γ REGISTRO EXITOSO γ
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
ββββββββ
β²  *Informacion* 
ββββββββ
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
------------------------------
β¬ \`\`\`Nombre: ${name}\`\`\`
β¬ \`\`\`Edad: ${age} aΓ±os\`\`\`
β¬ \`\`\`SN: ${sn}\`\`\`
------------------------------
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
ββββββββ
β *NOTA*
β NO VAYAS A PERDER TU *SN* POR QUE ES MUY IMPORTANTE:D
ββββββββ
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
`.trim())
}
handler.help = ['registrar', 'reg', 'register'].map(v => v + ' <nombre>.<edad>')
handler.tags = ['exp']

handler.command = /^(registrar|reg(ister)?)$/i

module.exports = handler
