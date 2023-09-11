import {executeQuery} from "../database/database.js"
import {bcrypt} from "../deps.js"
import {setCurrentUser} from "../services/userService.js"
import {showRegistrationSuccessful,showLoginForm,showRegistrationForm} from "../routes/controllers/loginAndRegisterController.js"



const postRegistrationForm = async({request, render}) => {
    const data = {
      errors: [],
      email: ""
    }

    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
  
    if (password !== verification) {
      data.errors.push('The entered passwords did not match');
      
    }
  
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
    if (existingUsers.rowCount > 0) {
      data.errors.push('The email is already reserved.');
      
    }



    if (data.errors.length == 0) {
      const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    showRegistrationSuccessful({render});
    }
  
    else {
      data.email = email;
      showRegistrationForm({render},data);
    }
  }
  
const postLoginForm = async({request, render, response, session}) => {
    const body = request.body();
    const params = await body.value;
  
    const email = params.get('email');
    const password = params.get('password');

    const data = {
      errors: [],
    }

  
    // check if the email exists in the database
    const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (res.rowCount === 0) {
        data.errors.push("This email doesn't have an account yet!")
          showLoginForm({render},data);
        }
    else {
    const userObj = res.rowsOfObjects()[0];
  
    const hash = userObj.password;
  
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        data.errors.push('Invalid password.')
    }

    if (password.length < 4) {
      data.errors.push('Password must be over 4 characters long');
    }
    
    if (data.errors.length == 0) {
      setCurrentUser({session},userObj);
      session.set('registration',false);
      if (!Deno.env.get("TEST_ENVIRONMENT")) {
      response.redirect('/');
    }
    else {
      response.body = 200;
    }
  }
    else {
      showLoginForm({render},data)
  

}
    }
  }

export {postRegistrationForm,postLoginForm}