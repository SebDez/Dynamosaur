var Dynamosaur = require('./');


new Dynamosaur()
.getIn('user')
.exec()
.then(res=>{ console.log('GET ALL'); console.log(res.data.Items);}, err => {console.log('GET ALL'); console.log(err);});

// =, <, <=, >, >=
new Dynamosaur()
.getIn('Movies')
.where('year', '>', {'N':'1990'})
.exec()
.then(res=>{ console.log('GET ONE'); console.log(res.data.Items);}, err => { console.log('GET ONE'); console.log(err);});

/*
new Dynamosaur()
.putIn('user')
.aNew({'_id':{'S':'23'}, 'totototoot':{'N':'53'}})
.then(res=>{ console.log('PUT ONE'); console.log(res.data);}, err => { console.log('PUT ONE'); console.log(err);});
*/

/*
new Dynamosaur()
.updateIn('user')
.toModify({'totototoot':666,'okay':{'bof':42}})
.withId({'_id':'23'})
.exec()
.then(res=>{ console.log('UOPDATE ONE'); console.log(res.data);}, err => { console.log('UOPDATE ONE'); console.log(err);});
*/
