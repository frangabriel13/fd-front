import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';
import { useParams, useNavigate } from 'react-router-dom';
import s from './ResetPassword.module.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  return (
    <div>
      ResetPassword
    </div>
  )
};


export default ResetPassword;