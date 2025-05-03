import { useEffect, useState } from "react";

export const useTokenLogo = (symbol: string) => {
    const [logo, setLogo] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
                const coins = await listRes.json();
                const match = coins.find((coin: any) => coin.symbol.toLowerCase() === symbol.toLowerCase());
                if (!match) return;

                const coinRes = await fetch(`https://api.coingecko.com/api/v3/coins/${match.id}`);
                const coinData = await coinRes.json();
                setLogo(coinData.image?.thumb || null);
            } catch (error) {
                console.error("Error fetching logo:", error);
            }
        };

        if (symbol) fetchLogo();
    }, [symbol]);
    console.log("Logo fetched:", logo, "for symbol:", symbol);

    return logo;
};
