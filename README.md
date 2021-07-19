# Example app with styled-components

This example features how you use a different styling solution than [styled-jsx](https://github.com/vercel/styled-jsx) that also supports universal styles. That means we can serve the required styles for the first render within the HTML and then load the rest in the client. In this case we are using [styled-components](https://github.com/styled-components/styled-components).

For this purpose we are extending the `<Document />` and injecting the server side rendered styles into the `<head>`, and also adding the `babel-plugin-styled-components` (which is required for server side rendering). Additionally we set up a global [theme](https://www.styled-components.com/docs/advanced#theming) for styled-components using NextJS custom [`<App>`](https://nextjs.org/docs/advanced-features/custom-app) component.

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-styled-components)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-styled-components&project-name=with-styled-components&repository-name=with-styled-components)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-styled-components with-styled-components-app
# or
yarn create next-app --example with-styled-components with-styled-components-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Try it on CodeSandbox

[Open this example on CodeSandbox](https://codesandbox.io/s/github/vercel/next.js/tree/canary/examples/with-styled-components)

### Notes

When wrapping a [Link](https://nextjs.org/docs/api-reference/next/link) from `next/link` within a styled-component, the [as](https://styled-components.com/docs/api#as-polymorphic-prop) prop provided by `styled` will collide with the Link's `as` prop and cause styled-components to throw an `Invalid tag` error. To avoid this, you can either use the recommended [forwardedAs](https://styled-components.com/docs/api#forwardedas-prop) prop from styled-components or use a different named prop to pass to a `styled` Link.

<details>
<summary>Click to expand workaround example</summary>
<br />

**components/StyledLink.js**

```javascript
import Link from 'next/link'
import styled from 'styled-components'

const StyledLink = ({ as, children, className, href }) => (
  <Link href={href} as={as} passHref>
    <a className={className}>{children}</a>
  </Link>
)

export default styled(StyledLink)`
  color: #0075e0;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #40a9ff;
  }

  &:focus {
    color: #40a9ff;
    outline: none;
    border: 0;
  }
`
```

**pages/index.js**

```javascript
import StyledLink from '../components/StyledLink'

export default () => (
  <StyledLink href="/post/[pid]" forwardedAs="/post/abc">
    First post
  </StyledLink>
)
```

</details>

<GraphQL>
query {
  allCommunities {
    title
    id
    imageUrl
    creatorSlug
  }
}
</GraphQL>
<BFF>
http://localhost:3000/api/communities
</BFF>

<References>
</References>

<section>
jwt.io
</section>
<cookies>
* Add cookies - nookies
</cookies>
<aula1>
- Pegar os dados da API do GitHub e listar seus seguidores
- Adicionar quão confiável, legal e sexy você é
- Usar Strategy ao invés de vários ifs no css - https://www.youtube.com/watch?v=S-jqd6WZ7M0
- Separar e organizar o seu código
- Publicar o seu projeto
- Deixar o seu projeto com a sua cara
</aula1>
<aula2>
- Criar suas comunidades para compartilhar com a gente;
- Facilitar o cadastro da url da imagem;
- Adicionar links para as suas comunidades
- Adicionar o seu projeto na nossa vitrine;
- Deixar o seu read me do projeto bonitão.
</aula2>
<aula3>
- Terminar de listar seus seguidores através da api do Github;
- Adicionar suas comunidades no DatoCMS;
- Organizar os seus dados, pensando no que irá querer que apareça no seu Alurakut e criando os modelos que precisar;
- Subir sua aplicação na Vercel.
</aula3>
<aula4>
Variaveis de ambiente - https://www.youtube.com/watch?v=BP2KQtCyzo8
Configurar suas variáveis de ambiente;
Fazer os scraps;
Subir sua aplicação na Vercel.
</aula4>
<aula5>
- Fazer o logout da aplicação;
- Mensagem de feedback quando não conseguir logar na aplicação;
- Criar página de perfil do usuário;
- Subir a sua aplicação na Vercel e compartilhar com a gente.
</aula5>

//Organize
//  Generic image
//  http://picsum.photos/200/300
// dogstatus
//https://www.datocms.com
//https://temp-mail.org