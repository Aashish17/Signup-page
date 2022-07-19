const express= require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
	res.sendFile(__dirname+"/signup.html");	
})

app.post("/",function(req,res){

	var firstname= req.body.fname;
	var lastname=req.body.lname;
	var mail=req.body.mail;
	console.log(firstname);
	console.log(lastname);
	console.log(mail);

	const url="https://us10.api.mailchimp.com/3.0/lists/6d98ae7357" ;
	const options={
		method:"POST",
		auth:"ak17:15facc5a6ba0bf3558c68e542a3ab6ae-us10",
	}

	const data={
		members:[
		{
			email_address: mail,
			status:"subscribed",
			merge_fields:{
				FNAME:firstname,
				LNAME:lastname
			}

		}]
	};

	const jsonData= JSON.stringify(data);

	const request=https.request(url,options,function(response)
		{
			if(response.statusCode===200)
			{
				res.sendFile(__dirname+"/success.html");

			}
			else
			{
				res.sendFile(__dirname+"/failure.html");
			}
			response.on("data",function(data)
			{
				console.log(JSON.parse(data));
			})
		})
	request.write(jsonData);
	request.end();

})

app.post("/failure",function (req,res) {
	res.redirect("/");
})
app.listen(process.env.PORT || 3000,function () {
	// body...
	console.log("aashish"); 
})



// API KEY
//15facc5a6ba0bf3558c68e542a3ab6ae-us10
//SyntaxError: Unexpected end of input