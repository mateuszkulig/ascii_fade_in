function ASCIIAnimation(animArray, speed, DOMtarget) {
    var currentFrame = 0;
    DOMtarget.innerHTML = animArray[0];
    currentFrame++;
    this.animation = setInterval(function() {
        DOMtarget.innerHTML = animArray[currentFrame];
        currentFrame++;
        if(currentFrame >= animArray.length) currentFrame = 0;
    }, speed);
    this.getCurrentFrame = function() {
        return currentFrame;
    }
}
  
ASCIIAnimation.prototype.stopAnimation = function() {
        clearInterval(this.animation);
}

function makeDiv() { return document.createElement("div"); }
function bodyAppend(element) { document.body.appendChild(element); }

const hackLogo = `
                        ,                                                  ,.                       
                       .,                                                  ,,                       
                      ..,.          ,,,,,,,,,,,,,,,,,,,,,,,,,,,,           ,,.                      
                      .,,,    ,,,,,,,,,,,,,,*,,/,,/,/*,/,,,,,,,,,,,,,,     ,,..                     
                     ..,,,,,,,,,,,/**,,,,,,,,,,,,,,,,,,,,,,,,//,,*/,,,,,,,,,,,..                    
                    ...,,,,,,,/,/,,,,,                        ,,,,,,,,/,,,,,,,..                    
                   ,...,,,,,,,,,                                    ,,,,,,,,,...,                   
                 ,,,,...,,,,,,                                        ,,,,,,,..,,,,,                
              ,,,,,,,,...,,,,,,,,                .,                ,,,,,,,,,...,,,,,,,              
             ,,,//,,,,....,,,,,,,,,,       .....,,,,......      ,,,,,,,,,,,...,,,,//,,,,            
           ,,,,,,,,,   ....,,,,,,,,,,...........,,(,...........,,,,,,,,,,,...   ,,,,,,,,,           
          ,,,/,,,,      ......,,,,,,............,(#/,............,,,,,.......     ,,,//,,,,         
        ,,,/,,,,,         ,.....................,,,,,.....................         ,,,/,,,,,        
       ,,,,**,,,              ..................,(#(,.................,              ,,,,,,,,       
      ,,,,,,,,,                ................,,,,,,................                 ,,,,,,,,      
      ,,,,,,,,                 .........,,,,,,/(*/(,/#,,,,,,,.........                ,,,,,,,,      
     ,,,,/,,,                 ,,,,,(/,,,,(((,,,(,,(,#,,,*##(,,,,#(,,,,,                ,,/,,,,,     
     ,,,,*,,,                 ,,,,,,,,,,,,,,,,,(,,,#,,,,,,,,,,,,,,,,,,,                 ,,,,,,,     
     ,,,///,                  ........................................                  ,,*/,,,,    
     ,,,//,,                   ..//..............................((#..                  ,,,,*,,,    
     ,,,,,,,                   ..######((/////......../((((##%%%%%%%..                  ,,,,,,,,    
     ,,,,/,,                   .*###########(((......###%%%%%%%%%%%%.                   ,,,,,,,,    
     ,,,,,,,,                  *(##############,.....%%%%%%%%*%%(%%%/                  ,,,,,,,,     
     ,,,,,,,,                .**(###############..../%%%%%*%,%#%%%%%///                ,,,,,,,,     
      ,,,,*/,,              ***(#################%%%%%%%%/%%%%%%%%%////,               ,,,,,,,      
       ,,,,/,,,            ****(##########/******///////%%%%%%%%%%%/////              ,,,*,,,       
        ,,,,/*,,            ******######**********///////////%%%%%%%////            ,,,/,,,,,       
         ,,,,,,,,            ******###***********///////////%%%%%/////              ,,,,,,,         
          ,,,,,/,,,         ****************(#####%%%%%%//////%//////////        ,,,,,/,,,          
           ,,,,,/,,,,     ****************########%%%%%%%%////////////////     ,,,,//,,,,           
             ,,,,,,,,,,    *********,,****######%%%%%%%////*///////////      ,,,,,,,,,,             
               ,,,,,,,,,,,  **********************/////////////*////////  ,,,,,,,,,,,               
                 ,,,,,,,,,,,**********************///////////////////////,,,,,,,,,,                 
                    ,,,,,,************************////////////////////////,,,,,,                    
                       ,,,************************////////////////////////,,,                       
                           **.,,,***************////////////////,,.////                           
                           *. ,,,,**************//////////////,,,,  ///                           
                          ****      ************////////////       //////                         
                         ******             ****////.             ///////                         
                          ***                                      /////                          
                           /*,                                         //
`.replaceAll('\n', "<br>");
const animSpeed = 100;

let newLogo1 = "";
let newLogo2 = "";

let hackDiv = makeDiv();
bodyAppend(hackDiv);
hackDiv.style.fontFamily = "monospace";
var hackGlitch = [newLogo1, newLogo1];
var anim2 = new ASCIIAnimation(hackGlitch, animSpeed, hackDiv);

function generateNewHack() {
    // generate "logo" from random characters
    for (let i=0; i<hackLogo.length; i++) {
        if(hackLogo[i] == '<') {
            newLogo1 += "<br>";
        } else if (newLogo1[i] == "b" || newLogo1[i] == "r" || newLogo1[i] == ">") {
            continue;
        } else {
            newLogo1 += getRandomChar();
        }
    }
}

function advanceHack() {
    // progress logo to original state
    newLogo1 = newLogo1.replaceAll("<pre>", "").replaceAll("</pre>", "")
    for (let i=0; i<newLogo1.length; i++) {
        if(newLogo1[i] == '<' || newLogo1[i] == "b" || newLogo1[i] == "r" || newLogo1[i] == ">" || newLogo1[i] == hackLogo[i]) {
            newLogo2 += newLogo1[i];
        } else {
            newLogo2 += getRandomChar();
        }
    }
    newLogo2 = "<pre>" + newLogo2 + "</pre>";
    newLogo1 = newLogo2;
    newLogo2 = "";
}

function getRandomChar() {
    // get random char from [",", ".", "/", "#", "*", "#", "%", "(", " "]
    let chars = [",", ".", "/", "#", "*", "%", "(", " "];
    return chars[Math.floor(Math.random()*chars.length)];
}

generateNewHack();
setInterval(function() {advanceHack(); hackGlitch[0] = newLogo1; hackGlitch[1] = newLogo1;}, animSpeed);


