import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const notification = ({
  title,
  message,
  type,
  onRemoval = () => {},
  duration = 5000,
}: any) => {
  const id = Store.addNotification({
    title: title || '',
    message: message || '',
    type: type || 'warning', // 'default', 'success', 'info', 'warning'
    container: 'top-left', // where to position the notifications
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration,
      showIcon: true,
      onScreen: true,
      pauseOnHover: true,
    },
    onRemoval,
  });

  return { id, Store };
};

export default notification;
