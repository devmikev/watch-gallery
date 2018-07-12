var mongoose = require("mongoose");
var Gallery = require("./models/gallery");
var Watch   = require("./models/watch");
 
var data = [
    {
        name: "Mike's watches", 
        image: "https://images.unsplash.com/photo-1468421201266-ec88b2809284?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9919c5edb104f2f40573c72ebfff28f&auto=format&fit=crop&w=500&q=60",
        description: "This is the first gallery"
    },
    {
        name: "Ilya's watches", 
        image: "https://images.unsplash.com/photo-1444881421460-d838c3b98f95?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3118089cd65e54b14598031c0ba4bc&auto=format&fit=crop&w=500&q=60",
        description: "This is the second gallery"
    },
    {
        name: "Dad's watches", 
        image: "https://images.unsplash.com/photo-1518520247810-9d56f8bc5556?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dbd644bcbe6dadf49bf39c18753a651f&auto=format&fit=crop&w=500&q=60",
        description: "This is the third gallery"
    }
];
 
var seedDB = () => {
   //Remove all galleries
   Gallery.remove({}, (err) => {
        if(err){
            console.log(err);
        }
        console.log("removed galleries!");
        
        // Remove all watches
        Watch.remove({}, (err) => {
            if(err){
                console.log(err);
            }
            console.log("removed watches!");

            //  add a few galleries
            data.forEach((seed) => {
                Gallery.create(seed, (err, gallery) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a gallery");
                        //create a watch
                        Watch.create(
                            {
                                brand: "Omega",
                                model: "Seamaster 300m",
                                image: "https://images.unsplash.com/photo-1494858723852-d3cc2477e12c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a66c81d6441ca061f1e4647df4f41e40&auto=format&fit=crop&w=500&q=60",
                                description: "Graduation gift from 2012"
                            }, (err, watch) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    gallery.watches.push(watch);
                                    gallery.save();
                                    console.log("Created new watch");
                                }
                            });
                    }
                });
            });
        });
    });
};
 
module.exports = seedDB;