import React from 'react';
import MapsContainer from './MapsContainer.jsx';
import MessagesContainer from './MessagesContainer.jsx';
import NewsContainer from './NewsContainer.jsx';
import SocialContainer from './SocialContainer.jsx';

//This container was made to be a routing point from the main landing page
//This is also useful for styling all the pieces together

const ContentContainer = ({location, news, layers, path}) => {
    // console.log(path)
    return ( 
        <div id="content">
            <NewsContainer news={news}/>
            <SocialContainer/>
            <MapsContainer location={location} layers={layers} path={path}/>
            <MessagesContainer/>
        </div>
     );
}
 
export default ContentContainer;