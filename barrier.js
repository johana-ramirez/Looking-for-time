//class for the object barrier, which is the circles that outline the star 
const dotRadius = 3;

function Barrier(x, y, r) {
  //initial setup and object variables
  colorMode(HSL);
  this.x = x;
  this.y = y;
  this.r = r
  this.col = color("rgb(255,255,208)"); 

  //checks if the barrier intersected with another object 
  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    var safeDist = (this.r + other.r)
    //checks if the distance between both objects is too close
    if (d < safeDist) {
      return true;
    } else {
      return false; 
    }
  }
  
  //Barrier changes color (this happens when a creature hits it)
  this.changeColor = function(){
    this.col = "#F6B351";
  }
  
  //creates and displays the barrier 
  this.show = function(){
    noStroke(); 
    fill(this.col); 
    ellipse(this.x, this.y, this.r * 2, this.r * 2); 
  }
}

