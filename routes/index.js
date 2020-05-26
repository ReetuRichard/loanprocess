module.exports = app => {
  const loan = require("../controllers/controllersLoan.js");

  var router = require("express").Router();

  // Create a new loan
  router.post("/createUser", loan.create);
  
  // Login user
  router.post("/login", loan.login);

  
  //Applies loan
  
  router.post('/loanapplication',loan.loanapplication); 	//Loan Status of user
  router.get('/loanapplicationstatus',loan.loanapplicationstatus);
						
   //Retrieve banklist
  router.get("/BankList", loan.bankloanlist);
  
    //Retrieve all the request ..BankManager Access
  router.post("/BankrequestAllList", loan.bankloanrequestlist);
  
//Retrieve with respective to CRM
  router.get("/CRMList/:id", loan.customerloanlist);
  //Retrieve with respective to CRM
  router.post("/CRMrequestList/:id", loan.customerloanrequestlist);
  
  
  
  
  
  // Retrieve all published loan
 // router.get("/published", loan.findAllPublished);

  // Retrieve a single loan with id
  router.get("/:id", loan.findOne);

  // Update a loan with id
 // router.put("/:id", loan.update);

  // Delete a loan with id
 // router.delete("/:id", loan.delete);

  // Create a new loan
 // router.delete("/", loan.deleteAll);

  app.use('/api/loan', router);
};