# HTML-Rendering Notecard Service (HRFS)

## Project Description

The HTML-Rendering Notecard Service (HRFS) provides users with a new way to learn flashcards. Users can utilize this feature by registering for an account and then selecting a deck to get flashcard functionality. Users are also able to login, set their profile picture, create cards in HTML or plain-text format, create and populate decks, and view all stored decks and cards. Admin users can view all users and change user roles.

### Repository Links
- API : https://github.com/jsparks9/notecard-api
- UI : https://github.com/jsparks9/notecard-ui

### Project Design Specifications and Documents

##### Relational Data Model
![Relational Model](https://raw.githubusercontent.com/jsparks9/notecard-api/main/imgs/notecardERDmvp.png)


### Technologies

**Persistence Tier**
- PostGreSQL

**Application Tier**
- Java 8
- Spring 5 & Spring Boot 2.5
- Apache Maven
- Hibernate & Spring Data
- JSON Web Tokens

**Client Tier**
- HTML
- CSS
- TypeScript
- JavaScript
- React

**Deployment Platform Tools**
- Cloud Provider: Amazon Web Services (AWS)
- Database Deployment: AWS Relational Database Service (RDS)
- Server Deployment: AWS Elastic Beanstalk (EB) + AWS Elastic Compute Cloud (EC2)
- UI Deployment: AWS Simple Storage Service (S3)
- Build Automation: AWS Code Build
- Pipeline Management: AWS Code Pipeline

### Functional Requirements

- Functional: Users can register for an account with the system
- Functional: Users can login to their account
- Functional: Admin can delete users
- Functional: Users can view all notecards in the system
- Functional: Users can create new notecards
- Functional: Users can create their own decks
- Functional: Users can add any notecard to decks they own
- Functional: Users can view all decks alongside the deck owner
- Functional: Users can select a deck and get flashcard functionality
- Functional: Users can set their profile picture 

### Non-Functional Requirements

- Basic validation is enforced to ensure that invalid/improper data is not persisted
- User passwords will be hashed by the system before persisting them to the data source
- Errors and exceptions are handled properly and their details are obfuscated from the user
- The system conforms to RESTful architecture constraints
- The system is tested with at least 80% line coverage in all service and utility classes
- The system's data schema and component design is documented and diagrammed 
- The system keeps detailed logs on info, error, and fatal events that occur 
- UI and API builds and deployments are automated using a CI/CD pipeline
- API is deployed to AWS EC2 (via Elastic Beanstalk) as a Docker container
- UI is deployed to a AWS S3 bucket configured for static web hosting

### Suggested Bonus Features
- Responsive and intuitive UI allowing for optimal study of notecards
- Users are able to filter all cards by keywords
- Sleek and smooth User Experience (UI) such as drag-and-drop ability.
- Ability for users to share notecards or notecard decks with other users to be added to their own collection
- Account setting for "light mode" or "dark mode"
- Admin view of accounts and a validation barrier to registration where accounts can only begin adding cards upon account validation.
- Admin can delete any cards
- Users can select an option to stop seeing a card 
- Users can rate cards on a sliding scale from 0 to 10 inclusive
- The probability of a user seeing a card they rated is a function of their ratings of it
- Users can change their profile picture

#### Project Presentation 
- Jul 8 , 2022

## Minimal Viable Product Requirements (End-to-end completion)

- Functional: Users can register for an account with the system
- Functional: Users can login to their account
- Functional: Admin can delete users
- Functional: Users can view all notecards in the system
- Functional: Users can create new notecards
- Functional: Users can create their own decks
- Functional: Users can add any notecard to decks they own
- Functional: Users can view all decks alongside the deck owner
- Functional: Users can select a deck and get flashcard functionality
- Functional: Users can set their profile picture 

- Non-Functional: Test coverage of the API's service layer is at least 80%
- Non-Functional: The API's endpoints are exposed in a RESTful manner
- Non-Functional: API provides random profile pictures for default profile picture on account creation
- Non-Functional: User passwords are hashed or encrypted before persisting to the database

