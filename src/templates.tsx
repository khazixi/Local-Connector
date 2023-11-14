export const Base = (props: JSX.ElementChildrenAttribute) => (
  <html lang='en'>
    <head>
      <title> Local Connector </title>
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body hx-boost="true">
      {props.children}
    </body>
  </html>
)

export const BaseLayout = (props: JSX.ElementChildrenAttribute) => (
  <main class="flex flex-col items-center gap-y-16">
    {props.children}
  </main>
)

type NavProps = {
  authenticated: boolean
}

export const Nav = (props: NavProps) => (
  <nav class=" my-2 mx-8 p-4 shadow border-b border-gray-200 w-full">
    <ul class="list-none flex gap-4">
      <li> <div class="w-8 h-8 rounded bg-green-500"></div> </li>
      <li class="flex-grow"></li>
      <li>
        <a class="p-2 rounded bg-blue-300 hover:bg-blue-500 hover:text-white" href="/"> Home </a>
      </li>
      <li>
        <a class="p-2 rounded bg-blue-300 hover:bg-blue-500 hover:text-white" href="/connect"> Connect </a>
      </li>

      {
        props.authenticated ?
          <li> <a class="p-2 rounded bg-blue-300 hover:bg-blue-500 hover:text-white" href="#"> Sign Out </a> </li>
          :
          <li> <a class="p-2 rounded bg-blue-300 hover:bg-blue-500 hover:text-white" href="/signin"> Sign In </a> </li>
      }
    </ul>
  </nav>
)

type PreviewElements = {
  title: string
  author: string
  description: string
  class?: string
}

type PostElements = PreviewElements & {
  image: string | null
  date: Date
} & JSX.ElementChildrenAttribute

const class_sanitizer = (...classes: Array<string | undefined>) => {
  return classes.reduce((prev, curr) => prev += (' ' + (curr ? curr : "")), '')
}

export const Preview = (props: PreviewElements) => (
  <div class={class_sanitizer("border shadow p-8 rounded-md ", props.class)}>
    <h2 class="text-xl font-semibold"> {props.title} </h2>
    <h3 class="text-md text-gray-700"> By {props.author} </h3>
    <p class="text-sm text-gray-400"> {props.description} </p>
  </div>
)

export const PostPreview = (props: PreviewElements & { id: number }) => (
  <a href="/connect/1">
    <div class={class_sanitizer("border shadow p-8 rounded-md hover:bg-gray-800 hover:text-white", props.class)} >
      <h2 class="text-xl font-semibold"> {props.title} </h2>
      <h3 class="text-md text-gray-700"> By {props.author} </h3>
      <p class="text-sm text-gray-400"> {props.description} </p>
    </div>
  </a>
)

export const PostView = (props: PostElements) => (
  <div
    class="rounded-lg shadow border flex flex-col gap-4 p-4 max-w-xl">
    { props.image ? <img src={props.image} /> : "" }
    <h2 class="text-3xl font-semibold"> {props.title} </h2>
    <h3 class="text-lg text-gray-700"> By {props.author} </h3>
    <h3 class="text-md text-gray-500">
      {Intl.DateTimeFormat('en-US').format(props.date)}
    </h3>
    <p class="text-sm text-gray-700"> {props.description} </p>
    {props.children}
  </div>
)
