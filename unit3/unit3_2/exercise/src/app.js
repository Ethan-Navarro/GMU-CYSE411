const express = require('express');
const _ = require('lodash');
const minimist = require('minimist');

const app = express();

app.get('/',(req,res)=>{
  const nums=[1,2,3];
  res.send(_.join(nums,','));
});

app.listen(3000, ()=>{
 console.log('Running on 3000');
});