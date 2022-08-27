import { readdirSync } from 'node:fs'
import AsciiTable from 'ascii-table'

let table = new AsciiTable()
table.setHeading('Events', 'Stats')

export default () => {
    fs.readdirSync(`./events/`).filter(file => file.endsWith('.js')).forEach(async events => {
        await import(`./events/${events}`)
        table.addRow(events.split('.js')[0], '✅')
    })
    console.log(table.toString())
}