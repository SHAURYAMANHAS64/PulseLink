import { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
    info: faInfoCircle
  };

  const colors = {
    success: 'border-green-500 bg-green-500/10',
    error: 'border-red-500 bg-red-500/10',
    info: 'border-blue-500 bg-blue-500/10'
  };

  const textColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  };

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${colors[notification.type]} backdrop-blur`}>
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={icons[notification.type]}
          className={`text-xl ${textColors[notification.type]}`}
        />
        <span className="text-white flex-1">{notification.message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export const NotificationContainer = () => {
  const { notifications, removeNotification } = useUIStore();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};
