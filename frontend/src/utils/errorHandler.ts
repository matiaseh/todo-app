import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const handleErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    toastr.error(error.response.data.message || 'An unexpected error occurred');
    return error.response.data.message || 'An unexpected error occurred';
  } else {
    toastr.error('An unexpected error occurred');
    return 'An unexpected error occurred';
  }
};
