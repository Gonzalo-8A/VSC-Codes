import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png'
import dayjs from 'dayjs'
import './ChatMessage.css'

export default function ChatMessage ({ message, sender, time }) {
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
      <div className="chat-message-text">
        {message}
        {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
