import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

export default function ChatMessage ({ message, sender }) {
  // const message = props.message;
  // const sender = props.sender;
  // const { message, sender } = props;

  /*
  if (sender === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    );
  }
  */

  return (
    <div className={
      sender==='user'
      ?'chat-user-message'
      :'chat-robot-message'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <p className="chat-message-text">
        {message}
      </p>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
