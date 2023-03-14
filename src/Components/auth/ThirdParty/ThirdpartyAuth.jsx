import React, { useEffect } from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { ReactComponent as Twitter } from '../../../Assets/svg/twitter.svg';
import { ReactComponent as Microsoft } from '../../../Assets/svg/microsoft.svg';
import { ReactComponent as Apple } from '../../../Assets/svg/apple.svg';
import { ReactComponent as Facebook } from '../../../Assets/svg/facebook.svg';
import { ReactComponent as Google } from '../../../Assets/svg/google.svg';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { config } from '../../../Services/firebaseClient';
import { signupGoogle } from '../../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
const ThirdpartyAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const result = await getRedirectResult(auth);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const token = user.accessToken;

        // The signed-in user info.

        // console.log('token====', token);
        dispatch(
          signupGoogle({
            firstName: user.displayName,
            lastName: '',
            email: user.email,
            accountType: 'personal',
            is_business_profile: false,
            is_personal_profile: true,
            token,
          })
        );
      } catch (error) {
        // console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      }
    })();
  }, [dispatch]);
  const { auth } = config();
  const provider = new GoogleAuthProvider();
  const responseGoogle = (response) => {
    // console.log('response Success', response);
  };
  const responseFailureGoogle = (response) => {
    // console.log('response error', response);
  };
  const handleResponseFacebook = (data) => {
    // console.log(data);
  };

  const handleErrorFacebook = (error) => {
    // console.log(error);
  };

  return (
    <>
      <Twitter className='me-2 socialIcon' />

      <Google
        className='socialIcon'
        onClick={() => {
          signInWithRedirect(auth, provider);
        }}
      />

      <FacebookProvider appId={process.env.REACT_APP_facebook_appId}>
        <LoginButton
          scope='email'
          onCompleted={handleResponseFacebook}
          onError={handleErrorFacebook}
          className='border-0 bg-transparent'
        >
          <Facebook className='me-2 socialIcon' />
        </LoginButton>
      </FacebookProvider>

      <Apple className='me-2 socialIcon' />
      <Microsoft className='socialIcon' />
    </>
  );
};

export default ThirdpartyAuth;
