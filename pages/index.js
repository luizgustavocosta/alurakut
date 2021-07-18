import React from "react";
import { v4 as uuidv4 } from 'uuid';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(properties) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul>
        {/*{pessoasFavoritas.map((itemAtual) => {*/}
        {/*  return (*/}
        {/*    <li key={itemAtual}>*/}
        {/*      <a href={`/users/${itemAtual}`} key={itemAtual}>*/}
        {/*        <img src={`http://github.com/${itemAtual}.png`}/>*/}
        {/*        <span>{itemAtual}</span>*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*  )*/}
        {/*})}*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const randomUser = 'luizgustavocosta';
  const [communities, setCommunities] = React.useState([{
    // id: uuidv4(),
    // title: "Eu ouço Racionais",
    // image: "https://a-static.mlcdn.com.br/618x463/cd-racionais-mcs-fim-de-semana-no-parque-radar-records/cluberadar/425/698b4fb042e846c33911592c75c58839.jpg"


    //  Generic image
    //  http://picsum.photos/200/300
    // dogstatus
    //https://www.datocms.com
    //https://temp-mail.org
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/luizgustavocosta/followers')
      .then((serverResponse) => {
        return serverResponse.json();
      })
      .then((responseAsJson) => {
        setFollowers(responseAsJson);
      })
    // Calling via GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '839e24e1b6019bf1a8ea741af96f45',
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
    }).then((response) => response.json())
      .then((jsonFromServer) => {
        const graphQLCommunities = jsonFromServer.data.allCommunities;
        setCommunities(graphQLCommunities)
      });
  }, [])
  // [] - only once

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={randomUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Welcome
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
                creatorSlug: randomUser
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
          <ProfileRelationsBox items={followers} title="Followers"/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`} key={itemAtual.id}>
                      {/*<img src={`http://placehold.it/300x300`}/>*/}
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
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`http://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
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