var Dynamosaur = require('./');


/*
new Dynamosaur()
.getIn('Movies')
.exec()
.then(res=>{ console.log('GET ALL'); console.log(res.data.Items);}, err => {console.log('GET ALL'); console.log(err);});
*/



new Dynamosaur()
.getIn('Movies')
.where('year', '=', 1933)
.exec()
.then(res=>{ console.log('GET ONE'); console.log(res.data.Items);}, err => { console.log('GET ONE'); console.log(err);});


/*
new Dynamosaur()
.putIn('Movies')
.aNew({
  "year": {
    "N": "1933"
  },
  "title": {
    "S": "Marvin à la piscine"
  }})
.then(res=>{ console.log('PUT ONE'); console.log(res.data.Items);}, err => { console.log('PUT ONE'); console.log(err);});*/

new Dynamosaur()
.updateIn('Movies')
.toModify({'omega':892,'okay':{'bof':{'N':42}}})
.withMultipleId({'year':1933, 'title':'King Kong'})
.exec()
.then(res=>{ console.log('UOPDATE ONE'); console.log(res.data.Items);}, err => { console.log('UOPDATE ONE'); console.log(err);});
