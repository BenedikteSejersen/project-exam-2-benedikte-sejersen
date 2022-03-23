import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

// Images
import CloseButton from '../../public/icons/kryss.svg'

export default function Filter({click}) {

    const [search, setSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const [filteredFireplaces, setFilteredFireplaces] = useState([]);

    const [services, setServices] = useState([]);
    const [fireplaces, setFireplaces] = useState([]);
    
    useEffect(async () => {
            try {
                const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
                setServices(res.data);

                const res2 = await axios.get(process.env.NEXT_PUBLIC_API_ILDSTEDER);
                setFireplaces(res2.data);
            } catch(err) {
                console.log(err);
            }
            return services;
    }, []);

    useEffect(() => {
      setFilteredFireplaces(
        fireplaces.filter((fireplace) =>
          fireplace.title.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    }, [search, fireplaces])
  
    useEffect(() => {
      setFilteredServices(
        services.filter((service) =>
          service.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, services]);

    return (
        <div className='search'>
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
                            placeholder="Søk her ..."
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                            />

                        {search && (
                          <ul className="search__result--list">
                            {filteredFireplaces.length || filteredServices.length > 0 
                              ? 
                              <>
                                {filteredServices.map((title, id, slug) => (
                                    <ServiceDetail href={slug} key={id} {...title} />
                                ))}
                                {filteredFireplaces.map((title, id, slug, img_1, type) => (
                                    <FireplaceDetail href={slug} key={id} {...title}  {...img_1} {...type} />
                                ))} 
                              </>
                              : <p className='search__no-result'>Ingen resultat funnet</p>
                            }
                          </ul> 
                        )} 

                </div>
        </div>
    )

}

const ServiceDetail = (props) => {
    const { title, id, slug } = props;
  
    return (
      <div className="search__result-container search__services" key={id}>
        <Link href={`/${slug}`}>{title}</Link>
      </div>
    );
};

const FireplaceDetail = (props) => {
  const { title, id, slug, img_1, type } = props;

  return (
    <div className="search__result-container search__fireplaces" key={id}>
      <Link href={`/${slug}`}>
        <div className='search__fireplaces--result'>
          <div>
            <a>
              {title}
            </a>
            <p>{type}</p>
          </div>
          <div className='search__fireplaces--img'>
            <Image src={img_1} width='500' height='550' />
          </div>
        </div>
      </Link>
    </div>
  );
};
