import { useEffect, useState } from "react";
import ToggleButtons from "../../global/ToggleButtons"
import "./home.scss"
import { useFetchData } from "../../hooks/useFetch";
import Loader from "../../global/Loader";
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const Home = () => {
    const [active, setActive] = useState<'yearly' | 'weekly'>('yearly');
    const [dummyData, setDummyData] = useState<Product[]>([]);

    const { data, loading } = useFetchData('https://fakestoreapi.com/products');

    useEffect(() => {
        if (data) {
            setDummyData(data);
        }
    }, [data]);

    return (
        <div className="main-leaderboard">
            <h1 className="leader-tag">LeaderBoard</h1>
            <div className="leader-mainbox">
                <div className="leader-btn">
                    <ToggleButtons active={active} setActive={setActive} />
                </div>
                {!loading ?
                    <div className="mainbox-data">
                        {
                            active === "yearly" ?
                                (<div>
                                    {
                                        dummyData?.map((data) => (
                                            <div key={data.id} className="product-cards">
                                                <img src={data.image} alt={data.title} width={20} />
                                                <div className="product-tags">
                                                    <h3>{data.title}</h3>
                                                    <p>${data.price}</p>
                                                </div>
                                            </div>
                                        ))
                                    }


                                </div>)
                                : (<div>
                                    {
                                        dummyData?.map((data) => (
                                            <div key={data.id} className="product-card">
                                                <h1>{data.id}</h1>
                                                <img src={data.image} alt={data.title} width={20} />
                                                <div className="product-tags-weekly">
                                                    <img src={data.image} alt={data.title} width={10} />
                                                    <h3>{data.title}</h3>
                                                    <p>${data.price}</p>
                                                </div>
                                            </div>
                                        ))
                                    }


                                </div>)
                        }
                    </div>
                    : (
                        <Loader />
                    )
                }
            </div>
        </div>
    )
}

export default Home