
//arrays for the comet-shaped creatures and circles of the shape
let creatures = []; 
let barriers = []; 
//variables for time 
let timeNow = new Date();
let min = timeNow.getMinutes();
let seconds = timeNow.getSeconds();
//variable for radius of the circles for barriers 
let rad; 
// boolean for if creatures should be created
let createCreatures = true; 
//color for background shape of star
const backCol = "rgba(64,4,65,0.7)"; 

function setup() {
  createCanvas(600, 600);

  //for changing minutes transition
  if (seconds == 0){
    rad = 0.1; 
  }
  else{
    rad = dotRadius; //dotRadius = 5
  }

  //draws the shape of the star
  if (min == 0) { 
    zeroMin(); //function to create shape for 0 mins
  }
  else{
    if (min == 1){
      oneMin(); //function to create shape for 1 mins
    }
    else if (min == 2){
      twoMins(); //function to create shape for 2 mins
    }
    else if (min == 3){
      threeMins(); //function to create shape for 3 mins
    }
    else if (min == 4){
      //contains array of vertices 
      let circlesArr = starVertex(width/2, height/2, 250, 200, 2);
      //creates outline of shape with circles
      star(circlesArr); 
    }
    //for minutes 5 to 59
    else{
      let circlesArr = starVertex(width/2, height/2, 250, 200, min);
      star(circlesArr);
    }
  }
}

//
function draw() {
  noStroke(); 
  background("rgb(8,8,33)");
  //time variables for current seconds and mminutes
  let currTime = new Date();
  let nowSecs = currTime.getSeconds();
  let nowMins = currTime.getMinutes();
  //creates a new creature if seconds has increased
  if (nowSecs > seconds){  
    creatures.push( new Creature( width/2 , height/2))
    seconds = nowSecs; 
  }
  //transition for when current minute is at 59 seconds
  if (nowSecs == 59){
    barriers.forEach( b => {
    //makes circles smaller so it looks like they dissapeared 
    if (b.r > 0.5){
      b.r = b.r * 0.87
    }
   })
  }
 
  //updates the star shape and creatures when the minute has changed
  if (nowMins > min || (nowMins == 0 && min == 59)){
    clear()
    background("rgb(8,8,33)");
    //makes radius of barrier circles smaller
    rad = 0.5; 
    //can create creatures again for initial setup 
    createCreatures = true; 
    //empty barriers and creatures array
    barriers = []
    creatures = []
    //creates star shape based on current Minute
    //for minutes 1 - 4
    if(nowMins == 0){
      zeroMin(); 
    }
    else if (nowMins == 1){
      oneMin();
    }
    else if (nowMins == 2){ 
      twoMins(); 
    }
    else if (nowMins == 3){
      threeMins(); 
    }
    else if (nowMins == 4){ 
      circlesArr = starVertex(width/2, height/2, 250, 200, 2);
      star(circlesArr);
    }
    //for minutes 5 - 59
    else {
      circlesArr = starVertex(width/2, height/2, 250, 200, nowMins);
      star(circlesArr);
    }
    //update variables  
    min = nowMins;
    seconds = 0; 
  }
  
  //creates colored background shape of the star
  //for minutes 1 - 4
  if (min == 1){
    lineMin();
  }
  else if (min == 2){
    arcMin(); 
  }
  else if (min == 3){
    triangleMin();
  }
  else if (min == 4){
    starBack(width/2, height/2, 250, 200, 2); 
  }
  //for minutes 5 - 59
  else{
    starBack(width/2, height/2, 250, 200, min); 
  }
  
  //showcases the barrier circles, checks if the creatures have 
  //hit the barriers of the star
  for (let i = 0; i < barriers.length; i++)  {
    //increases radius of barriers for updated minuted transtion
    if (barriers[i].r < 3){
      barriers[i].r *= 1.1; 
    }
    //displays the barriers
    barriers[i].show(); 
    //check if the creature touched the barrier 
    for (let j = 0; j < creatures.length; j ++){
      if (barriers[i].intersects(creatures[j])){
      //changes direction of creature to opposite
      barriers[i].changeColor(); 
      creatures[j].xspeed *= -1;
      creatures[j].yspeed *= -1;
      }
    }  
  }

  //creates initial creatures when you start the program
  if (createCreatures == true){
    //creates creatures based on current second 
    for (let j=0; j<seconds; j++){
      creatures.push( new Creature( width/2 + (j), height/2 + (j))) 
    }
    //only draw once for when you start the program 
    createCreatures = false; 
  }
  //if a creature bumps into another create, it changes direction
  for (let k = 0; k < creatures.length; k++)  {
    //display and move creatures
    creatures[k].show();
    creatures[k].update();
    //check if creature intersected with another creature
    for (var n = 0; n < creatures.length; n ++){
      if (n != k && creatures[k].intersect(creatures[n])){
      creatures[k].xspeed *= -1;
      creatures[k].yspeed *= -1;
      creatures[n].xspeed *= -1;
      creatures[n].yspeed *= -1;
      }
    }
  }
}

