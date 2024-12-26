const prompt = require("prompt-sync")()
const name=prompt("What is your name?  ")
console.log("hello welcome to my program  " , name," How you doing today")
const shouldWePlay= prompt("Do you want to play ")
// prompt is used to get in the program 
// "7" == 7 , return true in js as it does not checks the types, but if we do "7"===7 , return False as it checks the type as well now
if(shouldWePlay.toLowerCase() ==="yes"){
    // game logic
    const leftOrRight =prompt("you enter a maze u want to go left or right  ")
    if(leftOrRight==="left"){
        console.log("you will go left and you see a bridge  ")
        const cross = prompt("Do u wanna cross the bridge ")
        if(cross==="yes"|| cross === "y"|| cross === "okay" ){
            console.log("you cross the bridge but the it was week and you fell from  it and u lost ")
                    
        }
        else{
            console.log("good choice , YOU WIN !!!!")
        }
        }
    else{
        console.log("you go the right and you fall from the cliff , you loose")
    }    
}
else if(shouldWePlay.toLowerCase() ==="no"){
    console.log("okay :((")

}
else{
    console.log("invalid input")
}
