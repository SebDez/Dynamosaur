var Dynamosaur = require('./');

/*
new Dynamosaur()
.getIn('Movies')
.exec()
.then(res=>{ console.log('GET ALL'); console.log(res.data.Items);}, err => {console.log('GET ALL'); console.log(err);});
*/

// =, <, <=, >, >=
new Dynamosaur()
.getIn('Movies')
.where('year', '=', 1985)
.or('title', '=', 'The Breakfast Club')
.exec()
.then(res=>{ console.log('GET ONE'); console.log(res.data.Items);}, err => { console.log('GET ONE'); console.log(err);});
/*
new Dynamosaur()
.putIn('user')
.aNew({'_id':{'S':'4'}, 'name':{'S':'seb222'}})
.then(res=>{ console.log('PUT ONE'); console.log(res.data);}, err => { console.log('PUT ONE'); console.log(err);});

new Dynamosaur()
.updateIn('user')
.toModify({'totototoot':12,'okay':{'bof':42}})
.withId({'_id':'2'})
.exec()
.then(res=>{ console.log('UOPDATE ONE'); console.log(res.data);}, err => { console.log('UOPDATE ONE'); console.log(err);});
*/
