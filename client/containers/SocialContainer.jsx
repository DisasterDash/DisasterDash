import React from 'react'
import Social from '../components/Social.jsx';

//We decided to pass our props into our container levels because we wanted to onboard passing our hooks
//despite there not being an actual reason to do so

const SocialContainer = (props) => {
    return ( 
        <div id="social" className="alerts">
            <Social location={props.location} disaster={props.disaster}/>
        </div>
        
     );
}
 
export default SocialContainer;