import React from 'react';
import { toast } from 'react-toastify';
import { Message } from '../components/Alert';

export const notifyError = message => {
  toast.error(<Message text={message} type="error" />, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notifySuccess = message => {
  toast.success(<Message text={message} type="success" />, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
