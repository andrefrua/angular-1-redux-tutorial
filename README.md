# angular-1-redux-sample
Angular 1 with Redux tutorial to help understand Angular, Redux, Async actions and selectors

<strong>tl;dr:</strong>
<ul>Install:
    <li>1 - Clone the repository to a local folder;</li>
    <li>2 - Run the command "npm install" on the root of each project steps;</li>
    <li>3 - Run the command "npm install -g gulp" to install gulp globally</li>
    <li>4 - Run the command "gulp" for either one of the steps you want to run;</li>    
    <li>5 - Now opening your browser and pointing to http://localhost:3000 should show you the app running;</li>    
</ul>

<strong>Detailed:</strong>	
<ul><strong>Step 1 - Empty project:</strong>
    <li>1 This step will only show how to get a copy of the initial project and run it on your local machine;</li>
    <li>2 First you will need to have both NPM and Git configured on your local machine, this instalation is out of the scope of this tutorial but there are tons of tutorials on how to do this on the Internet;</li>
    <li>3 Open your command line and navigate to the location where you want to add the tutorial;</li>
    <li>4 Now clone the repository to your local machine by using the following GIT command:<br/>"git clone https://github.com/pentaho-arua/angular-1-redux-tutorial.git"</li>
    <li>5 Now you should have the entire project on your local machine</li>
    <li>6 To check the first step open the folder named "step-1" on your favorite code editor or IDE, if you're using Visual Studio Code you can navigate to "step-1" folder and execute the command "code ." and the project will open on VSC;</li>
    <li>7 In order to be able to run the application with need to install the dependencies using NPM. To do so you need to run the following command on the root folder of "step-1":<br/>"npm install"</li>
    <li>8 Run the command "npm install -g gulp" to have gulp available everywhere</li>
    <li>9 Now since we are using gulp and babel in the project we only need to use the "gulp serve" command to start the server;</li>
    <li>10 Open your browser and navigate to "localhost:3000" and you will see the application runing. At this time you will simply have a menu with Home and a small text at the center of the screen saying "This is the Homepage of our simple Angular app";</li>
</ul>
<ul><strong>Step 2 - To-do App with Angular only:</strong>
    <li>1 This step will show a working To do app using only Angular;</li>
    <li>2 To run this step simply do the same steps done on step-1 starting from point 6;</li>
    <li>3 Now you can see that there is a new menu called noredux and by clicking on it you can interact with the simple To-do app;</li>
    <li>4 To achieve this we created a new component named "noredux";</li>
    <li>5 On the app.js file we added the reference to the new component and the needed code so that if would be possible to navigate to it;</li>
    <li>6 On the navigation component we changed the file navigation.html to also show the noredux menu right next to the Home;</li>
</ul>
<ul><strong>Step 3 - To-do App using Angular, Redux (ng-redux), Selectors and async actions using thunk:</strong>
    <li>1 To run this step simply do same as done on the previous steps;</li>
    <li>2 Several dependencies were added to the project, such as ng-redux and redux-thunk;</li>
    <li>3 A new component called WithRedux was created and references were added to the app.js;</li>
    <li>4 A new menu was also created to the navigation.html file for the WithRedux component;</li>
    <li>
        <ul>5 Several new folders were created in order to separate files to be used for redux:
            <li>- actions:<br/>This is were the todo actions are stored;</li>
            <li>- reducers:<br/>Here you have the todo reducer that will handle the state of the todo app;</li>
            <li>- selectors:<br/>- Some helper functions there are used for the selectors;</li>
        </ul>        
    </li>
</ul>
<ul><strong>Step 4 - Everything used in step 3 with the addition of parametric selectors:</strong>
    <li>1 To run this step simply do same as done on the previous steps;</li>
    <li>2 On the withredux component inside the mapStateToThis functions the parametric selectors were added, the function was also changes in order to received the type id as a parameter</li>
</ul>
