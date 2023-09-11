import { executeQuery } from "../database/database.js";
import { getUserId } from "./userService.js"


const postMorning = async({request, render, session}) => {
    const body = request.body();
    const params = await body.value;

    const data = {
        errors: []
    }
  
    const date = params.get('day');
    const sleepDuration = Number(params.get('SleepDuration'));
    const sleepQuality = Number(params.get('SleepQuality'));
    const genericMood = Number(params.get("GenericMood"));

    if (!sleepDuration) {
        data.errors.push("Must enter a value for sleep duration");

    }

    if (!typeof sleepDuration === Number) {
        data.errors.push("Sleep duration must be a number");

    }



    const userId = await getUserId({session});

    if (data.errors.length == 0) {
    const duplicate = await executeQuery("SELECT user_id FROM morning_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
    if (!duplicate) {
        await executeQuery("INSERT into morning_reports (user_id,date,sleep_duration,sleep_quality,generic_mood) VALUES ($1,$2,$3,$4,$5);",userId,date,sleepDuration,sleepQuality,genericMood)
    }
    else {
        await executeQuery("DELETE FROM morning_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
        await executeQuery("INSERT into morning_reports (user_id,date,sleep_duration,sleep_quality,generic_mood) VALUES ($1,$2,$3,$4,$5);",userId,date,sleepDuration,sleepQuality,genericMood)
    }
}
    else {
        return data.errors
    }
    
    

}



const postEvening = async({request,render,session}) => {
    const body = request.body();
    const params = await body.value;

    const data = {
        errors: []
    }
  
    const date = params.get('day');
    const exerciseTime = Number(params.get('exerciseTime'));
    const studyingTime = Number(params.get('studyingTime'));
    const reqularityOfEating = Number(params.get('reqularityOfEating'));
    const qualityOfEating = Number(params.get('qualityOfEating'));
    const genericMood = Number(params.get("GenericMood"));

    if (!exerciseTime) {
        data.errors.push("Must enter a value for exercise time");

    }

    if (!typeof exerciseTime === Number) {
        data.errors.push("Exercise time must be a number");

    }

    if (!studyingTime) {
        data.errors.push("Must enter a value for studying time");

    }

    if (!typeof studyingTime === Number) {
        data.errors.push("Studying time must be a number");

    }
 
    const userId = await getUserId({session});

    if (data.errors.length == 0) {

        const duplicate = await executeQuery("SELECT user_id FROM evening_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
        if (!duplicate) {
            await executeQuery("INSERT into evening_reports (user_id,date,exercise_time,studying_time,eating_reqularity,eating_quality,generic_mood) VALUES ($1,$2,$3,$4,$5,$6,$7);",userId,date,exerciseTime,studyingTime,reqularityOfEating,qualityOfEating,genericMood)
        }
        else {
            await executeQuery("DELETE FROM evening_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
            await executeQuery("INSERT into evening_reports (user_id,date,exercise_time,studying_time,eating_reqularity,eating_quality,generic_mood) VALUES ($1,$2,$3,$4,$5,$6,$7);",userId,date,exerciseTime,studyingTime,reqularityOfEating,qualityOfEating,genericMood)
        }
    } else {
        return data.errors
    }
        
    
}


export {postMorning,postEvening}