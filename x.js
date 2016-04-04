var Dynamosaur = require('./');

/*
new Dynamosaur()
.getIn('user')
.exec()
.then(res=>{ console.log('GET ALL'); console.log(res.data.Items);}, err => {console.log('GET ALL'); console.log(err);});
*/

// =, <, <=, >, >=
new Dynamosaur()
.getIn('Movies')
.where('year', '>', {'N':'1200'})
.exec()
.then(res=>{ console.log('GET ONE'); console.log(res.data.Items);}, err => { console.log('GET ONE'); console.log(err);});

/*
new Dynamosaur()
.putIn('user')
.aNew({'_id':{'S':'6'}, 'totototoot':{'N':'42'}})
.then(res=>{ console.log('PUT ONE'); console.log(res.data);}, err => { console.log('PUT ONE'); console.log(err);});
*/

/*
new Dynamosaur()
.updateIn('user')
.toModify({'totototoot':12,'okay':{'bof':42}})
.withId({'_id':'2'})
.exec()
.then(res=>{ console.log('UOPDATE ONE'); console.log(res.data);}, err => { console.log('UOPDATE ONE'); console.log(err);});
*/
