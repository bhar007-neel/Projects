let eyeicon = document.getElementById("eyeicon")
let password = document.getElementById("password")

// adding click feature in icon

eyeicon.onclick = function(){

    if(password.type == "password"){
        password.type= "text";
        eyeicon.src="eye-open.png";


    }
    else{
        password.type= "password";
        eyeicon.src="eye-close.png";
    }

}