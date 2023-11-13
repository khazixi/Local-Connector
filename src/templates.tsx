export const Base = (props: JSX.ElementChildrenAttribute) => (
  <html lang='en'>
    <head>
      <title> Local Connector </title>
      <link rel="stylesheet" href="main.css" />
    </head>
    <body>
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
      <li> <div class="w-8 h-8 rounded-full bg-green-500"></div> </li>
      <li class="flex-grow"></li>

      {
        props.authenticated ?
          <li> <a class="p-2 rounded-full bg-blue-300 hover:bg-blue-500 hover:text-white" href="#"> Sign Out </a> </li>
          :
          <li> <a class="p-2 rounded-full bg-blue-300 hover:bg-blue-500 hover:text-white" href="#"> Sign In </a> </li>
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

const class_sanitizer = (...classes: Array<string | undefined>) => {
  return classes.reduce(
    (prev, curr) => prev += (' ' + (curr ? curr : "")),
    '')
}

export const Preview = (props: PreviewElements) => (
  <div class={class_sanitizer("border shadow p-8 rounded-md ", props.class)}>
    <h2 class="text-xl font-semibold"> {props.title} </h2>
    <h3 class="text-md text-gray-700"> By {props.author} </h3>
    <p class="text-sm text-gray-400"> {props.description} </p>
  </div>
)
