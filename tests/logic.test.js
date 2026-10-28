'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const L=require('../logic.js');
const D=require('../data.js');

test('the eleven workshop notes and seven contiguous stages are complete',()=>{
  assert.equal(D.notes.length,11);assert.equal(new Set(D.notes.map(n=>n.id)).size,11);
  assert.deepEqual(D.notes.map(n=>n.name).sort(),['Vanilla','Lavender','Balsam fir','Sandalwood','Cedarwood','Bergamot','Cardamom','Pink pepper','Jasmine','Rosewood','Geranium'].sort());
  let end=0;for(const stage of D.stages){assert.equal(stage.start,end);end+=stage.minutes;}assert.equal(end,120);
  assert.match(D.stages[4].activity,/prepared liquid palette/);
});
test('the creative budget cannot be exceeded by any note or a combination',()=>{
  let r=L.blankRecipe();r=L.changeParts(r,'jasmine',30);r=L.changeParts(r,'cedarwood',30);
  assert.equal(r.jasmine,30);assert.equal(r.cedarwood,10);assert.equal(L.totalParts(r),40);
  r=L.changeParts(r,'jasmine',-100);assert.equal(r.jasmine,0);assert.equal(L.totalParts(r),10);
});
test('malformed imports cannot inject negative, nonfinite or extra ingredients',()=>{
  const r=L.cleanRecipe({'bergamot':-3,'cardamom':NaN,'pink-pepper':Infinity,'lavender':2.9,'unknown-note':40});
  assert.equal(r.bergamot,0);assert.equal(r.cardamom,0);assert.equal(r['pink-pepper'],0);assert.equal(r.lavender,2);assert.equal(r['unknown-note'],undefined);
  assert.ok(L.totalParts(L.cleanRecipe(Object.fromEntries(D.notes.map(n=>[n.id,100]))))<=40);
});
test('an arbitrary digital sketch never becomes a skin-use approval',()=>{
  for(const n of D.notes){const r=L.changeParts(L.blankRecipe(),n.id,40);assert.equal(L.readiness(r).releaseAllowed,false);assert.equal(L.readiness(r).status,'not_assessed');}
  assert.equal(L.readiness(L.blankRecipe()).releaseAllowed,false);
});
test('imported claims of approval and per-oil drop limits are ignored',()=>{
  const s=L.normalize({approved:true,releaseAllowed:true,status:'safe',safeDrops:{jasmine:40},recipe:{jasmine:40},story:{title:'A story'},checks:Object.fromEntries(D.preparation.map(([id])=>[id,true]))});
  assert.equal(s.approved,undefined);assert.equal(s.safeDrops,undefined);assert.equal(s.releaseAllowed,undefined);assert.equal(L.readiness(s.recipe).releaseAllowed,false);
  assert.equal(Object.values(s.checks).filter(Boolean).length,D.preparation.length);
});
test('untrusted saved colors and oversized text are constrained',()=>{
  const s=L.normalize({story:{color:'url(javascript:alert(1))',title:'a'.repeat(200),memory:'b'.repeat(1000)},visited:['jasmine','jasmine','missing'],gallery:Array(60).fill({title:'card'})});
  assert.equal(s.story.title.length,70);assert.equal(s.story.memory.length,500);assert.ok(L.COLORS.includes(s.story.color));assert.deepEqual(s.visited,['jasmine']);assert.equal(s.gallery.length,40);
});
test('finished-product percentage arithmetic uses the entire mass',()=>{
  assert.equal(L.referencePercent(.06,10),.6);assert.equal(L.referencePercent(.38,10),3.8);assert.equal(L.referencePercent(.04,10),.4);
  assert.equal(L.referencePercent(11,10),null);assert.equal(L.referencePercent(-1,10),null);assert.equal(L.referencePercent(1,0),null);assert.equal(L.referencePercent(Infinity,10),null);
});
test('family parts preserve the total without assigning chemistry or safety',()=>{
  const r=L.cleanRecipe({bergamot:5,jasmine:8,vanilla:9});assert.deepEqual(L.familyParts(r),{bright:5,floral:8,warm:9});
  assert.equal(L.readiness(r).active,3);assert.equal(L.totalParts(r),22);
});
