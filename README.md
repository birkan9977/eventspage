# Assignment for Evreka

This project was developped by Birkan Bilici to fulfill user stories provided by Evreka team.

## Evreka Front-end Developer Evaluation Questions

In the project directory, you can run:

### Q1.

In this task, we want you to ​**create a responsive web page​.** We expect you to implement some functional features (filter, buttons with events, etc.) on the page, and we expect the page design to be as similar as possible. You need to send us all the necessary files to run the page. You can find image files in the attachment and the instructions below:

### Information related to the page

* Please take a look at the Design Guide Page 1 which can be accessed via the design URL provided below. You are expected to create a list of the data that is delivered. The right panel is the detail part of the row selected which is highlighted with yellow.

* Media (you can see a garbage container as a media in the Design Guide Page 3) section can be blank. Therefore, it is not obligatory to attach an image or audio to the row. However, the Media section must be there with the text “No Media Content” if no image or audio is available.

* Example response data can be retrieved from the zip file.
  * You will produce the table by coınsidering the “data” key in the response data
  * The value of the “data” key is an array which contains the data of each row in
the list
  * You can get the data of the rows from the following keys:
    * “media”: Contains all of the details about the media files.
    * “details”: Contains the values in a row and in the right panel
    * “locations”: Contains the location which is marked on the map.
  * You can ignore “type” and “extras” fields under “data”, “type” field under “location” and “format” field under “details”.

### Essentials

* There will be a table whose data is produced dynamically. For this reason, please do not put the data as static HTML elements.
* When a user clicks on a row in the table,
  * the row will be selected and highlighted with a yellow background.
  * multiple row selection will not be allowed
  * the information of the selected/clicked row will be shown on the right panel.

* There must be only one Event Details panel for all of the rows. That’s why, when a user clicks on a row, the Event Details panel will be manipulated with the selected row’s data and no separate panel will be created for each row.
* Users can select one row from the list and see the details in the Event Details panel on the right side. Information that is not seen on the selected row, must be displayed in the Event Details panel.
* When the page is opened, all rows whose “Aksiyon” field is not filled, must have a yellow bar on the left-most side.
* Client-side sorting and client-side filtering are required in the table but you should use your own design.
* For the image displayed in the right section, because all images can have different widths and heights, users must be able to see its full size if the icon on the bottom-right of the image is clicked (Design guide page 4).
* The page should be 100vh total, list and the right section must scroll if overflowed.

As a general reminder, we prefer you to write a page with React, but feel free to use different frameworks/libraries if you are not familiar with these. For the map, we prefer you to use Leaflet.

The web page must be compatible with different resolutions on both Mac and Windows computers. The page will be tested in Google Chrome.

### Bonus

* Usage of Typescript and Styled-components is a major plus.
* If the user clicks on the “No Action Needed” button, both “Take Action” and “No Action Needed” buttons must be removed from the Event Details panel, and the “No Action Needed” text must be written under the Action column of the selected row.
* After the user clicks on the “Take Action” button on the Event Details panel, “Action” pop-up will be opened (Design Guide Page 5).
* In the “Action” pop-up, there will be 2 tabs with the titles “Select Action” and “Take Action” consecutively. In the “Select Action” tab, there will be “Mark As Resolved” & “Change Asset” buttons as options and a “Next” button.
  * The “Next” button must be disabled by default.
  * If the “Mark As Resolved” or “Change Asset” button is clicked, its style will be
  changed to a darker style (Design Guide Page 6) and the “Next” button must
  be enabled.
  * When the “Next” button is clicked, the “Take Action” tab must be opened
  (Design Guide Page 7).
  * In the “Take Action” tab, the selected option on the “Select Action” tab (either
  “Mark as Resolved” or “Change Asset”) and “Resolution Detail” text area must
  exist on top of the “Back” and “Take Action” buttons.
  * When the “Back” button is clicked, the first tab (Select Action tab) must be
  shown to the user with the previously selected option.
  * Maximum 300 characters can be entered into the “Resolution Detail” text
  area.
  * When the user clicks on the “Take Action” button, a loading circle must be
  shown for 1 second (Design guide page 8) and according to the length of the
  text, error or information text must be shown.
  * When the user clicks on the “Take Action” button without writing anything in
  the “Resolution Detail” text area, an alert popup will be shown after the loading circle. In the alert popup, the following text must be written: “A PROBLEM OCCURRED! We cannot continue due to a problem. Please try again later” (Design guide page 10).
  * When the user clicks on the “Take Action” button after writing at least 1 character in the “Resolution Detail” text area, a success popup will be shown after the loading circle. In the success popup, the following text must be written: “ACTION HAS BEEN TAKEN! You can see the action details from the details tab” (Design guide page 9).
  * If the action has been taken successfully, namely, if the user sees the success popup and clicks OK, both “Take Action” and “No Action Needed” buttons must be removed from the Event Details panel, and the selected option on the “Select Action” tab (either “Mark as Resolved” or “Change Asset”) must be written under the Action column of the selected row.

* Mobile responsiveness is not obligatory but is a plus.

You can find the style guide via the following URL.

URL: https://xd.adobe.com/view/22ab8275-0380-44be-9bda-61aa91baa399-77f8/

To download icons and view the design specs, please click on the "code icon" from the right panel. Then click the icon you want to download. The “download” button will appear on the right.

If you have any questions, you can ask by replying to our email without any hesitation and please note that code quality is an extremely significant factor for us while making the review.

***
***
***
***
***
***
***

# Yarn Instructions

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
