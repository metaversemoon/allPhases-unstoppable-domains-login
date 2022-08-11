import React from 'react'
import {
  Container,
  Chip,
  Card,
  Paper,
  Tabs,
  Tab,
  StylesProvider,
} from '@material-ui/core'
import ENS from '../../../images/ENS.png'
import Twitter from '../../../images/twitter.png'
import Instagram from '../../../images/instagram.png'
import Website from '../../../images/website.png'
import Banner from '../../../images/website.png'
import GitHub from '../../../images/GitHub.png'

const icons = {
  ens: ENS,
  twitter: Twitter,
  instagram: Instagram,
  website: Website,
  banner: Banner,
  github: GitHub,
}

function MyLinks({
  isUserLocked,
  requestFollow,
  lockedProfile,
  selectedProfile,
  visitSite
}) 
{
  return (
    <div>
      {isUserLocked ? (
        <img
          src={lockedProfile}
          className="profile-locked"
          alt="lockedProfile"
          onClick={requestFollow}
        />
      ) : (
        <div className="profile-root">
          {selectedProfile?.attributes ? (
            selectedProfile.attributes.map((link, index) => (
              <Chip
                key={index}
                className="profile-chip"
                avatar={
                  <img
                    src={icons[link.trait_type.toLowerCase()]}
                    alt={link.value}
                  />
                }
                onClick={() => visitSite(link)}
                label={link.value ? link.value : selectedProfile.name}
                variant="outlined"
              />
            ))
          ) : selectedProfile?.links
                ?selectedProfile.links.map((link, index) => (
                <Chip
                  className="profile-chip"
                  avatar={
                    <img
                      src={icons[link[0].toLowerCase()]}
                    />
                  }
                  label={link[1]}
                  onClick={() => visitSite(link[1])}
                  variant="outlined"
                />
              ))
            : <p>No Links available</p>
          }
        </div>
      )}
    </div>
  )
}

export default MyLinks
