import axios from 'axios';
import React from 'react'

export default async function getStaticProps({ url,data }) {

    // let data = [];

    try {
        const res = await axios.get(url);
        data = res.data;

        console.log(data)
    } catch(err) {
        console.log(err)
    }
    

    return {
        props: {
            data: data,
        },
    };
}

// import React, {Component} from 'react'

// class DataFetcher extends Component { 
//     state = {
//        data: null,
//        loading: false,
//        error: null
//     }


//    componentDidMount() { 
//        this.setState({loading: true})
//        fetch(this.props.url)
//            .then(res => res.json())
//            .then(data => this.setState({data: data, loading: false}))
//            .catch(err => this.setState({error: err, loading: false}))
//    }

//    render() {
//        const {data, loading, error} = this.state
//        console.log(data)
//        return (
//            this.props.children({data, loading, error})
//             // null
//        )
//    }
// }

// export default DataFetcher

// import * as React from "react";
// import { useState, useCallback, useEffect } from "react";
// import axios from "axios";

// const DataFetcher = ({url}) => {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);

//   const fetchItems = useCallback(() => {
//     axios
//       .get(url)
//       .then(response => {
//         setIsLoaded(true);
//         setItems(response.data);
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }, []);

//   useEffect(() => {
//     fetchItems();
//   }, [fetchItems]);

//   if (error !== null) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div>
//         {/* {items.map(item => ( */}
//           <div>{item.id}</div>
//         // ))}
//       </div>
//     );
//   }
// };

// export default DataFetcher;
