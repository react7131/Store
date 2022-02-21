import React from 'react';
import {Link} from 'react-router-dom';

const Order = (props) => {

    return (
        <tr className=" m-3 bg-light rounded-3 px-2">
            <td className="p-0">
                <Link to={`/store/${props.order.productId}`}><img 
                    src={props.order.product.image} 
                    alt={props.order.product.title} 
                    style={{width: '60px', height:'60px', objectFit: 'contain'}}
                /></Link>
            </td>
            <td className="text-truncate justify-content-start" style={{width: '120px'}}><Link className=" order-name text-dark text-decoration-none" to={`/store/${ props.order.productId}`}>{props.order.product.title}</Link></td>
            <td>{props.order.quantity}</td>
            <td>{props.order.product.price}</td>
            <td>{props.order.quantity * props.order.product.price}</td>
        </tr>
    )
}

export default Order;