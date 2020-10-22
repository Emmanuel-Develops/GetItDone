const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
// const miscellaneous= [];

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

const item3 = new Item({
    name : 'Hit to delete an item!'
})

const defaultItems = [item1, item2, item3];

const listSchema = {
    name : String, 
    items : [itemsSchema]
};

const List = mongoose.model('List', listSchema);

//Home Route
app.get('/', function(req, res){


   const day = date.getDate();
   
   Item.find({}, function(err, foundItems){

        if(foundItems.length === 0, err){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Successfully saved default items to DB');
                }
            });
            
            res.redirect('/');
        }
        else{
            res.render('list', { listTitle : day,   newListItems : foundItems}); }
    });
});


//Custom Route
app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;

    List.findOne({name : customeListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                console.log('Does not exist');
            }
            console.log('Exists');
        }
    })
    const list = new List({
        name : customListName,
        items : defaultItems
    });

    if(list.)
});


app.post('/', function(req, res){
    const itemName = req.body.newItem;
    const item = new Item({
        name : itemName
    });

    item.save();
    res.redirect('/');

    //Differentiate task into categories

    // let listType = req.body.list;
    // console.log("List type is:", listType);

    // if(listType === 'Work'){
    //     workItems.push(item);
    //     res.redirect('/work');
    // }
    // else if(listType === "Miscellaneous"){
    //     miscellaneous.push(item);
    //     res.redirect('/miscellaneous');
    // }
    // else{

    //     //items.push(item);
    //     item.save();
    //     res.redirect('/');  
    // }
});

app.post('/delete', function(req, res){

    const checkedItem = req.body.checkbox;

    Item.findByIdAndRemove(checkedItem, function(err){
        if(!err){
            console.log('Successfully deleted item!');
            res.redirect('/');
        }
    })
    console.log(checkedItem);
});

app.get('/work', function(req, res){
    res.render('list', {listTitle: 'Work List', newListItems : workItems});
});

app.get('/about', function(req, res){
    res.render('about');
})

app.get('/miscellaneous', function(req, res){
    res.render('list', {listTitle: " Miscellaneous", newListItems : miscellaneous});
})

app.listen(port, function(req, res){
    console.log('Listening on port 3000!');
});

