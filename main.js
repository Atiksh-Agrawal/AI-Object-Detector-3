status = "";

objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(380,320);
    canvas.position(450,275);

    video = createCapture(VIDEO);
    video.hide()
}

function draw(){
    image(video,0,0,480,380);

    
    if(status!=""){
        objectDetector.detect(video,getResults);
        
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("num_of_objects").innerHTML = "Number Of Objects Detected : " + objects.length;
  
            fill("red");
            stroke("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "  " + percent + "%",objects[i].x+15,objects[i].y+15); 
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == nameFromTextInput){
                video.stop();
                objectDetector.detect(getResults);
                document.getElementById("name_of_objects_shown").innerHTML= nameFromTextInput+" Found !";
                 synth = window.speechSynthesis;
                 utterThis = new SpeechSynthesisUtterance(nameFromTextInput+" Found !");
                 synth.speak(utterThis);
            }
            else{
                document.getElementById("name_of_objects_shown").innerHTML= nameFromTextInput+" not found !";
                synth = window.speechSynthesis;
                 utterThis = new SpeechSynthesisUtterance(nameFromTextInput+" not found !");
                 synth.speak(utterThis);
            }
        }
      }
  
}

function Start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    console.log("check");
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    nameFromTextInput = document.getElementById("name_of_objects").value;
}

function modelLoaded(){
    console.log("cocossd is loaded");
    status = true;
}

function getResults(error,results){
    if(error){
        console.error(error);
    }
 
    else{
        console.log(results);
        objects = results;
    }
 }
