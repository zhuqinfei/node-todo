const fs = jest.genMockFromModule('fs')
const _fs=jest.requireActual('fs')

Object.assign(fs,_fs)

let readmocks={}

fs.setReadFileMock=(path,error,data)=>{
  readmocks[path]=[error,data]
}

//fs.readFile('xxx',fn)
fs.readFile=(path,options,callback)=>{
  if(callback===undefined){callback=options}
  if(path in readmocks){
    callback(readmocks[path][0],readmocks[path][1])
  }else{
    _fs.readFile(path,options,callback)
  }
}

let writeMocks={}

fs.setWriteFileMock=(path,fn)=>{
  writeMocks[path]=fn
}

fs.writeFile=(path,data,options,callback)=>{
  if(path in writeMocks){
    writeMocks[path](path,data,options,callback)
  }else{
    _fs.writeFile(path,data,options,callback)
  }
}

fs.clearMocks=()=>{
  readMocks={}
  writeMocks={}
}

module.exports = fs;