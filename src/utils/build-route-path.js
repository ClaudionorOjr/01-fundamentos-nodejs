export function buildRoutePath(path) {
  /*
   * Regex para identificar os parâmetros de rota
   * /users/:userId/groups/:groupId
  */
  const routeParametersRegex = /:([a-zA-Z]+)/g
  /*
   * Criar grupos com Regex utiliza '?<$1>' ou '?<nomegrupo>' 
   */
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}