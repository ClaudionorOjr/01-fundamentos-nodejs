export function extractQueryParams(query) {
  /*
   * reduce(): percorre o array e transforma em outra coisa, como o um novo objeto, passando como segundo parâmetro  
   */
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}