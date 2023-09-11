


const showLoginForm = ({render},data) => {
  if (!data) {
  const data = {
    errors: [],
    logged_user : false
  }
  render('login.ejs',data);
}
else {
  const altData = {
    errors: data.errors,
    logged_user: false
  }
  render('login.ejs',altData)
}
}

const showRegistrationForm = ({render},data) => {
  if (!data) {
  const data = {
    errors: [],
    email: '',
    logged_user: false
  }
  render('register.ejs',data);
} else {
  const altData = {
    errors: data.errors,
    email: data.email,
    logged_user: false
  }
  render('register.ejs',altData);
}
}


const showRegistrationSuccessful = ({render}) => {
  const data = {
    logged_user: false
  }
  render('registered.ejs',data);
}


export { showLoginForm,showRegistrationForm,showRegistrationSuccessful };