// create app and set dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// set app info
app.set("port", 3000);
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

// connection pool
const Pool = require("pg").Pool;	
const config = {			
	host: "localhost",		
	user: "staff",			
	password: "zAdRUnapr8", 	
	database: "workshops"
};

// the actual connection happens here
const pool = new Pool(config);

// START REQUESTS

// Get all workshops
app.get("/api", async (req, res) => {
	if (!req.query.workshop) {
		try {
			const template = "SELECT DISTINCT workshop FROM attendees";
			const response = await pool.query(template);
	
			if (response.rowCount == 0) {
				res.json({status: "not found"});
			} else {
				const workshops = response.rows.map(function(item) {
					return item.workshop;
				});
				res.json({workshops: workshops});
			}
		} catch (err) {
			console.log(err);
			res.json({status: "error"});
		}
	} else {
		try {
			const template = "SELECT name from attendees where workshop = $1";
			const response = await pool.query(template, [req.query.workshop]);
	
			if (response.rowCount == 0) {
				res.json({error: "workshop not found"});
			} else {
				const members = response.rows.map( function(item) {
					return item.name;
				});
				res.json({attendees: members});
			}
		} catch (err) {
			console.log(err);
			res.json({status: "error"});
		}
	}
	
});

app.post("/api", async (req, res) => {

	const name = req.body.attendee;
	const workshopName = req.body.workshop;

	// check for empty params
	if (!req.body.attendee || !req.body.workshop) {
		res.json({error: "parameters not given"});
	} else {
		// check for duplicate record
		try {
			const template = 
				"SELECT * from attendees where name = $1 AND workshop = $2";
			const response = await pool.query(template, [name, workshopName]);

			// query DB and see how many rows
			if (response.rowCount == 0) {

				// no rows were found, so it will not be a duplicate
				try {
					const template = 
						"INSERT INTO attendees (name, workshop) VALUES ($1, $2)";
					const response = await pool.query(template, [name, workshopName]);
					res.json({ 
						attendee: req.body.attendee,
						workshop: req.body.workshop
					  });
				} catch (err) {
					console.log(err);
					res.json({status: "error"});
				}
			} else {	

				// cannot insert because duplicate was found
				res.json({error: "attendee already enrolled"});
			}
		} catch (err) {
			console.log(err);
			res.json({status: "error"});
		}
	}
});

// start app
app.listen( app.get("port"), () => {
	console.log(`Find the server at http://localhost:${ app.get("port") }`);
});
