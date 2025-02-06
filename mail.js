function emailSend(){
    console.log("enter");
    
Email.send({
    Host : "smtp.elasticemail.com",
    Username : "meetsolanki2883@gmail.com",
    Password : "AFE705D547B89AD46403A2AF11D9BAF33F01",
    To : 'meetsolanki20003@gmail.com',
    From : "meetsolanki2883@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);
}