//HELPER FUNCTIONS 
//input: integer, integer, integer, integer, integer 
//output: returns an array of vertices for the star shape
//reference: (1) example on p5js.org on how to draw a star shape
function starVertex(x, y, radius1, radius2, npoints) {
  //arrays to hold x and y coordinates
  let circlePosX = []; 
  let circlePosY = [];
  //array to hold circlePosX and circlePosY
  let circlePos = [];
  //var for star shape
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    circlePosX.push(sx);
    circlePosY.push(sy);
    barriers.push( new Barrier(sx, sy, rad * 0.7)) 
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    barriers.push( new Barrier(sx, sy, rad * 0.7))
    circlePosX.push(sx);
    circlePosY.push(sy); 
  }
  circlePos.push(circlePosX);
  circlePos.push(circlePosY);
  return circlePos;
}

//input: integer, integer, integer, integer, integer 
//output: draws the colored shape of the star
//reference: (1) example on p5js.org on how to draw a star shape, 
//(5) explanation on the example from p5js on stackoverflow 
function starBack(x, y, radius1, radius2, npoints) {
  //when npoints == 2, draws a diamond shape for four points
  if (npoints == 4){ 
    npoints = 2; 
  }
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  //color of background
  fill(backCol); 
  //draw a circle in min 0
  if (npoints == 0){
    ellipse(width/2, height/2, 400, 400); 
  }
  //draw background shape using vertices 
  else{
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

//input: array that contains x and y cordinates
//output: returns an array of vertices for the star shape
function star(circles){
  //seperate the x and y coordinates
  let circlePosX = circles[0];
  let circlePosY = circles[1];
  //creates line of circles between first and last vertices 
  lerpBarrier( circlePosX[0], circlePosY[0], circlePosX[circlePosX.length - 1], circlePosY[circlePosX.length - 1]);
  //creates outline of the shape with circles
  for(let i = 0; i < circlePosX.length ; i+=2){
    lerpBarrier(circlePosX[i], circlePosY[i], 
               circlePosX[i+1], circlePosY[i+1]);
  }
  for(let j = 1; j < circlePosX.length - 1; j+=2){
    lerpBarrier( circlePosX[j], circlePosY[j], 
               circlePosX[j+1], circlePosY[j+1]);
  }
}

//input: integer, integer, integer, integer 
//output: creates a trail of circles between two points 
//reference: (2) code on using lerp to get the coordinates of circles iin between two vertices 
function lerpBarrier( pos1X, pos1Y, pos2X, pos2Y){
  //calculate divisions or spacing of the outline
  //calculate how many circles are needed to fill up the space 
  let d = dist(pos1X, pos1Y, pos2X, pos2Y)
  let divisions = floor(d/6.5); 
  //calculate the coordinates of the circles
  for(let i = 0 ; i < divisions; i++){
    let interAmount = map(i, 0, divisions - 1, 0.0, 1.0);
    // calculate interpolated position
    let interX = lerp(pos1X, pos2X, interAmount);
    let interY = lerp(pos1Y, pos2Y, interAmount);
    barriers.push( new Barrier(interX, interY, rad))
  }
}
 
//output: draws a circle for minute 0
function zeroMin(){
  let len = 180;
  let r = 200;
  //creates circle outline made out of circles
  for(let i=0; i<len; i++) {
     const x= width /2 + r * sin(i/len * TWO_PI)
     const y= height/2 + r * cos(i/len * TWO_PI)
     barriers.push( new Barrier(x,y, rad))
   } 
}
 
//output: draws a triangle for minute 3
function threeMins(){
  //creates outline of triangle with circles
  lerpBarrier( 100, 500, 500, 500);
  lerpBarrier( 100, 500, width/2, 100);
  lerpBarrier( width/2, 100, 500, 500);
}

//output: draws the shape of a triangle
function triangleMin(){
  fill(backCol); 
  triangle(100, 500, 500, 500, width/2, 100);
}

//output: draws a rectangle for minute 1 
function oneMin(){
  //creates outline of triangle with circles
  lerpBarrier( 250, 550, 350, 550);
  lerpBarrier( 250, 550, 250, 50);
  lerpBarrier( 350, 50, 250, 50);
  lerpBarrier(350, 550, 350, 50);
}

//output: draws the shape of a rectanlge
function lineMin(){
  fill(backCol);
  rect(250, 50, 100, 500);
}

//output: draws the outline of a semicircle with circles
function twoMins(){
  //frequency of circles and radius 
  const len = 100;
  const r = 200
  //array that contains vertices of shape
  const circlesLerp = []
  for(let i=0; i<len; i++) {
    const x= width /2.7 + r * sin(i/(len* 1.95) * TWO_PI) 
    const y= height/2 + r * cos(i/(len * 1.95) * TWO_PI)  
    barriers.push( new Barrier(x,y, rad))
    if (i == 0 || i == len - 1){
      circlesLerp.push(x); 
      circlesLerp.push(y); 
    }
  }
  //creates outline of semicircle with circles
  lerpBarrier(circlesLerp[0], circlesLerp[1], circlesLerp[2], circlesLerp[3]);
}

//output: draws the shape of a semicircle for minute 2
//reference: (4) youtube video to understand how arcs work in P5
function arcMin(){
  fill(backCol);
  arc(220, 300, 410, 400, radians(268) , radians(90), CHORD)
}
 


