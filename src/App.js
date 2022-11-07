import React, {useState, useEffect} from 'react';
import logo from './logo.png';
import Post from './Post';
import Loading from './Loading';
import ImageUpload from './ImageUpload';
import NotLoggedIn from './NotLoggedIn';
import {getModalStyle, useStyles} from './modalFunctions';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import {auth, db} from './firebase';
import './css/app.css';
import './css/index.css';

function App() {
  //for posts
  const [posts, setPosts] = useState([]);
  //for loading
  const [loading, setLoading] = useState(true);
  //for sign up modal
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const classes = useStyles();
  //for user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // user is logged in...
        //console.log(authUser);
        setUser(authUser);
      }else{
        // user is logged out...
        setUser(null);
      }
    });  
    //cleaning up previous listeners to not have duplicate fires of the same user
    return () => {
      unsubscribe();
    }
  }, [user, username])

  //get posts data from firebase
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({id:doc.id, post:doc.data()})
        )
      );
    })
    setLoading(false);
  }, []);

  
  const handleSignup = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      });
    })
    .catch((error) => alert(error.message))
    
    setOpen(false);
  };

  const handleLogIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  if(loading) {
      return <Loading />
    }
  
  
  return (
    <div className="App">
      {/* sign up modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app-signup'>
            <center>
            <img 
              src={logo}
              alt="brand logo"
              className='app-modal-image'  
            />
          </center>
            <Input 
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              disableUnderline={true} 
            />
            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              disableUnderline={true} 
            />
            <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disableUnderline={true}
            />
            <br/>
            <Button onClick={handleSignup} type='submit'>Sign Up</Button>
          </form>                    
        </div>
      </Modal>

      {/* login modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app-signup'>
            <center>
            <img 
              src={logo}
              alt="brand logo"
              className='app-modal-image'  
            />
          </center>
            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              disableUnderline={true}
            />
            <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disableUnderline={true}
            />
            <br/>
            <Button onClick={handleLogIn} type='submit'>Log In</Button>
          </form>                    
        </div>
      </Modal>

      {/* navbar */}
      <div className="app-header">
        <img src={logo} alt=""/>
        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app-login-container">
          <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        
      )}
      </div>

      {/* image upload */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className='image-upload-h3' style={{}}></h3>
      )}

      {/* posts from firebase */}
      <div className="app-posts">
        {/* {posts.map(({post,id}) => {
        return <Post key={id} postId={id} user={user} {...post}/>
      })} */}
      {user ? (
        posts.map(({post,id}) => {
        return <Post key={id} postId={id} user={user} {...post}/>
      })
      ) : (
        <NotLoggedIn />
      )} 
      </div>
      

      
      
    </div>
  );
}

export default App;
