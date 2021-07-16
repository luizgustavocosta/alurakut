import styled from 'styled-components';
 const MainGrid = styled.main`
   width: 100%;
   grid-gap: 10px;
   margin-left: auto;
   margin-right: auto;
   max-width: 500px;
   padding: 16px;
   // background-image: url(${`https://images.unsplash.com/photo-1592564630984-7410f94db184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1629&q=80`});
   .profileArea {
     display: none;
     @media(min-width: 860px) {
       display: block;
     }
   }
   @media(min-width: 860px) {
     max-width: 1110px;
     display: grid;
     grid-template-areas: 
       "profileArea welcomeArea profileRelationsArea";
     grid-template-columns: 160px 1fr 312px;
   }
 `;
 export default MainGrid;