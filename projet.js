const express=require('express');
const app =express();
const xlsx=require('xlsx');
const fs=require('fs');
var cors=require('cors');
app.use(cors());
app.use(express.json());
 
// app.get('/',function(req,res){
//     let wb=xlsx.readFile('data.xlsx');
// let ws=wb.Sheets['cltdata'];
// let data= xlsx.utils.sheet_to_json(ws);
//     res.send(data);
// })
 app.post('/addClient',(req,res)=>{
    console.log(req.body);
    let wb=xlsx.readFile('data.xlsx');
     let ws=wb.Sheets['cltdata'];
     xlsx.utils.sheet_add_aoa(ws, [[req.body.username,req.body.email,req.body.password]], {origin:-1});
    xlsx.writeFile(wb, "data.xlsx");
     res.send('Client is added!');
 })


 app.post('/addCheckout',(req,res)=>{
    let listItems=req.body.cartItems;
    let totalPrice=req.body.totalPrice;
     fs.writeFile('list.txt',JSON.stringify(listItems) , (err) => {
        if (err) throw err;
    })
    fs.writeFile('totalPrice.txt',JSON.stringify(totalPrice) , (err) => {
        if (err) throw err;
    })
    res.send('Order is added!');
 })

 app.post('/addOrder',(req,res)=>{
    let wb=xlsx.readFile('data1.xlsx');
     let ws=wb.Sheets['orderdata'];
    let listItems="";
    let totalPrice="";
     fs.readFile('list.txt','utf8' , (err,data) => {
        listItems=data;
        fs.readFile('totalPrice.txt','utf8' , (err,data) => {
        totalPrice=data;
        xlsx.utils.sheet_add_aoa(ws, [[req.body.FirstName,req.body.LastName,req.body.Company,req.body.Address,req.body.Apartement,req.body.PostalCode,req.body.Phone,req.body.Currency,totalPrice,listItems]], {origin:-1});
    xlsx.writeFile(wb, "data1.xlsx");
        })
    })

    res.send('Order is added!');
 })

 app.post('/addComment',(req,res)=>{
    console.log(req.body);
    let wb=xlsx.readFile('data1.xlsx');
     let ws=wb.Sheets['orderdata'];
     xlsx.utils.sheet_add_aoa(ws, [[req.body.comment]], {origin:-1});
    xlsx.writeFile(wb, "data1.xlsx");
     res.send('Order is added!');
 })

app.listen(3000); 




   