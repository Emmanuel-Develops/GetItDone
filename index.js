const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
const miscellaneous= [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/', function(req, res){

   const day = date.getDate();

    res.render('list', { listTitle : day, newListItems : items});
})

app.post('/', function(req, res){
    const item = req.body.item;

    //Differentiate task into categories

    let listType = req.body.list;
    console.log("List type is:", listType);

    if(listType === 'Work'){
        workItems.push(item);
        res.redirect('/work');
    }
    else if(listType === "Miscellaneous"){
        miscellaneous.push(item);
        res.redirect('/miscellaneous');
    }
    else{
        items.push(item);
        res.redirect('/');  
    }
})

app.get('/work', function(req, res){
    res.render('list', {listTitle: 'Work List', newListItems : workItems});
});

app.get('/about', function(req, res){
    res.render('about');
})

app.get('/miscellaneous', function(req, res){
    res.render('list', {listTitle: " Miscellaneous", newListItems : miscellaneous});
})

app.listen(port);

