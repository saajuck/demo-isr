import { getCookies, getCookie, setCookies, removeCookies, deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const SetCookieButton = (({v, onClick, cookie}) => (
    <button onClick={() => onClick(v)}> 
      {cookie === v && '✓'}{v}
      </button>
      )
  )

const RenderView = ({card, local}) => {
  const [cookie, setStateCookie] = useState()

  const currentCookie=getCookie('country')

  useEffect(()=>setStateCookie(getCookie('country')), [currentCookie])
  const handleSetCookie=(v)=>{
    setStateCookie(v)
    setCookies('country', v)
  }
  return (
    <div>
      <ul>
        <li><SetCookieButton cookie={cookie} onClick={handleSetCookie} v="Russian"/></li>
        <li><SetCookieButton cookie={cookie} onClick={handleSetCookie} v="Spanish"/></li>
        <li><SetCookieButton cookie={cookie} onClick={handleSetCookie} v="French"/></li>
        <li><SetCookieButton cookie={cookie} onClick={handleSetCookie} v="German"/></li>
        <li><button onClick={() => deleteCookie('country')}>clear</button></li>
      </ul>
      {card.map(c=>(
        <div key={c.multiverseid}>
          <p>{c.name} {c.manaCost}</p>
          <pre>
          {JSON.stringify(c.foreignNames, undefined, 2)}
          </pre>
        </div>
      ))}
    </div>
    )
}

export default RenderView

const getCard = async (name) => {
    console.log("fetching card: ", name);
  
    return fetch(
      `https://api.magicthegathering.io/v1/cards?name=${name.replace("-", " ")}`
    ).then((a) => a.json());
  };
  

export const getStaticProps = async ({params}) => {
    console.log({params})
    const [name, local="French"] = params.url[0].split('-')
    const card = name ? (await getCard(name)).cards.filter(({foreignNames})=> foreignNames && foreignNames.length > 3) : null
    const filterdCard = card.map(c=>({
      ...c, 
      foreignNames: c.foreignNames.filter(f => f.language === local )
    }))
    return {
        props: {
          card:filterdCard,
        },
        revalidate: 10,
    };
}

export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
  }