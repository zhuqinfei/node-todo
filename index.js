
const homedir=require('os').homedir()
const home=process.env.HOME || homedir
const fs=require('fs')
const p=require('path')
const dbpath=p.join(home,'.todo')

module.exports.add=(title)=>{
  //读取之前的任务
  fs.readFile(dbpath,{flag:'a+'},(error,data)=>{
    if(error){
      console.log(error)
    }else{
      let list
      try{
        list=JSON.parse(data.toString())
      }catch(error2){
        list=[]
      }
      console.log(list)
      const task={
        title:title,
        done:false
      }
      list.push(task)
      const string=JSON.stringify(list)
      fs.writeFile(dbpath,string,(error3)=>{
         if(error3){
           console.log(error3)
         }
      })
    }
  })
  //往里面添加一个title任务
  //存储任务到文件
}