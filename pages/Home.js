import Layout from '../src/components/layout'
import React from "react";
import {parseCookies} from "nookies";
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function FollowersBox(properties) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul key={"follower"}>
        {properties.items.slice(0, 6).map((follower) => {
          return (
            <li key={follower.id}>
              <a href={`/followers/${follower.login}`} key={follower.id}>
                <img src={follower.avatar_url}/>
                <span>{follower.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const currentUser = props.session && props.session.user ? props.session.user : "";
  if (currentUser === "") return (<div>NOT FOUND</div>);
  const [communities, setCommunities] = React.useState([{}]);
  const [followings, setFollowings] = React.useState([{}]);
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/' + currentUser + '/following')
      .then((serverResponse) => {
        return serverResponse.json();
      })
      .then((responseAsJson) => {
        setFollowings(responseAsJson);
      })

    fetch('https://api.github.com/users/' + currentUser + '/followers')
      .then((serverResponse) => {
        return serverResponse.json();
      })
      .then((responseAsJson) => {
        setFollowers(responseAsJson);
      })
    fetch(`${process.env.CMS_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Authorization': `${process.env.CMS_READ}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`
      })
    }).then((response) => {
      return response.json()
    })
      .then((jsonFromServer) => {
        const graphQLCommunities = jsonFromServer.data.allCommunities;
        setCommunities(graphQLCommunities)
      });
  }, [])

  return (
    <>
        <AlurakutMenu/>
        <MainGrid>
          <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSidebar githubUser={currentUser}/>
          </div>
          <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
              <h1 className="title">
                Welcome, {currentUser}
              </h1>
              <OrkutNostalgicIconSet/>
            </Box>
            <Box>
              <h2 className="subTitle">O que deseja fazer?</h2>
              <form onSubmit={function handleCreateCommunity(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const community = {
                  title: formData.get('title'),
                  imageUrl: formData.get('image'),
                  creatorSlug: currentUser
                }
                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(community)
                })
                  .then(async (response) => {
                    const data = await response.json();
                    const updateCommunities = [...communities, data.created];
                    setCommunities(updateCommunities)
                  })
              }}>
                <div>
                  <input
                    placeholder="Qual o nome da sua comunidade ?"
                    name="title"
                    aria-label="Qual o nome da sua comunidade ?"
                    type="text"/>
                </div>
                <div>
                  <input
                    placeholder="Coloque uma URL para usarmos de capa"
                    name="image"
                    aria-label="Coloque uma URL para usarmos de capa"/>
                </div>
                <button>
                  Criar comunidade
                </button>
              </form>
            </Box>
          </div>
          <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
            <FollowersBox items={followers} title="Followers"/>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Communities ({communities.length})
              </h2>
              <ul>
                {communities.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/communities/${itemAtual.id}`} key={itemAtual.id}>
                        <img src={itemAtual.imageUrl}/>
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Following ({followings.length})
              </h2>
              <ul>
                {followings.slice(0,6).map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`/users/${itemAtual}`} key={itemAtual.login}>
                        <img src={itemAtual.avatar_url}/>
                        <span>{itemAtual.login}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </div>
        </MainGrid>
    </>
  )
}