const MAX_SPEED = 2;
const DRAW_DISTANCE_THRESHOLD = 200;

//an array to store all our agents
var agents = [];

function setup() {
  createCanvas(800, 800);
  background(0);

  print("Testing the debug console in VS Code");
  
  for (let i = 0; i < 16; i++) {
    createAgent(random(width), random(height));
  }
}

function draw() {
  // background(255);
  
  for (let i = 0; i < agents.length; i++) {
    
    let a = agents[i];
    
    a.move();
    
    //look at all the other agents in the array
    for (let j = i + 1; j < agents.length; j++) {
      
      let otherAgent = agents[j];
      
      //dist(x1, y1, x2, y2)
      let d = dist(a.x, a.y, otherAgent.x, otherAgent.y);
      
      if (d < DRAW_DISTANCE_THRESHOLD) {
        
        let strokeColor = map(d, 0, DRAW_DISTANCE_THRESHOLD, 0, 255);
        
        stroke(strokeColor, 25);
        line(a.x, a.y, otherAgent.x, otherAgent.y);  
      }
    }
  }
}

function createAgent(posX, posY) {
  
  let agent = {

    x : posX,
    y : posY,
    dirX : random(-1, 1) * MAX_SPEED,
    dirY : random(-1, 1) * MAX_SPEED,
    
    move : function() {
      this.x += this.dirX;
      this.y += this.dirY;
      
      this.keepInBounds();
    },
    
    keepInBounds : function() {
      if (this.x < 0 || this.x > width) {
        this.dirX *= -1;
      }
      
      if (this.y < 0 || this.y > height) {
        this.dirY *= -1;
      }
    }
    
  };
  
  agents.push(agent);
}