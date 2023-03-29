
/*
 * fs/promises: lida com o novo formato de assincronismo no javascript;
 * .then(), .catch(), async, await
*/
import fs from 'node:fs/promises'

//? import.meta.url: retorna exatamente o caminho para este arquivo
const databasePath = new URL('../db.json', import.meta.url)

export class Database {

  //? O '#' para o Node indica que é uma propriedade privada da classe
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      }).catch(() => {
        this.#persist()
      })
  }

  #persist() {
    //* writeFile só aceita dados do tipo string, por isso é necessário converter de objeto para String
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    //* Deve ser let porque a variável irá mudar
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        /* 
         * Object.entreis: converter objeto em um array
         * De { 'name': 'john', 'email': 'johndoe@email.com' } 
         * Para [ ['name', 'john'],['email', 'johndoe@email.com] ]
         * some(): percorre o array e se pelo menos uma das vezes em que percorreu o array retornar true, deve incluir no filter
        */
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value)
        })
      })
    }

    return data
  }

  insert(table, data) {
    //* Verifica se já existe um array dessa tabela
    if (Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }
}