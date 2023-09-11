import {getCurrentDate} from '../../services/timeAndDateService.js'
import { postMorning,postEvening } from '../../services/postreportService.js';
import {getIsMorningReported,getIsEveningReported} from '../../services/isReportedService.js'
import {emailController} from "./userController.js"


const showReportpage = async({render,session}) => {

    const data = {
      morning: await getIsMorningReported({session}),
      evening: await getIsEveningReported({session}),
      logged_user: await emailController({session})
    }
    render('reportPage.ejs',data);
  }

const showMorningReport = async({render,session},validationErrors) => {

  if (!validationErrors) {
    const validationErrors = []
  }
    if (!validationErrors.length == 0) {
    const data = {
      errors: validationErrors,
      date: '',
      email: await emailController({session}),
      logged_user: await emailController({session})
    }
  
   data.date = await getCurrentDate();   //app gets current date from currentDateService
   render('morning.ejs',data);

  } else {
      const data = {
        errors: [],
        date: '',
        email: await emailController({session}),
        logged_user: await emailController({session})
      }
    
    data.date = await getCurrentDate();   //app gets current date from currentDateService
    render('morning.ejs',data);
  }
}


const showEveningReport = async({render,session},validationErrors) => {
    if (!validationErrors) {
      const validationErrors = []
    }

    if (!validationErrors.length == 0) {
    const data = {
      errors: validationErrors,
      date: '',
      email: await emailController({session}),
      logged_user: await emailController({session})
    }
  
   data.date = await getCurrentDate();   //app gets current date from currentDateService
   render('evening.ejs',data);

  } else {
      const data = {
        errors: [],
        date: '',
        email: await emailController({session}),
        logged_user: await emailController({session})
      }
    
    data.date = await getCurrentDate();   //app gets current date from currentDateService
    render('evening.ejs',data);
  }
}


const showPostMorning = async({render,response,request,session}) => {
  const possibleErrors = await postMorning({request,render,response,session});
  if (possibleErrors) {
    if (!possibleErrors.length == 0) {
    showMorningReport({render,session},possibleErrors)
  }
}
  else {
  const data = {
    logged_user: await emailController({session})
  }
  render('morningCompleted.ejs',data)
}
}

const showPostEvening = async({render,response,request,session}) => {
  const possibleErrors = await postEvening({request,render,response,session});
  if (possibleErrors) {
    if (!possibleErrors.length == 0) {
    showEveningReport({render,session},possibleErrors)
  }
}
  else {
  const data = {
    logged_user: await emailController({session})
  }
  render('eveningCompleted.ejs',data)
}
}


  
  export {showMorningReport,showEveningReport,showReportpage,showPostMorning,showPostEvening};