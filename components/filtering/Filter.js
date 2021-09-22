import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

// Images
import CloseButton from '../../public/images/icons/close-button.png'

export default function Filter({click}) {

    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(async () => {
            try {
                const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
                setServices(res.data);

            } catch(err) {
                console.log(err);
            }
            return services;
    }, []);
  
    useEffect(() => {
      setFilteredServices(
        services.filter((service) =>
          service.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, services]);

    return (
        <div>
                <div className="search__background"></div>

                <div 
                onClick={click}
                className="search__close"
                >
                            <Image src={CloseButton.src} width="200" height="200" alt="close search button" />
                </div>

                <div className="search__content">

                        <input 
                            className="search__input"
                            placeholder="Search services here..."
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                            />

                        {search && (
                        <ul className="search__result--list">
                            {filteredServices.map((title, id, slug) => (
                                <ItemDetail href={slug} key={id} {...title} />
                            ))}
                        </ul> 
                        )} 
                </div>
        </div>
    )

}

const ItemDetail = (props) => {
    const { title, id, slug } = props;
  
    return (
      <div className="search__result-container" key={id}>
        <Link href={`/service/${slug}`}>{title}</Link>
      </div>
    );
  };
