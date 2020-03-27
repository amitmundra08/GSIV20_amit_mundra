2.
a. How to run the code?
    Step 1. clone the code and take a pull
    Step 2. run npm install
    Step 3. For android run 'react-native run-android' and for ios run 'react-native run-ios'

b. List of challenges done well :-
    1. The loading of data is always a challenge when there is a network call. I have added a retry option for the user if for any reason the server call fails.
    2. The feature of appending new data with old data is added so that the user is not interrupted and have a smooth flow.
    3. The most critical part was searching because if the user search any 'keyword' and it includes multiple pagination of data, then appending that data was a challenge because the scrollview cannot call two different functions when end reached. I added a check that if the user has typed something then he/she should get data by 'keyword'.
    4.Feature of appending the paginated data during search if the list is a long one and the user scroll down is added to give a smooth UI interraction.
    5. A cross button is added in the seach bar for reloading the old data when the user cancels the search otherwise it's difficult to understand user's actual behaviour. Also in this scenario the data is only retrieved on pressing of cross button if an attempt to search was made by the user earlier for decreasing latency.
c. To improvise my solution :- 
    1. Few UI changes would have been possible along with animation.
    2. Would have added a functionality to register and login with a few information of the user which would help us to suggest him/her the series and movies which the user would like to watch.(example Preferences) 
    3. Would have also tried to make a screen which would have contain list of series, movies, trending in horizontal direction as many people are fond of series now a days.
d. No feedback for improving because from my point of view many things are covered in this challenge. And not making it more complicated is a better thing. But yeah could have also asked for error handling and fallbacks for different scenarios as multiple server calls are involved here.





