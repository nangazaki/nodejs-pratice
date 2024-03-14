/*
 0 Get user information
 1 Get a user's phone number from their ID
 2 Get a user's address from their ID 
*/

// We import an internal node.js module
import { promisify } from 'node:util';

const getAddressAsync = promisify(getAddress)

function getUser() {
    // when there is a problem -> REJECT(ERRO)
    // when sucess -> RESOLVE

    return new Promise(function resolvPromise(resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('DEU RUIM DE VERDADE!'))

            return resolve({
                id: 1,
                name: 'Aladin',
                dateOfBirth: new Date()
            })
        }, 1000)

    })
}

function getPhone(userId) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                number: '1199002',
                ddd: 11
            })
        }, 2000);

    })
}

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos bobos',
            number: 0
        })
    }, 2000);
}


main()

async function main() {
    try {
        console.time('medida-promise')
        
        const user = await getUser()

        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ])
        const address = result[1]
        const phone = result[0]

        console.log(`
            Nome: ${user.name},
            Telefone: (${phone.ddd}) ${phone.number},
            Endereco: ${address.street}, ${address.number}
        `)

        console.timeEnd('medida-promise')

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}