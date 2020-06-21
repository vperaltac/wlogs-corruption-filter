const newUser       = document.getElementById("newUser");
const inputEmail    = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

newUser.addEventListener("click", (e) =>{
    e.preventDefault();

    let email = inputEmail.value;
    let passwd = inputPassword.value;

    let request = new XMLHttpRequest();
    request.open('POST',"login");
    request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    request.send(JSON.stringify({
                                "email"  : email,
                                "passwd" : passwd
                            }));
    request.onload = function(){
        if(request.response == 'Login Failed')
            alert(request.response);
        else{
            document.open();
            document.write(request.response);
            document.close();    
        }
    }
});