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
  const usuarioAleatorio = 'luizgustavocosta';
  const [comunidades, setComunidades] = React.useState([{
    id: uuidv4(),
    title:"Eu ouço Racionais",
    image: "https://a-static.mlcdn.com.br/618x463/cd-racionais-mcs-fim-de-semana-no-parque-radar-records/cluberadar/425/698b4fb042e846c33911592c75c58839.jpg"
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

  React.useEffect(()=> {
    fetch('https://api.github.com/users/luizgustavocosta/followers')
      .then((serverResponse) => {
        return serverResponse.json();
      })
      .then((responseAsJson)=> {
        setFollowers(responseAsJson);
      })
  }, [] )
  // [] - only once

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={usuarioAleatorio}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>
          <Box>
            <h2 className="subTitle">O que deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(event) {
              event.preventDefault();
              const formData = new FormData(event.target);
              const comunidade = {
                id: uuidv4(),
                titulo: formData.get('titulo'),
                image: formData.get('image')
              }
              setComunidades([...comunidades, comunidade]);
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
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      {/*<img src={`http://placehold.it/300x300`}/>*/}
                      <img src={itemAtual.image}/>
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