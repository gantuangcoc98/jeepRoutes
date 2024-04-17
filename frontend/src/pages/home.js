import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { colors } from "../data/colors-data";

export const Home = () => {

    const addJeepRef = useRef(null);

    const [addJeep, setAddJeep] = useState(false);

    const [jeepCode, setJeepCode] = useState('');
    const [route, setRoute] = useState('');

    const [jeepSearch, setJeepSearch] = useState('');
    const [searchResponse, setSearchResponse] = useState([]);

    const [showResult, setShowResult] = useState(false);

    const toggleAddJeep = () => {
        setAddJeep(!addJeep);
    }

    useEffect(
        () => {
            const handleOutsideClick = (event) => {
                if (addJeepRef.current && !addJeepRef.current.contains(event.target)) {
                    setAddJeep(false);
                }
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            }
        }, []
    )

    useEffect(
        () => {
            console.log('Search Output:',searchResponse);
            console.log(searchResponse.length);
        }, [searchResponse]
    )

    const handleAddJeep = async () => {

        const routeArray = route.split(',').map(r => r.trim());

        const data = {
            jeep_code: jeepCode,
            routes: routeArray,
        }

        try {
            const response = await axios.post('http://localhost:8080/addJeep', data);

            if (response.status === 200) {
                console.log("Jeep added successfully!");
                alert('Jeep added succesfully!');
                clearInputs();
                toggleAddJeep();
            } else {
                console.log("Failed to add new jeep data.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const clearInputs = () => {
        setJeepCode('');
        setRoute('');
    }

    const handleSearchCode = async() => {
        try {
            const jeepCodes = jeepSearch.split(',').map(code => code.trim());

            console.log(jeepCodes);
            const jeepRoutes = [];

            for (const index in jeepCodes) {
                const response = await axios.get(`http://localhost:8080/search?code=${jeepCodes[index]}`);
                if (response.data) {
                    jeepRoutes.push(response.data);
                    setShowResult(true);
                } else {
                    alert('There is no routes in one of the jeep code/s!');
                    setSearchResponse([]);
                    setShowResult(false);
                    window.location.reload();
                }
            }

            setSearchResponse(jeepRoutes);
        } catch(error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            {addJeep &&
                <div className="absolute flex h-full w-full items-center justify-center">
                    <div className="w-full h-full bg-black opacity-30"/>

                    <div className="flex h-full w-full items-center justify-center absolute">
                        <div ref={addJeepRef} className="flex flex-col h-fit w-[30%] gap-[20px] rounded-[12px] bg-light-bg border-4 border-darker-bg p-[20px]">
                            <label htmlFor="jeepCode" className="flex flex-col gap-[5px]">
                                Jeep Code
                                <input 
                                    type="text"
                                    value={jeepCode}
                                    onChange={(e)=>setJeepCode(e.target.value)}
                                    id="jeepCode"
                                    className="p-[5px]"
                                />
                            </label>

                            <label htmlFor="route" className="flex flex-col gap-[5px]">
                                Routes (separate by comma, no space)
                                <input 
                                    type="text"
                                    value={route}
                                    onChange={(e)=>setRoute(e.target.value)}
                                    id="route"
                                    className="p-[5px]"
                                />
                            </label>
                            
                            <div className="flex w-full h-fit justify-end">
                                <button className="text-[16px] font-semibold bg-tea-green pt-[5px] pb-[5px] pl-[20px] pr-[20px] rounded-[12px] w-fit h-fit hover:bg-darker-tea-green"
                                    onClick={()=>handleAddJeep()}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
            }

            <div className="flex bg-light-bg h-full w-full justify-center pt-[50px]">
                <div className="flex flex-col h-fit w-[20%] gap-[10px] items-center">
                    <div className="flex justify-between h-fit w-full items-end">
                        <h1 className="text-[30px] font-semibold">
                            Jeep Routes
                        </h1>

                        <button className="text-[14px] w-fit h-fit p-[10px] bg-tea-green rounded-[12px] font-semibold hover:bg-darker-tea-green"
                            onClick={()=>toggleAddJeep()}>
                            Add New Jeep
                        </button>
                    </div>

                    <div className="flex flex-col w-[99%] h-fit">
                        <label htmlFor="jeepSearch" className="w-full h-fit">
                            <input 
                                type="text"
                                id="jeepSearch"
                                value={jeepSearch}
                                onChange={(e)=>setJeepSearch(e.target.value)}
                                className="w-full h-fit p-[10px]"
                                placeholder="Input jeep codes"
                            />
                        </label>
                    </div>

                    <button className="text-[16px] rounded-[12px] bg-battleship-gray w-full h-fit p-[10px] text-white font-semibold mt-[5px] hover:bg-darker-battleship-gray"
                        onClick={()=>handleSearchCode()}>
                        Search 
                    </button>

                    {showResult &&
                        <div className="flex flex-col gap-[10px] p-[10px] rounded-[12px] mt-[10px] bg-white w-full h-fit items-center">
                            {searchResponse.map((routes, index) => (
                                <div key={index}>
                                    {routes.map((route, i) => (
                                        <span key={i} style={{ color: colors[route] }} className="font-semibold">{route}{i !== routes.length - 1 ? " <-> " : ""}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
       
    )
}