jQuery(function(){
 (function($){
   $.ajaxSetup({
     beforeSend: function(xhr){
     xhr.setRequestHeader("Authorization": "Token token=43a14bfc3896d21323cd9b8c9a7f8019");
     xhr.setRequestHeader("Accept": "application/json,version=2");
     xhr.setRequestHeader("Content-Type": "application/json");
     }
   });
   $.post('https://arkiver.com/login',
    data:  {
        "user":{
            "first_name": ,
            "last_name": ,
            "email": ,
            "password": ,
            "password_confirmation": "supersecret"

        },
        "origin": "android"
    }
 });
});
