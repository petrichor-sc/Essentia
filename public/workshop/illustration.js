// A lightweight SVG counterpart for browsers without a WebGL2 context.
const GOLD='#c9a465', LIGHT='#e1c38b', PURPLE='#c0ace8';
function label(x,y,text,anchor='start',active=false){return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${active?LIGHT:'#b9aec5'}" class="svg-label">${text}</text>`;}
function line(path,color=PURPLE,opacity=.3,width=1){return `<path d="${path}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;}
function dot(x,y,r=2.4,color=GOLD,opacity=.8){return `<circle cx="${x}" cy="${y}" r="${r*2.3}" fill="${color}" opacity="${opacity*.07}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`;}
function movingDot(path,i,{size=2.2,color=GOLD,duration=9,opacity=.8}={}){return `<g opacity="${opacity}"><circle r="${size*2.4}" fill="${color}" opacity=".09"/><circle r="${size}" fill="${color}"/><animateMotion path="${path}" dur="${duration}s" begin="-${(i*.417)%duration}s" repeatCount="indefinite"/></g>`;}
function brain(cx,cy,rx,ry){
  let svg=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#brain-shade)" stroke="${PURPLE}" stroke-opacity=".35"/>`;
  for(let i=0;i<10;i++){let x=cx-rx*.83+i*rx*.185,h=ry*Math.sqrt(Math.max(0,1-((x-cx)/rx)**2))*.9;let path=`M${x},${cy-h}`;for(let k=1;k<22;k++)path+=` L${x+Math.sin(k*.7+i)*6},${cy-h+2*h*k/21}`;svg+=line(path,PURPLE,.22,.8);}
  for(let i=0;i<3;i++){let y=cy+(i-1)*ry*.5,mx=rx*.85,path=`M${cx-mx},${y}`;for(let k=1;k<28;k++)path+=` L${cx-mx+mx*2*k/27},${y+Math.sin(k*.8+i)*3.8}`;svg+=line(path,PURPLE,.13,.8);}
  return svg;
}
function anatomy(step){
  if(step===1){
    let svg=label(44,58,'A CLOSER LOOK', 'start',true)+label(44,77,'Olfactory epithelium');
    svg+=`<path d="M45 150H610V255H45Z" fill="url(#tissue-shade)"/>`+line('M45 150H610',PURPLE,.24)+line('M45 254H610',PURPLE,.16);
    for(let i=0;i<10;i++){
      let x=68+i*54,chosen=i===4,col=chosen?LIGHT:PURPLE;
      svg+=line(`M${x} 175V143M${x} 147q-12-21-24-23M${x} 147q-5-27-11-32M${x} 147v-34M${x} 147q6-26 13-31M${x} 147q13-20 25-20`,col,chosen?.95:.4,chosen?1.4:1);
      svg+=`<rect x="${x-11}" y="170" width="22" height="63" rx="11" fill="${col}" opacity="${chosen?.65:.13}" stroke="${col}" stroke-opacity=".3"/>`+dot(x,200,3.7,col,.7);
      svg+=line(`M${x} 233V277Q${x} 308 300 345`,col,chosen?.85:.15,chosen?1.3:1);
    }
    for(let i=0;i<24;i++)svg+=movingDot(`M${55+(i*29)%550} 48 Q${68+(i*31)%520} 100 ${284+(i%3-1)*7} 125`,i,{size:1.6+(i%3)*.4,duration:10+(i%4),opacity:.6});
    svg+=movingDot('M284 172V233V277Q284 308 300 345',3,{size:3,color:LIGHT,duration:3.7});
    svg+=label(570,106,'Receptors on cilia','end',true)+line('M474 111H420L347 125',GOLD,.4);
    svg+=label(565,287,'Sensory neurons','end')+line('M470 292 442 235',GOLD,.3);
    svg+=label(300,382,'Electrical signals towards the olfactory bulb','middle',true);return svg;
  }
  const path='M238 399L241 322Q194 293 186 239Q168 192 183 127Q200 56 276 43Q347 29 389 80Q408 104 409 139L430 179L466 209Q470 220 445 224L432 225L437 246L425 256L435 268Q429 295 383 303L379 399';
  let svg=`<ellipse cx="305" cy="211" rx="165" ry="183" fill="none" stroke="${PURPLE}" stroke-opacity=".055"/>`;
  svg+=`<path d="${path}" fill="url(#head-shade)" stroke="${PURPLE}" stroke-opacity=".55" stroke-width="1.3"/>`;
  svg+=brain(291,119,94,65);
  svg+=line('M432 225Q395 229 363 209Q344 196 317 196',PURPLE,.45)+line('M432 202Q399 190 371 184Q347 180 321 184',PURPLE,.35);
  svg+=line('M412 155q-12-8-23 2M432 249l-24-2M317 196q-22 54-1 89v87',PURPLE,.2);
  svg+=`<path d="M324 183Q345 176 370 181" stroke="${GOLD}" stroke-width="3" fill="none" opacity=".6"/>`;
  for(let i=0;i<9;i++){const x=328+i*4.9;svg+=line(`M${x} 183v9m-3-9 3-3 3 3`,GOLD,.6,.7);}
  const neural='M348 190L348 172Q351 162 360 161Q332 164 312 174Q296 174 285 160';
  svg+=line(neural,GOLD,step>=2?.85:.22,1.8)+dot(359,162,3.7,LIGHT,.9);
  const inhale='M578 240Q518 233 445 223Q394 222 352 186';
  svg+=line(inhale,GOLD,.12,.8);
  for(let i=0;i<23;i++)svg+=movingDot(`M${550+(i%5)*13} ${225+Math.sin(i)*17}Q505 230 445 223Q395 221 352 186`,i,{duration:8+(i%3),size:1.5+(i%3)*.55,opacity:.65});
  if(step>=2)for(let i=0;i<5;i++)svg+=movingDot(neural,i,{duration:3.8,color:LIGHT,size:2.5});
  svg+=label(486,126,'Olfactory bulb','start',true)+line('M477 131H428L365 160',GOLD,.45);
  svg+=label(503,295,'Nasal cavity')+line('M493 299 404 238',GOLD,.28);
  svg+=label(163,190,'Olfactory cortex','end',step===3)+line('M172 185 276 163',GOLD,.28);
  svg+=label(166,298,'Sensory neurons','end')+line('M177 290 337 191',PURPLE,.22);
  return svg;
}
function memory(step){
  let svg=`<ellipse cx="314" cy="214" rx="218" ry="149" fill="none" stroke="${GOLD}" stroke-opacity=".09"/><ellipse cx="314" cy="214" rx="192" ry="132" fill="none" stroke="${PURPLE}" stroke-opacity=".1"/>`;
  svg+=brain(309,203,169,113);
  const paths=['M567 325Q485 316 441 288Q402 260 342 242Q322 229 310 214','M310 214Q292 192 330 170Q353 155 371 183','M310 214Q274 225 240 201Q215 173 253 143'];
  paths.forEach((p,i)=>{svg+=line(p,i===2?PURPLE:GOLD,i===0||step>0?.75:.2,i===0?1.8:1.2);if(i===0||step>0)for(let j=0;j<4;j++)svg+=movingDot(p,j,{color:i===2?PURPLE:LIGHT,duration:5.5+j*.5,size:2});});
  svg+=dot(440,288,3,GOLD,.9)+dot(371,183,5,GOLD,.9)+dot(253,143,5,PURPLE,.9);
  svg+=`<circle cx="371" cy="183" r="11" fill="none" stroke="${GOLD}" stroke-opacity=".4"/><circle cx="253" cy="143" r="12" fill="none" stroke="${PURPLE}" stroke-opacity=".4"/>`;
  for(let i=0;i<16;i++){let a=i/16*Math.PI*2,x=309+Math.cos(a)*165,y=203+Math.sin(a)*110;svg+=line(`M310 214Q${309+Math.cos(a)*85} ${203+Math.sin(a)*60} ${x} ${y}`,PURPLE,step===2?.22:.08,.6);svg+=dot(x,y,1.2,i%3===0?GOLD:PURPLE,.4);}
  svg+=label(172,73,'Memory networks','end',true)+line('M182 80 247 137',PURPLE,.4);
  svg+=label(489,101,'Emotion networks','start',true)+line('M479 107 378 178',GOLD,.4);
  svg+=label(489,350,'Olfactory bulb','start')+line('M480 343 444 292',GOLD,.3);
  svg+=label(175,320,'Olfactory cortex','end')+line('M184 313 306 219',GOLD,.3);
  if(step===2)svg+=label(224,397,'A person. A place. A moment.','start');
  return svg;
}
function person(x,y,scale=1,opacity=.65,walking=false){
  const legs=walking?'M-8 100l-22 73m41-73 30 69':'M-9 100l-5 74m24-74 5 74';
  return `<g transform="translate(${x} ${y}) scale(${scale})" opacity="${opacity}"><ellipse cy="181" rx="36" ry="5" fill="#08040e"/><circle cy="8" r="14" fill="url(#figure-shade)" stroke="${PURPLE}" stroke-opacity=".2"/><path d="M-16 37Q-24 70-17 105H18Q23 68 16 37Q0 24-16 37Z" fill="url(#figure-shade)" stroke="${PURPLE}" stroke-opacity=".2"/><path d="M-19 43-28 93m47-50 10 50${legs}" fill="none" stroke="${PURPLE}" stroke-width="11" stroke-opacity=".68" stroke-linecap="round"/><path d="M-16 43v55" stroke="#e9dffc" stroke-opacity=".19" stroke-width="2"/></g>`;
}
function character(s){
  const warm=s.weather==='summer'?1.25:s.weather==='winter'?.73:1,air=s.airflow/100;
  let svg='';
  if(s.step<=1){
    for(let i=0;i<5;i++)svg+=`<ellipse cx="350" cy="364" rx="${59+i*44}" ry="${11+i*8}" fill="none" stroke="${PURPLE}" stroke-opacity="${i===0?.15:.055}"/>`;
    svg+=person(112,185,.97,.2)+person(355,139,1.25,.75,s.step===1&&s.movement);
    if(s.step===0)svg+=`<ellipse cx="355" cy="366" rx="125" ry="27" fill="none" stroke="${GOLD}" stroke-opacity=".35"/>`;
    const walking=s.step===1&&s.movement;
    for(let i=0;i<115;i++){
      let a=i*2.399,r=(10+(i%15)*3.1)*warm,x=355+Math.sin(a)*r,y=191-i%40*3.2;
      const col=i%9===0?PURPLE:GOLD;
      if(walking){x=355-(i/115)*285*Math.min(1.08,warm);y=203+Math.sin(a)*(.12*i+4);svg+=movingDot(`M355 203Q${x+20} ${y-7} ${x} ${y}`,i,{color:col,duration:(4.5+(i%8)*.6)/warm,size:1.1+(i%3)*.4,opacity:Math.max(.13,.7-i/220)});}
      else svg+=movingDot(`M${355+Math.sin(a)*10} 218Q${x} 171 ${x+air*120} ${y-32}`,i,{color:col,duration:(7+i%7)/warm,size:1.1+(i%4)*.4,opacity:.32+(i%4)*.1});
    }
    if(s.step===1){svg+=label(159,121,'Sillage','start',true)+label(159,142,walking?'A trail through the air':'Switch to walking to see the trail');}
    else svg+=label(470,160,'Projection','start',true)+label(470,181,'The scent around you');
    return svg;
  }
  if(s.step===2){
    svg+=`<path d="M99 308H555V342H99Z" fill="url(#skin-shade)" stroke="${GOLD}" stroke-opacity=".2"/>`;
    for(let i=0;i<4;i++)svg+=line(`M100 ${319+i*5}Q310 ${310+i*5} 553 ${321+i*5}`,PURPLE,.08,.5);
    const persistence=s.material==='bright'?.85:s.material==='lasting'?.2:.5,left=Math.max(.02,1-(s.age/100)*(.5+persistence));
    for(let i=0;i<120*left;i++)svg+=dot(112+i%40*11.15,302-Math.floor(i/40)*7,1.7,i%5===0?PURPLE:GOLD,.7);
    for(let i=0;i<55*left;i++){let x=130+(i*31)%400;svg+=movingDot(`M${x} 290Q${x-15} 220 ${x+10} ${118+(i%9)*10}`,i,{duration:6+(1-persistence)*8,size:1.7,opacity:.45*left});}
    svg+=label(325,375,'A diminishing deposit on the surface','middle')+label(327,85,'Evaporation over time','middle',true);
    return svg;
  }
  for(let i=0;i<4;i++){
    const x=112+i*145,selected=[5,10,15,20][i]===s.concentration;
    svg+=`<g opacity="${selected?1:.55}"><ellipse cx="${x}" cy="314" rx="49" ry="9" fill="#08040e"/><rect x="${x-41}" y="142" width="82" height="166" rx="8" fill="url(#glass-shade)" stroke="${selected?LIGHT:PURPLE}" stroke-opacity="${selected?.8:.3}"/><rect x="${x-33}" y="158" width="66" height="142" rx="5" fill="${GOLD}" opacity="${.08+i*.09}"/><path d="M${x-34} 155v131" stroke="#f4ede0" stroke-opacity=".14"/><rect x="${x-20}" y="115" width="40" height="27" rx="2" fill="url(#cap-shade)" stroke="${GOLD}" stroke-opacity=".35"/>${label(x,343,['Cologne','Eau de toilette','Eau de parfum','Extrait'][i],'middle')}${label(x,365,'~'+[5,10,15,20][i]+'%','middle',true)}</g>`;
  }
  svg+=label(326,73,'Illustrative examples · concentration ranges overlap','middle');return svg;
}
export function fallbackIllustration(state){
  const defs=`<defs><linearGradient id="head-shade" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#604577" stop-opacity=".22"/><stop offset="1" stop-color="#c0ace8" stop-opacity=".05"/></linearGradient><radialGradient id="brain-shade"><stop stop-color="#8e6ba9" stop-opacity=".18"/><stop offset="1" stop-color="#75528e" stop-opacity=".04"/></radialGradient><linearGradient id="tissue-shade" x2="0" y2="1"><stop stop-color="#594069" stop-opacity=".25"/><stop offset="1" stop-color="#594069" stop-opacity=".03"/></linearGradient><linearGradient id="figure-shade"><stop stop-color="#78638c"/><stop offset=".45" stop-color="#c5b8d4"/><stop offset="1" stop-color="#71607e"/></linearGradient><linearGradient id="skin-shade" x2="0" y2="1"><stop stop-color="#8e667e" stop-opacity=".65"/><stop offset="1" stop-color="#473043" stop-opacity=".8"/></linearGradient><linearGradient id="glass-shade"><stop stop-color="#b9a2d0" stop-opacity=".09"/><stop offset=".5" stop-color="#aa8bc4" stop-opacity=".03"/><stop offset="1" stop-color="#b9a2d0" stop-opacity=".13"/></linearGradient><linearGradient id="cap-shade"><stop stop-color="#483721"/><stop offset=".48" stop-color="#b0935e"/><stop offset="1" stop-color="#594628"/></linearGradient></defs>`;
  return `<svg viewBox="0 0 660 430" aria-hidden="true">${defs}${state.chapter===0?anatomy(state.step):state.chapter===1?memory(state.step):character(state)}</svg>`;
}
