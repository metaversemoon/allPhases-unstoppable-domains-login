import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import {
  Container,
  Chip,
  Card,
  Paper,
  Tabs,
  Tab,
  StylesProvider,
} from '@material-ui/core'
import '../profile/Profile.css'
import userBGimage from '../../../images/backgroundIMG.png'
import copy from '../../../images/copy.png'
import lockedProfile from '../../../images/locked.png'
import { doesFollow } from '../../../Phase/doesFollow'
import { follow } from '../../../Phase/follow'
import MyLinks from '../profile/MyLinks'
import Followers from '../profile/Followers'
import Following from '../profile/Following'
import { displayPhase } from '../../../Phase/displayPhase'

function MyProfile({ account, currentAccount, selectedProfile }) {
  console.log(
    '🚀 ~ file: Profile.js ~ line 26 ~ Profile ~ selectedProfile',
    selectedProfile,
  )
  const { petId } = useParams()
  const [userProfile, setUserProfile] = useState({})
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const user = await displayPhase(currentAccount)
    console.warn(user)
    setUserProfile(user)
  }

  const checkFollow = async (e) => {
    const follower = currentAccount
    // console.log(
    //   '🚀 ~ file: Profile.js ~ line 36 ~ checkFollow ~ currentAccount',
    //   currentAccount,
    // )
    // console.log('selectedProfile.address', selectedProfile.address)

    // const res = await doesFollow(follower, selectedProfile.address)

    // setShowProfile(res)
  }

  const requestFollow = async () => {
    console.log('tess')
    const follower = currentAccount
    // const isFollower = await follow(follower, selectedProfile.address)
    // console.log(' isFollower', isFollower)
    const a = await setTimeout(function () {
      setShowProfile(true)
    }, 2000)
  }

  const visitSite = (site) => {
    const link = site.value
    if (link) {
      window.open(link, '_blank')
    } else {
      window.open(site, '_blank')
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-pet-details"
        style={{ minHeight: '50vh', paddingBottom: '3rem' }}
      >
        <center>
          <Card
            style={{
              maxWidth: '500px',
              paddingBottom: '3rem',
              position: 'relative',
              borderRadius: '13px',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '160px',
                position: 'relative',
                top: '0',
                left: '0',
              }}
              src={userProfile.banner || userBGimage}
              alt="userBGimage"
            />
            <img
              style={{
                position: 'absolute',
                top: '45px',
                left: '30px',
                border: '3px solid white',
                borderRadius: '13px',
                width: '120px',
                height: '125px',
              }}
              src={userProfile.image || userProfile.avatar}
              alt="userImage"
            />

            <p className="profile-username">
              {userProfile.name || userProfile.username}
            </p>
            <p className="profile-wallet">
              {userProfile.address
                ? userProfile.address
                : '0x5e1b802905c9730C8474eED020F800CC38A6A42E'}

              <img className="profile-wallet-copy" src={copy} alt="copy.png" />
            </p>
            <p className="prof-description">
              {userProfile.description || userProfile.bio}
            </p>

            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Profile" />
                <Tab label="Followers" />
                <Tab label="Following" />
              </Tabs>
            </Paper>
            <hr />
            {value === 0 && (
              <MyLinks
                requestFollow={requestFollow}
                lockedProfile={lockedProfile}
                selectedProfile={userProfile}
                visitSite={visitSite}
              />
            )}
            {value === 1 && <Followers />}
            {value === 2 && <Following />}
          </Card>
        </center>
      </Container>
    </StylesProvider>
  )
}

export default MyProfile
