
const AccountItem = ({title, value}) => {
    return (
        <div className="col-md-6">
            <div className="p-3 rounded-3 bg-light d-flex align-items-center justify-content-between">
                <div>
                    <p className="">{title}</p>
                    <p className="lead">{value}</p>
                </div>
                <div>
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        </div>
    )
}

export default AccountItem;