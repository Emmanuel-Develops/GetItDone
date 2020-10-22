const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

//const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
const miscellaneous= [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser : true, useUnifiedTopology : true});

//Items Schema
const itemsSchema = {
    name : String
};

//Item that corresponds to itemsSchema
const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name : 'Hit the + button to add a new item'
});

const item2 = new Item({
    name : '<------ Hit this to delete an item'
});

const defaultItems = [item1, item2];




app.get('/', function(req, res){

   //const day = date.getDate();
   
   Item.find({}, function(err, foundItems){
        if(foundItems.length === 0, err){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Successfully saved default items to DB');
                }
            });
            
            console.log(err);
        }
        else{
            res.render('list', { listTitle : day,
                newListItems : foundItems});
          };
});
});

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

