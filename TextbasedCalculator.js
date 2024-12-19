const prompt = require("prompt-sync")()
let number1;
let number2;
while(true){
    number1= parseFloat(prompt("enter Number1 :  "))
    if(isNaN(number1)){
        console.log("invalid")

    }
    else{
        break;
    }

}
while(true){
    number2= parseFloat(prompt("enter Number2 :  "))
    if(isNaN(number2)){
        console.log("invalid")

    }
    else{
        break;
    }

}

const operator =prompt("enter the operator:  ")


let result;
switch(operator){
    case "+":
        result = number1 +number2
        console.log(result)
        break;

    case "-":
        result = number1 -number2
        console.log(result)
        break;
        
    case "%":
        result = number1 %number2
        console.log(result)
        break;
        
    case "*":
        result = number1 *number2
        console.log(result)
        break;    
    
    default:
        console.log("invalid")
        break;
              
}
