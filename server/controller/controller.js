var Userdb = require('../model/model');

//create and save new user
exports.create=(req, res)=>{
  //validate request
  if(!req.body){
    res.body(400).send({message: "content can not be empty!"});
    return;
  }
  
  //new user
  const user =new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
  })

  //save user in the  database
  user
  .save(user)
  .then(data=>{
     //res.send(data)
     res.redirect('/add-user');
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message ||"some error occures while creating a create operation"
    });
  });
} 


//retrieve and return all users/retrieve and return a single user
exports.find=(req, res)=>{
    
  if(req.query.id){
   const id = req.query.id;
   
   Userdb.findByIdAndUpdate(id)
   .then(data=>{
     if(!data){
      res.send(404).send({message :"not found user with id " + id});
     }else{
      res.send(data)
     }
   })
       .catch(err =>{
        res.send(500).send({message:"ERRORS retriving with id " + id});
 
       })
  }else{
    Userdb.find()
    .then(user=>{
       res.send(user);
    })
    .catch(err=>{
     res.status(500).send({ message: err.message || "ERRORS Occured while retriving user" 
    });
    });
  }
}


//update a new id uswr by id
exports.update  =(req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"data can not be empty"});
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{ useFindAndModify : false})
     .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot update user with ${id}. maybe user not found`
        });
        }else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({message:`Error update user imformation`});
})
}



//delete a user with by user id
exports.delete=(req, res)=>{
  const id=req.params.id;
  Userdb.findByIdAndDelete(id)
  .then(data=>{
    if(!data){
        res.status(404).send({message: `Cannot deleted user with ${id}. maybe id is wrong`});
    }else{
     res.send({
        message: "user was deleted successfully"});
    }
})
.catch(err=> {
    res.status(500).send({message: "could not delete user with id="+ id 
});
});
}
