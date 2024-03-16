const express=require('express');
const app =express();
const xlsx=require('xlsx');
var cors=require('cors');
app.use(cors());
app.use(express.json());

app.post('/addOrder',(req,res)=>{
    console.log(req.body);
    let wb=xlsx.readFile('data1.xlsx');
     let ws=wb.Sheets['orderdata'];
     xlsx.utils.sheet_add_aoa(ws, [[req.body.FirstName,req.body.LastName,req.body.Company,req.body.Address,req.body.Apartement,req.body.PostalCode,req.body.Phone,req.body.Currency,req.body.cartitems,req.body.carttotal]], {origin:-1});
    xlsx.writeFile(wb, "data1.xlsx");
     res.send('Order is added!');
 })

 app.listen(3000); 