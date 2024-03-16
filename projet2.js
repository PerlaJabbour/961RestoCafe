const express=require('express');
const app =express();
const xlsx=require('xlsx');
var cors=require('cors');
app.use(cors());
app.use(express.json());

 app.post('/addComment',(req,res)=>{
    console.log(req.body);
    let wb=xlsx.readFile('data1.xlsx');
     let ws=wb.Sheets['orderdata'];
     xlsx.utils.sheet_add_aoa(ws, [[req.body.comment]], {origin:-1});
    xlsx.writeFile(wb, "data1.xlsx");
     res.send('Order is added!');
 })
 app.listen(3000); 
      