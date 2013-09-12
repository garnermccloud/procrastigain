Meteor.methods({
  getHash: function(myString){
    return CryptoJS.HmacSHA256(myString, "t__4APx0dmngtbs5965I8ZQaJgeMe0AoDyC53ck7").toString();
  }
});
