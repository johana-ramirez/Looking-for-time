//Class for the object creature (comet-like shape)
//reference: (3) The Coding Train's video of Coding Object Trails

function Creature(x, y, xspeed, yspeed) {
  //initial setup and object variables 
  colorMode(HSL);
  this.x = x;
  this.y = y;
  this.r = 6 * 0.7
  this.xspeed = random(-5, 5);
  this.yspeed = random(-5, 5); 
  this.col = color("rgba(124,244,255,0.94)")
  //coordinates for the trail of creature 
  this.pastX = x;
  this.pastY = y; 
  //array to hold coordinates of creatures's past coordinates  
  this.history = []; 
   
  //updates the movement of the creature
  this.update = function(){
    //moves the creature 
    this.x += this.xspeed;
    this.y += this.yspeed; 
    //saves the creature past coordinate
    this.pastX = this.x + random(-3, 3)
    this.pastY = this.y + random(-3, 3)
    //saves the coordinates as a vector 
    var v = createVector(this.pastX, this.pastY)
    this.history.push(v); 
    if (this.history.length > 15) {
      this.history.splice(0, 1); 
    } 
  }
  
  //checks if creature has touched another object
  this.intersect = function(other) { 
    var d = dist(this.x, this.y, other.x, other.y); 
    var safeDist = (this.r + other.r)
    //checks if the distance between both objects is too close
    if ((d) < safeDist) {
      return true; 
    } else {
      return false; 
    }
  }
  
  //creates and displays the creature and its trail 
  this.show = function(){
    //creates the creature 
    stroke(this.col); 
    fill(this.col); 
    ellipse(this.x, this.y, this.r * 2, this.r * 2); 
    //creates the trail using multiple circles
    for (var i = 0; i < this.history.length; i ++){
      var pos = this.history[i];
      stroke(color(290 - (i * 8), 200, 90, 0 + (i * 0.09))); 
      fill(color(290 - (i * 8), 200, 90, 0 + (i * 0.09) )); 
      ellipse(pos.x, pos.y, i * 0.6 , i * 0.6); 
    }
  }
}
