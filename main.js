img = "";
status = "";
objects = [];



function preload() {
   
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(380,380);
  video.hide();}
  
  function start(){
  objectdectector = ml5.objectDetector('cocosd', modalloaded);
  document.getElementById("status").innerHTML = "status : detecting objects";}


function modalloaded() {
  console.log("modalloaded");
  status = true;
  


}

function gotresult(error, results) {
  if (error) {
    console.error(error);

  } else {
    console.log(results);
    objects = results;

  }
}

function draw() {
  image(video, 0, 0, 640, 420);
  if (status != "") {
    r=random(255);
    g=random(255);
    b=random(255);
    
    objectdectector.detect(video, gotresult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("number_of_object").innerHTML="number of object detected are:"+ objects.length;

      document.getElementById("status").innerHTML = "status : detected objects";
      fill(r,g,b);


      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].hieght);
    }
  }

}