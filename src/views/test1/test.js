const _permute = string => {
  const result = []
  const map = new Map()
  const dfs = (path) => {
    if (path.length === string.length) {
      result.push(path)
      return
    }
    for(let i=0;i<string.length;i++){
      if(map.get(string[i])) continue
      map.set(string[i],true)
      path += string[i]
      dfs(path)
      path =  path.substr(0,path.length -1)
      map.set(string[i], false)
    }
  }
  dfs('')
  return result
}
console.log(_permute('abc'))