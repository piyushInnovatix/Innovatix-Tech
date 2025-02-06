function emailSend(){
    console.log("enter");
    
Email.send({
    Host : "smtp.elasticemail.com",
    Username : "piyushgoswami.innovatix@gmail.com",
    Password : "AFE705D547B89AD46403A2AF11D9BAF33F01",
    To : 'piyushgoswami.innovatix@gmail.com',
    From : "piyushgoswami.innovatix@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);
}