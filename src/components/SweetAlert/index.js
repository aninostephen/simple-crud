import { useEffect } from 'react';
import swal from 'sweetalert'; // Importing the swal object explicitly

const UseConfirmAlert = (title, text, onConfirm, onCancel) => {
  useEffect(() => {
    const handleConfirm = async () => {
      const result = await swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        if (onConfirm) onConfirm();
        swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } else {
        if (onCancel) onCancel();
        swal.fire('Cancelled', 'Your file is safe :)', 'error');
      }
    };

    handleConfirm();

    // Clean up function
    return () => {
      swal.close();
    };
  }, [title, text, onConfirm, onCancel]);
};

export default UseConfirmAlert;
