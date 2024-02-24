import React, { useState, useEffect } from "react";
import "./FetchData.css";
const FetchData = () => {
  const [list, setList] = useState([]);
  
  const getData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false"
    );
    const data = await res.json();

    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);
//   console.log(list);
  return (
    <div>
      <table>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <div className="first_td">
                    <img src={item.image} alt="" />

                    <div>{item.name}</div>
                  </div>
                </td>
                <td>{item.symbol.toUpperCase()}</td>
                <td>${item.current_price} </td>
                <td>${item.total_volume.toLocaleString("en-US")}</td>
                <td
                  style={{
                    color:
                      item.price_change_percentage_24h > 0
                        ? "rgb(71, 242, 19)"
                        : "red",
                  }}
                >
                  {item.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>Mkt Cap: ${item.market_cap.toLocaleString("en-US")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FetchData;
