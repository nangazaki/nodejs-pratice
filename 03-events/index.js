import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

const eventName = 'usuario:click'
myEmitter.on(eventName, function (click) {
    console.log('User click!', click)
})


// myEmitter.emit(eventName, 'User click in Scrollbar!')
// myEmitter.emit(eventName, 'In ok!')

// let count = 0
// setInterval(function () {
//     myEmitter.emit(eventName, 'In ok' + (count++))

// }, 1000)

const stdin = process.openStdin()

function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener('data', function (value) {
            // console.log(`You write: ${value.toString().trim()}`)
            return resolve(value)
        })
    })
}
main().then(function (result) {
    console.log('result', result.toString())
})