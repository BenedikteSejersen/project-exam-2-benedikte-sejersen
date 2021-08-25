// import '../styles/globals.css'
// import '../styles/scss/style.css'
// import '../styles/fonts/rns-sanz/stylesheet.css';
// import '../styles/fonts/gothic-a1/stylesheet.css';
// import React from "react";
// import { ApolloProvider } from "@apollo/react-hooks";
// import withData from "../utils/apollo";

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <ApolloProvider client={apollo}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   )
// }

// export default withData(MyApp)

import '../styles/globals.css'
import '../styles/scss/style.css'
import '../styles/fonts/rns-sanz/stylesheet.css';
import '../styles/fonts/gothic-a1/stylesheet.css';
import React from "react";

import "regenerator-runtime/runtime.js";
const regeneratorRuntime = require("regenerator-runtime");
// import { ApolloProvider } from "@apollo/react-hooks";
// import withData from "../utils/apollo";

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
