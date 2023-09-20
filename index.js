const express = require ('express')
const fs = require('fs')
const app = express()

app.use(express.json())

app.post('/create', (req, res) =>{
    const dados = JSON.stringify(req.body)
    fs.writeFile(req.body.email+'.json', dados, err=>{
     if (err) console.log(err);
    })
    res.send({message: "Dados criados"})
})

app.get('/mostrar/:name', (req,res)=>{
    const dataBuffer =  fs.readFileSync(req.params.name + '.json')
    const date = JSON.parse(dataBuffer)
        res.send({message: "OLhe os seus dados", date})
    })

app.delete('/deletar/:email', (req,res) =>{
    fs.unlinkSync(req.params.email + '.json')
    res.send({message:"Email deletado meu mano"})
})

app.put('/update/:email', (req,res) =>{
   const dados = JSON.stringify(req.body)
   fs.writeFileSync(req.body.email+ '.json', dados, {flag: 'w'},{

   })
    res.send({message: "Dados foram salvos"})
})
app.listen(8080, () => console.log("Server funcionando!"))
