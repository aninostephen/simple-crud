import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useBeforeUnload = (formChanged, initialFormData, currentFormData) => {
  const history = useHistory();
  const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formChanged) {
        // Show an alert before returning the confirmation message
        alert(confirmationMessage);
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const unblock = history.block(() => {
      if (formChanged) {
        return confirmationMessage;
      }
    });

    return () => {
      unblock();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formChanged, initialFormData, currentFormData, history]);
};

export default useBeforeUnload;