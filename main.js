var prediction = ""

Webcam.set({

    width:350,
    height:300,
    image_format:"png",
    png_quality:90
  })
  
  Webcam.attach("#camera")
  
  function snapshot(){
   Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='capimg' src = '" + data_uri + "'>"
   })
  }
  
  console.log("ml5 version :", ml5.version)
  
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/c3Aeb8Q-g/model.json", modelloaded)
  
  function modelloaded(){
    console.log("model loaded")
  }

  function speaking(){

    synth = window.speechSynthesis
    spe1 =    prediction
    utter = new SpeechSynthesisUtterance(spe1)
    synth.speak(utter)
}

function check(){

    img = document.getElementById("capimg")
    classifier.classify(img, gotresults)
}

function gotresults(error, result){

    if(error){
        console.error(error)
    }
    else{
        console.log(result)

        document.getElementById("ename1").innerHTML= result[0].label
     

        prediction = result[0].label
        
        speaking()
          
        if(result[0].label == "All the best"){
            document.getElementById("emname1").innerHTML = "&#128077"
        }

        if(result[0].label == "That was a marvelous victory"){
            document.getElementById("emname1").innerHTML = "&#9996 "
        }

        if(result[0].label == "This looks amazing"){
            document.getElementById("emname1").innerHTML = "&#128076"
        }

        
    }
}