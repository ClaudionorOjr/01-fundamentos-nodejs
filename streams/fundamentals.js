//* pipe: encaminhar
// process.stdin
//   .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1 
  
  //* Método obrigatório
  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 100) {
        this.push(null)
      }
      else {
        //* Convertendo para o tipo Buffer (que só aceita string)
        const buffer = Buffer.from(String(i))
  
        //? O push só lê dados do tipo Buffer
        this.push(buffer)
      }
    }, 1000)
  }
}

class MultipleByTenStream extends Writable {

  /*
   * _write: Método obrigatório
   * Chunk: parte da stream de leitura
   * Callback: função que deve ser chamada quando a stream de escrita terminou de executar
   */
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1

    /*
     ? Primeiro parâmetro de uma callback é o erro
     ? Segundo parâmetro são os dados transformados, que devem ser passador em formato de Buffer
    */
    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultipleByTenStream())