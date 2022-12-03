const db=require('../db.js')
const fs=require('fs')
jest.mock('fs');

describe('db',()=>{
  afterEach(()=>{
    fs.clearMocks()
  })

  it('can read',async ()=>{
    const data=[{title:'hi',done:true}]
    fs.setReadFileMock('/xxx',null,JSON.stringify(data))
    const list=await db.read(path='/xxx')
    expect(list).toStrictEqual(data)
  })

  it('can write',async ()=>{
    let _file
    fs.setWriteFileMock('/yyy',(path,data,callback)=>{
      _file=data
      callback(null)
    })
    const list=[{title:'去吃饭',done:true},{title:'去睡觉',done:true}]
    await db.write(list,'/yyy')
    expect(_file).toBe(JSON.stringify(list)+'\n')
  })
})