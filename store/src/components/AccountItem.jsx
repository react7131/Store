
const AccountItem = ({title, value}) => {
    return (
        <div className="col-sm-6">
            <div className="p-3 rounded-3 bg-light d-flex align-items-center justify-content-between">
                <div>
                    <p style={{fontSize: "14px"}}>{title}</p>
                    <h6 className="lead" style={{fontSize: "16px"}}>{value}</h6>
                </div>
                <div>
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        </div>
    )
}

export default AccountItem;