import React, {Component} from 'react';
import "./chatbot.css"
import "./search"
import Example from './search';


class ChatBot extends Component{
  constructor(props) {
    super(props);
     // Set initial state 
     this.state = {message : undefined, reply:""} 
    
// Binding this keyword 
this.handleChange = this.handleChange.bind(this) 
this.UserToBot = this.UserToBot.bind(this) 
    
  }
 
    
  handleChange(event, { newValue }) {
    //console.log(event.target.value)

    this.setState({
      message: newValue
      
    });
    console.log(event.target)
    console.log('1',newValue);
  }
  
  handleChange2(val) {
    console.log('2', val)
    // if(val){
    //   this.setState({
    //     message:""
    //   });
    // }
    
  
  }
  UserToBot() {
    //console.log(this.state.message);
    var div = document.createElement('div');
    var b = document.createElement('b');
    div.setAttribute("class", "usermessage");
    b.innerHTML =this.state.message;
    var img = document.createElement('img');
    img.src = 'images/user.png';
    div.append(img);
    div.append(b);

    document.getElementById('message-area').append(div);

    this.setState({
      message:""
    });

    var reply = document.createElement('div');
    reply.setAttribute("class", "botmessage");
    reply.innerHTML =this.QA(this.state.message);
    var img = document.createElement('img');
    img.src = 'images/bot.png';
    reply.append(img);
    document.getElementById('message-area').append(reply);
    

    document.getElementById('message-area').scrollTo(0,document.getElementById('message-area').scrollHeight);
  }

  QA(question){

    switch (question) {
      case 'Hi':
      case 'hi ':
      case 'Hello':
      case 'hello':
      case 'Hey':
      case 'hey':
      case 'Hola':
      case 'hola':
      case 'i need help':
      case 'I need help':
      case 'some one':
      case 'Some one':
      return "Hello there, i am an AI bot programmed to help student. How can i assist you.";
       break;
      case 'Where can I find a map of the University for guiding myself from current location to my destination?':
      case 'University room':  
      case 'map':
      case 'location':
      case 'guide':
      case 'where':
      return "Maps of the University of Newcastle's Newcastle (Callaghan), Newcastle City precinct, Central Coast (Ourimbah) and Port Macquarie campuses can be found at Campus Maps. You can also use the Directions Tile on myUON as an additional source for campus maps.";
      break;
      case 'How do I enrol in a course and register for class activities?':
      case "enrol":  
      case "enrolment":
      case "timetable":
      case "register":
      case "classes":
      return "Enrolment is a two-part process: Step one - Enrol in your courses in myHub and plan your timetable. Step two - Choose times for your class activities in Manage myTimetable in myUON.";
      break;
      case 'How can I check majors and elective courses?':
      case "major courses":
      case "elective courses":
      case "find major and elective courses":
      return "Your Program Handbook will list the available majors for your degree and each course associated with those majors. Please remember to check the course handbooks for the desired major to find out its delivery locations and further specific information to the course.";
      break;
      case 'How can I consult with my program advisor? how to contact them?':
      case "program advisor":
      case "program convenor":
      case "contact":
      case "meeting":
      return "You can arrange a face-to-face or online consultation with your program advisor by emailing them on ProgramAdvisor@uon.edu.au.";
      break;
      case 'I lost my student card? How can I get new card?':
      case "lost":
      case "student card":
      case "card":
      case "new card":
      case "new":
      return "Sorry to hear that. But you don’t need to worry. You can get new student card from student services centre by showing them e-card from your my uon app. ";
      break;
      case 'Where is the library?':
      case "library":
      return "There are 2 libraries in university, which one you are looking for? Hunter library and auchmuty library. Here is the location map navigate to nearest library.";
      break;
      case 'Is there any university doctor available for consulting my health?':
      case "doctor":
      case "consultant":
      case "hospital":
      case "health":
      return "University doctors are in student services centre near commonwealth bank. You can either book an appointment or can check for walk-in appointments. Please bring your student card at the time of consultation. ";
      break;
      case 'I cannot afford my university fees? Is there any scholarship or university help available?':
      case "fees":
      case "scholarship":
      case "hardship ":
      return 'Yes there are plenty of scholarships available you can apply through university scholarship website.';
      break;
      case ' How do I apply for scholarships?':
      case "apply":
      return 'Information on all available scholarships offered by the University of Newcastle for enabling, undergraduate and postgraduate course work students can be found on the Scholarships website.';
      break;
      case 'How do I apply for an Opal Concession card and Transport Entitlement Card?':
      case "opal card":
      case "concession card":
      case "transport entitlement card":
      case "how":
      // case "apply":
      return 'Opal Concession cards are only available directly via OPAL and cannot be purchased or collected from a retail outlet. https://transportnsw.info/tickets-opal/opal';
      break;
      case 'What support services does the University offer for students?':
      case "support":
      case "university services":
      return 'There is a wide range of student support services available to help students transition to university and get the most out of their study. Our support services can provide you with assistance in the areas like: Health and Wellbeing, Meeting the Costs of Study, Program Advice, Student Life on Campus, Tools for Success and Other Topics (student living, chaplaincy, counselling, disability support, careers service etc)';
      break;
      case 'My classes finish when it is dark, are there any extra safety precautions I can take when heading home?':
      case "security":
      case "safety":
      return 'Our campuses and facilities are safe places to visit, study and work, however everyone should be vigilant, especially when on campus after dark. the Security Shuttle runs an after hours service, where from 6:30pm to midnight, the Security Shuttle will take passengers to locations on campus, and in surrounding suburbs.';
      break;
      case 'How to arrange security shuttle pickup?':
      case "how security":
      case "shuttle":
      case "pickup":
      return 'To arrange a pick up, please call 4921 5888, then press 2. The Security shuttle is also available at Ourimbah from 5pm - 10pm. To arrange pick up, call 4921 5888, then press 3. ';
      break;
      case 'How do I find out what events are happening on campus?':
      case "event":
      case "campus":
      case "function":
      return 'Student Central puts on lots of fun events on campus, including movie screenings, bar activities and free live entertainment each Tuesday, Wednesday and Thursday at lunchtime. The free entertainment is usually staged in either the Derkenne Courtyard,  Auchmuty Courtyard or Bar on the Hill and NUspace.';
      break;
      case 'How do I apply to waive my student visa application fee due to COVID-19?':
      case "visa":
      case "apply":
      case "covid19":
      case "student visa":
      return 'The Department of Home Affairs (DHA) may consider waiving your visa application fee if you extend your student visa due to the impact of COVID-19. Please see criteria DHA have listed for consideration. If you meet the criteria, on application for your COE you can request the 1545 COVID-19 impacted student form. If you have already been issued your COE send an email to studentadvice@newcastle.edu.au.';
      break;
        
      default:
        return "Sorry I couldn't understand. Please select from the given questions by typing x ";
        break;
    }

  }
 
  
  render() {
   
    return (
      
     
        <div className="chat-box">
       
         <div className="message-area" id="message-area">

           {/* <div className="usermessage">Hi</div>
           <div className="botmessage">Hello</div> */}

         </div>
         
         {/* <input className="chat-input" value={this.state.message} onChange={this.handleChange}/> */}
         <Example className="chat-input" msg={this.state.message} func={this.handleChange} func2={this.handleChange2}></Example>
         <button className="chat-button" onClick={this.UserToBot}>Send</button>
        
  
          
        </div>
     
      
    );
  }
}

export default ChatBot;
