import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import HomeGallery from './components/home-container/gallery/HomeGallery'
import Profile from './components/home-container/profile/Profile'
import CreateProfile from './components/create-profile/CreateProfile'
import CreateLinks from './components/create-links/CreateLinks'
import MyProfile from './components/home-container/myprofile/MyProfile'
import Notifications from './components/notifications/Notifications'
import Web3Modal from 'web3modal'
import UAuth from '@uauth/js'

// FUNCTIONS
import { displayAll } from './Phase/displayAll'
import { hasPhase } from './Phase/hasPhase'

const { ethers } = require('ethers')

function App() {
  const [currentAccount, setCurrentAccount] = useState('')
  const [hasProfile, setHasProfile] = useState('')
  const [allProfiles, setAllProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState('')
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [coverPhoto, setCoverPhoto] = useState('')
  const [userUD, setUserUD] = useState('')

  const unstoppableInstance = new UAuth({
    clientID: '36d48583-8d6f-418d-ab02-e35123dd1467',
    redirectUri: 'https://phasedapp.netlify.app',
    scope: 'openid wallet',
  })

  const unstoppableLogin = async () => {
    const user = await unstoppableInstance.loginWithPopup()
    console.log('MY user', user)
    if (user) {
      localStorage.setItem('user', user)
      setUserUD(user)
      setCurrentAccount(user.idToken.wallet_address)
    }
  }

  const userLogOut = () => {
    localStorage.removeItem('user')
    setUserUD('')
  }

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setCurrentAccount(address)
    localStorage.setItem('currentAccountLocalStorage', address)
    const resHasPhase = await hasPhase(address)
    setHasProfile(resHasPhase)
  }

  const disconnectWallet = async () => {
    localStorage.removeItem('currentAccountLocalStorage')
    setCurrentAccount('')
  }

  useEffect(() => {
    const getAddress = localStorage.getItem('currentAccountLocalStorage')
    setCurrentAccount(getAddress)
    const getAllProfiles = displayAll()
    setAllProfiles(getAllProfiles)
  }, [])

  return (
    <Router>
      <div className="cl">
        <Navbar
          unstoppableLogin={unstoppableLogin}
          userUD={userUD}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          currentAccount={currentAccount}
          hasProfile={hasProfile}
        />

        <Route exact path="/">
          <HomeGallery
            allProfiles={allProfiles}
            setSelectedProfile={setSelectedProfile}
          />
        </Route>
        <Switch>
          <Route exact path="/notifications" component={Notifications} />

          <Route path="/create">
            <CreateProfile
              setCoverPhoto={setCoverPhoto}
              setImage={setImage}
              setUsername={setUsername}
              setBio={setBio}
              setCoverPhotoFunction={setCoverPhoto}
              currentAccount={currentAccount}
              image={image}
              username={username}
              bio={bio}
              coverPhoto={coverPhoto}
            />
          </Route>

          <Route path="/create-links">
            <CreateLinks
              currentAccount={currentAccount}
              image={image}
              username={username}
              bio={bio}
              coverPhoto={coverPhoto}
            />
          </Route>

          <Route path="/profile/details/:userAddress">
            <Profile
              selectedProfile={selectedProfile}
              currentAccount={currentAccount}
            />
          </Route>
          <Route path="/my-profile">
            <MyProfile
              selectedProfile={selectedProfile}
              currentAccount={currentAccount}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
