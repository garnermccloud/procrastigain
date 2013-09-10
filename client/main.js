window.intercomSettings = {
    // TODO: The current logged in user's email address.
    email: "john.doe@example.com",
    // TODO: The current logged in user's sign-up date as a Unix timestamp.
    created_at: 1234567890,
    app_id: "bbfaf894a517e143ec4a01d02f03006fa2025d53"
  };

function when(conditionFunc, execFunc, interval){
    if (conditionFunc()){
        execFunc();
    }else{
        setTimeout(function(){ when(conditionFunc, execFunc, interval);}, interval);
    }
};
