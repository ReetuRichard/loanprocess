const db = require("../models");
const Loan = db.loan;

// Create and Save a new Loan user
exports.create = async (req, res) => {
    // Validate request
  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  
  var Bankadminloginuser = await Loan.find({"user_type":"BankAdmin"});
	console.log('Bankadminloginuser..'+Bankadminloginuser)
  //Create a Bank Manager User
  
  if(Bankadminloginuser == "" || Bankadminloginuser == null){
const banklogin = new Loan({username: "ABC",
    firstname: "Bank",
	lastname: "Manager",
	password: "Password@123",user_type:"BankAdmin"
	});

  // Save Loan user in the database
  await banklogin.save(banklogin)
  //CRM- Customer Relationship Managers 
  const CRM_1 = new Loan({username: "CRM_1",
    firstname: "Customer",
	lastname: "Manager",
	password: "Password@123",user_type:"CustomerAdmin"
	});

  // Save Loan user in the database
  await CRM_1.save(CRM_1)
  
    const CRM_2 = new Loan({username: "CRM_2",
    firstname: "Customer",
	lastname: "Manager",
	password: "Password@123",user_type:"CustomerAdmin"
	});

  // Save Loan user in the database
  await CRM_2.save(CRM_2)
  
    const CRM_3 = new Loan({username: "CRM_3",
    firstname: "Customer",
	lastname: "Manager",
	password: "Password@123",user_type:"CustomerAdmin"
	});

  // Save Loan user in the database
  await CRM_3.save(CRM_3)
  
    const CRM_4 = new Loan({username: "CRM_4",
    firstname: "Customer",
	lastname: "Manager",
	password: "Password@123",user_type:"CustomerAdmin"
	});

  // Save Loan user in the database
  await CRM_4.save(CRM_4)

	}
  
  // Create a Loan user
  const loan = new Loan({
    username: req.body.userName,
    firstname: req.body.firstName,
	lastname: req.body.lastName,
	password: req.body.password,
	user_type: "users"
  });

  // Save Loan user in the database
  await loan.save(loan)
    .then(data => {
		console.log('New Loan account user is created'+data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Loan."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Loan.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found loan with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving loan with id=" + id });
    });
};


exports.login = async(req,res) =>{
	const username = req.body.userName;
	console.log('dfcgvb'+username)
	const password = req.body.password;
	  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
	
	
	var loginuser = await Loan.find({$and: [{"username":username, "password": password}]});
	console.log('loginuser'+loginuser)
	
	if(loginuser == "" || loginuser == null){
		res.send({"message" : "Error in Login !! Retry"});
	}
	else{
		res.send({"message" : "Success Login !!"});
	}
	
}

exports.loanapplication = async(req, res, next) => {
    console.log("+++++++++++++++++++++  " + JSON.stringify(req.session));
	  if (!req.body.userName && !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
	var loginuser = await Loan.find({$and: [{"username":req.body.userName, "password": req.body.password}]});
	console.log('loginuser'+loginuser)
	
	if(loginuser == "" || loginuser == null){
		res.send({"Error" : "Username is not registered"});
	}
	else{
		console.log('dfdgfdg')
		if(loginuser[0].user_type == "BankAdmin"){
			res.send({"message":"Allowed For the new Customers"})
		}else{
		//prompt is used for getting notified to Manager
		var objuser = await Loan.update({"username":req.body.userName}, {$set: {"loan_applied": "yes","loan_status":"requested","prompt":"yes","CRM_number":"1"}})
		res.send({"message":"Loan has been applied"})
		}
        }
};


exports.loanapplicationstatus = async(req, res, next) => {
    console.log("+++++++++++++++++++++  " + JSON.stringify(req.session));
	  if (!req.body.userName) {
    res.status(400).send({ error: "Username can not be empty!" });
    return;
  }  
   if (!req.body.password) {
    res.status(400).send({ error: "Passsword can not be empty!" });
    return;
  }  
  Loan.find({$and: [{"username":req.body.userName, "password": req.body.password}]})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found loan with id " + id });
      else console.log('fghb')
	  res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving loan with id=" + id });
    });
};

exports.bankloanlist = async(req, res, next) => {
    console.log("+++++++++++++++++++++  " + JSON.stringify(req.session));
	  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
	var bankloginlist = await Loan.find({$and: [{"username":req.body.userName, "password": req.body.password}]});
	console.log('loginuser'+bankloginlist)
	
	if(bankloginlist[0].user_type == "BankAdmin"){
		
		var objuser = await Loan.find({"user_type":"users"})
		res.send(objuser);
		
	}
	else{
		res.send({"Error" : "You are not allowed to access the url"});
		}
}

exports.bankloanrequestlist = (req, res) => {
  const CRM_number = req.params.id;

  Loan.find({"user_type":"users"})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found loan with id " + CRM_number });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving loan with id=" + CRM_number});
    });
};


exports.bankloanrequestlist = async(req, res, next) => {
    console.log("+++++++++++++++++++++  " + JSON.stringify(req.session));
	  if (!req.body.loan_status) {
    res.status(400).send({ message: "loan_status can not be empty!" });
    return;
  }
  
	var loginuser = await Loan.find({$and: [{"loan_applied": "yes","prompt":"yes","user_type":"users"}]});
	console.log('loginuser'+loginuser)
	
	if(loginuser == "" || loginuser == null){
		res.send({"message" : "No more request !!"});
	}
	else{
		console.log('dfdgfdg')
		var objuser = await Loan.update({$and: [{"username":req.body.userName,"loan_status": "requested"}]}, {$set: {"loan_status":req.body.loan_status,"prompt":"no"}})
		res.send({"message":"Loan-application is processed and active"})
		
        }
};








exports.customerloanlist = (req, res) => {
  const CRM_number = req.params.id;

  Loan.find({"CRM_number":CRM_number})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found loan with id " + CRM_number });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving loan with id=" + CRM_number});
    });
};

exports.customerloanrequestlist = async(req, res, next) => {
    console.log("+++++++++++++++++++++  " + JSON.stringify(req.session));
	  if (!req.body.loan_status) {
    res.status(400).send({ message: "loan_status can not be empty!" });
    return;
  }
   if (!req.body.user_type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const CRM_number = req.params.id;
  
	var loginuser = await Loan.find({$and: [{"CRM_number":"1","loan_applied": "yes","prompt":"yes"}]});
	console.log('loginuser'+loginuser)
	
	if(loginuser == "" || loginuser == null){
		res.send({"message" : "No more request !!"});
	}
	else{
			var objuser = await Loan.update({$and: [{"username":req.body.userName,"loan_status": "requested"}]}, {$set: {"loan_status":req.body.loan_status,"prompt":"no"}})
		res.send({"message":"Loan-application is processed and active"})
		
        }
};