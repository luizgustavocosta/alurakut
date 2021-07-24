import Layout from '../src/components/layout'
import nookies, {parseCookies} from "nookies";
import UserSession from "./UserSession";

export default function Page() {
  return (
    <Layout>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const currentUser = "" !== cookies.USER_TOKEN ? cookies.USER_TOKEN : UserSession.getName();
  nookies.set(context, 'USER_TOKEN', currentUser, {
    maxAge: 60 * 5, // 60 seconds * 5 = 5 minutes
    path: '/',
  })
  return {
    props: {
      githubUser: UserSession.getName()
    },
  }
}