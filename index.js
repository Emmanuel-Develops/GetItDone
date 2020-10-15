const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let items = [];
let workItems = [];
let miscellaneous= [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    let today = new Date();
    let options ={
        weekday: 'long',
        day:'numeric', 
        month : 'long'
    };

    let day = today.toLocaleDateString('en-US', options);
    res.render('list', { listTitle : day, newListItems : items});
})

app.post('/', function(req, res){
    let item = req.body.item;

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

app.listen(3000, function(){
    console.log("Listening on port 3000!")
})

