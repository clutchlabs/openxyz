import React from "react";
import { useAccessKey, useUser } from '../lib/hooks'
import {Layout2} from '../components/layout'
import Link from 'next/link'




const Cards = () => {
  const user = useUser()
  const { data, mutate, error } = useAccessKey()
  // const { data, mutate, error } = useAccessKey()

  console.log('The cardd',user)

  return (
    <Layout2>

    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>

 {user && user.games.map((data)=>
   <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{marginTop:'30px'}}>


<div className="px-6 py-4">
  <div className="font-bold text-xl mb-2">{data.title}</div>
   <p className="text-gray-700 text-base">
   <Link href={`/gamedata?id=${data._id}`} > {data.description}

  </Link>

  </p>
</div>
<div className="px-6 pt-4 pb-2">
  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">  </span>
  {data.bannerInfo}
 
</div>
</div>

)  
 
 }
 </div>
    </Layout2 >
  );
};

export default Cards;
