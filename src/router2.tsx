import {
  createBrowserRouter,
  Link,
  Navigate,
  useParams,
  Outlet,
  redirect,
  useLoaderData,
  Form,
  useActionData
} from 'react-router-dom'

import App from './App'

function Order() {
  const data = useLoaderData()
  console.log('order...', data)
  const params = useParams()
  return <h2>订单组件,订单id：{params.id}</h2>
}
function orderLoader({ params }: any) {
  console.log('loader init...', params.id)
  if (!sessionStorage.token) return redirect('/login')
  return fetch(`/${params.id}.json`)
  // return {
  //   userName: 'jack',
  //   token: sessionStorage.token
  // }
}
function NotFound() {
  return <h2>404, 当前页面不存在</h2>
}
function Login() {
  const errors: any = useActionData()
  return (
    <Form method='post'>
      <p>
        <input type='text' name='email' />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type='text' name='password' />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type='submit'>登录</button>
      </p>
    </Form>
  )
}
async function loginAction({ request }: any) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const errors: any = {}

  // validate the fields
  if (typeof email !== 'string' || !email.includes('@')) {
    errors.email = "That doesn't look like an email address"
  }

  if (typeof password !== 'string' || password.length < 6) {
    errors.password = 'Password must be > 6 characters'
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors
  }

  // otherwise create the user and redirect
  // await createUser(email, password);
  console.log('创建用户成功')
  return redirect('/')
}
const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/order/:id',
    element: <Order />, // 再加载 element
    loader: orderLoader // 优先加载 loader
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default routers
