const getRandomInt = (max) => {
   const number = Math.floor(Math.random() * Math.floor(max))
   if (number == 0) {
      return 1
   }
   else {
      return number
   }
 }

 const getRandomArbitrary = (min, max) => {
   return Math.random() * (max - min) + min;
}

const randomEmail = (length) => {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + '@hotmail.net'
 }

 const randomPassword = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = 9;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   }

 export {randomEmail,randomPassword,getRandomInt,getRandomArbitrary}