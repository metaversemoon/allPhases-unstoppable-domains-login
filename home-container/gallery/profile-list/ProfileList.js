import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './ProfileList.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'

import { apiKey } from '../../../../APIKEYS'
import CircularStatic from '../../../commons/CircularProgressWithLabel'
import { displayAll } from '../../../../Phase/displayAll'

function ProfileList({ account, contractData, setSelectedProfile }) {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const loaddata = async () => {
      try {
        setLoading(true)
        const getAllProfiles = await displayAll()
        console.log(getAllProfiles)
        setProfiles(getAllProfiles)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loaddata()
  }, [])

  const details = (profile) => {
    console.log('here profile', profile.address)
    localStorage.removeItem('selectedProfile')
    localStorage.setItem('selectedProfile', profile)
    setSelectedProfile(profile)
    history.push(`/profile/details/${ profile.address}`)
  }

  return (
    <div style={{ minHeight: '60vh', borderRadius: '24px' }}>
      {loading ? (
        <CircularStatic />
      ) : (
        <div>
          <Grid container spacing={40}>
            {profiles.length ? (
              profiles.map((profile, index) => (
                <Grid item md={3} spacing={1} className="swap-card">
                  <Card sx={{ maxWidth: 240 }} onClick={() => details(profile)}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={profile.avatar || profile.image}
                      alt="Profile"
                    />
                    <CardContent>
                      <Typography
                        font-size="24px"
                        color="#1C1A19"
                        className="card-header-swap"
                      >
                        {profile.name || profile.username}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No Profiles Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ProfileList
