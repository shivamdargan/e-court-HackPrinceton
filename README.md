```
 .env file is required to run the above appliation in the root directory and the enviroment should contain the following information :
- PORT NUMBER
- MONGO_URI CONNECTION STRING
- SECRET_KEY - SOMETHING RANDOM
- GEOCODER - API SECRET KEY
```
## Inspiration ⛹️‍♂️
Regularly courts are getting many cases and currently it is becoming challenging to prioritize those cases.There are about 73,000 cases pending before the Supreme Court and about 44 million in all the courts of India. Cases that have been in the courts for more than 30 years, as of January 2021. A software/algorithm should be developed for prioritizing and allocations of dates to the cases based on the following parameters: 
- Time of filing of chargesheet 
- Severity of the crime and sections involved 
- Last hearing date 
- Degree of responsibility of the alleged perpetrators System should be free of Impartiality.

To provide a solution to this problem, we thought of a system to prioritize the cases, considering various real life factors using efficient machine learning algorithm.

That's how we came up with **"e-Adalat"** ("digital law court" in English), e-Court Management System.

## What it does ?
e-Adalat is a platform (website) that prioritizes court cases and suggests the priority order to the judges in which these cases should be heard so that no pending cases will be there and no case is left pending for long periods of time. Judges and Lawyers can create their profiles and manage complete information of all the cases, a lawyer can file a case along with all the info in the portal whereas a judge can view the suggested priority of the cases to be held in court using the ML model, the cases would be automatically assigned to the judge based on their location. The judge and the lawyer can view the status of all the cases and edit them.

## How we built it ?
While some of the team members were working on the front-end, the other members started creating a dummy dataset and analyzing the best machine learning algorithm, after testing a lot of algorithms we reached to the conclusion that random forest regression is the best for the current scenario, after developing the frontend and creating the Machine Learning model, we started working on the backend functionality of the portal using Node.js as the runtime environment with express.js for the backend logic and routes, this mainly involved authorization of judges and lawyers, linking the Machine Learning model with backend and storing info in database and fetching the information while the model is running.
Once, The backend was linked with the Machine Learning model, we started integrating the backend and ML model with the frontend, and that's how we created e-Adalat.

## Challenges we ran into
We searched online for various datasets but were not able to find a dataset that matched our requirements and as we were not much familiar with creating a dataset, we learned how to do that and then created a dataset.
Later on, we also ran this data using various Machine Learning algorithms to get the best result. We also faced some problems while linking the ML model with the backend and building the Web Packs but we were able to overcome that problem by surfing thorugh the web and running various tests.

## Accomplishments that we're proud of
The fact that our offline exams were going on and still we managed to create a full-fledged portal in such a tight schedule that can handle multiple judges and lawyers, prioritize cases and handle all of the information securely from scratch in a short time is a feat that we are proud of, while also at the same time diversifying our Tech-Stacks and learning how to use Machine Learning Algorithms in real-time integrated neatly into our platform !

## What we learned
While building this project, we learned many new things, and to name a few, we learned how to create datasets, and test different machine learning algorithms. Apart from technical aspects we also learned a lot about Law And Legislation and how courts work in a professional enviroment as our project was primarily focused on law and order, we as a team need to have an idea about how cases are prioritized in courts currently and what are the existing gaps in this system.
Being in a team and working under such a strict deadline along with having exams at the same time, we learned time management while also being under pressure.

## What's next for e-Adalat
### We have a series of steps planned next for our platform :
 - Improve UI/UX and make the website more intuitive and easy to use for judges and lawyers.
 - Increase the scope of profile management to different judicial advisors.
 - Case tracking for judges and lawyers.
 - Filtering of cases and assignment on the basis of different type of judges.
 - Increasing the accuracy of our existing Machine Learning model.



