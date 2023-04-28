import {FC} from "react";

interface ICardVendor {
    card: string
    cardDict: any
}

export  const CardVendor:FC<ICardVendor> = ({card,cardDict }) => {
    return (
        <div className="svg">
            {
                card.length && [2, 3, 4, 5].includes(parseInt(card.slice(0, 1))) ? cardDict[parseInt(card.slice(0, 1))] : null
            }
        </div>
    )
}