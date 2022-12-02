song="";

function preload(){
song=loadSound("music.mp3");
}
leftWristX=0;
laftWristY=0;
rightWristX=0;
rightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;


function setup(){
canvas=createCanvas(300,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLaoded);
poseNet.on('pose',gotPosses);
}

function modelLaoded(){
    console.log("modelIsLoaded");
}

function gotPosses(reasults){
    if(reasults.lenght>0){
        console.log(reasults);
        leftWristX=reasults[0].pose.leftWrist.x;
        leftWristY=reasults[0].pose.leftWrist.y;
        rightWristX=reasults[0].pose.rightWrist.x;
        rightWristY=reasults[0].pose.rightWrist.y;

        scoreLeftWrist=reasults[0].pose.keypoints[9].score;
        scoreRightWrist=reasults[0].pose.keypoints[10].score;
    }
}




function draw(){
image(video,0,0,300,400);
fill("green");
stroke("aqua");
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    inNumberLeftWristY=Number(leftWristY);
    remove_decimals=floor(inNumberLeftWristY);
    volume=remove_decimals/400;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
}
if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<=80){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>80 && rightWristY<=160){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristY>160 && rightWristY<=240){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>240 && rightWristY<=320){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristY>320 && rightWristY<=400){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }

}
}

function play(){
    song.play();

    song.setVolume(1);
    song.rate(1);
}