import React from 'react'
import Layout from "../components/layout";

import { useAccessKey, useUser } from '../lib/hooks'


const gamedata = () => {

    const user = useUser()
    const { data, mutate, error } = useAccessKey()
    console.log('the user games are',user && user.games)
    
    const result = user && user.games.filter((data)=>data._id===window.location.href.split('=')[1]);

    console.log('the result is ',result)

  return (
    <Layout>
 {result && <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{marginTop:'30px'}}>


<div className="px-6 py-4">
  <div className="font-bold text-xl mb-2">{result[0].title}</div>
   <p className="text-gray-700 text-base">
   {result[0].description}
  </p>


  <p className="text-gray-700 text-base">
  <b>Game Key</b> {result[0].gameKey}
  </p>

  <p className="text-gray-700 text-base">
  <b>Game Secret </b> {result[0].gameSecret}
  </p>
</div>

<div className="px-6 pt-4 pb-2">
  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">  </span>
  {result[0].bannerInfo}
 
</div>
</div>  }  </Layout>
  )
}

export default gamedata
