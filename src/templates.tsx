export const Base = (props: JSX.ElementChildrenAttribute) => (
  <html lang='en'>
    <head>
      <title> Local Connector </title>
      <link rel="stylesheet" href="/main.css" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
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
    <ul class="list-none flex  flex-row gap-4">
      {
        props.authenticated ?
          <li> <div class="w-8 h-8 rounded bg-green-500 hover:border-2 hover:border-black"></div> </li>
          :
          ""
      }
      <li class="flex-grow"></li>
      <li>
        <a class="p-2 rounded bg-blue-600 hover:bg-blue-800 text-white" href="/"> Home </a>
      </li>
      <li>
        <a class="p-2 rounded bg-blue-600 hover:bg-blue-800 text-white" href="/connect"> Connect </a>
      </li>

      {
        props.authenticated ?
          <>
            <li> <a class="p-2 rounded bg-blue-600 hover:bg-blue-800 text-white" href="/create"> Create </a></li>
            <li> <a hx-refresh class="p-2 rounded bg-blue-600 hover:bg-blue-800 text-white" hx-post="/signout" hx-target="body"> Sign Out </a> </li>
          </>
          :
          <li> <a class="p-2 rounded bg-blue-600 hover:bg-blue-800 text-white" href="/signin"> Sign In </a> </li>
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
  tag: string | null
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
  <a href={`/connect/${props.id}`}>
    <div class={class_sanitizer("border shadow p-8 rounded-md hover:bg-gray-800 hover:text-white", props.class)} >
      <h2 class="text-xl font-semibold"> {props.title} </h2>
      <h3 class="text-md text-gray-700"> By {props.author} </h3>
      <p class="text-sm text-gray-400"> {props.description} </p>
    </div>
  </a>
)

export const PostView = (props: PostElements) => (
  <div
    class="rounded-lg shadow border flex flex-col gap-4 p-4 min-w-[256px] max-w-xl">
    {props.image ? <img src={`data:${props.tag};base64,` + props.image} /> : ""}
    <h2 class="text-3xl font-semibold text-center"> {props.title} </h2>
    <h3 class="text-lg text-gray-700"> By {props.author} </h3>
    <h3 class="text-md text-gray-500">
      {Intl.DateTimeFormat('en-US').format(props.date)}
    </h3>
    <p class="text-sm text-gray-700"> {props.description} </p>
    <div class="flex flex-row gap-2 items-stretch">
      <a class="bg-black text-white hover:bg-red-500 p-2 basis-1/2 text-center" href="/connect"> Back </a>
      <button class="bg-black text-white hover:bg-green-500 p-2 basis-1/2"> Comment </button>
    </div>
    {props.children}
  </div>
)

type AuthProps = {
  route: string
  desc: string
  alt: string
  altroute: string
}

export const AuthView = (props: AuthProps) => (
  <form class="flex flex-col shadow-md gap-4 mt-32 p-4"
    action={props.route} method="post">
    <h1 class="text-2xl font-bold text-center"> {props.desc} </h1>
    <label for="email"> Email </label>
    <input
      name="email"
      type="email"
      class="border p-1 invalid:border-red-400 invalid:text-red-400 valid:border-gray-200 valid:text-gray-300 rounded"
      hx-validate
      required
    />
    <label for="passwod"> Password </label>
    <input
      name="password"
      type="password"
      class="border p-1 invalid:border-red-400 invalid:text-red-400 valid:border-gray-200 valid:text-gray-300 rounded"
      required
      hx-validate
      minlength={8}
    />
    <a hx-boost="false" href='/signin/google' class="border p-1 border-black rounded hover:text-green-600 hover:border-green-600">
      <svg class="inline-block align-sub mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9c0 .66.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49Z"/></svg>
      Sign in with Gooogle
    </a>
    <div class="flex flex-row gap-2">
      <button type="submit" class="bg-black text-white p-2 rounded hover:bg-green-500 basis-2/5"> Submit </button>
      <a class="bg-black text-white p-2 rounded hover:bg-red-500 basis-1/5 text-center" href="/"> Back </a>
      <a class="bg-black text-white p-2 rounded hover:bg-blue-500 basis-2/5 text-center" href={props.altroute}> {props.alt} </a>
    </div>
  </form>
)

type ErrorProps = {
  code: string
  error: Readonly<Error>
}

export const ErrorTemplate = (props: ErrorProps) => (
  <article class="flex flex-col rounded-md shadow-lg w-96 gap-8 mx-auto mt-28">
    <header class="bg-red-300 rounded-t-md h-12 flex flex-col justify-center items-center">
      <h1 class="text-red-700 font-extrabold text-2xl text-center"> An Error Occured </h1>
    </header>

    <section class="flex flex-col gap-4 p-4">
      <h2 class="text-xl font-semibold text-gray-800"> Details: </h2>
      <p class="text-gray-600"> Error: <b class="font-bold text-black"> {props.error.message} </b></p>
    </section>
  </article>
)
