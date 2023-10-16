  let NeDB = require('nedb')
  let db = new NeDB({
    filename:'user.db',
    autoload:true
  })

module.exports = (app)=>{ 

    let route = app.route('/users')


    route.get((req,res)=>{
       
        db.find({}).sort({name:1}).exec((err, users)=>{
            
                if(err){
                     
                    app.utils.error.send({err,req,res})

                }else{


                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json')
                    res.json({users})
                }




        })

       
    
    
    })  
    
    route.post((req,res)=>{
      
         

        db.insert(req.body,(err,user)=>{
             if(err){
                app.utils.error.send({err,req,res})
                res.status(400).json({
                    error:err
                })

             }else{
                res.status(200).json(user)
             }

        });
    
    })
    
    
    




}