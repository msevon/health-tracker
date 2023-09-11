import {averageMoodTodayService,averageMoodYesterdayService} from "../../services/averageMoodService.js"
import {emailController} from "./userController.js"



const showMainpage = async({render,session}) => {
  
  if (await session.get('authenticated')) {
      const data = {
        averageMoodToday: await averageMoodTodayService(),
        averageMoodYesterday: await averageMoodYesterdayService(),
        logged_user: await emailController({session}),
  
      }
      render('mainpageAuthenticated.ejs',data);
    }

  else {
    const data = {
      logged_user: false,

    }
    render('mainpage.ejs',data)
}
}

export {showMainpage}