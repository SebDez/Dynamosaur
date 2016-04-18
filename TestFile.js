var Dynamosaur = require('./');

//SAMPLE DATA FILE FROM AMAZON TUTORIAL
//http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.02.html#GettingStarted.NodeJs.02.01

var region = 'eu-west-1'; //default is eu-west-1

//##########################################################
//GET MOVIES
new Dynamosaur(region)
  .getIn('Movies')
  .exec()
  .then(res => {
    console.log('## GET ALL MOVIES : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET ALL MOVIES : ',err );
  });

//##########################################################
//GET MOVIES BY CRITERIA
//Simple case
new Dynamosaur(region)
  .getIn('Movies')
  .where('title', '=', {'S': 'King Kong'})
  .exec()
  .then(res => {
    console.log('## GET MOVIES BY CRITERIA : ','## SIMPLE CASE : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
  });

//With AND
new Dynamosaur(region)
  .getIn('Movies')
  .where('title', '=', {'S': 'King Kong'})
  .and('year', '=', {'N': '1933'})
  .exec()
  .then(res => {
    console.log('## GET MOVIES BY CRITERIA : ','## AND CASE : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
  });

//With OR
new Dynamosaur(region)
  .getIn('Movies')
  .where('title', '=', {'S': 'King Kong'})
  .or('title', '=', {'S':'Lifeboat'})
  .exec()
  .then(res => {
    console.log('## GET MOVIES BY CRITERIA : ','## OR CASE : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
  });

//With OPERATOR among =, <, <=, >, >=
new Dynamosaur(region)
  .getIn('Movies')
  .where('year', '>', {'N': '1991'})
  .exec()
  .then(res => {
    console.log('## GET MOVIES BY CRITERIA : ','## OPERATOR CASE : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
  });

//With IN list
new Dynamosaur(region)
  .getIn('Movies')
  .where('characters', 'contains', {'S':'Rei'})
  .exec()
  .then(res => {
    console.log('## GET MOVIES BY CRITERIA : ','## LIST CASE : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
  });


//With nested child
new Dynamosaur(region)
  .getIn('Movies')
  .where('info.actors[0]', '=', {'S':'Cary Grant'})
  .exec()
  .then(res => {
    console.log('## GET MOVIES BY CRITERIA : ','## CHILD CASE : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
  });


//With nested child list
  new Dynamosaur(region)
    .getIn('Movies')
    .where('info.actors', 'contains', {'S':'Johnny Depp'})
    .exec()
    .then(res => {
      console.log('## GET MOVIES BY CRITERIA : ','## CHILD LIST CASE : ', res.data.Items);
    }, err => {
      console.log('## ERROR ON GET MOVIES BY CRITERIA : ',err );
    });


//##########################################################

new Dynamosaur(region)
  .putIn('Movies')
  .aNew({'year': {'N': '2016'},'title': {'S': 'Star Wars VII'}, characters:{'L':[{'S': 'Rei'}, {'S': 'Kylo'}]}})
  .then(res => {
    console.log('## PUT MOVIE ', res.data);
  }, err => {
    console.log('## ERROR WHILE PUT MOVIE : ',err );
  });


//##########################################################

new Dynamosaur(region)
.updateIn('Movies')
.toModify({'info':{'directors':['JJ ABRAMS']}})
.withId({'year': 2016,'title': 'Star Wars VII'})
.exec()
.then(res => {
  console.log('## UPDATE MOVIE ', res.data);
}, err => {
  console.log('## ERROR WHILE UPDATING MOVIE : ',err );
});

//##########################################################
//REMOVE MOVIE
new Dynamosaur(region)
.deleteIn('Movies')
.whenKey('year',2016)
.andKey('title','Star Wars VII')
.exec()
.then(res => {
  console.log('## DELETE MOVIE ', res.data);
}, err => {
  console.log('## ERROR WHILE DELETING MOVIE : ',err );
});
