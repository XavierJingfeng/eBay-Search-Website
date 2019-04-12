const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// getting our POSTS routes
const itemAPIHeader = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Jingfeng-CSCI571-PRD-616db7c91-dcff8190&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
const itemDetailAPIHeader = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=Jingfeng-CSCI571-PRD-616db7c91-dcff8190&siteid=0&version=967&IncludeSelector=Description,Details,ItemSpecifics&ItemID=";
const itemPhotoAPIHeader = "https://www.googleapis.com/customsearch/v1?q="
const itemPhotoAPItail = "&cx=006673987745932278555:mjnjkismucg&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyAArFKTwrabEaQt101jDmrIcTbNhihLCI8";
const similarItemAPIHeader = "https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=Jingfeng-CSCI571-PRD-616db7c91-dcff8190&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResult=20&itemId=";
const autocompleteHeader = "http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=";
const autocompleteTail = "&username=xavier_zhou&country=US&maxRows=5";
app.use(cors());



// Using middleware

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req,res)=>{
	res.sendFile('hw8/index.html');
});

app.post('/', (req,res)=>{
	let searchOption = req.body;
	// setup ebay url
	let callAPI = itemAPIHeader;
	callAPI+="&keywords="+searchOption.keyword;
	callAPI+=searchOption.category == 0 ? '' : "&categoryId="+searchOption.category;
	var i = 0;
	if(searchOption.condition1 || searchOption.condition2 || searchOption.condition3){
		var j = 0;
		callAPI+="&itemFilter("+i+").name=Condition"
		if(searchOption.condition1){
			callAPI+="&itemFilter("+i+").value("+j+")=New";
			j++;
		}
		if(searchOption.condition2){
			callAPI+="&itemFilter("+i+").value("+j+")=Used";
			j++;
		}
		if(searchOption.condition3){
			callAPI+="&itemFilter("+i+").value("+j+")=Unspecified";
			j++;
		}
		i++;
	}
	if(searchOption.shipping1){
		callAPI+="&itemFilter("+i+").name=LocalPickupOnly";
		callAPI+="&itemFilter("+i+").value=true";
		i++;
	}
	if(searchOption.shipping2){
		callAPI+="&itemFilter("+i+").name=FreeShippingOnly";
		callAPI+="&itemFilter("+i+").value=true";
		i++;
	}
	callAPI+="&itemFilter("+i+").name=HideDuplicateItems";
	callAPI+="&itemFilter("+i+").value=true";
	i++;
	callAPI+="&itemFilter("+i+").name=MaxDistance";
	callAPI+="&itemFilter("+i+").value="+searchOption.distance;
	i++;

	callAPI+="&buyerPostalCode="+searchOption.zip_code;
	callAPI+="&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo";
	//res.send({'message': callAPI });
	axios.get(`${callAPI}`).then(posts=>{
 		res.status(200).json(posts.data);
 	}).catch(error =>{
 		res.status(500).send(error);
 	})
});


app.post('/itemdetail', (req, res)=>{
	
	let callDetailAPI = itemDetailAPIHeader;
	callDetailAPI+=req.body.itemId;
	console.log(callDetailAPI);
	axios.get(`${callDetailAPI}`).then(posts=>{
 		res.status(200).json(posts.data);
 	}).catch(error =>{
 		res.status(500).send(error);
 	})

});

app.post('/photos', (req,res)=>{
	let callPhotosAPI = itemPhotoAPIHeader;
	callPhotosAPI += req.body.itemTitle + itemPhotoAPItail;
	console.log(callPhotosAPI);
	callPhotosAPI = encodeURI(callPhotosAPI);
	axios.get(`${callPhotosAPI}`).then(posts=>{
 		res.status(200).json(posts.data);
 	}).catch(error =>{
 		res.status(500).send(error);
 	})
})

app.post('/similar', (req,res)=>{
	let callSimilarAPI = similarItemAPIHeader;
	callSimilarAPI += req.body.itemId;
	console.log(callSimilarAPI);
	axios.get(`${callSimilarAPI}`).then(posts=>{
 		res.status(200).json(posts.data);
 	}).catch(error =>{
 		res.status(500).send(error);
 	})
})

app.post('/autocomplete', (req,res)=>{
	let callAutocompleteAPI = autocompleteHeader;
	callAutocompleteAPI += req.body.startwith+ autocompleteTail;
	axios.get(`${callAutocompleteAPI}`).then(posts=>{
 		res.status(200).json(posts.data);
 	}).catch(error =>{
 		res.status(500).send(error);
 	})
})


const port = process.env.PORT || 4600;

app.listen(port, (req, res)=>{

	console.log(`running on port ${port}`);
}); 