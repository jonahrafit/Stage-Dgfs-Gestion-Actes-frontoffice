import React, { useState, useEffect } from "react";
import { maladie_url_api } from '../../service/apiService';

export default function Maladie() {
    const [, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(maladie_url_api)
            .then(response => response.json())
            .then((usefulData) => {
                console.log(usefulData);
                setLoading(false);
                setData(usefulData);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    }, []);

    return (
        <>
            <div className="App">
                {loading &&
                    <div className="spinner-border text-primary" role="status"></div>
                }
                {!loading && <p>Fetched data</p>}
            </div>
        </>
    )
}
